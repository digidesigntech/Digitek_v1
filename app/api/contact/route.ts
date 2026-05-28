import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  business?: string;
  email?: string;
  phone?: string;
  service?: string;
  source?: string;
  description?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const SENDGRID_API = "https://api.sendgrid.com/v3/mail/send";

export async function POST(req: Request) {
  const apiKey = process.env.SENDGRID_API_KEY?.trim();
  const fromEmail = process.env.SENDGRID_FROM_EMAIL?.trim();
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim();

  if (!apiKey || !fromEmail || !toEmail) {
    return NextResponse.json(
      {
        error:
          "Email service is not configured. Set SENDGRID_API_KEY, SENDGRID_FROM_EMAIL and CONTACT_TO_EMAIL.",
      },
      { status: 500 }
    );
  }

  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim();
  const description = body.description?.trim();

  if (!name || !email || !phone || !description) {
    return NextResponse.json(
      { error: "Name, email, phone and description are required." },
      { status: 400 }
    );
  }

  const business = body.business?.trim() || "—";
  const service = body.service?.trim() || "Not specified";
  const source = body.source?.trim() || "Not specified";

  const rows: Array<[string, string]> = [
    ["Name", name],
    ["Business", business],
    ["Email", email],
    ["Phone", phone],
    ["Service of Interest", service],
    ["Heard via", source],
  ];

  const textBody = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Project Description:",
    description,
  ].join("\n");

  const htmlRows = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#888;font-size:13px;vertical-align:top">${escapeHtml(
          k
        )}</td><td style="padding:6px 0;color:#111;font-size:14px"><strong>${escapeHtml(
          v
        )}</strong></td></tr>`
    )
    .join("");

  const htmlBody = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#111;max-width:640px;margin:0 auto">
      <h2 style="margin:0 0 16px;font-size:18px;color:#6b21a8">New Enquiry — baptistdigitek.com</h2>
      <table style="border-collapse:collapse;width:100%;margin-bottom:18px">${htmlRows}</table>
      <h3 style="margin:18px 0 6px;font-size:14px;color:#444">Project Description</h3>
      <p style="white-space:pre-wrap;font-size:14px;line-height:1.55;color:#111;margin:0">${escapeHtml(
        description
      )}</p>
      <p style="margin-top:24px;font-size:12px;color:#888">
        Reply to this email — it goes directly to <strong>${escapeHtml(name)}</strong> at ${escapeHtml(email)}.
      </p>
    </div>
  `;

  const payload = {
    personalizations: [
      {
        to: [{ email: toEmail }],
        subject: `New enquiry — ${service} — ${name}`,
      },
    ],
    // Show the submitter's name as the sender label in Gmail. The actual
    // From address stays on the authenticated domain so SPF/DKIM pass;
    // their email is still reachable via the Reply-To header below (and
    // is also in the body of the message).
    from: { email: fromEmail, name },
    reply_to: { email, name },
    content: [
      { type: "text/plain", value: textBody },
      { type: "text/html", value: htmlBody },
    ],
  };

  let sgRes: Response;
  try {
    sgRes = await fetch(SENDGRID_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    console.error("[/api/contact] fetch to SendGrid failed:", err);
    return NextResponse.json(
      { error: "Failed to reach SendGrid.", detail: message },
      { status: 502 }
    );
  }

  // 2xx — SendGrid accepted the message.
  if (sgRes.ok) {
    return NextResponse.json({ ok: true });
  }

  // Non-2xx — surface SendGrid's error message so the form can show it.
  let detail = `SendGrid responded with status ${sgRes.status}.`;
  try {
    const errBody = (await sgRes.json()) as {
      errors?: Array<{ message?: string; field?: string }>;
    };
    if (errBody.errors?.length) {
      detail = errBody.errors
        .map((x) => (x.field ? `${x.field}: ${x.message}` : x.message))
        .filter(Boolean)
        .join("; ");
    }
  } catch {
    /* SendGrid sometimes returns plain text — keep the status-only detail */
  }

  console.error("[/api/contact] SendGrid rejected send:", {
    status: sgRes.status,
    detail,
  });

  return NextResponse.json(
    { error: "Failed to send email.", detail },
    { status: 502 }
  );
}

"use client";

import { useState, type FormEvent, type FocusEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { useRobot } from "@/components/robot/robot-provider";
import { PaperPlane } from "@/components/ui/paper-plane";
import { StarButton } from "@/components/ui/star-button";

const services = [
  "Website",
  "Software",
  "Mobile App",
  "Branding",
  "Digital Marketing",
  "Hosting",
  "IT Consulting",
  "Digi Design",
];

const FIELD_REACTIONS: Record<
  string,
  { pose: { rotateY?: number; rotateX?: number; scale?: number }; bubble: string }
> = {
  name: {
    pose: { rotateY: -8, rotateX: 4, scale: 1 },
    bubble: "Nice to meet you 👋",
  },
  business: {
    pose: { rotateY: -4, rotateX: 4, scale: 1 },
    bubble: "What's the business called?",
  },
  email: {
    pose: { rotateY: 6, rotateX: 6, scale: 1.03 },
    bubble: "I'll make sure it lands in the right inbox.",
  },
  phone: {
    pose: { rotateY: 8, rotateX: 4, scale: 1 },
    bubble: "WhatsApp works too.",
  },
  service: {
    pose: { rotateY: 0, rotateX: -6, scale: 1.05 },
    bubble: "Picking your flavour...",
  },
  source: {
    pose: { rotateY: -6, rotateX: -4, scale: 1 },
    bubble: "Always curious how folks find us.",
  },
  description: {
    pose: { rotateY: 0, rotateX: 8, scale: 1.05 },
    bubble: "Tell me everything — I'm listening.",
  },
};

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [planeTrigger, setPlaneTrigger] = useState(0);
  const { setPose, setBubble } = useRobot();

  const handleFocus = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const reaction = FIELD_REACTIONS[e.target.name];
    if (reaction) {
      setPose(reaction.pose, 0.7);
      setBubble(reaction.bubble, 5000);
    }
  };

  const handleBlur = () => {
    setPose({ rotateY: 0, rotateX: 0, scale: 1 }, 0.9);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPose({ rotateX: -10, scale: 1.1 }, 0.5);
    setBubble("Sending you off…", 2000);
    setPlaneTrigger((n) => n + 1); // launch the paper plane

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      business: String(data.get("business") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      service: String(data.get("service") ?? ""),
      source: String(data.get("source") ?? ""),
      description: String(data.get("description") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as {
        error?: string;
        detail?: string;
      };
      if (!res.ok) {
        const composed = [json.error, json.detail].filter(Boolean).join(" — ");
        throw new Error(
          composed || `Request failed with status ${res.status}.`
        );
      }
      setSubmitted(true);
      setPose({ scale: 1.15, rotateX: 4 }, 0.6);
      setBubble("Thanks! We'll reply within a working day. 🎉", 6000);
      form.reset();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
      setPose({ rotateX: 0, scale: 1 }, 0.6);
      setBubble("Hmm, that didn't send. Try once more?", 4000);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <>
        <PaperPlane trigger={planeTrigger} />
        <div className="glass rounded-2xl p-8 sm:p-10 text-center">
          <CheckCircle2 className="h-10 w-10 text-purple-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Enquiry sent</h3>
          <p className="text-gray-400">
            Thanks — we&apos;ve received your details and will reply to your
            email within one working day.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setPose({}, 0.6);
              setBubble(null);
            }}
            className="mt-6 text-purple-300 hover:text-white text-sm underline-offset-4 hover:underline"
          >
            Send another
          </button>
        </div>
      </>
    );
  }

  const inputClass =
    "w-full rounded-lg bg-white/[0.03] border border-white/10 focus:border-purple-400/60 focus:bg-white/[0.06] outline-none px-4 py-3 text-white placeholder:text-gray-500 transition-colors";

  return (
    <>
      <PaperPlane trigger={planeTrigger} />
      <form
        onSubmit={handleSubmit}
        className="glass rounded-2xl p-6 sm:p-8 md:p-10 space-y-5"
      >
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Full Name <span className="text-purple-300">*</span>
            </label>
            <input
              name="name"
              required
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={inputClass}
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Business Name <span className="text-purple-300">*</span>
            </label>
            <input
              name="business"
              required
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={inputClass}
              placeholder="Your company / brand"
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Email <span className="text-purple-300">*</span>
            </label>
            <input
              name="email"
              type="email"
              required
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Phone / WhatsApp <span className="text-purple-300">*</span>
            </label>
            <input
              name="phone"
              required
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={inputClass}
              placeholder="+91 ..."
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Service of Interest <span className="text-purple-300">*</span>
            </label>
            <select
              name="service"
              required
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={inputClass}
              defaultValue="Website"
            >
              {services.map((s) => (
                <option key={s} value={s} className="bg-black">
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              How did you hear about us? <span className="text-purple-300">*</span>
            </label>
            <input
              name="source"
              required
              onFocus={handleFocus}
              onBlur={handleBlur}
              className={inputClass}
              placeholder="Google, referral, social..."
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-2">
            Project Description <span className="text-purple-300">*</span>
          </label>
          <textarea
            name="description"
            rows={5}
            required
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={inputClass}
            placeholder="Type of project, timeline, budget range, any existing links..."
          />
        </div>
        <div className="pt-2">
          <StarButton type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Enquiry"}
          </StarButton>
          {error ? (
            <p className="text-xs text-red-300 mt-3">{error}</p>
          ) : (
            <p className="text-xs text-gray-500 mt-3">
              We&apos;ll reply to the email you provide within one working day.
            </p>
          )}
        </div>
      </form>
    </>
  );
}

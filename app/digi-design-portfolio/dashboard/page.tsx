"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  RefreshCw,
  LogOut,
  Download,
  Search,
  X,
  Mail,
  Phone,
  Inbox,
  Sparkles,
} from "lucide-react";

const API_URL =
  "https://script.google.com/macros/s/AKfycbwnfUwXSN3zUAe2egCmhbXduzYKuI3mzutdD7WNNEEkTLmMBvdYhIFMIhai1ZkSML962Q/exec?type=data";

interface Row {
  date: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  source: string;
}

function escapeCsvValue(value: unknown): string {
  if (value === null || value === undefined) return '""';
  return `"${String(value).replace(/"/g, '""')}"`;
}
function formatDate(value: unknown): string {
  if (!value) return "-";
  const date = new Date(value as string);
  if (isNaN(date.getTime())) return String(value);
  return date.toLocaleString();
}
function normalizeSource(row: Record<string, unknown>): string {
  const rawSource = String(row.source || "").trim();
  const message = String(row.message || "").toLowerCase();
  if (rawSource) return rawSource;
  if (message.includes("lead collected from popup form")) return "Popup";
  if (message && !message.includes("lead collected from popup form"))
    return "Contact Form";
  return "Website";
}
function normalizeRow(row: Record<string, unknown>): Row {
  return {
    date: (row.date as string) || "",
    name: (row.name as string) || "-",
    phone: (row.phone as string) || "-",
    email: (row.email as string) || "-",
    message: (row.message as string) || "-",
    source: normalizeSource(row),
  };
}
function statusFor(row: Row): { label: string; tone: string } {
  const source = (row.source || "").toLowerCase();
  const message = (row.message || "").toLowerCase();
  if (message.includes("logo")) return { label: "Logo", tone: "bg-purple-500/15 text-purple-200 border-purple-400/30" };
  if (message.includes("visiting")) return { label: "Visiting Card", tone: "bg-emerald-500/15 text-emerald-200 border-emerald-400/30" };
  if (message.includes("brochure")) return { label: "Brochure", tone: "bg-amber-500/15 text-amber-200 border-amber-400/30" };
  if (message.includes("poster")) return { label: "Poster", tone: "bg-pink-500/15 text-pink-200 border-pink-400/30" };
  if (message.includes("video")) return { label: "Video", tone: "bg-orange-500/15 text-orange-200 border-orange-400/30" };
  if (message.includes("branding")) return { label: "Branding", tone: "bg-red-500/15 text-red-200 border-red-400/30" };
  if (source === "popup") return { label: "Popup Lead", tone: "bg-pink-500/15 text-pink-200 border-pink-400/30" };
  if (source === "contact form") return { label: "Contact Lead", tone: "bg-indigo-500/15 text-indigo-200 border-indigo-400/30" };
  return { label: "New Lead", tone: "bg-blue-500/15 text-blue-200 border-blue-400/30" };
}

export default function DigiDesignDashboard() {
  const [allData, setAllData] = useState<Row[]>([]);
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("dashboardAuth") !== "true"
    ) {
      window.location.href = "/digi-design-portfolio/login";
    }
  }, []);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setErrored(false);
    try {
      const response = await fetch(API_URL + "&t=" + Date.now());
      const data = await response.json();
      const rows: Row[] = Array.isArray(data)
        ? data.map(normalizeRow).reverse()
        : [];
      setAllData(rows);
    } catch (error) {
      console.error("Dashboard error:", error);
      setErrored(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
    const id = setInterval(loadDashboard, 30000);
    return () => clearInterval(id);
  }, [loadDashboard]);

  const filteredData = useMemo(() => {
    const s = search.toLowerCase().trim();
    const src = sourceFilter.toLowerCase();
    return allData.filter((row) => {
      const matchesSearch =
        (row.name || "").toLowerCase().includes(s) ||
        (row.email || "").toLowerCase().includes(s) ||
        (row.phone || "").toLowerCase().includes(s) ||
        (row.message || "").toLowerCase().includes(s) ||
        (row.source || "").toLowerCase().includes(s);
      const matchesSource =
        src === "all" || (row.source || "").toLowerCase() === src;
      return matchesSearch && matchesSource;
    });
  }, [allData, search, sourceFilter]);

  const stats = useMemo(() => {
    const popup = filteredData.filter((r) => (r.source || "").toLowerCase() === "popup").length;
    const contact = filteredData.filter((r) => (r.source || "").toLowerCase() === "contact form").length;
    const latest = filteredData[0];
    return {
      total: filteredData.length,
      popup,
      contact,
      latestName: latest?.name || "-",
      latestSource: latest?.source || "-",
    };
  }, [filteredData]);

  const clearSearch = () => {
    setSearch("");
    setSourceFilter("all");
  };
  const logout = () => {
    localStorage.removeItem("dashboardAuth");
    window.location.href = "/digi-design-portfolio";
  };
  const downloadExcel = () => {
    const exportData = filteredData.length ? filteredData : allData;
    if (!exportData.length) {
      alert("No data available to download.");
      return;
    }
    const rows: string[][] = [
      ["Date", "Source", "Name", "Phone", "Email", "Message", "Status"],
    ];
    exportData.forEach((row) => {
      rows.push([
        formatDate(row.date),
        row.source || "-",
        row.name || "-",
        row.phone || "-",
        row.email || "-",
        row.message || "-",
        statusFor(row).label,
      ]);
    });
    const csvContent = rows
      .map((r) => r.map(escapeCsvValue).join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "digi_design_leads.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const STAT_CARDS = [
    { label: "Total Leads", value: stats.total, icon: Inbox, tone: "text-purple-300" },
    { label: "Popup Leads", value: stats.popup, icon: Sparkles, tone: "text-pink-300" },
    { label: "Contact Form", value: stats.contact, icon: Mail, tone: "text-indigo-300" },
    { label: "Latest Source", value: stats.latestSource, icon: Phone, tone: "text-emerald-300" },
  ];

  return (
    <section className="relative min-h-screen pt-28 pb-16">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <Image
              src="/digi-design-portfolio/logo_gold.png"
              alt="Digi Designs"
              width={520}
              height={240}
              priority
              className="h-12 w-auto select-none drop-shadow-[0_0_14px_rgba(255,212,121,0.3)]"
            />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold gradient-text">
                Digi Designs Dashboard
              </h1>
              <p className="text-sm text-gray-400">
                Manage popup leads and contact form messages.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={loadDashboard}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg glass glass-hover px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Loading…" : "Refresh"}
            </button>
            <button
              onClick={downloadExcel}
              className="inline-flex items-center gap-2 rounded-lg bg-purple-500 hover:bg-purple-400 text-white px-4 py-2 text-sm font-semibold transition-colors"
            >
              <Download className="h-4 w-4" />
              Download CSV
            </button>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-lg glass glass-hover px-4 py-2 text-sm font-semibold text-white"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STAT_CARDS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="glass rounded-xl p-5 flex items-start gap-4">
                <div className="h-11 w-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon className={`h-5 w-5 ${s.tone}`} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                    {s.label}
                  </div>
                  <div className="text-xl font-bold text-white truncate">{s.value}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="glass rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, phone or message…"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-400 transition-colors text-sm"
            />
          </div>
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-400 transition-colors text-sm"
          >
            <option value="all">All sources</option>
            <option value="popup">Popup</option>
            <option value="contact form">Contact Form</option>
            <option value="website">Website</option>
          </select>
          <button
            onClick={clearSearch}
            className="inline-flex items-center gap-2 rounded-lg glass glass-hover px-4 py-2 text-sm font-semibold text-white"
          >
            <X className="h-4 w-4" />
            Clear
          </button>
        </div>

        {/* Table */}
        <div className="glass rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.03] border-b border-white/10">
                <tr className="text-left text-xs uppercase tracking-wider text-gray-400">
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Phone</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Message</th>
                  <th className="px-4 py-3 font-semibold">Source</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading && (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                      Loading leads…
                    </td>
                  </tr>
                )}
                {!loading && errored && (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-red-400">
                      Couldn't load data. Tap Refresh to try again.
                    </td>
                  </tr>
                )}
                {!loading && !errored && filteredData.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-gray-500">
                      No leads match the current filters.
                    </td>
                  </tr>
                )}
                {!loading &&
                  !errored &&
                  filteredData.map((row, idx) => {
                    const badge = statusFor(row);
                    return (
                      <tr key={idx} className="hover:bg-white/[0.03] transition-colors">
                        <td className="px-4 py-3 text-gray-300 whitespace-nowrap">
                          {formatDate(row.date)}
                        </td>
                        <td className="px-4 py-3 text-white font-medium">{row.name}</td>
                        <td className="px-4 py-3 text-gray-300 whitespace-nowrap">{row.phone}</td>
                        <td className="px-4 py-3 text-gray-300">{row.email}</td>
                        <td className="px-4 py-3 text-gray-300 max-w-md truncate" title={row.message}>
                          {row.message}
                        </td>
                        <td className="px-4 py-3 text-gray-300 whitespace-nowrap">{row.source}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-semibold ${badge.tone}`}
                          >
                            {badge.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

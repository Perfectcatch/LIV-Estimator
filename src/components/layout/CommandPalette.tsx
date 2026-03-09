"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, Users, Briefcase, X, ArrowRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const QUICK_ACTIONS = [
  { label: "New Estimate",  href: "/estimates/new",  icon: FileText,  shortcut: "E" },
  { label: "New Client",    href: "/clients",         icon: Users,     shortcut: "C" },
  { label: "New Job",       href: "/jobs",            icon: Briefcase, shortcut: "J" },
];

const ALL_PAGES = [
  { label: "Dashboard",        href: "/" },
  { label: "Customers",        href: "/clients" },
  { label: "Jobs",             href: "/jobs" },
  { label: "OVERMIND",         href: "/agent" },
  { label: "Estimates",        href: "/estimates" },
  { label: "Tasks",            href: "/tasks" },
  { label: "Schedules",        href: "/schedules" },
  { label: "BIM",              href: "/bim" },
  { label: "Daily Logs",       href: "/daily-logs" },
  { label: "Spec Sheets",      href: "/specifications" },
  { label: "Time Tracking",    href: "/time" },
  { label: "Expenses",         href: "/expenses" },
  { label: "Invoices",         href: "/invoices" },
  { label: "Cash Flow",        href: "/cashflow" },
  { label: "Planner",          href: "/planner" },
  { label: "Analytics",        href: "/analytics" },
  { label: "Lien Waivers",     href: "/lien-waivers" },
  { label: "Catalog",          href: "/catalog" },
  { label: "Files",            href: "/files" },
  { label: "Contracts",        href: "/contracts" },
  { label: "Team",             href: "/team" },
  { label: "Workflows",        href: "/workflows" },
  { label: "Community",        href: "/community" },
  { label: "Settings",         href: "/settings" },
  { label: "Purchase Orders",  href: "/purchase-orders" },
  { label: "Change Orders",    href: "/change-orders" },
  { label: "Opportunities",    href: "/opportunities" },
  { label: "Messages",         href: "/messages" },
  { label: "Directory",        href: "/directory" },
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (!open) return;
        onClose();
      }
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const filtered = query.trim()
    ? ALL_PAGES.filter((p) => p.label.toLowerCase().includes(query.toLowerCase()))
    : [];

  function navigate(href: string) {
    router.push(href);
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-xl mx-4 bg-[#1e1e3a] border border-[#3a3a5a] rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#2a2a4a]">
          <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, create entities, ask questions..."
            className="flex-1 bg-transparent text-sm text-slate-200 placeholder:text-slate-500 outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-slate-500 hover:text-slate-300">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="text-[10px] text-slate-500 bg-white/5 px-1.5 py-0.5 rounded border border-[#3a3a5a]">ESC</kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {!query && (
            <div className="p-3">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest px-2 mb-2">Quick Actions</p>
              {QUICK_ACTIONS.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.href}
                    onClick={() => navigate(action.href)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-sm text-slate-300 transition-colors group"
                  >
                    <Icon className="w-4 h-4 text-indigo-400" />
                    <span>{action.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-auto text-slate-600 group-hover:text-slate-400" />
                  </button>
                );
              })}
              <div className="mt-3 px-3 py-2 rounded-lg bg-indigo-600/10 border border-indigo-600/20">
                <div className="flex items-center gap-2 text-xs text-indigo-300">
                  <Zap className="w-3.5 h-3.5" />
                  <span className="font-medium">DAEMON</span>
                  <span className="text-indigo-400/70">— Ask anything about your projects</span>
                </div>
              </div>
            </div>
          )}

          {query && filtered.length > 0 && (
            <div className="p-2">
              {filtered.map((page) => (
                <button
                  key={page.href}
                  onClick={() => navigate(page.href)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-sm text-slate-300 transition-colors group"
                >
                  <span className="text-slate-400">/</span>
                  <span>{page.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-auto text-slate-600 group-hover:text-slate-400" />
                </button>
              ))}
            </div>
          )}

          {query && filtered.length === 0 && (
            <div className="p-6 text-center text-sm text-slate-500">
              No results for &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

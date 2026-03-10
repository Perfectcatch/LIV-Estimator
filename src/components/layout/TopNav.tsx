"use client";

import { useState } from "react";
import { Bell, Plus, Search, ChevronDown, User, Settings, LogOut, Zap } from "lucide-react";

interface TopNavProps {
  onCommandPalette: () => void;
}

export function TopNav({ onCommandPalette }: TopNavProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header
      className="h-11 flex-shrink-0 flex items-center px-4 gap-3 z-40"
      style={{
        background: "#0d0d1c",
        borderBottom: "1px solid #1a1a30",
      }}
    >
      {/* Workspace pill */}
      <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] font-medium cursor-pointer transition-colors duration-150 hover:bg-white/[0.05]"
        style={{ color: "#6060a0" }}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
        Production
        <ChevronDown className="w-3 h-3" style={{ color: "#3a3a58" }} />
      </button>

      {/* Center quick nav */}
      <nav className="hidden md:flex items-center gap-0.5 ml-1">
        {[
          { href: "/", label: "Dashboard" },
          { href: "/schedules", label: "Scheduling" },
          { href: "/jobs", label: "Budgets" },
          { href: "/expenses", label: "Financials" },
          { href: "/analytics", label: "Analytics" },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="px-3 py-1 text-[12px] font-medium rounded-md transition-colors duration-150"
            style={{ color: "#606090" }}
            onMouseEnter={e => { (e.target as HTMLElement).style.color = "#c0c0e0"; (e.target as HTMLElement).style.background = "rgba(255,255,255,0.04)"; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.color = "#606090"; (e.target as HTMLElement).style.background = "transparent"; }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Right */}
      <div className="ml-auto flex items-center gap-1.5">
        {/* DAEMON search */}
        <button
          onClick={onCommandPalette}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150 cursor-pointer hover:bg-white/[0.05]"
          style={{ color: "#606090", border: "1px solid #1e1e38" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#2e2e50"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#1e1e38"; }}
        >
          <Search className="w-3.5 h-3.5" style={{ color: "#4a4a70" }} />
          <span className="hidden sm:inline" style={{ color: "#606090" }}>DAEMON</span>
          <kbd className="hidden sm:inline text-[10px] px-1.5 py-0.5 rounded font-mono" style={{ background: "rgba(255,255,255,0.05)", color: "#3a3a5a" }}>⌘K</kbd>
        </button>

        {/* Notifications */}
        <button
          className="relative w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-150 cursor-pointer hover:bg-white/[0.05]"
          title="Notifications"
        >
          <Bell className="w-4 h-4" style={{ color: "#4a4a70" }} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400" />
        </button>

        {/* Quick Add */}
        <button
          className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-150 cursor-pointer"
          title="Quick Add"
          style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)" }}
        >
          <Plus className="w-3.5 h-3.5 text-white" />
        </button>

        {/* Avatar */}
        <div className="relative ml-0.5">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold text-white transition-all duration-150 cursor-pointer hover:scale-105"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
          >
            L
          </button>
          {userMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
              <div
                className="absolute right-0 top-10 w-48 rounded-xl shadow-2xl z-50 py-1 overflow-hidden"
                style={{ background: "#13132a", border: "1px solid #252540" }}
              >
                <div className="px-3 py-2.5 border-b" style={{ borderColor: "#1e1e38" }}>
                  <div className="text-[12px] font-semibold text-white">LIV Admin</div>
                  <div className="text-[11px]" style={{ color: "#4a4a70" }}>admin@livpools.com</div>
                </div>
                <a href="/settings" className="flex items-center gap-2.5 px-3 py-2 text-[13px] transition-colors cursor-pointer hover:bg-white/[0.04]" style={{ color: "#9090b8" }}>
                  <Settings className="w-3.5 h-3.5" /> Settings
                </a>
                <button className="flex items-center gap-2.5 w-full px-3 py-2 text-[13px] transition-colors cursor-pointer hover:bg-white/[0.04]" style={{ color: "#9090b8" }}>
                  <User className="w-3.5 h-3.5" /> Profile
                </button>
                <button className="flex items-center gap-2.5 w-full px-3 py-2 text-[13px] transition-colors cursor-pointer hover:bg-white/[0.04]" style={{ color: "#9090b8" }}>
                  <Zap className="w-3.5 h-3.5" /> What&apos;s New
                </button>
                <div className="border-t my-1" style={{ borderColor: "#1e1e38" }} />
                <button className="flex items-center gap-2.5 w-full px-3 py-2 text-[13px] transition-colors cursor-pointer hover:bg-white/[0.04]" style={{ color: "#e94560" }}>
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

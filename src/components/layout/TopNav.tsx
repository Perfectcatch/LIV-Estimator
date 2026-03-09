"use client";

import { useState } from "react";
import { Bell, Plus, RefreshCw, Search, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopNavProps {
  onCommandPalette: () => void;
}

export function TopNav({ onCommandPalette }: TopNavProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="h-12 flex-shrink-0 bg-[#16213e] border-b border-[#2a2a4a] flex items-center px-4 gap-3 z-40">
      {/* Workspace Switcher */}
      <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-sm text-slate-300 transition-colors">
        <div className="w-2 h-2 rounded-full bg-green-400" />
        Production
        <ChevronDown className="w-3 h-3 text-slate-500" />
      </button>

      {/* Center nav links */}
      <nav className="hidden md:flex items-center gap-1 ml-2">
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
            className="px-3 py-1 text-sm text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-md transition-colors"
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-1">
        {/* DAEMON Search */}
        <button
          onClick={onCommandPalette}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-slate-400 border border-[#2a2a4a] transition-colors"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">DAEMON</span>
          <kbd className="hidden sm:inline text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-slate-500">⌘K</kbd>
        </button>

        <button
          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        <button
          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
        </button>

        <button
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
          title="Quick Add"
        >
          <Plus className="w-4 h-4" />
        </button>

        {/* Avatar */}
        <div className="relative ml-1">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
          >
            L
          </button>
          {userMenuOpen && (
            <div className="absolute right-0 top-10 w-44 bg-[#1e1e3a] border border-[#2a2a4a] rounded-lg shadow-xl z-50 py-1">
              <a href="/settings" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-white/5">
                <Settings className="w-4 h-4" /> Settings
              </a>
              <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-300 hover:bg-white/5">
                <User className="w-4 h-4" /> Profile
              </button>
              <hr className="border-[#2a2a4a] my-1" />
              <button className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:bg-white/5">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

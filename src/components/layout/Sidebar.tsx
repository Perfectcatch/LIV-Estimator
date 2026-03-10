"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, Users, Briefcase, Brain,
  FileText, CheckSquare, Calendar, Box, BookOpen, FileCode, Clock,
  Receipt, TrendingUp, PieChart, BarChart2, Shield, DollarSign,
  Database, Folder, PenLine, UserCog, Search, Zap, MessageCircle, Settings,
  ChevronDown, ChevronRight, Waves, Sigma,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, Users, Briefcase, Brain,
  FileText, CheckSquare, Calendar, Box, BookOpen, FileCode, Clock,
  Receipt, TrendingUp, PieChart, BarChart2, Shield, DollarSign,
  Database, Folder, PenLine, UserCog, Search, Zap, MessageCircle, Settings, Sigma,
};

interface NavItem { href: string; label: string; icon: string; badge?: string }
interface NavSection { title: string; items: NavItem[] }

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Core",
    items: [
      { href: "/",        label: "Dashboard",  icon: "LayoutDashboard" },
      { href: "/clients", label: "Customers",  icon: "Users" },
      { href: "/jobs",    label: "Jobs",       icon: "Briefcase" },
      { href: "/agent",   label: "OVERMIND",   icon: "Brain", badge: "AI" },
    ],
  },
  {
    title: "Work",
    items: [
      { href: "/estimates",      label: "Estimates",   icon: "FileText" },
      { href: "/tasks",          label: "Tasks",       icon: "CheckSquare" },
      { href: "/schedules",      label: "Schedules",   icon: "Calendar" },
      { href: "/bim",            label: "BIM",         icon: "Box" },
      { href: "/daily-logs",     label: "Daily Logs",  icon: "BookOpen" },
      { href: "/specifications", label: "Spec Sheets", icon: "FileCode" },
      { href: "/time",           label: "Time",        icon: "Clock" },
    ],
  },
  {
    title: "Finance",
    items: [
      { href: "/expenses",     label: "Expenses",    icon: "Receipt" },
      { href: "/invoices",     label: "Invoices",    icon: "DollarSign" },
      { href: "/cashflow",     label: "Cash Flow",   icon: "TrendingUp" },
      { href: "/planner",      label: "Planner",     icon: "PieChart" },
      { href: "/analytics",    label: "Analytics",   icon: "BarChart2" },
      { href: "/lien-waivers", label: "Lien Waivers",icon: "Shield" },
    ],
  },
  {
    title: "System",
    items: [
      { href: "/formulas",   label: "Formulas",  icon: "Sigma" },
      { href: "/catalog",    label: "Catalog",   icon: "Database" },
      { href: "/files",      label: "Files",     icon: "Folder" },
      { href: "/contracts",  label: "Contracts", icon: "PenLine" },
      { href: "/team",       label: "Team",      icon: "UserCog" },
      { href: "/directory",  label: "Directory", icon: "Search" },
      { href: "/workflows",  label: "Workflows", icon: "Zap" },
      { href: "/community",  label: "Community", icon: "MessageCircle" },
      { href: "/settings",   label: "Settings",  icon: "Settings" },
    ],
  },
];

function NavLink({ item, isActive }: { item: NavItem; isActive: boolean }) {
  const Icon = ICON_MAP[item.icon];
  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex items-center gap-2.5 px-3 py-[7px] rounded-lg text-[13px] font-medium transition-all duration-150 cursor-pointer",
        isActive
          ? "bg-indigo-500/15 text-indigo-300"
          : "text-[#6666a0] hover:text-[#c0c0e0] hover:bg-white/[0.04]"
      )}
    >
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-indigo-400 rounded-r-full" />
      )}
      {Icon && (
        <Icon className={cn(
          "w-[15px] h-[15px] flex-shrink-0 transition-colors duration-150",
          isActive ? "text-indigo-400" : "text-[#4a4a70] group-hover:text-[#8080b8]"
        )} />
      )}
      <span className="truncate">{item.label}</span>
      {item.badge && (
        <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 tracking-wider">
          {item.badge}
        </span>
      )}
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  function toggle(title: string) {
    setCollapsed(prev => ({ ...prev, [title]: !prev[title] }));
  }

  return (
    <aside
      className="w-56 flex-shrink-0 flex flex-col h-full overflow-y-auto"
      style={{
        background: "linear-gradient(180deg, #0f0f22 0%, #0d0d1c 100%)",
        borderRight: "1px solid #1e1e38",
      }}
    >
      {/* ── Logo ── */}
      <div className="px-4 pt-5 pb-4" style={{ borderBottom: "1px solid #1a1a32" }}>
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
              boxShadow: "0 0 16px rgba(99,102,241,0.4)",
            }}
          >
            <Waves className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-[13px] font-bold text-white tracking-tight leading-none">LIV Pools</div>
            <div className="text-[10px] mt-0.5 font-medium tracking-wider uppercase" style={{ color: "#4a4a70" }}>CRM Platform</div>
          </div>
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 px-2 py-3">
        {NAV_SECTIONS.map((section, si) => {
          const isOpen = !collapsed[section.title];
          return (
            <div key={section.title} className={cn(si > 0 && "mt-1")}>
              <button
                onClick={() => toggle(section.title)}
                className="w-full flex items-center justify-between px-3 py-2 cursor-pointer transition-colors duration-150 hover:opacity-80"
              >
                <span className="text-[10px] font-semibold tracking-[0.12em] uppercase" style={{ color: "#3a3a58" }}>
                  {section.title}
                </span>
                {isOpen
                  ? <ChevronDown className="w-3 h-3" style={{ color: "#3a3a58" }} />
                  : <ChevronRight className="w-3 h-3" style={{ color: "#3a3a58" }} />
                }
              </button>
              {isOpen && (
                <div className="space-y-0.5 mb-1">
                  {section.items.map((item) => (
                    <NavLink
                      key={item.href}
                      item={item}
                      isActive={
                        item.href === "/"
                          ? pathname === "/"
                          : pathname.startsWith(item.href)
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* ── Footer ── */}
      <div className="px-4 py-3" style={{ borderTop: "1px solid #1a1a32" }}>
        <div className="text-[10px] font-medium" style={{ color: "#2e2e50" }}>v2.0 · LIV Pools LLC</div>
      </div>
    </aside>
  );
}

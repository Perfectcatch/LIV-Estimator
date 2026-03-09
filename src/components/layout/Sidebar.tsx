"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, Users, Briefcase, Brain,
  FileText, CheckSquare, Calendar, Box, BookOpen, FileCode, Clock,
  Receipt, TrendingUp, PieChart, BarChart2, Shield, DollarSign,
  Database, Folder, PenLine, UserCog, Search, Zap, MessageCircle, Settings,
  ChevronDown, ChevronRight, Droplets, Package, Layers, Boxes, Warehouse, Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, Users, Briefcase, Brain,
  FileText, CheckSquare, Calendar, Box, BookOpen, FileCode, Clock,
  Receipt, TrendingUp, PieChart, BarChart2, Shield, DollarSign,
  Database, Folder, PenLine, UserCog, Search, Zap, MessageCircle, Settings,
  Package, Layers, Boxes, Warehouse, Truck,
};

interface NavItem { href: string; label: string; icon: string; children?: NavItem[] }

interface NavSection {
  title: string;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: "CORE",
    items: [
      { href: "/",         label: "Dashboard",  icon: "LayoutDashboard" },
      { href: "/clients",  label: "Customers",  icon: "Users" },
      { href: "/jobs",     label: "Jobs",        icon: "Briefcase" },
      { href: "/agent",    label: "OVERMIND",    icon: "Brain" },
    ],
  },
  {
    title: "WORK",
    items: [
      { href: "/estimates",      label: "Estimates",   icon: "FileText" },
      { href: "/tasks",          label: "Tasks",        icon: "CheckSquare" },
      { href: "/schedules",      label: "Schedules",    icon: "Calendar" },
      { href: "/bim",            label: "BIM",          icon: "Box" },
      { href: "/daily-logs",     label: "Daily Logs",   icon: "BookOpen" },
      { href: "/specifications", label: "Spec Sheets",  icon: "FileCode" },
      { href: "/time",           label: "Time",         icon: "Clock" },
    ],
  },
  {
    title: "FINANCE",
    items: [
      { href: "/expenses",      label: "Expenses",      icon: "Receipt" },
      { href: "/invoices",      label: "Invoices",      icon: "DollarSign" },
      { href: "/cashflow",      label: "Cash Flow",     icon: "TrendingUp" },
      { href: "/planner",       label: "Planner",       icon: "PieChart" },
      { href: "/analytics",     label: "Analytics",     icon: "BarChart2" },
      { href: "/lien-waivers",  label: "Lien Waivers",  icon: "Shield" },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { href: "/catalog",    label: "Catalog",     icon: "Database", children: [
        { href: "/catalog/skus",              label: "SKUs",              icon: "Package" },
        { href: "/catalog/kits",              label: "Kits",              icon: "Boxes" },
        { href: "/catalog/assemblies",        label: "Assemblies",        icon: "Layers" },
        { href: "/catalog/super-assemblies",  label: "Super-Assemblies",  icon: "Warehouse" },
        { href: "/vendors",                   label: "Vendors",           icon: "Truck" },
      ]},
      { href: "/files",      label: "Files",        icon: "Folder" },
      { href: "/contracts",  label: "Contracts",    icon: "PenLine" },
      { href: "/team",       label: "Team",         icon: "UserCog" },
      { href: "/directory",  label: "Directory",    icon: "Search" },
      { href: "/workflows",  label: "Workflows",    icon: "Zap" },
      { href: "/community",  label: "Community",    icon: "MessageCircle" },
      { href: "/settings",   label: "Settings",     icon: "Settings" },
    ],
  },
];

function NavLink({ item, isActive, pathname }: { item: NavItem; isActive: boolean; pathname: string }) {
  const Icon = ICON_MAP[item.icon];
  const [open, setOpen] = useState(() =>
    item.children ? pathname.startsWith(item.href) || pathname.startsWith("/vendors") : false
  );

  if (item.children) {
    const parentActive = pathname.startsWith(item.href) || pathname.startsWith("/vendors");
    return (
      <div>
        <button
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all",
            parentActive
              ? "bg-indigo-600/20 text-indigo-300 font-medium"
              : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
          )}
        >
          {Icon && <Icon className={cn("w-4 h-4 flex-shrink-0", parentActive ? "text-indigo-400" : "text-slate-500")} />}
          <span className="flex-1 text-left">{item.label}</span>
          {open
            ? <ChevronDown className="w-3 h-3 text-slate-500" />
            : <ChevronRight className="w-3 h-3 text-slate-500" />}
        </button>
        {open && (
          <div className="ml-4 mt-0.5 space-y-0.5 border-l border-[#2a2a4a] pl-2">
            {item.children.map((child) => {
              const childActive = child.href === "/" ? pathname === "/" : pathname.startsWith(child.href);
              const ChildIcon = ICON_MAP[child.icon];
              return (
                <Link
                  key={child.href}
                  href={child.href}
                  className={cn(
                    "flex items-center gap-2 px-2 py-1.5 rounded-md text-xs transition-all",
                    childActive
                      ? "bg-indigo-600/15 text-indigo-300 font-medium"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  )}
                >
                  {ChildIcon && <ChildIcon className={cn("w-3.5 h-3.5 flex-shrink-0", childActive ? "text-indigo-400" : "text-slate-500")} />}
                  <span>{child.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all",
        isActive
          ? "bg-indigo-600/20 text-indigo-300 font-medium"
          : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
      )}
    >
      {Icon && <Icon className={cn("w-4 h-4 flex-shrink-0", isActive ? "text-indigo-400" : "text-slate-500")} />}
      <span>{item.label}</span>
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
    <aside className="w-56 flex-shrink-0 flex flex-col h-full bg-[#16213e] border-r border-[#2a2a4a] overflow-y-auto">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-[#2a2a4a]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Droplets className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-white leading-none">LIV Pools</div>
            <div className="text-[10px] text-slate-500 mt-0.5">CRM Platform</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5">
        {NAV_SECTIONS.map((section) => {
          const isOpen = !collapsed[section.title];
          return (
            <div key={section.title} className="mb-1">
              <button
                onClick={() => toggle(section.title)}
                className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-semibold text-slate-500 tracking-widest uppercase hover:text-slate-400 transition-colors"
              >
                {section.title}
                {isOpen
                  ? <ChevronDown className="w-3 h-3" />
                  : <ChevronRight className="w-3 h-3" />
                }
              </button>
              {isOpen && (
                <div className="space-y-0.5">
                  {section.items.map((item) => (
                    <NavLink
                      key={item.href}
                      item={item}
                      pathname={pathname}
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

      {/* Footer */}
      <div className="px-4 py-3 border-t border-[#2a2a4a]">
        <div className="text-[10px] text-slate-600">v2.0 · LIV Pools LLC</div>
      </div>
    </aside>
  );
}

"use client";

import { useState } from "react";
import { Save, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const SECTIONS = ["Company", "Estimates", "Finance", "Notifications", "Integrations", "Security"];

export default function SettingsPage() {
  const [section, setSection] = useState("Company");
  const [company, setCompany] = useState({
    name:       "LIV Pools LLC",
    address:    "123 Gulf Blvd, Clearwater, FL 33755",
    phone:      "(727) 555-0100",
    email:      "hello@livpools.com",
    website:    "www.livpools.com",
    license:    "FL-CPC1234567",
    taxRate:    "0",
  });
  const [estimate, setEstimate] = useState({
    defaultMarkup:     "60",
    pmFeeRate:         "8",
    contingency:       "5",
    depositPct:        "10",
    shellPct:          "45",
    equipmentPct:      "20",
    finalPct:          "25",
    proposalExpiry:    "30",
  });

  return (
    <div className="p-6 flex gap-6">
      {/* Sidebar nav */}
      <div className="w-44 flex-shrink-0">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Settings</span>
        </div>
        <nav className="space-y-0.5">
          {SECTIONS.map((s) => (
            <button key={s} onClick={() => setSection(s)}
              className={cn("w-full text-left px-3 py-2 rounded-lg text-sm transition-colors", section === s ? "bg-indigo-600/20 text-indigo-300 font-medium" : "text-slate-400 hover:text-slate-200 hover:bg-white/5")}>
              {s}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-2xl">
        {section === "Company" && (
          <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-6 space-y-5">
            <div>
              <h2 className="text-base font-semibold text-white mb-1">Company Information</h2>
              <p className="text-xs text-slate-500">Used on proposals, invoices, and contracts</p>
            </div>
            {[
              { label: "Company Name",    key: "name" },
              { label: "Address",         key: "address" },
              { label: "Phone",           key: "phone" },
              { label: "Email",           key: "email" },
              { label: "Website",         key: "website" },
              { label: "License #",       key: "license" },
              { label: "Tax Rate (%)",    key: "taxRate" },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
                <input
                  value={company[key as keyof typeof company]}
                  onChange={(e) => setCompany({ ...company, [key]: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#1a1a2e] border border-[#2a2a4a] text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            ))}
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm text-white transition-colors">
              <Save className="w-4 h-4" /> Save Company Info
            </button>
          </div>
        )}

        {section === "Estimates" && (
          <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-6 space-y-5">
            <div>
              <h2 className="text-base font-semibold text-white mb-1">Estimate Defaults</h2>
              <p className="text-xs text-slate-500">Default markup, PM fee, and payment milestones</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Default Markup (%)",   key: "defaultMarkup" },
                { label: "PM Fee Rate (%)",       key: "pmFeeRate" },
                { label: "Contingency (%)",       key: "contingency" },
                { label: "Proposal Expiry (days)",key: "proposalExpiry" },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
                  <input
                    value={estimate[key as keyof typeof estimate]}
                    onChange={(e) => setEstimate({ ...estimate, [key]: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg bg-[#1a1a2e] border border-[#2a2a4a] text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              ))}
            </div>
            <div>
              <div className="text-xs font-medium text-slate-400 mb-3">Payment Schedule (%)</div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Deposit",     key: "depositPct" },
                  { label: "Shell",       key: "shellPct" },
                  { label: "Equipment",   key: "equipmentPct" },
                  { label: "Final",       key: "finalPct" },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="block text-[11px] text-slate-500 mb-1">{label}</label>
                    <input
                      value={estimate[key as keyof typeof estimate]}
                      onChange={(e) => setEstimate({ ...estimate, [key]: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#1a1a2e] border border-[#2a2a4a] text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm text-white transition-colors">
              <Save className="w-4 h-4" /> Save Estimate Defaults
            </button>
          </div>
        )}

        {(section === "Finance" || section === "Notifications" || section === "Integrations" || section === "Security") && (
          <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-6">
            <h2 className="text-base font-semibold text-white mb-1">{section}</h2>
            <p className="text-sm text-slate-500 mt-2">Configuration options for {section.toLowerCase()} will be available here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

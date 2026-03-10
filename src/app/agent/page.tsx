"use client";

import { useState } from "react";
import { Brain, AlertTriangle, TrendingUp, Link, FileSearch, Send, Zap } from "lucide-react";

const capabilities = [
  { icon: FileSearch, label: "Analysis",      desc: "Contracts, specs, documents",          color: "text-blue-400",   bg: "bg-blue-900/20 border-blue-800/40" },
  { icon: TrendingUp, label: "Intelligence",  desc: "Patterns, risk, scope creep",           color: "text-purple-400", bg: "bg-purple-900/20 border-purple-800/40" },
  { icon: AlertTriangle, label: "Warnings",  desc: "Pricing drift, failures",               color: "text-yellow-400", bg: "bg-yellow-900/20 border-yellow-800/40" },
  { icon: Link,       label: "Connections",   desc: "Cross-reference detection",             color: "text-green-400",  bg: "bg-green-900/20 border-green-800/40" },
];

const quickPrompts = [
  "Scan my contracts for scope creep risks",
  "What patterns do you see in my active jobs?",
  "Where am I losing money that I haven't noticed?",
  "Identify pricing drift in my recent estimates",
  "Surface any repeating failures across projects",
];

const context = [
  { label: "Active Jobs",    value: "4" },
  { label: "Pending Tasks",  value: "12" },
  { label: "Clients",        value: "43" },
  { label: "Open Estimates", value: "7" },
];

interface Message { role: "user" | "ai"; text: string }

export default function AgentPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "OVERMIND is active. I have analyzed your 4 active jobs, 7 open estimates, and 43 client records. Ask me anything about your projects, estimates, or business patterns." },
  ]);

  const [loading, setLoading] = useState(false);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const userText = text.trim();
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userText }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", text: data.ok ? data.text : `Error: ${data.error}` }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "ai", text: `Network error: ${String(err)}` }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-600/30 mb-4">
          <Brain className="w-7 h-7 text-indigo-400" />
        </div>
        <h1 className="text-2xl font-bold text-white">OVERMIND</h1>
        <p className="text-slate-400 mt-1">OVERMIND reads everything.</p>
        <p className="text-sm text-slate-500 mt-1 max-w-lg mx-auto">
          Analyzes contracts, change orders, emails, specifications. Connects patterns no human had time to notice.
        </p>
      </div>

      {/* Capability Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {capabilities.map((cap) => {
          const Icon = cap.icon;
          return (
            <div key={cap.label} className={`rounded-xl p-4 border ${cap.bg}`}>
              <Icon className={`w-5 h-5 mb-2 ${cap.color}`} />
              <div className="text-sm font-semibold text-white">{cap.label}</div>
              <div className="text-xs text-slate-400 mt-0.5">{cap.desc}</div>
            </div>
          );
        })}
      </div>

      {/* Context */}
      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Current Context</span>
        </div>
        <div className="flex gap-6">
          {context.map((c) => (
            <div key={c.label}>
              <div className="text-lg font-bold text-white">{c.value}</div>
              <div className="text-[11px] text-slate-500">{c.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl overflow-hidden">
        {/* Messages */}
        <div className="h-72 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "ai" && (
                <div className="w-6 h-6 rounded-full bg-indigo-600/30 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                  <Brain className="w-3 h-3 text-indigo-400" />
                </div>
              )}
              <div className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm ${msg.role === "user" ? "bg-indigo-600 text-white" : "bg-white/5 text-slate-300"}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick prompts */}
        <div className="px-4 pb-3 flex flex-wrap gap-2">
          {quickPrompts.map((p) => (
            <button
              key={p}
              onClick={() => sendMessage(p)}
              className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-indigo-600/20 text-slate-400 hover:text-indigo-300 border border-[#2a2a4a] hover:border-indigo-500/40 transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-[#2a2a4a] p-3 flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Ask me anything about your projects, estimates, or tasks..."
            className="flex-1 bg-white/5 border border-[#2a2a4a] rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <span className="text-xs">...</span> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-slate-600">OVERMIND does not give opinions. It gives warnings.</p>
    </div>
  );
}

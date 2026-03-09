"use client";

import { useState } from "react";
import { Send, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const mockThreads = [
  { id: "t1", name: "James Henderson",  avatar: "JH", lastMsg: "Can we upgrade to Pebble Tec?",   time: "2h ago",  unread: 2 },
  { id: "t2", name: "CW Estates HOA",   avatar: "CE", lastMsg: "Inspection confirmed for Mar 12", time: "4h ago",  unread: 0 },
  { id: "t3", name: "Suncoast Resort",  avatar: "SR", lastMsg: "Equipment delivery confirmed",    time: "Yesterday", unread: 0 },
  { id: "t4", name: "Bay Isle Props",   avatar: "BI", lastMsg: "Waiting on soil report",          time: "2d ago",  unread: 1 },
];

const mockMessages: Record<string, Array<{ id: string; from: "me" | "them"; text: string; time: string }>> = {
  t1: [
    { id: "m1", from: "them", text: "Hi, I wanted to ask about upgrading the pool interior finish.", time: "10:02 AM" },
    { id: "m2", from: "me",   text: "Sure! We can do Pebble Tec or Pebble Sheen. Let me send you pricing.", time: "10:15 AM" },
    { id: "m3", from: "them", text: "Can we upgrade to Pebble Tec? What's the cost difference?", time: "10:30 AM" },
  ],
};

export default function MessagesPage() {
  const [active, setActive] = useState("t1");
  const [input, setInput] = useState("");
  const thread = mockThreads.find(t => t.id === active);
  const messages = mockMessages[active] || [];

  return (
    <div className="flex h-[calc(100vh-96px)]">
      {/* Thread list */}
      <div className="w-64 flex-shrink-0 border-r border-[#2a2a4a] flex flex-col bg-[#16213e]">
        <div className="px-4 py-3 border-b border-[#2a2a4a]">
          <h2 className="text-sm font-semibold text-white">Messages</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {mockThreads.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={cn("w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left", active === t.id && "bg-white/5")}
            >
              <div className="w-9 h-9 rounded-full bg-indigo-600/30 flex items-center justify-center text-xs font-semibold text-indigo-300 flex-shrink-0">
                {t.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white truncate">{t.name}</span>
                  <span className="text-[10px] text-slate-600">{t.time}</span>
                </div>
                <div className="text-xs text-slate-500 truncate mt-0.5">{t.lastMsg}</div>
              </div>
              {t.unread > 0 && (
                <div className="w-4 h-4 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
                  {t.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col bg-[#1a1a2e]">
        {thread ? (
          <>
            <div className="px-6 py-3 border-b border-[#2a2a4a] bg-[#16213e] flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600/30 flex items-center justify-center text-xs font-semibold text-indigo-300">
                {thread.avatar}
              </div>
              <span className="text-sm font-semibold text-white">{thread.name}</span>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex", msg.from === "me" ? "justify-end" : "justify-start")}>
                  <div className={cn("max-w-[70%] rounded-xl px-4 py-2.5 text-sm", msg.from === "me" ? "bg-indigo-600 text-white" : "bg-[#16213e] border border-[#2a2a4a] text-slate-300")}>
                    <div>{msg.text}</div>
                    <div className="text-[10px] mt-1 opacity-60">{msg.time}</div>
                  </div>
                </div>
              ))}
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <MessageCircle className="w-8 h-8 text-slate-600 mb-2" />
                  <p className="text-sm text-slate-500">No messages yet</p>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-[#2a2a4a] flex gap-3">
              <input value={input} onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-[#16213e] border border-[#2a2a4a] rounded-lg px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
              />
              <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-slate-500 text-sm">Select a conversation</p>
          </div>
        )}
      </div>
    </div>
  );
}

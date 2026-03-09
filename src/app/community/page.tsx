"use client";

import { useState } from "react";
import { MessageCircle, TrendingUp, Plus, ThumbsUp, Zap, Bug, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = ["all", "tips", "showcase", "help", "discussion", "announcements"];

const mockPosts = [
  { id: "p1", category: "tips",          title: "BOM Engine tip: Use SuperAssemblies for standard pool packages",       author: "Luis R.",   likes: 12, replies: 3,  time: "2h ago" },
  { id: "p2", category: "showcase",      title: "Just completed a 20x40 infinity edge pool — Pebble Sheen + LED show", author: "Marco V.",  likes: 24, replies: 7,  time: "4h ago" },
  { id: "p3", category: "announcements", title: "v2.1 Release — BOM engine now supports variable formula override",    author: "Admin",     likes: 45, replies: 12, time: "1d ago" },
  { id: "p4", category: "help",          title: "How do I set up a tiered estimate with 3 interior finish options?",   author: "Jenna K.", likes: 5,  replies: 4,  time: "2d ago" },
  { id: "p5", category: "discussion",    title: "What markup % are you all using for equipment packages in 2026?",     author: "Derek S.", likes: 18, replies: 9,  time: "3d ago" },
];

const CAT_COLORS: Record<string, string> = {
  tips:          "bg-green-900/40 text-green-300",
  showcase:      "bg-purple-900/40 text-purple-300",
  help:          "bg-blue-900/40 text-blue-300",
  discussion:    "bg-yellow-900/40 text-yellow-300",
  announcements: "bg-indigo-900/40 text-indigo-300",
};

export default function CommunityPage() {
  const [cat, setCat] = useState("all");

  const filtered = cat === "all" ? mockPosts : mockPosts.filter(p => p.category === cat);

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Community</h1>
          <p className="text-sm text-slate-400">Tips, showcases, help, and discussions</p>
        </div>
        <div className="flex items-center gap-2">
          <a href="/community/bugs" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-900/20 border border-red-800/40 text-sm text-red-300 hover:bg-red-900/30 transition-colors">
            <Bug className="w-3.5 h-3.5" /> BugZapper 9000
          </a>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
            <Plus className="w-4 h-4" /> New Post
          </button>
        </div>
      </div>

      {/* Beta Status */}
      <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-800/40 rounded-xl p-4">
        <div className="flex items-center gap-3">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <div className="flex-1">
            <div className="text-sm font-semibold text-white">Beta Tester Rank: <span className="text-yellow-400">Rookie</span></div>
            <div className="text-xs text-slate-400 mt-0.5">Report bugs to earn rank: Rookie → Regular → Expert → Legendary</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-white">0</div>
            <div className="text-xs text-slate-500">bugs zapped</div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button key={c} onClick={() => setCat(c)}
            className={cn("px-3 py-1.5 rounded-full text-sm capitalize transition-colors border", cat === c ? "bg-indigo-600 text-white border-indigo-600" : "text-slate-400 border-[#2a2a4a] hover:text-slate-200 hover:border-[#3a3a5a]")}>
            {c}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-3">
        {filtered.map((post) => (
          <div key={post.id} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4 hover:border-indigo-500/40 transition-colors cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600/30 flex items-center justify-center text-xs font-semibold text-indigo-300 flex-shrink-0">
                {post.author.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-medium text-white leading-snug">{post.title}</h3>
                  <span className={cn("text-[11px] px-2 py-0.5 rounded-full font-medium flex-shrink-0", CAT_COLORS[post.category] || "bg-zinc-800 text-zinc-400")}>{post.category}</span>
                </div>
                <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                  <span>{post.author}</span>
                  <span>{post.time}</span>
                  <button className="flex items-center gap-1 hover:text-indigo-400 transition-colors">
                    <ThumbsUp className="w-3 h-3" /> {post.likes}
                  </button>
                  <button className="flex items-center gap-1 hover:text-indigo-400 transition-colors">
                    <MessageCircle className="w-3 h-3" /> {post.replies}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

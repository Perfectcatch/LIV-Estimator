"use client";

import { useState, KeyboardEvent } from "react";

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  loading?: boolean;
  placeholder?: string;
}

export default function PromptInput({
  onSubmit,
  loading = false,
  placeholder = "Ask Claude something...",
}: PromptInputProps) {
  const [value, setValue] = useState("");

  function handleSubmit() {
    const trimmed = value.trim();
    if (!trimmed || loading) return;
    onSubmit(trimmed);
    setValue("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={4}
        placeholder={placeholder}
        disabled={loading}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/30">⌘ + Enter to send</span>
        <button
          onClick={handleSubmit}
          disabled={loading || !value.trim()}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Generating..." : "Send"}
        </button>
      </div>
    </div>
  );
}

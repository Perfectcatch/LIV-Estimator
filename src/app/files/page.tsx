"use client";

import { useState } from "react";
import { Upload, Folder, FileText, FileArchive, Image, Search } from "lucide-react";

const mockFiles = [
  { id: "f1", name: "Henderson_Pool_Plans_v3.pdf",      type: "pdf",   size: "2.4 MB",  job: "Henderson Residence",  date: "Jan 28, 2026" },
  { id: "f2", name: "CW_Estates_Contract_Signed.pdf",   type: "pdf",   size: "0.8 MB",  job: "Clearwater Estates",   date: "Dec 8, 2025" },
  { id: "f3", name: "Suncoast_Pool_Rendering.jpg",      type: "image", size: "4.1 MB",  job: "Suncoast Resort",       date: "Nov 5, 2025" },
  { id: "f4", name: "Henderson_Permit_Application.pdf", type: "pdf",   size: "1.2 MB",  job: "Henderson Residence",  date: "Jan 30, 2026" },
  { id: "f5", name: "LIV_Pools_Logo_Assets.zip",        type: "zip",   size: "12.5 MB", job: "Company",              date: "Jan 1, 2026" },
  { id: "f6", name: "Bay_Isle_Site_Survey.dwg",         type: "file",  size: "3.7 MB",  job: "Bay Isle Custom Pool",  date: "Feb 18, 2026" },
];

const TYPE_ICONS: Record<string, React.ReactNode> = {
  pdf:   <FileText className="w-8 h-8 text-red-400" />,
  image: <Image className="w-8 h-8 text-blue-400" />,
  zip:   <FileArchive className="w-8 h-8 text-yellow-400" />,
  file:  <FileText className="w-8 h-8 text-slate-400" />,
};

export default function FilesPage() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = mockFiles.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.job.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Files</h1>
          <p className="text-sm text-slate-400">Project documents, drawings, and media</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 bg-[#16213e] border border-[#2a2a4a] rounded-lg p-1">
            {(["grid","list"] as const).map((v) => (
              <button key={v} onClick={() => setView(v)}
                className={`px-3 py-1.5 rounded-md text-sm capitalize transition-colors ${view === v ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"}`}>
                {v}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white transition-colors">
            <Upload className="w-4 h-4" /> Upload
          </button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search files..."
          className="w-full pl-9 pr-4 py-2.5 bg-[#16213e] border border-[#2a2a4a] rounded-lg text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500" />
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((file) => (
            <div key={file.id} className="bg-[#16213e] border border-[#2a2a4a] rounded-xl p-4 hover:border-indigo-500/40 transition-colors cursor-pointer group">
              <div className="flex justify-center mb-3">{TYPE_ICONS[file.type]}</div>
              <div className="text-xs font-medium text-white truncate text-center">{file.name}</div>
              <div className="text-[11px] text-slate-500 text-center mt-1">{file.size}</div>
              <div className="text-[11px] text-slate-600 text-center mt-0.5">{file.job}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#16213e] border border-[#2a2a4a] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#2a2a4a] text-xs text-slate-500 uppercase tracking-wider">
                <th className="text-left px-4 py-3 font-medium">Name</th>
                <th className="text-left px-4 py-3 font-medium">Job</th>
                <th className="text-right px-4 py-3 font-medium">Size</th>
                <th className="text-left px-4 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((file, i) => (
                <tr key={file.id} className={`hover:bg-white/3 transition-colors ${i < filtered.length - 1 ? "border-b border-[#2a2a4a]/50" : ""}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="scale-50 origin-left -ml-2">{TYPE_ICONS[file.type]}</div>
                      <span className="text-slate-200 font-medium">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-xs">{file.job}</td>
                  <td className="px-4 py-3 text-right text-slate-400 text-xs">{file.size}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{file.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

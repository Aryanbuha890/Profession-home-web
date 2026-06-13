import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { FolderOpen, File, ShieldCheck, Clock } from "lucide-react";

export const Route = createFileRoute("/app/startup/docs")({
  component: DocumentsPage,
});

function DocumentsPage() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Data Room</h1>
          <p className="text-sm text-slate-400 mt-1">Secure document storage for due diligence.</p>
        </div>
      </div>

      <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'Legal & Incorporation', items: 12, icon: ShieldCheck, color: 'text-indigo-400' },
            { title: 'Financial Models', items: 5, icon: FolderOpen, color: 'text-emerald-400' },
            { title: 'IP & Patents', items: 3, icon: FolderOpen, color: 'text-purple-400' },
            { title: 'Cap Tables', items: 2, icon: FolderOpen, color: 'text-orange-400' },
          ].map((folder, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl hover:bg-slate-800/50 cursor-pointer transition">
              <div className="p-3 bg-slate-900 rounded-lg">
                <folder.icon className={`w-6 h-6 ${folder.color}`} />
              </div>
              <div>
                <h4 className="text-white font-medium">{folder.title}</h4>
                <p className="text-xs text-slate-400">{folder.items} documents</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-sm font-semibold text-white mt-8 mb-4 uppercase tracking-wider">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { file: 'Q3_Balance_Sheet.xlsx', user: 'Alex (CEO)', time: '2 hours ago' },
            { file: 'Term_Sheet_Draft_v2.pdf', user: 'Legal Counsel', time: '1 day ago' },
          ].map((doc, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/40 transition cursor-pointer">
              <div className="flex items-center gap-3">
                <File className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-200">{doc.file}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span>{doc.user}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {doc.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

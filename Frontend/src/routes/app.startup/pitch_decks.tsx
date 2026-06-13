import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { FileText, Eye, Download, UploadCloud } from "lucide-react";

export const Route = createFileRoute("/app/startup/pitch_decks")({
  component: PitchDecksPage,
});

function PitchDecksPage() {
  const decks = [
    { title: 'Seed Round Deck V2.pdf', date: 'Oct 24, 2025', views: 142, downloads: 12, bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { title: 'Pre-Seed Original.pdf', date: 'Jan 15, 2025', views: 89, downloads: 34, bg: 'bg-slate-800/40 border-slate-700/50' },
    { title: 'Sales Enterprise Deck.pptx', date: 'Nov 2, 2025', views: 45, downloads: 5, bg: 'bg-blue-500/10 border-blue-500/20' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Pitch Decks</h1>
          <p className="text-sm text-slate-400 mt-1">Manage presentations and track viewer engagement.</p>
        </div>
        <button className="px-4 py-2 bg-coral-500 hover:bg-coral-600 text-white rounded-lg text-sm font-medium transition shadow-lg shadow-coral-500/20 flex items-center gap-2">
          <UploadCloud className="w-4 h-4" /> Upload Deck
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {decks.map((deck, i) => (
          <div key={i} className={`p-6 rounded-2xl border ${deck.bg} backdrop-blur-md flex flex-col group hover:scale-[1.02] transition duration-300`}>
            <div className="w-12 h-12 rounded-xl bg-slate-900/50 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-slate-300" />
            </div>
            <h3 className="text-white font-semibold truncate">{deck.title}</h3>
            <p className="text-xs text-slate-400 mt-1">Uploaded {deck.date}</p>
            
            <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center text-sm">
              <div className="flex items-center gap-4 text-slate-300">
                <span className="flex items-center gap-1.5"><Eye className="w-4 h-4 text-slate-500"/> {deck.views}</span>
                <span className="flex items-center gap-1.5"><Download className="w-4 h-4 text-slate-500"/> {deck.downloads}</span>
              </div>
              <button className="text-coral-400 font-medium text-xs hover:text-coral-300 transition">Share Link</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

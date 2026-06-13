import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { Swords, Trophy, Star, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/app/startup/arena")({
  component: StartupArenaPage,
});

function StartupArenaPage() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Swords className="w-7 h-7 text-coral-500" /> Startup Arena
          </h1>
          <p className="text-sm text-slate-400 mt-1">Compete, benchmark, and secure top rankings.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 backdrop-blur-md">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-6">
            <Trophy className="w-5 h-5 text-yellow-500" /> Global Rankings
          </h3>
          <div className="space-y-3">
            {[
              { rank: 1, name: 'Nexus AI', industry: 'Generative AI', score: 98, change: '+2' },
              { rank: 2, name: 'EcoFlow', industry: 'CleanTech', score: 94, change: '+5' },
              { rank: 3, name: 'FinSync', industry: 'FinTech', score: 91, change: '-1' },
            ].map((startup) => (
              <div key={startup.rank} className="flex items-center justify-between p-4 bg-slate-800/30 border border-slate-800/50 rounded-xl hover:bg-slate-800/60 transition group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg bg-slate-800 text-slate-400">{startup.rank}</div>
                  <div>
                    <h4 className="text-white font-medium">{startup.name}</h4>
                    <p className="text-xs text-slate-400">{startup.industry}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-white font-bold flex items-center gap-1">{startup.score} <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /></div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-slate-300 transition" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

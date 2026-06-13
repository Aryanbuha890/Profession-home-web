import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { Users, Search, Plus, Filter, Mail, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/app/startup/investors")({
  component: InvestorsPage,
});

function InvestorsPage() {
  const investors = [
    { name: 'Sequoia Capital', stage: 'Series A', focus: 'AI, B2B SaaS', status: 'In Discussions', logo: 'S' },
    { name: 'Andreessen Horowitz', stage: 'Seed', focus: 'Crypto, AI', status: 'Meeting Scheduled', logo: 'A' },
    { name: 'Y Combinator', stage: 'Pre-Seed', focus: 'Agnostic', status: 'Passed', logo: 'Y' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Investor CRM</h1>
          <p className="text-sm text-slate-400 mt-1">Manage your fundraising pipeline and relationships.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-coral-500 hover:bg-coral-600 text-white rounded-lg text-sm font-medium transition shadow-lg shadow-coral-500/20 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Investor
          </button>
        </div>
      </div>

      <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl overflow-hidden backdrop-blur-md p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search investors..." 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-coral-500 transition"
            />
          </div>
          <button className="p-2 border border-slate-700 bg-slate-800/50 rounded-lg text-slate-300 hover:text-white transition">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {investors.map((inv, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl hover:bg-slate-800/50 transition group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 flex items-center justify-center font-bold text-white">
                  {inv.logo}
                </div>
                <div>
                  <h4 className="text-white font-medium">{inv.name}</h4>
                  <p className="text-xs text-slate-400">Focus: {inv.focus} • Stage: {inv.stage}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className={"text-xs font-semibold px-2.5 py-1 rounded-full " + 
                  (inv.status === 'In Discussions' ? 'bg-blue-500/20 text-blue-400' : 
                   inv.status === 'Passed' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400')
                }>
                  {inv.status}
                </span>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition"><Mail className="w-4 h-4" /></button>
                  <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-slate-300 transition" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

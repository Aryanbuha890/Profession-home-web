import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { Search, Filter, Microscope, MoreVertical, BookOpen } from "lucide-react";

export const Route = createFileRoute("/app/university/researchers_list")({
  component: ResearchersListPage,
});

function ResearchersListPage() {
  const researchers = [
    { name: "Arjun Mehta", id: "RES-842", lab: "Quantum Dynamics Lab", focus: "Quantum Computing", status: "Active", papers: 14 },
    { name: "Dr. Laila Al-Fayed", id: "RES-915", lab: "Bioinformatics Inst", focus: "CRISPR delivery", status: "On Leave", papers: 42 },
    { name: "Samuel Osei", id: "RES-102", lab: "AI & Society", focus: "LLM Alignment", status: "Active", papers: 8 },
    { name: "Mei Lin", id: "RES-334", lab: "Nano-Materials", focus: "Graphene Batteries", status: "Active", papers: 24 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Active Researchers</h1>
          <p className="text-sm text-slate-400 mt-1">Manage PhD candidates, Post-Docs, and Lead Researchers.</p>
        </div>
      </div>

      <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="p-6 border-b border-slate-800/50 flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search researchers by name, lab, or focus area..." 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition"
            />
          </div>
          <button className="p-2 border border-slate-700 bg-slate-800/50 rounded-lg text-slate-300 hover:text-white transition">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="text-xs uppercase bg-slate-950/50 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-semibold">Researcher</th>
                <th className="px-6 py-4 font-semibold">Lab Affiliation</th>
                <th className="px-6 py-4 font-semibold">Focus Area</th>
                <th className="px-6 py-4 font-semibold">Output</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {researchers.map((res, i) => (
                <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center font-bold">
                        {res.name[0]}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-200">{res.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{res.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-2"><Microscope className="w-3.5 h-3.5 text-slate-500" /> {res.lab}</span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-300">{res.focus}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-slate-500"/> {res.papers} Papers</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      res.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                    }`}>
                      {res.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-500 hover:text-white transition p-1">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

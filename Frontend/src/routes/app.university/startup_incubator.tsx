import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { Rocket, TrendingUp, Users, DollarSign, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/app/university/startup_incubator")({
  component: StartupIncubatorPage,
});

function StartupIncubatorPage() {
  const startups = [
    { name: "NeuraSync", sector: "BCI Tech", stage: "Seed", raised: "$1.2M", founders: "Alumni '24" },
    { name: "AgriFlow", sector: "AgriTech", stage: "Pre-Seed", raised: "$150K", founders: "Students" },
    { name: "VeriFi", sector: "Cybersecurity", stage: "Series A", raised: "$8.5M", founders: "Faculty" },
    { name: "QuantumLeap", sector: "Quantum Computing", stage: "Incubating", raised: "Grant", founders: "Students" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-white">Startup Incubator</h1>
        <p className="text-sm text-slate-400 mt-1">Monitor the portfolio of student, alumni, and faculty-led startups.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Active Startups", value: "42", icon: Rocket, color: "text-orange-400", bg: "bg-orange-500/10" },
          { label: "Total Funding Raised", value: "$42.5M", icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-500/10" },
          { label: "Successful Exits", value: "4", icon: TrendingUp, color: "text-blue-400", bg: "bg-blue-500/10" },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900/40 border border-slate-800/60 p-6 rounded-2xl backdrop-blur-md flex items-center gap-4">
            <div className={`p-4 rounded-xl ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 backdrop-blur-md">
        <h3 className="text-lg font-bold text-white mb-6">Portfolio Spotlight</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {startups.map((startup, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl hover:bg-slate-800/50 transition cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center font-bold text-white border border-slate-600">
                  {startup.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-white group-hover:text-orange-400 transition">{startup.name}</h4>
                  <p className="text-xs text-slate-400">{startup.sector} • {startup.founders}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-emerald-400">{startup.raised}</p>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">{startup.stage}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-slate-300 transition" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

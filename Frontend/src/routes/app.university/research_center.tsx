import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { Sparkles, FileText, Database, Microscope, ChevronRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/app/university/research_center")({
  component: ResearchCenterPage,
});

function ResearchCenterPage() {
  const activityData = [
    { month: 'Jan', papers: 45, citations: 320 },
    { month: 'Feb', papers: 52, citations: 410 },
    { month: 'Mar', papers: 38, citations: 480 },
    { month: 'Apr', papers: 65, citations: 550 },
    { month: 'May', papers: 85, citations: 680 },
    { month: 'Jun', papers: 110, citations: 890 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-white">Central Research Repository</h1>
        <p className="text-sm text-slate-400 mt-1">Aggregate and analyze university-wide research publications and citations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 backdrop-blur-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Publication vs Citation Volume</h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorCite" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="citations" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorCite)" name="Citations" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-4">Core Focus Areas</h3>
            <div className="space-y-3">
              {[
                { name: "Quantum Computing", papers: 142, icon: Database, color: "text-blue-400" },
                { name: "Synthetic Biology", papers: 98, icon: Microscope, color: "text-emerald-400" },
                { name: "Large Language Models", papers: 215, icon: Sparkles, color: "text-violet-400" },
              ].map((area, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50 transition cursor-pointer">
                  <div className="flex items-center gap-3">
                    <area.icon className={`w-5 h-5 ${area.color}`} />
                    <span className="text-sm font-medium text-slate-200">{area.name}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-500">{area.papers}</span>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-2xl font-bold shadow-lg shadow-violet-500/20 transition flex items-center justify-center gap-2">
            <FileText className="w-5 h-5" /> Generate Research Impact Report
          </button>
        </div>
      </div>
    </div>
  );
}

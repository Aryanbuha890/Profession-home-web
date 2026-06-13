import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { Users, GraduationCap, Building, TrendingUp, Sparkles, BookOpen, MapPin, ChevronRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/app/university/")({
  component: UniversityHome,
});

function UniversityHome() {
  const chartData = [
    { name: '2021', publications: 400, patents: 240, startups: 120 },
    { name: '2022', publications: 520, patents: 280, startups: 160 },
    { name: '2023', publications: 650, patents: 350, startups: 210 },
    { name: '2024', publications: 800, patents: 420, startups: 290 },
    { name: '2025', publications: 950, patents: 510, startups: 380 },
    { name: '2026', publications: 1100, patents: 600, startups: 450 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">University Command Center</h1>
          <p className="text-slate-400 mt-1">Real-time overview of academics, research, and innovation.</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Current Semester</p>
          <p className="text-sm font-bold text-sky-400">Spring 2026</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Students", value: "14,500", trend: "+5% YoY", icon: Users, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
          { label: "Active Faculty", value: "1,240", trend: "98% Retention", icon: GraduationCap, color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20" },
          { label: "Research Grants", value: "₹45.2Cr", trend: "+12% YoY", icon: Sparkles, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
          { label: "Industry Partners", value: "184", trend: "22 New", icon: Building, color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
        ].map((stat, i) => (
          <div key={i} className={`p-5 rounded-2xl border backdrop-blur-md ${stat.bg} hover:scale-[1.02] transition-transform`}>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 rounded-lg bg-slate-900/50">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-900/50 px-2 py-1 rounded-md">{stat.trend}</span>
            </div>
            <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-xs font-medium text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 backdrop-blur-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Innovation Output (5-Year Trend)</h3>
            <div className="flex gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-blue-400"><div className="w-2 h-2 rounded-full bg-blue-400" /> Publications</span>
              <span className="flex items-center gap-1.5 text-emerald-400"><div className="w-2 h-2 rounded-full bg-emerald-400" /> Patents</span>
            </div>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPub" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="publications" stroke="#60a5fa" strokeWidth={3} fillOpacity={1} fill="url(#colorPub)" />
                <Area type="monotone" dataKey="patents" stroke="#34d399" strokeWidth={3} fillOpacity={1} fill="url(#colorPat)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 backdrop-blur-md flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Upcoming Campus Events</h3>
          <div className="space-y-4 flex-1">
            {[
              { title: "Annual Tech Symposium", date: "Oct 24", type: "Conference", icon: BookOpen, color: "text-blue-400", bg: "bg-blue-400/10" },
              { title: "Startup Pitch Day", date: "Nov 02", type: "Incubator", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-400/10" },
              { title: "Alumni Meet 2026", date: "Nov 15", type: "Networking", icon: Users, color: "text-purple-400", bg: "bg-purple-400/10" },
            ].map((event, i) => (
              <div key={i} className="flex gap-4 items-center group cursor-pointer hover:bg-slate-800/40 p-2 rounded-xl transition">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${event.bg}`}>
                  <event.icon className={`w-5 h-5 ${event.color}`} />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition">{event.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{event.date} • {event.type}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition" />
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-lg transition">
            View Full Calendar
          </button>
        </div>
      </div>
    </div>
  );
}

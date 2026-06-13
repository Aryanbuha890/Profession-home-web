import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { Activity, Target, Users, TrendingUp, Rocket, ArrowUpRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const Route = createFileRoute("/app/startup/")({
  component: HomeDashboard,
});

const RUNWAY_DATA = [
  { month: 'Jan', balance: 120000 }, { month: 'Feb', balance: 105000 },
  { month: 'Mar', balance: 98000 }, { month: 'Apr', balance: 85000 },
  { month: 'May', balance: 76000 }, { month: 'Jun', balance: 95000 },
  { month: 'Jul', balance: 88000 },
];

function HomeDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Welcome back, Alex</h1>
          <p className="text-slate-400 mt-1">Here is what's happening with Startup Hub today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition border border-slate-700">
            View Reports
          </button>
          <button className="px-4 py-2 bg-coral-500 hover:bg-coral-600 text-white rounded-lg text-sm font-medium transition shadow-lg shadow-coral-500/20 flex items-center gap-2">
            <Rocket className="w-4 h-4" /> New Sprint
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Runway', value: '8.4 Months', icon: Activity, trend: '-2.1%', color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'MRR', value: '$12,450', icon: TrendingUp, trend: '+14.5%', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Active Users', value: '1,284', icon: Users, trend: '+5.2%', color: 'text-coral-400', bg: 'bg-coral-500/10' },
          { label: 'Conversion Goal', value: '64%', icon: Target, trend: '+1.2%', color: 'text-purple-400', bg: 'bg-purple-500/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 backdrop-blur-md hover:bg-slate-800/40 transition duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-400 mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
              </div>
              <div className={"p-2 rounded-xl " + stat.bg}>
                <stat.icon className={"w-5 h-5 " + stat.color} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className={stat.trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}>{stat.trend}</span>
              <span className="text-slate-500 ml-2">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 backdrop-blur-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white">Cash Flow & Runway</h3>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={RUNWAY_DATA}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => "$" + (val/1000) + "k"} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc' }} itemStyle={{ color: '#f97316' }} />
                <Area type="monotone" dataKey="balance" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 backdrop-blur-md flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-6">Critical Path</h3>
          <div className="space-y-4 flex-1">
            {[
              { title: 'Finalize Seed Pitch Deck', tag: 'High', time: 'Today', c: 'orange' },
              { title: 'Submit Stripe Verification', tag: 'Critical', time: 'ASAP', c: 'rose' },
              { title: 'Interview Lead Engineer', tag: 'High', time: 'Wed, 2 PM', c: 'orange' },
            ].map((task, i) => (
              <div key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-800/50 transition cursor-pointer border border-transparent hover:border-slate-700/50">
                <div className="mt-1 w-5 h-5 rounded-md border-2 border-slate-600 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-slate-200">{task.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={"text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-" + task.c + "-500/20 text-" + task.c + "-400"}>
                      {task.tag}
                    </span>
                    <span className="text-xs text-slate-500">{task.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

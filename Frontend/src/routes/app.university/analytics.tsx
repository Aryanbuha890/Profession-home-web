import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Users, GraduationCap, Building, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/app/university/analytics")({
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const data = [
    { month: 'Jan', enrollment: 4000, placement: 2400 },
    { month: 'Feb', enrollment: 4200, placement: 2600 },
    { month: 'Mar', enrollment: 4500, placement: 2800 },
    { month: 'Apr', enrollment: 4700, placement: 2900 },
    { month: 'May', enrollment: 5000, placement: 3200 },
    { month: 'Jun', enrollment: 5400, placement: 3800 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics Center</h1>
        <p className="text-sm text-slate-400 mt-1">High-level insights into university performance and student outcomes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Students", value: "12,480", trend: "+4%", icon: Users, color: "text-blue-400" },
          { label: "Graduation Rate", value: "94.2%", trend: "+1.2%", icon: GraduationCap, color: "text-emerald-400" },
          { label: "Partner Companies", value: "342", trend: "+12", icon: Building, color: "text-purple-400" },
          { label: "Avg. Placement Salary", value: "₹8.5L", trend: "+8%", icon: TrendingUp, color: "text-amber-400" },
        ].map((stat, i) => (
          <div key={i} className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md">
            <div className="flex justify-between items-start mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">{stat.trend}</span>
            </div>
            <p className="text-2xl font-bold text-white mt-3">{stat.value}</p>
            <h3 className="text-xs text-slate-400 mt-1 uppercase tracking-wider">{stat.label}</h3>
          </div>
        ))}
      </div>

      <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 backdrop-blur-md mt-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">Growth & Placements (YTD)</h3>
        </div>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorEnrollment" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPlacement" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Area type="monotone" dataKey="enrollment" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorEnrollment)" name="Enrollments" />
              <Area type="monotone" dataKey="placement" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorPlacement)" name="Placements" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

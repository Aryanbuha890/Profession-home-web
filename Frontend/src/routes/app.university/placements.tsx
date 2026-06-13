import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { Briefcase, TrendingUp, Building, Award } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export const Route = createFileRoute("/app/university/placements")({
  component: PlacementsPage,
});

function PlacementsPage() {
  const data = [
    { name: 'Computer Science', placed: 180, total: 200 },
    { name: 'Electronics', placed: 120, total: 150 },
    { name: 'Mechanical', placed: 90, total: 130 },
    { name: 'Civil', placed: 60, total: 100 },
    { name: 'Biotech', placed: 40, total: 80 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-white">Placement Drive 2026</h1>
        <p className="text-sm text-slate-400 mt-1">Track recruitment metrics and partner company engagement.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl">
              <Briefcase className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm text-slate-400">Total Placed</h3>
              <p className="text-2xl font-bold text-white">845</p>
            </div>
          </div>
          <p className="text-xs text-emerald-400 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> +12% from last year</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-sky-500/10 rounded-xl">
              <Building className="w-6 h-6 text-sky-400" />
            </div>
            <div>
              <h3 className="text-sm text-slate-400">Companies Visited</h3>
              <p className="text-2xl font-bold text-white">124</p>
            </div>
          </div>
          <p className="text-xs text-sky-400 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> +8 new partners</p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-amber-500/10 rounded-xl">
              <Award className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm text-slate-400">Highest Package</h3>
              <p className="text-2xl font-bold text-white">₹42 LPA</p>
            </div>
          </div>
          <p className="text-xs text-slate-500">Offered by Microsoft</p>
        </div>
      </div>

      <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 backdrop-blur-md">
        <h3 className="text-lg font-semibold text-white mb-6">Placement by Department</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Bar dataKey="total" fill="#1e293b" radius={[4, 4, 0, 0]} name="Total Eligible" />
              <Bar dataKey="placed" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Placed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { Coins, HandCoins, Building, FileCheck } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export const Route = createFileRoute("/app/university/grants")({
  component: GrantsPage,
});

function GrantsPage() {
  const data = [
    { name: 'Gov Grants', allocated: 25, utilized: 18 },
    { name: 'Corporate R&D', allocated: 15, utilized: 12 },
    { name: 'Endowments', allocated: 40, utilized: 35 },
    { name: 'Alumni Funds', allocated: 10, utilized: 5 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Grants & Funding Center</h1>
          <p className="text-sm text-slate-400 mt-1">Monitor active grants, utilization metrics, and upcoming deadlines.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 backdrop-blur-md">
          <h3 className="text-lg font-bold text-white mb-6">Fund Allocation vs Utilization (in Crores)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                  cursor={{ fill: '#1e293b', opacity: 0.4 }}
                />
                <Bar dataKey="allocated" fill="#1e293b" radius={[4, 4, 0, 0]} name="Total Allocated" />
                <Bar dataKey="utilized" fill="#10b981" radius={[4, 4, 0, 0]} name="Utilized" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-6 bg-slate-900/40 border border-slate-800/60 rounded-2xl backdrop-blur-md text-center">
            <div className="w-12 h-12 mx-auto bg-emerald-500/10 rounded-full flex items-center justify-center mb-3">
              <Coins className="w-6 h-6 text-emerald-400" />
            </div>
            <p className="text-3xl font-bold text-white">₹90 Cr</p>
            <p className="text-xs uppercase tracking-wider text-slate-400 mt-1">Total Active Funds</p>
          </div>
          
          <div className="p-6 bg-slate-900/40 border border-slate-800/60 rounded-2xl backdrop-blur-md">
            <h3 className="text-sm font-semibold text-white mb-4">Pending Approvals</h3>
            <div className="space-y-3">
              {[
                { title: "Quantum Lab Expansion", amount: "₹4.5 Cr", by: "Govt. of India", icon: Building },
                { title: "AI Medical Diagnostics", amount: "₹2.1 Cr", by: "Apollo Hospitals", icon: FileCheck },
              ].map((grant, i) => (
                <div key={i} className="flex gap-3 items-center p-3 rounded-xl bg-slate-800/30 border border-slate-700/50">
                  <div className="p-2 bg-slate-900 rounded-lg">
                    <grant.icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-200">{grant.title}</p>
                    <p className="text-[10px] text-slate-400">Req: {grant.amount} • {grant.by}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

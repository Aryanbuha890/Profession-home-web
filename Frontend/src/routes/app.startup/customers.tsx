import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const Route = createFileRoute("/app/startup/customers")({
  component: CustomersPage,
});

const CUSTOMER_GROWTH = [
  { month: 'Jan', new: 120, churned: 10, mrr: 12000 },
  { month: 'Feb', new: 150, churned: 15, mrr: 15000 },
  { month: 'Mar', new: 180, churned: 12, mrr: 18500 },
  { month: 'Apr', new: 220, churned: 20, mrr: 23000 },
];

function CustomersPage() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-white">Customer Intelligence</h1>
        <p className="text-sm text-slate-400 mt-1">Growth metrics and top accounts.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">MRR vs Churn</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={CUSTOMER_GROWTH}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v)=>"$" + (v/1000) + "k"} />
                <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }} />
                <Bar yAxisId="right" dataKey="new" fill="#3b82f6" radius={[4, 4, 0, 0]} name="New Users" />
                <Bar yAxisId="right" dataKey="churned" fill="#ef4444" radius={[4, 4, 0, 0]} name="Churned Users" />
                <Line yAxisId="left" type="monotone" dataKey="mrr" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} name="MRR" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Top Accounts</h3>
          <div className="space-y-4">
            {[
              { name: 'Acme Corp', tier: 'Enterprise', mrr: '$2,500', health: '98%', c: 'text-emerald-400' },
              { name: 'Globex Inc', tier: 'Pro', mrr: '$800', health: '85%', c: 'text-blue-400' },
              { name: 'Soylent', tier: 'Enterprise', mrr: '$3,200', health: '45%', c: 'text-rose-400' },
            ].map((acc, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-slate-800/40 rounded-xl border border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">{acc.name[0]}</div>
                  <div>
                    <p className="text-white font-medium">{acc.name}</p>
                    <p className="text-xs text-slate-400">{acc.tier}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{acc.mrr}</p>
                  <p className={"text-xs font-medium " + acc.c}>Health: {acc.health}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

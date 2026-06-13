import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { Plus } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export const Route = createFileRoute("/app/startup/funding")({
  component: FundingCenterPage,
});

const FUNDING_HISTORY = [
  { round: 'Pre-Seed', amount: 250000, valuation: 2500000, date: 'Jan 2025' },
  { round: 'Seed', amount: 1500000, valuation: 10000000, date: 'Oct 2025' },
];

function FundingCenterPage() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-white">Funding Center</h1>
        <p className="text-sm text-slate-400 mt-1">Capital management and cap table.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 col-span-2">
          <h3 className="text-lg font-semibold text-white mb-4">Capital Raised</h3>
          <div className="space-y-4">
            {FUNDING_HISTORY.map((fund, i) => (
              <div key={i} className="flex items-center justify-between p-5 bg-slate-800/30 border border-slate-700/50 rounded-xl">
                <div>
                  <span className="text-xs font-bold text-coral-400 uppercase tracking-wider">{fund.date}</span>
                  <h4 className="text-xl font-bold text-white mt-1">{fund.round}</h4>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-400 mb-1">Amount Raised</p>
                  <p className="text-2xl font-bold text-emerald-400">{"$" + (fund.amount/1000) + "k"}</p>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-sm text-slate-400 mb-1">Post-Money Val</p>
                  <p className="text-xl font-bold text-white">{"$" + (fund.valuation/1000000) + "M"}</p>
                </div>
              </div>
            ))}
            <button className="w-full py-4 border-2 border-dashed border-slate-700 rounded-xl text-slate-400 hover:text-white hover:border-slate-500 transition flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" /> Add Funding Round
            </button>
          </div>
        </div>
        <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Cap Table Summary</h3>
          <div className="h-48 relative mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[{n:'Founders', v: 75}, {n:'Investors', v: 15}, {n:'Option Pool', v: 10}]} innerRadius={50} outerRadius={80} dataKey="v" stroke="none">
                  <Cell fill="#f97316" />
                  <Cell fill="#3b82f6" />
                  <Cell fill="#10b981" />
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm"><span className="text-coral-400">● Founders</span><span className="text-white">75%</span></div>
            <div className="flex justify-between text-sm"><span className="text-blue-400">● Investors</span><span className="text-white">15%</span></div>
            <div className="flex justify-between text-sm"><span className="text-emerald-400">● Option Pool</span><span className="text-white">10%</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

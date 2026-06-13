import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { Filter, Download } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const Route = createFileRoute("/app/startup/analytics")({
  component: AnalyticsPage,
});

const USER_ACQUISITION = [
  { name: 'Mon', organic: 4000, paid: 2400 },
  { name: 'Tue', organic: 3000, paid: 1398 },
  { name: 'Wed', organic: 2000, paid: 9800 },
  { name: 'Thu', organic: 2780, paid: 3908 },
  { name: 'Fri', organic: 1890, paid: 4800 },
  { name: 'Sat', organic: 2390, paid: 3800 },
  { name: 'Sun', organic: 3490, paid: 4300 },
];
const TRAFFIC_SOURCES = [{ name: 'Direct', value: 400 }, { name: 'Social', value: 300 }, { name: 'Search', value: 300 }, { name: 'Referral', value: 200 }];
const COLORS = ['#f97316', '#3b82f6', '#10b981', '#8b5cf6'];

function AnalyticsPage() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Performance Analytics</h1>
          <p className="text-sm text-slate-400 mt-1">Measure what matters. Last 7 days.</p>
        </div>
        <div className="flex gap-3">
          <button className="p-2 border border-slate-700 bg-slate-800/50 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition flex items-center gap-2">
            <Filter className="w-4 h-4" /> <span className="hidden sm:inline">Filter</span>
          </button>
          <button className="px-4 py-2 bg-coral-500 hover:bg-coral-600 text-white rounded-lg text-sm font-medium transition shadow-lg shadow-coral-500/20 flex items-center gap-2">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 backdrop-blur-md">
          <h3 className="text-base font-semibold text-white mb-6">User Acquisition Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={USER_ACQUISITION} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: '#1e293b', opacity: 0.4 }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }} />
                <Bar dataKey="organic" stackId="a" fill="#f97316" radius={[0, 0, 4, 4]} />
                <Bar dataKey="paid" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 backdrop-blur-md flex flex-col">
          <h3 className="text-base font-semibold text-white mb-2">Traffic Sources</h3>
          <div className="flex-1 min-h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={TRAFFIC_SOURCES} innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value" stroke="none">
                  {TRAFFIC_SOURCES.map((entry, index) => (
                    <Cell key={"cell-" + index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-white">1.2k</span>
              <span className="text-xs text-slate-400">Total Visits</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

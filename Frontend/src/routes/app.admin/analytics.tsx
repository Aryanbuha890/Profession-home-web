import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import { 
  TrendingUp, Users, DollarSign, Activity, Cpu, HardDrive, 
  Clock, CheckCircle, AlertTriangle, ArrowUpRight, Calendar, Download
} from "lucide-react";
import { toast, Toaster } from "sonner";

export const Route = createFileRoute("/app/admin/analytics")({
  component: AnalyticsPage,
});

interface EventLog {
  id: string;
  type: "info" | "success" | "warning";
  module: string;
  message: string;
  time: string;
}

const SYSTEM_LOGS: EventLog[] = [
  { id: "LOG-001", type: "success", module: "AUTH", message: "User USR-003 successfully updated MFA profile settings.", time: "2 mins ago" },
  { id: "LOG-002", type: "info", module: "REWARDS", message: "Reward item RWD-701 restocked to 45 units.", time: "12 mins ago" },
  { id: "LOG-003", type: "warning", module: "PAYMENTS", message: "Stripe API Webhook latency exceeded 2500ms threshold.", time: "45 mins ago" },
  { id: "LOG-004", type: "success", module: "SYSTEM", message: "Automated incremental backup verified (size: 4.8GB).", time: "1 hour ago" },
  { id: "LOG-005", type: "info", module: "INCUBATOR", message: "New pitch deck uploaded by startup STP-304.", time: "3 hours ago" }
];

function AnalyticsPage() {
  const [activeTimeframe, setActiveTimeframe] = useState<"7D" | "30D" | "12M">("7D");

  const handleExportData = () => {
    toast.success("Preparing analytics data export. Download starting shortly.");
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500 p-6 pb-16">
      <Toaster theme="dark" closeButton position="top-right" />

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Executive System Analytics</h1>
          <p className="text-xs text-slate-400 mt-1">Real-time system telemetry, active users growth, revenue pools, and hardware resources usage.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-950 p-1 border border-slate-800 rounded-xl text-xs">
            {(["7D", "30D", "12M"] as const).map(tf => (
              <button
                key={tf}
                onClick={() => setActiveTimeframe(tf)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                  activeTimeframe === tf 
                    ? "bg-slate-900 text-white" 
                    : "text-slate-500 hover:text-slate-350"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
          <button 
            onClick={handleExportData}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-bold px-3.5 py-2.5 rounded-xl text-xs transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" /> Export PDF
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Daily Active Users", val: "1,248", change: "+12.4%", desc: "vs last week", icon: Users, color: "text-sky-400" },
          { label: "Gross ARR Revenue", val: "$142,500", change: "+8.2%", desc: "vs last month", icon: DollarSign, color: "text-emerald-400" },
          { label: "API Requests / Sec", val: "482 req/s", change: "Optimal", desc: "99.98% success rate", icon: Activity, color: "text-indigo-400" },
          { label: "Server Load CPU", val: "24.6%", change: "Healthy", desc: "4 nodes active", icon: Cpu, color: "text-rose-400" }
        ].map((item, idx) => (
          <div key={idx} className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 backdrop-blur-md">
            <div className="flex justify-between items-start">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">{item.label}</span>
              <item.icon className={`w-4 h-4 ${item.color}`} />
            </div>
            <div className="text-2xl font-bold mt-2 text-white font-mono tracking-tight">{item.val}</div>
            <div className="flex items-center gap-1.5 mt-2.5">
              <span className="text-[10px] font-bold text-emerald-400 font-mono">{item.change}</span>
              <span className="text-[10px] text-slate-500">{item.desc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Primary Chart Area & Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* User Growth Custom SVG Area Chart */}
        <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-5 lg:col-span-2 backdrop-blur-md space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-sm font-bold text-white">Platform Growth & Activity</h2>
              <p className="text-[10px] text-slate-550">Interactive display of cumulative user signs and requests rate.</p>
            </div>
            <div className="flex gap-4 text-[10px] font-semibold">
              <div className="flex items-center gap-1.5 text-sky-400">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span>Active Signups</span>
              </div>
              <div className="flex items-center gap-1.5 text-indigo-400">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span>API Calls (x1000)</span>
              </div>
            </div>
          </div>

          {/* SVG Chart Render */}
          <div className="relative pt-6 h-60 w-full bg-slate-950/40 border border-slate-850 rounded-xl overflow-hidden">
            <svg viewBox="0 0 500 200" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0"/>
                </linearGradient>
                <linearGradient id="indyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0.0"/>
                </linearGradient>
              </defs>
              
              {/* Grid Lines */}
              <line x1="0" y1="40" x2="500" y2="40" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3" />
              <line x1="0" y1="90" x2="500" y2="90" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3" />
              <line x1="0" y1="140" x2="500" y2="140" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3" />
              
              {/* Sky Line Area (Active Signups) */}
              <path 
                d="M0,160 Q70,120 140,130 T280,70 T420,80 L500,30 L500,200 L0,200 Z" 
                fill="url(#skyGrad)" 
              />
              <path 
                d="M0,160 Q70,120 140,130 T280,70 T420,80 L500,30" 
                fill="none" 
                stroke="#38bdf8" 
                strokeWidth="2.5" 
              />
              
              {/* Indigo Line Area (API Calls) */}
              <path 
                d="M0,180 Q60,160 120,110 T240,120 T360,60 L500,45 L500,200 L0,200 Z" 
                fill="url(#indyGrad)" 
              />
              <path 
                d="M0,180 Q60,160 120,110 T240,120 T360,60 L500,45" 
                fill="none" 
                stroke="#818cf8" 
                strokeWidth="2" 
                strokeDasharray="4 2" 
              />

              {/* Data circles */}
              <circle cx="280" cy="70" r="4.5" fill="#38bdf8" stroke="#0f172a" strokeWidth="1.5" />
              <circle cx="360" cy="60" r="4" fill="#818cf8" stroke="#0f172a" strokeWidth="1.5" />
            </svg>
            
            {/* Chart Axes Labels */}
            <div className="absolute bottom-2 left-4 right-4 flex justify-between text-[8px] text-slate-600 font-mono">
              <span>MON</span>
              <span>TUE</span>
              <span>WED</span>
              <span>THU</span>
              <span>FRI</span>
              <span>SAT</span>
              <span>SUN</span>
            </div>
          </div>
        </div>

        {/* User Workspace Role Distribution */}
        <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-5 backdrop-blur-md flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-white">Role Demographics</h2>
            <p className="text-[10px] text-slate-550">Distribution of platform accounts across user roles.</p>
          </div>

          {/* Bar Chart list */}
          <div className="space-y-3.5 my-4">
            {[
              { label: "Students", count: 4200, pct: 65, color: "bg-sky-400" },
              { label: "Incubated Startups", count: 180, pct: 15, color: "bg-rose-455" },
              { label: "Expert Advisors", count: 142, pct: 12, color: "bg-amber-400" },
              { label: "Investors", count: 54, pct: 8, color: "bg-emerald-450" }
            ].map((bar, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="font-semibold text-slate-300">{bar.label}</span>
                  <span className="font-mono text-slate-500">{bar.count} ({bar.pct}%)</span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                  <div className={`h-full rounded-full ${bar.color}`} style={{ width: `${bar.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="text-[9px] text-slate-500 text-center leading-normal pt-2 border-t border-slate-850">
            Total registered database footprint: <span className="font-bold text-slate-300">4,576 profiles</span>.
          </div>
        </div>
      </div>

      {/* System Logs & Telemetry Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* System Health circles */}
        <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-5 backdrop-blur-md space-y-4">
          <div>
            <h2 className="text-sm font-bold text-white">Hardware Telemetry</h2>
            <p className="text-[10px] text-slate-550">Real-time status of compute nodes resources load.</p>
          </div>

          <div className="grid grid-cols-3 gap-2 py-2">
            {[
              { label: "CPU Load", val: "24%", color: "border-sky-400/30 text-sky-400", sub: "Healthy" },
              { label: "Memory", val: "68%", color: "border-amber-400/30 text-amber-400", sub: "Moderate" },
              { label: "SSD Storage", val: "42%", color: "border-emerald-450/30 text-emerald-450", sub: "Optimal" }
            ].map((node, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-3 border border-slate-850 rounded-xl bg-slate-950/20 text-center">
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono font-bold text-xs ${node.color}`}>
                  {node.val}
                </div>
                <span className="text-[9px] text-slate-400 font-semibold mt-2">{node.label}</span>
                <span className="text-[8px] text-slate-550 mt-0.5">{node.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Event Log */}
        <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-5 lg:col-span-2 backdrop-blur-md space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-sm font-bold text-white">Real-Time Security & System Logs</h2>
              <p className="text-[10px] text-slate-550">Continuous system health audits from security console.</p>
            </div>
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
            {SYSTEM_LOGS.map((log) => (
              <div key={log.id} className="flex items-start gap-2.5 text-[10px] border border-slate-850 bg-slate-950/30 rounded-xl p-2.5">
                {log.type === "success" ? (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                ) : log.type === "warning" ? (
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                ) : (
                  <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-300 font-mono">[{log.module}] {log.id}</span>
                    <span className="text-[9px] text-slate-500 font-mono">{log.time}</span>
                  </div>
                  <p className="text-slate-400 mt-1 leading-relaxed truncate">{log.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

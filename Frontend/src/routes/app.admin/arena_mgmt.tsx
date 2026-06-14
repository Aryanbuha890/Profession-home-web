import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import { 
  CalendarDays, Map, Users, Globe, QrCode, Smartphone, 
  Search, Plus, ShieldAlert, Cpu, CheckCircle, Database
} from "lucide-react";
import { toast, Toaster } from "sonner";

export const Route = createFileRoute("/app/admin/arena_mgmt")({
  component: ArenaManagementPage,
});

function ArenaManagementPage() {
  const [activeTab, setActiveTab] = useState<"scheduling" | "seating" | "turnstiles">("scheduling");

  const handleScanSimulation = () => {
    toast.success("Scanned Digital Access Pass. Staff credentials verified.");
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500 p-6 pb-16">
      <Toaster theme="dark" closeButton position="top-right" />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Arena & Event Operations Suite</h1>
          <p className="text-xs text-slate-400 mt-1">
            Streamline multi-event schedules, customize seat plans, monitor staff logs, and scan turnstile hardware.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            Live Suite Active
          </span>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Column 1 */}
        <div className="flex flex-col gap-6">
          {/* Multi-Event Scheduling Card */}
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-6 backdrop-blur-md">
            <div className="h-44 bg-slate-950/50 border border-slate-850 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
              <div className="flex gap-2 transform -rotate-12">
                <div className="bg-red-500 text-white px-4 py-2 rounded-xl shadow-lg font-bold text-xs">Concert +90k</div>
                <div className="bg-indigo-600 text-white px-4 py-2 rounded-xl shadow-lg font-bold text-xs mt-8">Tech Summit +45k</div>
              </div>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 w-8 h-8 rounded-xl flex items-center justify-center mb-4">
              <CalendarDays className="text-red-400 w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">Multi-Event Scheduling</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Manage overlapping workshops, hackathons, and pitch sessions without double-booking venue facilities.
            </p>
          </div>

          {/* Dynamic Seating Card */}
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-6 backdrop-blur-md">
            <div className="h-44 bg-slate-950/50 border border-slate-850 rounded-2xl mb-6 flex items-center justify-center">
              <div className="flex items-end gap-2.5 h-20">
                <div className="w-5 bg-indigo-500 h-full rounded-t-lg"></div>
                <div className="w-5 bg-slate-800 h-3/4 rounded-t-lg"></div>
                <div className="w-5 bg-indigo-500 h-1/2 rounded-t-lg"></div>
              </div>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 w-8 h-8 rounded-xl flex items-center justify-center mb-4">
              <Map className="text-emerald-400 w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">Dynamic Seating Plans</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Customize stage/room structures instantly to fit the specific needs of different event sizes and capacities.
            </p>
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-6">
          {/* Crew Management Card */}
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-6 backdrop-blur-md">
            <div className="h-44 bg-slate-950/50 border border-slate-850 rounded-2xl mb-6 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center font-bold text-xs text-violet-400">QA</div>
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center font-bold text-xs text-sky-400">DEV</div>
                <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center font-bold text-xs text-rose-400">OPS</div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center font-bold text-xs text-amber-400">SEC</div>
              </div>
            </div>
            <div className="bg-violet-500/10 border border-violet-500/20 w-8 h-8 rounded-xl flex items-center justify-center mb-4">
              <Users className="text-violet-400 w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">Crew & Staff Coordinator</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Assign moderator roles, coordinate on-site technical support crew, and audit shift access.
            </p>
          </div>

          {/* Global Promoter sync */}
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-6 backdrop-blur-md">
            <div className="h-44 bg-slate-950/50 border border-slate-850 rounded-2xl mb-6 flex items-center justify-center">
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-450 rounded-2xl p-4 w-full max-w-[200px]">
                <div className="text-[10px] opacity-75 mb-1.5 font-bold uppercase tracking-wider">Agency Integration</div>
                <div className="flex justify-between items-center text-sm font-mono font-bold">
                  <span>MIT</span>
                  <span>↔</span>
                  <span>SF</span>
                </div>
              </div>
            </div>
            <div className="bg-sky-500/10 border border-sky-500/20 w-8 h-8 rounded-xl flex items-center justify-center mb-4">
              <Globe className="text-sky-400 w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">Cross-Campus Promoters</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Sync securely with international promoters, universities placement cells, and major talent agencies.
            </p>
          </div>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-6">
          {/* VIP Access Pass Card */}
          <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-3xl p-6 text-white shadow-xl flex flex-col items-center text-center h-[380px] relative overflow-hidden">
            <div className="w-12 h-1 bg-white/30 rounded-full mb-6"></div>
            <h3 className="font-bold text-sm mb-6 tracking-wide uppercase">Digital Access Pass</h3>

            <button 
              onClick={handleScanSimulation}
              className="bg-white p-5 rounded-2xl mb-5 shadow-2xl hover:scale-105 transition cursor-pointer"
            >
              <QrCode className="w-20 h-20 text-slate-950" />
            </button>

            <p className="text-white/80 text-xs leading-relaxed max-w-xs mb-auto">
              Simulate turnstile QR code scanner to authorize staff check-ins and VIP entries.
            </p>

            <div className="flex items-center gap-2 mt-4">
              <div className="w-5 h-5 bg-white/20 rounded-lg flex items-center justify-center">
                <Database className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-mono font-bold tracking-widest text-[10px]">ArenaSync v2</span>
            </div>
          </div>

          {/* Hardware Card */}
          <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-6 backdrop-blur-md">
            <div className="h-44 bg-slate-950/50 border border-slate-850 rounded-2xl mb-6 flex items-center justify-center relative">
              <div className="w-12 h-12 rounded-full bg-slate-900 absolute top-4 left-8 border border-slate-800"></div>
              <div className="w-10 h-10 rounded-full bg-indigo-600 absolute bottom-8 right-8 border border-indigo-550"></div>
              <div className="w-8 h-8 rounded-full bg-red-500 absolute top-12 right-12 border border-red-450"></div>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 w-8 h-8 rounded-xl flex items-center justify-center mb-4">
              <Smartphone className="text-amber-400 w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1.5">Turnstile Scanner Support</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Connects directly with industry-standard turnstiles, badge printers, and smart handheld access scanners.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

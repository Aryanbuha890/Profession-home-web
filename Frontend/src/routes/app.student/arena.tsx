import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { Search, Plus } from "lucide-react";

export const Route = createFileRoute("/app/student/arena")({
  component: CareerArenaPage,
});

function CareerArenaPage() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Career Arena</h1>
          <p className="text-sm text-slate-400 mt-1">Manage career arena settings and view data.</p>
        </div>
        <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>

      <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 min-h-[400px]">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-slate-600 transition"
            />
          </div>
        </div>
        <div className="text-center text-slate-500 mt-20">
          <p>No career arena found yet.</p>
        </div>
      </div>
    </div>
  );
}

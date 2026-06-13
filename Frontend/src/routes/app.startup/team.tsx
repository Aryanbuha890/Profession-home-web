import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { Plus, MoreHorizontal } from "lucide-react";

export const Route = createFileRoute("/app/startup/team")({
  component: TeamWorkspacePage,
});

function TeamWorkspacePage() {
  const team = [
    { name: 'Alex Rivera', role: 'CEO & Founder', dep: 'Leadership', status: 'Online' },
    { name: 'Jordan Lee', role: 'CTO', dep: 'Engineering', status: 'In a Meeting' },
    { name: 'Sam Smith', role: 'Head of Growth', dep: 'Marketing', status: 'Offline' },
  ];
  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Team Workspace</h1>
          <p className="text-sm text-slate-400 mt-1">Manage members and access controls.</p>
        </div>
        <button className="px-4 py-2 bg-coral-500 hover:bg-coral-600 text-white rounded-lg text-sm font-medium transition flex items-center gap-2">
          <Plus className="w-4 h-4" /> Invite Member
        </button>
      </div>
      <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl overflow-hidden backdrop-blur-md">
        <table className="w-full text-left">
          <thead className="bg-slate-900 border-b border-slate-800">
            <tr>
              <th className="px-6 py-4 text-xs font-medium text-slate-400 uppercase">Member</th>
              <th className="px-6 py-4 text-xs font-medium text-slate-400 uppercase">Role</th>
              <th className="px-6 py-4 text-xs font-medium text-slate-400 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-medium text-slate-400 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {team.map((t, i) => (
              <tr key={i} className="hover:bg-slate-800/30 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">{t.name[0]}</div>
                    <span className="font-medium text-white">{t.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-300">{t.role}</td>
                <td className="px-6 py-4">
                  <span className={"text-xs font-medium px-2 py-1 rounded-full " + (t.status==='Online'?'bg-emerald-500/20 text-emerald-400':'bg-slate-800 text-slate-400')}>
                    {t.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-500 hover:text-white transition"><MoreHorizontal className="w-5 h-5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

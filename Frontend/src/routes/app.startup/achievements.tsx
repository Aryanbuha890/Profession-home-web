import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { Award, Trophy, Star } from "lucide-react";

export const Route = createFileRoute("/app/startup/achievements")({
  component: AchievementVaultPage,
});

function AchievementVaultPage() {
  const achievements = [
    { title: 'First 100 Users', desc: 'Acquired 100 active paying customers.', date: 'Oct 2025', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    { title: 'Seed Secured', desc: 'Successfully raised a Seed round > $1M.', date: 'Sep 2025', icon: Trophy, color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
    { title: 'Product Hunt #1', desc: 'Ranked #1 Product of the Day.', date: 'Aug 2025', icon: Star, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-white">Achievement Vault</h1>
        <p className="text-sm text-slate-400 mt-1">Your startup's historic milestones and badges.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((ach, i) => {
          const Icon = ach.icon || Award;
          return (
            <div key={i} className={`p-6 rounded-2xl border ${ach.bg} flex flex-col items-center text-center backdrop-blur-md`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-slate-900 mb-4 shadow-lg shadow-black/20`}>
                <Icon className={`w-8 h-8 ${ach.color}`} />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{ach.title}</h3>
              <p className="text-xs text-slate-300 mb-4">{ach.desc}</p>
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mt-auto">{ach.date}</span>
            </div>
          )
        })}
      </div>
    </div>
  );
}

// Temporary fallback for Users icon missing in the import scope above
const Users = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;

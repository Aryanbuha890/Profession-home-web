import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { MessageSquare, Video } from "lucide-react";

export const Route = createFileRoute("/app/startup/mentors")({
  component: MentorsPage,
});

function MentorsPage() {
  const mentors = [
    { name: 'Sarah Jenkins', role: 'Ex-VP Growth @ Stripe', exp: 'FinTech, B2B SaaS', status: 'Available', img: 'https://i.pravatar.cc/150?u=sarah' },
    { name: 'David Chen', role: 'Partner @ Sequoia', exp: 'Fundraising, Board Mgmt', status: 'Busy', img: 'https://i.pravatar.cc/150?u=david' },
    { name: 'Elena Rostova', role: 'Founder @ AI Labs (Exited)', exp: 'AI/ML, Product Strategy', status: 'Available', img: 'https://i.pravatar.cc/150?u=elena' }
  ];
  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-white">Mentorship Network</h1>
        <p className="text-sm text-slate-400 mt-1">Connect with industry veterans to accelerate growth.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((m, i) => (
          <div key={i} className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 text-center group hover:bg-slate-800/40 transition backdrop-blur-md">
            <div className="relative inline-block mb-4">
              <img src={m.img} alt={m.name} className="w-20 h-20 rounded-full border-4 border-slate-800 mx-auto" />
              <div className={"absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-slate-900 " + (m.status === 'Available' ? 'bg-emerald-500' : 'bg-rose-500')}></div>
            </div>
            <h3 className="text-lg font-bold text-white">{m.name}</h3>
            <p className="text-sm text-coral-400 font-medium mb-2">{m.role}</p>
            <p className="text-xs text-slate-400 mb-6 px-4">Expertise: {m.exp}</p>
            <div className="flex gap-3 justify-center">
              <button className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition"><MessageSquare className="w-4 h-4" /></button>
              <button className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition"><Video className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

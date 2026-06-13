import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { Beaker, Zap, Flag, Rocket, Check, Lock } from "lucide-react";

export const Route = createFileRoute("/app/startup/roadmap")({
  component: StartupRoadmapPage,
});

const ROADMAP_STEPS = [
  { id: 1, phase: 'Phase 1', title: 'MVP Launch', status: 'completed', icon: Beaker },
  { id: 2, phase: 'Phase 2', title: 'First 100 Paying Customers', status: 'completed', icon: Zap },
  { id: 3, phase: 'Phase 3', title: 'Seed Fundraise', status: 'current', icon: Flag },
  { id: 4, phase: 'Phase 4', title: 'Series A Milestones', status: 'locked', icon: Rocket },
];

function StartupRoadmapPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-white">Strategic Roadmap</h1>
        <p className="text-slate-400 mt-2">The path to industry dominance.</p>
      </div>
      <div className="relative border-l-2 border-slate-800 ml-6 md:ml-12 space-y-12 pb-8">
        {ROADMAP_STEPS.map((step) => {
          const isCompleted = step.status === 'completed';
          const isCurrent = step.status === 'current';
          const Icon = step.icon;
          return (
            <div key={step.id} className="relative pl-10 md:pl-16">
              <div className={"absolute -left-[21px] top-1 w-10 h-10 rounded-full border-4 border-slate-950 flex items-center justify-center " + (isCompleted ? 'bg-emerald-500 text-slate-900' : isCurrent ? 'bg-coral-500 text-white' : 'bg-slate-800 text-slate-500')}>
                {isCompleted ? <Check className="w-5 h-5" /> : step.status === 'locked' ? <Lock className="w-4 h-4" /> : <Icon className="w-5 h-5" />}
              </div>
              <div className={"p-6 rounded-2xl border " + (isCurrent ? 'bg-slate-800/80 border-coral-500/50' : 'bg-slate-900/40 border-slate-800/60')}>
                <h3 className="text-xl font-bold text-white">{step.title}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

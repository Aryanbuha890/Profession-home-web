import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { Lightbulb, Rocket, Users, Target } from "lucide-react";

export const Route = createFileRoute("/app/university/innovation_hub")({
  component: InnovationHubPage,
});

function InnovationHubPage() {
  const projects = [
    { title: "Autonomous Drone Swarm", dept: "Robotics", team: 5, stage: "Prototyping", budget: "₹1.2L" },
    { title: "AI-Driven Healthcare Diagnostics", dept: "Bioinformatics", team: 3, stage: "Clinical Trials", budget: "₹5.5L" },
    { title: "Biodegradable Polymers", dept: "Materials Science", team: 4, stage: "Research", budget: "₹80K" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-white">Innovation Hub</h1>
        <p className="text-sm text-slate-400 mt-1">Track ongoing cross-departmental research and R&D initiatives.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj, i) => (
          <div key={i} className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 backdrop-blur-md group hover:bg-slate-800/40 transition">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-violet-500/10 rounded-xl group-hover:scale-110 transition-transform">
                <Lightbulb className="w-6 h-6 text-violet-400" />
              </div>
              <span className="px-2.5 py-1 bg-slate-800 text-xs font-semibold text-slate-300 rounded-lg">{proj.stage}</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{proj.title}</h3>
            <p className="text-sm text-violet-400 font-medium mb-4">{proj.dept}</p>
            
            <div className="flex items-center gap-6 text-sm text-slate-400 pt-4 border-t border-slate-800/50">
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4"/> {proj.team} Members</span>
              <span className="flex items-center gap-1.5"><Target className="w-4 h-4"/> Grant: {proj.budget}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

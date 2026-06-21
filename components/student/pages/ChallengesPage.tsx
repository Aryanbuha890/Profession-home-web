'use client';

import React from "react";
import { Page } from "@/components/app/Page";
import { PageHero } from "@/components/research/premium";
import { Sparkles, Swords, Trophy, Clock, CheckCircle2, Code2, Database, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const CHALLENGES = [
  { id: 1, title: "Build a Custom React Hook", category: "Frontend", difficulty: "Medium", xp: 500, time: "45 mins", icon: Code2, color: "text-sky-400", bg: "bg-sky-400" },
  { id: 2, title: "Optimize Postgres Queries", category: "Database", difficulty: "Hard", xp: 800, time: "1.5 hours", icon: Database, color: "text-emerald-400", bg: "bg-emerald-400" },
  { id: 3, title: "Debug Memory Leak in Node", category: "Backend", difficulty: "Expert", xp: 1200, time: "2 hours", icon: AlertTriangle, color: "text-rose-400", bg: "bg-rose-400" }
];

export function ChallengesPage() {
  return (
    <Page title="Challenges" subtitle="Take on new tasks to prove your skills.">
      <PageHero
        badge="Student Workspace"
        title="Active Challenges"
        subtitle="Complete technical challenges to earn XP, rank up, and unlock rewards."
        accent="#38bdf8"
      />

      {/* Featured Challenge */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 to-[#0F1528] border border-[#1F2947] p-8 shadow-2xl mt-4 mb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2">
              <span className="bg-indigo-500/20 text-indigo-400 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-indigo-500/30">
                Daily Featured
              </span>
              <span className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                <Trophy className="w-3.5 h-3.5" /> +1,500 XP
              </span>
            </div>
            <h2 className="text-3xl font-display font-black text-white">System Design: Chat App</h2>
            <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
              Design a scalable real-time chat architecture supporting 10M DAU. You will need to define WebSocket routing, message persistence, and read-receipt caching.
            </p>
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-slate-500" /> 3 Hours Max</span>
              <span className="flex items-center gap-1.5"><Swords className="w-4 h-4 text-slate-500" /> Expert Level</span>
            </div>
          </div>
          <button className="shrink-0 w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg hover:-translate-y-1">
            Accept Challenge
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-end border-b border-white/5 pb-4">
          <h3 className="font-display font-bold text-xl text-white">Available Quests</h3>
          <div className="flex gap-2">
            <button className="text-[10px] font-mono tracking-widest uppercase font-bold text-sky-400 bg-sky-500/10 px-3 py-1.5 rounded-lg border border-sky-500/20">All</button>
            <button className="text-[10px] font-mono tracking-widest uppercase font-bold text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 transition">Frontend</button>
            <button className="text-[10px] font-mono tracking-widest uppercase font-bold text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 transition">Backend</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHALLENGES.map((challenge, idx) => {
            const Icon = challenge.icon;
            return (
              <motion.div 
                key={challenge.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#0F1528] border border-[#1F2947] p-6 rounded-3xl group hover:border-slate-700 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-[280px]"
              >
                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-start">
                    <div className={`w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center ${challenge.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-widest bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 ${challenge.color}`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-white text-lg leading-tight mb-1 group-hover:text-sky-400 transition-colors">{challenge.title}</h4>
                    <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">{challenge.category}</p>
                  </div>
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-center text-xs font-semibold bg-slate-950/50 p-3 rounded-xl border border-slate-800/50">
                    <span className="flex items-center gap-1.5 text-amber-400">
                      <Sparkles className="w-3.5 h-3.5" /> +{challenge.xp} XP
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Clock className="w-3.5 h-3.5" /> {challenge.time}
                    </span>
                  </div>
                  <button className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/5 rounded-xl text-xs font-bold transition-all flex justify-center items-center gap-2 group-hover:border-sky-500/30">
                    Start <Swords className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Page>
  );
}

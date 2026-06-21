'use client';

import React from "react";
import { Page } from "@/components/app/Page";
import { PageHero } from "@/components/research/premium";
import { Swords, Trophy, Users, Shield, Target, Award, Skull, ChevronRight } from "lucide-react";

export function CareerArenaPage() {
  return (
    <Page title="Career Arena" subtitle="Compete and benchmark your abilities.">
      <PageHero
        badge="Student Workspace"
        title="Career Arena"
        subtitle="Go head-to-head with peers in real-time coding and system design battles."
        accent="#38bdf8"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
        {/* Main Arena / Battle Lobby */}
        <div className="lg:col-span-8 space-y-6">
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-2xl h-80 flex flex-col items-center justify-center text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="w-20 h-20 bg-slate-950 border border-slate-800 rounded-full flex items-center justify-center mb-6 relative shadow-lg">
              <div className="absolute inset-0 bg-rose-500/20 rounded-full animate-ping"></div>
              <Swords className="w-10 h-10 text-rose-500 relative z-10" />
            </div>

            <h2 className="text-3xl font-display font-black text-white mb-2">Arena Matchmaking Active</h2>
            <p className="text-sm text-slate-400 max-w-md mx-auto mb-8">
              Finding opponents of similar skill rating. Prepare yourself for a 30-minute algorithm and data structures duel.
            </p>

            <button className="bg-rose-600 hover:bg-rose-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-rose-500/20 hover:shadow-rose-500/40">
              Join Queue
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0F1528] border border-[#1F2947] p-6 rounded-3xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-display font-bold text-white flex items-center gap-2">
                  <Skull className="w-5 h-5 text-indigo-400" /> Recent Battles
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-slate-950/50 p-3 rounded-xl border border-slate-800/50">
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-400 font-bold text-sm">VICTORY</span>
                    <span className="text-xs text-slate-400">vs @alex_dev</span>
                  </div>
                  <span className="text-emerald-400 text-xs font-bold">+24 ELO</span>
                </div>
                <div className="flex justify-between items-center bg-slate-950/50 p-3 rounded-xl border border-slate-800/50">
                  <div className="flex items-center gap-3">
                    <span className="text-rose-400 font-bold text-sm">DEFEAT</span>
                    <span className="text-xs text-slate-400">vs @sarah_c</span>
                  </div>
                  <span className="text-rose-400 text-xs font-bold">-12 ELO</span>
                </div>
                <div className="flex justify-between items-center bg-slate-950/50 p-3 rounded-xl border border-slate-800/50">
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-400 font-bold text-sm">VICTORY</span>
                    <span className="text-xs text-slate-400">vs @j_coder</span>
                  </div>
                  <span className="text-emerald-400 text-xs font-bold">+18 ELO</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0F1528] border border-[#1F2947] p-6 rounded-3xl">
              <h3 className="font-display font-bold text-white mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-sky-400" /> Weekly Objectives
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-slate-300">Win 5 Arena Matches</span>
                    <span className="text-sky-400">3/5</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-sky-400 h-full w-[60%] rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-slate-300">Achieve a 2-Win Streak</span>
                    <span className="text-emerald-400">Completed</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full w-full rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ELO & Leaderboard Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/20 p-6 rounded-3xl shadow-lg relative overflow-hidden text-center">
            <h3 className="font-display font-bold text-sm tracking-widest text-indigo-400 uppercase mb-4">
              Current Rating
            </h3>
            <div className="w-24 h-24 mx-auto bg-slate-950 border-4 border-indigo-500 rounded-full flex flex-col items-center justify-center mb-4 shadow-[0_0_30px_rgba(99,102,241,0.3)]">
              <span className="text-2xl font-black text-white">1420</span>
              <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Gold II</span>
            </div>
            <p className="text-xs text-slate-400">Top 15% of all students. Win 3 more matches to reach Platinum.</p>
          </div>

          <div className="bg-[#0F1528] border border-[#1F2947] p-6 rounded-3xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display font-bold text-sm tracking-widest text-slate-400 uppercase flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" /> Top Gladiators
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-6 text-center font-bold text-amber-400">1</span>
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-amber-400/50"></div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">@code_ninja</div>
                  <div className="text-[10px] text-slate-500">2400 ELO</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-6 text-center font-bold text-slate-300">2</span>
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-300/50"></div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">@alex_dev</div>
                  <div className="text-[10px] text-slate-500">2350 ELO</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-6 text-center font-bold text-amber-700">3</span>
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-amber-700/50"></div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">@sarah_c</div>
                  <div className="text-[10px] text-slate-500">2310 ELO</div>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2">
              View Full Leaderboard <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Page>
  );
}

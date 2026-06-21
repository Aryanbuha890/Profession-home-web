'use client';

import React from "react";
import { Page } from "@/components/app/Page";
import { PageHero } from "@/components/research/premium";
import { 
  Sparkles, 
  TrendingUp, 
  Target, 
  BookOpen, 
  Trophy, 
  ArrowRight,
  Code2,
  Users
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function HomePage() {
  return (
    <Page title="Student Dashboard" subtitle="Your career growth command center.">
      <PageHero
        badge="Student Workspace"
        title="Student Dashboard"
        subtitle="Track your roadmap, manage active projects, and unlock premium career opportunities."
        accent="#38bdf8"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
        {/* Main Feed / Action Area */}
        <div className="lg:col-span-8 space-y-6">
          {/* Welcome Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-sky-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400">Level 5 Achiever</span>
                </div>
                <h2 className="text-3xl font-display font-bold text-white mb-2">
                  Welcome back, Vraj!
                </h2>
                <p className="text-sm text-slate-400 max-w-md leading-relaxed">
                  You have 3 active projects in your pipeline. Your next career roadmap milestone is 80% complete. Keep pushing forward.
                </p>
              </div>
              <Link href="/app/student/roadmap" className="shrink-0 bg-white text-slate-950 px-6 py-3 rounded-xl font-bold text-sm hover:bg-sky-50 transition-colors shadow-lg flex items-center gap-2">
                Continue Roadmap <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Bento Grid Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Active Projects */}
            <Link href="/app/student/projects" className="group block p-6 bg-[#0F1528] hover:bg-[#151D36] border border-[#1F2947] hover:border-sky-500/30 rounded-3xl transition-all duration-300 relative overflow-hidden">
              <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center mb-4 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-display">Active Projects</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Manage your ongoing portfolio builds and submit final repositories for review.
              </p>
              <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs">
                <span className="text-indigo-400 font-semibold">2 pending review</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>

            {/* Mentorship */}
            <Link href="/app/student/mentors" className="group block p-6 bg-[#0F1528] hover:bg-[#151D36] border border-[#1F2947] hover:border-amber-500/30 rounded-3xl transition-all duration-300 relative overflow-hidden">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mb-4 border border-amber-500/20 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-display">Career Mentors</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Schedule 1-on-1 sessions with industry experts to refine your career strategy.
              </p>
              <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs">
                <span className="text-amber-500 font-semibold">1 upcoming session</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          </div>
        </div>

        {/* Sidebar / Quick Stats Area */}
        <div className="lg:col-span-4 space-y-6">
          {/* Progress Widget */}
          <div className="bg-[#0F1528] border border-[#1F2947] p-6 rounded-3xl shadow-lg relative overflow-hidden">
            <h3 className="font-display font-bold text-sm tracking-widest text-slate-400 uppercase mb-6 flex items-center gap-2">
              <Target className="w-4 h-4" /> Goal Tracker
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-white">Frontend Path</span>
                  <span className="text-sky-400">80%</span>
                </div>
                <div className="w-full bg-[#1F2947] h-2 rounded-full overflow-hidden">
                  <div className="bg-sky-400 h-full w-[80%] rounded-full shadow-[0_0_10px_rgba(56,189,248,0.5)]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-white">System Design</span>
                  <span className="text-indigo-400">45%</span>
                </div>
                <div className="w-full bg-[#1F2947] h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full w-[45%] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#0F1528] border border-[#1F2947] p-6 rounded-3xl shadow-lg">
            <h3 className="font-display font-bold text-sm tracking-widest text-slate-400 uppercase mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Quick Actions
            </h3>
            <div className="space-y-3">
              <Link href="/app/student/copilot" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">Start Copilot Chat</div>
              </Link>
              <Link href="/app/student/arena" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
                  <Trophy className="w-4 h-4" />
                </div>
                <div className="text-sm font-semibold text-white group-hover:text-rose-400 transition-colors">Enter Career Arena</div>
              </Link>
              <Link href="/app/student/achievements" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">View Vault</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

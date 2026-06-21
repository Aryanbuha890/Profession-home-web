'use client';

import React, { useState } from "react";
import { Page } from "@/components/app/Page";
import { PageHero, SpotlightCard } from "@/components/research/premium";
import { Search, Sparkles, TrendingUp, Target, Book, ChevronRight, Award, Flame, Code2, Database, LayoutTemplate, Layers } from "lucide-react";
import { motion } from "framer-motion";

const MOCK_SKILLS = [
  { id: 1, name: "React Architecture", category: "Frontend", level: 85, color: "text-sky-400", bg: "bg-sky-400", icon: Code2 },
  { id: 2, name: "Node.js Microservices", category: "Backend", level: 60, color: "text-emerald-400", bg: "bg-emerald-400", icon: Database },
  { id: 3, name: "UI/UX Foundations", category: "Design", level: 92, color: "text-fuchsia-400", bg: "bg-fuchsia-400", icon: LayoutTemplate },
  { id: 4, name: "System Design", category: "Architecture", level: 45, color: "text-indigo-400", bg: "bg-indigo-400", icon: Layers }
];

export function SkillBuilderPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSkills = MOCK_SKILLS.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.category.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <Page title="Skill Builder" subtitle="Map out your core competencies and master new technologies.">
      <PageHero
        badge="Student Workspace"
        title="Skill Builder"
        subtitle="Map out your core competencies and master new technologies."
        accent="#38bdf8"
      />

      <div className="grid gap-6 md:grid-cols-3 mb-8 pt-4">
        <SpotlightCard className="p-6" color="56, 189, 248">
          <div className="flex items-center gap-3 text-sky-400 mb-2">
            <Flame className="h-5 w-5" />
            <h3 className="font-bold uppercase tracking-wider text-xs">Total XP</h3>
          </div>
          <p className="text-3xl font-black text-white mt-2 font-display">12,450</p>
          <p className="text-[11px] text-slate-400 mt-1 font-mono uppercase tracking-widest">Global Rank #402</p>
        </SpotlightCard>

        <SpotlightCard className="p-6" color="167, 139, 250">
          <div className="flex items-center gap-3 text-violet-400 mb-2">
            <Target className="h-5 w-5" />
            <h3 className="font-bold uppercase tracking-wider text-xs">Pathways Active</h3>
          </div>
          <p className="text-3xl font-black text-white mt-2 font-display">4</p>
          <p className="text-[11px] text-slate-400 mt-1 font-mono uppercase tracking-widest">2 ready for review</p>
        </SpotlightCard>

        <SpotlightCard className="p-6" color="244, 114, 182">
          <div className="flex items-center gap-3 text-fuchsia-400 mb-2">
            <Award className="h-5 w-5" />
            <h3 className="font-bold uppercase tracking-wider text-xs">Certifications</h3>
          </div>
          <p className="text-3xl font-black text-white mt-2 font-display">2</p>
          <p className="text-[11px] text-slate-400 mt-1 font-mono uppercase tracking-widest">Industry Vetted</p>
        </SpotlightCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Skill Trees */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex justify-between items-center bg-[#0F1528] border border-[#1F2947] p-4 rounded-2xl shadow-sm">
            <h3 className="font-display font-bold text-white text-lg">Your Skill Trees</h3>
            <div className="relative w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search skills..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-sky-500/50 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredSkills.map((skill) => {
              const Icon = skill.icon;
              return (
                <div key={skill.id} className="bg-[#0F1528] border border-[#1F2947] p-5 rounded-2xl relative overflow-hidden group hover:border-slate-700 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center border border-slate-800 ${skill.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${skill.color}`}>
                          {skill.category}
                        </span>
                        <h4 className="font-bold text-white text-sm">{skill.name}</h4>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-400">Mastery Level</span>
                      <span className="text-white">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`h-full ${skill.bg} rounded-full`}
                      ></motion.div>
                    </div>
                  </div>

                  <button className="w-full mt-5 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors">
                    Continue Learning <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommended Tracks Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-b from-[#0F1528] to-slate-950 border border-[#1F2947] p-6 rounded-3xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <h3 className="font-display font-bold text-sm tracking-widest text-slate-400 uppercase mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-400" /> Recommended Tracks
            </h3>

            <div className="space-y-4 relative z-10">
              <div className="group cursor-pointer">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-semibold text-white text-sm group-hover:text-sky-400 transition-colors">Advanced Next.js 15</h4>
                  <span className="text-[10px] bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded uppercase font-bold">New</span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2">Master App Router, Server Actions, and Partial Prerendering to build fast web apps.</p>
              </div>

              <hr className="border-white/5" />

              <div className="group cursor-pointer">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-semibold text-white text-sm group-hover:text-fuchsia-400 transition-colors">GraphQL & Apollo</h4>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded uppercase font-bold">Popular</span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2">Learn to design efficient APIs and manage state with Apollo Client.</p>
              </div>

              <hr className="border-white/5" />

              <div className="group cursor-pointer">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-semibold text-white text-sm group-hover:text-emerald-400 transition-colors">Web3 DApp Dev</h4>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2">Introduction to Smart Contracts, Solidity, and integrating with modern frontends.</p>
              </div>
            </div>

            <button className="w-full mt-6 py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-colors shadow-lg">
              Explore All Tracks
            </button>
          </div>
        </div>
      </div>
    </Page>
  );
}

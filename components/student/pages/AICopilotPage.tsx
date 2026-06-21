'use client';

import React, { useState } from "react";
import { Page } from "@/components/app/Page";
import { PageHero } from "@/components/research/premium";
import { Sparkles, Send, Bot, User, Code2, BookOpen, Terminal, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export function AICopilotPage() {
  const [chatInput, setChatInput] = useState("");

  return (
    <Page title="AI Copilot" subtitle="Your personal AI assistant for career growth.">
      <PageHero
        badge="Student Workspace"
        title="Career AI Copilot"
        subtitle="Get instant answers, code reviews, and career strategy from your dedicated AI mentor."
        accent="#38bdf8"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 h-[700px]">
        {/* Chat Interface */}
        <div className="lg:col-span-8 flex flex-col bg-[#0F1528] border border-[#1F2947] rounded-3xl overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#1F2947] flex justify-between items-center bg-slate-950/50 backdrop-blur-md relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <Bot className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white leading-tight">Founder OS Copilot</h3>
                <p className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online
                </p>
              </div>
            </div>
            <button className="text-xs font-semibold text-slate-400 hover:text-white transition-colors">Clear History</button>
          </div>

          {/* Chat History Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6 relative z-10">
            {/* AI Welcome Message */}
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0 mt-1">
                <Bot className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-sm p-4 text-sm text-slate-300 max-w-[85%] leading-relaxed">
                Hello Vraj! I'm your Career Copilot. I've analyzed your recent Frontend Skill Builder assessment. You scored exceptionally well on React Basics (95%) but could improve your knowledge of Server Components (60%). 
                <br/><br/>
                Would you like me to generate a personalized study guide, or do you have a specific technical question right now?
              </div>
            </div>

            {/* Suggestions Chips */}
            <div className="flex flex-wrap gap-2 pl-12">
              <button className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-xl text-xs font-semibold transition-colors">
                Generate Study Guide
              </button>
              <button className="bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 px-4 py-2 rounded-xl text-xs font-semibold transition-colors">
                Review my resume
              </button>
              <button className="bg-fuchsia-500/10 hover:bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/20 px-4 py-2 rounded-xl text-xs font-semibold transition-colors">
                Mock interview practice
              </button>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-950/50 border-t border-[#1F2947] relative z-10">
            <div className="relative flex items-center">
              <input 
                type="text" 
                placeholder="Ask your Copilot anything..." 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-6 pr-14 py-4 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors shadow-inner"
              />
              <button className="absolute right-3 w-10 h-10 bg-emerald-600 hover:bg-emerald-500 rounded-xl flex items-center justify-center transition-all shadow-lg hover:shadow-emerald-500/20">
                <Send className="w-4 h-4 text-white ml-0.5" />
              </button>
            </div>
            <p className="text-center text-[10px] text-slate-500 mt-3 font-mono tracking-wide">AI Copilot can make mistakes. Consider verifying important information.</p>
          </div>
        </div>

        {/* Sidebar Capabilities */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#0F1528] border border-[#1F2947] p-6 rounded-3xl shadow-lg">
            <h3 className="font-display font-bold text-sm tracking-widest text-slate-400 uppercase mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" /> Copilot Capabilities
            </h3>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/20 shrink-0 group-hover:scale-110 transition-transform">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1 group-hover:text-sky-400 transition-colors">Code Review</h4>
                  <p className="text-xs text-slate-400">Paste your code for instant architectural feedback and bug finding.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20 shrink-0 group-hover:scale-110 transition-transform">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">Mock Interviews</h4>
                  <p className="text-xs text-slate-400">Simulate technical interviews for FAANG-level system design rounds.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 text-fuchsia-400 flex items-center justify-center border border-fuchsia-500/20 shrink-0 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1 group-hover:text-fuchsia-400 transition-colors">Resource Mapping</h4>
                  <p className="text-xs text-slate-400">Get personalized roadmaps based on your current skill weaknesses.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

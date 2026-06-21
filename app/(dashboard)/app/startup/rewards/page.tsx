'use client';

import React from "react";
import { Page } from "@/components/app/Page";
import { PageHero, SpotlightCard } from "@/components/research/premium";
import { Search, Sparkles, TrendingUp, Target } from "lucide-react";

export default function RewardCenterPage() {
  return (
    <Page title="Reward Center" subtitle="Claim perks, credits, and partner rewards.">
      <PageHero
        badge="Founder OS"
        title="Reward Center"
        subtitle="Claim perks, credits, and partner rewards."
        accent="#fb7185" // Founder accent color
      />

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <SpotlightCard className="p-6" color="251, 113, 133">
          <div className="flex items-center gap-3 text-rose-400 mb-2">
            <TrendingUp className="h-5 w-5" />
            <h3 className="font-bold uppercase tracking-wider text-xs">Activity</h3>
          </div>
          <p className="text-2xl font-black text-white mt-2">Active</p>
          <p className="text-sm text-slate-400 mt-1">Keep executing</p>
        </SpotlightCard>

        <SpotlightCard className="p-6" color="249, 115, 22">
          <div className="flex items-center gap-3 text-orange-400 mb-2">
            <Target className="h-5 w-5" />
            <h3 className="font-bold uppercase tracking-wider text-xs">Progress</h3>
          </div>
          <p className="text-2xl font-black text-white mt-2">In Progress</p>
          <p className="text-sm text-slate-400 mt-1">Consistency is key</p>
        </SpotlightCard>

        <SpotlightCard className="p-6" color="167, 139, 250">
          <div className="flex items-center gap-3 text-violet-400 mb-2">
            <Sparkles className="h-5 w-5" />
            <h3 className="font-bold uppercase tracking-wider text-xs">AI Insights</h3>
          </div>
          <p className="text-2xl font-black text-white mt-2">Optimized</p>
          <p className="text-sm text-slate-400 mt-1">AI suggestions enabled</p>
        </SpotlightCard>
      </div>

      <SpotlightCard className="p-6 min-h-[300px]">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search reward center..." 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-slate-600 transition"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-slate-500 mt-20">
          <div className="h-12 w-12 rounded-full border border-slate-800 bg-slate-900/50 flex items-center justify-center mb-4">
            <Sparkles className="h-5 w-5 text-slate-600" />
          </div>
          <p>No reward center data found yet.</p>
        </div>
      </SpotlightCard>
    </Page>
  );
}

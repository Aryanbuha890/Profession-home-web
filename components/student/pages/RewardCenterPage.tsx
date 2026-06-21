'use client';

import React from "react";
import { Page } from "@/components/app/Page";
import { PageHero } from "@/components/research/premium";
import { Sparkles, Gift, Ticket, Zap, Star, ShieldCheck, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const REWARDS = [
  { id: 1, name: "1-on-1 Mentorship Pass", cost: 5000, type: "Premium", icon: ShieldCheck, color: "text-amber-400", bg: "bg-amber-400", bgHover: "hover:border-amber-500/50" },
  { id: 2, name: "Profile Verification Badge", cost: 2500, type: "Cosmetic", icon: Star, color: "text-sky-400", bg: "bg-sky-400", bgHover: "hover:border-sky-500/50" },
  { id: 3, name: "Resume AI Review", cost: 1200, type: "Tool", icon: Zap, color: "text-fuchsia-400", bg: "bg-fuchsia-400", bgHover: "hover:border-fuchsia-500/50" },
  { id: 4, name: "Exclusive Career Fair Ticket", cost: 10000, type: "Event", icon: Ticket, color: "text-emerald-400", bg: "bg-emerald-400", bgHover: "hover:border-emerald-500/50" }
];

export function RewardCenterPage() {
  return (
    <Page title="Reward Center" subtitle="Claim your earned rewards and exclusive prizes.">
      <PageHero
        badge="Student Workspace"
        title="Reward Center"
        subtitle="Redeem your XP and gems for premium career resources and perks."
        accent="#38bdf8"
      />

      {/* Balance Header */}
      <div className="bg-[#0F1528] border border-[#1F2947] p-6 rounded-3xl shadow-lg mt-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg border-4 border-[#0F1528]">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-display font-black text-white">12,450 <span className="text-amber-400 text-lg">XP</span></h2>
            <p className="text-sm text-slate-400">Available Balance to Spend</p>
          </div>
        </div>
        
        <div className="flex gap-4 relative z-10 w-full md:w-auto">
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex-1 md:flex-none text-center">
            <div className="text-xl font-bold text-sky-400 mb-0.5">3</div>
            <div className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">Passes</div>
          </div>
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex-1 md:flex-none text-center">
            <div className="text-xl font-bold text-fuchsia-400 mb-0.5">14</div>
            <div className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">Gems</div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-end border-b border-white/5 pb-4">
          <div>
            <h3 className="font-display font-bold text-xl text-white">Available Rewards</h3>
            <p className="text-xs text-slate-400 mt-1">Unlock these items using your hard-earned XP.</p>
          </div>
          <button className="text-sky-400 text-sm font-semibold hover:text-sky-300 transition-colors flex items-center gap-1">
            Redemption History <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REWARDS.map((reward, idx) => {
            const Icon = reward.icon;
            const canAfford = 12450 >= reward.cost;
            
            return (
              <motion.div 
                key={reward.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-[#0F1528] border border-[#1F2947] rounded-3xl p-6 flex flex-col justify-between group transition-all duration-300 ${reward.bgHover} relative overflow-hidden`}
              >
                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-start">
                    <div className={`w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center ${reward.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-widest bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 ${reward.color}`}>
                      {reward.type}
                    </span>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-white text-lg leading-tight mb-1">{reward.name}</h4>
                    <p className="text-xl font-black font-display text-amber-400 flex items-baseline gap-1">
                      {reward.cost.toLocaleString()} <span className="text-[10px] font-mono tracking-widest text-amber-500/70">XP</span>
                    </p>
                  </div>
                </div>

                <div className="mt-6 relative z-10">
                  <button 
                    disabled={!canAfford}
                    className={`w-full py-3 rounded-xl font-bold text-xs transition-all shadow-lg flex justify-center items-center gap-2 ${
                      canAfford 
                        ? `${reward.bg} text-slate-950 hover:brightness-110 hover:-translate-y-0.5` 
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    }`}
                  >
                    {canAfford ? (
                      <>Claim Reward <Sparkles className="w-4 h-4" /></>
                    ) : (
                      'Not enough XP'
                    )}
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

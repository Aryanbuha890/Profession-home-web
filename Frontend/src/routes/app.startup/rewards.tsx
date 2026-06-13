import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { Gift, Zap, Crown } from "lucide-react";

export const Route = createFileRoute("/app/startup/rewards")({
  component: RewardsCenterPage,
});

function RewardsCenterPage() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-white">Reward Center</h1>
        <p className="text-sm text-slate-400 mt-1">Claim perks and cloud credits from our partners.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'AWS Activate', desc: '$100k in AWS Credits for 1 year.', tag: 'Cloud', icon: Zap },
          { title: 'Stripe Processing', desc: '$50k fee-free payment processing.', tag: 'FinTech', icon: Crown },
          { title: 'OpenAI Startup', desc: '$2,500 in API credits.', tag: 'AI', icon: Gift },
        ].map((reward, i) => {
          const Icon = reward.icon;
          return (
            <div key={i} className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 backdrop-blur-md flex flex-col hover:bg-slate-800/40 transition">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-coral-400" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-400 px-2 py-1 rounded-md">{reward.tag}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{reward.title}</h3>
              <p className="text-sm text-slate-400 mb-6 flex-1">{reward.desc}</p>
              <button className="w-full py-2.5 bg-coral-500 hover:bg-coral-600 text-white font-medium rounded-xl transition">
                Claim Reward
              </button>
            </div>
          )
        })}
      </div>
    </div>
  );
}

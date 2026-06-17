import { motion } from "framer-motion";
import { Lock, CheckCircle2 } from "lucide-react";
import { Page } from "@/components/app/Page";
import { vaultBadges, vaultStats } from "../researchStudentMock";
import { FadeIn } from "../shared";
import { PageHero } from "../premium";
import { StudentAmbient } from "../studentUi";
import { FaIcon } from "../FaIcon";

const statColors: Record<string, string> = {
  amber: "text-amber-400",
  sky: "text-sky-400",
  violet: "text-violet-400",
  rose: "text-rose-400",
};

const badgeColors: Record<string, string> = {
  sky: "text-sky-400",
  violet: "text-violet-400",
  rose: "text-rose-400",
  indigo: "text-indigo-400",
  emerald: "text-emerald-400",
  teal: "text-teal-400",
  amber: "text-amber-400",
  gold: "text-amber-300",
};

export function ResearchAchievementsPage() {
  return (
    <Page title="Achievement Vault" subtitle="Your milestone badges, XP records, and earned credentials">
      <div className="relative">
        <StudentAmbient />

        <PageHero
          badge="Achievement Vault"
          title="Your Research Rewards"
          subtitle="Earn badges, track XP, level up, and build your research streak — verified milestones from your journey."
        />

        {/* Summary HUD */}
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {vaultStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -2 }}
                className="relative overflow-hidden p-4 rounded-2xl border border-white/5 bg-slate-900/40 research-pulse-glow"
              >
                <div className={`mb-2 ${statColors[s.color]}`}>
                  <FaIcon name={s.icon} size="lg" />
                </div>
                <div className={`text-xl font-black ${statColors[s.color]}`}>{s.value}</div>
                <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider mt-0.5">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Badges Grid */}
        <FadeIn delay={0.1}>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-4">Earned Badges</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {vaultBadges.map((badge, i) => (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                whileHover={badge.earned ? { y: -4, borderColor: "rgba(255,255,255,0.2)" } : {}}
                className={`relative p-4 rounded-2xl border text-center transition-all duration-300 overflow-hidden ${
                  badge.earned
                    ? "border-white/10 bg-slate-900/40"
                    : "border-white/5 bg-slate-950/20 opacity-40"
                }`}
              >
                {!badge.earned && (
                  <div className="absolute top-2 right-2">
                    <Lock className="h-3 w-3 text-muted-foreground/30" />
                  </div>
                )}
                <div className={`mb-2 ${badgeColors[badge.color] ?? "text-white"}`}>
                  <FaIcon name={badge.icon} size="2x" />
                </div>
                <h4 className={`text-xs font-black ${badge.earned ? "text-white" : "text-white/30"}`}>
                  {badge.title}
                </h4>
                <p
                  className={`text-[9px] font-mono mt-1 leading-relaxed ${
                    badge.earned ? "text-muted-foreground/60" : "text-muted-foreground/30"
                  }`}
                >
                  {badge.desc}
                </p>
                {badge.earned && (
                  <div className="mt-2 text-[8px] font-mono text-emerald-400 flex items-center justify-center gap-1">
                    <CheckCircle2 className="h-2.5 w-2.5" /> Verified
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </Page>
  );
}

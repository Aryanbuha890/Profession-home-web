import { motion } from "framer-motion";
import type { ProfileStat } from "./types";
import { fadeUp } from "./animations";

interface ProfileStatsBarProps {
  stats: ProfileStat[];
  ringColor: string;
  delay?: number;
}

export function ProfileStatsBar({ stats, ringColor, delay = 0.15 }: ProfileStatsBarProps) {
  return (
    <motion.div
      {...fadeUp(delay)}
      className="profile-stats-strip profile-stats-neon relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-md"
    >
      <div className="profile-stats-sweep pointer-events-none absolute inset-0 opacity-40" />

      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${ringColor}60, transparent)` }}
      />

      <div className="relative grid grid-cols-2 divide-white/[0.06] sm:grid-cols-4 sm:divide-x">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.1 + idx * 0.08, type: "spring", stiffness: 200, damping: 22 }}
            whileHover={{ scale: 1.03 }}
            className="profile-stat-cell group relative px-6 py-6 text-center transition-colors hover:bg-white/[0.03]"
          >
            <div
              className="pointer-events-none absolute inset-x-4 top-0 h-px opacity-0 transition-opacity group-hover:opacity-100"
              style={{ background: `linear-gradient(90deg, transparent, ${ringColor}, transparent)` }}
            />

            <motion.p
              className="profile-stat-value font-display text-2xl font-bold tracking-tight text-white md:text-3xl"
              style={{ textShadow: `0 0 40px ${ringColor}40` }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: delay + 0.2 + idx * 0.1, type: "spring", stiffness: 260, damping: 18 }}
            >
              {stat.value}
            </motion.p>
            <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35 transition-colors group-hover:text-white/55">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

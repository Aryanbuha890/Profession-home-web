import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Award, Briefcase, LayoutDashboard, ChevronRight } from "lucide-react";
import { ProfileSection } from "./ProfileSection";

interface Activity {
  title: string;
  desc: string;
  time: string;
}

interface ProfileActivityProps {
  sectionIndex: string;
  activities: Activity[];
  ringColor: string;
  delay?: number;
}

const activityIcons: LucideIcon[] = [LayoutDashboard, Award, Briefcase];
const activityColors = ["#38bdf8", "#a78bfa", "#34d399"];

export function ProfileActivity({
  sectionIndex,
  activities,
  ringColor,
  delay = 0.35,
}: ProfileActivityProps) {
  const [expanded, setExpanded] = useState(0);

  return (
    <ProfileSection
      sectionId="profile-activity"
      index={sectionIndex}
      title="Recent Activity"
      subtitle="Swipe through your professional timeline — tap to expand"
      ringColor={ringColor}
      delay={delay}
      className="profile-section-last"
    >
      <div className="profile-activity-cinema relative">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {activities.map((act, idx) => {
            const Icon = activityIcons[idx % activityIcons.length];
            const color = activityColors[idx % activityColors.length];
            const isOpen = expanded === idx;

            return (
              <motion.button
                key={idx}
                type="button"
                layout
                onClick={() => setExpanded(isOpen ? -1 : idx)}
                initial={{ opacity: 0, y: 30, rotateY: -8 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ delay: 0.2 + idx * 0.12, type: "spring", stiffness: 200, damping: 22 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`profile-activity-card group relative min-w-[280px] snap-center cursor-pointer overflow-hidden rounded-2xl border text-left transition-shadow md:min-w-0 ${
                  isOpen
                    ? "border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                    : "border-white/[0.06] hover:border-white/15"
                }`}
                style={{
                  background: `linear-gradient(160deg, ${color}08 0%, rgba(5,6,15,0.95) 60%)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl transition-opacity group-hover:opacity-100"
                  style={{ background: color, opacity: 0.2 }}
                />

                <div className="relative p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10"
                      style={{ boxShadow: `0 0 24px ${color}30`, background: `${color}15` }}
                    >
                      <Icon className="h-5 w-5" style={{ color }} />
                    </div>
                    <time
                      className="rounded-lg px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wider"
                      style={{ color, background: `${color}12` }}
                    >
                      {act.time}
                    </time>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug">{act.title}</h3>

                  <p className={`mt-2 text-sm leading-relaxed text-white/45 ${isOpen ? "block" : "hidden md:block"}`}>
                    {act.desc}
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-[10px] font-bold font-mono uppercase tracking-wider text-white/30 group-hover:text-white/60 transition-colors">
                    {isOpen ? "Collapse" : "Read more"}
                    <ChevronRight className={`h-3 w-3 transition-transform ${isOpen ? "rotate-90" : "group-hover:translate-x-0.5"}`} />
                  </div>
                </div>

                <div
                  className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
                />
              </motion.button>
            );
          })}
        </div>
      </div>
    </ProfileSection>
  );
}

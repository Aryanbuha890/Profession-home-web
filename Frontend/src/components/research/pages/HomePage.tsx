import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Target, MapPin, Sparkles, ArrowRight, HeartPulse, Zap, TrendingUp } from "lucide-react";
import { Page } from "@/components/app/Page";
import {
  RESEARCH_STUDENT,
  missingSkills,
  progressOverview,
} from "../researchStudentMock";
import { AnimatedNumber, FadeIn, ProgressRing, ShimmerBar, stagger, fadeUp, GlowOrb } from "../shared";
import { PageHero, SpotlightCard, TiltCard } from "../premium";
import { StudentAmbient } from "../studentUi";
import { FaIcon } from "../FaIcon";

const quickActions = [
  { label: "Research Arena", link: "/app/research/research_arena", icon: "microscope", color: "#a78bfa" },
  { label: "Career Arena", link: "/app/research/career_arena", icon: "briefcase", color: "#38bdf8" },
  { label: "Opportunities", link: "/app/research/opportunities", icon: "star", color: "#f472b6" },
];

export function ResearchHomePage() {
  return (
    <Page title="Research Student Home" subtitle="Your research journey command center">
      <div className="relative">
        <StudentAmbient />
        <GlowOrb color="#a78bfa" size={200} className="-top-20 right-10" />
        <GlowOrb color="#38bdf8" size={160} className="bottom-20 -left-10" />

        <PageHero
          badge="Research Student · Live Dashboard"
          title={`Hello, ${RESEARCH_STUDENT.name.split(" ")[0]}`}
          subtitle="Track health score, goals, skill gaps, and your next recommended action — all based on your research progress."
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 research-pulse-glow"
          >
            <HeartPulse className="h-8 w-8 text-emerald-400" />
            <div>
              <div className="text-[9px] font-mono text-muted-foreground uppercase">Research Health</div>
              <div className="text-2xl font-black text-emerald-400">
                <AnimatedNumber value={RESEARCH_STUDENT.healthScore} suffix="/100" />
              </div>
            </div>
          </motion.div>
        </PageHero>

        {/* Quick action strip */}
        <FadeIn delay={0.05}>
          <div className="flex flex-wrap gap-3 mb-6">
            {quickActions.map((a, i) => (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                <Link
                  to={a.link}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06] transition-all no-underline group"
                >
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ background: `${a.color}20`, color: a.color }}
                  >
                    <FaIcon name={a.icon} className="text-sm" />
                  </div>
                  <span className="text-[11px] font-bold text-white group-hover:text-white/90">{a.label}</span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        <div className="grid gap-4 lg:grid-cols-3 mb-6">
          <FadeIn className="lg:col-span-2">
            <SpotlightCard className="p-6" color="56, 189, 248">
              <div className="flex flex-wrap gap-6 items-start">
                <motion.div
                  animate={{ rotate: [0, 2, -2, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ProgressRing value={RESEARCH_STUDENT.healthScore} size={100} stroke="#34d399" label="Health" />
                </motion.div>
                <div className="flex-1 min-w-[200px] space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="text-[9px] font-mono text-sky-400 uppercase font-bold flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> Current Position
                    </div>
                    <p className="text-sm font-bold text-white mt-1">{RESEARCH_STUDENT.currentPosition}</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="text-[9px] font-mono text-violet-400 uppercase font-bold flex items-center gap-1">
                      <Target className="h-3 w-3" /> Goal
                    </div>
                    <p className="text-sm text-white/80 mt-1 leading-relaxed">{RESEARCH_STUDENT.goal}</p>
                  </motion.div>
                </div>
              </div>
            </SpotlightCard>
          </FadeIn>

          <FadeIn delay={0.08}>
            <SpotlightCard className="p-5 h-full flex flex-col justify-between research-gradient-border" color="244, 114, 182">
              <div>
                <div className="text-[9px] font-mono text-fuchsia-400 uppercase font-bold flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Recommended Next Step
                </div>
                <p className="text-xs text-white/90 mt-2 leading-relaxed">{RESEARCH_STUDENT.recommendedNextStep}</p>
              </div>
              <Link
                to={RESEARCH_STUDENT.recommendedLink}
                className="mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-fuchsia-500/20 border border-fuchsia-500/30 text-fuchsia-300 text-[10px] font-bold font-mono uppercase tracking-wider hover:bg-fuchsia-500/30 transition no-underline group"
              >
                Go Now
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight className="h-3 w-3" />
                </motion.span>
              </Link>
            </SpotlightCard>
          </FadeIn>
        </div>

        <FadeIn delay={0.1}>
          <SpotlightCard className="p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-amber-400" /> Missing Skills
              </h3>
              <span className="text-[9px] font-mono text-muted-foreground">{missingSkills.length} gaps identified</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {missingSkills.map((s, i) => (
                <motion.div
                  key={s.skill}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  whileHover={{ scale: 1.02, borderColor: "rgba(139,92,246,0.3)" }}
                  className="p-4 rounded-xl border border-white/5 bg-white/[0.02] transition-colors cursor-default"
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-sm font-semibold text-white">{s.skill}</span>
                    <span
                      className={`text-[8px] font-mono px-2 py-0.5 rounded-full border ${
                        s.priority === "High"
                          ? "border-rose-500/30 text-rose-400 bg-rose-500/10"
                          : "border-amber-500/30 text-amber-400 bg-amber-500/10"
                      }`}
                    >
                      {s.priority}
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-[9px] font-mono text-muted-foreground mb-1">
                      <span>Gap to close</span>
                      <span>{s.gap}%</span>
                    </div>
                    <ShimmerBar value={100 - s.gap} color="from-rose-400 to-violet-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </SpotlightCard>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <TrendingUp className="h-3.5 w-3.5 text-violet-400" /> Progress Overview
            </h3>
          </div>
          <motion.div variants={stagger} initial="hidden" animate="show" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {progressOverview.map((p, i) => (
              <motion.div key={p.label} variants={fadeUp} custom={i}>
                <Link to={p.link} className="block no-underline">
                  <TiltCard>
                    <SpotlightCard className="p-4 group cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="text-[9px] font-mono text-muted-foreground uppercase">{p.label}</div>
                        <FaIcon name={p.icon} className="text-xs opacity-40 group-hover:opacity-80 transition-opacity" />
                      </div>
                      <div className="text-2xl font-black text-white mt-1">
                        <AnimatedNumber value={p.value} suffix="%" />
                      </div>
                      <div className="mt-3 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: p.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${p.value}%` }}
                          transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                        />
                      </div>
                    </SpotlightCard>
                  </TiltCard>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </FadeIn>
      </div>
    </Page>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  CheckCircle2,
  X,
  MapPin,
  Clock,
  IndianRupee,
  ChevronRight,
  Sparkles,
  Target,
} from "lucide-react";
import { Page } from "@/components/app/Page";
import {
  RESEARCH_STUDENT,
  careerGoals,
  careerRoadmapsByGoal,
  internshipRecommendations,
  PROGRESS_UNLOCK_THRESHOLD,
} from "../researchStudentMock";
import { AnimatedNumber, FadeIn } from "../shared";
import { PageHero, SpotlightCard, MagneticButton } from "../premium";
import { StudentAmbient, ProgressGate } from "../studentUi";
import { FaIcon } from "../FaIcon";

type RoadmapPhase = (typeof careerRoadmapsByGoal)["biotech"][number];

export function ResearchCareerArenaPage() {
  const [selectedGoal, setSelectedGoal] = useState("biotech");
  const [expandedPhase, setExpandedPhase] = useState<RoadmapPhase | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const progress = RESEARCH_STUDENT.careerProgress;
  const internshipUnlocked = progress >= PROGRESS_UNLOCK_THRESHOLD;

  const activeGoal = careerGoals.find((g) => g.id === selectedGoal) ?? careerGoals[1];
  const roadmapPhases = careerRoadmapsByGoal[selectedGoal] ?? careerRoadmapsByGoal.biotech;

  return (
    <Page title="Career Arena" subtitle="Choose your path, build skills, land internships">
      <div className="relative">
        <StudentAmbient />

        <PageHero
          badge="Career Arena · Path Builder"
          title="Design Your Research Career"
          subtitle="Select one career path — your personalized roadmap and internship matches adapt to your choice."
        />

        {/* Selected career banner */}
        <FadeIn>
          <motion.div
            layout
            className="relative mb-6 overflow-hidden rounded-2xl border border-white/10"
            style={{ background: `linear-gradient(135deg, ${activeGoal.accent}15, transparent 60%)` }}
          >
            <div className="absolute inset-0 research-mesh opacity-20" />
            <div className="relative p-5 md:p-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <motion.div
                  key={activeGoal.id}
                  initial={{ scale: 0.8, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10"
                  style={{ background: `${activeGoal.accent}20`, color: activeGoal.accent }}
                >
                  <FaIcon name={activeGoal.icon} size="lg" />
                </motion.div>
                <div>
                  <div className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground">Active Career Path</div>
                  <h2 className="text-lg font-black text-white mt-0.5">{activeGoal.title}</h2>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{activeGoal.tagline}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-[9px] font-mono text-muted-foreground uppercase">Match Score</div>
                  <div className="text-2xl font-black" style={{ color: activeGoal.accent }}>
                    <AnimatedNumber value={activeGoal.match} suffix="%" />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPicker(!showPicker)}
                  className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 text-[10px] font-bold font-mono uppercase text-white hover:bg-white/10 transition cursor-pointer"
                >
                  {showPicker ? "Close" : "Change Path"}
                </button>
              </div>
            </div>
          </motion.div>
        </FadeIn>

        {/* Career picker — only shown when user wants to change */}
        <AnimatePresence>
          {showPicker && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8"
            >
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
                <Target className="h-3.5 w-3.5 text-violet-400" /> Choose Your Career Goal
              </h3>
              <div className="grid gap-3 md:grid-cols-3">
                {careerGoals.map((g, i) => (
                  <motion.button
                    key={g.id}
                    type="button"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => {
                      setSelectedGoal(g.id);
                      setShowPicker(false);
                    }}
                    className={`text-left cursor-pointer border-none rounded-2xl p-0 transition-all hover:scale-[1.02] ${
                      selectedGoal === g.id ? "ring-2" : ""
                    }`}
                    style={selectedGoal === g.id ? { boxShadow: `0 0 0 2px ${g.accent}80` } : {}}
                  >
                    <SpotlightCard className={`p-4 bg-gradient-to-br ${g.gradient}`}>
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-xl"
                          style={{ background: `${g.accent}25`, color: g.accent }}
                        >
                          <FaIcon name={g.icon} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-white">{g.title}</h4>
                          <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-2">{g.desc}</p>
                        </div>
                        {selectedGoal === g.id && (
                          <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: g.accent }} />
                        )}
                      </div>
                      <div className="mt-2 text-[9px] font-mono" style={{ color: g.accent }}>
                        {g.match}% match
                      </div>
                    </SpotlightCard>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Personalized roadmap */}
        <FadeIn delay={0.1}>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            Personalized Career Roadmap
            <span className="text-[9px] font-normal text-muted-foreground normal-case tracking-normal ml-1">
              — click a phase to view full roadmap
            </span>
          </h3>
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            {roadmapPhases.map((phase, i) => (
              <motion.button
                key={phase.phase}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                onClick={() => setExpandedPhase(phase)}
                className="text-left cursor-pointer border-none rounded-2xl p-0 group"
              >
                <SpotlightCard className="p-5 h-full hover:border-violet-500/30 transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors">
                      {phase.phase}
                    </h4>
                    <span className="text-lg font-black text-violet-400">
                      <AnimatedNumber value={phase.progress} suffix="%" />
                    </span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden mb-4">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-violet-400 to-indigo-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${phase.progress}%` }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                    />
                  </div>
                  <ul className="space-y-2">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                        <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-center gap-1 text-[9px] font-mono text-violet-400 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    View full roadmap <ChevronRight className="h-3 w-3" />
                  </div>
                </SpotlightCard>
              </motion.button>
            ))}
          </div>
        </FadeIn>

        {/* Internship recommendations — redesigned */}
        <FadeIn delay={0.15}>
          <ProgressGate
            unlocked={internshipUnlocked}
            unlockAt={PROGRESS_UNLOCK_THRESHOLD}
            currentProgress={progress}
            title="Internship Selection Recommendation"
          >
            <div className="mb-4 flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-emerald-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Internship Selection Recommendation
              </h3>
              <span className="text-[9px] font-mono text-emerald-400 ml-auto">
                Matched for {activeGoal.title}
              </span>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {internshipRecommendations.map((job, i) => (
                <motion.div
                  key={job.org}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <SpotlightCard className="p-5 h-full flex flex-col" color="52, 211, 153">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 text-sm font-black"
                      >
                        {job.match}%
                      </div>
                      <span className="text-[8px] font-mono px-2 py-0.5 rounded-full border border-amber-500/30 text-amber-400 bg-amber-500/10">
                        {job.deadline}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{job.role}</h4>
                    <p className="text-[10px] text-muted-foreground font-mono mt-1">{job.org}</p>
                    <p className="text-[11px] text-white/60 mt-3 leading-relaxed flex-1">{job.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {job.skills.map((s) => (
                        <span key={s} className="text-[8px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground border border-white/10">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-[9px] font-mono text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-emerald-400" />{job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-emerald-400" />{job.duration}</span>
                      <span className="flex items-center gap-1"><IndianRupee className="h-3 w-3 text-emerald-400" />{job.stipend}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {job.highlights.map((h) => (
                        <span key={h} className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {h}
                        </span>
                      ))}
                    </div>
                    <MagneticButton className="mt-4 w-full py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold uppercase">
                      Apply Now
                    </MagneticButton>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </ProgressGate>
        </FadeIn>

        {/* Full roadmap modal */}
        <AnimatePresence>
          {expandedPhase && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
              onClick={() => setExpandedPhase(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 bg-slate-950/95 p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setExpandedPhase(null)}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 border border-white/10 text-muted-foreground hover:text-white cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="text-[9px] font-mono text-violet-400 uppercase tracking-widest">
                  {activeGoal.title} · {expandedPhase.phase}
                </div>
                <h3 className="text-xl font-black text-white mt-1">{expandedPhase.fullRoadmap.title}</h3>
                <p className="text-[11px] text-muted-foreground mt-1">Duration: {expandedPhase.fullRoadmap.duration}</p>

                <div className="mt-6 space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase font-mono">Milestones</h4>
                  {expandedPhase.fullRoadmap.milestones.map((m) => (
                    <div
                      key={m.week}
                      className={`flex items-start gap-3 p-3 rounded-xl border ${
                        m.status === "done"
                          ? "border-emerald-500/30 bg-emerald-500/5"
                          : m.status === "active"
                            ? "border-violet-500/40 bg-violet-500/10"
                            : "border-white/5 bg-white/[0.02]"
                      }`}
                    >
                      <span className="text-[9px] font-mono text-muted-foreground shrink-0 w-14">{m.week}</span>
                      <span className="text-[11px] text-white/80">{m.task}</span>
                      {m.status === "done" && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 ml-auto shrink-0" />}
                      {m.status === "active" && (
                        <span className="text-[8px] font-mono text-violet-400 ml-auto shrink-0 px-2 py-0.5 rounded-full bg-violet-500/20">
                          In Progress
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase font-mono mb-2">Skills Covered</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {expandedPhase.fullRoadmap.skills.map((s) => (
                        <span key={s} className="text-[9px] font-mono px-2 py-1 rounded-lg bg-violet-500/10 text-violet-300 border border-violet-500/20">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase font-mono mb-2">Resources</h4>
                    <ul className="space-y-1">
                      {expandedPhase.fullRoadmap.resources.map((r) => (
                        <li key={r} className="text-[10px] text-muted-foreground flex items-center gap-1.5">
                          <ChevronRight className="h-3 w-3 text-violet-400" /> {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Page>
  );
}

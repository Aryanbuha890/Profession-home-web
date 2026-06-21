import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Map,
  Users,
  Calendar,
  ChevronRight,
  Package,
  Sparkles,
  FlaskConical,
} from "lucide-react";
import { Page } from "@/components/app/Page";
import { studentProjects, buyableProjects, projectSources } from "../researchStudentMock";
import { AnimatedNumber, FadeIn, ShimmerBar } from "../shared";
import { PageHero, SpotlightCard, MagneticButton } from "../premium";
import { StudentAmbient, SectionTabs } from "../studentUi";

export function ResearchProjectsPage() {
  const [source, setSource] = useState<"guide" | "buy">("guide");
  const [selectedId, setSelectedId] = useState(studentProjects[0].id);
  const project = studentProjects.find((p) => p.id === selectedId) ?? studentProjects[0];

  return (
    <Page title="Research Projects" subtitle="Via guide or buy — roadmap and progress tracking">
      <div className="relative">
        <StudentAmbient />

        <PageHero
          badge="Project Pipeline · Guide or Buy"
          title="Research Projects Hub"
          subtitle="Work with your guide on faculty projects, or purchase curated project kits with full roadmaps."
        />

        <SectionTabs
          tabs={projectSources.map((s) => ({ id: s.id, label: s.label }))}
          active={source}
          onChange={(id) => setSource(id as "guide" | "buy")}
        />

        <AnimatePresence mode="wait">
          {source === "guide" ? (
            <motion.div
              key="guide"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="grid gap-6 lg:grid-cols-3"
            >
              <FadeIn className="lg:col-span-1 space-y-3">
                {studentProjects.map((p) => (
                  <motion.button
                    key={p.id}
                    type="button"
                    whileHover={{ x: 4 }}
                    onClick={() => setSelectedId(p.id)}
                    className={`w-full text-left cursor-pointer border rounded-xl p-4 transition ${
                      selectedId === p.id
                        ? "bg-violet-500/15 border-violet-500/30"
                        : "bg-white/[0.02] border-white/5 hover:border-white/15"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg overflow-hidden shrink-0">
                        <img src={p.image} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate">{p.title}</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">{p.guide}</div>
                      </div>
                      {selectedId === p.id && <ChevronRight className="h-4 w-4 text-violet-400 ml-auto shrink-0" />}
                    </div>
                  </motion.button>
                ))}
              </FadeIn>

              <FadeIn delay={0.1} className="lg:col-span-2 space-y-4">
                <SpotlightCard className="overflow-hidden">
                  <div className="relative h-44">
                    <img src={project.image} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5">
                      <span className="text-[8px] font-mono px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30 uppercase">
                        {project.field}
                      </span>
                      <h3 className="text-lg font-black text-white mt-2">{project.title}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-4 text-[10px] font-mono text-muted-foreground">
                      <span className="flex items-center gap-1"><Users className="h-3 w-3 text-violet-400" />{project.collaborators} collaborators</span>
                      <span className="flex items-center gap-1"><FlaskConical className="h-3 w-3 text-violet-400" />Guide: {project.guide}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3 text-amber-400" />{project.nextMilestone}</span>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-[10px] font-mono mb-1">
                        <span>Project Progress</span>
                        <span><AnimatedNumber value={project.progress} suffix="%" /></span>
                      </div>
                      <ShimmerBar value={project.progress} />
                    </div>
                  </div>
                </SpotlightCard>

                <SpotlightCard className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Map className="h-4 w-4 text-violet-400" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Project Roadmap</h4>
                  </div>
                  <div className="relative">
                    <div className="absolute left-4 top-4 bottom-4 w-px bg-white/10" />
                    <div className="space-y-3">
                      {project.roadmap.map((step, i) => (
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="flex items-center gap-4 pl-1"
                        >
                          <div
                            className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 text-[10px] font-black ${
                              i < project.currentStep
                                ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                                : i === project.currentStep
                                  ? "border-violet-500 bg-violet-500/20 text-violet-300 research-pulse-glow"
                                  : "border-white/10 bg-white/5 text-muted-foreground"
                            }`}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </div>
                          <div
                            className={`flex-1 px-3 py-2 rounded-xl border text-[11px] ${
                              i < project.currentStep
                                ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-300"
                                : i === project.currentStep
                                  ? "border-violet-500/40 bg-violet-500/15 text-violet-300"
                                  : "border-white/5 text-muted-foreground"
                            }`}
                          >
                            {step}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </FadeIn>
            </motion.div>
          ) : (
            <motion.div
              key="buy"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
            >
              <div className="grid gap-4 md:grid-cols-3">
                {buyableProjects.map((p, i) => (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -6 }}
                  >
                    <SpotlightCard className="p-0 overflow-hidden h-full flex flex-col" color="251, 191, 36">
                      <div className="h-32 overflow-hidden relative">
                        <img src={p.image} alt="" className="w-full h-full object-cover opacity-70" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                        <span className="absolute top-3 left-3 text-[8px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {p.level}
                        </span>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-2">
                          <Package className="h-4 w-4 text-amber-400" />
                          <span className="text-[9px] font-mono text-muted-foreground">{p.field}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white">{p.title}</h4>
                        <p className="text-[10px] text-muted-foreground mt-1">{p.duration}</p>
                        <div className="mt-3 flex flex-wrap gap-1">
                          {p.includes.map((inc) => (
                            <span key={inc} className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-muted-foreground border border-white/10">
                              {inc}
                            </span>
                          ))}
                        </div>
                        <div className="mt-auto pt-4 flex justify-between items-center">
                          <span className="text-lg font-black text-amber-400">{p.price}</span>
                          <MagneticButton className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-bold">
                            Buy Project
                          </MagneticButton>
                        </div>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                ))}
              </div>
              <SpotlightCard className="p-5 mt-6 flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-violet-400" />
                <p className="text-xs text-muted-foreground">
                  Purchased projects include full roadmap, materials list, mentor Q&A, and progress tracking in this dashboard.
                </p>
              </SpotlightCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Page>
  );
}

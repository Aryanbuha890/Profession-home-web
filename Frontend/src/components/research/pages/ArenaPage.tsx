import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  FileText,
  Bot,
  ChevronLeft,
  BookOpen,
  PenLine,
  BarChart3,
  Megaphone,
  Shield,
} from "lucide-react";
import { Page } from "@/components/app/Page";
import {
  RESEARCH_STUDENT,
  researchArenaModules,
  researchArenaUnlock,
  PROGRESS_UNLOCK_THRESHOLD,
} from "../researchStudentMock";
import { FadeIn } from "../shared";
import { PageHero, SpotlightCard } from "../premium";
import { StudentAmbient } from "../studentUi";
import { FaIcon } from "../FaIcon";

type Module = (typeof researchArenaModules)[number];

const MODULE_ICONS: Record<string, typeof BookOpen> = {
  lit: BookOpen,
  abstract: PenLine,
  review: FileText,
  analytics: BarChart3,
};

export function ResearchArenaPage() {
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [activeUnlock, setActiveUnlock] = useState<string | null>(null);
  const progress = RESEARCH_STUDENT.researchArenaProgress;
  const unlockReady = progress >= PROGRESS_UNLOCK_THRESHOLD;

  return (
    <Page title="Research Arena" subtitle="Master literature, writing, analytics — unlock advanced tools">
      <div className="relative">
        <StudentAmbient />

        <PageHero
          badge="Research Arena · Skills Lab"
          title="Research Skills Arena"
          subtitle="Open any core module to explore literature, drafts, materials, and AI copilot assistance — all in one place."
        />

        <AnimatePresence mode="wait">
          {!activeModule ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <FadeIn>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-4">Core Modules</h3>
                <div className="grid gap-4 sm:grid-cols-2 mb-8">
                  {researchArenaModules.map((m, i) => {
                    const ModIcon = MODULE_ICONS[m.id] ?? BookOpen;
                    return (
                      <motion.button
                        key={m.id}
                        type="button"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.08 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        onClick={() => setActiveModule(m)}
                        className="text-left cursor-pointer border-none rounded-2xl p-0"
                      >
                        <SpotlightCard className="p-5 h-full group">
                          <div className="flex justify-between items-start">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15 text-violet-400 group-hover:bg-violet-500/25 transition-colors">
                              <ModIcon className="h-5 w-5" />
                            </div>
                            <span
                              className={`text-[8px] font-mono px-2 py-0.5 rounded-full uppercase ${
                                m.status === "active"
                                  ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                                  : "bg-white/5 text-muted-foreground border border-white/10"
                              }`}
                            >
                              {m.status}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-white mt-3 group-hover:text-violet-300 transition-colors">
                            {m.title}
                          </h4>
                          <p className="text-[11px] text-muted-foreground mt-1">{m.desc}</p>
                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-[9px] font-mono text-violet-400">
                              {m.materials.length} materials included
                            </span>
                            <span className="text-[9px] font-mono text-muted-foreground group-hover:text-violet-400 transition-colors">
                              Open module →
                            </span>
                          </div>
                        </SpotlightCard>
                      </motion.button>
                    );
                  })}
                </div>
              </FadeIn>

              <FadeIn delay={0.12}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
                  <span className="text-[9px] font-mono text-indigo-400 uppercase flex items-center gap-1">
                    <FaIcon name="sparkles" className="text-[10px]" /> Advanced Tools
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {researchArenaUnlock.map((m) => (
                    <motion.button
                      key={m.id}
                      type="button"
                      whileHover={{ scale: unlockReady ? 1.02 : 1 }}
                      onClick={() => unlockReady && setActiveUnlock(m.id)}
                      className={`text-left cursor-pointer border-none rounded-2xl p-0 ${!unlockReady ? "opacity-50" : ""}`}
                    >
                      <SpotlightCard className="p-5" color="99, 102, 241">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400">
                            {m.id === "cfp" ? <Megaphone className="h-5 w-5" /> : <Shield className="h-5 w-5" />}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white">{m.title}</h4>
                            <p className="text-[11px] text-muted-foreground mt-0.5">{m.desc}</p>
                          </div>
                        </div>
                        {!unlockReady && (
                          <p className="mt-3 text-[9px] font-mono text-amber-400">
                            Complete more core modules to unlock
                          </p>
                        )}
                      </SpotlightCard>
                    </motion.button>
                  ))}
                </div>
              </FadeIn>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <button
                type="button"
                onClick={() => setActiveModule(null)}
                className="flex items-center gap-2 mb-4 text-[11px] font-mono text-violet-400 hover:text-violet-300 cursor-pointer bg-transparent border-none"
              >
                <ChevronLeft className="h-4 w-4" /> Back to modules
              </button>

              <SpotlightCard className="p-6 mb-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-black text-white">{activeModule.title}</h2>
                    <p className="text-sm text-muted-foreground mt-1">{activeModule.content.summary}</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15 text-violet-400">
                    <FaIcon name={activeModule.icon} size="lg" />
                  </div>
                </div>
              </SpotlightCard>

              <div className="grid gap-4 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-4">
                  {/* Module-specific content */}
                  {activeModule.id === "lit" && "papers" in activeModule.content && (
                    <SpotlightCard className="p-5">
                      <h4 className="text-xs font-bold text-white uppercase font-mono mb-4">Literature Matrix</h4>
                      <div className="grid grid-cols-4 gap-2 mb-4">
                        {Object.entries(activeModule.content.prismaStats).map(([k, v]) => (
                          <div key={k} className="text-center p-2 rounded-lg bg-white/5 border border-white/10">
                            <div className="text-lg font-black text-violet-400">{v}</div>
                            <div className="text-[8px] font-mono text-muted-foreground uppercase">{k}</div>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        {activeModule.content.papers.map((p, i) => (
                          <motion.div
                            key={p.title}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:border-violet-500/20 transition"
                          >
                            <div className="flex justify-between gap-2">
                              <div>
                                <div className="text-[11px] font-bold text-white">{p.title}</div>
                                <div className="text-[9px] text-muted-foreground font-mono mt-0.5">{p.authors} · {p.journal}</div>
                              </div>
                              <span className="text-[10px] font-mono text-emerald-400 shrink-0">{p.relevance}%</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </SpotlightCard>
                  )}

                  {activeModule.id === "abstract" && "draft" in activeModule.content && (
                    <SpotlightCard className="p-5">
                      <h4 className="text-xs font-bold text-white uppercase font-mono mb-4">Abstract Draft</h4>
                      {Object.entries(activeModule.content.draft).map(([section, text]) => (
                        <div key={section} className="mb-3">
                          <div className="text-[9px] font-mono text-violet-400 uppercase mb-1">{section}</div>
                          <p className="text-[11px] text-white/80 leading-relaxed p-3 rounded-lg bg-white/[0.03] border border-white/5">
                            {text}
                          </p>
                        </div>
                      ))}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {activeModule.content.keywords.map((k) => (
                          <span key={k} className="text-[8px] font-mono px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                            {k}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {Object.entries(activeModule.content.aiScore).map(([k, v]) => (
                          <div key={k} className="text-center p-2 rounded-lg bg-white/5">
                            <div className="text-sm font-black text-violet-400">{v}</div>
                            <div className="text-[8px] font-mono text-muted-foreground uppercase">{k}</div>
                          </div>
                        ))}
                      </div>
                    </SpotlightCard>
                  )}

                  {activeModule.id === "review" && "sections" in activeModule.content && (
                    <SpotlightCard className="p-5">
                      <h4 className="text-xs font-bold text-white uppercase font-mono mb-4">Paper Sections</h4>
                      <p className="text-[10px] text-muted-foreground mb-3">
                        Target: {activeModule.content.targetJournal} · Co-authors: {activeModule.content.coAuthors.join(", ")}
                      </p>
                      <div className="space-y-2">
                        {activeModule.content.sections.map((s) => (
                          <div
                            key={s.name}
                            className={`flex items-center justify-between p-3 rounded-xl border ${
                              s.status === "done"
                                ? "border-emerald-500/30 bg-emerald-500/5"
                                : s.status === "active"
                                  ? "border-violet-500/40 bg-violet-500/10"
                                  : "border-white/5 bg-white/[0.02]"
                            }`}
                          >
                            <span className="text-[11px] font-bold text-white">{s.name}</span>
                            <div className="flex items-center gap-2">
                              {s.words > 0 && <span className="text-[9px] font-mono text-muted-foreground">{s.words} words</span>}
                              <span className={`text-[8px] font-mono uppercase px-2 py-0.5 rounded-full ${
                                s.status === "done" ? "bg-emerald-500/20 text-emerald-400" :
                                s.status === "active" ? "bg-violet-500/20 text-violet-400" :
                                "bg-white/5 text-muted-foreground"
                              }`}>{s.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </SpotlightCard>
                  )}

                  {activeModule.id === "analytics" && "stats" in activeModule.content && (
                    <SpotlightCard className="p-5">
                      <h4 className="text-xs font-bold text-white uppercase font-mono mb-4">Analysis Results</h4>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {activeModule.content.stats.map((s) => (
                          <div key={s.metric} className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                            <div className="text-[9px] font-mono text-muted-foreground">{s.metric}</div>
                            <div className="text-lg font-black text-white mt-1">{s.value}</div>
                            {s.change && (
                              <div className={`text-[9px] font-mono mt-0.5 ${s.change.startsWith("+") || s.change === "significant" ? "text-emerald-400" : s.change.startsWith("-") ? "text-rose-400" : "text-muted-foreground"}`}>
                                {s.change}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="space-y-1">
                        {activeModule.content.charts.map((c) => (
                          <div key={c} className="flex items-center gap-2 p-2 rounded-lg bg-violet-500/5 border border-violet-500/10">
                            <BarChart3 className="h-3.5 w-3.5 text-violet-400" />
                            <span className="text-[10px] text-white/80">{c}</span>
                          </div>
                        ))}
                      </div>
                    </SpotlightCard>
                  )}

                  {/* AI Copilot inline */}
                  <SpotlightCard className="p-4 flex items-start gap-3" color="99, 102, 241">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 shrink-0">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-indigo-300 uppercase font-mono">AI Research Copilot</div>
                      <p className="text-[11px] text-muted-foreground mt-1">{activeModule.content.aiCopilot}</p>
                      <div className="mt-2 flex gap-2">
                        <input
                          type="text"
                          placeholder="Ask the copilot..."
                          className="flex-1 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-white placeholder:text-muted-foreground outline-none focus:border-indigo-500/40"
                        />
                        <button type="button" className="px-3 py-1.5 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-[10px] font-bold cursor-pointer">
                          Ask
                        </button>
                      </div>
                    </div>
                  </SpotlightCard>
                </div>

                {/* Materials sidebar */}
                <div>
                  <SpotlightCard className="p-5">
                    <h4 className="text-xs font-bold text-white uppercase font-mono mb-4 flex items-center gap-2">
                      <FileText className="h-3.5 w-3.5 text-violet-400" /> Materials
                    </h4>
                    <div className="space-y-2">
                      {activeModule.materials.map((mat, i) => (
                        <motion.div
                          key={mat.title}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.06 }}
                          className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:border-violet-500/20 transition group"
                        >
                          <div>
                            <div className="text-[11px] font-semibold text-white">{mat.title}</div>
                            <div className="text-[9px] font-mono text-muted-foreground">{mat.type} · {mat.size}</div>
                          </div>
                          <button type="button" className="p-1.5 rounded-lg bg-violet-500/10 text-violet-400 opacity-0 group-hover:opacity-100 transition cursor-pointer border-none">
                            <Download className="h-3.5 w-3.5" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </SpotlightCard>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unlock tool detail modal */}
        <AnimatePresence>
          {activeUnlock && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
              onClick={() => setActiveUnlock(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-950/95 p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <button type="button" onClick={() => setActiveUnlock(null)} className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 cursor-pointer border-none text-muted-foreground">
                  <X className="h-4 w-4" />
                </button>
                {activeUnlock === "cfp" && (
                  <>
                    <h3 className="text-lg font-black text-white">Calls for Papers</h3>
                    <p className="text-[11px] text-muted-foreground mt-1">Conference CFP scanner with fit scoring</p>
                    <div className="mt-4 space-y-2">
                      {researchArenaUnlock[0].items?.map((item) => (
                        <div key={item.conf} className="flex justify-between p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                          <div>
                            <div className="text-[11px] font-bold text-white">{item.conf}</div>
                            <div className="text-[9px] font-mono text-muted-foreground">Deadline: {item.deadline}</div>
                          </div>
                          <span className="text-[11px] font-mono text-emerald-400">{item.fit}% fit</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {activeUnlock === "ai" && (
                  <>
                    <h3 className="text-lg font-black text-white">AI Detection & Evaluation</h3>
                    <p className="text-[11px] text-muted-foreground mt-1">Originality and AI-content analysis for your manuscript</p>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {researchArenaUnlock[1].scores && Object.entries(researchArenaUnlock[1].scores).map(([k, v]) => (
                        <div key={k} className="text-center p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                          <div className="text-xl font-black text-indigo-400">{v}{k === "aiContent" || k === "plagiarism" ? "%" : ""}</div>
                          <div className="text-[8px] font-mono text-muted-foreground uppercase mt-1">{k.replace(/([A-Z])/g, " $1")}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Page>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/app/Page";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Trophy,
  Terminal,
  Layers,
  Activity,
  Brain,
  Briefcase,
  Compass,
  ArrowRight,
  CheckCircle2,
  Circle,
  Sparkles,
  Plus,
  Trash2,
  Lock,
  Award,
  Users
} from "lucide-react";

export const Route = createFileRoute("/app/roadmap")({
  head: () => ({ meta: [{ title: "Roadmap — Professional Home" }] }),
  component: Roadmap,
});

interface Task {
  id: string;
  title: string;
  done: boolean;
  isAiRecommended?: boolean;
}

interface Phase {
  phase: number;
  name: string;
  desc: string;
  details: string;
  action: string;
  category: "Research" | "Algorithms" | "Engineering" | "Rehearsal" | "Placement";
  tags: string[];
  gradient: string;
  color: "emerald" | "sky" | "indigo" | "violet" | "rose";
  tasks: Task[];
  initials: string;
  timeline: string;
}

const initialPhasesData: Phase[] = [
  {
    phase: 1,
    name: "Research & Domain Mapping",
    desc: "Study target roles, map skill gaps, and pick 3 case study companies.",
    details: "Establish baseline diagnostic metrics. Highlight specific domain standard gaps to construct your core focus.",
    action: "Review Role Metrics",
    category: "Research",
    tags: ["Domain Mapping", "Skill Gaps", "Company Research"],
    gradient: "from-emerald-400 to-teal-500",
    color: "emerald",
    initials: "P1",
    timeline: "Months 1 - 2",
    tasks: [
      { id: "p1-t1", title: "Study target roles & career matrices", done: true },
      { id: "p1-t2", title: "Map current skill gaps vs benchmarks", done: true },
      { id: "p1-t3", title: "Select 3 target case study companies", done: true },
    ],
  },
  {
    phase: 2,
    name: "Skill & Algorithmic Dev",
    desc: "Tackle coding challenges, system architectures, and core software engineering fundamentals.",
    details: "Focus on mastering quantitative methods, logic validation, and basic server architectures.",
    action: "Solve Logic Audits",
    category: "Algorithms",
    tags: ["DSA Prep", "System Design 101", "Teardowns"],
    gradient: "from-sky-400 to-blue-500",
    color: "sky",
    initials: "P2",
    timeline: "Months 2 - 3",
    tasks: [
      { id: "p2-t1", title: "Solve 30 medium coding challenges", done: true },
      { id: "p2-t2", title: "Complete System Design 101 course", done: true },
      { id: "p2-t3", title: "Draft 2 product teardown case studies", done: false },
    ],
  },
  {
    phase: 3,
    name: "Capstone Execution",
    desc: "Deploy proof-of-capability workspaces, run test coverages, and integrate pipelines.",
    details: "Initialize active repositories, config unit test checks, and execute continuous delivery runs.",
    action: "Configure Workspace IDE",
    category: "Engineering",
    tags: ["MVP Coding", "Vitest Checks", "Cloud Deploy"],
    gradient: "from-indigo-400 to-purple-500",
    color: "indigo",
    initials: "P3",
    timeline: "Months 3 - 4",
    tasks: [
      { id: "p3-t1", title: "Define MVP roadmap & schemas", done: false },
      { id: "p3-t2", title: "Deploy capstone to cloud environment", done: false },
      { id: "p3-t3", title: "Write Vitest integration checks", done: false },
    ],
  },
  {
    phase: 4,
    name: "Whiteboard & Panel Rehearsal",
    desc: "Polish behavioral scenario matrices, mock system scalings, and technical assessments.",
    details: "Lock releases once Phase 3 reaches completion threshold. Prepares speaking fluency under simulated panels.",
    action: "Launch Mock Simulator",
    category: "Rehearsal",
    tags: ["Behavioral Scenarios", "Whiteboard Scalings", "Panel Mocks"],
    gradient: "from-purple-400 to-fuchsia-500",
    color: "violet",
    initials: "P4",
    timeline: "Months 4 - 5",
    tasks: [
      { id: "p4-t1", title: "Record 3 mock behavioral scenarios", done: false },
      { id: "p4-t2", title: "Rehearse 5 whiteboard system designs", done: false },
      { id: "p4-t3", title: "Receive expert peer review assessment", done: false },
    ],
  },
  {
    phase: 5,
    name: "Placement Match Drives",
    desc: "Submit credentials to active company routing and negotiate final compensation structures.",
    details: "Trigger custom talent matching models and coordinate scheduler interview stages.",
    action: "Submit Placement Profiles",
    category: "Placement",
    tags: ["Company Routing", "Negotiate Terms", "Summer Placement"],
    gradient: "from-fuchsia-400 to-rose-500",
    color: "rose",
    initials: "P5",
    timeline: "Months 5 - 6",
    tasks: [
      { id: "p5-t1", title: "Authorize company matched screening routes", done: false },
      { id: "p5-t2", title: "Negotiate contract terms & signing bonuses", done: false },
      { id: "p5-t3", title: "Secure final technical summer placement", done: false },
    ],
  },
];

const CATEGORY_STYLES = {
  "Research": {
    text: "text-emerald-400",
    border: "border-emerald-500/20 hover:border-emerald-500/40",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.15)] border-emerald-500/30",
    accent: "#10b981",
    icon: Award
  },
  "Algorithms": {
    text: "text-sky-400",
    border: "border-sky-500/20 hover:border-sky-500/40",
    badge: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    glow: "shadow-[0_0_20px_rgba(56,189,248,0.15)] border-sky-500/30",
    accent: "#38bdf8",
    icon: Compass
  },
  "Engineering": {
    text: "text-indigo-400",
    border: "border-indigo-500/20 hover:border-indigo-500/40",
    badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    glow: "shadow-[0_0_20px_rgba(99,102,241,0.15)] border-indigo-500/30",
    accent: "#6366f1",
    icon: Brain
  },
  "Rehearsal": {
    text: "text-purple-400",
    border: "border-purple-500/20 hover:border-purple-500/40",
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.15)] border-purple-500/30",
    accent: "#a855f7",
    icon: Users
  },
  "Placement": {
    text: "text-rose-400",
    border: "border-rose-500/20 hover:border-rose-500/40",
    badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    glow: "shadow-[0_0_20px_rgba(244,63,94,0.15)] border-rose-500/30",
    accent: "#f43f5e",
    icon: Briefcase
  }
};

function PhaseJourneyCard({
  phase,
  status,
  progress,
  onViewRoadmap
}: {
  phase: Phase;
  status: "Done" | "In Progress" | "Upcoming" | "Locked";
  progress: number;
  onViewRoadmap: () => void;
}) {
  const styles = CATEGORY_STYLES[phase.category];
  const IconComponent = styles.icon;

  const isLocked = status === "Locked";

  return (
    <div className={`relative flex flex-col sm:flex-row gap-5 p-5 rounded-3xl border ${styles.border} bg-slate-900/30 backdrop-blur-md transition-all duration-300 ${isLocked ? 'opacity-60' : 'hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]'}`}>
      {/* Monogram Box & Timeline */}
      <div className="flex flex-col items-center shrink-0">
        <div className={`w-24 h-24 rounded-2xl bg-slate-950/80 border flex items-center justify-center font-mono font-black text-2xl text-white ${styles.glow}`}>
          {isLocked ? <Lock size={24} className="text-muted-foreground/30" /> : phase.initials}
        </div>
        <span className="text-[10px] font-mono text-muted-foreground/50 mt-2 tracking-wider">{phase.timeline}</span>
      </div>

      {/* Phase Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Top category pill row */}
          <div className="flex justify-between items-start gap-2">
            <div>
              <h4 className="text-md font-black text-white leading-tight font-display">
                Phase {phase.phase}: {phase.name}
              </h4>
              <p className={`text-xs font-bold ${styles.text} mt-0.5 uppercase tracking-wide text-[10px]`}>{phase.category}</p>
            </div>
            <span className={`flex items-center gap-1 text-[9px] uppercase font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full border ${styles.badge}`}>
              <IconComponent size={10} />
              {status}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground mt-3.5 leading-relaxed">
            {phase.desc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {phase.tags.map((tag) => (
              <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded-lg border border-white/5 bg-white/[0.02] text-muted-foreground/50">{tag}</span>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between border-t border-white/5 mt-5 pt-3">
          {/* Progress gauge */}
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: styles.accent }} />
            </div>
            <span className="text-[9px] font-mono text-muted-foreground/60">{progress}% Complete</span>
          </div>

          {/* View Roadmap button */}
          <button
            onClick={onViewRoadmap}
            disabled={isLocked}
            className={`flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider py-1.5 px-3.5 rounded-xl border hover:bg-white/5 transition cursor-pointer ${
              isLocked ? 'border-white/5 text-muted-foreground/30 cursor-not-allowed' : `${styles.text} ${styles.border}`
            }`}
          >
            Explore Phase <ArrowRight size={10} />
          </button>
        </div>
      </div>
    </div>
  );
}

function PhaseRoadmapModal({
  phase,
  status,
  progress,
  onClose,
  onToggleTask,
  onAddTask,
  onDeleteTask
}: {
  phase: Phase;
  status: "Done" | "In Progress" | "Upcoming" | "Locked";
  progress: number;
  onClose: () => void;
  onToggleTask: (taskId: string) => void;
  onAddTask: (title: string) => void;
  onDeleteTask: (taskId: string) => void;
}) {
  const styles = CATEGORY_STYLES[phase.category];
  const [newTaskInput, setNewTaskInput] = useState("");

  const handleAddNewTask = () => {
    if (!newTaskInput.trim()) return;
    onAddTask(newTaskInput.trim());
    setNewTaskInput("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative max-w-4xl w-full border border-white/10 bg-slate-955/90 rounded-3xl p-6 md:p-8 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] max-h-[90vh] overflow-y-auto"
      >
        {/* Glow Effects */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20" style={{ backgroundColor: styles.accent }} />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-10" style={{ backgroundColor: styles.accent }} />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition cursor-pointer border-none"
        >
          <X size={16} />
        </button>

        {/* Modal Header */}
        <div className="max-w-2xl">
          <span className={`text-[10px] uppercase font-mono tracking-widest font-extrabold block ${styles.text}`}>
            // Phase {phase.phase} Blueprint
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1.5 tracking-tight font-display uppercase leading-none">
            {phase.name}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground/80 mt-2 font-mono">
            Focus Period: {phase.timeline} · {status}
          </p>
        </div>

        {/* Step-by-Step roadmap flow */}
        <div className="mt-8">
          <span className={`text-[9px] font-mono tracking-widest font-bold uppercase block mb-6 ${styles.text}`}>
            STEP-BY-STEP ROADMAP
          </span>

          <div className="relative mt-2">
            {/* Connector Line */}
            {phase.tasks.length > 1 && (
              <div className="absolute top-[28px] left-[12.5%] right-[12.5%] h-[2px] bg-white/5 z-0 hidden md:block" />
            )}

            <div className={`grid gap-6 relative ${
              phase.tasks.length === 1 ? 'md:grid-cols-1 max-w-sm mx-auto' :
              phase.tasks.length === 2 ? 'md:grid-cols-2 max-w-xl mx-auto' :
              phase.tasks.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'
            }`}>
              {phase.tasks.map((task, idx) => {
                const stepNum = String(idx + 1).padStart(2, "0");
                return (
                  <div key={task.id} className="text-center relative">
                    {/* Node Circle */}
                    <button
                      onClick={() => onToggleTask(task.id)}
                      className="w-14 h-14 rounded-full border bg-slate-950 flex items-center justify-center text-white font-mono font-black text-sm mx-auto z-10 relative shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer transition hover:scale-105 active:scale-95"
                      style={{ 
                        borderColor: task.done ? "#10b981" : styles.accent,
                        boxShadow: task.done ? "0 0 15px rgba(16,185,129,0.2)" : `0 0 15px ${styles.accent}20` 
                      }}
                    >
                      {task.done ? <CheckCircle2 size={16} className="text-emerald-400" /> : stepNum}
                    </button>

                    {/* Step details card */}
                    <div className="mt-4 p-4 rounded-2xl border border-white/5 bg-slate-900/30 text-left h-[180px] flex flex-col justify-between overflow-y-auto">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[8px] font-mono text-muted-foreground uppercase">Step {stepNum}</span>
                          <button
                            onClick={() => onDeleteTask(task.id)}
                            className="text-muted-foreground/30 hover:text-red-400 transition cursor-pointer border-none bg-transparent"
                          >
                            <Trash2 size={10} />
                          </button>
                        </div>
                        <h4 className="text-xs font-bold text-white mb-2 leading-relaxed">{task.title}</h4>
                        {task.isAiRecommended && (
                          <span className="text-[8px] text-sky-400 font-mono flex items-center gap-0.5 mt-1">
                            <Sparkles size={8} /> AI Recommended
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => onToggleTask(task.id)}
                        className={`w-full py-1.5 rounded-lg border text-[9px] font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition cursor-pointer ${
                          task.done 
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                            : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                        }`}
                      >
                        {task.done ? "✓ Completed" : "Mark as Done"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Add custom task */}
        <div className="mt-6 p-4 rounded-2xl border border-white/5 bg-white/[0.01] flex gap-2 max-w-md">
          <input
            type="text"
            placeholder="Add custom milestone to this phase..."
            value={newTaskInput}
            onChange={(e) => setNewTaskInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddNewTask();
            }}
            className="flex-1 bg-slate-900/60 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500/50"
          />
          <button
            onClick={handleAddNewTask}
            className="px-4 py-1.5 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center cursor-pointer transition text-xs"
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Bottom row Advice & Stats */}
        <div className="grid gap-6 md:grid-cols-2 mt-8 border-t border-white/5 pt-6">
          {/* Advice Column */}
          <div>
            <span className={`text-[9px] font-mono tracking-widest font-bold uppercase block mb-3 ${styles.text}`}>
              ★ PHASE REPORT
            </span>
            <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.01] flex items-start gap-3 h-full">
              <span className="text-2xl text-muted-foreground/30 font-serif leading-none">“</span>
              <p className="text-xs italic text-white/80 leading-relaxed font-mono font-medium">
                {phase.details}
              </p>
            </div>
          </div>

          {/* Stats Column */}
          <div>
            <span className={`text-[9px] font-mono tracking-widest font-bold uppercase block mb-3 ${styles.text}`}>
              ⚡ BLUEPRINT STATS
            </span>
            <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.01] space-y-3.5 h-full font-mono">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Active Status:</span>
                <span className={`font-bold ${styles.text}`}>{status}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Tasks Completed:</span>
                <span className="text-white font-bold">
                  {phase.tasks.filter(t => t.done).length} of {phase.tasks.length} Done
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>Phase Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${progress}%`, backgroundColor: styles.accent }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Roadmap() {
  const [phases, setPhases] = useState<Phase[]>(initialPhasesData);
  const [selectedPhaseId, setSelectedPhaseId] = useState<number | null>(null);

  const calculateProgress = (tasks: Task[]) => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter((t) => t.done).length;
    return Math.round((completed / tasks.length) * 100);
  };

  // Compute dynamic status and percentage for each phase
  const updatedPhases = phases.map((p, idx) => {
    const pct = calculateProgress(p.tasks);

    // Calculate status dynamically based on progress and dependencies
    let status: "Done" | "In Progress" | "Upcoming" | "Locked" = "Upcoming";
    if (pct === 100) {
      status = "Done";
    } else if (idx === 0) {
      status = pct > 0 ? "In Progress" : "Upcoming";
    } else {
      const prevPct = calculateProgress(phases[idx - 1].tasks);
      const prevDone = prevPct === 100;
      if (prevDone) {
        status = pct > 0 ? "In Progress" : "Upcoming";
      } else {
        status = "Locked";
      }
    }

    return {
      ...p,
      pct,
      status,
    };
  });

  const activeModalPhase = selectedPhaseId !== null ? updatedPhases.find(p => p.phase === selectedPhaseId) : null;

  // Calculate overall metrics
  const totalCompletedPhases = updatedPhases.filter((p) => p.status === "Done").length;
  const overallPercentage = Math.round(
    updatedPhases.reduce((acc, p) => acc + p.pct, 0) / updatedPhases.length
  );

  const handleToggleTask = (phaseNumber: number, taskId: string) => {
    setPhases((prevPhases) =>
      prevPhases.map((p) => {
        if (p.phase === phaseNumber) {
          return {
            ...p,
            tasks: p.tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)),
          };
        }
        return p;
      })
    );
  };

  const handleAddTask = (phaseNumber: number, title: string) => {
    if (!title.trim()) return;
    setPhases((prevPhases) =>
      prevPhases.map((p) => {
        if (p.phase === phaseNumber) {
          return {
            ...p,
            tasks: [
              ...p.tasks,
              { id: `custom-${Date.now()}`, title: title.trim(), done: false },
            ],
          };
        }
        return p;
      })
    );
  };

  const handleDeleteTask = (phaseNumber: number, taskId: string) => {
    setPhases((prevPhases) =>
      prevPhases.map((p) => {
        if (p.phase === phaseNumber) {
          return {
            ...p,
            tasks: p.tasks.filter((t) => t.id !== taskId),
          };
        }
        return p;
      })
    );
  };

  return (
    <Page title="Career Roadmap" subtitle="Navigate your 5-phase career roadmap blueprint.">
      {/* Objective Goal Header HUD */}
      <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-slate-900/40 p-5 mb-6">
        <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 rounded-full blur-xl pointer-events-none" />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-sky-400 font-bold flex items-center gap-1">
              <Sparkles className="h-3 w-3 animate-pulse" /> Active Career Objective
            </span>
            <h3 className="text-base font-black text-white mt-1 leading-snug font-display">
              Goal: Land summer internship at a top product company
            </h3>
          </div>
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl">
            {/* Circular Gauge */}
            <div className="relative h-12 w-12 flex items-center justify-center">
              <svg className="absolute transform -rotate-90 w-full h-full" viewBox="0 0 36 36">
                <path
                  className="text-white/5"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-sky-400 transition-all duration-1000 ease-out"
                  strokeWidth="3"
                  strokeDasharray={`${overallPercentage}, 100`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="text-xs font-mono font-bold text-white">{overallPercentage}%</span>
            </div>
            <div>
              <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">Blueprint Tracker</div>
              <div className="text-xs font-bold text-white mt-0.5">{totalCompletedPhases} of 5 Districts Conquered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Roadmap Phase Cards */}
      <div className="grid gap-6 sm:grid-cols-2 mt-6">
        {updatedPhases.map((phase) => (
          <PhaseJourneyCard
            key={phase.phase}
            phase={phase}
            status={phase.status}
            progress={phase.pct}
            onViewRoadmap={() => setSelectedPhaseId(phase.phase)}
          />
        ))}
      </div>

      {/* Modal Detail overlay */}
      <AnimatePresence>
        {activeModalPhase && (
          <PhaseRoadmapModal
            phase={activeModalPhase}
            status={activeModalPhase.status}
            progress={activeModalPhase.pct}
            onClose={() => setSelectedPhaseId(null)}
            onToggleTask={(taskId) => handleToggleTask(activeModalPhase.phase, taskId)}
            onAddTask={(title) => handleAddTask(activeModalPhase.phase, title)}
            onDeleteTask={(taskId) => handleDeleteTask(activeModalPhase.phase, taskId)}
          />
        )}
      </AnimatePresence>
    </Page>
  );
}

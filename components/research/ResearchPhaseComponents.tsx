import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  ArrowRight,
  X,
  Plus,
  CheckCircle2,
  Trash2,
  Sparkles,
  Compass,
  BookOpen,
  Activity,
  FileText,
  Award,
} from "lucide-react";
import type { ResearchPhase, PhaseStatus } from "./types";

const CATEGORY_STYLES: Record<
  string,
  {
    text: string;
    border: string;
    badge: string;
    glow: string;
    accent: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
  }
> = {
  Hypothesis: {
    text: "text-violet-400",
    border: "border-violet-500/20 hover:border-violet-500/40",
    badge: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.15)] border-violet-500/30",
    accent: "#a855f7",
    icon: Compass,
  },
  Literature: {
    text: "text-sky-400",
    border: "border-sky-500/20 hover:border-sky-500/40",
    badge: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    glow: "shadow-[0_0_20px_rgba(56,189,248,0.15)] border-sky-500/30",
    accent: "#38bdf8",
    icon: BookOpen,
  },
  Experiment: {
    text: "text-emerald-400",
    border: "border-emerald-500/20 hover:border-emerald-500/40",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.15)] border-emerald-500/30",
    accent: "#10b981",
    icon: Activity,
  },
  Drafting: {
    text: "text-indigo-400",
    border: "border-indigo-500/20 hover:border-indigo-500/40",
    badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    glow: "shadow-[0_0_20px_rgba(99,102,241,0.15)] border-indigo-500/30",
    accent: "#6366f1",
    icon: FileText,
  },
  Submission: {
    text: "text-rose-400",
    border: "border-rose-500/20 hover:border-rose-500/40",
    badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    glow: "shadow-[0_0_20px_rgba(244,63,94,0.15)] border-rose-500/30",
    accent: "#f43f5e",
    icon: Award,
  },
};

export function ResearchPhaseJourneyCard({
  phase,
  status,
  progress,
  onViewRoadmap,
  index = 0,
}: {
  phase: ResearchPhase;
  status: PhaseStatus;
  progress: number;
  onViewRoadmap: () => void;
  index?: number;
}) {
  const styles = CATEGORY_STYLES[phase.category];
  const IconComponent = styles.icon;
  const isLocked = status === "Locked";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col sm:flex-row gap-5 p-5 rounded-3xl border ${styles.border} bg-slate-900/30 backdrop-blur-md transition-all duration-300 ${isLocked ? "opacity-60" : "hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"}`}
    >
      <div className="flex flex-col items-center shrink-0">
        <div
          className={`w-24 h-24 rounded-2xl bg-slate-950/80 border flex items-center justify-center font-mono font-black text-2xl text-white ${styles.glow}`}
        >
          {isLocked ? <Lock size={24} className="text-muted-foreground/30" /> : phase.initials}
        </div>
        <span className="text-[10px] font-mono text-muted-foreground/50 mt-2 tracking-wider">
          {phase.timeline}
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-2">
            <div>
              <h4 className="text-md font-black text-white leading-tight font-display">
                Phase {phase.phase}: {phase.name}
              </h4>
              <p className={`text-xs font-bold ${styles.text} mt-0.5 uppercase tracking-wide text-[10px]`}>
                {phase.category}
              </p>
            </div>
            <span
              className={`flex items-center gap-1 text-[9px] uppercase font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full border ${styles.badge}`}
            >
              <IconComponent size={10} />
              {status}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-3.5 leading-relaxed">{phase.desc}</p>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {phase.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-mono px-2 py-0.5 rounded-lg border border-white/5 bg-white/[0.02] text-muted-foreground/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/5 mt-5 pt-3">
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: styles.accent }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>
            <span className="text-[9px] font-mono text-muted-foreground/60">{progress}% Complete</span>
          </div>
          <button
            type="button"
            onClick={onViewRoadmap}
            disabled={isLocked}
            className={`flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider py-1.5 px-3.5 rounded-xl border hover:bg-white/5 transition cursor-pointer ${
              isLocked
                ? "border-white/5 text-muted-foreground/30 cursor-not-allowed"
                : `${styles.text} ${styles.border}`
            }`}
          >
            Explore Phase <ArrowRight size={10} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function ResearchPhaseRoadmapModal({
  phase,
  status,
  progress,
  onClose,
  onToggleTask,
  onAddTask,
  onDeleteTask,
}: {
  phase: ResearchPhase;
  status: PhaseStatus;
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
        className="relative max-w-4xl w-full border border-white/10 bg-[#0a0c16]/90 rounded-3xl p-6 md:p-8 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] max-h-[90vh] overflow-y-auto"
      >
        <div
          className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: styles.accent }}
        />

        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition cursor-pointer border-none"
        >
          <X size={16} />
        </button>

        <div className="max-w-2xl text-left">
          <span className={`text-[10px] uppercase font-mono tracking-widest font-extrabold block ${styles.text}`}>
            // Phase {phase.phase} Research Blueprint
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1.5 tracking-tight font-display uppercase leading-none">
            {phase.name}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground/80 mt-2 font-mono">
            Focus Period: {phase.timeline} · {status}
          </p>
        </div>

        <div className="mt-8">
          <span className={`text-[9px] font-mono tracking-widest font-bold uppercase block mb-6 text-left ${styles.text}`}>
            STEP-BY-STEP ROADMAP
          </span>
          <div
            className={`grid gap-6 relative ${
              phase.tasks.length <= 2 ? "md:grid-cols-2 max-w-xl mx-auto" : "md:grid-cols-3"
            }`}
          >
            {phase.tasks.map((task, idx) => {
              const stepNum = String(idx + 1).padStart(2, "0");
              return (
                <div key={task.id} className="text-center relative">
                  <button
                    type="button"
                    onClick={() => onToggleTask(task.id)}
                    className="w-14 h-14 rounded-full border bg-slate-950 flex items-center justify-center text-white font-mono font-black text-sm mx-auto z-10 relative shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer transition hover:scale-105 active:scale-95"
                    style={{
                      borderColor: task.done ? "#10b981" : styles.accent,
                      boxShadow: task.done
                        ? "0 0 15px rgba(16,185,129,0.2)"
                        : `0 0 15px ${styles.accent}20`,
                    }}
                  >
                    {task.done ? <CheckCircle2 size={16} className="text-emerald-400" /> : stepNum}
                  </button>
                  <div className="mt-4 p-4 rounded-2xl border border-white/5 bg-slate-900/30 text-left min-h-[160px] flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[8px] font-mono text-muted-foreground uppercase">Step {stepNum}</span>
                        <button
                          type="button"
                          onClick={() => onDeleteTask(task.id)}
                          className="text-muted-foreground/30 hover:text-red-400 transition cursor-pointer border-none bg-transparent"
                        >
                          <Trash2 size={10} />
                        </button>
                      </div>
                      <h4 className="text-xs font-bold text-white mb-2 leading-relaxed">{task.title}</h4>
                      {task.isAiRecommended && (
                        <span className="text-[8px] text-violet-400 font-mono flex items-center gap-0.5 mt-1">
                          <Sparkles size={8} /> AI Recommended
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
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

        <div className="mt-6 p-4 rounded-2xl border border-white/5 bg-white/[0.01] flex gap-2 max-w-md text-left">
          <input
            type="text"
            placeholder="Add custom research milestone..."
            value={newTaskInput}
            onChange={(e) => setNewTaskInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddNewTask();
            }}
            className="flex-1 bg-slate-900/60 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-violet-500/50"
          />
          <button
            type="button"
            onClick={handleAddNewTask}
            className="px-4 py-1.5 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center cursor-pointer transition text-xs border-none"
          >
            <Plus size={14} />
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mt-8 border-t border-white/5 pt-6 text-left">
          <div>
            <span className={`text-[9px] font-mono tracking-widest font-bold uppercase block mb-3 ${styles.text}`}>
              ★ ADVISOR REPORT
            </span>
            <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.01] flex items-start gap-3">
              <span className="text-2xl text-muted-foreground/30 font-serif leading-none">"</span>
              <p className="text-xs italic text-white/80 leading-relaxed font-mono font-medium">{phase.details}</p>
            </div>
          </div>
          <div>
            <span className={`text-[9px] font-mono tracking-widest font-bold uppercase block mb-3 ${styles.text}`}>
              ⚡ BLUEPRINT STATS
            </span>
            <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.01] space-y-3.5 font-mono">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Active Status:</span>
                <span className={`font-bold ${styles.text}`}>{status}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-white font-bold">
                  {phase.tasks.filter((t) => t.done).length} of {phase.tasks.length} Done
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>Phase Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${progress}%`, backgroundColor: styles.accent }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function usePhaseProgress(phases: ResearchPhase[]) {
  const calculateProgress = (tasks: ResearchPhase["tasks"]) => {
    if (tasks.length === 0) return 0;
    return Math.round((tasks.filter((t) => t.done).length / tasks.length) * 100);
  };

  const updatedPhases = phases.map((p, idx) => {
    const pct = calculateProgress(p.tasks);
    let status: PhaseStatus = "Upcoming";
    if (pct === 100) status = "Done";
    else if (idx === 0) status = pct > 0 ? "In Progress" : "Upcoming";
    else {
      const prevPct = calculateProgress(phases[idx - 1].tasks);
      status = prevPct === 100 ? (pct > 0 ? "In Progress" : "Upcoming") : "Locked";
    }
    return { ...p, pct, status };
  });

  const overallPercentage = Math.round(
    updatedPhases.reduce((acc, p) => acc + p.pct, 0) / updatedPhases.length,
  );
  const totalCompletedPhases = updatedPhases.filter((p) => p.status === "Done").length;

  return { updatedPhases, overallPercentage, totalCompletedPhases };
}

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Page } from "@/components/app/Page";
import { initialPhases } from "../mockData";
import type { ResearchPhase } from "../types";
import {
  ResearchPhaseJourneyCard,
  ResearchPhaseRoadmapModal,
  usePhaseProgress,
} from "../ResearchPhaseComponents";
import { FadeIn, ProgressRing, SectionLabel } from "../shared";
import { PageHero } from "../premium";

export function ResearchRoadmapPage() {
  const [phases, setPhases] = useState<ResearchPhase[]>(initialPhases);
  const [selectedPhaseId, setSelectedPhaseId] = useState<number | null>(null);
  const { updatedPhases, overallPercentage, totalCompletedPhases } = usePhaseProgress(phases);

  const activeModalPhase = selectedPhaseId !== null ? updatedPhases.find((p) => p.phase === selectedPhaseId) : null;

  const handleToggleTask = (phaseNumber: number, taskId: string) => {
    setPhases((prev) =>
      prev.map((p) =>
        p.phase === phaseNumber
          ? { ...p, tasks: p.tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)) }
          : p,
      ),
    );
  };

  const handleAddTask = (phaseNumber: number, title: string) => {
    if (!title.trim()) return;
    setPhases((prev) =>
      prev.map((p) =>
        p.phase === phaseNumber
          ? {
              ...p,
              tasks: [...p.tasks, { id: `custom-${Date.now()}`, title: title.trim(), done: false }],
            }
          : p,
      ),
    );
  };

  const handleDeleteTask = (phaseNumber: number, taskId: string) => {
    setPhases((prev) =>
      prev.map((p) =>
        p.phase === phaseNumber ? { ...p, tasks: p.tasks.filter((t) => t.id !== taskId) } : p,
      ),
    );
  };

  return (
    <Page title="Research Roadmap" subtitle="Coordinate milestones from hypothesis review to peer camera-ready submissions.">
      <PageHero
        badge="NeurIPS 2026 Objective · 5 Phases"
        title="Research Blueprint Matrix"
        subtitle="Five-phase academic journey from SOTA review to camera-ready submission. Interactive task modals with advisor reports."
      />
      <FadeIn>
        <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-slate-900/40 p-5 mb-6 text-left">
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-violet-400 font-bold flex items-center gap-1">
                <Sparkles className="h-3 w-3 animate-pulse" /> Active Academic Objective
              </span>
              <h3 className="text-base font-black text-white mt-1 leading-snug font-display">
                Goal: Publish SOTA Sparse Graph Optimization paper at NeurIPS 2026
              </h3>
            </div>
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl">
              <ProgressRing value={overallPercentage} size={48} stroke="#a78bfa" />
              <div>
                <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">Blueprint Tracker</div>
                <div className="text-xs font-bold text-white mt-0.5">
                  {totalCompletedPhases} of 5 Districts Conquered
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      <SectionLabel>Phase Journey Matrix</SectionLabel>
      <div className="grid gap-6 sm:grid-cols-2 mt-4">
        {updatedPhases.map((phase, i) => (
          <ResearchPhaseJourneyCard
            key={phase.phase}
            phase={phase}
            status={phase.status}
            progress={phase.pct}
            index={i}
            onViewRoadmap={() => setSelectedPhaseId(phase.phase)}
          />
        ))}
      </div>

      <AnimatePresence>
        {activeModalPhase && (
          <ResearchPhaseRoadmapModal
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

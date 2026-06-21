import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Page, Card } from "@/components/app/Page";
import { initialKanbanTasks } from "../mockData";
import type { KanbanTask } from "../types";
import { FadeIn, SectionLabel } from "../shared";
import { PageHero } from "../premium";

const columns = [
  { id: "todo" as const, label: "To Do", color: "border-slate-500/30", accent: "bg-slate-500/10" },
  { id: "progress" as const, label: "In Progress", color: "border-violet-500/30", accent: "bg-violet-500/10" },
  { id: "done" as const, label: "Done", color: "border-emerald-500/30", accent: "bg-emerald-500/10" },
];

const priorityColors = {
  High: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  Medium: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  Low: "text-sky-400 bg-sky-500/10 border-sky-500/20",
};

export function ResearchTasksPage() {
  const [tasks, setTasks] = useState<KanbanTask[]>(initialKanbanTasks);
  const [newTask, setNewTask] = useState("");

  const moveTask = (id: number, nextCol: KanbanTask["column"]) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, column: nextCol } : t)));
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), title: newTask.trim(), column: "todo", priority: "Medium" },
    ]);
    setNewTask("");
  };

  return (
    <Page title="Research Tasks" subtitle="Agile Scrum Task Board for experiment iterations.">
      <PageHero
        badge="Sprint Board · Agile Research"
        title="Research Task Command"
        subtitle="Kanban-style experiment board. Move tasks across To Do, In Progress, and Done columns. Add custom research milestones live."
      />
      <FadeIn>
        <div className="flex flex-wrap gap-3 mb-6 items-center">
          <SectionLabel>Sprint Board</SectionLabel>
          <div className="flex-1 flex gap-2 max-w-md ml-auto">
            <input
              type="text"
              placeholder="Add new research task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-400"
            />
            <button
              type="button"
              onClick={addTask}
              className="px-3 py-2 rounded-xl bg-violet-500 text-slate-950 font-bold text-xs cursor-pointer border-none flex items-center gap-1"
            >
              <Plus size={14} /> Add
            </button>
          </div>
        </div>
      </FadeIn>

      <div className="grid gap-4 md:grid-cols-3 text-left">
        {columns.map((col, colIdx) => (
          <FadeIn key={col.id} delay={colIdx * 0.1}>
            <Card className={`p-4 min-h-[420px] border-t-2 ${col.color}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">{col.label}</h3>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${col.accent}`}>
                  {tasks.filter((t) => t.column === col.id).length}
                </span>
              </div>
              <div className="space-y-2">
                <AnimatePresence mode="popLayout">
                  {tasks
                    .filter((t) => t.column === col.id)
                    .map((t) => (
                      <motion.div
                        key={t.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="p-3 bg-slate-900/90 border border-white/5 rounded-xl text-xs hover:border-violet-500/20 transition"
                      >
                        <div className="text-white/90 font-medium leading-relaxed">{t.title}</div>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          <span
                            className={`text-[8px] font-mono px-1.5 py-0.5 rounded border ${priorityColors[t.priority]}`}
                          >
                            {t.priority}
                          </span>
                          {t.tags?.map((tag) => (
                            <span
                              key={tag}
                              className="text-[8px] font-mono px-1.5 py-0.5 rounded border border-white/5 text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="mt-2.5 flex gap-1.5 justify-end">
                          {col.id !== "todo" && (
                            <button
                              type="button"
                              onClick={() => moveTask(t.id, col.id === "progress" ? "todo" : "progress")}
                              className="text-[9px] text-muted-foreground hover:text-white border-none bg-transparent cursor-pointer"
                            >
                              ◀ Back
                            </button>
                          )}
                          {col.id !== "done" && (
                            <button
                              type="button"
                              onClick={() => moveTask(t.id, col.id === "todo" ? "progress" : "done")}
                              className="text-[9px] text-violet-400 hover:text-white font-semibold border-none bg-transparent cursor-pointer"
                            >
                              Move ▶
                            </button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>
            </Card>
          </FadeIn>
        ))}
      </div>
    </Page>
  );
}

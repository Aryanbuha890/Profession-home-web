import { createFileRoute } from "@tanstack/react-router";
import { Page, Card } from "@/components/app/Page";
import { AlertTriangle, CheckCircle2, Circle } from "lucide-react";

export const Route = createFileRoute("/app/tracker")({
  head: () => ({ meta: [{ title: "Execution Tracker — Professional Home" }] }),
  component: Tracker,
});

const tasks = [
  { t: "Submit project proposal draft", phase: "Project", due: "Thu, Jun 12", status: "in_progress" },
  { t: "Practice 2 system design problems", phase: "Skill", due: "Fri, Jun 13", status: "todo" },
  { t: "Send mentor follow-up", phase: "Meeting", due: "Sat, Jun 14", status: "todo" },
  { t: "Polish resume v2", phase: "Career", due: "Mon, Jun 9", status: "overdue" },
  { t: "Deploy MVP v1", phase: "Project", due: "Sun, Jun 15", status: "in_progress" },
  { t: "Read 1 research paper", phase: "Research", due: "Tue, Jun 4", status: "done" },
];

const weeks = [40, 55, 62, 70, 78, 82];

function Tracker() {
  return (
    <Page title="Execution Tracker" subtitle="62% on plan · 14 tasks this week">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Stat label="Tasks Complete" v="38/61" tone="primary" />
        <Stat label="On-Time Rate" v="92%" tone="success" />
        <Stat label="Overdue Tasks" v="2" tone="destructive" />
        <Stat label="Milestones Hit" v="4/7" tone="warning" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Card>
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <p className="text-sm font-semibold text-white">Tasks List</p>
            <div className="flex gap-1.5 text-[11px] text-muted-foreground font-mono">
              {["All", "Today", "Week", "Overdue"].map((f, i) => (
                <button 
                  key={f} 
                  className={`rounded-full px-3 py-1 cursor-pointer transition ${i === 0 ? "bg-sky-400/10 text-sky-400 font-semibold" : "hover:bg-white/5"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="divide-y divide-white/5">
            {tasks.map((row) => (
              <div key={row.t} className="flex items-center justify-between gap-3 py-3 group cursor-pointer">
                <div className="flex items-center gap-3 min-w-0">
                  {row.status === "done" ? (
                    <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
                  ) : (
                    <Circle className="h-4.5 w-4.5 text-muted-foreground hover:text-white shrink-0 transition" />
                  )}
                  <div className="min-w-0">
                    <p className={`text-xs truncate transition ${row.status === "done" ? "text-muted-foreground line-through" : "text-white/90 group-hover:text-white"}`}>
                      {row.t}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 font-mono">{row.phase} · Due {row.due}</p>
                  </div>
                </div>
                <div className="shrink-0">
                  {row.status === "overdue" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-500/15 border border-red-500/25 px-2 py-0.5 text-[10px] font-medium text-red-400 font-mono">
                      <AlertTriangle className="h-3 w-3" /> Overdue
                    </span>
                  )}
                  {row.status === "in_progress" && (
                    <span className="rounded-full bg-sky-500/15 border border-sky-500/25 px-2 py-0.5 text-[10px] font-medium text-sky-400 font-mono">
                      In Progress
                    </span>
                  )}
                  {row.status === "todo" && (
                    <span className="rounded-full bg-white/5 border border-white/5 px-2 py-0.5 text-[10px] font-medium text-muted-foreground font-mono">
                      To Do
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          <Card>
            <p className="text-sm font-semibold text-white">Weekly Progress</p>
            <div className="mt-4 flex h-32 items-end gap-2.5">
              {weeks.map((v, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1.5 h-full justify-end">
                  <div className="w-full rounded-t bg-gradient-to-t from-sky-500 to-indigo-500 transition-all hover:brightness-110" style={{ height: `${v}%` }} />
                  <span className="text-[9px] text-muted-foreground font-mono">W{i + 1}</span>
                </div>
              ))}
            </div>
          </Card>
          
          <Card>
            <p className="text-sm font-semibold text-white mb-3">Achievement Timeline</p>
            <ul className="space-y-3">
              {["Completed assessment", "Matched with Priya", "Phase 1 done", "MVP scope locked"].map((s, i) => (
                <li key={s} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-400 shrink-0" />
                  <div>
                    <p className="text-xs text-white/90 font-medium">{s}</p>
                    <p className="text-[10px] text-muted-foreground font-mono mt-0.5">Week {i + 1}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </Page>
  );
}

function Stat({ label, v, tone }: { label: string; v: string; tone: "primary" | "success" | "warning" | "destructive" }) {
  const map = {
    primary: "text-sky-400",
    success: "text-emerald-400",
    warning: "text-amber-400",
    destructive: "text-red-400",
  };
  return (
    <Card>
      <p className="text-xs font-semibold text-muted-foreground font-mono uppercase tracking-wider">{label}</p>
      <p className={`mt-2 text-2xl font-bold tracking-tight font-display ${map[tone]}`}>{v}</p>
    </Card>
  );
}

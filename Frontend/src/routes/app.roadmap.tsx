import { createFileRoute } from "@tanstack/react-router";
import { Page, Card } from "@/components/app/Page";
import { CheckCircle2, Circle, Clock } from "lucide-react";

export const Route = createFileRoute("/app/roadmap")({
  head: () => ({ meta: [{ title: "Roadmap — Professional Home" }] }),
  component: Roadmap,
});

const phases = [
  { name: "Research", pct: 100, status: "Done", tasks: ["Study target roles", "Map skill gaps", "Pick 3 case companies"] },
  { name: "Skill Development", pct: 72, status: "In progress", tasks: ["DSA: 30 problems", "System design 101", "Product teardown × 2"] },
  { name: "Project Execution", pct: 30, status: "In progress", tasks: ["Define MVP scope", "Build core feature", "Deploy v1"] },
  { name: "Review", pct: 0, status: "Upcoming", tasks: ["Mentor code review", "Mock interview × 3", "Portfolio polish"] },
  { name: "Achievement", pct: 0, status: "Upcoming", tasks: ["Apply to 15 roles", "Track responses", "Convert interview"] },
];

function Roadmap() {
  return (
    <Page title="Your 5-Phase Roadmap" subtitle="Goal · Land summer internship at a top product company">
      <div className="space-y-4">
        {phases.map((p, i) => (
          <Card key={p.name} className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                  p.pct === 100 ? "bg-emerald-500/20 text-emerald-400" : p.pct > 0 ? "bg-sky-400/20 text-sky-400" : "bg-white/5 text-muted-foreground"
                }`}>
                  {p.pct === 100 ? <CheckCircle2 className="h-4.5 w-4.5" /> : i + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Phase {i + 1} · {p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.status}</p>
                </div>
              </div>
              <span className="text-xs font-mono text-muted-foreground">{p.pct}%</span>
            </div>
            
            {/* Progress bar */}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-sky-400 to-indigo-500" 
                style={{ width: `${p.pct}%` }} 
              />
            </div>
            
            {/* Phase tasks */}
            <div className="grid gap-3 sm:grid-cols-3">
              {p.tasks.map((t) => (
                <div key={t} className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] px-3.5 py-2 text-xs transition">
                  {p.pct === 100 ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                  <span className={`truncate ${p.pct === 100 ? "text-muted-foreground line-through" : "text-white/80"}`}>{t}</span>
                  <Clock className="ml-auto h-3 w-3 text-muted-foreground shrink-0" />
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Page>
  );
}

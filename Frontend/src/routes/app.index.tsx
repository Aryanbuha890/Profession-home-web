import { createFileRoute } from "@tanstack/react-router";
import { Page, Card, Stat, Pill, Bar } from "@/components/app/Page";
import { ArrowUpRight, CheckCircle2, Circle, Sparkles, Target, Users } from "lucide-react";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Command Center — Professional Home" }] }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <Page title="Command Center" subtitle="Your professional operating system at a glance">
      <div className="grid gap-4 lg:grid-cols-4">
        <Stat label="Success Score" value="86" delta="+12 this quarter" />
        <Stat label="Active Goals" value="7" delta="3 ahead of schedule" tone="violet" />
        <Stat label="Outcomes YTD" value="14" delta="2 papers · 1 grant" />
        <Stat label="Mentor Sessions" value="9" delta="next on Thu 4pm" tone="violet" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Current Goal
              </div>
              <div className="mt-1 font-display text-lg font-semibold">
                Submit Marie Curie Fellowship application
              </div>
            </div>
            <Pill tone="success">on track</Pill>
          </div>
          <div className="mt-5 space-y-3">
            <Bar value={78} label="Proposal draft" />
            <Bar value={64} label="Letters of support" />
            <Bar value={42} label="Budget & timeline" />
            <Bar value={22} label="Internal review" />
          </div>
        </Card>

        <Card>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">AI Insights</div>
          <ul className="mt-3 space-y-3 text-sm">
            {[
              "Your proposal aim 2 is 38% denser than aim 1 — consider rebalancing.",
              "Mentor Dr. Chen has open hours Thu — book before Tue.",
              "3 new grants match your profile (deadline > 30d).",
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 text-[var(--electric)]" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card>
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Upcoming Tasks
            </div>
            <button className="text-xs text-muted-foreground hover:text-foreground">
              View all
            </button>
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              { d: "Today", t: "Draft methods section", done: false },
              { d: "Tomorrow", t: "1:1 with Dr. Chen", done: false },
              { d: "Fri", t: "Pitch deck rehearsal", done: false },
              { d: "Mon", t: "Submit conference abstract", done: true },
            ].map((x, i) => (
              <li
                key={i}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-foreground/5"
              >
                {x.done ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground" />
                )}
                <span className={x.done ? "text-muted-foreground line-through" : ""}>{x.t}</span>
                <span className="ml-auto text-xs text-muted-foreground">{x.d}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Mentor Messages
            </div>
            <Pill>3 new</Pill>
          </div>
          <ul className="mt-3 space-y-3 text-sm">
            {[
              { n: "Dr. Helena Chen", m: "Loved your aim 2 revision — let's discuss budget." },
              { n: "Marco Rossi", m: "Sending intros to two seed investors today." },
              { n: "Prof. Adeyemi", m: "Reviewed your methods — comments inline." },
            ].map((m, i) => (
              <li key={i} className="rounded-lg border border-border bg-surface/40 p-3">
                <div className="flex items-center gap-2">
                  <div
                    className="h-6 w-6 rounded-full"
                    style={{ background: "var(--gradient-primary)" }}
                  />
                  <span className="text-sm font-medium">{m.n}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{m.m}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            Recent Activities
          </div>
          <ul className="mt-3 space-y-3 text-sm">
            {[
              { i: Target, t: "New milestone reached: design partner #4", d: "2h ago" },
              { i: Users, t: "Matched with 2 new collaborators", d: "yesterday" },
              { i: ArrowUpRight, t: "Roadmap updated by AI Copilot", d: "2d ago" },
            ].map(({ i: Icon, t, d }, k) => (
              <li key={k} className="flex items-start gap-2">
                <Icon className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <span>{t}</span>
                <span className="ml-auto text-xs text-muted-foreground">{d}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-4">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">
          Achievement Timeline
        </div>
        <div className="mt-4 relative">
          <div className="absolute left-0 right-0 top-3 h-px bg-border" />
          <div className="relative grid grid-cols-6 gap-2">
            {[
              { m: "Jan", t: "Skill: PyTorch" },
              { m: "Feb", t: "Talk · NeurIPS" },
              { m: "Mar", t: "Paper #1" },
              { m: "May", t: "Internship" },
              { m: "Jul", t: "Grant" },
              { m: "Sep", t: "Paper #2" },
            ].map((p, i) => (
              <div key={i} className="text-center">
                <div
                  className="mx-auto h-2.5 w-2.5 rounded-full"
                  style={{ background: "var(--gradient-primary)" }}
                />
                <div className="mt-2 text-xs text-muted-foreground">{p.m}</div>
                <div className="text-xs">{p.t}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </Page>
  );
}

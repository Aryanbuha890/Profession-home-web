import { createFileRoute } from "@tanstack/react-router";
import { Page, Card, Bar } from "@/components/app/Page";
import {
  ArrowUpRight,
  CheckCircle2,
  Circle,
  Sparkles,
  Target,
  Users,
  Brain,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Command Center — Professional Home" }] }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <Page title="Command Center" subtitle="Your professional operating system at a glance">
      {/* Welcome & Quick Assessment Info */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-white/[0.03] to-transparent p-5 rounded-2xl border border-white/5">
        <div>
          <span className="text-[10px] font-semibold font-mono uppercase tracking-widest text-sky-400 bg-sky-400/10 px-2.5 py-0.5 rounded-full">
            Overview Dashboard
          </span>
          <h2 className="text-xl font-bold text-white mt-1.5">Welcome back, Aarav</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Your student success copilot is active. 2 of 7 assessment steps are complete.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex h-9 items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-xs font-semibold text-white/90 hover:bg-white/[0.08] transition cursor-pointer">
            <Brain className="h-3.5 w-3.5 text-sky-400" /> Resume Assessment
          </button>
          <button className="flex h-9 items-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 px-4 text-xs font-bold text-slate-950 shadow-sm hover:opacity-90 transition cursor-pointer">
            Upgrade to Pro
          </button>
        </div>
      </div>

      {/* Premium Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Success Score Ring */}
        <Card className="flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            <span>Success Score</span>
            <span className="text-emerald-400 font-semibold">Healthy</span>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="relative h-14 w-14 shrink-0">
              <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                <defs>
                  <linearGradient id="score-grad" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
                <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2.5" />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="url(#score-grad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="100"
                  strokeDashoffset="14"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-sm font-bold text-white">86</span>
                <span className="text-[7px] text-muted-foreground uppercase leading-none">/100</span>
              </div>
            </div>
            <div className="flex-1 space-y-1">
              {[
                { label: "Skills", pct: 92, color: "from-emerald-400 to-cyan-400" },
                { label: "Research", pct: 74, color: "from-cyan-400 to-violet-400" },
                { label: "Outcomes", pct: 88, color: "from-blue-400 to-violet-400" },
              ].map((sub) => (
                <div key={sub.label} className="flex flex-col gap-0.5">
                  <div className="flex items-center justify-between text-[9px] text-muted-foreground leading-none">
                    <span>{sub.label}</span>
                    <span className="font-mono text-white/80">{sub.pct}%</span>
                  </div>
                  <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${sub.color} rounded-full`}
                      style={{ width: `${sub.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Active Goals Tracker */}
        <Card className="flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Active Goals</span>
            <span className="rounded bg-sky-500/10 border border-sky-500/20 text-sky-300 text-[9px] px-1.5 py-0.5 font-medium">
              3 Ahead
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-bold text-white font-display">7</span>
            <span className="text-[10px] text-emerald-400 font-medium">+2 this month</span>
          </div>
          <div className="mt-2 h-8 w-full">
            <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-full w-full">
              <defs>
                <linearGradient id="goals-grad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polyline
                points="0,25 15,18 30,22 45,12 60,15 75,8 90,10 100,3"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="0,25 15,18 30,22 45,12 60,15 75,8 90,10 100,3 100,30 0,30"
                fill="url(#goals-grad)"
              />
            </svg>
          </div>
        </Card>

        {/* Outcomes YTD */}
        <Card className="flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Outcomes YTD</span>
            <span className="rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[9px] px-1.5 py-0.5 font-medium">
              92% target
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-bold text-white font-display">14</span>
            <span className="text-[10px] text-muted-foreground font-mono">verified wins</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            <span className="text-[9px] bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-white/80">
              3 Papers
            </span>
            <span className="text-[9px] bg-sky-500/10 border border-sky-500/20 rounded px-1.5 py-0.5 text-sky-400 font-medium">
              2 Internships
            </span>
            <span className="text-[9px] bg-purple-500/10 border border-purple-500/20 rounded px-1.5 py-0.5 text-purple-400 font-medium">
              1 Patent
            </span>
          </div>
        </Card>

        {/* Mentor Sessions */}
        <Card className="flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Mentor Sessions</span>
            <span className="rounded bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[9px] px-1.5 py-0.5 font-medium">
              3 Scheduled
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-bold text-white font-display">9</span>
            <span className="text-[10px] text-muted-foreground font-mono">sessions completed</span>
          </div>
          <div className="mt-2 text-[9px] text-sky-300 flex items-center gap-1 font-medium bg-sky-500/10 border border-sky-500/20 rounded px-2 py-1 w-full justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="truncate">Next: Thu 4:00 PM w/ Dr. Chen</span>
          </div>
        </Card>
      </div>

      {/* Goal & Copilot Section */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {/* Current Goal & Roadmap progress */}
        <Card className="lg:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Current Goal</div>
              <h3 className="mt-1 font-display text-lg font-bold text-white">Submit Marie Curie Fellowship application</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Focusing on Phase 2 of 5 · 48 days remaining</p>
            </div>
            <span className="rounded-full bg-emerald-500/15 text-emerald-300 text-[10px] px-2.5 py-0.5 border border-emerald-500/20 font-medium">
              on track
            </span>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {/* Goal Deliverables Progress */}
            <div className="space-y-3.5">
              <div className="text-xs font-semibold text-white/90">Deliverables Status</div>
              <Bar value={78} label="Proposal draft" />
              <Bar value={64} label="Letters of support" />
              <Bar value={42} label="Budget & timeline" />
              <Bar value={22} label="Internal review" />
            </div>

            {/* Roadmap Progress Steps */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-white/90 flex justify-between">
                <span>Roadmap Progress</span>
                <span className="text-[10px] text-muted-foreground">5 Phases</span>
              </div>
              <div className="space-y-2.5 mt-2">
                {[
                  { name: "Research & Literature", pct: 100, done: true },
                  { name: "Skill & Method Prep", pct: 72, done: false, active: true },
                  { name: "Project Execution", pct: 30, done: false },
                  { name: "Peer Review & Refinement", pct: 0, done: false },
                  { name: "Outcome & Submission", pct: 0, done: false },
                ].map((p, index) => (
                  <div key={p.name} className="flex items-center gap-2">
                    <div
                      className={`flex h-4.5 w-4.5 items-center justify-center rounded-full text-[9px] ${p.done ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : p.active ? "bg-sky-500/20 text-sky-400 border border-sky-500/30 animate-pulse font-bold" : "bg-white/5 text-muted-foreground border border-white/5"}`}
                    >
                      {p.done ? "✓" : index + 1}
                    </div>
                    <span
                      className={`text-xs flex-1 truncate ${p.done ? "text-muted-foreground line-through" : p.active ? "text-white font-medium" : "text-white/70"}`}
                    >
                      {p.name}
                    </span>
                    <div className="h-1 w-16 bg-white/5 rounded-full overflow-hidden hidden sm:block">
                      <div
                        className={`h-full rounded-full ${p.done ? "bg-emerald-500" : "bg-sky-400"}`}
                        style={{ width: `${p.pct}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground w-6 text-right">{p.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* AI Copilot Panel */}
        <Card className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-sky-400">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" /> AI Copilot
            </div>
            <p className="mt-3 text-xs text-white/80 leading-relaxed italic bg-white/[0.02] border border-white/5 p-3 rounded-xl">
              "I've analyzed your fellowship timeline. You should focus on finalizing the budget layout before
              Thursday's meeting with Dr. Chen."
            </p>
            <div className="mt-4 space-y-2">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Quick Commands
              </div>
              {[
                "Draft fellowship outreach email",
                "Analyze budget layout PDF",
                "Generate interview prep questions",
              ].map((cmd) => (
                <button
                  key={cmd}
                  className="flex w-full items-center justify-between rounded-lg border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] px-2.5 py-1.5 text-left text-xs text-muted-foreground hover:text-white transition cursor-pointer"
                >
                  <span className="truncate">{cmd}</span>
                  <ChevronRight className="h-3 w-3 shrink-0 opacity-60" />
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 border-t border-white/5 pt-3">
            <div className="text-[10px] text-muted-foreground flex items-center gap-1 font-mono">
              <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Copilot active and ready
            </div>
          </div>
        </Card>
      </div>

      {/* Tasks, Messages, & Activity Feed */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {/* Upcoming Tasks */}
        <Card>
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Upcoming Tasks</div>
            <button className="text-[11px] text-sky-400 hover:text-sky-300 font-medium cursor-pointer">View all</button>
          </div>
          <ul className="mt-3 divide-y divide-white/5">
            {[
              { t: "Draft fellowship methods section", tag: "Project", due: "Today", done: false },
              { t: "1:1 status sync with Dr. Chen", tag: "Meeting", due: "Tomorrow", done: false },
              { t: "Pitch deck presentation rehearsal", tag: "Skill", due: "Fri", done: false },
              { t: "Submit conference abstract draft", tag: "Deliverable", due: "Mon", done: true },
            ].map((task, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2.5 first:pt-1 last:pb-1 group cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {task.done ? (
                    <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
                  ) : (
                    <Circle className="h-4.5 w-4.5 text-muted-foreground hover:text-white shrink-0 transition" />
                  )}
                  <span
                    className={`text-xs truncate transition ${task.done ? "text-muted-foreground line-through" : "text-white/90 group-hover:text-white"}`}
                  >
                    {task.t}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-3">
                  <span className="rounded-full bg-white/5 px-1.5 py-0.5 text-[9px] text-muted-foreground font-mono">
                    {task.tag}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-mono w-14 text-right">{task.due}</span>
                </div>
              </div>
            ))}
          </ul>
        </Card>

        {/* Mentor Messages */}
        <Card>
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Mentor Messages
            </div>
            <span className="rounded bg-sky-500/10 border border-sky-500/20 text-sky-300 text-[9px] px-1.5 py-0.5 font-medium">
              3 New
            </span>
          </div>
          <ul className="mt-3 space-y-3">
            {[
              {
                n: "Dr. Helena Chen",
                m: "Loved your aim 2 revision — let's discuss budget.",
                color: "from-sky-400 to-blue-500",
              },
              { n: "Marco Rossi", m: "Sending intros to two seed investors today.", color: "from-purple-500 to-indigo-500" },
              {
                n: "Prof. Adeyemi",
                m: "Reviewed your methods — comments inline.",
                color: "from-emerald-400 to-teal-500",
              },
            ].map((msg, i) => (
              <li
                key={i}
                className="rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] p-2.5 transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`h-5 w-5 rounded-full bg-gradient-to-br ${msg.color} flex items-center justify-center text-[9px] font-bold text-slate-950`}
                  >
                    {msg.n[0]}
                  </div>
                  <span className="text-xs font-semibold text-white/90">{msg.n}</span>
                  <span className="ml-auto text-[9px] text-muted-foreground font-mono">2h ago</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground pl-7 line-clamp-1">{msg.m}</p>
              </li>
            ))}
          </ul>
        </Card>

        {/* Recent Activities */}
        <Card>
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Recent Activities
            </div>
            <span className="inline-flex items-center gap-1 text-[9px] text-emerald-400 bg-emerald-500/5 px-2 py-0.5 rounded-full font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
            </span>
          </div>
          <ul className="mt-3 space-y-3">
            {[
              { i: Target, t: "New milestone reached: design partner #4", d: "2h ago", color: "text-emerald-400" },
              { i: Users, t: "Matched with 2 new collaborators", d: "Yesterday", color: "text-sky-400" },
              { i: ArrowUpRight, t: "Roadmap updated by AI Copilot", d: "2d ago", color: "text-purple-400" },
            ].map(({ i: Icon, t, d, color }, k) => (
              <li key={k} className="flex items-start gap-2.5">
                <div className="mt-0.5 p-1 rounded-md bg-white/5 shrink-0">
                  <Icon className={`h-3.5 w-3.5 ${color}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-white/90 leading-tight">{t}</p>
                  <p className="text-[9px] text-muted-foreground mt-0.5 font-mono">{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Achievement Timeline */}
      <Card className="mt-4">
        <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4">
          Achievement Timeline
        </div>
        <div className="relative pt-2 pb-2">
          <div className="absolute left-4 right-4 top-[17px] h-0.5 bg-white/5" />
          <div className="relative grid grid-cols-6 gap-2">
            {[
              { m: "Jan", t: "Skill: PyTorch", done: true },
              { m: "Feb", t: "NeurIPS Talk", done: true },
              { m: "Mar", t: "Paper #1 Sub", done: true },
              { m: "May", t: "Internship Start", done: false, active: true },
              { m: "Jul", t: "Grant Pitch", done: false },
              { m: "Sep", t: "Paper #2 Sub", done: false },
            ].map((p, i) => (
              <div key={i} className="text-center group cursor-pointer">
                <div
                  className={`mx-auto h-3 w-3 rounded-full border-2 transition ${p.done ? "bg-emerald-400 border-emerald-500/50 shadow-[0_0_8px_rgba(16,185,129,0.3)]" : p.active ? "bg-sky-400 border-sky-500/50 animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.5)]" : "bg-zinc-800 border-zinc-700"}`}
                />
                <div
                  className={`mt-2.5 text-[10px] font-medium transition ${p.active ? "text-sky-400 font-bold" : "text-muted-foreground"}`}
                >
                  {p.m}
                </div>
                <div
                  className={`text-xs truncate transition ${p.active ? "text-white font-semibold" : "text-white/70 group-hover:text-white"}`}
                >
                  {p.t}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </Page>
  );
}

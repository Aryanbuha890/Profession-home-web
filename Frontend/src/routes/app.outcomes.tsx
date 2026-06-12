import { createFileRoute } from "@tanstack/react-router";
import { Page, Card } from "@/components/app/Page";
import { Briefcase, Building2, BookOpen, Rocket, Banknote, Award, CheckCircle2, FileText } from "lucide-react";

export const Route = createFileRoute("/app/outcomes")({
  head: () => ({ meta: [{ title: "Outcome Tracker — Professional Home" }] }),
  component: Outcomes,
});

const outcomes = [
  { icon: Briefcase, t: "Internship Secured", status: "In progress", progress: 62 },
  { icon: Building2, t: "Job Obtained", status: "Upcoming", progress: 0 },
  { icon: BookOpen, t: "Research Published", status: "Upcoming", progress: 12 },
  { icon: Rocket, t: "Startup Launched", status: "Upcoming", progress: 0 },
  { icon: Banknote, t: "Funding Raised", status: "Upcoming", progress: 0 },
  { icon: Award, t: "Patent Filed", status: "Upcoming", progress: 0 },
];

function Outcomes() {
  return (
    <Page title="Outcome Tracker" subtitle="We measure success by achievements, not meetings">
      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        {/* Primary goal details */}
        <Card className="bg-gradient-to-br from-sky-400/5 to-transparent border border-sky-400/10 flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold text-sky-400 font-mono uppercase tracking-wider">Primary Goal</p>
            <h2 className="mt-1.5 text-xl font-bold text-white">Land summer internship at a top product company</h2>
            <div className="mt-4 grid gap-3 grid-cols-3">
              <Mini label="Success Probability" v="78%" />
              <Mini label="Milestones Met" v="4 / 7" />
              <Mini label="Evidence Uploads" v="6 Files" />
            </div>
          </div>
          <div className="mt-6">
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
              <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-indigo-500" style={{ width: "62%" }} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground font-mono">62% complete · Est. 48 days to outcome</p>
          </div>
        </Card>

        {/* Evidence Locker */}
        <Card>
          <p className="text-sm font-semibold text-white border-b border-white/5 pb-2">Evidence Locker</p>
          <ul className="mt-3 space-y-2.5 text-xs text-muted-foreground">
            {["Offer letter (pending)", "MVP deployed link", "Mentor recommendation", "Mock interview scorecard"].map((s) => (
              <li key={s} className="flex items-center gap-2 hover:text-white transition">
                <FileText className="h-4 w-4 text-sky-400 shrink-0" /> {s}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {outcomes.map((o) => {
          const OutIcon = o.icon;
          return (
            <Card key={o.t} className="flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-400/10 text-sky-400">
                  <OutIcon className="h-5 w-5" />
                </div>
                {o.progress === 100 && <CheckCircle2 className="h-5 w-5 text-emerald-400" />}
              </div>
              <div className="mt-4">
                <p className="text-sm font-semibold text-white leading-tight">{o.t}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{o.status}</p>
              </div>
              <div className="mt-3.5 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-indigo-500" style={{ width: `${o.progress}%` }} />
              </div>
            </Card>
          );
        })}
      </div>
    </Page>
  );
}

function Mini({ label, v }: { label: string; v: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.01] p-3">
      <p className="text-[10px] font-semibold text-muted-foreground font-mono uppercase tracking-wider">{label}</p>
      <p className="mt-1 text-base font-bold text-white font-display">{v}</p>
    </div>
  );
}


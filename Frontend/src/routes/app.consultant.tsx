import { createFileRoute } from "@tanstack/react-router";
import { Page, Card } from "@/components/app/Page";
import { TrendingUp, Users, Calendar, ListChecks, ScrollText, BarChart3, Star } from "lucide-react";

export const Route = createFileRoute("/app/consultant")({
  head: () => ({ meta: [{ title: "Consultant Portal — Professional Home" }] }),
  component: Consultant,
});

const clients = [
  { n: "Aarav S.", goal: "Internship", stage: "Phase 2", score: 82 },
  { n: "Meera K.", goal: "Research paper", stage: "Phase 1", score: 71 },
  { n: "Ishaan G.", goal: "Startup MVP", stage: "Phase 3", score: 88 },
  { n: "Diya P.", goal: "Placement prep", stage: "Phase 2", score: 75 },
];

function Consultant() {
  return (
    <Page title="Consultant Portal" subtitle="Mentor command center">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Kpi icon={TrendingUp} label="Revenue (MTD)" v="₹2,14,000" tone="primary" />
        <Kpi icon={Users} label="Active Clients" v="18" tone="success" />
        <Kpi icon={Calendar} label="Meetings This Week" v="11" tone="warning" />
        <Kpi icon={Star} label="Performance Score" v="94" tone="primary" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Card>
          <p className="text-sm font-semibold text-white mb-3">Client CRM</p>
          <div className="overflow-x-auto rounded-xl border border-white/5 bg-white/[0.01]">
            <table className="w-full text-xs text-left">
              <thead className="bg-white/5 text-[10px] font-semibold font-mono uppercase tracking-wider text-muted-foreground border-b border-white/5">
                <tr>
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">Goal</th>
                  <th className="px-4 py-3">Stage</th>
                  <th className="px-4 py-3 text-right">Success</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                {clients.map((c) => (
                  <tr key={c.n} className="hover:bg-white/[0.02] transition">
                    <td className="px-4 py-3 font-semibold text-white">{c.n}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.goal}</td>
                    <td className="px-4 py-3 font-mono">{c.stage}</td>
                    <td className="px-4 py-3 text-right font-semibold text-sky-400 font-mono">{c.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-4">
          <Block icon={ListChecks} title="Task Management" body="6 reviews pending · 3 reports to draft" />
          <Block icon={ScrollText} title="Report Builder" body="Use templates to publish diagnosis reports in minutes" />
          <Block icon={BarChart3} title="Ecosystem Analytics" body="Client success up 12% this quarter" />
        </div>
      </div>
    </Page>
  );
}

function Kpi({ icon: Icon, label, v, tone }: { icon: any; label: string; v: string; tone: "primary" | "success" | "warning" }) {
  const map: Record<string, string> = { 
    primary: "text-sky-400", 
    success: "text-emerald-400", 
    warning: "text-amber-400" 
  };
  return (
    <Card className="flex flex-col justify-between">
      <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground font-mono uppercase tracking-wider">
        <span>{label}</span>
        <Icon className={`h-4 w-4 ${map[tone]}`} />
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight text-white font-display">{v}</p>
    </Card>
  );
}

function Block({ icon: Icon, title, body }: { icon: any; title: string; body: string }) {
  return (
    <Card className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-xs font-semibold text-white/90">
        <Icon className="h-4.5 w-4.5 text-sky-400 shrink-0" />
        <span>{title}</span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
    </Card>
  );
}


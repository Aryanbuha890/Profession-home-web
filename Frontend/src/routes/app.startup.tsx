import { createFileRoute } from "@tanstack/react-router";
import { Page, Card, Bar, Stat, Pill } from "@/components/app/Page";

export const Route = createFileRoute("/app/startup")({
  head: () => ({ meta: [{ title: "Startup Hub — Professional Home" }] }),
  component: Startup,
});

function Startup() {
  return (
    <Page title="Startup Hub" subtitle="From idea to fundraising, with verified design partners">
      <div className="grid gap-4 lg:grid-cols-4">
        <Stat label="Runway" value="14 mo" delta="burn $42K/mo" />
        <Stat label="Pipeline" value="$2.1M" delta="5 LOIs" tone="violet" />
        <Stat label="Investors" value="38" delta="12 in conversation" />
        <Stat label="Hires" value="6" delta="2 open roles" tone="violet" />
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            Fundraising tracker
          </div>
          <div className="mt-3 space-y-3">
            <Bar value={62} label="Seed round — $1.5M target" />
            <Bar value={88} label="Lead investor signed" />
            <Bar value={44} label="Due diligence (3 firms)" />
          </div>
        </Card>
        <Card>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Milestones</div>
          <ul className="mt-3 space-y-2.5">
            {[
              "MVP launched",
              "10 paying customers",
              "Hire founding engineer",
              "Close seed round",
            ].map((m, i) => (
              <li
                key={m}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] px-3.5 py-2.5 text-xs transition cursor-pointer"
              >
                <span className="font-semibold text-white/90">{m}</span>
                <Pill tone={i < 2 ? "success" : "warn"}>{i < 2 ? "done" : "active"}</Pill>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <Card className="mt-4">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Mentor network</div>
        <div className="mt-3.5 flex flex-wrap gap-3">
          {["Marco Rossi", "Sarah Levin", "Yuki Tanaka", "Karim Haddad", "Prof. Adeyemi"].map(
            (n, idx) => (
              <div
                key={n}
                className="flex items-center gap-2.5 rounded-full border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] pl-2 pr-4 py-1.5 text-xs text-white/90 transition cursor-pointer"
              >
                <div
                  className={`h-5 w-5 rounded-full bg-gradient-to-br ${["from-sky-400 to-indigo-500", "from-purple-500 to-indigo-500", "from-emerald-400 to-teal-500", "from-amber-400 to-red-500", "from-pink-500 to-rose-500"][idx % 5]} flex items-center justify-center text-[9px] font-bold text-slate-950`}
                >
                  {n[0]}
                </div>
                <span>{n}</span>
              </div>
            ),
          )}
        </div>
      </Card>
    </Page>
  );
}

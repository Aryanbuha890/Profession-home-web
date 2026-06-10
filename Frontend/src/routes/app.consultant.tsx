import { createFileRoute } from "@tanstack/react-router";
import { Page, Card, Stat, Bar, Pill } from "@/components/app/Page";

export const Route = createFileRoute("/app/consultant")({
  head: () => ({ meta: [{ title: "Consultant Portal — Professional Home" }] }),
  component: Consultant,
});

function Consultant() {
  return (
    <Page title="Consultant Portal" subtitle="Client management, revenue, and reporting">
      <div className="grid gap-4 lg:grid-cols-4">
        <Stat label="MRR" value="$48,200" delta="+12%" />
        <Stat label="Clients" value="22" delta="3 onboarding" tone="violet" />
        <Stat label="Meetings (wk)" value="14" />
        <Stat label="NPS" value="68" tone="violet" />
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            Active clients
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              { n: "Acme Biotech", p: 72 },
              { n: "Northwind Labs", p: 48 },
              { n: "Globex University", p: 30 },
              { n: "Initech Ventures", p: 84 },
            ].map((c) => (
              <li key={c.n} className="rounded-xl border border-border bg-surface/40 p-3">
                <div className="flex items-center justify-between">
                  <span>{c.n}</span>
                  <Pill>active</Pill>
                </div>
                <div className="mt-2">
                  <Bar value={c.p} />
                </div>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            Report builder
          </div>
          <div className="mt-3 space-y-2 text-sm">
            {[
              "Q3 client outcomes",
              "Roadmap delta — Acme",
              "Mentor utilization",
              "Revenue forecast",
            ].map((r) => (
              <div key={r} className="rounded-lg border border-border bg-surface/40 px-3 py-2">
                {r}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Page>
  );
}

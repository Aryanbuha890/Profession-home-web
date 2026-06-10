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
          <ul className="mt-3 space-y-2 text-sm">
            {[
              "MVP launched",
              "10 paying customers",
              "Hire founding engineer",
              "Close seed round",
            ].map((m, i) => (
              <li
                key={m}
                className="flex items-center justify-between rounded-lg border border-border px-3 py-2"
              >
                <span>{m}</span>
                <Pill tone={i < 2 ? "success" : "warn"}>{i < 2 ? "done" : "active"}</Pill>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <Card className="mt-4">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Mentor network</div>
        <div className="mt-3 flex flex-wrap gap-3">
          {["Marco Rossi", "Sarah Levin", "Yuki Tanaka", "Karim Haddad", "Prof. Adeyemi"].map(
            (n) => (
              <div
                key={n}
                className="flex items-center gap-2 rounded-full glass px-3 py-1.5 text-sm"
              >
                <div
                  className="h-6 w-6 rounded-full"
                  style={{ background: "var(--gradient-primary)" }}
                />{" "}
                {n}
              </div>
            ),
          )}
        </div>
      </Card>
    </Page>
  );
}

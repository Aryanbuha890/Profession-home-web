import { createFileRoute } from "@tanstack/react-router";
import { Page, Card, Bar, Pill, Stat } from "@/components/app/Page";

export const Route = createFileRoute("/app/research")({
  head: () => ({ meta: [{ title: "Research Hub — Professional Home" }] }),
  component: Research,
});

function Research() {
  return (
    <Page title="Research Hub" subtitle="Projects, grants, teams, publications, and patents">
      <div className="grid gap-4 lg:grid-cols-4">
        <Stat label="Active Projects" value="6" delta="2 with co-PIs" />
        <Stat label="Publications" value="11" delta="3 in review" tone="violet" />
        <Stat label="Grants" value="€420K" delta="2 awarded" />
        <Stat label="Patents" value="2" delta="1 filed" tone="violet" />
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Active Projects
            </div>
            <button className="text-xs text-muted-foreground hover:text-foreground">
              New project
            </button>
          </div>
          <div className="mt-3 space-y-3">
            {[
              { n: "RNA-seq atlas of pancreatic islets", p: 72, t: "3 collaborators" },
              { n: "Federated learning for genomics", p: 48, t: "5 collaborators" },
              { n: "Diffusion models for protein design", p: 31, t: "2 collaborators" },
            ].map((p) => (
              <div key={p.n} className="rounded-xl border border-border bg-surface/40 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{p.n}</div>
                  <Pill>{p.t}</Pill>
                </div>
                <div className="mt-3">
                  <Bar value={p.p} />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            Grant Opportunities
          </div>
          <ul className="mt-3 space-y-3 text-sm">
            {[
              { n: "ERC Starting Grant", d: "Mar 14, 2027" },
              { n: "NIH R21 Exploratory", d: "Feb 02, 2027" },
              { n: "EU Horizon Cluster 1", d: "Jan 18, 2027" },
            ].map((g) => (
              <li
                key={g.n}
                className="flex items-center justify-between rounded-lg border border-border px-3 py-2"
              >
                <span>{g.n}</span>
                <span className="text-xs text-muted-foreground">{g.d}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Page>
  );
}

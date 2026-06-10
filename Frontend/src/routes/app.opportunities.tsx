import { createFileRoute } from "@tanstack/react-router";
import { Page, Card, Pill } from "@/components/app/Page";

export const Route = createFileRoute("/app/opportunities")({
  head: () => ({ meta: [{ title: "Opportunity Center — Professional Home" }] }),
  component: Opportunities,
});

const opps = [
  { t: "Genentech — Computational Biology Intern", k: "Internship", d: "Apply by Feb 14" },
  { t: "ERC Starting Grant", k: "Grant", d: "Mar 14, 2027" },
  { t: "Y Combinator W27", k: "Accelerator", d: "Rolling" },
  { t: "Knight-Hennessy Scholarship", k: "Fellowship", d: "Oct 9, 2026" },
  { t: "HackBio Global Challenge", k: "Hackathon", d: "Sep 22" },
  { t: "EU Horizon Cluster 1", k: "Funding", d: "Jan 18, 2027" },
];

function Opportunities() {
  return (
    <Page
      title="Opportunity Center"
      subtitle="Internships, jobs, grants, accelerators, and scholarships"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {opps.map((o) => (
          <Card key={o.t}>
            <Pill>{o.k}</Pill>
            <div className="mt-2 font-medium">{o.t}</div>
            <div className="mt-1 text-xs text-muted-foreground">{o.d}</div>
            <div className="mt-4 flex gap-2">
              <button
                className="flex-1 rounded-full px-3 py-1.5 text-xs text-background"
                style={{ background: "var(--gradient-primary)" }}
              >
                Apply
              </button>
              <button className="rounded-full glass px-3 py-1.5 text-xs">Save</button>
            </div>
          </Card>
        ))}
      </div>
    </Page>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Page, Card, Pill } from "@/components/app/Page";

export const Route = createFileRoute("/app/community")({
  head: () => ({ meta: [{ title: "Community — Professional Home" }] }),
  component: Community,
});

function Community() {
  const groups = [
    "Computational Biology",
    "Founders · Seed",
    "Marie Curie Cohort 2026",
    "Diffusion Models",
    "Bio + AI",
  ];
  const threads = [
    { t: "Best practices for federated training across hospitals?", r: 24, a: "Karim H." },
    { t: "How are you structuring board updates pre-seed?", r: 12, a: "Devin R." },
    { t: "Open call: collaborators for a perspective paper", r: 39, a: "Helena C." },
  ];
  return (
    <Page title="Community" subtitle="Forums, Q&A, events, hackathons, and challenges">
      <div className="grid gap-4 lg:grid-cols-[18rem_1fr]">
        <Card>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            My communities
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            {groups.map((g) => (
              <li key={g} className="rounded-lg border border-border bg-surface/40 px-3 py-2">
                {g}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            Latest threads
          </div>
          <ul className="mt-3 space-y-3">
            {threads.map((t) => (
              <li key={t.t} className="rounded-xl border border-border bg-surface/40 p-3">
                <div className="text-sm font-medium">{t.t}</div>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{t.a}</span>
                  <span>·</span>
                  <span>{t.r} replies</span>
                  <Pill>research</Pill>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Page>
  );
}

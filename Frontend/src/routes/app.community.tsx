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
          <ul className="mt-3 space-y-2.5">
            {groups.map((g) => (
              <li key={g} className="rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] px-3.5 py-2.5 text-xs text-white/90 transition cursor-pointer">
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
              <li key={t.t} className="rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] p-4 transition cursor-pointer">
                <div className="text-xs font-semibold text-white leading-relaxed">{t.t}</div>
                <div className="mt-2.5 flex items-center gap-2.5 text-[10px] text-muted-foreground font-mono">
                  <span className="text-white/80 font-medium">{t.a}</span>
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

import { createFileRoute } from "@tanstack/react-router";
import { Page, Card, Bar, Stat, Pill } from "@/components/app/Page";

export const Route = createFileRoute("/app/career")({
  head: () => ({ meta: [{ title: "Career Hub — Professional Home" }] }),
  component: Career,
});

function Career() {
  return (
    <Page title="Career Hub" subtitle="Skill gap, internships, jobs, resume, and interview prep">
      <div className="grid gap-4 lg:grid-cols-4">
        <Stat label="Career Score" value="74" delta="+8 this month" />
        <Stat label="Applications" value="22" delta="6 in interview" tone="violet" />
        <Stat label="Skills Acquired" value="9" delta="3 verified" />
        <Stat label="Offers" value="2" delta="1 final-round" tone="violet" />
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            Skill gap analysis
          </div>
          <div className="mt-3 space-y-3">
            {[
              ["SQL", 84],
              ["Statistics", 67],
              ["System design", 49],
              ["Communication", 72],
            ].map(([k, v]) => (
              <Bar key={k as string} value={v as number} label={k as string} />
            ))}
          </div>
        </Card>
        <Card>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            Active applications
          </div>
          <ul className="mt-3 space-y-2.5">
            {[
              { c: "Genentech", r: "Research Intern", s: "interview" },
              { c: "OpenAI", r: "ML Engineer", s: "applied" },
              { c: "Anthropic", r: "Research Eng", s: "final" },
            ].map((a) => (
              <li
                key={a.c}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] px-3.5 py-2.5 transition"
              >
                <div>
                  <div className="text-xs font-semibold text-white">{a.c}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{a.r}</div>
                </div>
                <Pill tone={a.s === "final" ? "success" : "warn"}>{a.s}</Pill>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Page>
  );
}

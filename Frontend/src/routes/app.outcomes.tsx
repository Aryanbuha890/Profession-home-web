import { createFileRoute } from "@tanstack/react-router";
import { Page, Card, Stat } from "@/components/app/Page";

export const Route = createFileRoute("/app/outcomes")({
  head: () => ({ meta: [{ title: "Outcome Tracker — Professional Home" }] }),
  component: Outcomes,
});

function Outcomes() {
  return (
    <Page
      title="Outcome Tracker"
      subtitle="The core differentiator — verified, measurable outcomes"
    >
      <div className="grid gap-4 lg:grid-cols-4">
        <Stat label="Internships" value="2" />
        <Stat label="Jobs" value="1" tone="violet" />
        <Stat label="Papers" value="3" />
        <Stat label="Patents" value="1" tone="violet" />
        <Stat label="Startups" value="1" />
        <Stat label="Funding" value="$2.1M" tone="violet" />
        <Stat label="Promotions" value="1" />
        <Stat label="Skills" value="9" tone="violet" />
      </div>
      <Card className="mt-4">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Growth graph</div>
        <div className="mt-4 grid h-48 grid-cols-12 items-end gap-2">
          {[14, 22, 18, 30, 26, 42, 38, 55, 60, 72, 68, 86].map((h, i) => (
            <div
              key={i}
              className="rounded-md"
              style={{
                height: `${h}%`,
                background: "var(--gradient-primary)",
                opacity: 0.4 + i / 24,
              }}
            />
          ))}
        </div>
        <div className="mt-2 grid grid-cols-12 gap-2 text-center text-[10px] text-muted-foreground">
          {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map((m, i) => (
            <div key={i}>{m}</div>
          ))}
        </div>
      </Card>
    </Page>
  );
}

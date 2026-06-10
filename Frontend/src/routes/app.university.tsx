import { createFileRoute } from "@tanstack/react-router";
import { Page, Card, Stat, Bar } from "@/components/app/Page";

export const Route = createFileRoute("/app/university")({
  head: () => ({ meta: [{ title: "University Portal — Professional Home" }] }),
  component: University,
});

function University() {
  return (
    <Page title="University Portal" subtitle="Student, research, startup, and placement analytics">
      <div className="grid gap-4 lg:grid-cols-4">
        <Stat label="Active Students" value="12,480" />
        <Stat label="Active Researchers" value="2,140" tone="violet" />
        <Stat label="Startups Incubated" value="184" />
        <Stat label="Placements YTD" value="3,210" tone="violet" />
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            Innovation dashboard
          </div>
          <div className="mt-3 space-y-3">
            <Bar value={71} label="Cross-department collaborations" />
            <Bar value={58} label="Industry partnerships" />
            <Bar value={42} label="Patents filed (YTD)" />
          </div>
        </Card>
        <Card>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            Placement analytics
          </div>
          <div className="mt-3 space-y-3">
            <Bar value={86} label="Engineering" />
            <Bar value={74} label="Life Sciences" />
            <Bar value={61} label="Humanities" />
          </div>
        </Card>
      </div>
    </Page>
  );
}

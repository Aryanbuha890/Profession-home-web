import { createFileRoute } from "@tanstack/react-router";
import { Page, Card, Pill } from "@/components/app/Page";

export const Route = createFileRoute("/app/execution")({
  head: () => ({ meta: [{ title: "Execution Tracker — Professional Home" }] }),
  component: Execution,
});

const columns = [
  { t: "Backlog", items: ["Refresh literature review", "Outline figures", "Request HR letter"] },
  { t: "In progress", items: ["Draft aim 2", "Pitch deck v3", "Schedule diligence"] },
  { t: "Review", items: ["Methods section", "Budget v2"] },
  { t: "Done", items: ["Abstract submission", "Design partner #4", "Mentor 1:1"] },
];

function Execution() {
  return (
    <Page
      title="Execution Tracker"
      subtitle="Kanban, timeline, calendar, and dependencies"
      actions={
        <>
          <button className="rounded-full glass px-3 py-1.5 text-xs">Kanban</button>
          <button className="rounded-full glass px-3 py-1.5 text-xs">Timeline</button>
          <button className="rounded-full glass px-3 py-1.5 text-xs">Calendar</button>
          <button
            className="ml-auto rounded-full px-3 py-1.5 text-xs text-background"
            style={{ background: "var(--gradient-primary)" }}
          >
            New task
          </button>
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {columns.map((col, i) => (
          <Card key={col.t}>
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{col.t}</div>
              <Pill>{col.items.length}</Pill>
            </div>
            <div className="mt-3 space-y-2">
              {col.items.map((it) => (
                <div key={it} className="rounded-xl border border-border bg-surface/40 p-3 text-sm">
                  <div>{it}</div>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>P{(i % 3) + 1}</span>
                    <span>Due {["Tue", "Thu", "Mon", "Fri"][i]}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Page>
  );
}

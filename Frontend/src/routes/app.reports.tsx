import { createFileRoute } from "@tanstack/react-router";
import { Page, Card } from "@/components/app/Page";
import { ScrollText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/reports")({
  head: () => ({ meta: [{ title: "Reports — Professional Home" }] }),
  component: Reports,
});

const reports = [
  { t: "AI Assessment Report v2", d: "Strengths, weaknesses, success probability 78%", date: "Jun 10" },
  { t: "Diagnosis Report — Priya R.", d: "Recommended 30-day plan and milestones", date: "Jun 8" },
  { t: "Weekly Progress — W6", d: "62% on plan, 4/7 milestones complete", date: "Jun 7" },
  { t: "Mock Interview Scorecard", d: "DSA 8/10 · System design 6/10 · Behavioral 9/10", date: "Jun 5" },
];

function Reports() {
  return (
    <Page title="Reports" subtitle="All your generated reports and scorecards in one place">
      <div className="space-y-3">
        {reports.map((r) => (
          <Card key={r.t} className="flex flex-row items-center gap-4 py-4.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-400/10 text-sky-400">
              <ScrollText className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{r.t}</p>
              <p className="text-xs text-muted-foreground truncate mt-0.5">{r.d}</p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <span className="text-xs text-muted-foreground font-mono">{r.date}</span>
              <Button size="sm" className="bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 font-bold hover:opacity-90 transition cursor-pointer">
                <Download className="mr-1 h-3.5 w-3.5" /> Download
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Page>
  );
}

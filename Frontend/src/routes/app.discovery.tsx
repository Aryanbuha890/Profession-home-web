import { createFileRoute } from "@tanstack/react-router";
import { Page, Card } from "@/components/app/Page";
import { Button } from "@/components/ui/button";
import { Video, FileText, Sparkles, Calendar, Clock, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/app/discovery")({
  head: () => ({ meta: [{ title: "Discovery Session — Professional Home" }] }),
  component: Discovery,
});

function Discovery() {
  return (
    <Page title="Discovery Session" subtitle="With Priya Raghavan · Product Strategy">
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold text-sky-400 font-mono uppercase tracking-wider">Scheduled</p>
            <h2 className="mt-1.5 text-xl font-bold text-white">Tomorrow · 4:30 PM IST · 45 min</h2>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-sky-400" /> Thu, Jun 12</span>
              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-sky-400" /> 16:30 – 17:15</span>
              <span className="flex items-center gap-1.5"><Video className="h-3.5 w-3.5 text-sky-400" /> Video Call Link</span>
            </div>
          </div>
          <div className="mt-6">
            <Button className="bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 font-bold hover:opacity-90 transition cursor-pointer">
              <Video className="mr-2 h-4 w-4" /> Join Video Call
            </Button>
          </div>
        </Card>

        <Card>
          <p className="text-sm font-semibold text-white">Shared with Mentor</p>
          <ul className="mt-3 space-y-2.5 text-sm">
            {["Assessment report (v2)", "Resume_Aarav.pdf", "Project_brief.docx"].map((f) => (
              <li key={f} className="flex items-center gap-2 text-muted-foreground hover:text-white transition">
                <FileText className="h-4 w-4 text-sky-400" /> {f}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="flex items-center gap-2 text-sm font-semibold text-sky-400">
            <Sparkles className="h-4 w-4 animate-pulse" /> AI Insights for Mentor
          </div>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>• Strong in DSA, weak in system design depth.</li>
            <li>• Goal: PM/SDE internship at top product company in 60 days.</li>
            <li>• Risk: Portfolio lacks deployed projects.</li>
            <li>• Suggested focus: 1 shipped product + mock interviews.</li>
          </ul>
        </Card>

        <Card>
          <p className="text-sm font-semibold text-white">Diagnosis Report (Post-Session)</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Mentor will publish a diagnosis report and recommended plan after the call.
          </p>
          <div className="mt-4 space-y-2.5 text-sm">
            {["Recommended plan", "Expected timeline", "Roadmap draft"].map((s) => (
              <div key={s} className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> {s}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Page>
  );
}

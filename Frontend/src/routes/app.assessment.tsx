import { createFileRoute } from "@tanstack/react-router";
import { Page, Card, Bar, Pill } from "@/components/app/Page";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/app/assessment")({
  head: () => ({ meta: [{ title: "AI Assessment — Professional Home" }] }),
  component: Assessment,
});

const steps = [
  "Current Situation",
  "Skills",
  "Experience",
  "Goals",
  "Challenges",
  "Timeline",
  "Budget",
];

function Assessment() {
  return (
    <Page
      title="AI Assessment"
      subtitle="Deep multi-domain analysis of your goals, skills, and risks"
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Step 2 of 7
            </div>
            <Pill>~6 min remaining</Pill>
          </div>
          <div className="mt-3 flex gap-1.5">
            {steps.map((s, i) => (
              <div key={s} className="flex-1">
                <div
                  className={`h-1 rounded-full ${i < 2 ? "" : "bg-foreground/10"}`}
                  style={i < 2 ? { background: "var(--gradient-primary)" } : undefined}
                />
                <div
                  className={`mt-2 text-[10px] ${i === 1 ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {s}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="font-display text-xl font-semibold">Tell us about your skills</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Rate your proficiency. The AI will normalize against your domain peers.
            </p>
            <div className="mt-5 space-y-4">
              {[
                ["Quantitative methods", 78],
                ["Scientific writing", 64],
                ["Team leadership", 52],
                ["Fundraising / pitching", 36],
              ].map(([k, v]) => (
                <div key={k as string}>
                  <div className="flex justify-between text-sm">
                    <span>{k}</span>
                    <span className="text-muted-foreground">{v}%</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-foreground/5 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${v}%`, background: "var(--gradient-primary)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-end gap-2">
              <button className="rounded-full glass px-4 py-2 text-sm">Back</button>
              <button
                className="rounded-full px-4 py-2 text-sm text-background"
                style={{ background: "var(--gradient-primary)" }}
              >
                Continue
              </button>
            </div>
          </div>
        </Card>

        <Card>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Live preview</div>
          <div className="mt-2 font-display text-3xl font-semibold text-gradient">87%</div>
          <div className="text-xs text-muted-foreground">Predicted success probability</div>
          <div className="mt-5 space-y-3 text-sm">
            <Bar value={82} label="Strengths" />
            <Bar value={55} label="Opportunities" />
            <Bar value={34} label="Risks" />
          </div>
          <ul className="mt-5 space-y-2 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-emerald-400" /> Strong publication
              trajectory
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-emerald-400" /> Underserved niche
              (high demand)
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-emerald-400" /> Mentor coverage
              adequate
            </li>
          </ul>
        </Card>
      </div>
    </Page>
  );
}

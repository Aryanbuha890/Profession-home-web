import { createFileRoute } from "@tanstack/react-router";
import { Page, Card, Stat, Pill } from "@/components/app/Page";

export const Route = createFileRoute("/app/investor")({
  head: () => ({ meta: [{ title: "Investor Portal — Professional Home" }] }),
  component: Investor,
});

function Investor() {
  return (
    <Page
      title="Investor Portal"
      subtitle="Discovery, pipeline, due diligence, and founder reports"
    >
      <div className="grid gap-4 lg:grid-cols-4">
        <Stat label="Pipeline" value="148" delta="22 new this week" />
        <Stat label="In DD" value="12" tone="violet" />
        <Stat label="Investments" value="34" delta="$86M deployed" />
        <Stat label="IRR" value="28%" delta="trailing 5y" tone="violet" />
      </div>
      <Card className="mt-4">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Pipeline</div>
        <div className="mt-3 grid gap-4 md:grid-cols-4">
          {["Sourced", "Screen", "Due diligence", "Term sheet"].map((s, i) => (
            <div key={s} className="rounded-xl border border-white/5 bg-white/[0.01] p-3.5 flex flex-col gap-3">
              <div className="text-[10px] font-semibold text-muted-foreground font-mono uppercase tracking-wider">{s}</div>
              <div className="space-y-2.5">
                {Array.from({ length: 3 - (i % 3) || 1 }).map((_, k) => (
                  <div key={k} className="rounded-lg border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] p-2.5 transition cursor-pointer">
                    <div className="text-xs font-semibold text-white">
                      Startup {String.fromCharCode(65 + i + k)}
                    </div>
                    <div className="mt-1.5 flex items-center justify-between text-[10px] text-muted-foreground">
                      <span>Seed · $1.5M</span>
                      <Pill>{["AI", "Bio", "Climate"][(i + k) % 3]}</Pill>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Page>
  );
}

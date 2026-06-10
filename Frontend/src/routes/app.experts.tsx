import { createFileRoute } from "@tanstack/react-router";
import { Page, Card, Pill } from "@/components/app/Page";
import { Star, Calendar } from "lucide-react";

export const Route = createFileRoute("/app/experts")({
  head: () => ({ meta: [{ title: "Expert Marketplace — Professional Home" }] }),
  component: Experts,
});

const experts = [
  { n: "Dr. Helena Chen", r: "Computational Biology · Stanford", s: 4.9, p: "$220/hr", a: "Today" },
  { n: "Marco Rossi", r: "Seed-stage Investor · Milan", s: 4.8, p: "$340/hr", a: "Thu" },
  { n: "Prof. Adeyemi", r: "Public Health · LSE", s: 4.9, p: "$260/hr", a: "Fri" },
  { n: "Yuki Tanaka", r: "Product · ex-Stripe", s: 4.7, p: "$190/hr", a: "Mon" },
  { n: "Sarah Levin", r: "Biotech VC · Boston", s: 5.0, p: "$420/hr", a: "Wed" },
  { n: "Karim Haddad", r: "AI Research · DeepMind", s: 4.9, p: "$310/hr", a: "Today" },
];

const filters = [
  "Domain",
  "Industry",
  "Research Area",
  "Language",
  "Availability",
  "Price",
  "Rating",
  "Experience",
];

function Experts() {
  return (
    <Page title="Expert Marketplace" subtitle="Vetted mentors, advisors, and investors">
      <div className="grid gap-4 lg:grid-cols-[16rem_1fr]">
        <Card>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Filters</div>
          <div className="mt-3 space-y-2">
            {filters.map((f) => (
              <div
                key={f}
                className="rounded-lg border border-border bg-surface/40 px-3 py-2 text-sm"
              >
                {f}
              </div>
            ))}
          </div>
        </Card>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {experts.map((e) => (
            <Card key={e.n}>
              <div className="flex items-center gap-3">
                <div
                  className="h-12 w-12 rounded-full"
                  style={{ background: "var(--gradient-primary)" }}
                />
                <div>
                  <div className="font-medium">{e.n}</div>
                  <div className="text-xs text-muted-foreground">{e.r}</div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 text-amber-300" />
                  {e.s}
                </span>
                <span>·</span>
                <span>{e.p}</span>
                <span>·</span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {e.a}
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  className="flex-1 rounded-full px-3 py-1.5 text-xs text-background"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  Book session
                </button>
                <button className="rounded-full glass px-3 py-1.5 text-xs">Profile</button>
              </div>
              <div className="mt-3">
                <Pill tone="success">Available this week</Pill>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Page>
  );
}

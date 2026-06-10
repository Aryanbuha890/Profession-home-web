import { Link } from "@tanstack/react-router";
import {
  Brain,
  Users,
  Map,
  GanttChart,
  Trophy,
  FlaskConical,
  Rocket,
  Briefcase,
  Coins,
  Bot,
  BarChart3,
  Check,
  Sparkles,
} from "lucide-react";

export function SectionHead({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="text-xs uppercase tracking-[0.22em] text-[var(--electric)]">{eyebrow}</div>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
        {title}
      </h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function Trust() {
  const logos = [
    "Stanford",
    "MIT Media Lab",
    "Y Combinator",
    "Genentech",
    "Broad Institute",
    "ETH Zürich",
    "DeepMind",
    "OpenAI Research",
  ];
  const stats = [
    { v: "120K+", l: "Active members" },
    { v: "38K", l: "Projects in motion" },
    { v: "9.2K", l: "Verified outcomes" },
    { v: "2.4K", l: "Expert mentors" },
    { v: "1.8K", l: "Research papers" },
    { v: "$420M", l: "Funding raised" },
  ];
  return (
    <section className="border-y border-border bg-surface/30 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Trusted across the innovation ecosystem
        </p>
        <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3 text-center text-sm text-muted-foreground sm:grid-cols-4 md:grid-cols-8">
          {logos.map((l) => (
            <div key={l} className="opacity-70 transition hover:opacity-100">
              {l}
            </div>
          ))}
        </div>
        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-6">
          {stats.map((s) => (
            <div key={s.l} className="bg-surface/60 p-6 text-center">
              <div className="font-display text-3xl font-semibold text-gradient">{s.v}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    {
      n: "01",
      t: "AI Assessment",
      d: "Deep multi-domain analysis of skills, goals, gaps, and timing.",
      i: Brain,
    },
    {
      n: "02",
      t: "Expert Matching",
      d: "Matched to vetted mentors, advisors, and collaborators.",
      i: Users,
    },
    {
      n: "03",
      t: "Roadmap Creation",
      d: "A measurable plan with milestones, dependencies, and risk.",
      i: Map,
    },
    {
      n: "04",
      t: "Execution Tracking",
      d: "Kanban, calendar, and milestone tracking with AI nudges.",
      i: GanttChart,
    },
    {
      n: "05",
      t: "Outcome Achievement",
      d: "Internships, jobs, papers, patents, funding — verified.",
      i: Trophy,
    },
  ];
  return (
    <section className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead eyebrow="How it works" title="Five steps from ambition to outcome." />
        <ol className="mt-14 grid gap-4 md:grid-cols-5">
          {steps.map(({ n, t, d, i: Icon }) => (
            <li key={n} className="glass rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <span
                  className="grid h-10 w-10 place-items-center rounded-lg"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <Icon className="h-5 w-5 text-background" />
                </span>
                <span className="text-xs text-muted-foreground">Step {n}</span>
              </div>
              <h3 className="mt-4 text-base font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Ecosystem() {
  const nodes = ["Students", "Universities", "Researchers", "Startups", "Experts", "Investors"];
  return (
    <section className="border-y border-border bg-surface/30 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead eyebrow="The Ecosystem" title="One network. Every role. Real relationships." />
        <div className="mt-16 grid items-center gap-12 md:grid-cols-2">
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-full border border-border" />
            <div className="absolute inset-10 rounded-full border border-border/70 animate-orbit" />
            <div className="absolute inset-20 rounded-full border border-border/40" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="grid h-24 w-24 place-items-center rounded-2xl glass-strong text-center text-xs font-medium">
                Professional
                <br />
                Home
              </div>
            </div>
            {nodes.map((n, i) => {
              const angle = (i / nodes.length) * Math.PI * 2;
              const x = 50 + Math.cos(angle) * 42;
              const y = 50 + Math.sin(angle) * 42;
              return (
                <div
                  key={n}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full glass px-3 py-1.5 text-xs"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  {n}
                </div>
              );
            })}
          </div>
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-tight">
              A flywheel for outcomes
            </h3>
            <p className="mt-3 text-muted-foreground">
              Students find mentors. Researchers find collaborators. Founders find investors.
              Universities track innovation. Every introduction is purposeful and every relationship
              is measured.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-2 text-sm">
              {[
                "Talent graph",
                "Verified outcomes",
                "AI introductions",
                "Reputation system",
                "Cross-institution",
                "Granular permissions",
              ].map((x) => (
                <li key={x} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[var(--electric)]" /> {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Features() {
  const items = [
    { t: "AI Assessment Engine", d: "Skill, goal, and risk profiling in minutes.", i: Brain },
    { t: "Expert Marketplace", d: "Vetted mentors, advisors, and investors.", i: Users },
    { t: "Roadmap Builder", d: "Milestones, dependencies, and projections.", i: Map },
    { t: "Execution Tracker", d: "Kanban, calendar, timeline, and KPIs.", i: GanttChart },
    { t: "Research Hub", d: "Projects, grants, teams, publications.", i: FlaskConical },
    { t: "Startup Hub", d: "Pitch reviews, fundraising, milestones.", i: Rocket },
    { t: "Career Hub", d: "Skill gap, resume, interview prep.", i: Briefcase },
    { t: "Funding Hub", d: "Grants, accelerators, and term sheets.", i: Coins },
    { t: "AI Copilot", d: "Always-on assistant across every workflow.", i: Bot },
    { t: "Outcome Analytics", d: "Real-time success metrics by cohort.", i: BarChart3 },
  ];
  return (
    <section className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead eyebrow="Platform" title="Ten systems. One operating model." />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {items.map(({ t, d, i: Icon }) => (
            <div
              key={t}
              className="group relative rounded-2xl glass p-5 transition hover:-translate-y-0.5 hover:glow"
            >
              <div
                className="grid h-10 w-10 place-items-center rounded-lg"
                style={{ background: "var(--gradient-primary)" }}
              >
                <Icon className="h-5 w-5 text-background" />
              </div>
              <h3 className="mt-4 text-sm font-semibold">{t}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stories() {
  const cards = [
    {
      who: "Ana K., PhD candidate",
      what: "Published 2 papers and secured a Marie Curie fellowship in 9 months.",
      m: ["2 papers", "€186K grant", "3 collaborators"],
    },
    {
      who: "Devin R., Founder",
      what: "From idea to a seed round of $2.1M with 4 verified design partners.",
      m: ["$2.1M raised", "4 LOIs", "8 hires"],
    },
    {
      who: "Priya S., Senior",
      what: "Landed a research internship at a top lab and a return offer.",
      m: ["1 internship", "+2 skills", "Return offer"],
    },
  ];
  return (
    <section className="border-y border-border bg-surface/30 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead eyebrow="Outcomes" title="Real people. Real, verified wins." />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {cards.map((c) => (
            <article key={c.who} className="glass-strong rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-full"
                  style={{ background: "var(--gradient-primary)" }}
                />
                <div>
                  <div className="text-sm font-medium">{c.who}</div>
                  <div className="text-xs text-muted-foreground">Verified outcome</div>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed">{c.what}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {c.m.map((x) => (
                  <span key={x} className="rounded-full glass px-2.5 py-1 text-xs">
                    {x}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Pricing() {
  const plans = [
    {
      n: "Student",
      p: "$0",
      d: "For ambitious learners.",
      f: ["AI assessment", "Roadmap builder", "Community access"],
      cta: "Get started",
    },
    {
      n: "Research",
      p: "$19",
      d: "For researchers and labs.",
      f: ["Everything in Student", "Research Hub", "Grant matching", "Collaboration tools"],
      cta: "Start trial",
      featured: true,
    },
    {
      n: "Startup",
      p: "$49",
      d: "For founders and teams.",
      f: ["Everything in Research", "Startup Hub", "Investor matching", "Pitch deck reviews"],
      cta: "Start trial",
    },
    {
      n: "Enterprise",
      p: "Custom",
      d: "For universities & corps.",
      f: ["SSO & permissions", "Analytics dashboards", "Dedicated success", "Custom integrations"],
      cta: "Talk to us",
    },
  ];
  return (
    <section className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead eyebrow="Pricing" title="Plans for every stage of growth." />
        <div className="mt-14 grid gap-4 md:grid-cols-4">
          {plans.map((p) => (
            <div
              key={p.n}
              className={`relative rounded-2xl p-6 ${p.featured ? "glass-strong glow" : "glass"}`}
            >
              {p.featured && (
                <div
                  className="absolute -top-3 left-6 rounded-full px-2.5 py-0.5 text-xs text-background"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  Most popular
                </div>
              )}
              <div className="text-sm text-muted-foreground">{p.n}</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-display text-3xl font-semibold">{p.p}</span>
                {p.p !== "Custom" && <span className="text-xs text-muted-foreground">/mo</span>}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{p.d}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {p.f.map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-[var(--electric)]" /> {x}
                  </li>
                ))}
              </ul>
              <Link
                to="/app"
                className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition ${p.featured ? "text-background hover:opacity-90" : "glass hover:bg-foreground/5"}`}
                style={p.featured ? { background: "var(--gradient-primary)" } : undefined}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const groups = [
    { t: "Platform", l: ["Assessment", "Experts", "Roadmaps", "Outcomes"] },
    { t: "Solutions", l: ["Students", "Researchers", "Startups", "Universities"] },
    { t: "Resources", l: ["Docs", "Changelog", "Blog", "Status"] },
    { t: "Company", l: ["About", "Careers", "Press", "Contact"] },
  ];
  return (
    <footer className="border-t border-border py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span
              className="grid h-7 w-7 place-items-center rounded-md"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Sparkles className="h-4 w-4 text-background" />
            </span>
            <span className="font-display text-sm font-semibold">Professional Home</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            The operating system for professional growth, research, innovation, and career success.
          </p>
        </div>
        {groups.map((g) => (
          <div key={g.t}>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {g.t}
            </div>
            <ul className="mt-3 space-y-2 text-sm">
              {g.l.map((x) => (
                <li key={x}>
                  <a className="text-muted-foreground hover:text-foreground" href="#">
                    {x}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-10 max-w-6xl px-6 text-xs text-muted-foreground">
        © 2026 Professional Home. All rights reserved.
      </div>
    </footer>
  );
}

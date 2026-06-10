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
  MapPin,
  Mail,
  Phone,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { AnimatedCounter } from "@/components/AnimatedCounter";

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
    { num: 120, decimals: 0, prefix: "", suffix: "K+", l: "Active members" },
    { num: 38, decimals: 0, prefix: "", suffix: "K", l: "Projects in motion" },
    { num: 9.2, decimals: 1, prefix: "", suffix: "K", l: "Verified outcomes" },
    { num: 2.4, decimals: 1, prefix: "", suffix: "K", l: "Expert mentors" },
    { num: 1.8, decimals: 1, prefix: "", suffix: "K", l: "Research papers" },
    { num: 420, decimals: 0, prefix: "$", suffix: "M", l: "Funding raised" },
  ];
  return (
    <section className="bg-surface/30 py-20">
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
              <div className="font-display text-3xl font-semibold text-gradient">
                <AnimatedCounter value={s.num} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
              </div>
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

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.49 1.977 14.026.957 11.4.957c-5.44 0-9.865 4.37-9.87 9.802-.001 1.772.475 3.5 1.378 5.027L1.935 21.8l6.19-1.626zm12.355-6.967c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.669.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-[#05060F] pt-16 pb-8 text-white/70">
      <div className="mx-auto max-w-[1380px] px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Brand Information */}
        <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
          <Logo />
          <p className="text-sm leading-relaxed text-white/60 mt-1 max-w-md">
            AI-powered platform helping students, researchers, and innovators discover the right career path, execute projects, and plan their academic journey with confidence. Our mission is to make career exploration simple, accessible, and personalized for every student.
          </p>
          <div className="text-[13px] text-white/40 font-medium">
            Professional Home Pvt Ltd
          </div>
        </div>

        {/* Contact Us */}
        <div className="col-span-12 sm:col-span-6 md:col-span-4 flex flex-col gap-5">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Contact Us</h3>
            <ul className="flex flex-col gap-3.5 text-[13.5px]">
              <li className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/[0.03] border border-white/5 text-white/70">
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="text-white/80">Surat, Gujarat, India</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/[0.03] border border-white/5 text-white/70">
                  <Mail className="h-4 w-4" />
                </span>
                <a href="mailto:professionalhome@gmail.com" className="text-white/80 hover:text-violet-400 transition-colors">
                  professionalhome@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/[0.03] border border-white/5 text-white/70">
                  <Phone className="h-4 w-4" />
                </span>
                <a href="tel:+911234567890" className="text-white/80 hover:text-violet-400 transition-colors">
                  +91 1234567890
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="mt-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3.5">Connect</h3>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.02] text-white/60 hover:text-pink-400 hover:border-pink-500/50 hover:bg-pink-500/5 transition-all duration-300"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/911234567890"
                target="_blank"
                rel="noreferrer"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.02] text-white/60 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all duration-300"
              >
                <WhatsAppIcon className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.02] text-white/60 hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Sitemap Links */}
        <div className="col-span-12 sm:col-span-6 md:col-span-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Site Map</h3>
          <ul className="grid gap-2.5 text-[13.5px]">
            {[
              { to: "/", label: "Home" },
              { to: "/how", label: "How" },
              { to: "/ecosystem", label: "Ecosystem" },
              { to: "/platform", label: "Platform" },
              { to: "/pricing", label: "Pricing" },
              { to: "/app", label: "Login / Sign Up" },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-white/75 hover:text-white hover:underline transition decoration-white/20 underline-offset-4"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Bottom Legal / Copyright strip */}
      <div className="mx-auto max-w-[1380px] px-6 md:px-10 mt-16 pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs text-white/40">
        <div className="flex items-center gap-6">
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link to="/cookies" className="hover:text-white transition-colors">Manage Cookies</Link>
        </div>
        <div>
          © 2026 Professional Home Pvt Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

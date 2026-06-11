import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Brain,
  Users,
  Calendar,
  Map,
  ListChecks,
  Compass,
  FileSearch,
  Bot,
  Trophy,
  ScrollText,
  Briefcase,
  ShieldCheck,
  Settings,
  Search,
  GraduationCap,
  Bell,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", to: "/app", exact: true },
  { icon: Brain, label: "Assessment", to: "/app/assessment" },
  { icon: Users, label: "Experts", to: "/app/experts" },
  { icon: Calendar, label: "Discovery", to: "/app/discovery" },
  { icon: Map, label: "Roadmap", to: "/app/roadmap" },
  { icon: ListChecks, label: "Tasks", to: "/app/tracker" },
  { icon: Compass, label: "Workspace", to: "/app/workspace" },
  { icon: FileSearch, label: "Documents", to: "/app/documents" },
  { icon: Bot, label: "AI Copilot", to: "/app/copilot" },
  { icon: Trophy, label: "Outcomes", to: "/app/outcomes" },
  { icon: ScrollText, label: "Reports", to: "/app/reports" },
  { icon: Briefcase, label: "Consultant", to: "/app/consultant" },
  { icon: ShieldCheck, label: "Admin", to: "/app/admin" },
  { icon: Settings, label: "Settings", to: "/app/settings" },
] as const;

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-border bg-sidebar text-sidebar-foreground">
      {/* Brand logo */}
      <div className="flex items-center gap-2 px-5 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 font-bold">
            <GraduationCap className="h-4.5 w-4.5" />
          </div>
          <span className="font-display text-[15px] font-semibold text-white">Professional Home</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="px-3">
        <div className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/5 px-2.5 py-1.5 text-xs text-muted-foreground">
          <Search className="h-3.5 w-3.5" /> <span>Search</span>
          <span className="ml-auto rounded bg-foreground/10 px-1.5 py-0.5 text-[10px]">⌘K</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="mt-4 flex-1 overflow-y-auto px-2 pb-4 space-y-0.5">
        {navItems.map((n) => {
          const exact = "exact" in n ? n.exact : false;
          const active = exact
            ? pathname === n.to
            : pathname === n.to || pathname.startsWith(n.to + "/");
          const Icon = n.icon;
          return (
            <li key={n.to} className="list-none">
              <Link
                to={n.to}
                className={`group relative flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-sm transition ${
                  active
                    ? "bg-sky-400/10 text-sky-400 font-semibold"
                    : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                }`}
              >
                {active && (
                  <span
                    className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full"
                    style={{ background: "linear-gradient(135deg, #38bdf8, #0284c7)" }}
                  />
                )}
                <Icon className="h-4 w-4" />
                <span>{n.label}</span>
              </Link>
            </li>
          );
        })}
      </nav>

      {/* Upgrade Callout */}
      <div className="border-t border-border p-3">
        <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-4">
          <p className="text-sm font-semibold text-white">Upgrade to Growth</p>
          <p className="mt-1 text-xs text-muted-foreground">Unlock mentor calls, copilot, and full workspace.</p>
          <button className="mt-3 w-full rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 py-1.5 text-xs font-bold text-slate-950 shadow hover:opacity-90 transition cursor-pointer">
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
}

export function AppTopbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-border bg-background/70 px-6 py-3 backdrop-blur">
      <div className="min-w-0">
        <h1 className="font-display text-lg font-semibold tracking-tight truncate">{title}</h1>
        {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="ml-auto flex items-center gap-2">
        <button className="rounded-md p-2 text-muted-foreground hover:bg-foreground/10 hover:text-foreground">
          <Bell className="h-4 w-4" />
        </button>
        <button className="rounded-md p-2 text-muted-foreground hover:bg-foreground/10 hover:text-foreground">
          <Settings className="h-4 w-4" />
        </button>
        <button
          className="rounded-full px-4 py-1.5 text-xs font-semibold text-slate-950 transition hover:scale-105"
          style={{ background: "linear-gradient(135deg, #ffffff, #38bdf8)" }}
        >
          Upgrade
        </button>
      </div>
    </header>
  );
}

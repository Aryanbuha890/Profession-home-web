import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Brain,
  Users,
  FlaskConical,
  Rocket,
  Briefcase,
  Building2,
  Coins,
  MessageSquare,
  KanbanSquare,
  Trophy,
  FileText,
  Globe2,
  Compass,
  Award,
  Sparkles,
  Search,
  Bell,
  Settings,
} from "lucide-react";

const nav = [
  {
    group: "Workspace",
    items: [
      { to: "/app", label: "Command Center", icon: LayoutDashboard, exact: true },
      { to: "/app/assessment", label: "AI Assessment", icon: Brain },
      { to: "/app/copilot", label: "AI Copilot", icon: Sparkles },
    ],
  },
  {
    group: "Hubs",
    items: [
      { to: "/app/experts", label: "Expert Marketplace", icon: Users },
      { to: "/app/research", label: "Research Hub", icon: FlaskConical },
      { to: "/app/startup", label: "Startup Hub", icon: Rocket },
      { to: "/app/career", label: "Career Hub", icon: Briefcase },
    ],
  },
  {
    group: "Portals",
    items: [
      { to: "/app/university", label: "University", icon: Building2 },
      { to: "/app/investor", label: "Investor", icon: Coins },
      { to: "/app/consultant", label: "Consultant", icon: MessageSquare },
    ],
  },
  {
    group: "Operations",
    items: [
      { to: "/app/execution", label: "Execution Tracker", icon: KanbanSquare },
      { to: "/app/outcomes", label: "Outcome Tracker", icon: Trophy },
      { to: "/app/documents", label: "Documents", icon: FileText },
    ],
  },
  {
    group: "Network",
    items: [
      { to: "/app/community", label: "Community", icon: Globe2 },
      { to: "/app/opportunities", label: "Opportunities", icon: Compass },
      { to: "/app/achievements", label: "Achievement Vault", icon: Award },
    ],
  },
] as const;

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-border bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-2 px-5 py-4">
        <span
          className="grid h-7 w-7 place-items-center rounded-md"
          style={{ background: "var(--gradient-primary)" }}
        >
          <Sparkles className="h-4 w-4 text-background" />
        </span>
        <Link to="/" className="font-display text-sm font-semibold">
          Professional Home
        </Link>
      </div>
      <div className="px-3">
        <div className="flex items-center gap-2 rounded-lg glass px-2.5 py-1.5 text-xs text-muted-foreground">
          <Search className="h-3.5 w-3.5" /> <span>Search</span>
          <span className="ml-auto rounded bg-foreground/10 px-1.5 py-0.5 text-[10px]">⌘K</span>
        </div>
      </div>
      <nav className="mt-4 flex-1 overflow-y-auto px-2 pb-4">
        {nav.map((g) => (
          <div key={g.group} className="mb-4">
            <div className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {g.group}
            </div>
            <ul className="space-y-0.5">
              {g.items.map((it) => {
                const exact = "exact" in it ? it.exact : false;
                const active = exact
                  ? pathname === it.to
                  : pathname === it.to || pathname.startsWith(it.to + "/");
                const Icon = it.icon;
                return (
                  <li key={it.to}>
                    <Link
                      to={it.to}
                      className={`group relative flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-sm transition ${
                        active
                          ? "bg-foreground/10 text-foreground"
                          : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                      }`}
                    >
                      {active && (
                        <span
                          className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full"
                          style={{ background: "var(--gradient-primary)" }}
                        />
                      )}
                      <Icon className="h-4 w-4" />
                      <span>{it.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2.5 rounded-lg p-2">
          <div className="h-8 w-8 rounded-full" style={{ background: "var(--gradient-primary)" }} />
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">Alex Morgan</div>
            <div className="truncate text-xs text-muted-foreground">Research · Pro</div>
          </div>
          <button className="ml-auto rounded-md p-1.5 text-muted-foreground hover:bg-foreground/10 hover:text-foreground">
            <Settings className="h-4 w-4" />
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
          className="rounded-full px-4 py-1.5 text-xs font-medium text-background"
          style={{ background: "var(--gradient-primary)" }}
        >
          Upgrade
        </button>
      </div>
    </header>
  );
}

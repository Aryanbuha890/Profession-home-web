import { Link, useRouterState, useNavigate, useSearch } from "@tanstack/react-router";
import { createContext, useContext, useState, useEffect } from "react";
import { useRole, Role } from "@/hooks/useRole";
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
  Menu,
  Ticket,
  Award,
  Coins,
  Building,
  FileText,
  User,
  TrendingUp,
  Sparkles,
  Folder,
  ChevronDown,
  ChevronUp,
  BriefcaseBusiness,
} from "lucide-react";

interface SidebarContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType>({
  isOpen: false,
  setIsOpen: () => {},
});

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useMobileSidebar() {
  return useContext(SidebarContext);
}

const roleConfigs: Record<
  Role,
  {
    name: string;
    theme: string;
    sub: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
    gradient: string;
  }
> = {
  student: {
    name: "Career Growth Arena",
    theme: "Student OS",
    sub: "Aryan 👋 · Lv. 4",
    icon: GraduationCap,
    accentColor: "#38bdf8",
    gradient: "from-sky-400 to-indigo-500",
  },
  researcher: {
    name: "Research Command Center",
    theme: "Researcher OS",
    sub: "Dr. Aryan · Publications",
    icon: Brain,
    accentColor: "#a78bfa",
    gradient: "from-violet-400 to-fuchsia-500",
  },
  founder: {
    name: "Founder OS",
    theme: "Startup Hub",
    sub: "Founder · Active Runway",
    icon: Compass,
    accentColor: "#fb7185",
    gradient: "from-rose-400 to-orange-500",
  },
  investor: {
    name: "Deal Flow Center",
    theme: "Investor Suite",
    sub: "GP · 12 Portfolio Cos",
    icon: Coins,
    accentColor: "#34d399",
    gradient: "from-emerald-400 to-teal-500",
  },
  university: {
    name: "Innovation & Placements",
    theme: "UniPortal",
    sub: "Dean · Placement Office",
    icon: Building,
    accentColor: "#f472b6",
    gradient: "from-pink-400 to-purple-500",
  },
  expert: {
    name: "Mentor Command Center",
    theme: "Expert OS",
    sub: "Senior Advisor · Active",
    icon: Users,
    accentColor: "#fbbf24",
    gradient: "from-amber-400 to-yellow-600",
  },
  admin: {
    name: "Control Tower",
    theme: "System Admin",
    sub: "Root Administrator",
    icon: ShieldCheck,
    accentColor: "#ef4444",
    gradient: "from-red-500 to-rose-600",
  },
};

const SUBROUTE_TABS = new Set([
  "achievements",
  "admin",
  "assessment",
  "career",
  "community",
  "consultant",
  "copilot",
  "discovery",
  "documents",
  "execution",
  "experts",
  "investor",
  "opportunities",
  "outcomes",
  "profile",
  "reports",
  "research",
  "roadmap",
  "settings",
  "startup",
  "tracker",
  "university",
  "workspace",
]);

export function AppSidebar() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { isOpen, setIsOpen } = useMobileSidebar();
  const { role, setRole } = useRole();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const search = useSearch({ strict: false }) as any;
  const currentTab = search?.tab || "home";

  const activeRoleConfig = roleConfigs[role];
  const ActiveIcon = activeRoleConfig.icon;

  const handleRoleChange = (selectedRole: Role) => {
    setRole(selectedRole);
    setDropdownOpen(false);
    // When changing roles, go back to standard /app page first
    navigate({ to: "/app", search: { tab: "home" } as any });
  };

  const navItems = (() => {
    switch (role) {
      case "student":
        return [
          { icon: LayoutDashboard, label: "Home", to: "/app", exact: true, tab: "home" },
          { icon: Compass, label: "Career Arena", to: "/app", tab: "arena" },
          { icon: Trophy, label: "Challenges", to: "/app", tab: "challenges" },
          { icon: Brain, label: "AI Assessment", to: "/app", tab: "assessment" },
          { icon: Map, label: "Career Roadmap", to: "/app", tab: "roadmap" },
          { icon: ListChecks, label: "Skill Builder", to: "/app", tab: "skills" },
          { icon: Folder, label: "Projects", to: "/app", tab: "projects" },
          { icon: Users, label: "Mentors", to: "/app", tab: "mentors" },
          { icon: Bot, label: "AI Copilot", to: "/app", tab: "copilot" },
          { icon: Award, label: "Achievement Vault", to: "/app", tab: "achievements" },
          { icon: Ticket, label: "Reward Center", to: "/app", tab: "rewards" },
          { icon: User, label: "Profile", to: "/app", tab: "profile" },
        ];
      case "researcher":
        return [
          { icon: LayoutDashboard, label: "Home", to: "/app", exact: true, tab: "home" },
          { icon: Compass, label: "Research Arena", to: "/app", tab: "research_arena" },
          { icon: Folder, label: "Research Projects", to: "/app", tab: "research_projects" },
          { icon: Users, label: "Collaborators", to: "/app", tab: "collaborators" },
          { icon: FileText, label: "Publications", to: "/app", tab: "publications" },
          { icon: Map, label: "Research Roadmaps", to: "/app", tab: "research_roadmap" },
          { icon: ListChecks, label: "Research Tasks", to: "/app", tab: "research_tasks" },
          { icon: FileSearch, label: "Document Intelligence", to: "/app", tab: "docs" },
          { icon: Bot, label: "AI Research Copilot", to: "/app", tab: "research_copilot" },
          { icon: Award, label: "Achievement Vault", to: "/app", tab: "achievements" },
          { icon: User, label: "Profile", to: "/app", tab: "profile" },
        ];
      case "founder":
        return [
          { icon: LayoutDashboard, label: "Home", to: "/app", exact: true, tab: "home" },
          { icon: Compass, label: "Startup Arena", to: "/app", tab: "startup_arena" },
          { icon: Brain, label: "Startup Assessment", to: "/app", tab: "startup_assessment" },
          { icon: Map, label: "Startup Roadmap", to: "/app", tab: "startup_roadmap" },
          { icon: ListChecks, label: "Tasks & Execution", to: "/app", tab: "tasks" },
          { icon: Bot, label: "AI Co-Founder", to: "/app", tab: "startup_copilot" },
          { icon: Users, label: "Mentors", to: "/app", tab: "mentors" },
          { icon: Users, label: "Investors", to: "/app", tab: "investors" },
          { icon: Coins, label: "Funding Center", to: "/app", tab: "funding" },
          { icon: FileText, label: "Pitch Decks", to: "/app", tab: "pitch_decks" },
          { icon: FileSearch, label: "Documents", to: "/app", tab: "docs" },
          { icon: Users, label: "Team Workspace", to: "/app", tab: "team_workspace" },
          { icon: Briefcase, label: "Customers", to: "/app", tab: "customers" },
          { icon: TrendingUp, label: "Analytics", to: "/app", tab: "analytics" },
          { icon: Award, label: "Achievement Vault", to: "/app", tab: "achievements" },
          { icon: Ticket, label: "Reward Center", to: "/app", tab: "rewards" },
          { icon: Users, label: "Community", to: "/app", tab: "community" },
          { icon: User, label: "Profile", to: "/app", tab: "profile" },
        ];
      case "investor":
        return [
          { icon: LayoutDashboard, label: "Home", to: "/app", exact: true, tab: "home" },
          { icon: TrendingUp, label: "Deal Flow", to: "/app", tab: "deal_flow" },
          { icon: Sparkles, label: "Startup Discovery", to: "/app", tab: "startup_discovery" },
          { icon: Coins, label: "Investment Opportunities", to: "/app", tab: "investments" },
          { icon: Bot, label: "AI Investment Analyst", to: "/app", tab: "investor_copilot" },
          { icon: ShieldCheck, label: "Due Diligence Center", to: "/app", tab: "due_diligence" },
          { icon: Calendar, label: "Founder Meetings", to: "/app", tab: "founder_meetings" },
          { icon: Compass, label: "Portfolio Companies", to: "/app", tab: "portfolio" },
          { icon: TrendingUp, label: "Investment Pipeline", to: "/app", tab: "investment_pipeline" },
          { icon: Map, label: "Market Intelligence", to: "/app", tab: "market_intel" },
          { icon: Users, label: "Community", to: "/app", tab: "community" },
          { icon: Ticket, label: "Reward Center", to: "/app", tab: "rewards" },
          { icon: User, label: "Profile", to: "/app", tab: "profile" },
          { icon: Settings, label: "Settings", to: "/app", tab: "settings" },
        ];
      case "university":
        return [
          { icon: LayoutDashboard, label: "Home", to: "/app", exact: true, tab: "home" },
          { icon: GraduationCap, label: "Students", to: "/app", tab: "students_list" },
          { icon: Brain, label: "Researchers", to: "/app", tab: "researchers_list" },
          { icon: Users, label: "Faculty Profiles", to: "/app", tab: "faculty" },
          { icon: Briefcase, label: "Placement Drive", to: "/app", tab: "placements" },
          { icon: Compass, label: "Startup Incubator", to: "/app", tab: "startup_incubator" },
          { icon: Sparkles, label: "Innovation Hub", to: "/app", tab: "innovation_hub" },
          { icon: Building, label: "Industry Partners", to: "/app", tab: "partners" },
          { icon: FileText, label: "Research Center", to: "/app", tab: "research_center" },
          { icon: Coins, label: "Grants & Funding", to: "/app", tab: "grants" },
          { icon: Calendar, label: "Events Center", to: "/app", tab: "events" },
          { icon: TrendingUp, label: "Analytics Center", to: "/app", tab: "analytics" },
          { icon: ScrollText, label: "Report Center", to: "/app", tab: "reports" },
          { icon: Bot, label: "AI University Copilot", to: "/app", tab: "uni_copilot" },
          { icon: Users, label: "Community", to: "/app", tab: "community" },
          { icon: Settings, label: "Settings", to: "/app", tab: "settings" },
        ];
      case "expert":
        return [
          { icon: LayoutDashboard, label: "Home", to: "/app", exact: true, tab: "home" },
          { icon: Users, label: "Clients", to: "/app", tab: "clients" },
          { icon: Sparkles, label: "Discovery Sessions", to: "/app", tab: "discovery_sessions" },
          { icon: Briefcase, label: "Consultations", to: "/app", tab: "consultations" },
          { icon: Ticket, label: "Arena Rewards", to: "/app", tab: "rewards" },
          { icon: Map, label: "Roadmaps", to: "/app", tab: "roadmaps" },
          { icon: ListChecks, label: "Tasks", to: "/app", tab: "tasks" },
          { icon: Calendar, label: "Meetings", to: "/app", tab: "meetings" },
          { icon: Folder, label: "Workspace", to: "/app", tab: "workspace" },
          { icon: FileText, label: "Documents", to: "/app", tab: "documents" },
          { icon: Bot, label: "AI Expert Assistant", to: "/app", tab: "expert_copilot" },
          { icon: Coins, label: "Revenue Center", to: "/app", tab: "revenue" },
          { icon: Award, label: "Reviews & Reputation", to: "/app", tab: "reviews" },
          { icon: TrendingUp, label: "Analytics", to: "/app", tab: "analytics" },
          { icon: Users, label: "Community", to: "/app", tab: "community" },
          { icon: User, label: "Profile", to: "/app", tab: "profile" },
          { icon: Settings, label: "Settings", to: "/app", tab: "settings" },
        ];
      case "admin":
        return [
          { icon: LayoutDashboard, label: "Home", to: "/app", exact: true, tab: "home" },
          { icon: Users, label: "Users", to: "/app", tab: "users" },
          { icon: GraduationCap, label: "Students", to: "/app", tab: "students" },
          { icon: Brain, label: "Researchers", to: "/app", tab: "researchers" },
          { icon: Compass, label: "Startups", to: "/app", tab: "startups" },
          { icon: Users, label: "Experts", to: "/app", tab: "experts" },
          { icon: Building, label: "Universities", to: "/app", tab: "universities" },
          { icon: Coins, label: "Investors", to: "/app", tab: "investors" },
          { icon: Ticket, label: "Rewards", to: "/app", tab: "rewards" },
          { icon: Compass, label: "Arena Management", to: "/app", tab: "arena_mgmt" },
          { icon: FileText, label: "Tickets", to: "/app", tab: "tickets" },
          { icon: Coins, label: "Payments", to: "/app", tab: "payments" },
          { icon: TrendingUp, label: "Analytics", to: "/app", tab: "analytics" },
          { icon: ShieldCheck, label: "Moderation", to: "/app", tab: "moderation" },
          { icon: ShieldCheck, label: "Support", to: "/app", tab: "support" },
        ];
      default:
        return [];
    }
  })();

  return (
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-66 shrink-0 flex-col border-r border-border bg-sidebar text-sidebar-foreground transition-transform duration-300 md:static md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Brand logo */}
        <div className="flex items-center justify-between px-5 py-4">
          <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 font-bold">
              <GraduationCap className="h-4 w-4" />
            </div>
            <span className="font-display text-[14px] font-semibold text-white tracking-tight">Professional Home</span>
          </Link>
        </div>

        {/* Dynamic Workspace / Role Switcher Selector */}
        <div className="px-3 mb-4 relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between gap-2 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] p-2.5 text-xs text-white transition cursor-pointer select-none"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${activeRoleConfig.gradient} text-slate-950`}>
                <ActiveIcon className="h-4 w-4" />
              </div>
              <div className="text-left min-w-0">
                <div className="font-semibold text-white truncate text-[11.5px] leading-tight">
                  {activeRoleConfig.theme}
                </div>
                <div className="text-[9.5px] text-muted-foreground truncate leading-tight">
                  {activeRoleConfig.sub}
                </div>
              </div>
            </div>
            <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground shrink-0 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Role Dropdown List */}
          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
              <div className="absolute left-3 right-3 mt-1.5 z-50 rounded-xl border border-white/10 bg-slate-950/95 p-1.5 shadow-2xl backdrop-blur-xl animate-scale-in">
                <div className="px-2 py-1 text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Select Command Workspace
                </div>
                <div className="mt-1 space-y-0.5 max-h-[300px] overflow-y-auto">
                  {(Object.keys(roleConfigs) as Role[]).map((r) => {
                    const cfg = roleConfigs[r];
                    const RI = cfg.icon;
                    const isSelected = r === role;
                    return (
                      <button
                        key={r}
                        onClick={() => handleRoleChange(r)}
                        className={`w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs transition cursor-pointer ${
                          isSelected
                            ? "bg-white/10 text-white font-medium"
                            : "text-muted-foreground hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <div className={`flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br ${cfg.gradient} text-slate-950`}>
                          <RI className="h-3.5 w-3.5" />
                        </div>
                        <div className="text-left min-w-0">
                          <div className="font-medium truncate text-[11px]">{cfg.theme}</div>
                          <div className="text-[8.5px] text-muted-foreground truncate leading-none mt-0.5">
                            {cfg.name}
                          </div>
                        </div>
                        {isSelected && (
                          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-sky-400" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Search Bar */}
        <div className="px-3">
          <div className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/5 px-2.5 py-1.5 text-xs text-muted-foreground">
            <Search className="h-3.5 w-3.5" /> <span>Search Workspace</span>
            <span className="ml-auto rounded bg-foreground/10 px-1.5 py-0.5 text-[10px]">⌘K</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4 flex-1 overflow-y-auto px-2 pb-4 space-y-0.5 scrollbar-thin">
          {navItems.map((n) => {
            const isSubroute = SUBROUTE_TABS.has(n.tab);
            const active = isSubroute
              ? (pathname === `/app/${n.tab}` || (pathname === "/app" && currentTab === n.tab))
              : (pathname === "/app" && (currentTab === n.tab || (n.tab === "home" && !currentTab)));

            const linkProps = isSubroute
              ? { to: `/app/${n.tab}` as any }
              : { to: "/app" as any, search: { tab: n.tab } as any };

            const Icon = n.icon;

            return (
              <li key={n.tab} className="list-none">
                <Link
                  {...linkProps}
                  onClick={() => setIsOpen(false)}
                  className={`group relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs transition select-none ${
                    active
                      ? "bg-white/[0.06] text-white font-semibold"
                      : "text-muted-foreground hover:bg-white/[0.02] hover:text-white"
                  }`}
                >
                  {active && (
                    <span
                      className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${activeRoleConfig.accentColor}, #ffffff)`,
                      }}
                    />
                  )}
                  <Icon
                    className={`h-4 w-4 transition-transform duration-200 group-hover:scale-110 ${
                      active ? "text-white" : "text-muted-foreground group-hover:text-white"
                    }`}
                    style={active ? { color: activeRoleConfig.accentColor } : {}}
                  />
                  <span className="truncate">{n.label}</span>
                </Link>
              </li>
            );
          })}
        </nav>

        {/* Upgrade Callout */}
        <div className="border-t border-white/5 p-3">
          <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent p-4">
            <p className="text-xs font-semibold text-white">Upgrade to Premium</p>
            <p className="mt-1 text-[10px] text-muted-foreground leading-normal">
              Unlock mentor integrations, 1-on-1 advisor matching, and AI Workspace.
            </p>
            <button
              className="mt-3 w-full rounded-xl py-1.5 text-xs font-bold text-slate-950 shadow-lg hover:scale-[1.02] hover:opacity-95 transition cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${activeRoleConfig.accentColor}, #ffffff)`,
              }}
            >
              Get Pro Access
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export function AppTopbar({ title, subtitle }: { title: string; subtitle?: string }) {
  const { setIsOpen } = useMobileSidebar();
  const { role } = useRole();
  const activeCfg = roleConfigs[role];

  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-border bg-background/70 px-6 py-3 backdrop-blur-md">
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-md p-1.5 text-muted-foreground hover:bg-foreground/10 hover:text-foreground md:hidden cursor-pointer"
        aria-label="Toggle menu"
      >
        <Menu className="h-5 w-5" />
      </button>
      <div className="min-w-0 flex-1 md:flex-initial">
        <div className="flex items-center gap-2">
          <span
            className="text-[9px] font-semibold font-mono uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: `${activeCfg.accentColor}20`,
              color: activeCfg.accentColor,
            }}
          >
            {activeCfg.theme}
          </span>
        </div>
        <h1 className="font-display text-lg font-bold tracking-tight truncate text-white mt-0.5">{title}</h1>
        {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="ml-auto flex items-center gap-2.5">
        <button className="rounded-xl border border-white/5 bg-white/[0.02] p-2 text-muted-foreground hover:bg-white/5 hover:text-foreground transition cursor-pointer">
          <Bell className="h-4 w-4" />
        </button>
        <button className="rounded-xl border border-white/5 bg-white/[0.02] p-2 text-muted-foreground hover:bg-white/5 hover:text-foreground transition cursor-pointer">
          <Settings className="h-4 w-4" />
        </button>
        <button
          className="rounded-xl px-3.5 py-1.5 text-xs font-bold text-slate-950 transition hover:scale-105 cursor-pointer shadow-md"
          style={{
            background: `linear-gradient(135deg, ${activeCfg.accentColor}, #ffffff)`,
          }}
        >
          Pro Upgrade
        </button>
      </div>
    </header>
  );
}

import { createFileRoute, Outlet, Link, useLocation } from "@tanstack/react-router";
import React from "react";
import { 
  Home, Compass, ClipboardList, Map, CheckSquare, Bot, 
  Users, Briefcase, DollarSign, FileText, UsersRound, ShoppingBag, TrendingUp, Trophy
} from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/app/startup")({
  component: StartupLayout,
});

const NAV_ITEMS = [
  { icon: Home, label: 'Home', to: '/app/startup', exact: true },
  { icon: Compass, label: 'Startup Arena', to: '/app/startup/arena' },
  { icon: ClipboardList, label: 'Startup Assessment', to: '/app/startup/assessment' },
  { icon: Map, label: 'Startup Roadmap', to: '/app/startup/roadmap' },
  { icon: CheckSquare, label: 'Tasks & Execution', to: '/app/startup/tasks' },
  { icon: Bot, label: 'AI Co-Founder', to: '/app/startup/ai' },
  { icon: Users, label: 'Mentors', to: '/app/startup/mentors' },
  { icon: DollarSign, label: 'Funding Center', to: '/app/startup/funding' },
  { icon: UsersRound, label: 'Team', to: '/app/startup/team' },
  { icon: ShoppingBag, label: 'Customers', to: '/app/startup/customers' },
  { icon: TrendingUp, label: 'Analytics', to: '/app/startup/analytics' },
];

export function StartupLayout() {
  const location = useLocation();

  return (
    <div className="flex h-full min-h-[calc(100vh-80px)] w-full bg-slate-950 text-slate-200 overflow-hidden font-sans selection:bg-coral-500/30 selection:text-coral-200">
      <aside className="hidden lg:flex flex-col w-72 bg-slate-900/50 border-r border-slate-800/50 backdrop-blur-xl z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-coral-600 flex items-center justify-center shadow-lg shadow-coral-500/20">
            <Compass className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">Startup Hub</h1>
            <p className="text-xs text-slate-400 font-medium">Founder · Active Runway</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-hide">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact 
              ? location.pathname === item.to || location.pathname === item.to + '/'
              : location.pathname.startsWith(item.to);
              
            return (
              <Link
                key={item.to}
                to={item.to}
                className={"w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group " + (isActive ? 'bg-slate-800/80 text-coral-400 shadow-sm' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200')}
              >
                <Icon className={"w-5 h-5 " + (isActive ? 'text-coral-400' : 'text-slate-500 group-hover:text-slate-300')} />
                <span className="font-medium text-sm">{item.label}</span>
                {isActive && (
                  <motion.div layoutId="active-nav" className="absolute left-0 w-1 h-8 bg-coral-500 rounded-r-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col h-full min-w-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
        <header className="h-20 flex-shrink-0 flex items-center justify-between px-6 lg:px-10 border-b border-slate-800/50 backdrop-blur-md z-10">
          <h2 className="text-xl font-bold text-white capitalize">
             {location.pathname.split('/').pop() === 'startup' ? 'Dashboard' : location.pathname.split('/').pop()?.replace('-', ' ')}
          </h2>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 lg:p-10 relative">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

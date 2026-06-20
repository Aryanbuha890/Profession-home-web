import React, { useRef, useState, useEffect } from "react";
import {
  PanelLeft,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Monitor,
  RotateCw,
  Share,
  Plus,
  Copy,
  Grid,
  Compass,
  Layers,
  ListTodo,
  Sparkles,
  Search,
  Bell,
  Check,
  MoreHorizontal,
  Settings,
  ArrowUpRight,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { Logo } from "./Logo";

interface DashboardMockupProps {
  activeProduct: "questly" | "nexora";
}

export function DashboardMockup({ activeProduct }: DashboardMockupProps) {
  if (activeProduct === "questly") {
    return <QuestlyDashboard />;
  } else {
    return <NexoraDashboard />;
  }
}

/* ═══════════════════════════════════════════════════════
   Questly Dashboard (Scaled via ResizeObserver)
   ═══════════════════════════════════════════════════════ */

function QuestlyDashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | string>("auto");

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !innerRef.current) return;
      const containerWidth = containerRef.current.getBoundingClientRect().width;
      const designWidth = 896; // Fixed design width
      const nextScale = Math.min(containerWidth / designWidth, 1);
      setScale(nextScale);
      setHeight(innerRef.current.offsetHeight * nextScale);
    };

    handleResize();

    // Use ResizeObserver to detect container size changes
    const observer = new ResizeObserver(() => {
      handleResize();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Also observe the inner content in case it changes size
    if (innerRef.current) {
      observer.observe(innerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full relative overflow-hidden"
      style={{ height }}
    >
      <div
        ref={innerRef}
        className="absolute left-0 top-0 select-none pointer-events-none"
        style={{
          width: "896px",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {/* Mockup Chrome */}
        <div className="rounded-t-2xl overflow-hidden bg-[#1a1a1c] shadow-[0_-20px_80px_rgba(0,0,0,0.35)] ring-1 ring-white/10 text-left flex flex-col h-[520px]">
          {/* Title bar */}
          <div className="bg-[#242427] border-b border-white/5 px-4 py-2.5 flex items-center justify-between shrink-0">
            {/* Traffic lights */}
            <div className="flex items-center gap-1.5 w-[20%]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>

            {/* Browser Navigation */}
            <div className="flex items-center gap-2 justify-center w-[60%]">
              <div className="flex items-center gap-1 text-white/40 mr-2">
                <PanelLeft className="w-3.5 h-3.5" />
                <ChevronLeft className="w-3.5 h-3.5" />
                <ChevronRight className="w-3.5 h-3.5 text-white/25" />
              </div>
              <div className="bg-[#1a1a1c] rounded-md px-6 py-1 text-[10px] text-white/60 flex items-center gap-1.5 w-52 justify-center">
                <Monitor className="w-3 h-3 text-white/40" />
                <span>questly.ai</span>
              </div>
              <div className="flex items-center gap-1 text-white/40 ml-2">
                <RotateCw className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-2 text-white/40 w-[20%] justify-end">
              <Share className="w-3.5 h-3.5" />
              <Plus className="w-3.5 h-3.5" />
              <Copy className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Browser Workspace Layout */}
          <div className="flex flex-1 overflow-hidden min-h-0">
            {/* Sidebar (22% width) */}
            <aside className="w-[22%] border-r border-white/5 bg-[#1e1e21] px-3 py-3.5 flex flex-col justify-between shrink-0">
              <div className="space-y-4">
                {/* Brand / Logo */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-white/70">
                    <Logo className="w-4 h-4" />
                    <span className="text-[10px] font-bold tracking-tight uppercase">Questly</span>
                  </div>
                  <Grid className="w-3.5 h-3.5 text-white/30" />
                </div>

                {/* Workspace Badge */}
                <div className="flex items-center gap-2 bg-white/[0.04] rounded-lg px-2.5 py-1.5 ring-1 ring-white/5">
                  <div className="w-4 h-4 rounded bg-[#e8553f] flex items-center justify-center text-[10px] text-white font-bold shrink-0">
                    C
                  </div>
                  <span className="text-[10px] text-white/80 font-medium truncate">CareNest</span>
                </div>

                {/* Nav Items */}
                <nav className="space-y-1">
                  {[
                    { icon: Compass, label: "Uncover" },
                    { icon: Layers, label: "Subjects" },
                    { icon: ListTodo, label: "Inbox" },
                  ].map((item, idx) => (
                    <div
                      key={item.label}
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[10px] transition-colors cursor-pointer ${
                        idx === 0
                          ? "bg-white/[0.06] text-white"
                          : "text-white/60 hover:text-white hover:bg-white/[0.02]"
                      }`}
                    >
                      <item.icon className="w-3.5 h-3.5" />
                      <span>{item.label}</span>
                      {idx === 2 && (
                        <span className="ml-auto w-3.5 h-3.5 rounded-full bg-[#febc2e] text-black font-semibold text-[8px] flex items-center justify-center shrink-0">
                          5
                        </span>
                      )}
                    </div>
                  ))}
                </nav>
              </div>

              {/* Recent articles list */}
              <div className="space-y-2">
                <span className="text-[8px] font-bold text-white/30 tracking-wider uppercase block px-1">
                  Ready to Release
                </span>
                <div className="space-y-1.5">
                  {[
                    "Assisted living cost comparison",
                    "Elder care home modifications",
                    "Mobility solutions for home safety",
                  ].map((title) => (
                    <div key={title} className="flex items-center gap-1.5 px-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#28c840]/70 shrink-0" />
                      <span className="text-[9px] text-white/50 truncate hover:text-white/85 cursor-pointer">
                        {title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 bg-[#161618] p-5 flex flex-col gap-4 overflow-y-auto min-h-0">
              {/* Header */}
              <div className="flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#e8553f] flex items-center justify-center text-base text-white font-bold">
                    C
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-white">CareNest</h2>
                    <p className="text-[10px] text-white/45">Active Workspace</p>
                  </div>
                </div>

                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#161618] text-[10px] font-medium hover:bg-white/95 shadow-md">
                  <Sparkles className="w-3 h-3" />
                  <span>Generate</span>
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 divide-x divide-white/5 rounded-xl bg-white/[0.03] ring-1 ring-white/5 p-3 shrink-0">
                {[
                  { value: "62", label: "Posts indexed", sub: "RELEASED" },
                  { value: "12", label: "Subject groups", sub: "BREADTH" },
                  { value: "412", label: "Ready to draft", sub: "REMAINING" },
                  { value: "3.1M", label: "Searches a month", sub: "MAX REACH" },
                ].map((stat) => (
                  <div key={stat.sub} className="px-3">
                    <span className="text-[8px] font-bold tracking-wider text-white/35 block uppercase">
                      {stat.sub}
                    </span>
                    <span className="text-xl font-medium text-white block mt-0.5">
                      {stat.value}
                    </span>
                    <span className="text-[8px] text-white/45 block mt-0.5 truncate">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Subject Cards */}
              <div className="grid grid-cols-3 gap-3 shrink-0">
                {[
                  { title: "Elder Care", desc: "18 drafts generated", score: "89" },
                  { title: "Mobility", desc: "12 drafts generated", score: "94" },
                  { title: "Home Safety", desc: "8 drafts generated", score: "76" },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="rounded-lg bg-white/[0.02] hover:bg-white/[0.04] ring-1 ring-white/5 p-3 flex flex-col justify-between h-20 transition-all cursor-pointer"
                  >
                    <div>
                      <h4 className="text-[10px] font-semibold text-white">{card.title}</h4>
                      <p className="text-[8px] text-white/40 mt-0.5">{card.desc}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[8px] text-white/50">AI Score</span>
                      <span className="text-[10px] font-semibold text-[#28c840]">{card.score}%</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Drafting Inbox Table */}
              <div className="flex-1 rounded-xl bg-white/[0.02] ring-1 ring-white/5 p-3 flex flex-col min-h-0">
                <h3 className="text-[10px] font-bold text-white/80 tracking-wide mb-2 shrink-0">
                  Drafting Inbox
                </h3>
                <div className="flex-1 overflow-y-auto min-h-0">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="border-b border-white/5 text-[8px] font-bold text-white/30 tracking-wider uppercase">
                        <th className="pb-1.5 font-bold">Question</th>
                        <th className="pb-1.5 font-bold text-right">Volume</th>
                        <th className="pb-1.5 font-bold text-right">Difficulty</th>
                        <th className="pb-1.5 font-bold text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[
                        { q: "How much does professional elder care cost?", v: "18.5k", d: "Easy", s: "Drafting", c: "text-[#febc2e]/80" },
                        { q: "Best mobility walkers for rocky pathways", v: "4.2k", d: "Medium", s: "Ready", c: "text-white/60" },
                        { q: "Home modifications checklist for wheelchair use", v: "8.9k", d: "Hard", s: "Ready", c: "text-white/60" },
                        { q: "Signs an elderly parent needs home helper", v: "12k", d: "Easy", s: "Drafting", c: "text-[#febc2e]/80" },
                        { q: "Medicare coverage details for home nurse visits", v: "22k", d: "Hard", s: "Ready", c: "text-white/60" },
                      ].map((row, idx) => (
                        <tr key={idx} className="text-[9px] text-white/70">
                          <td className="py-2 truncate max-w-xs">{row.q}</td>
                          <td className="py-2 text-right">{row.v}</td>
                          <td className="py-2 text-right">{row.d}</td>
                          <td className={`py-2 text-right font-medium ${row.c}`}>{row.s}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   Nexora Dashboard (Frosted Glass style)
   ═══════════════════════════════════════════════════════ */

function NexoraDashboard() {
  return (
    <div
      className="rounded-2xl overflow-hidden p-3 md:p-4 transition-all duration-300 w-full"
      style={{
        background: "rgba(255, 255, 255, 0.4)",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        boxShadow: "0 25px 80px -12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.06)",
      }}
    >
      <div className="rounded-xl overflow-hidden bg-white shadow-xl flex flex-col h-[520px] select-none pointer-events-none text-left">
        {/* Top bar */}
        <div className="h-12 border-b border-slate-100 px-4 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
              N
            </div>
            <span className="text-[11px] font-bold text-slate-800 tracking-tight">Nexora</span>
            <ChevronDown className="w-3 h-3 text-slate-400 -ml-1" />
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-xs mx-4 bg-slate-50 border border-slate-100 rounded-md py-1 px-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Search className="w-3.5 h-3.5" />
              <span className="text-[10px]">Search workflows...</span>
            </div>
            <kbd className="text-[8px] bg-white border border-slate-200 px-1 py-0.5 rounded text-slate-400 shadow-2xs">
              ⌘K
            </kbd>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button className="rounded-full bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-semibold px-3 py-1 flex items-center gap-1.5">
              <span>Move Money</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
            <Bell className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" />
            <div className="w-6 h-6 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 flex items-center justify-center font-semibold text-[10px] shrink-0">
              JB
            </div>
          </div>
        </div>

        {/* Dashboard layout */}
        <div className="flex flex-1 overflow-hidden min-h-0">
          {/* Sidebar */}
          <aside className="w-40 border-r border-slate-100 bg-slate-50/50 p-2.5 flex flex-col justify-between shrink-0">
            <div className="space-y-4">
              <nav className="space-y-0.5">
                {[
                  { label: "Home", active: true },
                  { label: "Tasks", badge: "10" },
                  { label: "Transactions" },
                  { label: "Payments", hasSub: true },
                  { label: "Cards" },
                  { label: "Capital" },
                  { label: "Accounts", hasSub: true },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-[10px] font-medium transition-colors cursor-pointer ${
                      item.active
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-500 hover:bg-slate-100/60 hover:text-slate-800"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-bold text-[8px] ring-1 ring-indigo-100/50">
                        {item.badge}
                      </span>
                    )}
                    {item.hasSub && (
                      <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
                    )}
                  </div>
                ))}
              </nav>

              {/* Workflows */}
              <div className="space-y-1">
                <span className="text-[8px] font-bold text-slate-400 tracking-wider uppercase block px-2.5">
                  Workflows
                </span>
                {["Trade rules", "Payments", "Notifications", "Settings"].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] text-slate-500 hover:text-slate-800 hover:bg-slate-100/40 cursor-pointer"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Support info */}
            <div className="flex items-center gap-1.5 px-2.5 py-2 border-t border-slate-100 text-[9px] text-slate-400">
              <Settings className="w-3 h-3" />
              <span>System Settings</span>
            </div>
          </aside>

          {/* Main workspace */}
          <main className="flex-1 bg-slate-50/20 p-5 flex flex-col gap-4 overflow-y-auto min-h-0">
            {/* Greeting */}
            <div className="flex items-center justify-between shrink-0">
              <div>
                <h1 className="text-sm font-bold text-slate-900">Welcome, Jane</h1>
                <p className="text-[10px] text-slate-400">Your automation network is operational</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-1.5 shrink-0">
              {[
                { label: "Send", primary: true },
                { label: "Request" },
                { label: "Transfer" },
                { label: "Deposit" },
                { label: "Pay Bill" },
                { label: "Create Invoice" },
                { label: "Customize", ghost: true },
              ].map((btn) => (
                <button
                  key={btn.label}
                  className={`px-3 py-1 rounded-full text-[9px] font-bold transition-colors shadow-2xs ${
                    btn.primary
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : btn.ghost
                      ? "text-slate-400 hover:text-slate-600 bg-transparent border-0 shadow-none"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Two equal-width cards side by side */}
            <div className="flex gap-4 shrink-0">
              {/* Balance card */}
              <div className="flex-1 bg-white border border-slate-100 rounded-xl p-3.5 flex flex-col justify-between h-40 shadow-xs relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                    <span>Mercury Balance</span>
                    <Check className="w-3 h-3 text-indigo-500 bg-indigo-50 rounded-full p-0.5 shrink-0" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    $8,450,190
                    <span className="text-xs font-semibold text-slate-400">.32</span>
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-[9px]">
                    <span className="text-emerald-600 font-semibold">+$1.8M</span>
                    <span className="text-rose-500 font-semibold">-$900k</span>
                    <span className="text-slate-400">Last 30 Days</span>
                  </div>
                </div>

                {/* Handcrafted Cubic Bezier SVG Area Chart */}
                <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 30 C15 25, 25 10, 40 15 C55 20, 65 5, 80 8 C90 10, 95 2, 100 5 L100 40 L0 40 Z"
                      fill="url(#chartGlow)"
                    />
                    <path
                      d="M0 30 C15 25, 25 10, 40 15 C55 20, 65 5, 80 8 C90 10, 95 2, 100 5"
                      fill="none"
                      stroke="#4f46e5"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </div>

              {/* Accounts card */}
              <div className="flex-1 bg-white border border-slate-100 rounded-xl p-3.5 flex flex-col justify-between h-40 shadow-xs">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold tracking-wider uppercase shrink-0">
                  <span>Accounts</span>
                  <div className="flex items-center gap-1.5">
                    <Plus className="w-3.5 h-3.5 hover:text-slate-600 cursor-pointer" />
                    <MoreHorizontal className="w-3.5 h-3.5 hover:text-slate-600 cursor-pointer" />
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-center gap-1.5 my-2">
                  {[
                    { type: "Credit", amount: "$98,125.50" },
                    { type: "Treasury", amount: "$6,750,200.00" },
                    { type: "Operations", amount: "$1,592,864.82" },
                  ].map((row) => (
                    <div key={row.type} className="flex justify-between items-center text-[10px] py-1 px-1.5 hover:bg-slate-50 rounded transition-colors">
                      <span className="text-slate-500 font-medium">{row.type}</span>
                      <span className="text-slate-900 font-bold">{row.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Transactions table */}
            <div className="flex-1 bg-white border border-slate-100 rounded-xl p-3.5 flex flex-col min-h-0 shadow-xs">
              <h3 className="text-[10px] font-bold text-slate-700 tracking-wide mb-2 shrink-0">
                Recent Transactions
              </h3>
              <div className="flex-1 overflow-y-auto min-h-0">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-slate-100 text-[8px] font-bold text-slate-400 tracking-wider uppercase">
                      <th className="pb-1.5 font-bold">Description</th>
                      <th className="pb-1.5 font-bold text-right">Amount</th>
                      <th className="pb-1.5 font-bold text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[
                      { desc: "AWS Cloud Infrastructure", amt: "-$5,200.00", stat: "Pending", stStyle: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/10" },
                      { desc: "Client Payment (Acme Corp)", amt: "+$125,000.00", stat: "Completed", stStyle: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10" },
                      { desc: "Monthly Payroll Batch", amt: "-$85,450.00", stat: "Completed", stStyle: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10" },
                      { desc: "Office Supplies Depot", amt: "-$1,200.00", stat: "Completed", stStyle: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10" },
                    ].map((row, idx) => (
                      <tr key={idx} className="text-[10px] text-slate-600 hover:bg-slate-50/50">
                        <td className="py-2.5 truncate max-w-xs">{row.desc}</td>
                        <td className="py-2.5 text-right font-bold text-slate-800">{row.amt}</td>
                        <td className="py-2.5 text-right">
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-semibold inline-block ${row.stStyle}`}>
                            {row.stat}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

import React, { useRef, useState, useEffect } from "react";
import {
  PanelLeft,
  ChevronLeft,
  ChevronRight,
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
  Brain,
  Users,
  LineChart,
} from "lucide-react";
import { Logo } from "./Logo";

export function PHDashboardMockup() {
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

    const observer = new ResizeObserver(() => {
      handleResize();
    });

    if (containerRef.current) observer.observe(containerRef.current);
    if (innerRef.current) observer.observe(innerRef.current);

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
        {/* Mockup Browser Window */}
        <div className="rounded-2xl overflow-hidden bg-white shadow-[0_25px_80px_-12px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.06)] border border-slate-200/80 flex flex-col h-[520px] text-left">
          {/* Title bar */}
          <div className="bg-slate-50 border-b border-slate-100 px-4 py-2.5 flex items-center justify-between shrink-0">
            {/* Traffic lights */}
            <div className="flex items-center gap-1.5 w-[20%]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>

            {/* Browser Navigation */}
            <div className="flex items-center gap-2 justify-center w-[60%]">
              <div className="flex items-center gap-1 text-slate-400 mr-2">
                <PanelLeft className="w-3.5 h-3.5" />
                <ChevronLeft className="w-3.5 h-3.5" />
                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              </div>
              <div className="bg-white border border-slate-200 rounded-md px-6 py-1 text-[10px] text-slate-500 flex items-center gap-1.5 w-60 justify-center shadow-2xs">
                <Monitor className="w-3 h-3 text-slate-400" />
                <span>app.professionalhome.ai</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400 ml-2">
                <RotateCw className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-2 text-slate-400 w-[20%] justify-end">
              <Share className="w-3.5 h-3.5" />
              <Plus className="w-3.5 h-3.5" />
              <Copy className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Browser Workspace Layout */}
          <div className="flex flex-1 overflow-hidden min-h-0">
            {/* Sidebar (22% width) */}
            <aside className="w-[22%] border-r border-slate-100 bg-slate-50/50 px-3 py-3.5 flex flex-col justify-between shrink-0">
              <div className="space-y-4">
                {/* Brand / Logo */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-800">
                    <Logo className="scale-75 origin-left" />
                  </div>
                </div>

                {/* Workspace Badge */}
                <div className="flex items-center gap-2 bg-white rounded-lg px-2.5 py-1.5 ring-1 ring-slate-100 shadow-2xs">
                  <div className="w-4 h-4 rounded bg-indigo-600 flex items-center justify-center text-[10px] text-white font-bold shrink-0">
                    J
                  </div>
                  <span className="text-[10px] text-slate-700 font-semibold truncate">Jane's Growth</span>
                </div>

                {/* Nav Items */}
                <nav className="space-y-0.5">
                  {[
                    { icon: Brain, label: "AI Diagnostic", active: true },
                    { icon: Users, label: "Mentors" },
                    { icon: Compass, label: "Execution Map" },
                    { icon: Layers, label: "Domains" },
                    { icon: ListTodo, label: "Action Plan", badge: "4" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[10px] font-semibold transition-colors cursor-pointer ${
                        item.active
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-slate-500 hover:text-slate-800 hover:bg-slate-100/40"
                      }`}
                    >
                      <item.icon className={`w-3.5 h-3.5 ${item.active ? "text-indigo-600" : "text-slate-400"}`} />
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold text-[8px] ring-1 ring-amber-100/50">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  ))}
                </nav>
              </div>

              {/* Status footer inside sidebar */}
              <div className="space-y-2 border-t border-slate-100 pt-3">
                <span className="text-[8px] font-bold text-slate-400 tracking-wider uppercase block px-1">
                  Active Timelines
                </span>
                <div className="space-y-1.5">
                  {[
                    { label: "Situation Diagnostic", color: "bg-emerald-500" },
                    { label: "Expert Matching", color: "bg-indigo-500" },
                  ].map((timeline) => (
                    <div key={timeline.label} className="flex items-center gap-1.5 px-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${timeline.color} shrink-0`} />
                      <span className="text-[9px] text-slate-500 truncate hover:text-slate-800 cursor-pointer">
                        {timeline.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 bg-white p-5 flex flex-col gap-4 overflow-y-auto min-h-0">
              {/* Header */}
              <div className="flex items-center justify-between shrink-0">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Professional Command Center</h2>
                  <p className="text-[10px] text-slate-400">Diagnosis & Execution Pipeline</p>
                </div>

                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-semibold hover:bg-slate-800 shadow-sm">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  <span>AI Insights</span>
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 divide-x divide-slate-100 rounded-xl bg-slate-50/50 border border-slate-100 p-3 shrink-0">
                {[
                  { value: "92%", label: "Diagnostic Score", sub: "ASSESSMENT" },
                  { value: "12", label: "Experts Matched", sub: "NETWORK" },
                  { value: "4", label: "Milestones Pending", sub: "REMAINING" },
                  { value: "+18%", label: "Career Velocity", sub: "MAX GROWTH" },
                ].map((stat) => (
                  <div key={stat.sub} className="px-3">
                    <span className="text-[8px] font-bold tracking-wider text-slate-400 block uppercase">
                      {stat.sub}
                    </span>
                    <span className="text-lg font-bold text-slate-900 block mt-0.5">
                      {stat.value}
                    </span>
                    <span className="text-[8px] text-slate-500 block mt-0.5 truncate">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Two equal-width cards side by side */}
              <div className="flex gap-4 shrink-0">
                {/* Growth Chart Card */}
                <div className="flex-1 bg-white border border-slate-100 rounded-xl p-3.5 flex flex-col justify-between h-40 shadow-xs relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                      <span>Skill Expansion</span>
                      <Check className="w-3 h-3 text-indigo-600 bg-indigo-50 rounded-full p-0.5 shrink-0" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">
                      Level 4
                      <span className="text-xs font-semibold text-slate-400 ml-1">Qualified Analyst</span>
                    </h3>
                  </div>

                  {/* Cubic Bezier SVG area chart */}
                  <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="growthGlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0 35 C20 30, 35 15, 50 18 C65 20, 80 5, 100 2 L100 40 L0 40 Z"
                        fill="url(#growthGlow)"
                      />
                      <path
                        d="M0 35 C20 30, 35 15, 50 18 C65 20, 80 5, 100 2"
                        fill="none"
                        stroke="#4f46e5"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                </div>

                {/* Milestone List Card */}
                <div className="flex-1 bg-white border border-slate-100 rounded-xl p-3.5 flex flex-col justify-between h-40 shadow-xs">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold tracking-wider uppercase shrink-0">
                    <span>Recent Actions</span>
                    <div className="flex items-center gap-1.5">
                      <Plus className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" />
                      <MoreHorizontal className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-center gap-1.5 my-2">
                    {[
                      { type: "AI Profile Assessment", status: "Done" },
                      { type: "Expert Consultation Session", status: "Scheduled" },
                      { type: "Milestone Roadmap Generation", status: "Active" },
                    ].map((row) => (
                      <div key={row.type} className="flex justify-between items-center text-[10px] py-1 px-1.5 hover:bg-slate-50 rounded transition-colors">
                        <span className="text-slate-500 font-medium">{row.type}</span>
                        <span className={`font-semibold ${row.status === "Done" ? "text-emerald-600" : "text-indigo-600"}`}>{row.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Transactions / Tasks table */}
              <div className="flex-1 rounded-xl bg-slate-50/50 border border-slate-100 p-3 flex flex-col min-h-0">
                <h3 className="text-[10px] font-bold text-slate-700 tracking-wide mb-2 shrink-0">
                  Target Achievements
                </h3>
                <div className="flex-1 overflow-y-auto min-h-0">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="border-b border-slate-200 text-[8px] font-bold text-slate-400 tracking-wider uppercase">
                        <th className="pb-1.5 font-bold">Goal / Objective</th>
                        <th className="pb-1.5 font-bold text-right">Progress</th>
                        <th className="pb-1.5 font-bold text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { q: "Publish research paper on deep neural nets", p: "75%", s: "In Progress", c: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/10" },
                        { q: "Establish university partnership for incubator", p: "100%", s: "Completed", c: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10" },
                        { q: "Establish mentoring hours with expert networks", p: "20%", s: "Pending", c: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/10" },
                        { q: "Conduct initial business validation study", p: "100%", s: "Completed", c: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10" },
                      ].map((row, idx) => (
                        <tr key={idx} className="text-[10px] text-slate-600">
                          <td className="py-2 truncate max-w-xs">{row.q}</td>
                          <td className="py-2 text-right font-medium">{row.p}</td>
                          <td className="py-2 text-right">
                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-semibold inline-block ${row.c}`}>
                              {row.s}
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
    </div>
  );
}

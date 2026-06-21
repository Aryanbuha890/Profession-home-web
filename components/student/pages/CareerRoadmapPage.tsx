'use client';

import React, { useState } from "react";
import { ArrowLeft, Bell, Calendar, ChevronLeft, ChevronRight, Edit3, HelpCircle, Mail, Phone, Plus, Star, User, UserCheck, X, Check, Play, Compass } from "lucide-react";
import { Page } from "@/components/app/Page";
import { PageHero } from "@/components/research/premium";

interface MentorAdvisor {
  id: string;
  name: string;
  role: string;
  avatar: string;
  avatarColor: string;
}

interface RoadmapBlock {
  id: string;
  day: number; // 0: Sunday, 1: Monday, 2: Tuesday, 3: Wednesday, 4: Thursday, 5: Friday, 6: Saturday
  time: string;
  startHour: number; // For vertical positioning e.g. 8 for 8:00
  durationHours: number;
  title: string;
  subtitle: string;
  color: string; // Tailwind bg color class
  borderColor: string;
  textColor: string;
  participants?: string;
}

const mentorsList: MentorAdvisor[] = [
  { id: "d1", name: "Dr. Clarence Hamilton", role: "Lead Tech Advisor", avatar: "👨‍💻", avatarColor: "bg-teal-500/20 text-teal-400 border-teal-500/20" },
  { id: "d2", name: "Dr. Brett Hoffman", role: "System Architect", avatar: "🛡️", avatarColor: "bg-indigo-500/20 text-indigo-400 border-indigo-500/20" },
  { id: "d3", name: "Dr. Miguel Leonard", role: "Database Specialist", avatar: "💾", avatarColor: "bg-sky-500/20 text-sky-400 border-sky-500/20" },
  { id: "d4", name: "Dr. Mamie Holloway", role: "UX/UI Director", avatar: "🎨", avatarColor: "bg-rose-500/20 text-rose-400 border-rose-500/20" },
];

const initialBlocks: RoadmapBlock[] = [
  {
    id: "b1",
    day: 0,
    time: "8:00-9:15",
    startHour: 8,
    durationHours: 1.25,
    title: "System Design Sync",
    subtitle: "8:00-9:15 AM",
    color: "bg-teal-950/30 border-teal-500/40 text-teal-300",
    borderColor: "border-teal-500/40",
    textColor: "text-teal-300",
  },
  {
    id: "b2",
    day: 1,
    time: "11:00-12:00",
    startHour: 11,
    durationHours: 1,
    title: "React Performance Audit",
    subtitle: "11:00-12:00 PM",
    color: "bg-sky-950/30 border-sky-500/40 text-sky-300",
    borderColor: "border-sky-500/40",
    textColor: "text-sky-300",
  },
  {
    id: "b3",
    day: 3,
    time: "9:00-11:40",
    startHour: 9,
    durationHours: 2.6,
    title: "Vite & SSR Implementation",
    subtitle: "9:00-11:40 AM",
    color: "bg-amber-950/30 border-amber-500/40 text-amber-300",
    borderColor: "border-amber-500/40",
    textColor: "text-amber-300",
    participants: "🧑‍💻 +3 peers",
  },
  {
    id: "b4",
    day: 4,
    time: "9:00-10:30",
    startHour: 9,
    durationHours: 1.5,
    title: "Database Indexing Audit",
    subtitle: "9:00-10:30 AM",
    color: "bg-sky-950/30 border-sky-500/40 text-sky-300",
    borderColor: "border-sky-500/40",
    textColor: "text-sky-300",
  },
  {
    id: "b5",
    day: 4,
    time: "12:00-13:30",
    startHour: 12,
    durationHours: 1.5,
    title: "Resume Refactoring Session",
    subtitle: "12:00-13:30 PM",
    color: "bg-indigo-950/30 border-indigo-500/40 text-indigo-300",
    borderColor: "border-indigo-500/40",
    textColor: "text-indigo-300",
  },
  {
    id: "b6",
    day: 5,
    time: "11:00-12:15",
    startHour: 11,
    durationHours: 1.25,
    title: "Mock Interview Session",
    subtitle: "11:00-12:15 PM",
    color: "bg-teal-950/30 border-teal-500/40 text-teal-300",
    borderColor: "border-teal-500/40",
    textColor: "text-teal-300",
  },
  {
    id: "b7",
    day: 5,
    time: "14:00-15:30",
    startHour: 14,
    durationHours: 1.5,
    title: "Algorithmic Review Sprint",
    subtitle: "14:00-15:30 PM",
    color: "bg-indigo-950/30 border-indigo-500/40 text-indigo-300",
    borderColor: "border-indigo-500/40",
    textColor: "text-indigo-300",
  },
];

function CareerRoadmapPage() {
  const [blocks, setBlocks] = useState<RoadmapBlock[]>(initialBlocks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDay, setNewDay] = useState(3);
  const [newStartHour, setNewStartHour] = useState(9);
  const [newDuration, setNewDuration] = useState(1);
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(19);
  const [activeView, setActiveView] = useState("timeline");

  // Recommended tasks list (adaptation of "Write prescription to patient")
  const [tasks, setTasks] = useState([
    { id: "t1", text: "Complete Security Audit challenge", checked: true },
    { id: "t2", text: "Schedule mock interview with Dr. Sarah", checked: false },
    { id: "t3", text: "Submit Vite configuration logs", checked: false },
    { id: "t4", text: "Optimize Postgres index layouts", checked: false },
  ]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t)));
  };

  const handleAddBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    // Pick random colors
    const colors = [
      { bg: "bg-teal-950/30", border: "border-teal-500/40", text: "text-teal-300" },
      { bg: "bg-sky-950/30", border: "border-sky-500/40", text: "text-sky-300" },
      { bg: "bg-indigo-950/30", border: "border-indigo-500/40", text: "text-indigo-300" },
    ];
    const design = colors[Math.floor(Math.random() * colors.length)];

    const endH = Number(newStartHour) + Number(newDuration);
    const newBlock: RoadmapBlock = {
      id: `block-${Date.now()}`,
      day: Number(newDay),
      time: `${newStartHour}:00-${endH}:00`,
      startHour: Number(newStartHour),
      durationHours: Number(newDuration),
      title: newTitle,
      subtitle: `${newStartHour}:00 - ${endH}:00`,
      color: `${design.bg} ${design.border} ${design.text}`,
      borderColor: design.border,
      textColor: design.text,
    };

    setBlocks([...blocks, newBlock]);
    setIsModalOpen(false);
    setNewTitle("");
  };

  const daysOfWeek = [
    { name: "Sunday", short: "Sun", date: 16 },
    { name: "Monday", short: "Mon", date: 17 },
    { name: "Tuesday", short: "Tue", date: 18 },
    { name: "Wednesday", short: "Wed", date: 19 },
    { name: "Thursday", short: "Thu", date: 20 },
    { name: "Friday", short: "Fri", date: 21 },
    { name: "Saturday", short: "Sat", date: 22 },
  ];

  const hoursList = [8, 9, 10, 11, 12, 13, 14, 15];

  return (
    <Page title="Career Roadmap" subtitle="Plan, track, and master the milestones required to hit your dream career objectives.">
      <PageHero
        badge="Student Workspace"
        title="Career Roadmap"
        subtitle="Plan, track, and master the milestones required to hit your dream career objectives."
        accent="#38bdf8"
      >
        <div className="flex bg-slate-900/60 p-1 rounded-xl border border-white/5 w-fit mt-4 md:mt-0">
          <button
            onClick={() => setActiveView("journey")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
              activeView === "journey"
                ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-slate-950 font-bold shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Compass className="w-3.5 h-3.5" /> Journey
          </button>
          <button
            onClick={() => setActiveView("timeline")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
              activeView === "timeline"
                ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-slate-950 font-bold shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Calendar className="w-3.5 h-3.5" /> Timeline
          </button>
        </div>
      </PageHero>

      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-xl bg-slate-900/60 border border-white/5 hover:border-slate-800 text-slate-400 hover:text-white transition">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-white font-display">Weekly Roadmap</h1>
              <p className="text-slate-500 text-xs mt-0.5">Software Engineering Path Tracking</p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button className="text-xs text-sky-400 hover:text-sky-300 font-semibold transition bg-sky-500/5 border border-sky-500/10 px-3.5 py-1.5 rounded-xl cursor-pointer">
              Roadmap Archive History ▾
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-sky-600 hover:bg-sky-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition duration-200 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-slate-950 stroke-[3]" /> Add roadmap goal
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          <div className="lg:col-span-3 space-y-6">
            <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 flex flex-col md:flex-row gap-6 justify-between shadow-[0_4px_35px_rgba(0,0,0,0.5)]">
              <div className="flex gap-4 items-center md:border-r border-white/5 pr-6 shrink-0">
                <div className="relative">
                  <div className="w-18 h-18 rounded-3xl bg-sky-500 flex items-center justify-center text-4xl shadow-md border-2 border-white/10 shrink-0">
                    🧑‍🚀
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#05060F] flex items-center justify-center text-[10px] font-bold text-[#05060F]">
                    L4
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display leading-tight">Aryan Patel</h3>
                  <p className="text-[10px] text-slate-400 font-medium">Software Engineer • 21 yrs old</p>
                  <div className="flex gap-4 mt-2">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Progress</span>
                      <span className="text-xs font-bold text-white">85%</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Milestones</span>
                      <span className="text-xs font-bold text-white">8/10</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Role Rank</span>
                      <span className="text-xs font-bold text-sky-400">A+</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 flex-1 pr-6 md:border-r border-white/5 md:pl-4">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold flex items-center gap-1">
                    <Phone className="w-3 h-3" /> Contact Line
                  </span>
                  <span className="text-xs text-slate-300 font-semibold block mt-1">+91 (0) 90999 55555</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold flex items-center gap-1">
                    <Mail className="w-3 h-3" /> Path Email
                  </span>
                  <span className="text-xs text-slate-300 font-semibold block mt-1 truncate">aryan@student.os</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                    Track Identifier
                  </span>
                  <span className="text-xs text-slate-300 font-semibold block mt-1">SE-900342678</span>
                </div>
                <div className="col-span-2 md:col-span-3">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">
                    Path Focus Area
                  </span>
                  <span className="text-xs text-slate-300 font-semibold block mt-1 leading-relaxed">
                    Distributed Systems, React SSR Architectures, PostgreSQL optimization & Scaling.
                  </span>
                </div>
              </div>

              <div className="md:pl-4 min-w-[150px] shrink-0">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block mb-1">
                  Completed Milestones
                </span>
                <div className="space-y-1 text-slate-400 text-xs">
                  <p className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-400 shrink-0" /> API Specifications</p>
                  <p className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-400 shrink-0" /> database Migrations</p>
                  <p className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-400 shrink-0" /> UI Foundations</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-slate-900/20 p-6 space-y-4">
              <div className="grid grid-cols-8 gap-2 border-b border-white/5 pb-4 text-center items-center">
                <div className="text-left">
                  <span className="text-xs text-slate-500 block uppercase font-extrabold tracking-wider">Time</span>
                </div>
                {daysOfWeek.map((day) => {
                  const isActive = day.date === selectedCalendarDay;
                  return (
                    <button
                      key={day.date}
                      onClick={() => setSelectedCalendarDay(day.date)}
                      className={`flex flex-col items-center p-2 rounded-xl transition cursor-pointer ${
                        isActive 
                          ? "bg-sky-600/15 border border-sky-500/30 text-white" 
                          : "text-slate-400 hover:text-white hover:bg-white/[0.02] border border-transparent"
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider block">{day.short}</span>
                      <span className={`text-base font-black font-display block mt-0.5 ${isActive ? "text-sky-400" : "text-slate-300"}`}>
                        {day.date}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="relative min-h-[420px] pt-2">
                <div className="absolute inset-0 pointer-events-none z-0">
                  {hoursList.map((hour, idx) => (
                    <div
                      key={hour}
                      className="absolute left-0 right-0 border-b border-white/[0.03] border-dashed"
                      style={{ top: `${idx * 45 + 24}px` }}
                    />
                  ))}
                </div>

                <div className="absolute left-[12.5%] right-0 z-10 pointer-events-none flex items-center" style={{ top: "58px" }}>
                  <span className="text-[9px] font-bold text-sky-400 bg-[#05060F] border border-sky-500/20 px-1.5 py-0.5 rounded mr-1.5 z-20">
                    8:45
                  </span>
                  <div className="flex-1 h-[2px] bg-sky-500/70 shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
                </div>

                <div className="grid grid-cols-8 gap-2 relative z-10 h-full">
                  <div className="col-span-1 relative h-full">
                    {hoursList.map((hour, idx) => (
                      <div key={hour} className="absolute text-[10px] text-slate-500 font-semibold font-mono leading-none" style={{ top: `${idx * 45 + 20}px` }}>
                        {hour === 12 ? "12:00 PM" : hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
                      </div>
                    ))}
                  </div>

                  {Array.from({ length: 7 }).map((_, dayIndex) => {
                    const dayBlocks = blocks.filter((b) => b.day === dayIndex);
                    return (
                      <div key={dayIndex} className="col-span-1 relative h-full">
                        {dayBlocks.map((block) => {
                          const startHourOffset = block.startHour - 8;
                          const topOffset = startHourOffset * 45 + 14;
                          const heightPixels = block.durationHours * 45 - 6;
                          return (
                            <div
                              key={block.id}
                              className={`absolute left-0 right-0 rounded-xl border p-2 flex flex-col justify-between transition group cursor-pointer hover:brightness-125 select-none ${block.color} shadow-[0_4px_12px_rgba(0,0,0,0.5)]`}
                              style={{
                                top: `${topOffset}px`,
                                height: `${heightPixels}px`,
                              }}
                            >
                              <div>
                                <h4 className="font-bold text-[10px] leading-tight font-display truncate">
                                  {block.title}
                                </h4>
                                <p className="text-[8px] opacity-75 mt-0.5 truncate">{block.subtitle}</p>
                              </div>
                              {block.participants && (
                                <span className="text-[8px] bg-slate-950/40 border border-white/5 text-slate-300 px-1 py-0.5 rounded w-fit mt-1 self-start font-semibold">
                                  {block.participants}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-4 space-y-3 shadow-md">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-white font-display">June 2026</span>
                <div className="flex items-center gap-1">
                  <button className="p-1 rounded bg-slate-950 border border-white/5 text-slate-400 hover:text-white transition">
                    <ChevronLeft className="w-3 h-3" />
                  </button>
                  <button className="p-1 rounded bg-slate-950 border border-white/5 text-slate-400 hover:text-white transition">
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-[9px] text-center font-bold text-slate-500">
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                  <span key={`${d}-${i}`} className="uppercase text-[8px] text-slate-600 font-extrabold">{d}</span>
                ))}
                {Array.from({ length: 31 }).map((_, i) => {
                  const dateNum = i + 1;
                  const isSelected = dateNum === selectedCalendarDay;
                  return (
                    <button
                      key={`cal-day-${dateNum}`}
                      onClick={() => setSelectedCalendarDay(dateNum)}
                      className={`h-5 w-5 rounded-md flex items-center justify-center font-semibold transition cursor-pointer mx-auto ${
                        isSelected 
                          ? "bg-sky-500 text-slate-950 font-black shadow-sm" 
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {dateNum}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-slate-900/40 p-4 space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-xs font-bold text-white font-display">Path Mentors</span>
                <button className="text-[10px] text-slate-500 hover:text-slate-300 transition uppercase font-semibold">
                  See all
                </button>
              </div>

              <div className="space-y-3">
                {mentorsList.map((mentor) => (
                  <div key={mentor.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${mentor.avatarColor} flex items-center justify-center text-sm shrink-0 border border-white/10`}>
                        {mentor.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-white text-[11px] leading-tight truncate group-hover:text-sky-400 transition-colors">
                          {mentor.name}
                        </p>
                        <p className="text-[9px] text-slate-500 mt-0.5 truncate">{mentor.role}</p>
                      </div>
                    </div>
                    <button className="p-1 rounded bg-slate-950 border border-white/5 text-slate-400 hover:text-white transition">
                      <Mail className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-slate-900/40 to-sky-950/10 p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-white font-display">Roadmap checklist</span>
                <button className="p-1.5 rounded-lg bg-slate-950 border border-white/5 text-slate-400 hover:text-white transition">
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-[10px] text-slate-400 leading-normal">
                Recommended actions to unlock Phase 5 evaluation gates.
              </p>

              <div className="space-y-2 pt-1">
                {tasks.map((task) => (
                  <label
                    key={task.id}
                    className="flex items-start gap-2.5 text-[11px] text-slate-300 font-medium select-none cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={task.checked}
                      onChange={() => toggleTask(task.id)}
                      className="w-3.5 h-3.5 mt-0.5 bg-slate-950 border border-white/10 rounded accent-sky-500 cursor-pointer"
                    />
                    <span className={`group-hover:text-white transition ${task.checked ? "line-through text-slate-500" : ""}`}>
                      {task.text}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 animate-in fade-in zoom-in duration-300">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-white text-lg font-display">Schedule roadmap Goal</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Insert a new learning block or mock target into the grid.</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-xl bg-slate-950 border border-white/5 text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddBlock} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">
                    Goal / Class Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. System Design Sync, Mock Interview..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-[#05060F] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider block">
                    Select Day
                  </label>
                  <select
                    value={newDay}
                    onChange={(e) => setNewDay(Number(e.target.value))}
                    className="w-full bg-[#05060F] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    {daysOfWeek.map((d, index) => (
                      <option key={d.date} value={index}>{d.name} {d.date}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider block">
                      Start Hour
                    </label>
                    <select
                      value={newStartHour}
                      onChange={(e) => setNewStartHour(Number(e.target.value))}
                      className="w-full bg-[#05060F] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                    >
                      {hoursList.map((h) => (
                        <option key={h} value={h}>
                          {h === 12 ? "12:00 PM" : h > 12 ? `${h - 12}:00 PM` : `${h}:00 AM`}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider block">
                      Duration (Hrs)
                    </label>
                    <select
                      value={newDuration}
                      onChange={(e) => setNewDuration(Number(e.target.value))}
                      className="w-full bg-[#05060F] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                    >
                      <option value="1">1 Hour</option>
                      <option value="1.5">1.5 Hours</option>
                      <option value="2">2 Hours</option>
                      <option value="2.5">2.5 Hours</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-indigo-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg hover:scale-[1.01] active:scale-[0.99] transition duration-200 cursor-pointer"
                >
                  Schedule Goal Target
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
}

export { CareerRoadmapPage };

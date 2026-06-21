'use client';

import React, { useState, useEffect } from "react";
import { Search, Trophy, Gift, Award, Flame, Star, ArrowUpDown, ChevronUp, ChevronDown, CheckCircle, HelpCircle } from "lucide-react";
import { Page } from "@/components/app/Page";
import { PageHero } from "@/components/research/premium";


interface LeaderboardUser {
  rank: number;
  name: string;
  username: string;
  id: string;
  avatar: string;
  avatarColor: string;
  wins: number;
  matches: number;
  points: number;
  presents: number;
  gems: number;
  spentTime: number;
  victories: number;
  bestWin: string;
}

const initialLeaderboardData: LeaderboardUser[] = [
  {
    rank: 1,
    name: "Blademir Malina Tori",
    username: "@popy_bob",
    id: "1587667",
    avatar: "👨‍🎤",
    avatarColor: "from-fuchsia-500 to-purple-600",
    wins: 443,
    matches: 778,
    points: 44872,
    presents: 32421,
    gems: 17500,
    spentTime: 778,
    victories: 43,
    bestWin: "1:05",
  },
  {
    rank: 2,
    name: "Robert Fox",
    username: "@robert_fox",
    id: "1587634",
    avatar: "🎯",
    avatarColor: "from-green-400 to-emerald-600",
    wins: 440,
    matches: 887,
    points: 42515,
    presents: 31001,
    gems: 17421,
    spentTime: 887,
    victories: 43,
    bestWin: "1:03",
  },
  {
    rank: 3,
    name: "Molida Glinda",
    username: "@molida_glinda",
    id: "1587699",
    avatar: "⚡",
    avatarColor: "from-red-400 to-rose-600",
    wins: 412,
    matches: 756,
    points: 40550,
    presents: 30987,
    gems: 17224,
    spentTime: 756,
    victories: 43,
    bestWin: "1:15",
  },
  {
    rank: 4,
    name: "Albert Flores",
    username: "@albert_flores",
    id: "1587712",
    avatar: "🚀",
    avatarColor: "from-sky-400 to-blue-600",
    wins: 389,
    matches: 720,
    points: 38900,
    presents: 28450,
    gems: 15200,
    spentTime: 710,
    victories: 38,
    bestWin: "1:22",
  },
  {
    rank: 5,
    name: "Jane Cooper",
    username: "@jane_cooper",
    id: "1587823",
    avatar: "💎",
    avatarColor: "from-pink-400 to-rose-500",
    wins: 375,
    matches: 698,
    points: 37120,
    presents: 27100,
    gems: 14800,
    spentTime: 690,
    victories: 35,
    bestWin: "1:10",
  },
  {
    rank: 6,
    name: "Cody Fisher",
    username: "@cody_fisher",
    id: "1587901",
    avatar: "🎨",
    avatarColor: "from-amber-400 to-orange-500",
    wins: 362,
    matches: 715,
    points: 35400,
    presents: 25300,
    gems: 13900,
    spentTime: 702,
    victories: 33,
    bestWin: "1:40",
  },
  {
    rank: 7,
    name: "Esther Howard",
    username: "@esther_howard",
    id: "1587944",
    avatar: "🌟",
    avatarColor: "from-teal-400 to-cyan-500",
    wins: 345,
    matches: 650,
    points: 33200,
    presents: 24000,
    gems: 12500,
    spentTime: 645,
    victories: 30,
    bestWin: "1:18",
  },
  {
    rank: 8,
    name: "Ronald Richards",
    username: "@ronald_richards",
    id: "1587989",
    avatar: "👾",
    avatarColor: "from-indigo-400 to-violet-600",
    wins: 320,
    matches: 630,
    points: 31500,
    presents: 22500,
    gems: 11800,
    spentTime: 620,
    victories: 28,
    bestWin: "1:25",
  },
];

function AchievementVaultPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>(initialLeaderboardData);
  const [sortBy, setSortBy] = useState<keyof LeaderboardUser>("points");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Countdown timer logic (starting at 12 Days, 6 Hours, 42 Minutes)
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 6,
    minutes: 42,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSort = (field: keyof LeaderboardUser) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const sortedAndFilteredData = leaderboardData
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.id.includes(searchQuery)
    )
    .sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });

  // Re-map ranks based on sorted score if desired, but we will preserve original rank IDs for the table display.
  
  return (
    <Page title="Leaderboard" subtitle="Track challenges, match stats, and claim ultimate bragging rights.">
      <PageHero
        badge="Student Workspace"
        title="Leaderboard"
        subtitle="Track challenges, match stats, and claim ultimate bragging rights."
        accent="#38bdf8"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Active Season 4
          </span>
        </div>
      </PageHero>

      <div className="space-y-8 animate-in fade-in duration-700">
        
      {/* KPI Cards & Countdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Registered */}
        <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-slate-900/40 p-6 flex justify-between items-center group hover:border-sky-500/20 transition-all duration-300">
          <div>
            <span className="text-5xl font-black text-white font-display tracking-tight">1277</span>
            <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase mt-2">Total Registered</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-sky-500/10 flex items-center justify-center border border-sky-500/20 text-sky-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>

        {/* Total Participated */}
        <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-slate-900/40 p-6 flex justify-between items-center group hover:border-indigo-500/20 transition-all duration-300">
          <div>
            <span className="text-5xl font-black text-white font-display tracking-tight">255</span>
            <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase mt-2">Total Participated</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>

        {/* Timer Card */}
        <div className="relative overflow-hidden rounded-2xl border border-rose-500/20 bg-gradient-to-br from-slate-900/40 to-rose-950/10 p-6 flex flex-col justify-between group transition-all duration-300">
          <div className="flex justify-between items-start">
            <p className="text-xs text-rose-300 font-bold tracking-wider uppercase flex items-center gap-1.5">
              Remaining time for completion <Flame className="w-3.5 h-3.5 text-rose-500 animate-bounce" />
            </p>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <div className="text-3xl font-black text-white font-display tracking-tight">
              {timeLeft.days.toString().padStart(2, "0")} <span className="text-[10px] text-slate-500 font-semibold block uppercase">Days</span>
            </div>
            <span className="text-2xl text-slate-500 font-light -translate-y-3">:</span>
            <div className="text-3xl font-black text-white font-display tracking-tight">
              {timeLeft.hours.toString().padStart(2, "0")} <span className="text-[10px] text-slate-500 font-semibold block uppercase">Hrs</span>
            </div>
            <span className="text-2xl text-slate-500 font-light -translate-y-3">:</span>
            <div className="text-3xl font-black text-white font-display tracking-tight">
              {timeLeft.minutes.toString().padStart(2, "0")} <span className="text-[10px] text-slate-500 font-semibold block uppercase">Mins</span>
            </div>
            <span className="text-2xl text-slate-500 font-light -translate-y-3">:</span>
            <div className="text-3xl font-black text-rose-400 font-display tracking-tight w-[40px]">
              {timeLeft.seconds.toString().padStart(2, "0")} <span className="text-[10px] text-slate-500 font-semibold block uppercase">Secs</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 italic">Only the first three positions will be awarded prizes</p>
        </div>
      </div>

      {/* Top 3 Podium Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1st Place Card - Blademir Malina Tori */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#1E1910] to-[#0D0E15] border-2 border-amber-500/80 p-6 flex flex-col justify-between group shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all duration-300 transform hover:scale-[1.02]">
          {/* Gold Badge Medal Overlay */}
          <div className="absolute top-4 right-4 flex flex-col items-center">
            <div className="relative">
              {/* Medal Shape */}
              <div className="w-16 h-16 bg-gradient-to-br from-amber-300 via-amber-500 to-yellow-600 rounded-full flex items-center justify-center shadow-lg border border-amber-200/50">
                <span className="text-3xl font-black text-[#451a03]">1</span>
              </div>
              {/* Medal Ribbon */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex gap-1 justify-center pointer-events-none">
                <div className="w-3.5 h-6 bg-red-600 rotate-12 origin-top rounded-b" />
                <div className="w-3.5 h-6 bg-blue-600 -rotate-12 origin-top rounded-b" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* User Info Header */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 p-0.5 shadow-md">
                  <div className="w-full h-full bg-[#05060F] rounded-full flex items-center justify-center text-3xl">
                    👨‍🎤
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center border-2 border-[#05060F]">
                  1
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg leading-tight font-display pr-12">Blademir Malina Tori</h3>
                <p className="text-xs text-slate-400 mt-0.5">@popy_bob</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 mt-4">
              <div className="text-center">
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Wins</p>
                <p className="text-lg font-bold text-white mt-0.5">443</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Matches</p>
                <p className="text-lg font-bold text-white mt-0.5">778</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Points</p>
                <p className="text-lg font-black text-amber-400 mt-0.5">44,872</p>
              </div>
            </div>

            {/* Rewards */}
            <div className="flex gap-4 items-center pt-2">
              <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold">
                <span className="text-base">🎁</span> 32,421
              </div>
              <div className="flex items-center gap-1.5 text-xs text-sky-400 font-semibold">
                <span className="text-base">💎</span> 17,500
              </div>
            </div>
          </div>
        </div>

        {/* 2nd Place Card - Robert Fox */}
        <div className="relative overflow-hidden rounded-2xl bg-[#0D0E15] border border-white/5 p-6 flex flex-col justify-between group transition-all duration-300 hover:border-slate-800">
          <div className="space-y-4">
            {/* User Info Header */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 p-0.5">
                  <div className="w-full h-full bg-[#05060F] rounded-full flex items-center justify-center text-2xl">
                    🎯
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5.5 h-5.5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center border-2 border-[#05060F]">
                  2
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white text-base leading-tight font-display">Robert Fox</h3>
                <p className="text-xs text-slate-400 mt-0.5">@robert_fox</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 mt-4">
              <div className="text-center">
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Wins</p>
                <p className="text-base font-bold text-white mt-0.5">440</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Matches</p>
                <p className="text-base font-bold text-white mt-0.5">887</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Points</p>
                <p className="text-base font-black text-sky-400 mt-0.5">42,515</p>
              </div>
            </div>

            {/* Rewards */}
            <div className="flex gap-4 items-center pt-2">
              <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold">
                <span className="text-base">🎁</span> 31,001
              </div>
              <div className="flex items-center gap-1.5 text-xs text-sky-400 font-semibold">
                <span className="text-base">💎</span> 17,421
              </div>
            </div>
          </div>
        </div>

        {/* 3rd Place Card - Molida Glinda */}
        <div className="relative overflow-hidden rounded-2xl bg-[#0D0E15] border border-white/5 p-6 flex flex-col justify-between group transition-all duration-300 hover:border-slate-800">
          <div className="space-y-4">
            {/* User Info Header */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-400 to-rose-600 p-0.5">
                  <div className="w-full h-full bg-[#05060F] rounded-full flex items-center justify-center text-2xl">
                    ⚡
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5.5 h-5.5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center border-2 border-[#05060F]">
                  3
                </div>
              </div>
              <div>
                <h3 className="font-bold text-white text-base leading-tight font-display">Molida Glinda</h3>
                <p className="text-xs text-slate-400 mt-0.5">@molida_glinda</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 mt-4">
              <div className="text-center">
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Wins</p>
                <p className="text-base font-bold text-white mt-0.5">412</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Matches</p>
                <p className="text-base font-bold text-white mt-0.5">756</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Points</p>
                <p className="text-base font-black text-sky-400 mt-0.5">40,550</p>
              </div>
            </div>

            {/* Rewards */}
            <div className="flex gap-4 items-center pt-2">
              <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold">
                <span className="text-base">🎁</span> 30,987
              </div>
              <div className="flex items-center gap-1.5 text-xs text-sky-400 font-semibold">
                <span className="text-base">💎</span> 17,224
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Global Ranking Section */}
      <div className="rounded-2xl border border-white/5 bg-slate-900/20 p-6 space-y-6">
        
        {/* Table Header Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-white font-display">Global Ranking</h2>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search rank, username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#05060F] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all duration-300"
              />
            </div>
            
            {/* Legend / Reset Info */}
            <span className="text-[11px] text-slate-500 whitespace-nowrap bg-white/[0.02] border border-white/5 px-3 py-2 rounded-xl">
              Showing {sortedAndFilteredData.length} records
            </span>
          </div>
        </div>

        {/* Ranking Table */}
        <div className="overflow-x-auto rounded-xl border border-white/5">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/60 border-b border-white/5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6 text-center w-[80px]">Rank</th>
                <th className="py-4 px-6 min-w-[200px]">User name</th>
                
                {/* Interactive sorting headers */}
                <th className="py-4 px-6 cursor-pointer hover:text-white transition w-[130px]" onClick={() => handleSort("wins")}>
                  <div className="flex items-center gap-1.5">
                    Match Wins
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
                
                <th className="py-4 px-6 cursor-pointer hover:text-white transition w-[130px]" onClick={() => handleSort("spentTime")}>
                  <div className="flex items-center gap-1.5">
                    Spent time
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>

                <th className="py-4 px-6 cursor-pointer hover:text-white transition w-[120px]" onClick={() => handleSort("victories")}>
                  <div className="flex items-center gap-1.5">
                    Victories
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>

                <th className="py-4 px-6 w-[140px]">Best Win (mins)</th>
                
                <th className="py-4 px-6 cursor-pointer hover:text-white transition text-right w-[120px]" onClick={() => handleSort("points")}>
                  <div className="flex items-center justify-end gap-1.5">
                    Points
                    <ArrowUpDown className="w-3 h-3 text-slate-500" />
                  </div>
                </th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-white/5 text-sm">
              {sortedAndFilteredData.length > 0 ? (
                sortedAndFilteredData.map((user) => {
                  const isTopThree = user.rank <= 3;
                  
                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-white/[0.02] transition-colors duration-200 group"
                    >
                      {/* Rank Column */}
                      <td className="py-4 px-6 text-center">
                        {user.rank === 1 ? (
                          <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center mx-auto shadow-md">
                            1
                          </div>
                        ) : user.rank === 2 ? (
                          <div className="w-7 h-7 rounded-full bg-slate-300 text-slate-950 font-black flex items-center justify-center mx-auto shadow-md">
                            2
                          </div>
                        ) : user.rank === 3 ? (
                          <div className="w-7 h-7 rounded-full bg-amber-700 text-white font-black flex items-center justify-center mx-auto shadow-md">
                            3
                          </div>
                        ) : (
                          <span className="font-semibold text-slate-500">{user.rank}</span>
                        )}
                      </td>

                      {/* User Info Column */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${user.avatarColor} flex items-center justify-center text-lg shadow-sm shrink-0`}>
                            {user.avatar}
                          </div>
                          <div>
                            <div className="font-semibold text-white group-hover:text-indigo-400 transition-colors leading-tight">
                              {user.name}
                            </div>
                            <div className="text-[10px] text-slate-500 mt-0.5">
                              ID {user.id}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Match Wins */}
                      <td className="py-4 px-6 font-medium text-slate-300">
                        {user.wins}
                      </td>

                      {/* Spent Time */}
                      <td className="py-4 px-6 text-slate-400">
                        {user.spentTime}
                      </td>

                      {/* Victories */}
                      <td className="py-4 px-6 text-slate-400">
                        {user.victories}
                      </td>

                      {/* Best Win */}
                      <td className="py-4 px-6 font-mono text-slate-400">
                        {user.bestWin}
                      </td>

                      {/* Points */}
                      <td className="py-4 px-6 text-right font-bold text-white">
                        {user.points.toLocaleString()}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    No matching global rankings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </Page>
  );
}

export { AchievementVaultPage };

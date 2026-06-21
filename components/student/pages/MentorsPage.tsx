'use client';

import React, { useState } from "react";
import { Search, Clock, ArrowUpDown, Filter, BookOpen, Users, Star, Calendar, Check, Sparkles, X, Heart, Compass, GraduationCap } from "lucide-react";
import { Page } from "@/components/app/Page";
import { PageHero } from "@/components/research/premium";


interface Category {
  id: string;
  name: string;
  count: number;
  icon: string;
  image: string;
  color: string;
}

interface Article {
  id: string;
  category: string;
  readTime: string;
  title: string;
  snippet: string;
  imageUrl: string;
  author: string;
  authorTitle: string;
  authorAvatar: string;
  date: string;
  reads: number;
}

interface Mentor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  rating: number;
  reviewsCount: number;
  sessionsCount: number;
  avatar: string;
  bio: string;
  tags: string[];
  availability: string;
}

const categoriesData: Category[] = [
  { id: "sleep", name: "Sleep", count: 25, icon: "🛌", image: "https://images.unsplash.com/photo-1511295742364-92767fa62d9f?w=150&auto=format&fit=crop&q=60", color: "from-sky-500/20 to-blue-500/20 text-sky-400" },
  { id: "stress", name: "Stress", count: 14, icon: "🧘", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=150&auto=format&fit=crop&q=60", color: "from-emerald-500/20 to-teal-500/20 text-emerald-400" },
  { id: "mindfulness", name: "Mindfulness", count: 28, icon: "🌊", image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=150&auto=format&fit=crop&q=60", color: "from-violet-500/20 to-indigo-500/20 text-violet-400" },
  { id: "career", name: "Career Strategy", count: 32, icon: "🚀", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=150&auto=format&fit=crop&q=60", color: "from-amber-500/20 to-orange-500/20 text-amber-400" },
  { id: "tech", name: "Technical Prep", count: 19, icon: "💻", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=150&auto=format&fit=crop&q=60", color: "from-rose-500/20 to-pink-500/20 text-rose-400" },
];

const articlesData: Article[] = [
  {
    id: "1",
    category: "Relationships",
    readTime: "15 - 20 mins read",
    title: "5 Simple Keys to Helping Your Partner Feel Heard",
    snippet: "Your relationship partner needs to feel understood. Being a better listener is the secret foundation that makes everything else work in high-stakes environments.",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=60",
    author: "Dr. Ross Althof",
    authorTitle: "Career Strategy Advisor",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60",
    date: "June 22, '25",
    reads: 1245,
  },
  {
    id: "2",
    category: "Burnout",
    readTime: "15 mins read",
    title: "Why We Feel Post-Pandemic Burnout and Exhaustion",
    snippet: "Do less. Take a walk. Look up at trees. Soak in the silence. The energy bandwidth the brain requires in the digital era is higher than ever. Learn to reset.",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60",
    author: "Dr. Nick Willard",
    authorTitle: "Mindfulness Coach",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60",
    date: "June 19, '25",
    reads: 934,
  },
  {
    id: "3",
    category: "Emotions",
    readTime: "15 mins read",
    title: "Is Emotion Regulation the Key to Addiction Prevention?",
    snippet: "Regulating response under extreme stress prevents reliance on quick dopamine resets. Ground yourself in long-term goals and healthy routines.",
    imageUrl: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=500&auto=format&fit=crop&q=60",
    author: "Dr. Sarah Logesd",
    authorTitle: "Behavioral Psychologist",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
    date: "May 28, '25",
    reads: 1532,
  },
  {
    id: "4",
    category: "Stress",
    readTime: "20 mins read",
    title: "When You're Exhausted, Try These 3 Uplifting Thoughts",
    snippet: "How to change your perspective on yourself, your problems, and your path forward when academic and interview cycles feel overwhelming.",
    imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&auto=format&fit=crop&q=60",
    author: "Dr. Evan Peters",
    authorTitle: "High-Performance Coach",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
    date: "May 16, '25",
    reads: 812,
  },
  {
    id: "5",
    category: "Health",
    readTime: "15 - 20 mins read",
    title: "Edible Flowers That Are Good for the Body and Brain",
    snippet: "Edible flowers taste great, look beautiful on your plate, and are packed with micro-nutrients that elevate cognitive speeds and reduce cortisol levels.",
    imageUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=500&auto=format&fit=crop&q=60",
    author: "Dr. Sam Cooper",
    authorTitle: "Nutritional Psychiatrist",
    authorAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=60",
    date: "April 20, '25",
    reads: 654,
  },
  {
    id: "6",
    category: "Health",
    readTime: "15 mins read",
    title: "Exercise More by Making It Easier—Yes, Easier",
    snippet: "Have you tried to create a program of regular exercise with no success? The trick is building frictionless entry gates. Learn how in this study.",
    imageUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=500&auto=format&fit=crop&q=60",
    author: "Dr. Kelly Adams",
    authorTitle: "Physical Health Lead",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60",
    date: "April 18, '25",
    reads: 1102,
  },
];

const mentorsData: Mentor[] = [
  {
    id: "m1",
    name: "Dr. Ross Althof",
    title: "Former VP at Google & Career Strategy Coach",
    specialty: "Career Strategy",
    rating: 4.9,
    reviewsCount: 48,
    sessionsCount: 180,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=60",
    bio: "Helping students transition from academic pathways to high-impact career routes. Specialized in tech leadership, mock negotiations, and early growth advice.",
    tags: ["Leadership", "Career Pivots", "Negotiation", "Tech Executives"],
    availability: "Available this Tuesday & Thursday",
  },
  {
    id: "m2",
    name: "Dr. Nick Willard",
    title: "Clinical Mindfulness Instructor & Therapist",
    specialty: "Mindfulness",
    rating: 4.8,
    reviewsCount: 36,
    sessionsCount: 112,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=60",
    bio: "Focusing on student wellness, burnout prevention, and cognitive performance frameworks. Empowering you to manage high workloads with mental clarity.",
    tags: ["Stress Relief", "Meditation", "Burnout", "Wellness Guides"],
    availability: "Available Mondays & Wednesdays",
  },
  {
    id: "m3",
    name: "Dr. Sarah Logesd",
    title: "Behavioral Psychologist & Interview Expert",
    specialty: "Technical Prep",
    rating: 4.95,
    reviewsCount: 62,
    sessionsCount: 210,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=60",
    bio: "Specializing in high-stakes communication, behavioral interviews, and resolving imposter syndrome. I teach you how to articulate complex technical ideas clearly.",
    tags: ["Behavioral Prep", "Speech Coaching", "Public Speaking", "Confidence"],
    availability: "Available Tomorrow",
  },
  {
    id: "m4",
    name: "Dr. Sam Cooper",
    title: "Cognitive Performance Analyst & Dietitian",
    specialty: "Health",
    rating: 4.85,
    reviewsCount: 29,
    sessionsCount: 94,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=60",
    bio: "Optimizing brain health, sleep schedules, and nutritional intake for student builders. Focuses on sustained energy, long study sprints, and concentration.",
    tags: ["Focus Diet", "Brain Performance", "Sleep Optimization", "Energy Hacks"],
    availability: "Available Fridays",
  },
];

function MentorsPage() {
  const [activeTab, setActiveTab] = useState<"articles" | "directory">("articles");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("recent");
  
  // Booking Modal State
  const [bookingMentor, setBookingMentor] = useState<Mentor | null>(null);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Filter & Sort Articles
  const filteredArticles = articlesData
    .filter((art) => {
      const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            art.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            art.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory 
        ? art.category.toLowerCase() === selectedCategory.toLowerCase() ||
          (selectedCategory === "career" && art.category.toLowerCase() === "relationships") || 
          (selectedCategory === "tech" && art.category.toLowerCase() === "emotions") ||
          (selectedCategory === "stress" && art.category.toLowerCase() === "stress") ||
          (selectedCategory === "sleep" && art.category.toLowerCase() === "burnout") ||
          (selectedCategory === "mindfulness" && art.category.toLowerCase() === "emotions")
        : true;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "recent") return b.id.localeCompare(a.id);
      if (sortBy === "popular") return b.reads - a.reads;
      if (sortBy === "readTime") return a.readTime.localeCompare(b.readTime);
      return 0;
    });

  // Filter Mentors
  const filteredMentors = mentorsData.filter((men) => {
    const matchesSearch = men.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          men.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          men.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          men.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory
      ? (selectedCategory === "career" && men.specialty === "Career Strategy") ||
        (selectedCategory === "stress" && men.specialty === "Mindfulness") ||
        (selectedCategory === "mindfulness" && men.specialty === "Mindfulness") ||
        (selectedCategory === "tech" && men.specialty === "Technical Prep") ||
        (selectedCategory === "sleep" && men.specialty === "Mindfulness")
      : true;
    return matchesSearch && matchesCategory;
  });

  const handleBookSession = (mentor: Mentor) => {
    setBookingMentor(mentor);
    setBookingDate("2026-06-16");
    setBookingTime("10:00 AM");
    setBookingSuccess(false);
  };

  const confirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingMentor(null);
      setBookingSuccess(false);
    }, 2500);
  };

  return (
    <Page title="Mentorship Hub" subtitle="Get tailored guidance, read insights from verified experts, and book 1-on-1 advisor sessions.">
      <PageHero
        badge="Student Workspace"
        title="Mentorship Hub"
        subtitle="Get tailored guidance, read insights from verified experts, and book 1-on-1 advisor sessions."
        accent="#38bdf8"
      >
        {/* Tab Switcher */}
        <div className="flex bg-slate-900/60 p-1 rounded-xl border border-white/5 w-fit mt-4 md:mt-0">
          <button
            onClick={() => { setActiveTab("articles"); setSelectedCategory(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
              activeTab === "articles"
                ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-slate-950 font-bold shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Mentor Insights
          </button>
          <button
            onClick={() => { setActiveTab("directory"); setSelectedCategory(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
              activeTab === "directory"
                ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-slate-950 font-bold shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Book a Mentor
          </button>
        </div>
      </PageHero>

      <div className="space-y-8 animate-in fade-in duration-700 p-6 md:p-8">
      
      {/* Top Categories Slider (Mocking 10 top categories) */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
            Top categories <span className="text-xs bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-slate-400 font-normal">10</span>
          </h2>
          <button className="text-xs text-sky-400 hover:text-sky-300 font-semibold transition flex items-center gap-0.5">
            See all <span className="text-[10px]">→</span>
          </button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categoriesData.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(isSelected ? null : cat.id)}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all duration-300 text-left cursor-pointer group hover:scale-[1.02] ${
                  isSelected
                    ? "border-sky-500/80 bg-sky-950/20 shadow-[0_0_15px_rgba(56,189,248,0.1)]"
                    : "border-white/5 bg-slate-900/40 hover:border-slate-800"
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl bg-slate-950 border border-white/10 shrink-0 group-hover:scale-105 transition-transform`}>
                  {cat.icon}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-white text-xs truncate leading-tight group-hover:text-sky-400 transition-colors">{cat.name}</p>
                  <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                    <BookOpen className="w-2.5 h-2.5" /> {cat.count} articles
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN VIEWPORT */}
      {activeTab === "articles" ? (
        // ARTICLES GRID (Matches second image)
        <div className="space-y-6">
          
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white font-display">Articles</h2>
              <span className="text-xs bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-slate-400 font-normal">
                {filteredArticles.length} matching
              </span>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto w-full sm:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:flex-none sm:w-60">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#05060F] border border-white/10 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all duration-300"
                />
              </div>

              {/* Sort By Dropdown */}
              <div className="relative shrink-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-900/80 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition cursor-pointer appearance-none pr-8 relative"
                >
                  <option value="recent">Sort by: Recent</option>
                  <option value="popular">Sort by: Popularity</option>
                  <option value="readTime">Sort by: Reading Time</option>
                </select>
                <ArrowUpDown className="w-3 h-3 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              {/* Filter Icon button */}
              <button className="p-2 rounded-xl bg-slate-900/80 border border-white/10 hover:border-slate-700 transition cursor-pointer text-slate-300">
                <Filter className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Articles Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((art) => (
                <div
                  key={art.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-slate-900/20 border border-white/5 hover:border-slate-800 transition-all duration-300 hover:scale-[1.01]"
                >
                  {/* Article Image Container */}
                  <div className="relative h-48 overflow-hidden bg-slate-950 shrink-0">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    />
                    {/* Category Overlay Badge */}
                    <div className="absolute top-3 left-3 bg-white text-slate-950 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg tracking-wider shadow-md">
                      {art.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      {/* Reading time row */}
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        {art.readTime}
                      </div>
                      
                      {/* Title */}
                      <h3 className="font-bold text-white text-base leading-snug group-hover:text-sky-400 transition-colors font-display line-clamp-2">
                        {art.title}
                      </h3>
                      
                      {/* Snippet */}
                      <p className="text-slate-400 text-xs line-clamp-3 leading-relaxed font-sans">
                        {art.snippet}
                      </p>
                    </div>

                    {/* Author Row */}
                    <div className="flex items-center gap-3 pt-3 border-t border-white/5 shrink-0">
                      <img
                        src={art.authorAvatar}
                        alt={art.author}
                        className="w-8 h-8 rounded-full object-cover border border-white/10"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-white text-xs truncate leading-none">{art.author}</p>
                        <p className="text-[10px] text-slate-500 mt-1 leading-none">{art.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-3 py-16 text-center text-slate-500">
                No mentor insights found matching your search.
              </div>
            )}
          </div>
        </div>
      ) : (
        // DIRECTORY/BOOKING GRID
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white font-display">Available Mentors</h2>
              <span className="text-xs bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-slate-400 font-normal">
                {filteredMentors.length} active
              </span>
            </div>

            {/* Directory search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search specialty, name, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#05060F] border border-white/10 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all duration-300"
              />
            </div>
          </div>

          {/* Mentors Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMentors.map((men) => (
              <div
                key={men.id}
                className="relative overflow-hidden rounded-2xl bg-slate-900/20 border border-white/5 p-6 hover:border-slate-800 transition duration-300 flex flex-col justify-between gap-4 group"
              >
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  {/* Avatar */}
                  <img
                    src={men.avatar}
                    alt={men.name}
                    className="w-16 h-16 rounded-full object-cover border border-white/10 shrink-0 shadow-md"
                  />
                  {/* Details */}
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-base leading-none font-display group-hover:text-sky-400 transition-colors">
                        {men.name}
                      </h3>
                      <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full shrink-0">
                        {men.specialty}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs font-semibold leading-tight">{men.title}</p>
                    
                    {/* Stars */}
                    <div className="flex items-center gap-1.5 pt-1 text-amber-400 text-xs">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold text-white">{men.rating}</span>
                      <span className="text-slate-500">({men.reviewsCount} reviews)</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-500 font-semibold">{men.sessionsCount} sessions hosted</span>
                    </div>
                  </div>
                </div>

                {/* Bio text */}
                <p className="text-slate-400 text-xs leading-relaxed font-sans">
                  {men.bio}
                </p>

                {/* Tag pills */}
                <div className="flex flex-wrap gap-1.5 py-1">
                  {men.tags.map(t => (
                    <span key={t} className="text-[10px] bg-white/[0.03] border border-white/5 text-slate-400 px-2 py-0.5 rounded-md font-semibold">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Bottom Row: Availability & Booking */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-3 border-t border-white/5 mt-2">
                  <p className="text-[10px] text-indigo-400 font-semibold tracking-wide flex items-center gap-1 uppercase">
                    <Calendar className="w-3.5 h-3.5" /> {men.availability}
                  </p>
                  
                  <button
                    onClick={() => handleBookSession(men)}
                    className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 hover:scale-[1.02] text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition duration-200 cursor-pointer"
                  >
                    Book 1-on-1 Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BOOKING MODAL */}
      {bookingMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 animate-in fade-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-white text-lg font-display">Schedule Mentorship Session</h3>
                <p className="text-xs text-slate-400 mt-1">Book a 30-min call with {bookingMentor.name}</p>
              </div>
              <button
                onClick={() => setBookingMentor(null)}
                className="p-1 rounded-xl bg-slate-950 border border-white/5 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {bookingSuccess ? (
              // Success Screen
              <div className="py-12 flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center animate-bounce">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-white text-base">Booking Confirmed!</h4>
                <p className="text-xs text-slate-400">
                  Your session has been scheduled. Check your Student Calendar and Gmail for meeting invites.
                </p>
              </div>
            ) : (
              // Scheduling Form
              <form onSubmit={confirmBooking} className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-slate-950 rounded-2xl border border-white/5">
                  <img
                    src={bookingMentor.avatar}
                    alt={bookingMentor.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                  />
                  <div>
                    <h4 className="font-bold text-white text-xs">{bookingMentor.name}</h4>
                    <p className="text-[10px] text-slate-500">{bookingMentor.title}</p>
                  </div>
                </div>

                {/* Date Input */}
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider block">
                    Choose Date
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-[#05060F] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Time Input */}
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider block">
                    Choose Time
                  </label>
                  <select
                    required
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full bg-[#05060F] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="10:00 AM">10:00 AM (EST)</option>
                    <option value="11:30 AM">11:30 AM (EST)</option>
                    <option value="02:00 PM">02:00 PM (EST)</option>
                    <option value="03:30 PM">03:30 PM (EST)</option>
                    <option value="05:00 PM">05:00 PM (EST)</option>
                  </select>
                </div>

                {/* Subtext info */}
                <p className="text-[10px] text-indigo-400 leading-normal bg-indigo-950/10 border border-indigo-500/10 p-3 rounded-xl">
                  * Mentorship calls are fully sponsored under Student OS and will consume 1 Session Token (Level 4 reward).
                </p>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-indigo-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg hover:scale-[1.01] active:scale-[0.99] transition duration-200 cursor-pointer"
                >
                  Confirm Reservation
                </button>
              </form>
            )}
          </div>
        </div>
      )}
      </div>
    </Page>
  );
}

export { MentorsPage };

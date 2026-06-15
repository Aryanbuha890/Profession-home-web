import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import { Search, Plus, Star, MoreVertical, Filter, Folder, ListFilter, Check, X, Grid, List, Eye } from "lucide-react";

export const Route = createFileRoute("/app/student/projects")({
  component: ProjectsPage,
});

interface Project {
  id: string;
  title: string;
  client: string;
  description: string;
  status: "IN PROGRESS" | "RESEARCH" | "IDEATE" | "BLOCKED" | "COMPLETED";
  statusColor: string;
  isStarred: boolean;
  lastActive: string;
}

const initialProjects: Project[] = [
  {
    id: "p1",
    title: "App Redesign",
    client: "ActiveCollab",
    description: "Web and desktop app redesign v6. Cleaning up navigation hierarchies and visual details.",
    status: "IN PROGRESS",
    statusColor: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    isStarred: true,
    lastActive: "Active recently",
  },
  {
    id: "p2",
    title: "Nuendo app",
    client: "Steinberg",
    description: "Plugin application for the most advanced audio post-production solution available.",
    status: "RESEARCH",
    statusColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    isStarred: true,
    lastActive: "Active 1 day ago",
  },
  {
    id: "p3",
    title: "Design System",
    client: "ActiveCollab",
    description: "The single source of truth which groups all the elements that will allow the teams to design and build.",
    status: "IN PROGRESS",
    statusColor: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    isStarred: true,
    lastActive: "Active recently",
  },
  {
    id: "p4",
    title: "Video explainer",
    client: "Nike ads",
    description: "Explainer script and animatic sequence for the new Nike shopping app integration.",
    status: "IDEATE",
    statusColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    isStarred: false,
    lastActive: "Active 2 days ago",
  },
  {
    id: "p5",
    title: "UX Designer Hiring",
    client: "ActiveCollab",
    description: "Creating onboarding tasks and evaluation rubrics for incoming design interns.",
    status: "IN PROGRESS",
    statusColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    isStarred: false,
    lastActive: "Active 1 day ago",
  },
  {
    id: "p6",
    title: "Rebranding",
    client: "ActiveCollab",
    description: "Complete visual rebranding including color palettes, logos, and illustration guidelines.",
    status: "IDEATE",
    statusColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    isStarred: false,
    lastActive: "Active 1 day ago",
  },
];

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [subTab, setSubTab] = useState<"projects" | "templates" | "completed">("projects");
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newClient, setNewClient] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newStatus, setNewStatus] = useState<"IN PROGRESS" | "RESEARCH" | "IDEATE">("IDEATE");

  const toggleStar = (id: string) => {
    setProjects(
      projects.map((p) => (p.id === id ? { ...p, isStarred: !p.isStarred } : p))
    );
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    let statusCol = "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
    if (newStatus === "IN PROGRESS") statusCol = "bg-pink-500/10 text-pink-400 border-pink-500/20";
    if (newStatus === "RESEARCH") statusCol = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";

    const newProj: Project = {
      id: `p-${Date.now()}`,
      title: newTitle,
      client: newClient || "Personal OS",
      description: newDesc || "No description provided.",
      status: newStatus,
      statusColor: statusCol,
      isStarred: false,
      lastActive: "Active recently",
    };

    setProjects([newProj, ...projects]);
    setIsModalOpen(false);
    setNewTitle("");
    setNewClient("");
    setNewDesc("");
    setNewStatus("IDEATE");
  };

  // Unique clients and statuses for filters
  const clientsList = ["All", ...Array.from(new Set(projects.map((p) => p.client)))];
  const statusesList = ["All", "IN PROGRESS", "RESEARCH", "IDEATE", "BLOCKED", "COMPLETED"];

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClient = selectedClient === "All" || p.client === selectedClient;
    const matchesStatus = selectedStatus === "All" || p.status === selectedStatus;
    
    // Sub tab filtering
    const matchesSubTab = subTab === "projects" ? p.status !== "COMPLETED" :
                          subTab === "completed" ? p.status === "COMPLETED" : true; // templates can be all

    return matchesSearch && matchesClient && matchesStatus && matchesSubTab;
  });

  return (
    <div className="min-h-screen bg-[#05060F] text-slate-100 p-6 md:p-8 space-y-8 animate-in fade-in duration-700">
      
      {/* Top Navbar & Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div className="flex items-center gap-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-white font-display">Projects</h1>
          
          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-2 bg-slate-900/40 border border-white/5 p-1 rounded-xl">
            <button
              onClick={() => setSubTab("projects")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition cursor-pointer ${
                subTab === "projects" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setSubTab("templates")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition cursor-pointer ${
                subTab === "templates" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Templates
            </button>
            <button
              onClick={() => setSubTab("completed")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition cursor-pointer ${
                subTab === "completed" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Completed Projects
            </button>
          </div>
        </div>

        {/* Start a new Project Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-slate-950 hover:scale-[1.02] shadow-lg text-xs font-bold rounded-xl transition duration-200 cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4 text-slate-950 stroke-[3]" /> Start a new Project
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/40 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/80 transition-all duration-300"
          />
        </div>

        {/* Client & Label Select filters */}
        <div className="flex items-center gap-3 w-full md:w-auto self-end md:self-auto justify-end">
          {/* Client Filter */}
          <div className="relative">
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="bg-slate-900/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 appearance-none pr-8 cursor-pointer"
            >
              <option value="All">Client: All</option>
              {clientsList.filter(c => c !== "All").map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <Filter className="w-3 h-3 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Label Filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-900/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 appearance-none pr-8 cursor-pointer"
            >
              <option value="All">Label: All</option>
              {statusesList.filter(s => s !== "All").map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ListFilter className="w-3 h-3 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Grid view of projects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((p) => (
            <div
              key={p.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-slate-900/30 border border-white/5 p-6 hover:border-slate-800 transition-all duration-300 hover:scale-[1.01] min-h-[180px] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            >
              <div>
                {/* Title and Favorite Row */}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-bold text-white text-base leading-tight font-display group-hover:text-sky-400 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 font-semibold">
                      for {p.client}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => toggleStar(p.id)}
                      className="text-slate-400 hover:text-amber-400 transition"
                      aria-label="Star Project"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          p.isStarred ? "fill-amber-400 text-amber-400" : "text-slate-500 hover:text-slate-300"
                        }`}
                      />
                    </button>
                    <button 
                      onClick={() => deleteProject(p.id)}
                      className="text-slate-500 hover:text-rose-400 transition p-0.5 rounded"
                      title="Delete Project"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-xs mt-3 leading-relaxed line-clamp-3">
                  {p.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6">
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                  {p.lastActive}
                </span>
                
                <span className={`text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded border ${p.statusColor}`}>
                  {p.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-3 py-12 text-center text-slate-500 border border-dashed border-white/10 rounded-2xl">
            No active projects found matching current filters.
          </div>
        )}
      </div>

      {/* Flat List View below Grid (exactly matching first reference image layout) */}
      {filteredProjects.length > 0 && (
        <div className="space-y-3 pt-6">
          <div className="border-b border-white/5 pb-2">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-slate-500">Project Registry</h2>
          </div>
          <div className="space-y-2">
            {filteredProjects.map((p) => (
              <div
                key={`row-${p.id}`}
                className="flex items-center justify-between bg-slate-900/20 border border-white/5 px-6 py-3.5 rounded-xl hover:border-slate-800 transition duration-200 group"
              >
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <button onClick={() => toggleStar(p.id)} className="shrink-0">
                    <Star
                      className={`w-4 h-4 ${
                        p.isStarred ? "fill-amber-400 text-amber-400" : "text-slate-600 hover:text-slate-400"
                      }`}
                    />
                  </button>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 min-w-0">
                    <span className="font-bold text-white text-sm truncate group-hover:text-sky-400 transition-colors font-display">
                      {p.title}
                    </span>
                    <span className="text-[10px] text-slate-500 whitespace-nowrap">
                      for {p.client}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6 shrink-0 ml-4">
                  <span className={`text-[8.5px] font-extrabold uppercase px-2 py-0.5 rounded border ${p.statusColor}`}>
                    {p.status}
                  </span>
                  
                  <span className="text-[10px] text-slate-500 font-semibold hidden sm:inline">
                    {p.lastActive}
                  </span>

                  <button className="text-slate-500 hover:text-white transition cursor-pointer">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* START A NEW PROJECT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6 animate-in fade-in zoom-in duration-350">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-white text-lg font-display">Create New Project</h3>
                <p className="text-xs text-slate-400 mt-0.5">Define your client deliverables and task targets.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-xl bg-slate-950 border border-white/5 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. App Redesign, Nuendo integration..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#05060F] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">
                  Client / Course
                </label>
                <input
                  type="text"
                  placeholder="e.g. ActiveCollab, Nike ads, CS101..."
                  value={newClient}
                  onChange={(e) => setNewClient(e.target.value)}
                  className="w-full bg-[#05060F] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider">
                  Description
                </label>
                <textarea
                  placeholder="Brief project details..."
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-[#05060F] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider block">
                  Initial Stage Status
                </label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {(["IDEATE", "RESEARCH", "IN PROGRESS"] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setNewStatus(st)}
                      className={`py-1.5 rounded-lg border text-[10px] font-bold tracking-wider transition ${
                        newStatus === st
                          ? "bg-sky-500/10 text-sky-400 border-sky-500/30"
                          : "bg-slate-950 border-white/5 text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-indigo-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg hover:scale-[1.01] active:scale-[0.99] transition duration-200 cursor-pointer"
              >
                Assemble Project
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

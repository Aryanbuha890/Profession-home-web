import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useMemo } from "react";
import { 
  Compass, Search, Plus, Filter, Trash2, Edit, TrendingUp, 
  Coins, Hourglass, Landmark, User, Mail, CheckSquare, Square, X
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

export const Route = createFileRoute("/app/admin/startups")({
  component: AdminStartupsPage,
});

interface StartupRecord {
  id: string;
  name: string;
  founder: string;
  email: string;
  sector: string;
  fundingRaised: number; // in USD
  runway: number; // in months
  stage: "Pre-seed" | "Seed" | "Series A" | "Bootstrap";
  logo: string;
}

const INITIAL_STARTUPS: StartupRecord[] = [
  { id: "STP-301", name: "Aether AI", founder: "Floyd Miles", email: "floyd@aether.ai", sector: "Generative AI & LLMs", fundingRaised: 1200000, runway: 14, stage: "Seed", logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=256&h=256" },
  { id: "STP-302", name: "Helix Health", founder: "Dr. Sarah Jenkins", email: "s.jenkins@helix.io", sector: "BioTech / HealthTech", fundingRaised: 450000, runway: 18, stage: "Seed", logo: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=256&h=256" },
  { id: "STP-303", name: "Solaris Power", founder: "Amit Kumar", email: "amit.k@solaris.co", sector: "CleanTech / Solar", fundingRaised: 85000, runway: 8, stage: "Pre-seed", logo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=256&h=256" },
  { id: "STP-304", name: "BlockSecure", founder: "Sneha Reddy", email: "sneha@blocksecure.tech", sector: "Cybersecurity / Web3", fundingRaised: 2300000, runway: 24, stage: "Series A", logo: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=256&h=256" },
  { id: "STP-305", name: "EdFlow", founder: "Vikram Desai", email: "vikram@edflow.edu", sector: "EdTech / SaaS", fundingRaised: 0, runway: 12, stage: "Bootstrap", logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=256&h=256" }
];

const SECTORS = [
  "Generative AI & LLMs",
  "BioTech / HealthTech",
  "CleanTech / Solar",
  "Cybersecurity / Web3",
  "EdTech / SaaS",
  "Fintech"
];

function AdminStartupsPage() {
  const [startups, setStartups] = useState<StartupRecord[]>(INITIAL_STARTUPS);
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("All");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [formFields, setFormFields] = useState<Partial<StartupRecord>>({
    name: "",
    founder: "",
    email: "",
    sector: "Generative AI & LLMs",
    fundingRaised: 0,
    runway: 12,
    stage: "Pre-seed",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=256&h=256"
  });

  // Calculate metrics
  const stats = useMemo(() => {
    const total = startups.length;
    const totalFunding = startups.reduce((acc, s) => acc + s.fundingRaised, 0);
    const avgRunway = total > 0 ? Math.round(startups.reduce((acc, s) => acc + s.runway, 0) / total) : 0;
    const seriesA = startups.filter(s => s.stage === "Series A").length;
    return { total, totalFunding, avgRunway, seriesA };
  }, [startups]);

  // Filter list
  const filteredStartups = useMemo(() => {
    return startups.filter(s => {
      const matchesSearch = 
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.founder.toLowerCase().includes(search.toLowerCase()) ||
        s.sector.toLowerCase().includes(search.toLowerCase()) ||
        s.id.toLowerCase().includes(search.toLowerCase());
      const matchesStage = stageFilter === "All" || s.stage === stageFilter;
      return matchesSearch && matchesStage;
    });
  }, [startups, search, stageFilter]);

  // Selection
  const handleSelectOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === filteredStartups.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredStartups.map(s => s.id)));
    }
  };

  // Actions
  const handleDeleteSelected = () => {
    setStartups(prev => prev.filter(s => !selectedIds.has(s.id)));
    toast.success(`Removed ${selectedIds.size} startups`);
    setSelectedIds(new Set());
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFields.name || !formFields.founder || !formFields.email) {
      toast.error("Complete all required fields.");
      return;
    }

    if (modalMode === "add") {
      const newStp: StartupRecord = {
        id: `STP-${Math.floor(100 + Math.random() * 900)}`,
        name: formFields.name,
        founder: formFields.founder,
        email: formFields.email,
        sector: formFields.sector || "Generative AI & LLMs",
        fundingRaised: Number(formFields.fundingRaised) || 0,
        runway: Number(formFields.runway) || 12,
        stage: formFields.stage || "Pre-seed",
        logo: formFields.logo || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=256&h=256"
      };
      setStartups([newStp, ...startups]);
      toast.success(`Registered startup ${newStp.name}`);
    } else {
      setStartups(prev => prev.map(s => s.id === editingId ? { ...s, ...formFields as StartupRecord } : s));
      toast.success("Startup profile data updated.");
    }
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setModalMode("add");
    setFormFields({
      name: "",
      founder: "",
      email: "",
      sector: "Generative AI & LLMs",
      fundingRaised: 100000,
      runway: 12,
      stage: "Pre-seed",
      logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=256&h=256"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (s: StartupRecord) => {
    setModalMode("edit");
    setEditingId(s.id);
    setFormFields(s);
    setIsModalOpen(true);
  };

  const handleDeleteIndividual = (id: string) => {
    setStartups(prev => prev.filter(s => s.id !== id));
    toast.success("Startup portfolio removed.");
    const next = new Set(selectedIds);
    next.delete(id);
    setSelectedIds(next);
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500 p-6 pb-16">
      <Toaster theme="dark" closeButton position="top-right" />

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Startup Portfolio Hub</h1>
          <p className="text-xs text-slate-400 mt-1">Manage incubated companies, aggregate funding raised, monitor runways, and track stages.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-1.5 bg-gradient-to-r from-red-500 to-rose-600 hover:opacity-95 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-lg shadow-red-500/10 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Venture
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Incubated Startups", val: stats.total, icon: Compass, color: "text-slate-400 bg-slate-900/40 border-slate-800" },
          { label: "Aggregate Funding", val: `$${(stats.totalFunding / 1000000).toFixed(2)}M`, icon: Coins, color: "text-emerald-400 bg-emerald-500/5 border-emerald-500/10" },
          { label: "Avg Runway Remaining", val: `${stats.avgRunway} Mo`, icon: Hourglass, color: "text-amber-400 bg-amber-500/5 border-amber-500/10" },
          { label: "Late Stage Series A", val: stats.seriesA, icon: TrendingUp, color: "text-rose-400 bg-rose-500/5 border-rose-500/10" }
        ].map((item, idx) => (
          <div key={idx} className={`border rounded-2xl p-4 backdrop-blur-sm ${item.color}`}>
            <div className="flex justify-between items-start">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">{item.label}</span>
              <item.icon className="w-4 h-4 opacity-75" />
            </div>
            <div className="text-2xl font-bold mt-2 font-mono">{item.val}</div>
          </div>
        ))}
      </div>

      {/* Control bar */}
      <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-3 min-w-[300px]">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search ventures by name, sector field, or founder..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500/40"
          >
            <option value="All">All Incubation Stages</option>
            <option value="Pre-seed">Pre-seed</option>
            <option value="Seed">Seed</option>
            <option value="Series A">Series A</option>
            <option value="Bootstrap">Bootstrap</option>
          </select>

          {selectedIds.size > 0 && (
            <button 
              onClick={handleDeleteSelected}
              className="flex items-center gap-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-rose-500/20 transition cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Selected ({selectedIds.size})</span>
            </button>
          )}
        </div>
      </div>

      {/* Table grid */}
      <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-400">
            <thead className="text-[10px] uppercase bg-slate-950/60 text-slate-500 tracking-wider font-bold border-b border-slate-800/50">
              <tr>
                <th className="px-5 py-4 w-10">
                  <button onClick={handleSelectAll} className="cursor-pointer">
                    {selectedIds.size === filteredStartups.length && filteredStartups.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-red-500" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-700" />
                    )}
                  </button>
                </th>
                <th className="px-5 py-4">Startup Company</th>
                <th className="px-5 py-4">Key Sector</th>
                <th className="px-5 py-4">Incubation Stage</th>
                <th className="px-5 py-4">Lead Founder</th>
                <th className="px-5 py-4 text-center">Runway</th>
                <th className="px-5 py-4 text-right">Funding Raised</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {filteredStartups.map((s) => {
                const isSelected = selectedIds.has(s.id);
                return (
                  <tr key={s.id} className={`hover:bg-slate-800/20 transition ${isSelected ? "bg-red-500/5" : ""}`}>
                    <td className="px-5 py-4">
                      <button onClick={() => handleSelectOne(s.id)} className="cursor-pointer">
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-red-500" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-855" />
                        )}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={s.logo} alt={s.name} className="w-8 h-8 rounded-lg object-cover border border-slate-800" />
                        <div>
                          <div className="font-semibold text-slate-200">{s.name}</div>
                          <div className="text-[9px] text-slate-500 font-mono mt-0.5">{s.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-350">{s.sector}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                        s.stage === "Series A" 
                          ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                          : s.stage === "Seed"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : s.stage === "Pre-seed"
                              ? "bg-sky-500/10 text-sky-400 border-sky-500/20"
                              : "bg-slate-500/10 text-slate-400 border-slate-500/20"
                      }`}>
                        {s.stage}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <User className="w-3.5 h-3.5 text-slate-650" />
                        <div>
                          <div>{s.founder}</div>
                          <div className="text-[9px] text-slate-650">{s.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-center font-mono font-semibold text-slate-300">
                      <span className={`${s.runway <= 8 ? "text-rose-400" : "text-slate-300"}`}>{s.runway} mo</span>
                    </td>
                    <td className="px-5 py-4 text-right font-semibold text-emerald-400 font-mono">
                      {s.fundingRaised > 0 ? `$${s.fundingRaised.toLocaleString()}` : "Bootstrapped"}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button 
                          onClick={() => openEditModal(s)}
                          title="Modify Details"
                          className="p-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-lg hover:border-slate-700 transition cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        
                        <button 
                          onClick={() => handleDeleteIndividual(s.id)}
                          title="Delete Venture"
                          className="p-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 rounded-lg hover:border-rose-900 transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {filteredStartups.length === 0 && (
          <div className="flex flex-col items-center justify-center p-16 text-center">
            <Compass className="w-10 h-10 text-slate-750 mb-3" />
            <h3 className="text-sm font-bold text-white">No Startups Found</h3>
            <p className="text-xs text-slate-500 mt-1">Adjust search parameters or register a new venture portfolio.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Startup Dialog */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl relative z-10 overflow-hidden text-left"
            >
              <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-950/20">
                <div>
                  <h2 className="text-base font-bold text-white">
                    {modalMode === "add" ? "Register Incubated Startup" : "Edit Startup Profile"}
                  </h2>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-white transition p-1 bg-slate-950/40 rounded-lg cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Company Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Aether AI"
                      value={formFields.name || ""}
                      onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Incubation Stage</label>
                    <select 
                      value={formFields.stage || "Pre-seed"}
                      onChange={(e) => setFormFields({ ...formFields, stage: e.target.value as any })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    >
                      <option value="Pre-seed">Pre-seed</option>
                      <option value="Seed">Seed</option>
                      <option value="Series A">Series A</option>
                      <option value="Bootstrap">Bootstrap</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Sector *</label>
                    <select 
                      value={formFields.sector || "Generative AI & LLMs"}
                      onChange={(e) => setFormFields({ ...formFields, sector: e.target.value })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    >
                      {SECTORS.map(sec => (
                        <option key={sec} value={sec}>{sec}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Funding Raised ($)</label>
                    <input 
                      type="number" 
                      min="0"
                      placeholder="e.g. 500000"
                      value={formFields.fundingRaised || 0}
                      onChange={(e) => setFormFields({ ...formFields, fundingRaised: Number(e.target.value) })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Lead Founder Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Floyd Miles"
                      value={formFields.founder || ""}
                      onChange={(e) => setFormFields({ ...formFields, founder: e.target.value })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Contact Email *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. founder@company.com"
                      value={formFields.email || ""}
                      onChange={(e) => setFormFields({ ...formFields, email: e.target.value })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Active Runway remaining (months)</label>
                  <input 
                    type="number" 
                    min="1"
                    placeholder="12"
                    value={formFields.runway || 12}
                    onChange={(e) => setFormFields({ ...formFields, runway: Number(e.target.value) })}
                    className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end gap-3 bg-slate-950/20 -mx-5 -mb-5 p-5">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-slate-850 bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-white text-xs font-semibold rounded-xl transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-bold rounded-xl hover:opacity-90 shadow-lg shadow-red-500/10 transition cursor-pointer"
                  >
                    {modalMode === "add" ? "Register Startup" : "Save Ventures"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

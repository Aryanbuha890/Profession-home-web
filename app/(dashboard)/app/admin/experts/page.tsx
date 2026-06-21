'use client';

import React, { useState, useMemo } from "react";
import { 
  Users, Search, Plus, Filter, Trash2, Edit, Star, 
  Briefcase, MessageSquare, DollarSign, Mail, CheckSquare, Square, X
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { AnimatePresence, motion } from "framer-motion";



interface ExpertRecord {
  id: string;
  name: string;
  email: string;
  expertise: string;
  hourlyRate: number; // in USD
  rating: number; // out of 5
  sessionsCount: number;
  status: "Active" | "Inactive";
  avatar: string;
}

const INITIAL_EXPERTS: ExpertRecord[] = [
  { id: "EXP-401", name: "Leslie Alexander", email: "leslie.alexander@expert.org", expertise: "B2B Growth & Marketing", hourlyRate: 150, rating: 4.9, sessionsCount: 142, status: "Active", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256" },
  { id: "EXP-402", name: "Michael Foster", email: "michael@fosterconsult.com", expertise: "Cloud Systems & DevOps", hourlyRate: 200, rating: 4.8, sessionsCount: 96, status: "Active", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256" },
  { id: "EXP-403", name: "Dries Vincent", email: "dries.vincent@scale.co", expertise: "Pre-seed Pitch & Funding", hourlyRate: 180, rating: 4.7, sessionsCount: 64, status: "Active", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256&h=256" },
  { id: "EXP-404", name: "Lindsay Walton", email: "lindsay@waltondesign.io", expertise: "UI/UX & Product Strategy", hourlyRate: 120, rating: 5.0, sessionsCount: 210, status: "Active", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256&h=256" },
  { id: "EXP-405", name: "Courtney Henry", email: "courtney.h@henrycap.com", expertise: "Capital Markets & Scaling", hourlyRate: 250, rating: 4.5, sessionsCount: 38, status: "Inactive", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=256&h=256" }
];

function AdminExpertsPage() {
  const [experts, setExperts] = useState<ExpertRecord[]>(INITIAL_EXPERTS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [formFields, setFormFields] = useState<Partial<ExpertRecord>>({
    name: "",
    email: "",
    expertise: "",
    hourlyRate: 100,
    rating: 5.0,
    sessionsCount: 0,
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256"
  });

  // Calculate metrics
  const stats = useMemo(() => {
    const total = experts.length;
    const totalSessions = experts.reduce((acc, e) => acc + e.sessionsCount, 0);
    const avgRate = total > 0 ? Math.round(experts.reduce((acc, e) => acc + e.hourlyRate, 0) / total) : 0;
    const avgRating = total > 0 ? (experts.reduce((acc, e) => acc + e.rating, 0) / total).toFixed(1) : "0.0";
    return { total, totalSessions, avgRate, avgRating };
  }, [experts]);

  // Filter list
  const filteredExperts = useMemo(() => {
    return experts.filter(e => {
      const matchesSearch = 
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.email.toLowerCase().includes(search.toLowerCase()) ||
        e.expertise.toLowerCase().includes(search.toLowerCase()) ||
        e.id.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || e.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [experts, search, statusFilter]);

  // Selection
  const handleSelectOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === filteredExperts.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredExperts.map(e => e.id)));
    }
  };

  // Actions
  const handleDeleteSelected = () => {
    setExperts(prev => prev.filter(e => !selectedIds.has(e.id)));
    toast.success(`Removed ${selectedIds.size} experts`);
    setSelectedIds(new Set());
  };

  const handleToggleStatus = (expert: ExpertRecord) => {
    const nextStatus = expert.status === "Active" ? "Inactive" : "Active";
    setExperts(prev => prev.map(e => e.id === expert.id ? { ...e, status: nextStatus } : e));
    toast.success(`Expert ${expert.name} is now ${nextStatus}`);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFields.name || !formFields.email || !formFields.expertise) {
      toast.error("Complete all required fields.");
      return;
    }

    if (modalMode === "add") {
      const newExp: ExpertRecord = {
        id: `EXP-${Math.floor(100 + Math.random() * 900)}`,
        name: formFields.name,
        email: formFields.email,
        expertise: formFields.expertise,
        hourlyRate: Number(formFields.hourlyRate) || 100,
        rating: Number(formFields.rating) || 5.0,
        sessionsCount: Number(formFields.sessionsCount) || 0,
        status: formFields.status || "Active",
        avatar: formFields.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256"
      };
      setExperts([newExp, ...experts]);
      toast.success(`Registered advisor ${newExp.name}`);
    } else {
      setExperts(prev => prev.map(e => e.id === editingId ? { ...e, ...formFields as ExpertRecord } : e));
      toast.success("Expert advisors profile saved.");
    }
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setModalMode("add");
    setFormFields({
      name: "",
      email: "",
      expertise: "",
      hourlyRate: 120,
      rating: 5.0,
      sessionsCount: 0,
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (exp: ExpertRecord) => {
    setModalMode("edit");
    setEditingId(exp.id);
    setFormFields(exp);
    setIsModalOpen(true);
  };

  const handleDeleteIndividual = (id: string) => {
    setExperts(prev => prev.filter(e => e.id !== id));
    toast.success("Expert profile removed from system registry.");
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
          <h1 className="text-2xl font-bold text-white tracking-tight">Expert Mentors & Advisors</h1>
          <p className="text-xs text-slate-400 mt-1">Manage network domain mentors, configure billing rates, monitor session counts, and view review ratings.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-1.5 bg-gradient-to-r from-red-500 to-rose-600 hover:opacity-95 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-lg shadow-red-500/10 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Advisor
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Advisors", val: stats.total, icon: Users, color: "text-slate-400 bg-slate-900/40 border-slate-800" },
          { label: "Sessions Conducted", val: stats.totalSessions, icon: MessageSquare, color: "text-violet-400 bg-violet-500/5 border-violet-500/10" },
          { label: "Avg Advisor Rate", val: `$${stats.avgRate}/hr`, icon: DollarSign, color: "text-emerald-400 bg-emerald-500/5 border-emerald-500/10" },
          { label: "Network Rating", val: `${stats.avgRating} / 5.0`, icon: Star, color: "text-amber-400 bg-amber-500/5 border-amber-500/10" }
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
              placeholder="Search experts by name, specialty domain, or email..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500/40"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
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
                    {selectedIds.size === filteredExperts.length && filteredExperts.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-red-500" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-700" />
                    )}
                  </button>
                </th>
                <th className="px-5 py-4">Advisor Details</th>
                <th className="px-5 py-4">Specialty Domain</th>
                <th className="px-5 py-4">Hourly Rate</th>
                <th className="px-5 py-4 text-center">Sessions Held</th>
                <th className="px-5 py-4">Rating</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {filteredExperts.map((exp) => {
                const isSelected = selectedIds.has(exp.id);
                return (
                  <tr key={exp.id} className={`hover:bg-slate-800/20 transition ${isSelected ? "bg-red-500/5" : ""}`}>
                    <td className="px-5 py-4">
                      <button onClick={() => handleSelectOne(exp.id)} className="cursor-pointer">
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-red-500" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-855" />
                        )}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={exp.avatar} alt={exp.name} className="w-8 h-8 rounded-full object-cover border border-slate-800" />
                        <div>
                          <div className="font-semibold text-slate-200">{exp.name}</div>
                          <div className="text-[9px] text-slate-500 mt-0.5">{exp.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                        <span>{exp.expertise}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-mono font-semibold text-emerald-400">${exp.hourlyRate}/hr</td>
                    <td className="px-5 py-4 text-center font-mono text-slate-300 font-semibold">{exp.sessionsCount}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 font-mono font-semibold text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{exp.rating}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <button 
                        onClick={() => handleToggleStatus(exp)}
                        className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border cursor-pointer transition ${
                          exp.status === "Active" 
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
                            : "bg-slate-500/10 text-slate-400 border-slate-500/20 hover:bg-slate-500/20"
                        }`}
                      >
                        {exp.status}
                      </button>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button 
                          onClick={() => openEditModal(exp)}
                          title="Modify Details"
                          className="p-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-lg hover:border-slate-700 transition cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        
                        <button 
                          onClick={() => handleDeleteIndividual(exp.id)}
                          title="Delete Profile"
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
        {filteredExperts.length === 0 && (
          <div className="flex flex-col items-center justify-center p-16 text-center">
            <Users className="w-10 h-10 text-slate-750 mb-3" />
            <h3 className="text-sm font-bold text-white">No Mentors Listed</h3>
            <p className="text-xs text-slate-500 mt-1">Adjust search parameters or add a new expert profile.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Expert Dialog */}
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
                    {modalMode === "add" ? "Register Expert Advisor" : "Edit Advisor Profile"}
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
                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Douglas Adams"
                    value={formFields.name || ""}
                    onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
                    className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Email Address *</label>
                  <input 
                    type="email" 
                    required
                    placeholder="e.g. adams@galaxy.org"
                    value={formFields.email || ""}
                    onChange={(e) => setFormFields({ ...formFields, email: e.target.value })}
                    className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Advisor Specialty Domain *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Pre-seed Pitch & Funding"
                    value={formFields.expertise || ""}
                    onChange={(e) => setFormFields({ ...formFields, expertise: e.target.value })}
                    className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Hourly Rate ($/hr)</label>
                    <input 
                      type="number" 
                      min="10"
                      value={formFields.hourlyRate || 100}
                      onChange={(e) => setFormFields({ ...formFields, hourlyRate: Number(e.target.value) })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Advisor Status</label>
                    <select 
                      value={formFields.status || "Active"}
                      onChange={(e) => setFormFields({ ...formFields, status: e.target.value as any })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
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
                    {modalMode === "add" ? "Register Advisor" : "Save Advisor"}
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

export default AdminExpertsPage;

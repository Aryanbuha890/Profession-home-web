'use client';

import React, { useState, useMemo } from "react";
import { 
  Brain, Search, Plus, Filter, Trash2, Edit, BookOpen, 
  Coins, Award, Building, Mail, CheckSquare, Square, X
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { AnimatePresence, motion } from "framer-motion";



interface ResearcherRecord {
  id: string;
  name: string;
  email: string;
  field: string;
  publications: number;
  grantsValue: number; // in USD
  patents: number;
  institution: string;
  avatar: string;
}

const INITIAL_RESEARCHERS: ResearcherRecord[] = [
  { id: "RES-201", name: "Dr. Sarah Jenkins", email: "s.jenkins@university.edu", field: "Bio-informatics & Genetics", publications: 84, grantsValue: 120000, patents: 3, institution: "Stanford University", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256&h=256" },
  { id: "RES-202", name: "Dr. Vikram Singh", email: "v.singh@iit.ac.in", field: "Quantum Grid Computing", publications: 115, grantsValue: 245000, patents: 8, institution: "IIT Madras", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256" },
  { id: "RES-203", name: "Dr. Elena Rostova", email: "e.rostova@data-sci.edu", field: "Neural Network Architecture", publications: 210, grantsValue: 430000, patents: 12, institution: "MIT", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256&h=256" },
  { id: "RES-204", name: "Prof. Rajesh Kumar", email: "rajesh.k@robotics.in", field: "Autonomous Bipedal Robotics", publications: 32, grantsValue: 65000, patents: 1, institution: "IISc Bangalore", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256&h=256" }
];

function AdminResearchersPage() {
  const [researchers, setResearchers] = useState<ResearcherRecord[]>(INITIAL_RESEARCHERS);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [formFields, setFormFields] = useState<Partial<ResearcherRecord>>({
    name: "",
    email: "",
    field: "",
    publications: 0,
    grantsValue: 0,
    patents: 0,
    institution: "",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256&h=256"
  });

  // Calculate metrics
  const stats = useMemo(() => {
    const total = researchers.length;
    const totalPubs = researchers.reduce((acc, r) => acc + r.publications, 0);
    const totalGrants = researchers.reduce((acc, r) => acc + r.grantsValue, 0);
    const totalPatents = researchers.reduce((acc, r) => acc + r.patents, 0);
    return { total, totalPubs, totalGrants, totalPatents };
  }, [researchers]);

  // Filter list
  const filteredResearchers = useMemo(() => {
    return researchers.filter(r => {
      return (
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.email.toLowerCase().includes(search.toLowerCase()) ||
        r.field.toLowerCase().includes(search.toLowerCase()) ||
        r.institution.toLowerCase().includes(search.toLowerCase()) ||
        r.id.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [researchers, search]);

  // Selection
  const handleSelectOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === filteredResearchers.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredResearchers.map(r => r.id)));
    }
  };

  // Actions
  const handleDeleteSelected = () => {
    setResearchers(prev => prev.filter(r => !selectedIds.has(r.id)));
    toast.success(`Removed ${selectedIds.size} researcher accounts`);
    setSelectedIds(new Set());
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFields.name || !formFields.email || !formFields.field || !formFields.institution) {
      toast.error("Complete all required fields.");
      return;
    }

    if (modalMode === "add") {
      const newRes: ResearcherRecord = {
        id: `RES-${Math.floor(100 + Math.random() * 900)}`,
        name: formFields.name,
        email: formFields.email,
        field: formFields.field,
        publications: Number(formFields.publications) || 0,
        grantsValue: Number(formFields.grantsValue) || 0,
        patents: Number(formFields.patents) || 0,
        institution: formFields.institution,
        avatar: formFields.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256&h=256"
      };
      setResearchers([newRes, ...researchers]);
      toast.success(`Registered researcher ${newRes.name}`);
    } else {
      setResearchers(prev => prev.map(r => r.id === editingId ? { ...r, ...formFields as ResearcherRecord } : r));
      toast.success("Researcher profiles updated successfully.");
    }
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setModalMode("add");
    setFormFields({
      name: "",
      email: "",
      field: "",
      publications: 5,
      grantsValue: 50000,
      patents: 0,
      institution: "",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256&h=256"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (r: ResearcherRecord) => {
    setModalMode("edit");
    setEditingId(r.id);
    setFormFields(r);
    setIsModalOpen(true);
  };

  const handleDeleteIndividual = (id: string) => {
    setResearchers(prev => prev.filter(r => r.id !== id));
    toast.success("Researcher record removed.");
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
          <h1 className="text-2xl font-bold text-white tracking-tight">Researchers Registry</h1>
          <p className="text-xs text-slate-400 mt-1">Monitor academic publications count, active grants, patent registries, and affiliations.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-1.5 bg-gradient-to-r from-red-500 to-rose-600 hover:opacity-95 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-lg shadow-red-500/10 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Researcher
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Researchers", val: stats.total, icon: Brain, color: "text-slate-400 bg-slate-900/40 border-slate-800" },
          { label: "Publications Count", val: stats.totalPubs, icon: BookOpen, color: "text-violet-400 bg-violet-500/5 border-violet-500/10" },
          { label: "Grant Pool Funding", val: `$${(stats.totalGrants / 1000).toFixed(0)}k`, icon: Coins, color: "text-emerald-400 bg-emerald-500/5 border-emerald-500/10" },
          { label: "Patents Registered", val: stats.totalPatents, icon: Award, color: "text-amber-400 bg-amber-500/5 border-amber-500/10" }
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
              placeholder="Search researchers by name, domain field, or university..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition"
            />
          </div>
        </div>

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

      {/* Table grid */}
      <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-400">
            <thead className="text-[10px] uppercase bg-slate-950/60 text-slate-500 tracking-wider font-bold border-b border-slate-800/50">
              <tr>
                <th className="px-5 py-4 w-10">
                  <button onClick={handleSelectAll} className="cursor-pointer">
                    {selectedIds.size === filteredResearchers.length && filteredResearchers.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-red-500" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-700" />
                    )}
                  </button>
                </th>
                <th className="px-5 py-4">Researcher Details</th>
                <th className="px-5 py-4">Domain Research Field</th>
                <th className="px-5 py-4">University Institution</th>
                <th className="px-5 py-4 font-mono text-center">Pubs / Patents</th>
                <th className="px-5 py-4 text-right">Active Grants</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {filteredResearchers.map((r) => {
                const isSelected = selectedIds.has(r.id);
                return (
                  <tr key={r.id} className={`hover:bg-slate-800/20 transition ${isSelected ? "bg-red-500/5" : ""}`}>
                    <td className="px-5 py-4">
                      <button onClick={() => handleSelectOne(r.id)} className="cursor-pointer">
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-red-500" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-855" />
                        )}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={r.avatar} alt={r.name} className="w-8 h-8 rounded-full object-cover border border-slate-800" />
                        <div>
                          <div className="font-semibold text-slate-200">{r.name}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">{r.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-300">{r.field}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Building className="w-3.5 h-3.5 text-slate-650" />
                        <span>{r.institution}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-center font-mono font-semibold text-slate-300">
                      <span>{r.publications}</span>
                      <span className="text-slate-600 px-1">/</span>
                      <span className="text-amber-400">{r.patents}</span>
                    </td>
                    <td className="px-5 py-4 text-right font-semibold text-emerald-400 font-mono">
                      ${r.grantsValue.toLocaleString()}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button 
                          onClick={() => openEditModal(r)}
                          title="Modify Details"
                          className="p-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-lg hover:border-slate-700 transition cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        
                        <button 
                          onClick={() => handleDeleteIndividual(r.id)}
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
        {filteredResearchers.length === 0 && (
          <div className="flex flex-col items-center justify-center p-16 text-center">
            <Brain className="w-10 h-10 text-slate-750 mb-3" />
            <h3 className="text-sm font-bold text-white">No Researchers Found</h3>
            <p className="text-xs text-slate-500 mt-1">Adjust search parameters or add a new researcher profile.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Researcher Dialog */}
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
                    {modalMode === "add" ? "Register Academic Researcher" : "Edit Researcher Profile"}
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
                    placeholder="e.g. Dr. Ada Lovelace"
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
                    placeholder="e.g. ada@analytical-engine.com"
                    value={formFields.email || ""}
                    onChange={(e) => setFormFields({ ...formFields, email: e.target.value })}
                    className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Research Domain Field *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Quantum Computing"
                      value={formFields.field || ""}
                      onChange={(e) => setFormFields({ ...formFields, field: e.target.value })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">University Institution *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Stanford University"
                      value={formFields.institution || ""}
                      onChange={(e) => setFormFields({ ...formFields, institution: e.target.value })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Publications</label>
                    <input 
                      type="number" 
                      min="0"
                      value={formFields.publications || 0}
                      onChange={(e) => setFormFields({ ...formFields, publications: Number(e.target.value) })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Patents Registered</label>
                    <input 
                      type="number" 
                      min="0"
                      value={formFields.patents || 0}
                      onChange={(e) => setFormFields({ ...formFields, patents: Number(e.target.value) })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Active Grants ($)</label>
                    <input 
                      type="number" 
                      min="0"
                      placeholder="100000"
                      value={formFields.grantsValue || 0}
                      onChange={(e) => setFormFields({ ...formFields, grantsValue: Number(e.target.value) })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    />
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
                    {modalMode === "add" ? "Register Academic" : "Save Settings"}
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

export default AdminResearchersPage;

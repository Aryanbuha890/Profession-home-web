'use client';

import React, { useState, useMemo } from "react";
import { 
  Building, Search, Plus, Filter, Trash2, Edit, GraduationCap, 
  Briefcase, Percent, Award, Mail, CheckSquare, Square, X
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { AnimatePresence, motion } from "framer-motion";



interface UniversityRecord {
  id: string;
  name: string;
  coordinatorName: string;
  email: string;
  placementRate: number; // percentage
  studentsCount: number;
  partnersCount: number;
  logo: string;
}

const INITIAL_UNIVERSITIES: UniversityRecord[] = [
  { id: "UNI-501", name: "Stanford University", coordinatorName: "Prof. Alan Vance", email: "a.vance@stanford.edu", placementRate: 96, studentsCount: 4200, partnersCount: 84, logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=256&h=256" },
  { id: "UNI-502", name: "MIT", coordinatorName: "Sarah Jenkins", email: "sarah@mit.edu", placementRate: 98, studentsCount: 3800, partnersCount: 125, logo: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=256&h=256" },
  { id: "UNI-503", name: "IIT Madras", coordinatorName: "Dr. Arvind Menon", email: "dean.cs@iitm.ac.in", placementRate: 94, studentsCount: 5100, partnersCount: 68, logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=256&h=256" },
  { id: "UNI-504", name: "IISc Bangalore", coordinatorName: "Prof. Rajesh Kumar", email: "placement@iisc.ac.in", placementRate: 92, studentsCount: 2400, partnersCount: 45, logo: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=256&h=256" }
];

function AdminUniversitiesPage() {
  const [universities, setUniversities] = useState<UniversityRecord[]>(INITIAL_UNIVERSITIES);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [formFields, setFormFields] = useState<Partial<UniversityRecord>>({
    name: "",
    coordinatorName: "",
    email: "",
    placementRate: 90,
    studentsCount: 1000,
    partnersCount: 10,
    logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=256&h=256"
  });

  // Calculate metrics
  const stats = useMemo(() => {
    const total = universities.length;
    const totalStudents = universities.reduce((acc, u) => acc + u.studentsCount, 0);
    const totalPartners = universities.reduce((acc, u) => acc + u.partnersCount, 0);
    const avgPlacement = total > 0 ? Math.round(universities.reduce((acc, u) => acc + u.placementRate, 0) / total) : 0;
    return { total, totalStudents, totalPartners, avgPlacement };
  }, [universities]);

  // Filter list
  const filteredUniversities = useMemo(() => {
    return universities.filter(u => {
      return (
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.coordinatorName.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.id.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [universities, search]);

  // Selection
  const handleSelectOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === filteredUniversities.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredUniversities.map(u => u.id)));
    }
  };

  // Actions
  const handleDeleteSelected = () => {
    setUniversities(prev => prev.filter(u => !selectedIds.has(u.id)));
    toast.success(`Removed ${selectedIds.size} universities`);
    setSelectedIds(new Set());
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFields.name || !formFields.coordinatorName || !formFields.email) {
      toast.error("Complete all required fields.");
      return;
    }

    if (modalMode === "add") {
      const newUni: UniversityRecord = {
        id: `UNI-${Math.floor(100 + Math.random() * 900)}`,
        name: formFields.name,
        coordinatorName: formFields.coordinatorName,
        email: formFields.email,
        placementRate: Number(formFields.placementRate) || 80,
        studentsCount: Number(formFields.studentsCount) || 1000,
        partnersCount: Number(formFields.partnersCount) || 10,
        logo: formFields.logo || "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=256&h=256"
      };
      setUniversities([newUni, ...universities]);
      toast.success(`Registered university profile ${newUni.name}`);
    } else {
      setUniversities(prev => prev.map(u => u.id === editingId ? { ...u, ...formFields as UniversityRecord } : u));
      toast.success("University profile details updated.");
    }
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setModalMode("add");
    setFormFields({
      name: "",
      coordinatorName: "",
      email: "",
      placementRate: 90,
      studentsCount: 1500,
      partnersCount: 20,
      logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=256&h=256"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (u: UniversityRecord) => {
    setModalMode("edit");
    setEditingId(u.id);
    setFormFields(u);
    setIsModalOpen(true);
  };

  const handleDeleteIndividual = (id: string) => {
    setUniversities(prev => prev.filter(u => u.id !== id));
    toast.success("University registry file deleted.");
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
          <h1 className="text-2xl font-bold text-white tracking-tight">University Institutes & Campus Partners</h1>
          <p className="text-xs text-slate-400 mt-1">Manage partner universities, placement drive analytics, student enrollment pools, and industry partners.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-1.5 bg-gradient-to-r from-red-500 to-rose-600 hover:opacity-95 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-lg shadow-red-500/10 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Campus
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Partner Campuses", val: stats.total, icon: Building, color: "text-slate-400 bg-slate-900/40 border-slate-800" },
          { label: "Active Student Pool", val: stats.totalStudents.toLocaleString(), icon: GraduationCap, color: "text-violet-400 bg-violet-500/5 border-violet-500/10" },
          { label: "Placement Rate Avg", val: `${stats.avgPlacement}%`, icon: Percent, color: "text-emerald-400 bg-emerald-500/5 border-emerald-500/10" },
          { label: "Linked Recruiter Orgs", val: stats.totalPartners, icon: Briefcase, color: "text-amber-400 bg-amber-500/5 border-amber-500/10" }
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
              placeholder="Search universities by name, coordinator, or email..." 
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
                    {selectedIds.size === filteredUniversities.length && filteredUniversities.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-red-500" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-700" />
                    )}
                  </button>
                </th>
                <th className="px-5 py-4">University Name</th>
                <th className="px-5 py-4">Placement Coordinator</th>
                <th className="px-5 py-4 text-center">Student Pool</th>
                <th className="px-5 py-4 text-center">Industry Partners</th>
                <th className="px-5 py-4 text-right">Placement Rate</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {filteredUniversities.map((uni) => {
                const isSelected = selectedIds.has(uni.id);
                return (
                  <tr key={uni.id} className={`hover:bg-slate-800/20 transition ${isSelected ? "bg-red-500/5" : ""}`}>
                    <td className="px-5 py-4">
                      <button onClick={() => handleSelectOne(uni.id)} className="cursor-pointer">
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-red-500" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-855" />
                        )}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={uni.logo} alt={uni.name} className="w-8 h-8 rounded-lg object-cover border border-slate-800" />
                        <div>
                          <div className="font-semibold text-slate-200">{uni.name}</div>
                          <div className="text-[9px] text-slate-500 font-mono mt-0.5">{uni.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-slate-300 font-semibold">{uni.coordinatorName}</div>
                      <div className="text-[9px] text-slate-550 flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3" />
                        <span>{uni.email}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-center font-mono font-semibold text-slate-300">
                      {uni.studentsCount.toLocaleString()}
                    </td>
                    <td className="px-5 py-4 text-center font-mono font-semibold text-slate-300">
                      {uni.partnersCount}
                    </td>
                    <td className="px-5 py-4 text-right font-semibold text-emerald-400 font-mono">
                      {uni.placementRate}%
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button 
                          onClick={() => openEditModal(uni)}
                          title="Modify Details"
                          className="p-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-lg hover:border-slate-700 transition cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        
                        <button 
                          onClick={() => handleDeleteIndividual(uni.id)}
                          title="Delete University Registry"
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
        {filteredUniversities.length === 0 && (
          <div className="flex flex-col items-center justify-center p-16 text-center">
            <Building className="w-10 h-10 text-slate-750 mb-3" />
            <h3 className="text-sm font-bold text-white">No Universities Registered</h3>
            <p className="text-xs text-slate-500 mt-1">Adjust search parameters or add a new partner campus profile.</p>
          </div>
        )}
      </div>

      {/* Add / Edit University Dialog */}
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
                    {modalMode === "add" ? "Register Partner Campus" : "Edit Campus Profile"}
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
                  <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">University Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Stanford University"
                    value={formFields.name || ""}
                    onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
                    className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Coordinator Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Prof. Alan Vance"
                      value={formFields.coordinatorName || ""}
                      onChange={(e) => setFormFields({ ...formFields, coordinatorName: e.target.value })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Coordinator Email *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. placement@university.edu"
                      value={formFields.email || ""}
                      onChange={(e) => setFormFields({ ...formFields, email: e.target.value })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Student Pool</label>
                    <input 
                      type="number" 
                      min="0"
                      value={formFields.studentsCount || 0}
                      onChange={(e) => setFormFields({ ...formFields, studentsCount: Number(e.target.value) })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Partners Count</label>
                    <input 
                      type="number" 
                      min="0"
                      value={formFields.partnersCount || 0}
                      onChange={(e) => setFormFields({ ...formFields, partnersCount: Number(e.target.value) })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Placement Rate (%)</label>
                    <input 
                      type="number" 
                      min="0"
                      max="100"
                      placeholder="95"
                      value={formFields.placementRate || 0}
                      onChange={(e) => setFormFields({ ...formFields, placementRate: Number(e.target.value) })}
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
                    {modalMode === "add" ? "Register Campus" : "Save Campus"}
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

export default AdminUniversitiesPage;

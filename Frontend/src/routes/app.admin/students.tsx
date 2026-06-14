import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useMemo } from "react";
import { 
  GraduationCap, Search, Plus, Filter, Trash2, Edit, 
  Map, Award, Mail, Calendar, CheckSquare, Square, X, Brain
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

export const Route = createFileRoute("/app/admin/students")({
  component: AdminStudentsPage,
});

interface StudentRecord {
  id: string;
  name: string;
  email: string;
  roadmap: string;
  assessmentScore: number;
  placementStatus: "Placed" | "Seeking Opportunities" | "Interning";
  enrolledDate: string;
  avatar: string;
}

const INITIAL_STUDENTS: StudentRecord[] = [
  { id: "STU-101", name: "Aryan Sharma", email: "aryan.sharma@growtharena.com", roadmap: "Full-Stack Web Engineer", assessmentScore: 92, placementStatus: "Seeking Opportunities", enrolledDate: "2024-01-15", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256" },
  { id: "STU-102", name: "Riya Patel", email: "riya.p@growtharena.com", roadmap: "Data Scientist", assessmentScore: 88, placementStatus: "Placed", enrolledDate: "2023-11-10", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256&h=256" },
  { id: "STU-103", name: "Amit Kumar", email: "amit.k@growtharena.com", roadmap: "DevOps Engineer", assessmentScore: 78, placementStatus: "Interning", enrolledDate: "2024-02-05", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256&h=256" },
  { id: "STU-104", name: "Sneha Reddy", email: "sneha.r@growtharena.com", roadmap: "Product Manager", assessmentScore: 95, placementStatus: "Placed", enrolledDate: "2023-08-20", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256&h=256" },
  { id: "STU-105", name: "Vikram Desai", email: "vikram.d@growtharena.com", roadmap: "Cloud Solutions Architect", assessmentScore: 84, placementStatus: "Seeking Opportunities", enrolledDate: "2024-03-01", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256&h=256" }
];

function AdminStudentsPage() {
  const [students, setStudents] = useState<StudentRecord[]>(INITIAL_STUDENTS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [formFields, setFormFields] = useState<Partial<StudentRecord>>({
    name: "",
    email: "",
    roadmap: "Full-Stack Web Engineer",
    assessmentScore: 80,
    placementStatus: "Seeking Opportunities",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256"
  });

  // Calculate metrics
  const stats = useMemo(() => {
    const total = students.length;
    const placed = students.filter(s => s.placementStatus === "Placed").length;
    const seeking = students.filter(s => s.placementStatus === "Seeking Opportunities").length;
    const avgScore = total > 0 ? Math.round(students.reduce((acc, s) => acc + s.assessmentScore, 0) / total) : 0;
    return { total, placed, seeking, avgScore };
  }, [students]);

  // Filter students
  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchesSearch = 
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase()) ||
        s.roadmap.toLowerCase().includes(search.toLowerCase()) ||
        s.id.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || s.placementStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [students, search, statusFilter]);

  // Checkboxes
  const handleSelectOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === filteredStudents.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredStudents.map(s => s.id)));
    }
  };

  // Actions
  const handleDeleteSelected = () => {
    setStudents(prev => prev.filter(s => !selectedIds.has(s.id)));
    toast.success(`Deleted ${selectedIds.size} student records`);
    setSelectedIds(new Set());
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFields.name || !formFields.email || !formFields.roadmap) {
      toast.error("Complete all required fields.");
      return;
    }

    if (modalMode === "add") {
      const newStu: StudentRecord = {
        id: `STU-${Math.floor(100 + Math.random() * 900)}`,
        name: formFields.name,
        email: formFields.email,
        roadmap: formFields.roadmap,
        assessmentScore: Number(formFields.assessmentScore) || 75,
        placementStatus: formFields.placementStatus || "Seeking Opportunities",
        enrolledDate: new Date().toISOString().split("T")[0],
        avatar: formFields.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256"
      };
      setStudents([newStu, ...students]);
      toast.success(`Registered student profile for ${newStu.name}`);
    } else {
      setStudents(prev => prev.map(s => s.id === editingId ? { ...s, ...formFields as StudentRecord } : s));
      toast.success("Student records updated successfully.");
    }
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setModalMode("add");
    setFormFields({
      name: "",
      email: "",
      roadmap: "Full-Stack Web Engineer",
      assessmentScore: 80,
      placementStatus: "Seeking Opportunities",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (stu: StudentRecord) => {
    setModalMode("edit");
    setEditingId(stu.id);
    setFormFields(stu);
    setIsModalOpen(true);
  };

  const handleDeleteIndividual = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    toast.success("Student file removed from database.");
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
          <h1 className="text-2xl font-bold text-white tracking-tight">Student Administrative Command</h1>
          <p className="text-xs text-slate-400 mt-1">Track career roadmap tracks, placement statuses, and skill ratings for all active students.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-1.5 bg-gradient-to-r from-red-500 to-rose-600 hover:opacity-95 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-lg shadow-red-500/10 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Enroll Student
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Enrolled Students", val: stats.total, icon: GraduationCap, color: "text-slate-400 bg-slate-900/40 border-slate-800" },
          { label: "Successfully Placed", val: stats.placed, icon: Award, color: "text-emerald-400 bg-emerald-500/5 border-emerald-500/10" },
          { label: "Actively Recruiting", val: stats.seeking, icon: Search, color: "text-sky-400 bg-sky-500/5 border-sky-500/10" },
          { label: "Avg Assessment Score", val: `${stats.avgScore}%`, icon: Brain, color: "text-indigo-400 bg-indigo-500/5 border-indigo-500/10" }
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
              placeholder="Search by name, email, roadmap, or ID..." 
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
            <option value="All">All Placement States</option>
            <option value="Seeking Opportunities">Seeking Opportunities</option>
            <option value="Placed">Placed</option>
            <option value="Interning">Interning</option>
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
                    {selectedIds.size === filteredStudents.length && filteredStudents.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-red-500" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-700" />
                    )}
                  </button>
                </th>
                <th className="px-5 py-4">Student Details</th>
                <th className="px-5 py-4">Roadmap Track</th>
                <th className="px-5 py-4">AI Score</th>
                <th className="px-5 py-4">Placement Status</th>
                <th className="px-5 py-4">Enrolled Date</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {filteredStudents.map((stu) => {
                const isSelected = selectedIds.has(stu.id);
                return (
                  <tr key={stu.id} className={`hover:bg-slate-800/20 transition ${isSelected ? "bg-red-500/5" : ""}`}>
                    <td className="px-5 py-4">
                      <button onClick={() => handleSelectOne(stu.id)} className="cursor-pointer">
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-red-500" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-855" />
                        )}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={stu.avatar} alt={stu.name} className="w-8 h-8 rounded-full object-cover border border-slate-800" />
                        <div>
                          <div className="font-semibold text-slate-200">{stu.name}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">{stu.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Map className="w-3.5 h-3.5 text-slate-500" />
                        <span>{stu.roadmap}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-semibold text-indigo-400 font-mono">{stu.assessmentScore}%</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                        stu.placementStatus === "Placed" 
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : stu.placementStatus === "Interning"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : "bg-sky-500/10 text-sky-400 border-sky-500/20"
                      }`}>
                        {stu.placementStatus}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-mono text-slate-500">{stu.enrolledDate}</td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button 
                          onClick={() => openEditModal(stu)}
                          title="Modify Student Details"
                          className="p-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-lg hover:border-slate-700 transition cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        
                        <button 
                          onClick={() => handleDeleteIndividual(stu.id)}
                          title="Delete Student Records"
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
        {filteredStudents.length === 0 && (
          <div className="flex flex-col items-center justify-center p-16 text-center">
            <GraduationCap className="w-10 h-10 text-slate-700 mb-3" />
            <h3 className="text-sm font-bold text-white">No Enrolled Students</h3>
            <p className="text-xs text-slate-500 mt-1">Adjust search parameters or register a new student.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Student Dialog */}
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
                    {modalMode === "add" ? "Enroll New Student Profile" : "Modify Student Profile"}
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
                    placeholder="e.g. John Doe"
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
                    placeholder="e.g. j.doe@growtharena.com"
                    value={formFields.email || ""}
                    onChange={(e) => setFormFields({ ...formFields, email: e.target.value })}
                    className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Active Roadmap Track *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Full-Stack Web Engineer"
                    value={formFields.roadmap || ""}
                    onChange={(e) => setFormFields({ ...formFields, roadmap: e.target.value })}
                    className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Assessment Score (%)</label>
                    <input 
                      type="number" 
                      min="0"
                      max="100"
                      placeholder="85"
                      value={formFields.assessmentScore || 0}
                      onChange={(e) => setFormFields({ ...formFields, assessmentScore: Number(e.target.value) })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Placement Status</label>
                    <select 
                      value={formFields.placementStatus || "Seeking Opportunities"}
                      onChange={(e) => setFormFields({ ...formFields, placementStatus: e.target.value as any })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    >
                      <option value="Seeking Opportunities">Seeking Opportunities</option>
                      <option value="Placed">Placed</option>
                      <option value="Interning">Interning</option>
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
                    {modalMode === "add" ? "Enroll Profile" : "Save Profile"}
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

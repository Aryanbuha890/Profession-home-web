import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { 
  Users, Search, Filter, Mail, Phone, MoreVertical, MoreHorizontal, 
  Plus, Trash2, Download, Printer, ThumbsDown, Check, X, 
  ChevronDown, Calendar, Briefcase, GraduationCap, Star, 
  FileText, CheckSquare, Square, Eye, Edit, UserMinus, UserCheck, Tag, Send
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

export const Route = createFileRoute("/app/university/faculty")({
  component: FacultyPage,
});

interface FacultyMember {
  id: string;
  name: string;
  role: string;
  department: string;
  dateHired: string;
  email: string;
  phone: string;
  status: "Active" | "On Leave" | "Research Period" | "Pending";
  avatar: string;
  tags?: string[];
}

const AVATAR_PRESETS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256", // Male CS
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256&h=256", // Female Biotech
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256&h=256", // Male CS 2
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256&h=256", // Female Physics
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256", // Female Math
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256&h=256", // Male Physics 2
];

const DEPARTMENTS = [
  "Computer Science",
  "Biotechnology",
  "Physics",
  "Data Science",
  "Mathematics",
  "Mechanical Eng."
];

const STATUSES = [
  "Active",
  "On Leave",
  "Research Period",
  "Pending"
];

function FacultyPage() {
  // Mock initial faculty members
  const [facultyList, setFacultyList] = useState<FacultyMember[]>([
    {
      id: "FAC-001",
      name: "Dr. Ronald Richards",
      role: "Dean of Computer Science",
      department: "Computer Science",
      dateHired: "17/03/2021",
      email: "ronald.richards@university.edu",
      phone: "+1-202-555-0129",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256",
      tags: ["Tenured", "HOD"]
    },
    {
      id: "FAC-002",
      name: "Dr. Kathryn Murphy",
      role: "Professor of Biotechnology",
      department: "Biotechnology",
      dateHired: "12/05/2020",
      email: "kathryn.murphy@university.edu",
      phone: "+1-202-555-0130",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256&h=256",
      tags: ["Research Lead"]
    },
    {
      id: "FAC-003",
      name: "Prof. Floyd Miles",
      role: "Associate Professor",
      department: "Computer Science",
      dateHired: "24/09/2022",
      email: "floyd.miles@university.edu",
      phone: "+1-202-555-0131",
      status: "Research Period",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256&h=256",
      tags: ["AI Ethics"]
    },
    {
      id: "FAC-004",
      name: "Dr. Sarah Jenkins",
      role: "Assistant Professor",
      department: "Physics",
      dateHired: "01/02/2023",
      email: "sarah.jenkins@university.edu",
      phone: "+1-202-555-0132",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256&h=256",
      tags: ["Quantum Optics"]
    },
    {
      id: "FAC-005",
      name: "Prof. Leslie Alexander",
      role: "Mathematics Instructor",
      department: "Mathematics",
      dateHired: "15/07/2019",
      email: "leslie.alexander@university.edu",
      phone: "+1-202-555-0133",
      status: "On Leave",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256",
      tags: ["Calculus"]
    },
    {
      id: "FAC-006",
      name: "Dr. Dianne Russell",
      role: "Research Fellow",
      department: "Data Science",
      dateHired: "10/11/2023",
      email: "dianne.russell@university.edu",
      phone: "+1-202-555-0134",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=256&h=256",
      tags: ["Big Data"]
    },
    {
      id: "FAC-007",
      name: "Prof. Courtney Henry",
      role: "Professor of Chemistry",
      department: "Biotechnology",
      dateHired: "05/01/2021",
      email: "courtney.henry@university.edu",
      phone: "+1-202-555-0135",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256&h=256",
      tags: ["Biochemistry"]
    },
    {
      id: "FAC-008",
      name: "Dr. Savannah Nguyen",
      role: "Senior Lecturer",
      department: "Physics",
      dateHired: "18/08/2024",
      email: "savannah.nguyen@university.edu",
      phone: "+1-202-555-0136",
      status: "Pending",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=256&h=256",
      tags: ["Astrophysics"]
    }
  ]);

  // UI state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deptFilter, setDeptFilter] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [editingFacultyId, setEditingFacultyId] = useState<string | null>(null);
  
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailForm, setEmailForm] = useState({ subject: "", body: "" });
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Form Fields
  const [formFields, setFormFields] = useState<Partial<FacultyMember>>({
    name: "",
    role: "",
    department: "Computer Science",
    email: "",
    phone: "",
    dateHired: new Date().toISOString().split("T")[0],
    status: "Active",
    avatar: AVATAR_PRESETS[0],
    tags: []
  });

  // Dropdown states
  const [activeCardMenuId, setActiveCardMenuId] = useState<string | null>(null);
  const [isBulkActionOpen, setIsBulkActionOpen] = useState(false);
  const [bulkTagInput, setBulkTagInput] = useState("");
  const [isBulkTagting, setIsBulkTagting] = useState(false);

  // Click outside ref helpers
  const cardMenuRef = useRef<HTMLDivElement | null>(null);
  const bulkMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cardMenuRef.current && !cardMenuRef.current.contains(event.target as Node)) {
        setActiveCardMenuId(null);
      }
      if (bulkMenuRef.current && !bulkMenuRef.current.contains(event.target as Node)) {
        setIsBulkActionOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter computation
  const filteredFaculty = useMemo(() => {
    return facultyList.filter(f => {
      const matchesSearch = 
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.email.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesStatus = statusFilter === "All" || f.status === statusFilter;
      const matchesDept = deptFilter === "All" || f.department === deptFilter;
      
      return matchesSearch && matchesStatus && matchesDept;
    });
  }, [facultyList, searchQuery, statusFilter, deptFilter]);

  // Checkbox functions
  const handleSelectCard = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === filteredFaculty.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredFaculty.map(f => f.id)));
    }
  };

  // Add / Edit submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFields.name || !formFields.email || !formFields.role) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (formMode === "add") {
      const newMember: FacultyMember = {
        id: `FAC-${Math.floor(100 + Math.random() * 900)}`,
        name: formFields.name || "",
        role: formFields.role || "",
        department: formFields.department || "Computer Science",
        dateHired: formFields.dateHired || new Date().toISOString().split("T")[0],
        email: formFields.email || "",
        phone: formFields.phone || "+1-000-000-0000",
        status: (formFields.status as any) || "Active",
        avatar: formFields.avatar || AVATAR_PRESETS[0],
        tags: formFields.tags || []
      };
      setFacultyList([newMember, ...facultyList]);
      toast.success(`Successfully added ${newMember.name}!`);
    } else {
      setFacultyList(prev => prev.map(f => f.id === editingFacultyId ? { ...f, ...formFields as FacultyMember } : f));
      toast.success(`Successfully updated profile details!`);
    }
    setIsFormModalOpen(false);
  };

  // Open forms
  const openAddModal = () => {
    setFormMode("add");
    setFormFields({
      name: "",
      role: "",
      department: "Computer Science",
      email: "",
      phone: "",
      dateHired: new Date().toISOString().split("T")[0],
      status: "Active",
      avatar: AVATAR_PRESETS[Math.floor(Math.random() * AVATAR_PRESETS.length)],
      tags: []
    });
    setIsFormModalOpen(true);
  };

  const openEditModal = (member: FacultyMember) => {
    setFormMode("edit");
    setEditingFacultyId(member.id);
    setFormFields(member);
    setIsFormModalOpen(true);
  };

  // Bulk Actions
  const handleBulkDeactivate = () => {
    setFacultyList(prev => prev.map(f => selectedIds.has(f.id) ? { ...f, status: "On Leave" } : f));
    toast.success(`Suspended/On Leave status applied to ${selectedIds.size} faculty members.`);
    setSelectedIds(new Set());
  };

  const handleBulkDelete = () => {
    setFacultyList(prev => prev.filter(f => !selectedIds.has(f.id)));
    toast.success(`Removed ${selectedIds.size} selected faculty members.`);
    setSelectedIds(new Set());
  };

  const handleBulkAddTags = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkTagInput.trim()) return;
    setFacultyList(prev => prev.map(f => {
      if (selectedIds.has(f.id)) {
        const existingTags = f.tags || [];
        if (!existingTags.includes(bulkTagInput.trim())) {
          return { ...f, tags: [...existingTags, bulkTagInput.trim()] };
        }
      }
      return f;
    }));
    toast.success(`Tag "${bulkTagInput}" added to selected faculty members.`);
    setBulkTagInput("");
    setIsBulkTagting(false);
    setIsBulkActionOpen(false);
  };

  // Individual Actions
  const handleDeleteIndividual = (id: string) => {
    setFacultyList(prev => prev.filter(f => f.id !== id));
    toast.success("Faculty member profile removed.");
    const next = new Set(selectedIds);
    next.delete(id);
    setSelectedIds(next);
  };

  const handleToggleStatusIndividual = (member: FacultyMember) => {
    const statusCycle: FacultyMember["status"][] = ["Active", "Research Period", "On Leave", "Pending"];
    const nextIdx = (statusCycle.indexOf(member.status) + 1) % statusCycle.length;
    const nextStatus = statusCycle[nextIdx];
    
    setFacultyList(prev => prev.map(f => f.id === member.id ? { ...f, status: nextStatus } : f));
    toast.success(`Updated ${member.name} status to ${nextStatus}`);
  };

  // Export Data
  const handleExport = () => {
    const dataToExport = selectedIds.size > 0 
      ? facultyList.filter(f => selectedIds.has(f.id))
      : facultyList;
      
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataToExport, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `faculty_directory_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    
    toast.success(`Successfully exported ${dataToExport.length} members`);
  };

  // Print Page
  const handlePrint = () => {
    window.print();
    toast.info("Opened print preview dialog");
  };

  // Send Email Handler
  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailForm.subject || !emailForm.body) {
      toast.error("Subject and Body are required.");
      return;
    }
    setIsSendingEmail(true);
    setTimeout(() => {
      setIsSendingEmail(false);
      setIsEmailModalOpen(false);
      setEmailForm({ subject: "", body: "" });
      toast.success(`Email sent successfully to ${selectedIds.size} recipients!`);
      setSelectedIds(new Set());
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500 pb-16">
      <Toaster theme="dark" closeButton position="top-right" />

      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white tracking-tight">Faculty Members</h1>
            <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 rounded-full text-xs font-semibold">
              {filteredFaculty.length} Staff
            </span>
            {statusFilter !== "All" && (
              <div className="flex items-center gap-1 bg-slate-800 border border-slate-700/80 px-2 py-0.5 rounded-full text-xs text-slate-300">
                <span>{statusFilter}</span>
                <button onClick={() => setStatusFilter("All")} className="hover:text-red-400 transition cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            {deptFilter !== "All" && (
              <div className="flex items-center gap-1 bg-slate-800 border border-slate-700/80 px-2 py-0.5 rounded-full text-xs text-slate-300">
                <span>{deptFilter}</span>
                <button onClick={() => setDeptFilter("All")} className="hover:text-red-400 transition cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Access staff listings, modify credentials, assign departments, and track active statuses.
          </p>
        </div>
      </div>

      {/* Control Bar (Matching Image) */}
      <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-4 backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
        {/* Left Side Controls: Search & Filter Panel Toggle */}
        <div className="flex flex-1 items-center gap-3 min-w-[300px]">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search faculty by name, department, role, or email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700/80 focus:border-indigo-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-all duration-300"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-1.5 px-3 py-2.5 border rounded-xl text-xs font-semibold transition cursor-pointer ${
              isFilterOpen || statusFilter !== "All" || deptFilter !== "All"
                ? "border-indigo-500 bg-indigo-500/10 text-indigo-400"
                : "border-slate-800 hover:border-slate-700 bg-slate-950 text-slate-300 hover:text-white"
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filter</span>
            {(statusFilter !== "All" || deptFilter !== "All") && (
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            )}
          </button>
        </div>

        {/* Right Side Controls: Selected status actions & bulk commands */}
        <div className="flex items-center gap-3">
          {/* Selected indicators & Bulk Action Toolbar */}
          <AnimatePresence>
            {selectedIds.size > 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center gap-2 border-r border-slate-800 pr-3 mr-1"
              >
                <span className="text-xs font-bold text-slate-400">
                  {selectedIds.size} Selected
                </span>
                
                {/* Deactivate / Leave bulk shortcut */}
                <button 
                  onClick={handleBulkDeactivate}
                  title="Mark selected as On Leave"
                  className="p-2 border border-slate-800 hover:border-slate-700 bg-slate-950 hover:bg-slate-900 rounded-xl text-slate-400 hover:text-rose-400 transition cursor-pointer"
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                </button>

                {/* More Action menu */}
                <div className="relative" ref={bulkMenuRef}>
                  <button 
                    onClick={() => setIsBulkActionOpen(!isBulkActionOpen)}
                    className="p-2 border border-slate-800 hover:border-slate-700 bg-slate-950 hover:bg-slate-900 rounded-xl text-slate-400 hover:text-white transition cursor-pointer"
                  >
                    <MoreVertical className="w-3.5 h-3.5" />
                  </button>

                  {isBulkActionOpen && (
                    <div className="absolute right-0 top-11 bg-slate-950 border border-slate-800 rounded-xl p-1.5 shadow-2xl z-30 min-w-[170px] animate-in fade-in slide-in-from-top-2 duration-200">
                      {isBulkTagting ? (
                        <form onSubmit={handleBulkAddTags} className="p-2 space-y-2">
                          <label className="text-[10px] text-slate-400 font-bold uppercase block">Add Tag</label>
                          <div className="flex gap-1">
                            <input 
                              type="text" 
                              placeholder="Tag name" 
                              value={bulkTagInput}
                              onChange={(e) => setBulkTagInput(e.target.value)}
                              className="bg-slate-900 border border-slate-800 rounded p-1 text-xs text-white w-full focus:outline-none focus:border-indigo-500"
                              autoFocus
                            />
                            <button type="submit" className="p-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded cursor-pointer">
                              <Check className="w-3 h-3" />
                            </button>
                          </div>
                          <button 
                            type="button" 
                            onClick={() => setIsBulkTagting(false)}
                            className="text-[9px] text-slate-400 hover:text-white cursor-pointer block"
                          >
                            Cancel
                          </button>
                        </form>
                      ) : (
                        <>
                          <button 
                            onClick={() => setIsBulkTagting(true)}
                            className="flex items-center gap-2 w-full px-3 py-2 text-left text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition cursor-pointer"
                          >
                            <Tag className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Add Tags</span>
                          </button>
                          <button 
                            onClick={() => setIsEmailModalOpen(true)}
                            className="flex items-center gap-2 w-full px-3 py-2 text-left text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition cursor-pointer"
                          >
                            <Mail className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Email Selected</span>
                          </button>
                          <div className="border-t border-slate-900 my-1" />
                          <button 
                            onClick={handleBulkDelete}
                            className="flex items-center gap-2 w-full px-3 py-2 text-left text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 rounded-lg transition cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete Selected</span>
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Export & Print */}
          <button 
            onClick={handleExport}
            title="Download JSON Export"
            className="p-2.5 border border-slate-800 hover:border-slate-700 bg-slate-950 hover:bg-slate-900 rounded-xl text-slate-300 hover:text-white transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>
          
          <button 
            onClick={handlePrint}
            title="Print List"
            className="p-2.5 border border-slate-800 hover:border-slate-700 bg-slate-950 hover:bg-slate-900 rounded-xl text-slate-300 hover:text-white transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* Add Faculty Trigger */}
          <button 
            onClick={openAddModal}
            className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-95 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-lg shadow-indigo-500/15 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Faculty</span>
          </button>
        </div>
      </div>

      {/* Expandable Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-slate-900/30 border border-slate-800/60 rounded-2xl p-5 backdrop-blur-md grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <div>
              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Department</label>
              <select 
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 w-full"
              >
                <option value="All">All Departments</option>
                {DEPARTMENTS.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Status</label>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 w-full"
              >
                <option value="All">All Statuses</option>
                {STATUSES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button 
                onClick={() => {
                  setStatusFilter("All");
                  setDeptFilter("All");
                  setSearchQuery("");
                  toast.success("Filters reset successfully");
                }}
                className="w-full border border-slate-800 hover:border-slate-700 bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-white px-3 py-2 text-xs font-semibold rounded-xl transition cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Select All Toggle Bar (Only visible if records exist) */}
      {filteredFaculty.length > 0 && (
        <div className="flex items-center gap-3 px-3 py-1">
          <button 
            onClick={handleSelectAll}
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition cursor-pointer"
          >
            {selectedIds.size === filteredFaculty.length ? (
              <CheckSquare className="w-4 h-4 text-indigo-400" />
            ) : (
              <Square className="w-4 h-4 text-slate-600" />
            )}
            <span className="font-medium">
              {selectedIds.size === filteredFaculty.length ? "Deselect All" : `Select All Listed (${filteredFaculty.length})`}
            </span>
          </button>
        </div>
      )}

      {/* Faculty Directory Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredFaculty.map((member) => {
            const isSelected = selectedIds.has(member.id);
            return (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.25 }}
                className={`group border rounded-2xl p-5 relative backdrop-blur-md transition-all duration-300 flex flex-col justify-between ${
                  isSelected 
                    ? "bg-indigo-950/15 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.2)]" 
                    : "bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:shadow-[0_0_25px_rgba(99,102,241,0.08)]"
                }`}
              >
                {/* Card Top Row */}
                <div className="flex justify-between items-start mb-3">
                  <button 
                    onClick={() => handleSelectCard(member.id)}
                    className="text-slate-500 hover:text-indigo-400 transition cursor-pointer"
                  >
                    {isSelected ? (
                      <CheckSquare className="w-4 h-4 text-indigo-400" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-700 group-hover:text-slate-500" />
                    )}
                  </button>

                  <div className="flex items-center gap-1.5">
                    {/* Status Badge */}
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                      member.status === "Active" 
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                        : member.status === "On Leave" 
                          ? "bg-rose-500/10 text-rose-400 border-rose-500/20" 
                          : member.status === "Research Period" 
                            ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" 
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}>
                      {member.status}
                    </span>

                    {/* Context Menu Trigger */}
                    <div className="relative">
                      <button 
                        onClick={() => setActiveCardMenuId(activeCardMenuId === member.id ? null : member.id)}
                        className="text-slate-500 hover:text-white transition p-1 bg-slate-950/40 rounded-lg border border-transparent hover:border-slate-800 cursor-pointer"
                      >
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </button>

                      {/* Floating Local Card Menu */}
                      {activeCardMenuId === member.id && (
                        <div ref={cardMenuRef} className="absolute right-0 top-7 bg-slate-950 border border-slate-800 rounded-xl p-1.5 shadow-2xl z-20 min-w-[140px] animate-in fade-in slide-in-from-top-1 duration-150">
                          <button 
                            onClick={() => {
                              openEditModal(member);
                              setActiveCardMenuId(null);
                            }}
                            className="flex items-center gap-2 w-full px-2.5 py-1.5 text-left text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Edit Details</span>
                          </button>
                          <button 
                            onClick={() => {
                              handleToggleStatusIndividual(member);
                              setActiveCardMenuId(null);
                            }}
                            className="flex items-center gap-2 w-full px-2.5 py-1.5 text-left text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition cursor-pointer"
                          >
                            <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Cycle Status</span>
                          </button>
                          <div className="border-t border-slate-900 my-1" />
                          <button 
                            onClick={() => {
                              handleDeleteIndividual(member.id);
                              setActiveCardMenuId(null);
                            }}
                            className="flex items-center gap-2 w-full px-2.5 py-1.5 text-left text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 rounded-lg transition cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete Faculty</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Profile Details */}
                <div className="flex flex-col items-center text-center mt-2 mb-4">
                  <div className="relative">
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      onError={(e) => {
                        // Fallback in case of broken image URL
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=6366f1&color=fff&bold=true`;
                      }}
                      className="w-18 h-18 rounded-full object-cover border-2 border-slate-800 group-hover:border-indigo-500/80 transition-all duration-300 shadow-md group-hover:scale-105"
                    />
                    <div className="absolute inset-0 rounded-full border border-indigo-500/20 group-hover:scale-110 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
                  </div>

                  <h3 className="font-bold text-white text-base tracking-tight mt-3 group-hover:text-indigo-400 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-slate-400 mt-0.5">
                    {member.role}
                  </p>
                </div>

                {/* Card Gray Inset Table (Details) */}
                <div className="bg-slate-950/50 border border-slate-800/60 rounded-xl p-3.5 grid grid-cols-2 gap-2 text-left mb-4">
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Department</span>
                    <span className="text-[11px] font-semibold text-indigo-200 mt-0.5 block truncate">
                      {member.department}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Date Hired</span>
                    <span className="text-[11px] font-semibold text-indigo-200 mt-0.5 block truncate">
                      {member.dateHired}
                    </span>
                  </div>
                </div>

                {/* Card Contact Stack */}
                <div className="space-y-2 text-xs pt-1 border-t border-slate-800/40">
                  <a 
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-2.5 text-slate-400 hover:text-indigo-400 transition duration-200"
                  >
                    <Mail className="w-3.5 h-3.5 flex-shrink-0 text-slate-500" />
                    <span className="truncate">{member.email}</span>
                  </a>
                  
                  <a 
                    href={`tel:${member.phone}`}
                    className="flex items-center gap-2.5 text-slate-400 hover:text-indigo-400 transition duration-200"
                  >
                    <Phone className="w-3.5 h-3.5 flex-shrink-0 text-slate-500" />
                    <span>{member.phone}</span>
                  </a>
                </div>

                {/* Display Tags */}
                {member.tags && member.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-4 pt-2 border-t border-slate-850">
                    {member.tags.map(t => (
                      <span key={t} className="text-[9px] bg-slate-900 border border-slate-800 text-indigo-300 font-medium px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredFaculty.length === 0 && (
        <div className="flex flex-col items-center justify-center p-16 text-center border border-dashed border-slate-800 rounded-3xl bg-slate-900/10">
          <div className="w-12 h-12 rounded-full bg-slate-950 flex items-center justify-center text-slate-600 mb-4 border border-slate-800">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">No Faculty Found</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm">
            Try adjusting your search criteria, removing filter parameters, or add a new faculty member profile.
          </p>
          <button 
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("All");
              setDeptFilter("All");
            }}
            className="mt-4 px-4 py-2 border border-slate-850 bg-slate-950 text-indigo-400 hover:text-white hover:bg-slate-900 text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Dialog: Add/Edit Faculty Form Modal */}
      <AnimatePresence>
        {isFormModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950/20">
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {formMode === "add" ? "Register New Faculty" : "Edit Profile Credentials"}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Provide credentials, department associations, and active employment status.
                  </p>
                </div>
                <button 
                  onClick={() => setIsFormModalOpen(false)}
                  className="text-slate-400 hover:text-white transition p-1 bg-slate-950/40 rounded-lg cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
                {/* Avatar preset selection */}
                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Select Profile Avatar</label>
                  <div className="flex gap-3 overflow-x-auto pb-1">
                    {AVATAR_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormFields({ ...formFields, avatar: preset })}
                        className={`w-11 h-11 rounded-full overflow-hidden border-2 flex-shrink-0 transition-all cursor-pointer ${
                          formFields.avatar === preset ? "border-indigo-500 ring-2 ring-indigo-500/20" : "border-slate-800 hover:border-slate-700"
                        }`}
                      >
                        <img src={preset} alt="preset" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Dr. Arthur Dent"
                      value={formFields.name || ""}
                      onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
                      className="bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 w-full text-xs text-white placeholder-slate-600 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">Role / Position *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Associate Professor"
                      value={formFields.role || ""}
                      onChange={(e) => setFormFields({ ...formFields, role: e.target.value })}
                      className="bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 w-full text-xs text-white placeholder-slate-600 focus:outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">Department *</label>
                    <select 
                      value={formFields.department || "Computer Science"}
                      onChange={(e) => setFormFields({ ...formFields, department: e.target.value })}
                      className="bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none transition"
                    >
                      {DEPARTMENTS.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">Status *</label>
                    <select 
                      value={formFields.status || "Active"}
                      onChange={(e) => setFormFields({ ...formFields, status: e.target.value as any })}
                      className="bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none transition"
                    >
                      {STATUSES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">Email Address *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="username@university.edu"
                      value={formFields.email || ""}
                      onChange={(e) => setFormFields({ ...formFields, email: e.target.value })}
                      className="bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 w-full text-xs text-white placeholder-slate-600 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+1-202-555-0100"
                      value={formFields.phone || ""}
                      onChange={(e) => setFormFields({ ...formFields, phone: e.target.value })}
                      className="bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 w-full text-xs text-white placeholder-slate-600 focus:outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">Date Hired</label>
                  <input 
                    type="date" 
                    value={formFields.dateHired || ""}
                    onChange={(e) => setFormFields({ ...formFields, dateHired: e.target.value })}
                    className="bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none transition"
                  />
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end gap-3 bg-slate-950/20 -mx-6 -mb-6 p-6">
                  <button 
                    type="button"
                    onClick={() => setIsFormModalOpen(false)}
                    className="px-4 py-2 border border-slate-850 bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-white text-xs font-semibold rounded-xl transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold rounded-xl hover:opacity-90 shadow-lg shadow-indigo-500/10 transition cursor-pointer"
                  >
                    {formMode === "add" ? "Add Staff Member" : "Save Changes"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dialog: Bulk Email Composer Modal */}
      <AnimatePresence>
        {isEmailModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEmailModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950/20">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Mail className="w-5 h-5 text-indigo-400" />
                    <span>Compose Bulk Broadcast</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Sending to {selectedIds.size} selected faculty members.
                  </p>
                </div>
                <button 
                  onClick={() => setIsEmailModalOpen(false)}
                  className="text-slate-400 hover:text-white transition p-1 bg-slate-950/40 rounded-lg cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSendEmail} className="p-6 space-y-4">
                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Recipients ({selectedIds.size})</label>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-2.5 max-h-[75px] overflow-y-auto flex flex-wrap gap-1.5">
                    {facultyList
                      .filter(f => selectedIds.has(f.id))
                      .map(f => (
                        <span key={f.id} className="text-[10px] bg-slate-900 border border-slate-800 text-indigo-300 font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                          <span>{f.name}</span>
                        </span>
                      ))
                    }
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">Subject</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Schedule Update for Faculty Meeting"
                    value={emailForm.subject}
                    onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                    className="bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 w-full text-xs text-white placeholder-slate-650 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">Body Message</label>
                  <textarea 
                    required
                    rows={6}
                    placeholder="Dear Faculty,&#10;&#10;Please note the following notification details..."
                    value={emailForm.body}
                    onChange={(e) => setEmailForm({ ...emailForm, body: e.target.value })}
                    className="bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2.5 w-full text-xs text-white placeholder-slate-650 focus:outline-none transition resize-none"
                  />
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end gap-3 bg-slate-950/20 -mx-6 -mb-6 p-6">
                  <button 
                    type="button"
                    onClick={() => setIsEmailModalOpen(false)}
                    className="px-4 py-2 border border-slate-850 bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-white text-xs font-semibold rounded-xl transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isSendingEmail}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold rounded-xl hover:opacity-90 shadow-lg shadow-indigo-500/10 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isSendingEmail ? (
                      <>
                        <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Broadcast</span>
                      </>
                    )}
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

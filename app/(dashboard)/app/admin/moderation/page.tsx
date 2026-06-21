'use client';

import React, { useState, useMemo } from "react";
import { 
  ShieldAlert, Search, Plus, Filter, Trash2, Edit, CheckCircle, 
  X, AlertTriangle, Shield, UserX, AlertCircle, Eye, CheckSquare, Square
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { AnimatePresence, motion } from "framer-motion";



interface ModerationRecord {
  id: string;
  itemType: "Comment" | "Project Post" | "Expert Profile" | "Startup Pitch";
  reportedContent: string;
  reason: "Spam" | "Harassment" | "Plagiarism" | "Inappropriate Media";
  reporter: string;
  severity: "High" | "Medium" | "Low";
  status: "Pending Review" | "Approved" | "Suspended";
  createdDate: string;
}

const INITIAL_REPORTS: ModerationRecord[] = [
  { id: "MOD-011", itemType: "Comment", reportedContent: "Buy cheap crypto tokens at shady-url.com guaranteed 100x return!!!", reason: "Spam", reporter: "Leslie Alexander", severity: "High", status: "Pending Review", createdDate: "2024-06-12" },
  { id: "MOD-012", itemType: "Project Post", reportedContent: "Copied entire codebase from Github project open-source directly", reason: "Plagiarism", reporter: "Dries Vincent", severity: "Medium", status: "Pending Review", createdDate: "2024-06-13" },
  { id: "MOD-013", itemType: "Expert Profile", reportedContent: "Inappropriate bio description claiming fake credentials at Stanford University", reason: "Spam", reporter: "Sarah Jenkins", severity: "High", status: "Pending Review", createdDate: "2024-06-11" },
  { id: "MOD-014", itemType: "Comment", reportedContent: "Personal attack on team members during community pitch presentation session", reason: "Harassment", reporter: "Albert Flores", severity: "Medium", status: "Suspended", createdDate: "2024-06-09" },
  { id: "MOD-015", itemType: "Startup Pitch", reportedContent: "Stock images used to showcase fake prototype models", reason: "Inappropriate Media", reporter: "Vikram Desai", severity: "Low", status: "Approved", createdDate: "2024-06-10" }
];

function ModerationPage() {
  const [reports, setReports] = useState<ModerationRecord[]>(INITIAL_REPORTS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [formFields, setFormFields] = useState<Partial<ModerationRecord>>({
    itemType: "Comment",
    reportedContent: "",
    reason: "Spam",
    reporter: "",
    severity: "Medium",
    status: "Pending Review"
  });

  // Calculate metrics
  const stats = useMemo(() => {
    const total = reports.length;
    const pending = reports.filter(r => r.status === "Pending Review").length;
    const suspended = reports.filter(r => r.status === "Suspended").length;
    const accuracy = 98.4; // Mock accuracy
    return { total, pending, suspended, accuracy };
  }, [reports]);

  // Filter list
  const filteredReports = useMemo(() => {
    return reports.filter(r => {
      const matchesSearch = 
        r.reportedContent.toLowerCase().includes(search.toLowerCase()) ||
        r.reporter.toLowerCase().includes(search.toLowerCase()) ||
        r.id.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || r.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [reports, search, statusFilter]);

  // Selection
  const handleSelectOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === filteredReports.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredReports.map(r => r.id)));
    }
  };

  // Actions
  const handleApprove = (id: string) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: "Approved" } : r));
    toast.success(`Content approved and cleared from reports list.`);
  };

  const handleSuspend = (id: string) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: "Suspended" } : r));
    toast.warning(`Reported content suspended. User warning sent.`);
  };

  const handleDeleteSelected = () => {
    setReports(prev => prev.filter(r => !selectedIds.has(r.id)));
    toast.success(`Removed ${selectedIds.size} report cases.`);
    setSelectedIds(new Set());
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFields.reportedContent || !formFields.reporter) {
      toast.error("Complete all required fields.");
      return;
    }

    if (modalMode === "add") {
      const newRep: ModerationRecord = {
        id: `MOD-${Math.floor(100 + Math.random() * 900)}`,
        itemType: formFields.itemType || "Comment",
        reportedContent: formFields.reportedContent,
        reason: formFields.reason || "Spam",
        reporter: formFields.reporter,
        severity: formFields.severity || "Medium",
        status: formFields.status || "Pending Review",
        createdDate: new Date().toISOString().split("T")[0]
      };
      setReports([newRep, ...reports]);
      toast.success(`Logged safety report ${newRep.id}`);
    } else {
      setReports(prev => prev.map(r => r.id === editingId ? { ...r, ...formFields as ModerationRecord } : r));
      toast.success("Moderation parameters saved.");
    }
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setModalMode("add");
    setFormFields({
      itemType: "Comment",
      reportedContent: "",
      reason: "Spam",
      reporter: "",
      severity: "Medium",
      status: "Pending Review"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (r: ModerationRecord) => {
    setModalMode("edit");
    setEditingId(r.id);
    setFormFields(r);
    setIsModalOpen(true);
  };

  const handleDeleteIndividual = (id: string) => {
    setReports(prev => prev.filter(r => r.id !== id));
    toast.success("Report dismissed.");
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
          <h1 className="text-2xl font-bold text-white tracking-tight">Content Moderation & Safety Center</h1>
          <p className="text-xs text-slate-400 mt-1">Audit flagged forum comments, spam startup pitches, plagiarized projects, and send compliance alerts.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-1.5 bg-gradient-to-r from-red-500 to-rose-600 hover:opacity-95 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-lg shadow-red-500/10 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Log Incident
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Incidents Logged", val: stats.total, icon: ShieldAlert, color: "text-slate-400 bg-slate-900/40 border-slate-800" },
          { label: "Pending Investigation", val: stats.pending, icon: AlertCircle, color: "text-rose-400 bg-rose-500/5 border-rose-500/10" },
          { label: "Suspended / Removed Items", val: stats.suspended, icon: UserX, color: "text-amber-400 bg-amber-500/5 border-amber-500/10" },
          { label: "Moderator Accuracy Rate", val: `${stats.accuracy}%`, icon: Shield, color: "text-emerald-400 bg-emerald-500/5 border-emerald-500/10" }
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
              placeholder="Search reports by reporter, flagged text snippet, or ID..." 
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
            <option value="Pending Review">Pending Review</option>
            <option value="Approved">Approved</option>
            <option value="Suspended">Suspended</option>
          </select>

          {selectedIds.size > 0 && (
            <button 
              onClick={handleDeleteSelected}
              className="flex items-center gap-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-rose-500/20 transition cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Dismiss Selected ({selectedIds.size})</span>
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
                    {selectedIds.size === filteredReports.length && filteredReports.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-red-500" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-700" />
                    )}
                  </button>
                </th>
                <th className="px-5 py-4">Report Details</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4">Flag Reason</th>
                <th className="px-5 py-4">Severity</th>
                <th className="px-5 py-4">Reporter</th>
                <th className="px-5 py-4 text-center">Status</th>
                <th className="px-5 py-4 text-right">Moderator Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {filteredReports.map((r) => {
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
                    <td className="px-5 py-4 max-w-xs">
                      <div className="font-semibold text-slate-200 truncate">{r.reportedContent}</div>
                      <div className="text-[9px] text-slate-500 mt-0.5 font-mono">{r.id} | Logged: {r.createdDate}</div>
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-350">{r.itemType}</td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1 text-slate-300 font-semibold">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                        <span>{r.reason}</span>
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${
                        r.severity === "High" 
                          ? "bg-rose-500/10 text-rose-450 border-rose-500/20"
                          : r.severity === "Medium"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : "bg-sky-500/10 text-sky-400 border-sky-500/20"
                      }`}>
                        {r.severity}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-300">{r.reporter}</td>
                    <td className="px-5 py-4 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                        r.status === "Approved" 
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : r.status === "Pending Review"
                            ? "bg-rose-500/10 text-rose-450 border-rose-500/20"
                            : "bg-slate-500/10 text-slate-400 border-slate-500/20"
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-1.5">
                        {r.status === "Pending Review" && (
                          <>
                            <button 
                              onClick={() => handleApprove(r.id)}
                              title="Approve / Clear Content"
                              className="p-1.5 bg-slate-900 border border-slate-800 text-emerald-400 hover:bg-emerald-500/10 rounded-lg hover:border-emerald-900 transition cursor-pointer"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => handleSuspend(r.id)}
                              title="Suspend Content"
                              className="p-1.5 bg-slate-900 border border-slate-800 text-rose-450 hover:bg-rose-500/10 rounded-lg hover:border-rose-900 transition cursor-pointer"
                            >
                              <UserX className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                        
                        <button 
                          onClick={() => openEditModal(r)}
                          title="Modify Details"
                          className="p-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-lg hover:border-slate-700 transition cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        
                        <button 
                          onClick={() => handleDeleteIndividual(r.id)}
                          title="Dismiss Incident"
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
        {filteredReports.length === 0 && (
          <div className="flex flex-col items-center justify-center p-16 text-center">
            <ShieldAlert className="w-10 h-10 text-slate-750 mb-3" />
            <h3 className="text-sm font-bold text-white">Safety Center Clear</h3>
            <p className="text-xs text-slate-500 mt-1">Adjust search filters or log a new moderation incident.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Incident Dialog */}
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
                    {modalMode === "add" ? "Log Safety Compliance Incident" : "Edit Incident Review Details"}
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
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Reporter Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Aryan Sharma"
                      value={formFields.reporter || ""}
                      onChange={(e) => setFormFields({ ...formFields, reporter: e.target.value })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Item Category Type</label>
                    <select 
                      value={formFields.itemType || "Comment"}
                      onChange={(e) => setFormFields({ ...formFields, itemType: e.target.value as any })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    >
                      <option value="Comment">Comment</option>
                      <option value="Project Post">Project Post</option>
                      <option value="Expert Profile">Expert Profile</option>
                      <option value="Startup Pitch">Startup Pitch</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Incident Severity</label>
                    <select 
                      value={formFields.severity || "Medium"}
                      onChange={(e) => setFormFields({ ...formFields, severity: e.target.value as any })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Compliance Reason</label>
                    <select 
                      value={formFields.reason || "Spam"}
                      onChange={(e) => setFormFields({ ...formFields, reason: e.target.value as any })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    >
                      <option value="Spam">Spam</option>
                      <option value="Harassment">Harassment</option>
                      <option value="Plagiarism">Plagiarism</option>
                      <option value="Inappropriate Media">Inappropriate Media</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Flagged Content Snippet *</label>
                  <textarea 
                    required
                    rows={3}
                    placeholder="Paste the reported comment, profile text, or details here..."
                    value={formFields.reportedContent || ""}
                    onChange={(e) => setFormFields({ ...formFields, reportedContent: e.target.value })}
                    className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none resize-none"
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
                    {modalMode === "add" ? "Log Incident" : "Apply Moderation"}
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

export default ModerationPage;

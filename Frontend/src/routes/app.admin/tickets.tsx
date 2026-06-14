import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useMemo } from "react";
import { 
  FileText, Search, Plus, Filter, Trash2, Edit, AlertCircle, 
  User, CheckCircle, Clock, X, CheckSquare, Square, ShieldAlert
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

export const Route = createFileRoute("/app/admin/tickets")({
  component: AdminTicketsPage,
});

interface TicketRecord {
  id: string;
  submitter: string;
  email: string;
  subject: string;
  category: "Billing" | "Bug Report" | "Feature Request" | "Account Access";
  severity: "High" | "Medium" | "Low";
  assignee: string;
  status: "Open" | "In Progress" | "Resolved";
  createdDate: string;
}

const INITIAL_TICKETS: TicketRecord[] = [
  { id: "TCK-801", submitter: "Aryan Sharma", email: "aryan.sharma@growtharena.com", subject: "Stripe Payment failed but points deducted", category: "Billing", severity: "High", assignee: "Savannah Nguyen", status: "In Progress", createdDate: "2024-06-12" },
  { id: "TCK-802", submitter: "Dianne Russell", email: "dianne.stud@growth.com", subject: "AI Roadmap recommendations loading infinitely", category: "Bug Report", severity: "High", assignee: "Savannah Nguyen", status: "Open", createdDate: "2024-06-13" },
  { id: "TCK-803", submitter: "Dr. Sarah Jenkins", email: "s.jenkins@university.edu", subject: "Requesting custom analytics export to CSV/PDF", category: "Feature Request", severity: "Medium", assignee: "Unassigned", status: "Open", createdDate: "2024-06-11" },
  { id: "TCK-804", submitter: "Floyd Miles", email: "floyd@milesventures.co", subject: "Founder dashboard show wrong remaining runway", category: "Bug Report", severity: "Medium", assignee: "Alex Chen", status: "Resolved", createdDate: "2024-06-09" },
  { id: "TCK-805", submitter: "Leslie Alexander", email: "leslie.expert@mentor.org", subject: "Password reset mail link expired immediately", category: "Account Access", severity: "Low", assignee: "Alex Chen", status: "Resolved", createdDate: "2024-06-10" }
];

function AdminTicketsPage() {
  const [tickets, setTickets] = useState<TicketRecord[]>(INITIAL_TICKETS);
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [formFields, setFormFields] = useState<Partial<TicketRecord>>({
    submitter: "",
    email: "",
    subject: "",
    category: "Bug Report",
    severity: "Medium",
    assignee: "Unassigned",
    status: "Open"
  });

  // Calculate metrics
  const stats = useMemo(() => {
    const total = tickets.length;
    const open = tickets.filter(t => t.status === "Open").length;
    const high = tickets.filter(t => t.severity === "High" && t.status !== "Resolved").length;
    const resolved = tickets.filter(t => t.status === "Resolved").length;
    return { total, open, high, resolved };
  }, [tickets]);

  // Filter list
  const filteredTickets = useMemo(() => {
    return tickets.filter(t => {
      const matchesSearch = 
        t.submitter.toLowerCase().includes(search.toLowerCase()) ||
        t.subject.toLowerCase().includes(search.toLowerCase()) ||
        t.id.toLowerCase().includes(search.toLowerCase());
      const matchesSeverity = severityFilter === "All" || t.severity === severityFilter;
      const matchesStatus = statusFilter === "All" || t.status === statusFilter;
      return matchesSearch && matchesSeverity && matchesStatus;
    });
  }, [tickets, search, severityFilter, statusFilter]);

  // Selection
  const handleSelectOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === filteredTickets.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredTickets.map(t => t.id)));
    }
  };

  // Actions
  const handleDeleteSelected = () => {
    setTickets(prev => prev.filter(t => !selectedIds.has(t.id)));
    toast.success(`Removed ${selectedIds.size} tickets`);
    setSelectedIds(new Set());
  };

  const handleToggleStatus = (ticket: TicketRecord) => {
    const nextStatus = ticket.status === "Open" ? "In Progress" : ticket.status === "In Progress" ? "Resolved" : "Open";
    setTickets(prev => prev.map(t => t.id === ticket.id ? { ...t, status: nextStatus } : t));
    toast.success(`Ticket ${ticket.id} status is now ${nextStatus}`);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFields.submitter || !formFields.email || !formFields.subject) {
      toast.error("Complete all required fields.");
      return;
    }

    if (modalMode === "add") {
      const newTck: TicketRecord = {
        id: `TCK-${Math.floor(100 + Math.random() * 900)}`,
        submitter: formFields.submitter,
        email: formFields.email,
        subject: formFields.subject,
        category: formFields.category || "Bug Report",
        severity: formFields.severity || "Medium",
        assignee: formFields.assignee || "Unassigned",
        status: formFields.status || "Open",
        createdDate: new Date().toISOString().split("T")[0]
      };
      setTickets([newTck, ...tickets]);
      toast.success(`Logged ticket ${newTck.id}`);
    } else {
      setTickets(prev => prev.map(t => t.id === editingId ? { ...t, ...formFields as TicketRecord } : t));
      toast.success("Ticket parameters saved.");
    }
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setModalMode("add");
    setFormFields({
      submitter: "",
      email: "",
      subject: "",
      category: "Bug Report",
      severity: "Medium",
      assignee: "Unassigned",
      status: "Open"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (t: TicketRecord) => {
    setModalMode("edit");
    setEditingId(t.id);
    setFormFields(t);
    setIsModalOpen(true);
  };

  const handleDeleteIndividual = (id: string) => {
    setTickets(prev => prev.filter(t => t.id !== id));
    toast.success("Ticket file closed and deleted.");
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
          <h1 className="text-2xl font-bold text-white tracking-tight">System Support Helpdesk</h1>
          <p className="text-xs text-slate-400 mt-1">Review user-reported bugs, platform complaints, billing requests, and assign team moderators.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-1.5 bg-gradient-to-r from-red-500 to-rose-600 hover:opacity-95 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-lg shadow-red-500/10 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Create Ticket
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Tickets", val: stats.total, icon: FileText, color: "text-slate-400 bg-slate-900/40 border-slate-800" },
          { label: "Open Help Files", val: stats.open, icon: Clock, color: "text-violet-400 bg-violet-500/5 border-violet-500/10" },
          { label: "Critical High Severity", val: stats.high, icon: ShieldAlert, color: "text-rose-400 bg-rose-500/5 border-rose-500/10" },
          { label: "Resolved Queries", val: stats.resolved, icon: CheckCircle, color: "text-emerald-400 bg-emerald-500/5 border-emerald-500/10" }
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
              placeholder="Search tickets by submitter, subject summary, or ID..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500/40"
          >
            <option value="All">All Severities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500/40"
          >
            <option value="All">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          {selectedIds.size > 0 && (
            <button 
              onClick={handleDeleteSelected}
              className="flex items-center gap-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-rose-500/20 transition cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Close Selected ({selectedIds.size})</span>
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
                    {selectedIds.size === filteredTickets.length && filteredTickets.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-red-500" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-700" />
                    )}
                  </button>
                </th>
                <th className="px-5 py-4">Ticket ID</th>
                <th className="px-5 py-4">Subject Description</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4 text-center">Severity</th>
                <th className="px-5 py-4">Assignee Manager</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {filteredTickets.map((t) => {
                const isSelected = selectedIds.has(t.id);
                return (
                  <tr key={t.id} className={`hover:bg-slate-800/20 transition ${isSelected ? "bg-red-500/5" : ""}`}>
                    <td className="px-5 py-4">
                      <button onClick={() => handleSelectOne(t.id)} className="cursor-pointer">
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-red-500" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-855" />
                        )}
                      </button>
                    </td>
                    <td className="px-5 py-4 font-mono font-semibold text-slate-400">{t.id}</td>
                    <td className="px-5 py-4 max-w-xs">
                      <div className="font-semibold text-slate-200">{t.subject}</div>
                      <div className="text-[9px] text-slate-500 mt-0.5">{t.submitter} ({t.email})</div>
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-350">{t.category}</td>
                    <td className="px-5 py-4 text-center">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${
                        t.severity === "High" 
                          ? "bg-rose-500/10 text-rose-450 border-rose-500/20"
                          : t.severity === "Medium"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : "bg-sky-500/10 text-sky-400 border-sky-500/20"
                      }`}>
                        {t.severity}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <User className="w-3.5 h-3.5 text-slate-650" />
                        <span>{t.assignee}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                        t.status === "Resolved" 
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : t.status === "In Progress"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button 
                          onClick={() => handleToggleStatus(t)}
                          title="Toggle Status (Open/InProg/Resolved)"
                          className="p-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-lg hover:border-slate-700 transition cursor-pointer"
                        >
                          <AlertCircle className="w-3.5 h-3.5" />
                        </button>
                        
                        <button 
                          onClick={() => openEditModal(t)}
                          title="Edit ticket"
                          className="p-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-lg hover:border-slate-700 transition cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        
                        <button 
                          onClick={() => handleDeleteIndividual(t.id)}
                          title="Delete Ticket"
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
        {filteredTickets.length === 0 && (
          <div className="flex flex-col items-center justify-center p-16 text-center">
            <FileText className="w-10 h-10 text-slate-750 mb-3" />
            <h3 className="text-sm font-bold text-white">No Tickets Found</h3>
            <p className="text-xs text-slate-500 mt-1">Adjust search parameters or log a new support ticket query.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Ticket Dialog */}
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
                    {modalMode === "add" ? "Create Administrative Support Ticket" : "Edit Ticket Details"}
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
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Submitter Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. John Doe"
                      value={formFields.submitter || ""}
                      onChange={(e) => setFormFields({ ...formFields, submitter: e.target.value })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Contact Email *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. j.doe@arena.com"
                      value={formFields.email || ""}
                      onChange={(e) => setFormFields({ ...formFields, email: e.target.value })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Subject Summary *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Brief description of the problem..."
                    value={formFields.subject || ""}
                    onChange={(e) => setFormFields({ ...formFields, subject: e.target.value })}
                    className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Category</label>
                    <select 
                      value={formFields.category || "Bug Report"}
                      onChange={(e) => setFormFields({ ...formFields, category: e.target.value as any })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-2.5 py-2 w-full text-xs text-white focus:outline-none"
                    >
                      <option value="Bug Report">Bug Report</option>
                      <option value="Billing">Billing</option>
                      <option value="Feature Request">Feature Request</option>
                      <option value="Account Access">Account Access</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Severity</label>
                    <select 
                      value={formFields.severity || "Medium"}
                      onChange={(e) => setFormFields({ ...formFields, severity: e.target.value as any })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-2.5 py-2 w-full text-xs text-white focus:outline-none"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Ticket Status</label>
                    <select 
                      value={formFields.status || "Open"}
                      onChange={(e) => setFormFields({ ...formFields, status: e.target.value as any })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-2.5 py-2 w-full text-xs text-white focus:outline-none"
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Assignee Staff Manager</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Alex Chen or Savannah Nguyen"
                    value={formFields.assignee || ""}
                    onChange={(e) => setFormFields({ ...formFields, assignee: e.target.value })}
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
                    {modalMode === "add" ? "Create Ticket" : "Apply Changes"}
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

import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useMemo } from "react";
import { 
  Users, Search, Plus, Filter, Trash2, Edit, UserCheck, UserMinus, 
  Mail, Shield, Calendar, CheckSquare, Square, X, MoreVertical, ShieldAlert
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

export const Route = createFileRoute("/app/admin/users")({
  component: UsersPage,
});

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: "student" | "researcher" | "founder" | "investor" | "university" | "expert" | "admin";
  status: "Active" | "Pending" | "Suspended";
  joinedDate: string;
  avatar: string;
}

const INITIAL_USERS: UserRecord[] = [
  { id: "USR-001", name: "Aryan Sharma", email: "aryan.sharma@growtharena.com", role: "student", status: "Active", joinedDate: "2024-01-15", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256" },
  { id: "USR-002", name: "Dr. Sarah Jenkins", email: "s.jenkins@university.edu", role: "researcher", status: "Active", joinedDate: "2023-11-02", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256&h=256" },
  { id: "USR-003", name: "Floyd Miles", email: "floyd@milesventures.co", role: "founder", status: "Active", joinedDate: "2024-03-10", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256&h=256" },
  { id: "USR-004", name: "Courtney Henry", email: "courtney@henrycap.com", role: "investor", status: "Active", joinedDate: "2023-09-18", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256&h=256" },
  { id: "USR-005", name: "Dean Arvind Menon", email: "dean.cs@university.edu", role: "university", status: "Active", joinedDate: "2023-05-12", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256&h=256" },
  { id: "USR-006", name: "Leslie Alexander", email: "leslie.expert@mentor.org", role: "expert", status: "Pending", joinedDate: "2024-05-22", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256" },
  { id: "USR-007", name: "Savannah Nguyen", email: "savannah@systemadmin.io", role: "admin", status: "Active", joinedDate: "2022-08-01", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=256&h=256" },
  { id: "USR-008", name: "Dianne Russell", email: "dianne.stud@growth.com", role: "student", status: "Suspended", joinedDate: "2024-02-19", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=256&h=256" }
];

const ROLE_COLORS: Record<UserRecord["role"], string> = {
  student: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  researcher: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  founder: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  investor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  university: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  expert: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  admin: "bg-red-500/10 text-red-400 border-red-500/20"
};

function UsersPage() {
  const [users, setUsers] = useState<UserRecord[]>(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form fields
  const [formFields, setFormFields] = useState<Partial<UserRecord>>({
    name: "",
    email: "",
    role: "student",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256"
  });

  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Compute stats
  const stats = useMemo(() => {
    return {
      total: users.length,
      active: users.filter(u => u.status === "Active").length,
      pending: users.filter(u => u.status === "Pending").length,
      suspended: users.filter(u => u.status === "Suspended").length,
    };
  }, [users]);

  // Filter computation
  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesSearch = 
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.id.toLowerCase().includes(search.toLowerCase());
      const matchesRole = roleFilter === "All" || u.role === roleFilter;
      const matchesStatus = statusFilter === "All" || u.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  // Action Handlers
  const handleSelectOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === filteredUsers.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredUsers.map(u => u.id)));
    }
  };

  const handleDeleteSelected = () => {
    setUsers(prev => prev.filter(u => !selectedIds.has(u.id)));
    toast.success(`Removed ${selectedIds.size} users`);
    setSelectedIds(new Set());
  };

  const handleToggleStatus = (user: UserRecord) => {
    const nextStatus = user.status === "Active" ? "Suspended" : "Active";
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: nextStatus } : u));
    toast.success(`Updated status of ${user.name} to ${nextStatus}`);
  };

  const handleDeleteIndividual = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    toast.success("User successfully deleted.");
    const next = new Set(selectedIds);
    next.delete(id);
    setSelectedIds(next);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFields.name || !formFields.email) {
      toast.error("All required fields must be completed.");
      return;
    }

    if (modalMode === "add") {
      const newUser: UserRecord = {
        id: `USR-${Math.floor(100 + Math.random() * 900)}`,
        name: formFields.name,
        email: formFields.email,
        role: formFields.role || "student",
        status: formFields.status || "Active",
        joinedDate: new Date().toISOString().split("T")[0],
        avatar: formFields.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256"
      };
      setUsers([newUser, ...users]);
      toast.success(`Registered user ${newUser.name}`);
    } else {
      setUsers(prev => prev.map(u => u.id === editingId ? { ...u, ...formFields as UserRecord } : u));
      toast.success("User profile credentials updated.");
    }
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setModalMode("add");
    setFormFields({
      name: "",
      email: "",
      role: "student",
      status: "Active",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (user: UserRecord) => {
    setModalMode("edit");
    setEditingId(user.id);
    setFormFields(user);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500 p-6 pb-16">
      <Toaster theme="dark" closeButton position="top-right" />

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">System Users</h1>
          <p className="text-xs text-slate-400 mt-1">Manage all user platform configurations, permissions, roles, and status listings.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-1.5 bg-gradient-to-r from-red-500 to-rose-600 hover:opacity-95 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-lg shadow-red-500/10 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add User
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Accounts", val: stats.total, icon: Users, color: "text-slate-400 bg-slate-900/40 border-slate-800" },
          { label: "Active Users", val: stats.active, icon: UserCheck, color: "text-emerald-400 bg-emerald-500/5 border-emerald-500/10" },
          { label: "Pending Approvals", val: stats.pending, icon: ClockIcon, color: "text-amber-400 bg-amber-500/5 border-amber-500/10" },
          { label: "Suspended Users", val: stats.suspended, icon: ShieldAlert, color: "text-rose-400 bg-rose-500/5 border-rose-500/10" }
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

      {/* Control Panel */}
      <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <div className="flex flex-1 items-center gap-3 min-w-[300px]">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search users by name, email, or ID..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition"
            />
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="flex items-center gap-3">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500/40"
          >
            <option value="All">All Roles</option>
            {Object.keys(ROLE_COLORS).map(r => (
              <option key={r} value={r}>{r.toUpperCase()}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500/40"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Suspended">Suspended</option>
          </select>

          {selectedIds.size > 0 && (
            <button 
              onClick={handleDeleteSelected}
              className="flex items-center gap-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-rose-500/20 transition cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete ({selectedIds.size})</span>
            </button>
          )}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl overflow-hidden backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-400">
            <thead className="text-[10px] uppercase bg-slate-950/60 text-slate-500 tracking-wider font-bold border-b border-slate-800/50">
              <tr>
                <th className="px-5 py-4 w-10">
                  <button onClick={handleSelectAll} className="cursor-pointer">
                    {selectedIds.size === filteredUsers.length && filteredUsers.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-red-500" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-700" />
                    )}
                  </button>
                </th>
                <th className="px-5 py-4">User Details</th>
                <th className="px-5 py-4">Account ID</th>
                <th className="px-5 py-4">Role Workspace</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Date Registered</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {filteredUsers.map((user) => {
                const isSelected = selectedIds.has(user.id);
                return (
                  <tr key={user.id} className={`hover:bg-slate-800/20 transition ${isSelected ? "bg-red-500/5" : ""}`}>
                    <td className="px-5 py-4">
                      <button onClick={() => handleSelectOne(user.id)} className="cursor-pointer">
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-red-500" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-850 hover:text-slate-650" />
                        )}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-slate-800" />
                        <div>
                          <div className="font-semibold text-slate-200">{user.name}</div>
                          <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <Mail className="w-3 h-3" />
                            <span>{user.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-mono text-slate-500 text-[10px]">{user.id}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${ROLE_COLORS[user.role]}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                        user.status === "Active" 
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : user.status === "Pending"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-mono text-slate-500">{user.joinedDate}</td>
                    <td className="px-5 py-4 text-right relative">
                      <div className="flex justify-end gap-1.5">
                        <button 
                          onClick={() => handleToggleStatus(user)}
                          title="Toggle Status (Active/Suspend)"
                          className={`p-1.5 rounded-lg border transition cursor-pointer ${
                            user.status === "Active"
                              ? "bg-slate-900 border-slate-800 text-rose-400 hover:bg-rose-950/20 hover:border-rose-900"
                              : "bg-slate-900 border-slate-800 text-emerald-400 hover:bg-emerald-950/20 hover:border-emerald-900"
                          }`}
                        >
                          {user.status === "Active" ? <UserMinus className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                        </button>
                        
                        <button 
                          onClick={() => openEditModal(user)}
                          title="Edit Details"
                          className="p-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-lg hover:border-slate-700 transition cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        
                        <button 
                          onClick={() => handleDeleteIndividual(user.id)}
                          title="Delete User"
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
        {filteredUsers.length === 0 && (
          <div className="flex flex-col items-center justify-center p-16 text-center">
            <Users className="w-10 h-10 text-slate-700 mb-3" />
            <h3 className="text-sm font-bold text-white">No Users Found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">No user matches the current filters or search query.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
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
                    {modalMode === "add" ? "Register New Account" : "Edit Account Properties"}
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
                  <label className="text-[10px] text-slate-450 font-bold uppercase tracking-wider block mb-1.5">Full Name *</label>
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
                  <label className="text-[10px] text-slate-455 font-bold uppercase tracking-wider block mb-1.5">Email Address *</label>
                  <input 
                    type="email" 
                    required
                    placeholder="e.g. adams@galaxy.org"
                    value={formFields.email || ""}
                    onChange={(e) => setFormFields({ ...formFields, email: e.target.value })}
                    className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-450 font-bold uppercase tracking-wider block mb-1.5">Role Workspace</label>
                    <select 
                      value={formFields.role || "student"}
                      onChange={(e) => setFormFields({ ...formFields, role: e.target.value as any })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    >
                      {Object.keys(ROLE_COLORS).map(r => (
                        <option key={r} value={r}>{r.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-450 font-bold uppercase tracking-wider block mb-1.5">Account Status</label>
                    <select 
                      value={formFields.status || "Active"}
                      onChange={(e) => setFormFields({ ...formFields, status: e.target.value as any })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Suspended">Suspended</option>
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
                    {modalMode === "add" ? "Create Account" : "Apply Modifications"}
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

// Simple Clock Icon
function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

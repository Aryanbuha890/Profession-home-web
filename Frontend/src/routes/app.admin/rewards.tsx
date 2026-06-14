import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useMemo } from "react";
import { 
  Ticket, Search, Plus, Filter, Trash2, Edit, Award, 
  Coins, ShoppingBag, Eye, X, CheckSquare, Square, ToggleLeft
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

export const Route = createFileRoute("/app/admin/rewards")({
  component: AdminRewardsPage,
});

interface RewardRecord {
  id: string;
  title: string;
  type: "Voucher" | "Mentorship" | "Software Credit" | "Hardware";
  pointsCost: number;
  stockLeft: number;
  redeemedCount: number;
  status: "Active" | "Draft" | "Out of Stock";
  description: string;
}

const INITIAL_REWARDS: RewardRecord[] = [
  { id: "RWD-701", title: "$500 AWS Cloud Credits", type: "Software Credit", pointsCost: 1200, stockLeft: 45, redeemedCount: 158, status: "Active", description: "AWS Promotional Credits valid for 1 year on any build workloads." },
  { id: "RWD-702", title: "1-on-1 VC Pitch Mentorship Session", type: "Mentorship", pointsCost: 800, stockLeft: 12, redeemedCount: 84, status: "Active", description: "A private 45-minute slide deck audit and feedback call with general partners." },
  { id: "RWD-703", title: "GitHub Enterprise Yearly Sub", type: "Software Credit", pointsCost: 1500, stockLeft: 0, redeemedCount: 32, status: "Out of Stock", description: "Access to enterprise-grade code workspace for up to 5 seats." },
  { id: "RWD-704", title: "Professional Home Premium Cap", type: "Hardware", pointsCost: 500, stockLeft: 120, redeemedCount: 412, status: "Active", description: "Embroidered black-on-black limited edition startup team headwear." },
  { id: "RWD-705", title: "Notion Plus Team Plan (6 Months)", type: "Software Credit", pointsCost: 600, stockLeft: 80, redeemedCount: 95, status: "Draft", description: "Workspace credentials with advanced block layouts and database filters." }
];

function AdminRewardsPage() {
  const [rewards, setRewards] = useState<RewardRecord[]>(INITIAL_REWARDS);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [formFields, setFormFields] = useState<Partial<RewardRecord>>({
    title: "",
    type: "Software Credit",
    pointsCost: 500,
    stockLeft: 10,
    redeemedCount: 0,
    status: "Active",
    description: ""
  });

  // Calculate metrics
  const stats = useMemo(() => {
    const total = rewards.length;
    const totalRedeemed = rewards.reduce((acc, r) => acc + r.redeemedCount, 0);
    const avgPoints = total > 0 ? Math.round(rewards.reduce((acc, r) => acc + r.pointsCost, 0) / total) : 0;
    const activeCount = rewards.filter(r => r.status === "Active").length;
    return { total, totalRedeemed, avgPoints, activeCount };
  }, [rewards]);

  // Filter list
  const filteredRewards = useMemo(() => {
    return rewards.filter(r => {
      const matchesSearch = 
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.type.toLowerCase().includes(search.toLowerCase()) ||
        r.id.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === "All" || r.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [rewards, search, typeFilter]);

  // Selection
  const handleSelectOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === filteredRewards.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredRewards.map(r => r.id)));
    }
  };

  // Actions
  const handleDeleteSelected = () => {
    setRewards(prev => prev.filter(r => !selectedIds.has(r.id)));
    toast.success(`Removed ${selectedIds.size} rewards`);
    setSelectedIds(new Set());
  };

  const handleToggleStatus = (reward: RewardRecord) => {
    const nextStatus = reward.status === "Active" ? "Draft" : "Active";
    setRewards(prev => prev.map(r => r.id === reward.id ? { ...r, status: nextStatus } : r));
    toast.success(`Reward ${reward.title} is now in ${nextStatus} mode`);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFields.title || !formFields.description) {
      toast.error("Complete all required fields.");
      return;
    }

    if (modalMode === "add") {
      const newRwd: RewardRecord = {
        id: `RWD-${Math.floor(100 + Math.random() * 900)}`,
        title: formFields.title,
        type: formFields.type || "Software Credit",
        pointsCost: Number(formFields.pointsCost) || 500,
        stockLeft: Number(formFields.stockLeft) || 10,
        redeemedCount: 0,
        status: formFields.status || "Active",
        description: formFields.description
      };
      setRewards([newRwd, ...rewards]);
      toast.success(`Registered reward item ${newRwd.title}`);
    } else {
      setRewards(prev => prev.map(r => r.id === editingId ? { ...r, ...formFields as RewardRecord } : r));
      toast.success("Reward properties saved.");
    }
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setModalMode("add");
    setFormFields({
      title: "",
      type: "Software Credit",
      pointsCost: 500,
      stockLeft: 20,
      redeemedCount: 0,
      status: "Active",
      description: ""
    });
    setIsModalOpen(true);
  };

  const openEditModal = (r: RewardRecord) => {
    setModalMode("edit");
    setEditingId(r.id);
    setFormFields(r);
    setIsModalOpen(true);
  };

  const handleDeleteIndividual = (id: string) => {
    setRewards(prev => prev.filter(r => r.id !== id));
    toast.success("Reward deleted from index.");
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
          <h1 className="text-2xl font-bold text-white tracking-tight">Reward Center Administration</h1>
          <p className="text-xs text-slate-400 mt-1">Configure point-redeemable prizes, set stock levels, monitor total redemptions, and toggle draft listings.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-1.5 bg-gradient-to-r from-red-500 to-rose-600 hover:opacity-95 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-lg shadow-red-500/10 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Reward
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Listed Prizes", val: stats.total, icon: Ticket, color: "text-slate-400 bg-slate-900/40 border-slate-800" },
          { label: "Redemptions Logged", val: stats.totalRedeemed.toLocaleString(), icon: ShoppingBag, color: "text-violet-400 bg-violet-500/5 border-violet-500/10" },
          { label: "Average Point Cost", val: `${stats.avgPoints} pts`, icon: Coins, color: "text-emerald-400 bg-emerald-500/5 border-emerald-500/10" },
          { label: "Active Live Rewards", val: stats.activeCount, icon: Award, color: "text-amber-400 bg-amber-500/5 border-amber-500/10" }
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
              placeholder="Search rewards by title or prize type..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500/40"
          >
            <option value="All">All Reward Types</option>
            <option value="Mentorship">Mentorship</option>
            <option value="Software Credit">Software Credit</option>
            <option value="Hardware">Hardware</option>
            <option value="Voucher">Voucher</option>
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
                    {selectedIds.size === filteredRewards.length && filteredRewards.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-red-500" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-700" />
                    )}
                  </button>
                </th>
                <th className="px-5 py-4">Reward Title / Description</th>
                <th className="px-5 py-4">Category Type</th>
                <th className="px-5 py-4 text-center">Redemption Cost</th>
                <th className="px-5 py-4 text-center">Remaining Stock</th>
                <th className="px-5 py-4 text-center">Redeemed Count</th>
                <th className="px-5 py-4">Listing Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {filteredRewards.map((r) => {
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
                      <div className="font-semibold text-slate-200">{r.title}</div>
                      <div className="text-[10px] text-slate-500 truncate mt-0.5">{r.description}</div>
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-350">{r.type}</td>
                    <td className="px-5 py-4 text-center font-mono font-semibold text-indigo-400">
                      {r.pointsCost} pts
                    </td>
                    <td className="px-5 py-4 text-center font-mono font-semibold text-slate-300">
                      {r.stockLeft === 0 ? (
                        <span className="text-rose-450 uppercase text-[9px] font-bold">Sold Out</span>
                      ) : (
                        <span>{r.stockLeft} left</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-center font-mono text-slate-400">{r.redeemedCount} times</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                        r.status === "Active" 
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : r.status === "Draft"
                            ? "bg-slate-500/10 text-slate-400 border-slate-500/20"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button 
                          onClick={() => handleToggleStatus(r)}
                          title="Toggle Active/Draft"
                          className="p-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-lg hover:border-slate-700 transition cursor-pointer"
                        >
                          <ToggleLeft className="w-3.5 h-3.5" />
                        </button>
                        
                        <button 
                          onClick={() => openEditModal(r)}
                          title="Modify Details"
                          className="p-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-lg hover:border-slate-700 transition cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        
                        <button 
                          onClick={() => handleDeleteIndividual(r.id)}
                          title="Delete Item"
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
        {filteredRewards.length === 0 && (
          <div className="flex flex-col items-center justify-center p-16 text-center">
            <Ticket className="w-10 h-10 text-slate-750 mb-3" />
            <h3 className="text-sm font-bold text-white">No Rewards Found</h3>
            <p className="text-xs text-slate-500 mt-1">Adjust search parameters or create a new point prize entry.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Reward Dialog */}
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
                    {modalMode === "add" ? "Create Redeemable Prize" : "Edit Prize Properties"}
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
                  <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Reward Title *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. $500 AWS Promo Code"
                    value={formFields.title || ""}
                    onChange={(e) => setFormFields({ ...formFields, title: e.target.value })}
                    className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Category Type</label>
                    <select 
                      value={formFields.type || "Software Credit"}
                      onChange={(e) => setFormFields({ ...formFields, type: e.target.value as any })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    >
                      <option value="Software Credit">Software Credit</option>
                      <option value="Mentorship">Mentorship</option>
                      <option value="Hardware">Hardware</option>
                      <option value="Voucher">Voucher</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Redeem Status</label>
                    <select 
                      value={formFields.status || "Active"}
                      onChange={(e) => setFormFields({ ...formFields, status: e.target.value as any })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    >
                      <option value="Active">Active</option>
                      <option value="Draft">Draft</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Points Cost *</label>
                    <input 
                      type="number" 
                      required
                      min="10"
                      value={formFields.pointsCost || 500}
                      onChange={(e) => setFormFields({ ...formFields, pointsCost: Number(e.target.value) })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Stock Left</label>
                    <input 
                      type="number" 
                      min="0"
                      value={formFields.stockLeft || 0}
                      onChange={(e) => setFormFields({ ...formFields, stockLeft: Number(e.target.value) })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Reward Description *</label>
                  <textarea 
                    required
                    rows={3}
                    placeholder="Provide details about redemption instructions and expiration date..."
                    value={formFields.description || ""}
                    onChange={(e) => setFormFields({ ...formFields, description: e.target.value })}
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
                    {modalMode === "add" ? "Create Prize" : "Save Prize"}
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

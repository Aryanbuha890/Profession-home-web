'use client';

import React, { useState, useMemo } from "react";
import { 
  Coins, Search, Plus, Filter, Trash2, Edit, TrendingUp, 
  Briefcase, Target, Building, Mail, CheckSquare, Square, X
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { AnimatePresence, motion } from "framer-motion";



interface InvestorRecord {
  id: string;
  name: string;
  firm: string;
  email: string;
  investorType: "Angel" | "VC" | "Corporate VC" | "Family Office";
  ticketSize: string; // e.g. "$100k - $500k"
  totalInvested: number; // in USD
  portfolioCount: number;
  logo: string;
}

const INITIAL_INVESTORS: InvestorRecord[] = [
  { id: "INV-601", name: "Courtney Henry", firm: "Henry Capital Partners", email: "courtney@henrycap.com", investorType: "VC", ticketSize: "$250k - $1M", totalInvested: 4500000, portfolioCount: 12, logo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256&h=256" },
  { id: "INV-602", name: "Albert Flores", firm: "Flores Angels", email: "albert@flores.co", investorType: "Angel", ticketSize: "$50k - $200k", totalInvested: 850000, portfolioCount: 6, logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256" },
  { id: "INV-603", name: "Theresa Webb", firm: "Webb Venture Lab", email: "theresa@webbventures.io", investorType: "Corporate VC", ticketSize: "$500k - $2M", totalInvested: 12000000, portfolioCount: 24, logo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256" },
  { id: "INV-604", name: "Dianne Russell", firm: "Russell Family Trust", email: "dianne@russelltrust.org", investorType: "Family Office", ticketSize: "$100k - $500k", totalInvested: 2400000, portfolioCount: 8, logo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=256&h=256" }
];

function AdminInvestorsPage() {
  const [investors, setInvestors] = useState<InvestorRecord[]>(INITIAL_INVESTORS);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [formFields, setFormFields] = useState<Partial<InvestorRecord>>({
    name: "",
    firm: "",
    email: "",
    investorType: "VC",
    ticketSize: "$100k - $500k",
    totalInvested: 500000,
    portfolioCount: 1,
    logo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256&h=256"
  });

  // Calculate metrics
  const stats = useMemo(() => {
    const total = investors.length;
    const totalCap = investors.reduce((acc, i) => acc + i.totalInvested, 0);
    const totalPortfolio = investors.reduce((acc, i) => acc + i.portfolioCount, 0);
    const vcCount = investors.filter(i => i.investorType === "VC").length;
    return { total, totalCap, totalPortfolio, vcCount };
  }, [investors]);

  // Filter list
  const filteredInvestors = useMemo(() => {
    return investors.filter(i => {
      const matchesSearch = 
        i.name.toLowerCase().includes(search.toLowerCase()) ||
        i.firm.toLowerCase().includes(search.toLowerCase()) ||
        i.email.toLowerCase().includes(search.toLowerCase()) ||
        i.id.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === "All" || i.investorType === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [investors, search, typeFilter]);

  // Selection
  const handleSelectOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === filteredInvestors.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredInvestors.map(i => i.id)));
    }
  };

  // Actions
  const handleDeleteSelected = () => {
    setInvestors(prev => prev.filter(i => !selectedIds.has(i.id)));
    toast.success(`Removed ${selectedIds.size} investors`);
    setSelectedIds(new Set());
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFields.name || !formFields.firm || !formFields.email) {
      toast.error("Complete all required fields.");
      return;
    }

    if (modalMode === "add") {
      const newInv: InvestorRecord = {
        id: `INV-${Math.floor(100 + Math.random() * 900)}`,
        name: formFields.name,
        firm: formFields.firm,
        email: formFields.email,
        investorType: formFields.investorType || "VC",
        ticketSize: formFields.ticketSize || "$100k - $500k",
        totalInvested: Number(formFields.totalInvested) || 0,
        portfolioCount: Number(formFields.portfolioCount) || 0,
        logo: formFields.logo || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256&h=256"
      };
      setInvestors([newInv, ...investors]);
      toast.success(`Registered investor profile ${newInv.name}`);
    } else {
      setInvestors(prev => prev.map(i => i.id === editingId ? { ...i, ...formFields as InvestorRecord } : i));
      toast.success("Investor profile saved.");
    }
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setModalMode("add");
    setFormFields({
      name: "",
      firm: "",
      email: "",
      investorType: "VC",
      ticketSize: "$100k - $500k",
      totalInvested: 500000,
      portfolioCount: 5,
      logo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256&h=256"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (inv: InvestorRecord) => {
    setModalMode("edit");
    setEditingId(inv.id);
    setFormFields(inv);
    setIsModalOpen(true);
  };

  const handleDeleteIndividual = (id: string) => {
    setInvestors(prev => prev.filter(i => i.id !== id));
    toast.success("Investor profile record removed.");
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
          <h1 className="text-2xl font-bold text-white tracking-tight">Investor Network Directory</h1>
          <p className="text-xs text-slate-400 mt-1">Manage investment institutions, track aggregate committed capital, ticket sizes, and deal portfolios.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-1.5 bg-gradient-to-r from-red-500 to-rose-600 hover:opacity-95 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-lg shadow-red-500/10 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Investor
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Active Investors", val: stats.total, icon: Building, color: "text-slate-400 bg-slate-900/40 border-slate-800" },
          { label: "Deployed Capital pool", val: `$${(stats.totalCap / 1000000).toFixed(2)}M`, icon: Coins, color: "text-emerald-400 bg-emerald-500/5 border-emerald-500/10" },
          { label: "Portfolio Companies", val: stats.totalPortfolio, icon: Briefcase, color: "text-violet-400 bg-violet-500/5 border-violet-500/10" },
          { label: "Venture Capital Funds", val: stats.vcCount, icon: Target, color: "text-amber-400 bg-amber-500/5 border-amber-500/10" }
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
              placeholder="Search investors by name, firm, or email..." 
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
            <option value="All">All Investor Types</option>
            <option value="Angel">Angel</option>
            <option value="VC">VC</option>
            <option value="Corporate VC">Corporate VC</option>
            <option value="Family Office">Family Office</option>
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
                    {selectedIds.size === filteredInvestors.length && filteredInvestors.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-red-500" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-700" />
                    )}
                  </button>
                </th>
                <th className="px-5 py-4">Investor Contact Details</th>
                <th className="px-5 py-4">Venture Institution / Firm</th>
                <th className="px-5 py-4">Investor Type</th>
                <th className="px-5 py-4 text-center">Avg Ticket Size</th>
                <th className="px-5 py-4 text-center">Portfolio Count</th>
                <th className="px-5 py-4 text-right">Capital Committed</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {filteredInvestors.map((inv) => {
                const isSelected = selectedIds.has(inv.id);
                return (
                  <tr key={inv.id} className={`hover:bg-slate-800/20 transition ${isSelected ? "bg-red-500/5" : ""}`}>
                    <td className="px-5 py-4">
                      <button onClick={() => handleSelectOne(inv.id)} className="cursor-pointer">
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-red-500" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-855" />
                        )}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={inv.logo} alt={inv.name} className="w-8 h-8 rounded-full object-cover border border-slate-800" />
                        <div>
                          <div className="font-semibold text-slate-200">{inv.name}</div>
                          <div className="text-[9px] text-slate-500 mt-0.5">{inv.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-300">{inv.firm}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                        inv.investorType === "VC" 
                          ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                          : inv.investorType === "Angel"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                      }`}>
                        {inv.investorType}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center font-mono font-semibold text-slate-300">
                      {inv.ticketSize}
                    </td>
                    <td className="px-5 py-4 text-center font-mono font-semibold text-slate-300">
                      {inv.portfolioCount} cos
                    </td>
                    <td className="px-5 py-4 text-right font-semibold text-emerald-400 font-mono">
                      ${inv.totalInvested.toLocaleString()}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button 
                          onClick={() => openEditModal(inv)}
                          title="Modify Details"
                          className="p-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-lg hover:border-slate-700 transition cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        
                        <button 
                          onClick={() => handleDeleteIndividual(inv.id)}
                          title="Delete Investor"
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
        {filteredInvestors.length === 0 && (
          <div className="flex flex-col items-center justify-center p-16 text-center">
            <Coins className="w-10 h-10 text-slate-750 mb-3" />
            <h3 className="text-sm font-bold text-white">No Investors Listed</h3>
            <p className="text-xs text-slate-500 mt-1">Adjust search parameters or add a new investor profile.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Investor Dialog */}
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
                    {modalMode === "add" ? "Register Investor Account" : "Edit Investor Profile"}
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
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Investor Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Courtney Henry"
                      value={formFields.name || ""}
                      onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Firm / Trust Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Henry Capital"
                      value={formFields.firm || ""}
                      onChange={(e) => setFormFields({ ...formFields, firm: e.target.value })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Email Address *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. investor@henry.co"
                      value={formFields.email || ""}
                      onChange={(e) => setFormFields({ ...formFields, email: e.target.value })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Investor Type</label>
                    <select 
                      value={formFields.investorType || "VC"}
                      onChange={(e) => setFormFields({ ...formFields, investorType: e.target.value as any })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    >
                      <option value="VC">VC Fund</option>
                      <option value="Angel">Angel Investor</option>
                      <option value="Corporate VC">Corporate VC</option>
                      <option value="Family Office">Family Office</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Ticket Range</label>
                    <input 
                      type="text" 
                      placeholder="e.g. $100k-$500k"
                      value={formFields.ticketSize || ""}
                      onChange={(e) => setFormFields({ ...formFields, ticketSize: e.target.value })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Capital Pool ($)</label>
                    <input 
                      type="number" 
                      min="0"
                      value={formFields.totalInvested || 0}
                      onChange={(e) => setFormFields({ ...formFields, totalInvested: Number(e.target.value) })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Portfolio Count</label>
                    <input 
                      type="number" 
                      min="0"
                      value={formFields.portfolioCount || 0}
                      onChange={(e) => setFormFields({ ...formFields, portfolioCount: Number(e.target.value) })}
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
                    {modalMode === "add" ? "Register Investor" : "Save Settings"}
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

export default AdminInvestorsPage;

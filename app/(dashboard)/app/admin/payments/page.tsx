'use client';

import React, { useState, useMemo } from "react";
import { 
  Coins, Search, Plus, Filter, Trash2, Edit, CreditCard, 
  DollarSign, FileText, CheckCircle, Clock, X, CheckSquare, Square
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { AnimatePresence, motion } from "framer-motion";



interface PaymentRecord {
  id: string;
  payerName: string;
  email: string;
  role: "Student" | "Founder" | "Expert" | "Investor" | "University";
  amount: number; // in USD
  status: "Paid" | "Pending" | "Refunded";
  date: string;
  method: "Stripe" | "PayPal" | "Bank Transfer" | "Google Pay";
}

const INITIAL_PAYMENTS: PaymentRecord[] = [
  { id: "TXN-901", payerName: "Aryan Sharma", email: "aryan.sharma@growtharena.com", role: "Student", amount: 150, status: "Paid", date: "2024-06-12", method: "Stripe" },
  { id: "TXN-902", payerName: "Courtney Henry", email: "courtney@henrycap.com", role: "Investor", amount: 1200, status: "Paid", date: "2024-06-11", method: "Bank Transfer" },
  { id: "TXN-903", payerName: "Dean Arvind Menon", email: "dean.cs@university.edu", role: "University", amount: 5000, status: "Pending", date: "2024-06-13", method: "Bank Transfer" },
  { id: "TXN-904", payerName: "Leslie Alexander", email: "leslie.expert@mentor.org", role: "Expert", amount: 350, status: "Paid", date: "2024-06-10", method: "PayPal" },
  { id: "TXN-905", payerName: "Floyd Miles", email: "floyd@milesventures.co", role: "Founder", amount: 600, status: "Refunded", date: "2024-06-08", method: "Stripe" }
];

function AdminPaymentsPage() {
  const [payments, setPayments] = useState<PaymentRecord[]>(INITIAL_PAYMENTS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [formFields, setFormFields] = useState<Partial<PaymentRecord>>({
    payerName: "",
    email: "",
    role: "Student",
    amount: 100,
    status: "Paid",
    method: "Stripe"
  });

  // Calculate metrics
  const stats = useMemo(() => {
    const totalCount = payments.length;
    const totalRevenue = payments.filter(p => p.status === "Paid").reduce((acc, p) => acc + p.amount, 0);
    const pendingAmount = payments.filter(p => p.status === "Pending").reduce((acc, p) => acc + p.amount, 0);
    const refundAmount = payments.filter(p => p.status === "Refunded").reduce((acc, p) => acc + p.amount, 0);
    return { totalCount, totalRevenue, pendingAmount, refundAmount };
  }, [payments]);

  // Filter list
  const filteredPayments = useMemo(() => {
    return payments.filter(p => {
      const matchesSearch = 
        p.payerName.toLowerCase().includes(search.toLowerCase()) ||
        p.email.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [payments, search, statusFilter]);

  // Selection
  const handleSelectOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === filteredPayments.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredPayments.map(p => p.id)));
    }
  };

  // Actions
  const handleDeleteSelected = () => {
    setPayments(prev => prev.filter(p => !selectedIds.has(p.id)));
    toast.success(`Deleted ${selectedIds.size} transaction rows`);
    setSelectedIds(new Set());
  };

  const handleToggleStatus = (payment: PaymentRecord) => {
    const nextStatus = payment.status === "Paid" ? "Refunded" : payment.status === "Pending" ? "Paid" : "Pending";
    setPayments(prev => prev.map(p => p.id === payment.id ? { ...p, status: nextStatus } : p));
    toast.success(`Transaction ${payment.id} status is now ${nextStatus}`);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFields.payerName || !formFields.email || !formFields.amount) {
      toast.error("Complete all required fields.");
      return;
    }

    if (modalMode === "add") {
      const newPay: PaymentRecord = {
        id: `TXN-${Math.floor(100 + Math.random() * 900)}`,
        payerName: formFields.payerName,
        email: formFields.email,
        role: formFields.role || "Student",
        amount: Number(formFields.amount) || 0,
        status: formFields.status || "Paid",
        date: new Date().toISOString().split("T")[0],
        method: formFields.method || "Stripe"
      };
      setPayments([newPay, ...payments]);
      toast.success(`Logged payment transaction ${newPay.id}`);
    } else {
      setPayments(prev => prev.map(p => p.id === editingId ? { ...p, ...formFields as PaymentRecord } : p));
      toast.success("Transaction parameters updated.");
    }
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setModalMode("add");
    setFormFields({
      payerName: "",
      email: "",
      role: "Student",
      amount: 150,
      status: "Paid",
      method: "Stripe"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: PaymentRecord) => {
    setModalMode("edit");
    setEditingId(p.id);
    setFormFields(p);
    setIsModalOpen(true);
  };

  const handleDeleteIndividual = (id: string) => {
    setPayments(prev => prev.filter(p => p.id !== id));
    toast.success("Transaction record deleted.");
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
          <h1 className="text-2xl font-bold text-white tracking-tight">System Billing & Payments Ledger</h1>
          <p className="text-xs text-slate-400 mt-1">Review stripe receipts, direct bank transfers, subscription fees, mentor invoices, and refund requests.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-1.5 bg-gradient-to-r from-red-500 to-rose-600 hover:opacity-95 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-lg shadow-red-500/10 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Log Transaction
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Aggregate Revenue", val: `$${stats.totalRevenue.toLocaleString()}`, icon: Coins, color: "text-emerald-450 bg-emerald-500/5 border-emerald-500/10" },
          { label: "Pending Funds Pool", val: `$${stats.pendingAmount.toLocaleString()}`, icon: Clock, color: "text-amber-400 bg-amber-500/5 border-amber-500/10" },
          { label: "Total Refunds Processed", val: `$${stats.refundAmount.toLocaleString()}`, icon: CreditCard, color: "text-rose-400 bg-rose-500/5 border-rose-500/10" },
          { label: "Transactions Logged", val: stats.totalCount, icon: FileText, color: "text-slate-400 bg-slate-900/40 border-slate-800" }
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
              placeholder="Search by payer name, invoice ID, or email..." 
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
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Refunded">Refunded</option>
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
                    {selectedIds.size === filteredPayments.length && filteredPayments.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-red-500" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-700" />
                    )}
                  </button>
                </th>
                <th className="px-5 py-4">Transaction ID</th>
                <th className="px-5 py-4">Payer Details</th>
                <th className="px-5 py-4">Payer Role</th>
                <th className="px-5 py-4">Payment Method</th>
                <th className="px-5 py-4 text-center">Payment Status</th>
                <th className="px-5 py-4 text-right">Amount (USD)</th>
                <th className="px-5 py-4">Payment Date</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {filteredPayments.map((p) => {
                const isSelected = selectedIds.has(p.id);
                return (
                  <tr key={p.id} className={`hover:bg-slate-800/20 transition ${isSelected ? "bg-red-500/5" : ""}`}>
                    <td className="px-5 py-4">
                      <button onClick={() => handleSelectOne(p.id)} className="cursor-pointer">
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-red-500" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-855" />
                        )}
                      </button>
                    </td>
                    <td className="px-5 py-4 font-mono font-semibold text-slate-400">{p.id}</td>
                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-200">{p.payerName}</div>
                      <div className="text-[9px] text-slate-500 mt-0.5">{p.email}</div>
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-350">{p.role}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <CreditCard className="w-3.5 h-3.5 text-slate-550" />
                        <span>{p.method}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                        p.status === "Paid" 
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : p.status === "Pending"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right font-semibold text-emerald-400 font-mono">
                      ${p.amount.toLocaleString()}.00
                    </td>
                    <td className="px-5 py-4 font-mono text-slate-500">{p.date}</td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button 
                          onClick={() => handleToggleStatus(p)}
                          title="Toggle Status (Paid/Pending/Refunded)"
                          className="p-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-lg hover:border-slate-700 transition cursor-pointer"
                        >
                          <Clock className="w-3.5 h-3.5" />
                        </button>
                        
                        <button 
                          onClick={() => openEditModal(p)}
                          title="Modify Details"
                          className="p-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-lg hover:border-slate-700 transition cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        
                        <button 
                          onClick={() => handleDeleteIndividual(p.id)}
                          title="Delete Record"
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
        {filteredPayments.length === 0 && (
          <div className="flex flex-col items-center justify-center p-16 text-center">
            <Coins className="w-10 h-10 text-slate-750 mb-3" />
            <h3 className="text-sm font-bold text-white">No Transactions Found</h3>
            <p className="text-xs text-slate-500 mt-1">Adjust search filters or log a new payment transaction receipt.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Payment Dialog */}
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
                    {modalMode === "add" ? "Log Payment Receipt" : "Edit Transaction Details"}
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
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Payer Full Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Aryan Sharma"
                      value={formFields.payerName || ""}
                      onChange={(e) => setFormFields({ ...formFields, payerName: e.target.value })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Payer Email *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. payer@growth.com"
                      value={formFields.email || ""}
                      onChange={(e) => setFormFields({ ...formFields, email: e.target.value })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">User Workspace Role</label>
                    <select 
                      value={formFields.role || "Student"}
                      onChange={(e) => setFormFields({ ...formFields, role: e.target.value as any })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    >
                      <option value="Student">Student</option>
                      <option value="Founder">Founder</option>
                      <option value="Expert">Expert</option>
                      <option value="Investor">Investor</option>
                      <option value="University">University</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Payment Method</label>
                    <select 
                      value={formFields.method || "Stripe"}
                      onChange={(e) => setFormFields({ ...formFields, method: e.target.value as any })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    >
                      <option value="Stripe">Stripe</option>
                      <option value="PayPal">PayPal</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Google Pay">Google Pay</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Transaction Amount ($) *</label>
                    <input 
                      type="number" 
                      required
                      min="1"
                      placeholder="150"
                      value={formFields.amount || 150}
                      onChange={(e) => setFormFields({ ...formFields, amount: Number(e.target.value) })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Receipt Status</label>
                    <select 
                      value={formFields.status || "Paid"}
                      onChange={(e) => setFormFields({ ...formFields, status: e.target.value as any })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    >
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                      <option value="Refunded">Refunded</option>
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
                    {modalMode === "add" ? "Log Payment" : "Save Changes"}
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

export default AdminPaymentsPage;

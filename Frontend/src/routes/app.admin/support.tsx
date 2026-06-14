import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useMemo } from "react";
import { 
  HelpCircle, Search, Plus, Filter, Trash2, Edit, BookOpen, 
  Eye, CheckCircle, X, ToggleLeft, CheckSquare, Square
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

export const Route = createFileRoute("/app/admin/support")({
  component: SupportPage,
});

interface ArticleRecord {
  id: string;
  title: string;
  category: "Billing & Subscriptions" | "Platform Basics" | "Technical Integration" | "Profile & Security";
  viewsCount: number;
  status: "Published" | "Draft";
  lastUpdated: string;
  author: string;
  content: string;
}

const INITIAL_ARTICLES: ArticleRecord[] = [
  { id: "KB-101", title: "How to connect your Stripe account for startup payouts", category: "Billing & Subscriptions", viewsCount: 1540, status: "Published", lastUpdated: "2024-06-10", author: "Savannah Nguyen", content: "To receive payouts from investors directly on our platform, you need to link a valid Stripe Express account. Navigate to Settings -> Payouts and follow the prompts." },
  { id: "KB-102", title: "Resetting your two-factor authentication (2FA)", category: "Profile & Security", viewsCount: 842, status: "Published", lastUpdated: "2024-06-11", author: "Alex Chen", content: "If you lose access to your authenticator application, you can use the 16-character backup key generated during initial enrollment to log back in." },
  { id: "KB-103", title: "Understanding the AI assessment scoring model", category: "Platform Basics", viewsCount: 2110, status: "Published", lastUpdated: "2024-06-08", author: "Savannah Nguyen", content: "Our AI model analyzes technical skills, forum contributions, and academic background to output a baseline roadmap percentile score updated weekly." },
  { id: "KB-104", title: "Configuring custom subdomain redirects for campus partners", category: "Technical Integration", viewsCount: 124, status: "Draft", lastUpdated: "2024-06-12", author: "Alex Chen", content: "Universities can bind custom domain redirect rules (e.g. careers.university.edu) to point to their tailored dashboards. DNS configuration details follow." }
];

function SupportPage() {
  const [articles, setArticles] = useState<ArticleRecord[]>(INITIAL_ARTICLES);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [formFields, setFormFields] = useState<Partial<ArticleRecord>>({
    title: "",
    category: "Platform Basics",
    status: "Draft",
    author: "Alex Chen",
    content: ""
  });

  // Calculate metrics
  const stats = useMemo(() => {
    const total = articles.length;
    const totalViews = articles.reduce((acc, a) => acc + a.viewsCount, 0);
    const publishedCount = articles.filter(a => a.status === "Published").length;
    const draftCount = articles.filter(a => a.status === "Draft").length;
    return { total, totalViews, publishedCount, draftCount };
  }, [articles]);

  // Filter list
  const filteredArticles = useMemo(() => {
    return articles.filter(a => {
      const matchesSearch = 
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.author.toLowerCase().includes(search.toLowerCase()) ||
        a.id.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === "All" || a.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [articles, search, categoryFilter]);

  // Selection
  const handleSelectOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === filteredArticles.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredArticles.map(a => a.id)));
    }
  };

  // Actions
  const handleDeleteSelected = () => {
    setArticles(prev => prev.filter(a => !selectedIds.has(a.id)));
    toast.success(`Removed ${selectedIds.size} knowledge base articles.`);
    setSelectedIds(new Set());
  };

  const handleToggleStatus = (article: ArticleRecord) => {
    const nextStatus = article.status === "Published" ? "Draft" : "Published";
    setArticles(prev => prev.map(a => a.id === article.id ? { ...a, status: nextStatus } : a));
    toast.success(`Article status updated to ${nextStatus}.`);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFields.title || !formFields.content) {
      toast.error("Complete all required fields.");
      return;
    }

    if (modalMode === "add") {
      const newArt: ArticleRecord = {
        id: `KB-${Math.floor(100 + Math.random() * 900)}`,
        title: formFields.title,
        category: formFields.category || "Platform Basics",
        viewsCount: 0,
        status: formFields.status || "Draft",
        lastUpdated: new Date().toISOString().split("T")[0],
        author: formFields.author || "Alex Chen",
        content: formFields.content
      };
      setArticles([newArt, ...articles]);
      toast.success(`Logged helpdesk article ${newArt.title}`);
    } else {
      setArticles(prev => prev.map(a => a.id === editingId ? { ...a, ...formFields as ArticleRecord, lastUpdated: new Date().toISOString().split("T")[0] } : a));
      toast.success("Helpdesk article saved.");
    }
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    setModalMode("add");
    setFormFields({
      title: "",
      category: "Platform Basics",
      status: "Draft",
      author: "Alex Chen",
      content: ""
    });
    setIsModalOpen(true);
  };

  const openEditModal = (a: ArticleRecord) => {
    setModalMode("edit");
    setEditingId(a.id);
    setFormFields(a);
    setIsModalOpen(true);
  };

  const handleDeleteIndividual = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
    toast.success("Article deleted from system catalog.");
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
          <h1 className="text-2xl font-bold text-white tracking-tight">Knowledge Base & FAQ Support Manager</h1>
          <p className="text-xs text-slate-400 mt-1">Write self-service articles, manage setup tutorials, and view statistics for resolved query pages.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-1.5 bg-gradient-to-r from-red-500 to-rose-600 hover:opacity-95 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-lg shadow-red-500/10 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Article
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Indexed Articles", val: stats.total, icon: HelpCircle, color: "text-slate-400 bg-slate-900/40 border-slate-800" },
          { label: "Self-Help Pageviews", val: stats.totalViews.toLocaleString(), icon: Eye, color: "text-violet-400 bg-violet-500/5 border-violet-500/10" },
          { label: "Live Articles", val: stats.publishedCount, icon: BookOpen, color: "text-emerald-400 bg-emerald-500/5 border-emerald-500/10" },
          { label: "Draft Notebooks", val: stats.draftCount, icon: CheckCircle, color: "text-amber-400 bg-amber-500/5 border-amber-500/10" }
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
              placeholder="Search articles by title, author, or ID..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500/40"
          >
            <option value="All">All Categories</option>
            <option value="Billing & Subscriptions">Billing</option>
            <option value="Profile & Security">Profile & Security</option>
            <option value="Platform Basics">Basics</option>
            <option value="Technical Integration">Integration</option>
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
                    {selectedIds.size === filteredArticles.length && filteredArticles.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-red-500" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-700" />
                    )}
                  </button>
                </th>
                <th className="px-5 py-4">Article Title</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4 text-center">Pageviews</th>
                <th className="px-5 py-4">Last Updated</th>
                <th className="px-5 py-4">Author</th>
                <th className="px-5 py-4 text-center">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {filteredArticles.map((art) => {
                const isSelected = selectedIds.has(art.id);
                return (
                  <tr key={art.id} className={`hover:bg-slate-800/20 transition ${isSelected ? "bg-red-500/5" : ""}`}>
                    <td className="px-5 py-4">
                      <button onClick={() => handleSelectOne(art.id)} className="cursor-pointer">
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-red-500" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-855" />
                        )}
                      </button>
                    </td>
                    <td className="px-5 py-4 max-w-xs">
                      <div className="font-semibold text-slate-200">{art.title}</div>
                      <div className="text-[9px] text-slate-500 mt-0.5 font-mono">{art.id}</div>
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-350">{art.category}</td>
                    <td className="px-5 py-4 text-center font-mono font-semibold text-slate-300">
                      {art.viewsCount.toLocaleString()}
                    </td>
                    <td className="px-5 py-4 font-mono text-slate-500">{art.lastUpdated}</td>
                    <td className="px-5 py-4 text-slate-400 font-semibold">{art.author}</td>
                    <td className="px-5 py-4 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                        art.status === "Published" 
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-slate-500/10 text-slate-400 border-slate-500/20"
                      }`}>
                        {art.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button 
                          onClick={() => handleToggleStatus(art)}
                          title="Toggle Status (Publish/Draft)"
                          className="p-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-lg hover:border-slate-700 transition cursor-pointer"
                        >
                          <ToggleLeft className="w-3.5 h-3.5" />
                        </button>
                        
                        <button 
                          onClick={() => openEditModal(art)}
                          title="Modify Details"
                          className="p-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-lg hover:border-slate-700 transition cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        
                        <button 
                          onClick={() => handleDeleteIndividual(art.id)}
                          title="Delete Article"
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
        {filteredArticles.length === 0 && (
          <div className="flex flex-col items-center justify-center p-16 text-center">
            <HelpCircle className="w-10 h-10 text-slate-750 mb-3" />
            <h3 className="text-sm font-bold text-white">No Articles Listed</h3>
            <p className="text-xs text-slate-500 mt-1">Adjust search parameters or create a new support knowledge doc.</p>
          </div>
        )}
      </div>

      {/* Add / Edit Article Dialog */}
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
                    {modalMode === "add" ? "Write Helpdesk Article" : "Edit Helpdesk Article"}
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
                  <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Article Title *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Resetting your two-factor credentials"
                    value={formFields.title || ""}
                    onChange={(e) => setFormFields({ ...formFields, title: e.target.value })}
                    className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Category</label>
                    <select 
                      value={formFields.category || "Platform Basics"}
                      onChange={(e) => setFormFields({ ...formFields, category: e.target.value as any })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    >
                      <option value="Platform Basics">Platform Basics</option>
                      <option value="Billing & Subscriptions">Billing</option>
                      <option value="Profile & Security">Profile & Security</option>
                      <option value="Technical Integration">Technical Integration</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Publish Status</label>
                    <select 
                      value={formFields.status || "Draft"}
                      onChange={(e) => setFormFields({ ...formFields, status: e.target.value as any })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Author Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Alex Chen"
                      value={formFields.author || ""}
                      onChange={(e) => setFormFields({ ...formFields, author: e.target.value })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Initial Views count</label>
                    <input 
                      type="number" 
                      min="0"
                      value={formFields.viewsCount || 0}
                      onChange={(e) => setFormFields({ ...formFields, viewsCount: Number(e.target.value) })}
                      className="bg-slate-950 border border-slate-800 focus:border-red-500/60 rounded-xl px-3 py-2 w-full text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1.5">Article Body Content *</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Provide details about the solution guide..."
                    value={formFields.content || ""}
                    onChange={(e) => setFormFields({ ...formFields, content: e.target.value })}
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
                    {modalMode === "add" ? "Create Article" : "Save Article"}
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

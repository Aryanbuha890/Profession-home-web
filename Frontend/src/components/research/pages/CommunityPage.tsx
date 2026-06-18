import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, TrendingUp } from "lucide-react";
import { Page, Card } from "@/components/app/Page";
import { communityPosts, RESEARCHER } from "../mockData";
import { FadeIn, SectionLabel } from "../shared";
import { PageHero, SpotlightCard } from "../premium";

export function ResearchCommunityPage() {
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = [...new Set(communityPosts.flatMap((p) => p.tags))];
  const filtered = activeTag ? communityPosts.filter((p) => p.tags.includes(activeTag)) : communityPosts;

  const toggleLike = (id: string) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <Page title="Research Community" subtitle="Connect with scholars, share discoveries, and collaborate globally.">
      <PageHero
        badge="2,847 Researchers Active"
        title="Global Research Community"
        subtitle="Share discoveries, like posts, filter by topic tags, and connect with MIT, DeepMind, Stanford scholars worldwide."
      />
      <FadeIn>
        <div className="mb-6 flex flex-wrap gap-4 items-center p-5 rounded-2xl border border-white/5 bg-slate-900/40">
          <img src={RESEARCHER.avatar} alt="" className="w-12 h-12 rounded-xl border border-violet-500/30" />
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Share a research update with the community..."
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-violet-400 placeholder:text-muted-foreground"
            />
          </div>
          <button
            type="button"
            className="px-4 py-2.5 rounded-xl bg-violet-500 text-slate-950 font-bold text-xs cursor-pointer border-none hover:bg-violet-400 transition"
          >
            Post Update
          </button>
        </div>
      </FadeIn>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          type="button"
          onClick={() => setActiveTag(null)}
          className={`text-[10px] font-mono px-3 py-1.5 rounded-full border cursor-pointer transition ${
            !activeTag ? "bg-violet-500/20 border-violet-500/30 text-violet-300" : "border-white/10 text-muted-foreground hover:text-white"
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={`text-[10px] font-mono px-3 py-1.5 rounded-full border cursor-pointer transition ${
              activeTag === tag
                ? "bg-violet-500/20 border-violet-500/30 text-violet-300"
                : "border-white/10 text-muted-foreground hover:text-white"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {filtered.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="p-5 hover:border-violet-500/20 transition-all">
                <div className="flex gap-3">
                  <img src={post.avatar} alt="" className="w-10 h-10 rounded-xl border border-white/10 object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-white">{post.author}</span>
                      <span className="text-[10px] text-violet-400 font-mono">{post.role}</span>
                      <span className="text-[10px] text-muted-foreground">· {post.time}</span>
                    </div>
                    <p className="text-xs text-white/85 mt-2 leading-relaxed">{post.content}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[8px] font-mono px-2 py-0.5 rounded-lg border border-white/5 bg-white/[0.02] text-muted-foreground"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/5">
                      <button
                        type="button"
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center gap-1.5 text-[10px] font-mono cursor-pointer border-none bg-transparent transition ${
                          liked.has(post.id) ? "text-rose-400" : "text-muted-foreground hover:text-rose-400"
                        }`}
                      >
                        <Heart size={14} fill={liked.has(post.id) ? "currentColor" : "none"} />
                        {post.likes + (liked.has(post.id) ? 1 : 0)}
                      </button>
                      <button
                        type="button"
                        className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground hover:text-sky-400 cursor-pointer border-none bg-transparent transition"
                      >
                        <MessageCircle size={14} />
                        {post.comments}
                      </button>
                      <button
                        type="button"
                        className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground hover:text-violet-400 cursor-pointer border-none bg-transparent transition ml-auto"
                      >
                        <Share2 size={14} />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <Card className="p-5 sticky top-6">
            <SectionLabel>Trending Topics</SectionLabel>
            <div className="space-y-3 mt-4">
              {["Graph Neural Networks", "NeurIPS 2026", "Federated Learning", "LaTeX Optimization"].map((topic, i) => (
                <div key={topic} className="flex items-center justify-between text-xs">
                  <span className="text-white/90">{topic}</span>
                  <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                    <TrendingUp size={10} />
                    +{(i + 1) * 12}%
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-xl border border-violet-500/20 bg-violet-500/5">
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                <span className="text-violet-400 font-bold">2,847</span> researchers active this week. Join discussions
                on sparse optimization and grant writing.
              </p>
            </div>
          </Card>
        </FadeIn>
      </div>
    </Page>
  );
}

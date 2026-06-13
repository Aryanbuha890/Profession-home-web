import { createFileRoute } from "@tanstack/react-router";
import React from "react";
import { MessageCircle, Heart, Share2 } from "lucide-react";

export const Route = createFileRoute("/app/startup/community")({
  component: CommunityPage,
});

function CommunityPage() {
  const posts = [
    { author: 'Sarah Jenkins', role: 'Founder @ HealthAI', time: '2 hours ago', content: 'Just launched our V2! We migrated entirely to React 19. Has anyone here noticed significant performance boosts with the new compiler?', likes: 24, comments: 8 },
    { author: 'David Chen', role: 'CTO @ FinSync', time: '5 hours ago', content: 'Looking for recommendations for a fractional CFO who understands SaaS metrics perfectly. DMs open.', likes: 12, comments: 15 }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in zoom-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-white">Founder Community</h1>
        <p className="text-sm text-slate-400 mt-1">Connect, discuss, and learn from other founders.</p>
      </div>

      <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 flex gap-4 backdrop-blur-md">
        <div className="w-10 h-10 rounded-full bg-coral-500 flex items-center justify-center font-bold text-white shrink-0">
          U
        </div>
        <div className="flex-1">
          <textarea 
            placeholder="Share an update, ask a question..." 
            className="w-full bg-transparent border-none text-white focus:ring-0 resize-none h-12 text-sm placeholder:text-slate-500"
          ></textarea>
          <div className="flex justify-end pt-2 border-t border-slate-800">
            <button className="px-4 py-1.5 bg-coral-500 hover:bg-coral-600 text-white rounded-lg text-sm font-medium transition">
              Post
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {posts.map((post, i) => (
          <div key={i} className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-5 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-400">
                {post.author[0]}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{post.author}</h4>
                <p className="text-xs text-slate-400">{post.role} • {post.time}</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 mb-4">{post.content}</p>
            <div className="flex gap-6 border-t border-slate-800/50 pt-3">
              <button className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-rose-400 transition"><Heart className="w-4 h-4" /> {post.likes}</button>
              <button className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-blue-400 transition"><MessageCircle className="w-4 h-4" /> {post.comments}</button>
              <button className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition"><Share2 className="w-4 h-4" /> Share</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

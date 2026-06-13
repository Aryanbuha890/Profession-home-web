import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/app/Page";
import { Button } from "@/components/ui/button";
import { Star, Globe, Clock, IndianRupee, TrendingUp, Calendar, Github, Twitter, Linkedin } from "lucide-react";

export const Route = createFileRoute("/app/experts/")({
  head: () => ({ meta: [{ title: "Expert Matching — Professional Home" }] }),
  component: Experts,
});

const experts = [
  { 
    name: "Priya Raghavan", 
    domain: "Product Management", 
    bio: "I’m Priya, a product strategist focusing on visual storytelling and scalable web apps. I specialize in growth loops, user research, and wireframing.",
    exp: "9 yrs · ex-Razorpay", 
    lang: "EN, HI", 
    avail: "This week", 
    budget: "₹1,800/hr", 
    rate: 96, 
    rating: 4.9 
  },
  { 
    name: "Dr. Aman Verma", 
    domain: "ML Research", 
    bio: "I’m Aman, an ML researcher specializing in deep neural networks and NLP models. I help founders structure paper drafts and execute high-scale training.",
    exp: "12 yrs · IIT-B PhD", 
    lang: "EN", 
    avail: "Next week", 
    budget: "₹2,400/hr", 
    rate: 94, 
    rating: 4.9 
  },
  { 
    name: "Neha Kulkarni", 
    domain: "Startup & Fundraising", 
    bio: "I’m Neha, a venture builder with 2 exits. I work with pre-seed startups on pitch materials, financial modeling, validation sprints, and investor lists.",
    exp: "7 yrs · 2 exits", 
    lang: "EN, MR", 
    avail: "This week", 
    budget: "₹2,000/hr", 
    rate: 92, 
    rating: 4.8 
  },
  { 
    name: "Rohan Iyer", 
    domain: "SDE Placements", 
    bio: "I’m Rohan, a software engineer with 6+ years at Google. I help students master data structures, algorithms, and complex system design architectures.",
    exp: "6 yrs · ex-Google", 
    lang: "EN, HI", 
    avail: "Tomorrow", 
    budget: "₹1,500/hr", 
    rate: 90, 
    rating: 4.8 
  },
  { 
    name: "Sara Khan", 
    domain: "Biotech & Patents", 
    bio: "I’m Sara, a biotech regulatory consultant and patent draft advisor. I help scientists translate lab research into protected IP assets.",
    exp: "10 yrs · Pfizer", 
    lang: "EN", 
    avail: "Next week", 
    budget: "₹2,200/hr", 
    rate: 89, 
    rating: 4.7 
  },
];

function Experts() {
  return (
    <Page title="Matched Experts" subtitle="Top matched mentors based on your assessment">
      <div className="flex flex-wrap gap-2 mb-6">
        {["All domains", "Availability: any", "Language: any", "Budget: any", "Success > 85%"].map((f) => (
          <button 
            key={f} 
            className="rounded-full border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] px-4 py-1.5 text-xs text-muted-foreground hover:text-white transition cursor-pointer"
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {experts.map((e) => (
          <div 
            key={e.name}
            className="p-[1.5px] w-full max-w-[20rem] mx-auto h-[29.5rem] bg-gradient-to-r from-sky-400 via-sky-200 to-white transition-all duration-500 ease-in-out hover:-translate-y-2 hover:brightness-110 shadow-lg hover:shadow-[0_20px_45px_-10px_rgba(56,189,248,0.3)] flex"
            style={{ 
              clipPath: "polygon(30px 0%, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0% 30px)",
              borderTopRightRadius: "20px",
              borderBottomLeftRadius: "20px"
            }}
          >
            <div
              className="w-full h-full bg-[#070915] p-5 text-center flex flex-col justify-between"
              style={{
                clipPath: "polygon(28.5px 0%, 100% 0, 100% calc(100% - 28.5px), calc(100% - 28.5px) 100%, 0 100%, 0% 28.5px)",
                borderTopRightRadius: "18.5px",
                borderBottomLeftRadius: "18.5px",
                backgroundImage: "radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.08) 0%, transparent 65%), repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.012) 0px, rgba(255, 255, 255, 0.012) 1px, transparent 1px, transparent 12px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.012) 0px, rgba(255, 255, 255, 0.012) 1px, transparent 1px, transparent 12px)"
              }}
            >
              {/* Top Details & Avatar */}
              <div>
                <div className="w-20 h-20 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-2xl flex items-center justify-center text-xl font-bold text-slate-950 mx-auto shadow-md transition-transform duration-300 hover:scale-110">
                  {e.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                
                <div className="mt-3.5">
                  <h3 className="text-sm font-bold text-white tracking-tight">{e.name}</h3>
                  <p className="text-[11px] text-sky-400 font-mono mt-0.5">{e.domain}</p>
                </div>
                
                <p className="text-[11px] text-muted-foreground leading-relaxed mt-3 px-1 text-center">
                  {e.bio}
                </p>
              </div>

              {/* Middle Stats Grid */}
              <div>
                <div className="grid grid-cols-2 gap-2 text-[10px] text-muted-foreground bg-white/[0.01] border border-white/5 rounded-xl p-2.5 my-1">
                  <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400 shrink-0" /> {e.rating} rating</span>
                  <span className="flex items-center gap-1 font-mono text-emerald-400 font-semibold shrink-0"><TrendingUp className="h-3 w-3 shrink-0" /> {e.rate}% success</span>
                  <span className="truncate flex items-center gap-1"><Clock className="h-3 w-3 shrink-0" /> {e.exp.split(" · ")[0]} exp</span>
                  <span className="truncate flex items-center gap-1"><IndianRupee className="h-3 w-3 shrink-0" /> {e.budget}</span>
                </div>
                
                {/* Social Share Link Container */}
                <div className="flex justify-center gap-4 mt-3">
                  <a href="#" className="text-muted-foreground hover:text-sky-400 transition-colors"><Github className="h-4.5 w-4.5" /></a>
                  <a href="#" className="text-muted-foreground hover:text-sky-400 transition-colors"><Twitter className="h-4.5 w-4.5" /></a>
                  <a href="#" className="text-muted-foreground hover:text-sky-400 transition-colors"><Linkedin className="h-4.5 w-4.5" /></a>
                </div>
              </div>

              {/* Bottom Button Action */}
              <Button size="sm" asChild className="bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 font-bold hover:opacity-90 rounded-full cursor-pointer py-1.5 transition-all w-full mt-2">
                <Link to="/app/experts/discovery_sessions">Book Discovery</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}



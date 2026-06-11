import { createFileRoute, Link } from "@tanstack/react-router";
import { Page, Card } from "@/components/app/Page";
import { Button } from "@/components/ui/button";
import { Star, Globe, Clock, IndianRupee, TrendingUp, Calendar } from "lucide-react";

export const Route = createFileRoute("/app/experts")({
  head: () => ({ meta: [{ title: "Expert Matching — Professional Home" }] }),
  component: Experts,
});

const experts = [
  { name: "Priya Raghavan", domain: "Product Management", exp: "9 yrs · ex-Razorpay", lang: "EN, HI", avail: "This week", budget: "₹1,800/hr", rate: 96, rating: 4.9 },
  { name: "Dr. Aman Verma", domain: "ML Research", exp: "12 yrs · IIT-B PhD", lang: "EN", avail: "Next week", budget: "₹2,400/hr", rate: 94, rating: 4.9 },
  { name: "Neha Kulkarni", domain: "Startup & Fundraising", exp: "7 yrs · 2 exits", lang: "EN, MR", avail: "This week", budget: "₹2,000/hr", rate: 92, rating: 4.8 },
  { name: "Rohan Iyer", domain: "SDE Placements", exp: "6 yrs · ex-Google", lang: "EN, HI", avail: "Tomorrow", budget: "₹1,500/hr", rate: 90, rating: 4.8 },
  { name: "Sara Khan", domain: "Biotech & Patents", exp: "10 yrs · Pfizer", lang: "EN", avail: "Next week", budget: "₹2,200/hr", rate: 89, rating: 4.7 },
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

      <div className="grid gap-4">
        {experts.map((e) => (
          <Card key={e.name} className="grid items-center gap-4 p-5 md:grid-cols-[auto_1fr_auto]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 text-sm font-bold text-slate-950">
                {e.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{e.name}</p>
                <p className="text-xs text-muted-foreground truncate">{e.domain}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground sm:grid-cols-5">
              <Meta icon={TrendingUp} v={`${e.rate}% success`} />
              <Meta icon={Clock} v={e.exp} />
              <Meta icon={Globe} v={e.lang} />
              <Meta icon={Calendar} v={e.avail} />
              <Meta icon={IndianRupee} v={e.budget} />
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="flex items-center gap-1 text-xs text-amber-400">
                <Star className="h-3.5 w-3.5 fill-current text-current" /> {e.rating}
              </div>
              <Button size="sm" asChild className="bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 font-bold hover:opacity-90 cursor-pointer">
                <Link to="/app/discovery">Book Discovery</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Page>
  );
}

function Meta({ icon: Icon, v }: { icon: any; v: string }) {
  return (
    <span className="flex items-center gap-1.5 truncate">
      <Icon className="h-3.5 w-3.5 text-sky-400 shrink-0" />
      {v}
    </span>
  );
}


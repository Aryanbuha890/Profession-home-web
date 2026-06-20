import { motion } from "framer-motion";
import { DollarSign, Calendar, TrendingUp, Award } from "lucide-react";
import { Page, Card, Pill } from "@/components/app/Page";
import { grants } from "../mockData";
import { AnimatedNumber, FadeIn, SectionLabel, ShimmerBar } from "../shared";
import { PageHero, SpotlightCard } from "../premium";

const statusTone = {
  awarded: "success" as const,
  active: "success" as const,
  pending: "warn" as const,
  draft: "default" as const,
};

export function ResearchGrantsPage() {
  const totalAwarded = grants.filter((g) => g.status === "awarded").length;
  const totalPending = grants.filter((g) => g.status === "pending" || g.status === "active").length;

  return (
    <Page title="Grant Command Center" subtitle="Track funding opportunities, deadlines, and proposal progress.">
      <PageHero
        badge="Funding Pipeline · €2.7M+"
        title="Grant Intelligence Hub"
        subtitle="Track ERC, NIH, Horizon Europe, and NSF proposals. Monitor deadlines, award status, and proposal completion in real-time."
      />
      <FadeIn>
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          {[
            { icon: DollarSign, label: "Total Pipeline", value: "€2.7M+", sub: "Across 4 agencies" },
            { icon: Award, label: "Awards Secured", value: totalAwarded, sub: "Horizon Europe active" },
            { icon: TrendingUp, label: "In Progress", value: totalPending, sub: "Proposals drafting" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-5 flex items-center gap-4 relative overflow-hidden group hover:border-violet-500/20 transition">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-violet-500/5 rounded-full blur-2xl group-hover:bg-violet-500/10 transition" />
                <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20">
                  <s.icon className="h-5 w-5 text-violet-400" />
                </div>
                <div>
                  <div className="text-xl font-black text-white">
                    {typeof s.value === "number" ? <AnimatedNumber value={s.value} /> : s.value}
                  </div>
                  <div className="text-[10px] font-mono text-muted-foreground uppercase">{s.label}</div>
                  <div className="text-[9px] text-violet-400 mt-0.5">{s.sub}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </FadeIn>

      <SectionLabel>Active Grant Portfolio</SectionLabel>
      <div className="grid gap-4 mt-4">
        {grants.map((g, i) => (
          <motion.div
            key={g.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.08 }}
          >
            <Card className="p-5 hover:border-violet-500/20 transition-all duration-300 group">
              <div className="flex flex-wrap gap-4 justify-between items-start">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Pill tone={statusTone[g.status]}>{g.status}</Pill>
                    <span className="text-[9px] font-mono text-muted-foreground">{g.agency}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-2 group-hover:text-violet-300 transition">{g.title}</h4>
                  <div className="flex items-center gap-4 mt-2 text-[10px] font-mono text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <DollarSign size={10} className="text-emerald-400" />
                      <span className="text-emerald-400 font-bold">{g.amount}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={10} />
                      Deadline: {g.deadline}
                    </span>
                  </div>
                </div>
                <div className="w-full sm:w-48">
                  <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-1">
                    <span>Proposal Progress</span>
                    <span>{g.progress}%</span>
                  </div>
                  <ShimmerBar
                    value={g.progress}
                    color={g.status === "awarded" ? "from-emerald-400 to-teal-500" : "from-violet-400 to-indigo-500"}
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Page>
  );
}

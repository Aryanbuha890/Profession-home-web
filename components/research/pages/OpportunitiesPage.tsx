import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Building2,
  MapPin,
  Clock,
  IndianRupee,
  X,
  ChevronRight,
  Bookmark,
  ExternalLink,
} from "lucide-react";
import { Page } from "@/components/app/Page";
import { opportunities } from "../researchStudentMock";
import { FadeIn } from "../shared";
import { PageHero, SpotlightCard, MagneticButton } from "../premium";
import { StudentAmbient, SectionTabs } from "../studentUi";
import { FaIcon } from "../FaIcon";

const tabConfig = [
  { id: "internships", label: "Internships", icon: "briefcase" },
  { id: "research", label: "Research", icon: "microscope" },
  { id: "hackathons", label: "Hackathons", icon: "laptop" },
  { id: "competitions", label: "Competitions", icon: "trophy" },
  { id: "conferences", label: "Conferences", icon: "users" },
] as const;

type TabId = (typeof tabConfig)[number]["id"];
type Opportunity = (typeof opportunities.internships)[number];

export function ResearchOpportunitiesPage() {
  const [tab, setTab] = useState<TabId>("internships");
  const [selected, setSelected] = useState<Opportunity | null>(null);
  const items = opportunities[tab];
  const activeTab = tabConfig.find((t) => t.id === tab)!;

  return (
    <Page title="Opportunities Hub" subtitle="Internships, research calls, hackathons, competitions, conferences">
      <div className="relative">
        <StudentAmbient />

        <PageHero
          badge="Opportunities Hub · Curated for You"
          title="Discover Your Next Opportunity"
          subtitle="Explore curated opportunities — click any card to see full details, requirements, and skills needed."
        />

        {/* Radial tab selector */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {tabConfig.map((t) => (
              <motion.button
                key={t.id}
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { setTab(t.id); setSelected(null); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-bold font-mono uppercase tracking-wider cursor-pointer border transition-all ${
                  tab === t.id
                    ? "border-violet-500/40 bg-violet-500/15 text-violet-300 shadow-[0_0_20px_rgba(139,92,246,0.15)]"
                    : "border-white/10 bg-white/[0.02] text-muted-foreground hover:text-white hover:border-white/20"
                }`}
              >
                <FaIcon name={t.icon} className="text-xs" />
                {t.label}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {!selected ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((item, i) => (
                    <FadeIn key={item.id} delay={i * 0.05}>
                      <motion.button
                        type="button"
                        whileHover={{ y: -6, scale: 1.01 }}
                        onClick={() => setSelected(item)}
                        className="w-full text-left cursor-pointer border-none rounded-2xl p-0"
                      >
                        <SpotlightCard className="p-5 h-full group">
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-[8px] font-mono px-2 py-0.5 rounded-full border border-violet-500/30 text-violet-400 bg-violet-500/10 uppercase">
                              {item.type}
                            </span>
                            <Bookmark className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <h4 className="text-sm font-bold text-white mt-3 group-hover:text-violet-300 transition-colors">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-2 text-[10px] text-muted-foreground font-mono">
                            <Building2 className="h-3 w-3" />
                            {item.org}
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2 text-[9px] font-mono">
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Calendar className="h-3 w-3 text-violet-400" />{item.deadline}
                            </span>
                            <span className="flex items-center gap-1 text-emerald-400">
                              <IndianRupee className="h-3 w-3" />{item.stipend}
                            </span>
                          </div>
                          <div className="mt-4 flex items-center gap-1 text-[9px] font-mono text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            View details <ChevronRight className="h-3 w-3" />
                          </div>
                        </SpotlightCard>
                      </motion.button>
                    </FadeIn>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="max-w-2xl mx-auto"
                >
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="flex items-center gap-2 mb-4 text-[11px] font-mono text-violet-400 hover:text-violet-300 cursor-pointer bg-transparent border-none"
                  >
                    <ChevronRight className="h-4 w-4 rotate-180" /> Back to {activeTab.label}
                  </button>

                  <SpotlightCard className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[8px] font-mono px-2 py-0.5 rounded-full border border-violet-500/30 text-violet-400 bg-violet-500/10 uppercase">
                          {selected.type}
                        </span>
                        <h2 className="text-xl font-black text-white mt-2">{selected.title}</h2>
                        <p className="text-[11px] text-muted-foreground font-mono mt-1">{selected.org}</p>
                      </div>
                      <button type="button" onClick={() => setSelected(null)} className="p-2 rounded-lg bg-white/5 border border-white/10 cursor-pointer">
                        <X className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>

                    <p className="text-sm text-white/70 mt-4 leading-relaxed">{selected.description}</p>

                    <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { icon: Calendar, label: "Deadline", value: selected.deadline },
                        { icon: MapPin, label: "Location", value: selected.location },
                        { icon: Clock, label: "Duration", value: selected.duration },
                        { icon: IndianRupee, label: "Stipend", value: selected.stipend },
                      ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="p-3 rounded-xl border border-white/5 bg-white/[0.02] text-center">
                          <Icon className="h-3.5 w-3.5 text-violet-400 mx-auto mb-1" />
                          <div className="text-[8px] font-mono text-muted-foreground uppercase">{label}</div>
                          <div className="text-[10px] font-bold text-white mt-0.5">{value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5">
                      <h4 className="text-[10px] font-bold text-white uppercase font-mono mb-2">Requirements</h4>
                      <ul className="space-y-1">
                        {selected.requirements.map((r) => (
                          <li key={r} className="text-[11px] text-muted-foreground flex items-center gap-2">
                            <ChevronRight className="h-3 w-3 text-violet-400 shrink-0" /> {r}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-[10px] font-bold text-white uppercase font-mono mb-2">Skills Needed</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selected.skills.map((s) => (
                          <span key={s} className="text-[9px] font-mono px-2 py-1 rounded-lg bg-violet-500/10 text-violet-300 border border-violet-500/20">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <MagneticButton className="flex-1 py-3 rounded-xl bg-violet-500/20 border border-violet-500/30 text-violet-300 text-[11px] font-bold uppercase flex items-center justify-center gap-2">
                        <ExternalLink className="h-3.5 w-3.5" /> Apply Now
                      </MagneticButton>
                      <button type="button" className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-[11px] font-bold text-white cursor-pointer flex items-center gap-2">
                        <Bookmark className="h-3.5 w-3.5" /> Save
                      </button>
                    </div>
                  </SpotlightCard>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Page>
  );
}

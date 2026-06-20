import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  X,
  ChevronRight,
  Ticket,
  IndianRupee,
} from "lucide-react";
import { Page } from "@/components/app/Page";
import { eventCategories } from "../researchStudentMock";
import { FadeIn } from "../shared";
import { PageHero, SpotlightCard } from "../premium";
import { StudentAmbient, SectionTabs } from "../studentUi";
import { FaIcon } from "../FaIcon";

const tabs = [
  { id: "conferences", label: "Conferences", icon: "users" },
  { id: "competitions", label: "Competitions", icon: "trophy" },
  { id: "workshops", label: "Workshops", icon: "flaskvial" },
  { id: "internships", label: "Internship Events", icon: "briefcase" },
] as const;

type EventTab = (typeof tabs)[number]["id"];
type EventItem = (typeof eventCategories.conferences)[number];

const colorMap: Record<string, string> = {
  Conference: "#a78bfa",
  Competition: "#f472b6",
  Workshop: "#38bdf8",
  Orientation: "#34d399",
  "Open Day": "#fbbf24",
};

export function ResearchEventsPage() {
  const [tab, setTab] = useState<EventTab>("conferences");
  const [selected, setSelected] = useState<EventItem | null>(null);
  const events = eventCategories[tab];

  return (
    <Page title="Events" subtitle="Conferences, competitions, workshops, internship events">
      <div className="relative">
        <StudentAmbient />

        <PageHero
          badge="Events Calendar · Research Student"
          title="Research Events & Deadlines"
          subtitle="Conferences, research competitions, hands-on workshops, and internship orientation events."
        />

        <SectionTabs
          tabs={tabs.map((t) => ({ id: t.id, label: t.label }))}
          active={tab}
          onChange={(id) => { setTab(id as EventTab); setSelected(null); }}
        />

        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.div
              key={tab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {events.map((event, i) => (
                <FadeIn key={event.title} delay={i * 0.08}>
                  <motion.button
                    type="button"
                    whileHover={{ x: 4 }}
                    onClick={() => setSelected(event)}
                    className="w-full text-left cursor-pointer border-none rounded-2xl p-0"
                  >
                    <SpotlightCard className="p-0 overflow-hidden">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-48 h-36 sm:h-auto overflow-hidden relative shrink-0">
                          <img
                            src={event.image}
                            alt=""
                            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-950/80 sm:bg-gradient-to-l" />
                        </div>
                        <div className="flex-1 p-5 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span
                                className="text-[8px] font-mono px-2 py-0.5 rounded-full border uppercase"
                                style={{
                                  color: colorMap[event.type] ?? "#a78bfa",
                                  borderColor: `${colorMap[event.type] ?? "#a78bfa"}40`,
                                  background: `${colorMap[event.type] ?? "#a78bfa"}15`,
                                }}
                              >
                                {event.type}
                              </span>
                              {event.speakers > 0 && (
                                <span className="text-[9px] font-mono text-muted-foreground flex items-center gap-1">
                                  <Users className="h-3 w-3" />{event.speakers} speakers
                                </span>
                              )}
                            </div>
                            <h4 className="text-base font-bold text-white">{event.title}</h4>
                            <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">{event.description}</p>
                          </div>
                          <div className="mt-3 flex flex-wrap items-center gap-4 text-[10px] font-mono text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="h-3 w-3 text-violet-400" />{event.date}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <MapPin className="h-3 w-3 text-violet-400" />{event.location}
                            </span>
                            <span className="flex items-center gap-1.5 text-emerald-400 ml-auto">
                              <ChevronRight className="h-3 w-3" /> Details
                            </span>
                          </div>
                        </div>
                      </div>
                    </SpotlightCard>
                  </motion.button>
                </FadeIn>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="flex items-center gap-2 mb-4 text-[11px] font-mono text-violet-400 hover:text-violet-300 cursor-pointer bg-transparent border-none"
              >
                <ChevronRight className="h-4 w-4 rotate-180" /> Back to events
              </button>

              <SpotlightCard className="p-0 overflow-hidden">
                <div className="relative h-48">
                  <img src={selected.image} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="absolute top-4 right-4 p-2 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 cursor-pointer"
                  >
                    <X className="h-4 w-4 text-white" />
                  </button>
                  <div className="absolute bottom-4 left-6 right-6">
                    <span
                      className="text-[8px] font-mono px-2 py-0.5 rounded-full border uppercase"
                      style={{
                        color: colorMap[selected.type] ?? "#a78bfa",
                        borderColor: `${colorMap[selected.type] ?? "#a78bfa"}40`,
                        background: `${colorMap[selected.type] ?? "#a78bfa"}20`,
                      }}
                    >
                      {selected.type}
                    </span>
                    <h2 className="text-2xl font-black text-white mt-2">{selected.title}</h2>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm text-white/70 leading-relaxed">{selected.description}</p>

                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { icon: Calendar, label: "Date", value: selected.date },
                      { icon: MapPin, label: "Location", value: selected.location },
                      { icon: Users, label: "Capacity", value: selected.attendees },
                      { icon: IndianRupee, label: "Fee", value: selected.registrationFee },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="p-3 rounded-xl border border-white/5 bg-white/[0.02]">
                        <Icon className="h-3.5 w-3.5 text-violet-400 mb-1" />
                        <div className="text-[8px] font-mono text-muted-foreground uppercase">{label}</div>
                        <div className="text-[10px] font-bold text-white mt-0.5">{value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5">
                    <h4 className="text-[10px] font-bold text-white uppercase font-mono mb-2 flex items-center gap-1">
                      <FaIcon name="star" className="text-[10px] text-amber-400" /> Highlights
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selected.highlights.map((h) => (
                        <span key={h} className="text-[9px] font-mono px-2.5 py-1 rounded-lg bg-violet-500/10 text-violet-300 border border-violet-500/20">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 w-full py-3 rounded-xl bg-violet-500/20 border border-violet-500/30 text-violet-300 text-[11px] font-bold font-mono uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Ticket className="h-4 w-4" />
                    Register Interest
                    <Clock className="h-3 w-3 opacity-60" />
                  </motion.button>
                </div>
              </SpotlightCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Page>
  );
}

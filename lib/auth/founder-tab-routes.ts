export const FOUNDER_ROUTE_TABS: Record<string, string> = {
  home: "home",
  arena: "startup_arena",
  assessment: "startup_assessment",
  roadmap: "startup_roadmap",
  tasks: "tasks",
  ai: "home",
  mentors: "mentors",
  investors: "investors",
  funding: "funding",
  pitch_decks: "pitch_decks",
  docs: "docs",
  documents: "docs",
  team: "tasks",
  customers: "customers",
  analytics: "home",
  achievements: "achievements",
  vault: "achievements",
  rewards: "rewards",
  community: "home",
};

export function getFounderTabForPath(segment: string): string {
  return FOUNDER_ROUTE_TABS[segment] ?? "home";
}

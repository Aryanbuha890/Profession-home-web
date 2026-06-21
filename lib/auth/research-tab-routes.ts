export const RESEARCH_ROUTE_TABS: Record<string, string> = {
  home: "home",
  career_arena: "research_arena",
  research_arena: "research_arena",
  research_projects: "research_projects",
  opportunities: "research_projects",
  achievements: "achievements",
  events: "home",
};

export function getResearchTabForPath(segment: string): string {
  return RESEARCH_ROUTE_TABS[segment] ?? "home";
}

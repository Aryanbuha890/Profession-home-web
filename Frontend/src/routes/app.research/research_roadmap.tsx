import { createFileRoute } from "@tanstack/react-router";
import { ResearchRoadmapPage } from "@/components/research";

export const Route = createFileRoute("/app/research/research_roadmap")({
  head: () => ({ meta: [{ title: "Research Roadmap — Professional Home" }] }),
  component: ResearchRoadmapPage,
});

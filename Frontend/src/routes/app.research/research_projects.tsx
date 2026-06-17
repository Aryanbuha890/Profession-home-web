import { createFileRoute } from "@tanstack/react-router";
import { ResearchProjectsPage } from "@/components/research";

export const Route = createFileRoute("/app/research/research_projects")({
  head: () => ({ meta: [{ title: "Research Projects — Professional Home" }] }),
  component: ResearchProjectsPage,
});

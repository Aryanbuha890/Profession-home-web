import { createFileRoute } from "@tanstack/react-router";
import { ResearchTasksPage } from "@/components/research";

export const Route = createFileRoute("/app/research/research_tasks")({
  head: () => ({ meta: [{ title: "Research Tasks — Professional Home" }] }),
  component: ResearchTasksPage,
});

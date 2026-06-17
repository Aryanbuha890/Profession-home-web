import { createFileRoute } from "@tanstack/react-router";
import { ResearchArenaPage } from "@/components/research";

export const Route = createFileRoute("/app/research/research_arena")({
  head: () => ({ meta: [{ title: "Research Arena — Professional Home" }] }),
  component: ResearchArenaPage,
});

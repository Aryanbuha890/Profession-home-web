import { createFileRoute } from "@tanstack/react-router";
import { ResearchCareerArenaPage } from "@/components/research";

export const Route = createFileRoute("/app/research/career_arena")({
  head: () => ({ meta: [{ title: "Career Arena — Research Student" }] }),
  component: ResearchCareerArenaPage,
});

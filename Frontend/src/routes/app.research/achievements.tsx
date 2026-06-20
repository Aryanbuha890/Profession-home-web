import { createFileRoute } from "@tanstack/react-router";
import { ResearchAchievementsPage } from "@/components/research";

export const Route = createFileRoute("/app/research/achievements")({
  head: () => ({ meta: [{ title: "Achievement Vault — Professional Home" }] }),
  component: ResearchAchievementsPage,
});

import { createFileRoute } from "@tanstack/react-router";
import { ResearchCommunityPage } from "@/components/research";

export const Route = createFileRoute("/app/research/community")({
  head: () => ({ meta: [{ title: "Research Community — Professional Home" }] }),
  component: ResearchCommunityPage,
});

import { createFileRoute } from "@tanstack/react-router";
import { ResearchPatentsPage } from "@/components/research";

export const Route = createFileRoute("/app/research/patents")({
  head: () => ({ meta: [{ title: "Patents — Professional Home" }] }),
  component: ResearchPatentsPage,
});

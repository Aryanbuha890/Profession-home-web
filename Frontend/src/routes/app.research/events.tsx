import { createFileRoute } from "@tanstack/react-router";
import { ResearchEventsPage } from "@/components/research";

export const Route = createFileRoute("/app/research/events")({
  head: () => ({ meta: [{ title: "Research Events — Professional Home" }] }),
  component: ResearchEventsPage,
});

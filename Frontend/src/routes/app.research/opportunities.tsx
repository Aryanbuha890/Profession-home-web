import { createFileRoute } from "@tanstack/react-router";
import { ResearchOpportunitiesPage } from "@/components/research";

export const Route = createFileRoute("/app/research/opportunities")({
  head: () => ({ meta: [{ title: "Opportunities Hub — Research Student" }] }),
  component: ResearchOpportunitiesPage,
});

import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { HowItWorks, Footer } from "@/components/landing/Sections";

export const Route = createFileRoute("/how")({
  head: () => ({
    meta: [
      { title: "How it works — Professional Home" },
      {
        name: "description",
        content:
          "Five steps from ambition to measurable outcome: assessment, matching, roadmap, execution, achievement.",
      },
      { property: "og:title", content: "How Professional Home works" },
      {
        property: "og:description",
        content: "Assessment → Matching → Roadmap → Execution → Outcome.",
      },
    ],
  }),
  component: () => (
    <div className="min-h-screen bg-background">
      <Nav />
      <div className="pt-28" />
      <HowItWorks />
      <Footer />
    </div>
  ),
});

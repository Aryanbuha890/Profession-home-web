import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Features, Stories, Footer } from "@/components/landing/Sections";

export const Route = createFileRoute("/platform")({
  head: () => ({
    meta: [
      { title: "Platform — Professional Home" },
      {
        name: "description",
        content:
          "Ten integrated systems: assessment, experts, roadmaps, execution, research, startup, career, funding, copilot, analytics.",
      },
      { property: "og:title", content: "Professional Home Platform" },
      {
        property: "og:description",
        content: "Ten systems. One operating model for professional growth.",
      },
    ],
  }),
  component: () => (
    <div className="min-h-screen bg-background">
      <Nav />
      <div className="pt-28" />
      <Features />
      <Stories />
      <Footer />
    </div>
  ),
});

import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Pricing, Footer } from "@/components/landing/Sections";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Professional Home" },
      {
        name: "description",
        content:
          "Plans for students, researchers, founders, and enterprises. Start free and scale to enterprise.",
      },
      { property: "og:title", content: "Professional Home Pricing" },
      {
        property: "og:description",
        content: "Plans for every stage of growth — Student, Research, Startup, Enterprise.",
      },
    ],
  }),
  component: () => (
    <div className="min-h-screen bg-background">
      <Nav />
      <div className="pt-28" />
      <Pricing />
      <Footer />
    </div>
  ),
});

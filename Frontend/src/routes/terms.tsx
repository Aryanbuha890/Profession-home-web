import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Sections";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Professional Home" },
      {
        name: "description",
        content: "Read the rules, terms, and guidelines for using the Professional Home ecosystem.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen bg-[#05060F] text-foreground">
      <Nav />
      <div className="pt-32 pb-20 mx-auto max-w-4xl px-6">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-[0.22em] text-[#0EA5E9]">Terms</div>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-muted-foreground text-sm">Last updated: June 10, 2026</p>
        </div>

        <div className="prose prose-invert max-w-none text-white/75 space-y-8 text-sm sm:text-base leading-relaxed">
          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Professional Home website, platforms, and API systems, you agree to comply with and be bound by these Terms of Service. If you do not agree, you must immediately terminate use of our services.
            </p>
          </section>

          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">2. Account Registration and Use</h2>
            <p>
              You must provide accurate, current, and complete information during registration. You are responsible for safeguarding your credentials and for all actions taken under your account. Access to academic command systems is strictly personal.
            </p>
          </section>

          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">3. Vetted Expert and Mentor Connections</h2>
            <p>
              Our platform matches users with expert mentors, advisors, and investors. Professional Home does not employ these mentors; they act as independent entities. Users must conduct their own professional diligence during collaborative projects.
            </p>
          </section>

          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">4. Intellectual Property</h2>
            <p>
              You retain ownership of any research drafts, startup presentations, or software outputs you submit or store on the platform. Professional Home does not claim ownership over your research or patent concepts.
            </p>
          </section>

          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">5. Limitation of Liability</h2>
            <p>
              In no event shall Professional Home Pvt Ltd be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access or inability to access our innovation tools.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

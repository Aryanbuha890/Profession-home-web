import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Sections";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Professional Home" },
      {
        name: "description",
        content: "Learn how we protect and manage your personal data and institutional privacy.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#05060F] text-foreground">
      <Nav />
      <div className="pt-32 pb-20 mx-auto max-w-4xl px-6">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-[0.22em] text-[#8B5CF6]">Legal</div>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-muted-foreground text-sm">Last updated: June 10, 2026</p>
        </div>

        <div className="prose prose-invert max-w-none text-white/75 space-y-8 text-sm sm:text-base leading-relaxed">
          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when you create an account, build your academic profile, utilize our AI assessment tools, or communicate with mentors on our platform. This includes names, emails, academic files, projects, and assessment results.
            </p>
          </section>

          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">2. How We Use Your Information</h2>
            <p>
              Your personal information is used to power the personalized features of Professional Home, including:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Generating your innovation roadmap and AI-guided suggestions.</li>
              <li>Matching you with vetted expert mentors, advisors, and startup opportunities.</li>
              <li>Measuring outcome analytics to evaluate program and milestone successes.</li>
            </ul>
          </section>

          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">3. Data Sharing and Disclosure</h2>
            <p>
              We do not sell your personal data. We only share information with third parties (like institutions or mentors) with your explicit consent or under strict institutional agreements where data is scoped for outcome tracking.
            </p>
          </section>

          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">4. Security of Your Data</h2>
            <p>
              We implement industry-standard administrative, technical, and physical safeguards (including SOC 2 and ISO 27001-aligned controls) to protect your data against unauthorized access, loss, or alteration.
            </p>
          </section>

          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">5. Your Rights and Choices</h2>
            <p>
              You have the right to access, edit, or delete your account data at any time directly through your user dashboard settings. For custom data deletion requests, you can contact our privacy officer.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

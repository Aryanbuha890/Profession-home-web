import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Sections";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Professional Home" },
      {
        name: "description",
        content: "Understand how and why we use cookies on the Professional Home platform.",
      },
    ],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <div className="min-h-screen bg-[#05060F] text-foreground">
      <Nav />
      <div className="pt-32 pb-20 mx-auto max-w-4xl px-6">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-[0.22em] text-[#EC4899]">Preferences</div>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Cookie Preferences
          </h1>
          <p className="mt-4 text-muted-foreground text-sm">Last updated: June 10, 2026</p>
        </div>

        <div className="prose prose-invert max-w-none text-white/75 space-y-8 text-sm sm:text-base leading-relaxed">
          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your computer or browser when you visit our website. They help us remember your authentication session, save your dashboard preferences, and provide analytics on user engagement.
            </p>
          </section>

          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">How We Use Cookies</h2>
            <p>
              We classify our cookies into the following categories:
            </p>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between items-start gap-4 border-b border-white/5 pb-3">
                <div>
                  <h3 className="font-semibold text-white">Essential Cookies (Always Active)</h3>
                  <p className="text-xs text-white/60 mt-1">Required for secure authentication, billing status tracking, and general platform functionality.</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-white/10 text-white font-medium">Required</span>
              </div>
              <div className="flex justify-between items-start gap-4 border-b border-white/5 pb-3">
                <div>
                  <h3 className="font-semibold text-white">Preference Cookies</h3>
                  <p className="text-xs text-white/60 mt-1">Remember your visual layouts (like dashboard panel widths or sorting selections).</p>
                </div>
                <button className="text-xs px-3 py-1 rounded bg-violet-600 hover:bg-violet-700 text-white font-medium transition-colors">
                  Enabled
                </button>
              </div>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-semibold text-white">Analytics and Performance</h3>
                  <p className="text-xs text-white/60 mt-1">Help us understand how cohorts navigate through assessments, to optimize velocity and page load speeds.</p>
                </div>
                <button className="text-xs px-3 py-1 rounded bg-violet-600 hover:bg-violet-700 text-white font-medium transition-colors">
                  Enabled
                </button>
              </div>
            </div>
          </section>

          <section className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">Managing Your Cookies</h2>
            <p>
              You can control or reset your cookie preferences at any time directly through your web browser settings. Please note that disabling essential cookies will prevent the login/signup and portal dashboards from functioning correctly.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div 
      className="flex min-h-screen items-center justify-center bg-[#05060F] px-4 relative overflow-hidden"
      style={{
        background: "radial-gradient(1000px 500px at 50% 30%, rgba(124,58,237,0.18), transparent 60%), #05060F",
      }}
    >
      {/* Background Grids */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      
      {/* Clipped Card with Gradient Border */}
      <div 
        className="p-[1.5px] bg-gradient-to-r from-sky-400 via-sky-200 to-white shadow-2xl"
        style={{
          clipPath: "polygon(30px 0%, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0% 30px)",
          borderTopRightRadius: "20px",
          borderBottomLeftRadius: "20px",
          width: "100%",
          maxWidth: "28rem"
        }}
      >
        <div 
          className="w-full bg-[#0c0d1c] p-8 text-center flex flex-col items-center justify-center"
          style={{
            clipPath: "polygon(29px 0%, 100% 0, 100% calc(100% - 29px), calc(100% - 29px) 100%, 0 100%, 0% 29px)",
            borderTopRightRadius: "19px",
            borderBottomLeftRadius: "19px",
            backgroundImage: "radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.06) 0%, transparent 60%), repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.01) 0px, rgba(255, 255, 255, 0.01) 1px, transparent 1px, transparent 12px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.01) 0px, rgba(255, 255, 255, 0.01) 1px, transparent 1px, transparent 12px)"
          }}
        >
          <div className="w-16 h-16 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-6">
            <span className="font-mono text-2xl font-bold">404</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white font-display">Page Not Found</h1>
          <p className="mt-3 text-xs text-muted-foreground leading-relaxed max-w-sm">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="mt-8 w-full flex justify-center">
            <Link
              to="/"
              className="inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 font-bold px-6 text-xs hover:opacity-90 shadow-md transition-all cursor-pointer"
            >
              Go home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div 
      className="flex min-h-screen items-center justify-center bg-[#05060F] px-4 relative overflow-hidden"
      style={{
        background: "radial-gradient(1000px 500px at 50% 30%, rgba(124,58,237,0.18), transparent 60%), #05060F",
      }}
    >
      {/* Background Grids */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      
      {/* Clipped Card with Gradient Border */}
      <div 
        className="p-[1.5px] bg-gradient-to-r from-sky-400 via-sky-200 to-white shadow-2xl"
        style={{
          clipPath: "polygon(30px 0%, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0% 30px)",
          borderTopRightRadius: "20px",
          borderBottomLeftRadius: "20px",
          width: "100%",
          maxWidth: "28rem"
        }}
      >
        <div 
          className="w-full bg-[#0c0d1c] p-8 text-center flex flex-col items-center justify-center"
          style={{
            clipPath: "polygon(29px 0%, 100% 0, 100% calc(100% - 29px), calc(100% - 29px) 100%, 0 100%, 0% 29px)",
            borderTopRightRadius: "19px",
            borderBottomLeftRadius: "19px",
            backgroundImage: "radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.06) 0%, transparent 60%), repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.01) 0px, rgba(255, 255, 255, 0.01) 1px, transparent 1px, transparent 12px), repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.01) 0px, rgba(255, 255, 255, 0.01) 1px, transparent 1px, transparent 12px)"
          }}
        >
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center mb-6">
            <span className="font-mono text-2xl font-bold">!</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white font-display">System Interrupt</h1>
          <p className="mt-3 text-xs text-muted-foreground leading-relaxed max-w-sm">
            Something went wrong on our end. You can try reloading or head back home.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5 w-full">
            <button
              onClick={() => {
                router.invalidate();
                reset();
              }}
              className="inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 text-slate-950 font-bold px-6 text-xs hover:opacity-90 shadow-md transition-all cursor-pointer"
            >
              Try again
            </button>
            <a
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] text-white/90 font-semibold px-6 text-xs transition-all cursor-pointer"
            >
              Go home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Professional Home — The OS for Professional Growth" },
      {
        name: "description",
        content:
          "AI-powered assessments, expert guidance, execution systems, and measurable outcomes for students, researchers, founders, and innovators.",
      },
      { property: "og:title", content: "Professional Home — The OS for Professional Growth" },
      {
        property: "og:description",
        content:
          "AI-powered assessments, expert guidance, execution systems, and measurable outcomes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Geist:wght@500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}

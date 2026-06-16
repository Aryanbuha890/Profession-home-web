import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode, useState } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  const [hoveredCells, setHoveredCells] = useState<Record<string, boolean>>({});

  // 6 columns x 4 rows config mapping to Warhol artwork fragments
  // true = visible image slice, false = empty/black space (discoverable on hover)
  const gridConfig = [
    [true, false, true, true, true, true],
    [true, false, true, false, true, true],
    [true, true, true, false, true, true],
    [false, false, true, true, true, false]
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#020205] text-white px-4 relative overflow-hidden py-12">
      {/* Background warm reddish glow aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-orange-600/10 blur-[80px] sm:blur-[120px] pointer-events-none select-none" />

      {/* Header section with gradient lines and orange stars */}
      <div className="w-full flex items-center justify-between px-4 sm:px-6 max-w-5xl mb-6 z-10">
        <div className="flex-1 h-[1px] bg-gradient-to-r from-orange-600 via-orange-600/25 to-transparent relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 text-orange-500 scale-90">
            <svg className="w-4 h-4 fill-current animate-pulse" viewBox="0 0 24 24">
              <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
            </svg>
          </div>
        </div>
        <h1 className="font-mango text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.1em] text-white px-4 sm:px-8 select-none flex items-center justify-center gap-1.5 sm:gap-3 leading-none">
          <span>PAGE</span>
          <span className="text-orange-500 font-extrabold">(404)</span>
          <span>ERROR</span>
        </h1>
        <div className="flex-1 h-[1px] bg-gradient-to-l from-orange-600 via-orange-600/25 to-transparent relative">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-orange-500 scale-90">
            <svg className="w-4 h-4 fill-current animate-pulse" viewBox="0 0 24 24">
              <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Subtitle text */}
      <p className="text-xs sm:text-sm text-neutral-400 font-sans tracking-wide max-w-md text-center mb-8 px-4 z-10 leading-relaxed">
        Don't worry, this page just decided to become part of Andy's art.
      </p>

      {/* Sliced Warhol Grid puzzle */}
      <div className="grid grid-cols-6 gap-2 sm:gap-2.5 p-3 sm:p-4 rounded-2xl bg-neutral-950/80 border border-neutral-900 shadow-3xl z-10 mb-8 max-w-md w-full aspect-[3/2]">
        {gridConfig.flatMap((row, rIdx) =>
          row.map((isVisible, cIdx) => {
            const cellKey = `${rIdx}-${cIdx}`;
            const isHovered = hoveredCells[cellKey];
            const showImage = isVisible || isHovered;

            return (
              <div
                key={cellKey}
                onMouseEnter={() => setHoveredCells(prev => ({ ...prev, [cellKey]: true }))}
                className="relative aspect-square w-full rounded bg-[#0b0c10] border border-neutral-900/60 overflow-hidden cursor-crosshair transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_15px_rgba(249,115,22,0.35)]"
                style={{
                  backgroundImage: showImage ? "url('/andy_warhol_404.png')" : "none",
                  backgroundSize: "600% 400%",
                  backgroundPosition: `${(cIdx / 5) * 100}% ${(rIdx / 3) * 100}%`,
                  opacity: showImage ? 1 : 0.05,
                  transition: "opacity 0.6s ease-out, transform 0.2s ease-out, box-shadow 0.2s ease-out",
                }}
              >
                {/* Glowing borders on discovered tiles */}
                {isHovered && !isVisible && (
                  <div className="absolute inset-0 border border-orange-500/40 animate-pulse pointer-events-none" />
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Quote / Prompt */}
      <p className="text-[11px] sm:text-xs text-neutral-500 font-sans tracking-widest uppercase mb-4 select-none">
        Shall we start over?
      </p>

      {/* Bottom star line */}
      <div className="w-full flex items-center justify-between px-6 max-w-2xl mb-8 z-10 opacity-70">
        <div className="flex-1 h-[1px] bg-gradient-to-r from-orange-600/50 via-orange-600/10 to-transparent relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 text-orange-500 scale-75">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
            </svg>
          </div>
        </div>
        <div className="flex-1 h-[1px] bg-gradient-to-l from-orange-600/50 via-orange-600/10 to-transparent relative">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-orange-500 scale-75">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Retro stacked GO BACK button */}
      <div className="relative group inline-block z-10 cursor-pointer">
        {/* Bottom layer (Orange background acting as a thick retro offset shadow) */}
        <div className="absolute inset-0 bg-orange-700 translate-x-1.5 translate-y-1.5 transition-transform duration-200 group-hover:translate-x-1 group-hover:translate-y-1 rounded-sm" />
        
        {/* Top interactive layer */}
        <Link
          to="/"
          className="relative bg-orange-500 hover:bg-orange-400 text-black font-mango font-bold text-xl sm:text-2xl px-10 py-2.5 uppercase border border-orange-600 block transition-all active:translate-x-0.5 active:translate-y-0.5 rounded-sm select-none tracking-wide text-center cursor-pointer"
        >
          Go Back
        </Link>
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

  const [hoveredCells, setHoveredCells] = useState<Record<string, boolean>>({});

  const gridConfig = [
    [true, false, true, true, true, true],
    [true, false, true, false, true, true],
    [true, true, true, false, true, true],
    [false, false, true, true, true, false]
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#020205] text-white px-4 relative overflow-hidden py-12">
      {/* Background warm reddish glow aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-red-600/10 blur-[80px] sm:blur-[120px] pointer-events-none select-none" />

      {/* Header section with gradient lines and red/orange stars */}
      <div className="w-full flex items-center justify-between px-4 sm:px-6 max-w-5xl mb-6 z-10">
        <div className="flex-1 h-[1px] bg-gradient-to-r from-red-600 via-red-600/25 to-transparent relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 text-red-500 scale-90">
            <svg className="w-4 h-4 fill-current animate-pulse" viewBox="0 0 24 24">
              <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
            </svg>
          </div>
        </div>
        <h1 className="font-mango text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.1em] text-white px-4 sm:px-8 select-none flex items-center justify-center gap-1.5 sm:gap-3 leading-none">
          <span>SYSTEM</span>
          <span className="text-red-500 font-extrabold">(ERROR)</span>
          <span>INTERRUPT</span>
        </h1>
        <div className="flex-1 h-[1px] bg-gradient-to-l from-red-600 via-red-600/25 to-transparent relative">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-red-500 scale-90">
            <svg className="w-4 h-4 fill-current animate-pulse" viewBox="0 0 24 24">
              <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Subtitle text */}
      <p className="text-xs sm:text-sm text-neutral-400 font-sans tracking-wide max-w-md text-center mb-8 px-4 z-10 leading-relaxed">
        Something went wrong on our end. You can try reloading or head back home.
      </p>

      {/* Sliced Warhol Grid puzzle */}
      <div className="grid grid-cols-6 gap-2 sm:gap-2.5 p-3 sm:p-4 rounded-2xl bg-neutral-950/80 border border-neutral-900 shadow-3xl z-10 mb-8 max-w-md w-full aspect-[3/2]">
        {gridConfig.flatMap((row, rIdx) =>
          row.map((isVisible, cIdx) => {
            const cellKey = `${rIdx}-${cIdx}`;
            const isHovered = hoveredCells[cellKey];
            const showImage = isVisible || isHovered;

            return (
              <div
                key={cellKey}
                onMouseEnter={() => setHoveredCells(prev => ({ ...prev, [cellKey]: true }))}
                className="relative aspect-square w-full rounded bg-[#0b0c10] border border-neutral-900/60 overflow-hidden cursor-crosshair transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_15px_rgba(239,68,68,0.35)]"
                style={{
                  backgroundImage: showImage ? "url('/andy_warhol_404.png')" : "none",
                  backgroundSize: "600% 400%",
                  backgroundPosition: `${(cIdx / 5) * 100}% ${(rIdx / 3) * 100}%`,
                  opacity: showImage ? 1 : 0.05,
                  transition: "opacity 0.6s ease-out, transform 0.2s ease-out, box-shadow 0.2s ease-out",
                }}
              >
                {/* Glowing borders on discovered tiles */}
                {isHovered && !isVisible && (
                  <div className="absolute inset-0 border border-red-500/40 animate-pulse pointer-events-none" />
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Quote / Prompt */}
      <p className="text-[11px] sm:text-xs text-neutral-500 font-sans tracking-widest uppercase mb-4 select-none">
        Shall we start over?
      </p>

      {/* Bottom star line */}
      <div className="w-full flex items-center justify-between px-6 max-w-2xl mb-8 z-10 opacity-70">
        <div className="flex-1 h-[1px] bg-gradient-to-r from-red-600/50 via-red-600/10 to-transparent relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 text-red-500 scale-75">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
            </svg>
          </div>
        </div>
        <div className="flex-1 h-[1px] bg-gradient-to-l from-red-600/50 via-red-600/10 to-transparent relative">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-red-500 scale-75">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Stacked Button layout for actions */}
      <div className="flex flex-wrap items-center justify-center gap-6 z-10">
        <div className="relative group inline-block cursor-pointer">
          <div className="absolute inset-0 bg-red-700 translate-x-1.5 translate-y-1.5 transition-transform duration-200 group-hover:translate-x-1 group-hover:translate-y-1 rounded-sm" />
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="relative bg-red-500 hover:bg-red-400 text-black font-mango font-bold text-xl sm:text-2xl px-8 py-2.5 uppercase border border-red-600 block transition-all active:translate-x-0.5 active:translate-y-0.5 rounded-sm select-none tracking-wide text-center cursor-pointer"
          >
            Try Again
          </button>
        </div>

        <div className="relative group inline-block cursor-pointer">
          <div className="absolute inset-0 bg-neutral-800 translate-x-1.5 translate-y-1.5 transition-transform duration-200 group-hover:translate-x-1 group-hover:translate-y-1 rounded-sm" />
          <Link
            to="/"
            className="relative bg-neutral-700 hover:bg-neutral-600 text-white font-mango font-bold text-xl sm:text-2xl px-8 py-2.5 uppercase border border-neutral-800 block transition-all active:translate-x-0.5 active:translate-y-0.5 rounded-sm select-none tracking-wide text-center cursor-pointer"
          >
            Go Home
          </Link>
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
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Geist:wght@500;600;700;800&family=Big+Shoulders+Stencil+Display:wght@800;900&family=Instrument+Serif:ital@0;1&family=DM+Serif+Display:ital@0;1&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://db.onlinewebfonts.com/c/bb5de19d87c09a95216dc6ccd96e37c6?family=Nimbus+Sans+TW01",
      },
      {
        rel: "stylesheet",
        href: "https://db.onlinewebfonts.com/c/0d7c90bf2d5c8dcc4fa27a5ba6cbad81?family=Mango+Grotesque",
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

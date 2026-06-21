import './globals.css';
import { ReactNode } from "react";

export const metadata = {
  title: "Professional Home — The OS for Professional Growth",
  description: "AI-powered assessments, expert guidance, execution systems, and measurable outcomes for students, researchers, founders, and innovators.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Geist:wght@500;600;700;800&family=Big+Shoulders+Stencil+Display:wght@800;900&family=Instrument+Serif:ital@0;1&family=DM+Serif+Display:ital@0;1&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://db.onlinewebfonts.com/c/bb5de19d87c09a95216dc6ccd96e37c6?family=Nimbus+Sans+TW01"
        />
        <link
          rel="stylesheet"
          href="https://db.onlinewebfonts.com/c/0d7c90bf2d5c8dcc4fa27a5ba6cbad81?family=Mango+Grotesque"
        />
      </head>
      <body className="min-h-screen bg-[#05060F] text-foreground antialiased selection:bg-violet-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}

import { useEffect, useState } from "react";

const SECTION_IDS = [
  "profile-strength",
  "profile-about",
  "profile-skills",
  "profile-info",
  "profile-socials",
  "profile-activity",
];

interface ProfileScrollSpineProps {
  ringColor: string;
}

function getScrollContainer(page: Element): HTMLElement | null {
  return page.closest("main") as HTMLElement | null;
}

export function ProfileScrollSpine({ ringColor }: ProfileScrollSpineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const page = document.querySelector(".profile-page");
    if (!page) return;

    const scrollContainer = getScrollContainer(page);
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const onScroll = () => {
      if (scrollContainer) {
        const max = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        setProgress(max > 0 ? Math.min(1, scrollContainer.scrollTop / max) : 0);

        const mid = scrollContainer.getBoundingClientRect().top + scrollContainer.clientHeight * 0.42;
        let current = 0;
        sections.forEach((section, idx) => {
          if (section.getBoundingClientRect().top <= mid) current = idx;
        });
        setActiveIndex(current);
      }
    };

    onScroll();
    const target = scrollContainer ?? window;
    target.addEventListener("scroll", onScroll, { passive: true });
    return () => target.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="profile-scroll-spine pointer-events-none absolute -left-14 top-0 hidden h-full w-8 xl:block">
      <div className="sticky top-32 flex h-[calc(100vh-10rem)] flex-col items-center">
        <div
          className="relative h-full w-px overflow-hidden rounded-full"
          style={{ background: `${ringColor}18` }}
        >
          <div
            className="profile-spine-fill absolute inset-x-0 top-0 w-full origin-top rounded-full transition-[height] duration-150 ease-out"
            style={{
              height: `${Math.max(8, progress * 100)}%`,
              background: `linear-gradient(180deg, ${ringColor}, ${ringColor}40)`,
              boxShadow: `0 0 12px ${ringColor}60`,
            }}
          />
        </div>

        <div className="absolute inset-y-0 flex flex-col justify-between py-2">
          {SECTION_IDS.map((id, idx) => (
            <span
              key={id}
              className="profile-spine-dot relative flex h-2.5 w-2.5 items-center justify-center rounded-full transition-all duration-500"
              style={{
                background: idx <= activeIndex ? ringColor : `${ringColor}25`,
                boxShadow: idx === activeIndex ? `0 0 16px ${ringColor}, 0 0 4px ${ringColor}` : "none",
                transform: idx === activeIndex ? "scale(1.35)" : "scale(1)",
              }}
            >
              {idx === activeIndex && (
                <span
                  className="absolute inset-0 animate-ping rounded-full opacity-40"
                  style={{ background: ringColor }}
                />
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

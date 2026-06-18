import { useEffect } from "react";
import { motion, useSpring } from "framer-motion";

export function ProfileMouseAura({ color }: { color: string }) {
  const springX = useSpring(0, { stiffness: 60, damping: 20 });
  const springY = useSpring(0, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const page = document.querySelector(".profile-page");
      if (!page) return;
      const rect = page.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        return;
      }
      springX.set(e.clientX - rect.left);
      springY.set(e.clientY - rect.top);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [springX, springY]);

  return (
    <motion.div
      className="profile-mouse-aura pointer-events-none absolute -z-[1] h-[480px] w-[480px] rounded-full blur-[100px]"
      style={{
        left: springX,
        top: springY,
        x: "-50%",
        y: "-50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity: 0.22,
      }}
    />
  );
}

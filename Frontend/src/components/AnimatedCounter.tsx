import { useEffect, useRef } from "react";
import { animate } from "framer-motion";

export function AnimatedCounter({
  value,
  decimals = 0,
  suffix = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const controls = animate(0, value, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate(val) {
        node.textContent =
          val.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }) + suffix;
      },
    });

    return () => controls.stop();
  }, [value, decimals, suffix]);

  return <span ref={ref}>0</span>;
}

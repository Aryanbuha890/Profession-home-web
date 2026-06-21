import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ScrollReveal({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  
  // Track scroll progress relative to this text block
  // Starts revealing when the element enters from the bottom (85% of screen)
  // Finishes revealing when it reaches the upper portion of the viewport (25% of screen)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.25"],
  });

  const words = children.split(" ");

  return (
    <span ref={ref} className={`${className} inline flex-wrap`}>
      {words.map((word, idx) => {
        const start = idx / words.length;
        const end = (idx + 1.5) / words.length;
        
        // Map local scroll progress to opacity between 0.15 and 1
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
        
        return (
          <motion.span
            key={idx}
            style={{ opacity }}
            className="inline-block mr-[0.25em]"
          >
            {word}
          </motion.span>
        );
      })}
    </span>
  );
}

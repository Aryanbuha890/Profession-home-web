export const STAGGER = 0.08;

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay },
});

export const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.92 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export const slideRight = (delay = 0) => ({
  initial: { opacity: 0, x: -16 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.4, delay, ease: "easeOut" as const },
});

export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: STAGGER, delayChildren: 0.1 },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,oklch(0.65_0.22_295/0.35),transparent)] blur-2xl animate-float" />
      <div
        className="absolute top-20 right-[-10rem] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,oklch(0.78_0.18_240/0.30),transparent)] blur-2xl animate-float"
        style={{ animationDelay: "-3s" }}
      />
      <div
        className="absolute bottom-[-20rem] left-1/3 h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(closest-side,oklch(0.55_0.20_280/0.30),transparent)] blur-2xl animate-float"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0 / 0.05) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      <Particles />
    </div>
  );
}

function Particles() {
  const dots = Array.from({ length: 36 });
  return (
    <div className="absolute inset-0">
      {dots.map((_, i) => {
        const top = (i * 53) % 100;
        const left = (i * 37) % 100;
        const delay = (i % 9) * 0.7;
        const size = (i % 3) + 1.5;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-foreground/40 animate-pulse-glow"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: size,
              height: size,
              animationDelay: `${delay}s`,
              boxShadow: "0 0 8px currentColor",
            }}
          />
        );
      })}
    </div>
  );
}

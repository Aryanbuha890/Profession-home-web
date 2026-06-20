import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Planet {
  name: string;
  r: number;
  speed: number;
  color: string;
  desc: string;
}

const planets: Planet[] = [
  { name: "Idea Planet", r: 45, speed: 0.005, color: "#38bdf8", desc: "Formulate core thesis & hypothesis" },
  { name: "Literature Planet", r: 75, speed: 0.003, color: "#818cf8", desc: "Systematic reviews of academic articles" },
  { name: "Experiment Planet", r: 105, speed: 0.002, color: "#a78bfa", desc: "Execute lab models, gather datasets" },
  { name: "Publication Planet", r: 135, speed: 0.0015, color: "#f472b6", desc: "LaTeX writing, abstract reviews, peer checks" },
  { name: "Patent Planet", r: 165, speed: 0.001, color: "#fb7185", desc: "IP searches, validation, filings sequence" },
  { name: "Innovation Planet", r: 195, speed: 0.0008, color: "#34d399", desc: "Direct commercialization & spin-offs" },
];

export function ResearchGalaxyCanvas({ filter = "" }: { filter?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState<Planet | null>(null);
  const angleRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 500;
      canvas.height = 380;
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Nebula background
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 200);
      grad.addColorStop(0, "rgba(139, 92, 246, 0.08)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Sun
      ctx.beginPath();
      ctx.arc(cx, cy, 20, 0, Math.PI * 2);
      const sunGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 20);
      sunGrad.addColorStop(0, "#ffffff");
      sunGrad.addColorStop(1, "#a78bfa");
      ctx.fillStyle = sunGrad;
      ctx.shadowColor = "#a78bfa";
      ctx.shadowBlur = 25;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.font = "9px monospace";
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.textAlign = "center";
      ctx.fillText("RESEARCH CORE", cx, cy + 4);

      angleRef.current += 0.4;
      const angle = angleRef.current;

      planets.forEach((p, idx) => {
        const matchesFilter =
          !filter.trim() || p.name.toLowerCase().includes(filter.toLowerCase());
        const dimmed = filter.trim() && !matchesFilter;

        ctx.beginPath();
        ctx.arc(cx, cy, p.r, 0, Math.PI * 2);
        ctx.strokeStyle = dimmed ? "rgba(255,255,255,0.01)" : "rgba(255,255,255,0.04)";
        ctx.stroke();

        const theta = angle * p.speed + idx * 5;
        const px = cx + Math.cos(theta) * p.r;
        const py = cy + Math.sin(theta) * p.r;

        ctx.beginPath();
        ctx.arc(px, py, dimmed ? 4 : 7, 0, Math.PI * 2);
        ctx.fillStyle = dimmed ? "rgba(255,255,255,0.15)" : p.color;
        if (!dimmed) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 14;
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        if (!dimmed) {
          ctx.font = "8px monospace";
          ctx.fillStyle = "rgba(255,255,255,0.75)";
          ctx.textAlign = "left";
          ctx.fillText(p.name, px + 12, py + 3);
        }
      });

      animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [filter]);

  return (
    <div className="relative border border-white/5 bg-slate-950/40 p-4 rounded-2xl flex flex-col justify-center items-center overflow-hidden min-h-[420px]">
      <div className="absolute top-3 left-4 text-xs font-mono text-violet-400 font-semibold uppercase tracking-wider z-10">
        Research Galaxy Simulation
      </div>
      <canvas ref={canvasRef} className="w-full cursor-crosshair" />
      <div className="flex flex-wrap gap-2 mt-3 justify-center">
        {planets.map((p) => (
          <button
            key={p.name}
            type="button"
            onMouseEnter={() => setHovered(p)}
            onMouseLeave={() => setHovered(null)}
            className="text-[9px] font-mono px-2 py-1 rounded-lg border border-white/5 bg-white/[0.02] text-muted-foreground hover:border-violet-400/30 hover:text-white transition cursor-pointer"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5" style={{ background: p.color }} />
            {p.name.replace(" Planet", "")}
          </button>
        ))}
      </div>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute bottom-4 left-4 right-4 p-3 rounded-xl border border-violet-400/20 bg-slate-950/90 backdrop-blur-md text-left"
          >
            <div className="text-xs font-bold text-white">{hovered.name}</div>
            <div className="text-[10px] text-muted-foreground mt-0.5">{hovered.desc}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

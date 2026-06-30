import { useEffect, useRef } from "react";

interface P {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  hue: number;
}

export function Fireworks({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<P[]>([]);
  const rafRef = useRef<number>(0);
  const lastBurstRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.clientWidth * devicePixelRatio;
      canvas.height = canvas.clientHeight * devicePixelRatio;
    };
    resize();
    window.addEventListener("resize", resize);

    const burst = () => {
      const cx = Math.random() * canvas.width;
      const cy = Math.random() * canvas.height * 0.55;
      const hue = [38, 18, 320, 50][Math.floor(Math.random() * 4)];
      const count = 50;
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2;
        const sp = (Math.random() * 2 + 2) * devicePixelRatio;
        particlesRef.current.push({
          x: cx,
          y: cy,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          life: 0,
          max: 70 + Math.random() * 40,
          hue,
        });
      }
    };

    const tick = () => {
      ctx.fillStyle = "rgba(0,0,0,0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (active && performance.now() - lastBurstRef.current > 700 + Math.random() * 600) {
        burst();
        lastBurstRef.current = performance.now();
      }

      const parts = particlesRef.current;
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03 * devicePixelRatio;
        p.vx *= 0.99;
        p.vy *= 0.99;
        const alpha = 1 - p.life / p.max;
        if (alpha <= 0) {
          parts.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8 * devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(0.85 0.18 ${p.hue} / ${alpha})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `oklch(0.85 0.18 ${p.hue} / ${alpha})`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 size-full opacity-80"
      aria-hidden
    />
  );
}

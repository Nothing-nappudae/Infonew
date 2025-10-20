import { useEffect, useRef } from "react";

export default function Starfield({ count = 250 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const c = canvasRef.current;
    const ctx = c.getContext("2d", { alpha: true });
    let w = (c.width = window.innerWidth);
    let h = (c.height = window.innerHeight);
    const stars = [];
    const max = prefersReduced
      ? Math.floor(count * 0.35)
      : coarse
      ? Math.floor(count * 0.6)
      : count;

    const rand = (min, max) => Math.random() * (max - min) + min;

    for (let i = 0; i < max; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(0.4, 1.6),
        a: rand(0.35, 0.9), // base alpha
        av: rand(-0.015, 0.015), // alpha velocity (twinkle)
        s: rand(0.02, 0.06), // slow drift speed
      });
    }

    let shooting = null; // {x,y,vx,vy,life}
    let rafId;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // subtle space gradient
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#03040a");
      g.addColorStop(1, "#0a0b15");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // stars
      ctx.fillStyle = "#ffffff";
      for (const s of stars) {
        s.a += s.av;
        if (s.a < 0.15 || s.a > 1) s.av *= -1;
        s.y += s.s;
        if (s.y > h) s.y = 0; // slow vertical drift

        ctx.globalAlpha = s.a;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // shooting star (rare)
      if (!prefersReduced && Math.random() < 0.003 && !shooting) {
        const startX = rand(0, w * 0.6);
        const startY = rand(0, h * 0.3);
        const speed = rand(8, 14);
        const angle = rand(Math.PI * 0.1, Math.PI * 0.25);
        shooting = {
          x: startX,
          y: startY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0.9,
        };
      }
      if (shooting) {
        const len = 120;
        const tx = shooting.x - shooting.vx * 2;
        const ty = shooting.y - shooting.vy * 2;
        const grad = ctx.createLinearGradient(shooting.x, shooting.y, tx, ty);
        grad.addColorStop(0, "rgba(255,255,255,0.9)");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(shooting.x, shooting.y);
        ctx.lineTo(
          shooting.x - shooting.vx * (len / 10),
          shooting.y - shooting.vy * (len / 10)
        );
        ctx.stroke();

        shooting.x += shooting.vx;
        shooting.y += shooting.vy;
        shooting.life -= 0.02;
        if (shooting.life <= 0 || shooting.x > w + 50 || shooting.y > h + 50)
          shooting = null;
      }

      rafId = requestAnimationFrame(draw);
    };

    const onResize = () => {
      w = c.width = window.innerWidth;
      h = c.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-50 pointer-events-none"
    />
  );
}

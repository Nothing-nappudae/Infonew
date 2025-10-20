// src/components/CursorGlow.jsx
import { useEffect, useState } from "react";

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  useEffect(() => {
    const fine = matchMedia("(pointer:fine)").matches;
    if (!fine) return;
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return (
    <div
      className="pointer-events-none fixed -z-40 hidden md:block"
      style={{
        left: pos.x - 160,
        top: pos.y - 160,
        width: 320,
        height: 320,
        borderRadius: "50%",
        background:
          "radial-gradient(50% 50% at 50% 50%, rgba(255,140,64,0.20) 0%, rgba(255,140,64,0.08) 40%, rgba(255,140,64,0) 70%)",
        filter: "blur(20px)",
        mixBlendMode: "screen",
        transition: "transform 80ms linear",
        transform: `translateZ(0)`,
      }}
      aria-hidden="true"
    />
  );
}

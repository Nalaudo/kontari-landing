import { useEffect, useRef } from "react";

/** Soft radial glow that eases toward the cursor (desktop only). */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = ref.current;
    if (!glow) return;

    let gx = window.innerWidth / 2;
    let gy = 200;
    let cx = gx;
    let cy = gy;
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      gx = e.clientX;
      gy = e.clientY;
    };

    const loop = () => {
      cx += (gx - cx) * 0.12;
      cy += (gy - cy) * 0.12;
      glow.style.transform = `translate(${cx - 240}px, ${cy - 240}px)`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    frame = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} id="cursor-glow" className="hidden md:block" />;
}

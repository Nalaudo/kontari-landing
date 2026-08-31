import { useEffect, useRef } from "react";

/**
 * Custom pointer for desktop: a soft radial glow that eases toward the cursor,
 * plus a small solid dot that tracks it tightly. The native cursor is hidden
 * via CSS (`cursor: none`) on fine pointers.
 */
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    const dot = dotRef.current;
    if (!glow || !dot) return;

    let gx = window.innerWidth / 2;
    let gy = 200;
    let cx = gx;
    let cy = gy;
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      gx = e.clientX;
      gy = e.clientY;
      // The dot is the cursor now: follow with no lag.
      dot.style.transform = `translate(${gx}px, ${gy}px)`;
    };

    const setVisible = (visible: boolean) => {
      const value = visible ? "1" : "0";
      glow.style.opacity = value;
      dot.style.opacity = value;
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const loop = () => {
      cx += (gx - cx) * 0.12;
      cy += (gy - cy) * 0.12;
      glow.style.transform = `translate(${cx - 240}px, ${cy - 240}px)`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    frame = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} id="cursor-glow" className="hidden md:block" />
      <div ref={dotRef} id="cursor-dot" className="hidden md:block" />
    </>
  );
}

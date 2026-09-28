import confetti from "canvas-confetti";

/** Little celebratory flourish fired from the center of the clicked element. */
export function burstFrom(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return;
  const r = target.getBoundingClientRect();
  confetti({
    particleCount: 60,
    spread: 65,
    startVelocity: 32,
    origin: {
      x: (r.left + r.width / 2) / window.innerWidth,
      y: (r.top + r.height / 2) / window.innerHeight,
    },
    colors: ["#8190ff", "#3446d0", "#4ade9b", "#eeebe4"],
  });
}

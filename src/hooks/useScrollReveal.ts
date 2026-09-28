import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global scroll animations, ported from the original landing script:
 *  - fade/slide-up for every `.reveal-up` element
 *  - the progress line in the "Cómo funciona" section (`#steps-line`)
 *
 * Runs once after mount, when all sections are in the DOM.
 */
export function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          },
        );
      });

      gsap.to("#steps-line", {
        width: "100%",
        scrollTrigger: {
          trigger: "#steps-line",
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        },
      });
    });

    // The display fonts reflow the page a lot once they arrive; re-measure the
    // trigger positions so nothing stays hidden above a stale start point.
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, []);
}

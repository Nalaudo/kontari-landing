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
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
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

    return () => ctx.revert();
  }, []);
}

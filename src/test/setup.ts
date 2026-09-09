import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// canvas-confetti touches <canvas>, which jsdom does not implement.
vi.mock("canvas-confetti", () => ({ default: vi.fn() }));

// gsap + ScrollTrigger need a real layout engine. The reveal animations are
// purely cosmetic, so replace the library with inert stubs for unit tests.
vi.mock("gsap", () => {
  const chain = () => tween;
  const tween = { kill: chain, revert: chain, play: chain, pause: chain };
  const gsap = {
    registerPlugin: () => {},
    context: (fn: () => void) => {
      fn?.();
      return { revert: () => {}, kill: () => {} };
    },
    to: () => tween,
    from: () => tween,
    fromTo: () => tween,
    set: () => tween,
    utils: { toArray: () => [] as unknown[] },
  };
  return { gsap, default: gsap };
});
vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: { create: () => ({}), refresh: () => {}, getAll: () => [] },
  default: { create: () => ({}), refresh: () => {}, getAll: () => [] },
}));

afterEach(() => cleanup());

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
if (!("IntersectionObserver" in globalThis)) {
  globalThis.IntersectionObserver =
    MockIntersectionObserver as unknown as typeof IntersectionObserver;
}

if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = vi.fn();
}

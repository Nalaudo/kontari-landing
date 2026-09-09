import { describe, it, expect, vi, beforeEach } from "vitest";
import confetti from "canvas-confetti";
import { burstFrom } from "./confetti";

describe("lib/confetti burstFrom", () => {
  beforeEach(() => vi.clearAllMocks());

  it("does nothing when the target is not an HTMLElement", () => {
    burstFrom(null);
    burstFrom({} as EventTarget);
    expect(confetti).not.toHaveBeenCalled();
  });

  it("fires a confetti burst originating from the element centre", () => {
    const el = document.createElement("button");
    document.body.appendChild(el);
    burstFrom(el);
    expect(confetti).toHaveBeenCalledTimes(1);
    const arg = vi.mocked(confetti).mock.calls[0][0] as Record<string, unknown> & {
      origin: { x: number; y: number };
    };
    expect(arg).toMatchObject({ particleCount: 60, spread: 65 });
    expect(arg.origin.x).toBeGreaterThanOrEqual(0);
    expect(arg.origin.y).toBeGreaterThanOrEqual(0);
  });
});

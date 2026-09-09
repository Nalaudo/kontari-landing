import { describe, it, expect, vi, afterEach } from "vitest";
import { act, render, screen } from "@testing-library/react";
import Testimonials from "./Testimonials";

afterEach(() => vi.useRealTimers());

describe("<Testimonials>", () => {
  it("renders the testimonial authors", () => {
    render(<Testimonials />);
    expect(screen.getByText("Marina L.")).toBeInTheDocument();
    expect(screen.getByText("Diego F.")).toBeInTheDocument();
    expect(screen.getByText("Sofía R.")).toBeInTheDocument();
  });

  it("auto-advances the carousel on its interval", () => {
    vi.useFakeTimers();
    const { container } = render(<Testimonials />);
    const track = container.querySelector(".t-track") as HTMLElement;
    expect(track.style.transform).toBe("translateX(-0%)");
    act(() => {
      vi.advanceTimersByTime(5500);
    });
    expect(track.style.transform).toBe("translateX(-100%)");
  });
});

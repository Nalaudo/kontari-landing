import { useCountUp } from "../hooks/useCountUp";

type CounterProps = {
  target: number;
  decimals?: number;
};

/** Animated number that counts up from 0 when scrolled into view. */
export default function Counter({ target, decimals = 0 }: CounterProps) {
  const { ref, text } = useCountUp(target, decimals);
  return <span ref={ref}>{text}</span>;
}

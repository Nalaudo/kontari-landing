import type { AnchorHTMLAttributes, ReactNode } from "react";
import { burstFrom } from "../lib/confetti";

type CtaLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

/** Primary call-to-action link that fires a confetti burst on click. */
export default function CtaLink({ children, onClick, ...props }: CtaLinkProps) {
  return (
    <a
      {...props}
      onClick={(e) => {
        burstFrom(e.currentTarget);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}

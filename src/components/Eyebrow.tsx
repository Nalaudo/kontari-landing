type EyebrowProps = {
  children: string;
  className?: string;
};

/** Section label: a dot and a mono caption, tinted with the section's tone. */
export default function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <p className={`label-mono flex items-center gap-2.5 text-sec ${className}`}>
      <span
        aria-hidden
        className="w-2 h-2 rounded-full bg-sec shadow-[0_0_12px_var(--k-sec)]"
      />
      {children}
    </p>
  );
}

type EyebrowProps = {
  /** Section number shown as "§ 02". Omit for an unnumbered label. */
  n?: string;
  children: string;
  className?: string;
};

/** Section label in the ledger style: "§ 02 ——— FUNCIONALIDADES". */
export default function Eyebrow({ n, children, className = "" }: EyebrowProps) {
  return (
    <p className={`label-mono flex items-center gap-3 text-muted ${className}`}>
      {n && <span className="text-accent">§ {n}</span>}
      {n && <span aria-hidden className="h-px w-10 bg-line-strong" />}
      <span>{children}</span>
    </p>
  );
}

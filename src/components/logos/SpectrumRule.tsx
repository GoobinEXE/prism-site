import { SPECTRUM_ORDER } from "@/lib/brandTokens";

export function SpectrumRule({ className = "" }: { className?: string }) {
  return (
    <span className={`spectrum-rule ${className}`} aria-hidden="true">
      {SPECTRUM_ORDER.map((color) => (
        <span key={color} style={{ background: color }} />
      ))}
    </span>
  );
}

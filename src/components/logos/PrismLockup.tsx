import { PrismMonogram } from "@/components/logos/PrismMonogram";
import { NEUTRAL } from "@/lib/brandTokens";

type PrismLockupProps = {
  className?: string;
};

export function PrismLockup({ className = "" }: PrismLockupProps) {
  return (
    <span className={`brand-lockup ${className}`}>
      <span className="brand-lockup__mark">
        <PrismMonogram glyph={NEUTRAL.graphic} />
      </span>
      <span className="brand-lockup__rule" aria-hidden="true" />
      <span className="brand-lockup__word">Prism</span>
    </span>
  );
}

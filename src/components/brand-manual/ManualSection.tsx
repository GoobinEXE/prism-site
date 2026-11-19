import type { ReactNode } from "react";
import { INK, METAL, NEUTRAL } from "@/lib/brandTokens";

type ManualSectionProps = {
  id: string;
  number: string;
  title: string;
  pdfPage: number;
  totalPages?: number;
  pdfUrl: string;
  footerPrefix: string;
  dark?: boolean;
  className?: string;
  children: ReactNode;
};

export function ManualSection({
  id,
  number,
  title,
  pdfPage,
  totalPages = 9,
  pdfUrl,
  footerPrefix,
  dark = false,
  className = "",
  children,
}: ManualSectionProps) {
  const headingId = `${id}-title`;
  const pageCode = String(pdfPage).padStart(2, "0");
  const totalCode = String(totalPages).padStart(2, "0");

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`bm-page bm-section ${dark ? "bm-page--dark" : "glass-strong"} ${className}`.trim()}
      style={
        dark
          ? {
              background: NEUTRAL.tape,
              color: METAL.highlight,
              boxShadow: "var(--hard-shadow)",
            }
          : undefined
      }
    >
      <header className="bm-page__header flex items-baseline justify-between gap-4">
        <div>
          <span
            className="catalog-code"
            style={{ color: dark ? METAL.transition : NEUTRAL.lead }}
          >
            {number}
          </span>
          <h2 id={headingId} className="title-main mt-1 text-xl font-bold md:text-2xl">
            {title}
          </h2>
        </div>

        <a
          href={`${pdfUrl}#page=${pdfPage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bm-screen-only shrink-0 font-mono text-xs uppercase tracking-[0.08em] hover:underline"
          style={{ color: dark ? INK.darkRoom.cyan : "var(--ink-cyan)" }}
        >
          PDF · p. {pdfPage}
        </a>
      </header>

      <div className="bm-page__body mt-5 flex-1">{children}</div>

      <footer
        className="bm-print-footer"
        style={{ color: dark ? METAL.transition : NEUTRAL.lead }}
      >
        <span>{`${footerPrefix} ${pageCode} / ${totalCode}`}</span>
      </footer>
    </section>
  );
}

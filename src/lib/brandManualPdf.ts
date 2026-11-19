import type { Locale } from "@/lib/i18n/locale";
import { withBase } from "@/lib/site";
import manifest from "@/lib/brandManualPdf.json";

export type BrandManualPdfInfo = {
  pdfUrl: string;
  coverUrl: string;
  pages: number;
  bytes: number;
  metaLabel: string;
};

export function getBrandManualPdf(locale: Locale): BrandManualPdfInfo {
  const entry = manifest[locale];
  const mb = (entry.bytes / 1_000_000).toFixed(1);
  const metaLabel =
    locale === "pt"
      ? `PDF · ${entry.pages} páginas · ${mb.replace(".", ",")} MB`
      : `PDF · ${entry.pages} pages · ${mb} MB`;

  return {
    pdfUrl: withBase(entry.pdf),
    coverUrl: withBase(entry.cover),
    pages: entry.pages,
    bytes: entry.bytes,
    metaLabel,
  };
}

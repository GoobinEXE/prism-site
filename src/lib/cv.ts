import type { Locale } from "@/lib/i18n/locale";
import { withBase } from "@/lib/site";

export const cvFiles = {
  en: {
    pdf: withBase("/cv/marcelo-pessoa-cv.pdf"),
    html: withBase("/cv/marcelo-pessoa-cv.html"),
    fileName: "Marcelo-Pessoa-CV.pdf",
  },
  pt: {
    pdf: withBase("/cv/marcelo-pessoa-curriculo.pdf"),
    html: withBase("/cv/marcelo-pessoa-curriculo.html"),
    fileName: "Marcelo-Pessoa-Curriculo.pdf",
  },
} as const;

export function cvFor(locale: Locale) {
  return cvFiles[locale];
}

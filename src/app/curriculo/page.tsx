import type { Metadata } from "next";
import Image from "next/image";
import { cv } from "@/lib/cv";

export const metadata: Metadata = {
  title: "Currículo",
  description:
    "Currículo de Marcelo Pessoa de Aguiar Lopes: engenharia de software, pesquisa em inteligência artificial e jogos digitais.",
};

export default function CurriculoPage() {
  return (
    <div className="pt-(--header-h)">
      <section className="section" aria-labelledby="curriculo-title">
        <div className="container px-(--margin)">
          <div className="max-w-2xl">
            <h1 id="curriculo-title" className="section-title">
              Currículo
            </h1>
            <p className="section-lead">
              Marcelo Pessoa de Aguiar Lopes · engenharia de software, pesquisa
              em inteligência artificial e jogos digitais.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={cv.pdf}
                download={cv.fileName}
                className="btn btn-primary"
              >
                Baixar PDF
              </a>
              <a
                href={cv.pdf}
                target="_blank"
                rel="noopener"
                className="btn btn-ghost"
              >
                Abrir em nova aba
                <span className="sr-only"> (PDF)</span>
              </a>
            </div>
          </div>

          <div className="glass-strong mt-10 max-w-4xl overflow-hidden rounded-lg p-2 md:p-3">
            <object
              data={`${cv.pdf}#view=FitH&navpanes=0`}
              type="application/pdf"
              aria-label="Currículo em PDF"
              className="hidden aspect-210/297 w-full rounded-md md:block"
            >
              <a href={cv.pdf} className="font-semibold text-cyan underline">
                Abrir o currículo em PDF
              </a>
            </object>

            <a
              href={cv.pdf}
              target="_blank"
              rel="noopener"
              className="block md:hidden"
            >
              <Image
                src={cv.preview}
                alt="Prévia da página do currículo. Toque para abrir o PDF."
                width={989}
                height={1400}
                sizes="(max-width: 768px) 100vw, 0px"
                className="h-auto w-full rounded-md"
                priority
              />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

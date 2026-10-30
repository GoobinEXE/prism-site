import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página não encontrada",
};

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center pt-(--header-h)">
      <section className="section w-full" aria-labelledby="nao-encontrada">
        <div className="container px-(--margin)">
          <div className="glass-strong mx-auto max-w-xl rounded-lg p-6 md:p-10">
            <h1 id="nao-encontrada" className="section-title mt-0">
              Página não encontrada
            </h1>
            <p className="section-lead">
              Essa página não existe ou mudou de lugar.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/" className="btn btn-primary">
                Voltar ao início
              </Link>
              <Link href="/solucoes" className="btn btn-ghost">
                Ver soluções
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

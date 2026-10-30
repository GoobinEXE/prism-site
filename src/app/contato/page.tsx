import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Tem uma ideia ou um projeto? Conta pra gente.",
};

export default function ContatoPage() {
  return (
    <div className="pt-(--header-h)">
      <section className="section" aria-labelledby="contato-title">
        <div className="container px-(--margin)">
          <div className="mx-auto max-w-2xl text-center">
            <h1 id="contato-title" className="section-title">
              Fale com a gente
            </h1>
          </div>

          <div className="glass-strong mx-auto mt-10 max-w-xl rounded-lg p-6 md:p-8">
            <ContactForm />
          </div>

          <p className="mx-auto mt-8 max-w-xl text-sm text-(--text-secondary)">
            Se preferir, escreva para{" "}
            <a
              href="mailto:contato@prism.dev"
              className="font-semibold text-cyan underline underline-offset-2"
            >
              contato@prism.dev
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}

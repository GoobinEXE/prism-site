import type { Metadata } from "next";
import Link from "next/link";
import { RedirectTo } from "./RedirectTo";

const target = "/por-tras-do-prism#curriculo";

export const metadata: Metadata = {
  title: "Currículo",
  robots: { index: false },
};

export default function CurriculoPage() {
  return (
    <div className="pt-(--header-h)">
      <RedirectTo href={target} />
      <section className="section">
        <div className="container px-(--margin)">
          <p className="section-lead">
            O currículo agora fica em{" "}
            <Link href={target} className="font-semibold text-(--ink-cyan) underline">
              Por trás do Prism
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}

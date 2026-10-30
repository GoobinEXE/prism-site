import Link from "next/link";
import { PrismSymbol } from "@/components/logos/PrismSymbol";

export function HeroPrism() {
  return (
    <section
      className="hero-prism relative min-h-dvh overflow-hidden pt-(--header-h)"
      aria-labelledby="hero-title"
    >
      <div className="hero-prism__symbol" aria-hidden="true">
        <PrismSymbol bleed={1800} className="block h-auto w-full" />
      </div>

      <div className="container relative z-1 flex min-h-[calc(100dvh-var(--header-h))] flex-col justify-start px-5 pt-[12dvh] pb-16 md:justify-center md:px-8 md:py-16">
        <div className="relative z-10 max-w-xl">
          <h1
            id="hero-title"
            className="title-main animate-fade-up-delay-1 text-[clamp(2.85rem,9vw,5rem)] font-extrabold leading-[0.92] text-foreground"
          >
            Prism
          </h1>
          <div className="animate-fade-up-delay-2 mt-8 flex flex-wrap gap-3">
            <Link href="/solucoes" className="btn btn-primary">
              Ver o que fazemos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

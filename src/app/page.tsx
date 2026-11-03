"use client";

import Link from "next/link";
import { HeroPrism } from "@/components/HeroPrism";
import { DarkRoomPortal } from "@/components/DarkRoomPortal";
import { ContactForm } from "@/components/ContactForm";
import { SpectrumRule } from "@/components/logos/SpectrumRule";
import { useLocale } from "@/components/LocaleProvider";

export default function HomePage() {
  const { t } = useLocale();

  return (
    <>
      <HeroPrism />

      <section className="section" aria-labelledby="solucoes-title">
        <div className="container px-(--margin)">
          <h2 id="solucoes-title" className="section-title">
            {t.home.whatWeDo}
          </h2>
          <SpectrumRule className="mt-5" />

          <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {t.home.pillars.map((pillar) => (
              <li key={pillar.href} className="h-full">
                <Link
                  href={pillar.href}
                  className="glass-spectrum vhs-label group flex h-full flex-col p-6 pt-8 transition-colors"
                >
                  <h3 className="title-main text-lg leading-tight font-bold text-balance text-foreground group-hover:text-cyan">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-(--text-secondary)">
                    {pillar.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <DarkRoomPortal />

      <section className="section" aria-labelledby="contato-rapido-title">
        <div className="container px-(--margin)">
          <div className="glass-strong mx-auto max-w-xl rounded-lg p-6 md:p-8">
            <h2 id="contato-rapido-title" className="section-title text-2xl md:text-3xl">
              {t.home.getInTouch}
            </h2>
            <div className="mt-6">
              <ContactForm compact />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

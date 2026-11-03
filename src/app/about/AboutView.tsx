"use client";

import Link from "next/link";
import { SpectrumRule } from "@/components/logos/SpectrumRule";
import { useLocale } from "@/components/LocaleProvider";

export function AboutView() {
  const { t } = useLocale();
  const a = t.about;

  return (
    <div className="pt-(--header-h)">
      <section className="section pb-12" aria-labelledby="about-title">
        <div className="container px-(--margin)">
          <h1 id="about-title" className="section-title">
            {a.title}
          </h1>
          <SpectrumRule className="mt-5" />
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="why-prism">
        <div className="container px-(--margin)">
          <article className="glass-spectrum vhs-label max-w-3xl p-6 pt-9 md:p-10 md:pt-12">
            <h2 id="why-prism" className="title-main text-2xl font-bold md:text-3xl">
              {a.why}
            </h2>
            <p className="mt-4 max-w-[54ch] text-base text-(--text-secondary)">
              {a.whyP1}
            </p>
            <p className="mt-4 max-w-[54ch] text-base text-(--text-secondary)">
              {a.whyP2}
            </p>
          </article>
        </div>
      </section>

      <section className="section" aria-labelledby="what-about-dark-room">
        <div className="container px-(--margin)">
          <article className="glass-strong max-w-3xl p-6 md:p-10">
            <h2 id="what-about-dark-room" className="title-main text-2xl font-bold md:text-3xl">
              {a.dark}
            </h2>
            <p className="mt-4 max-w-[54ch] text-base text-(--text-secondary)">
              {a.darkP}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dark-room" className="btn btn-magenta">
                {a.visit}
              </Link>
              <Link href="/work" className="btn btn-ghost">
                {a.seeWork}
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

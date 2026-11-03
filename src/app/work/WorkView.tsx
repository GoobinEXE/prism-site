"use client";

import { CopyTerminal } from "@/components/CopyTerminal";
import { ChamberLink } from "@/components/ChamberLink";
import { ProjectLinks } from "@/components/ProjectLinks";
import { useLocale } from "@/components/LocaleProvider";

export function WorkView() {
  const { t } = useLocale();
  const w = t.work;

  return (
    <div className="pt-(--header-h)">
      <section className="section pb-8" aria-labelledby="work-hero">
        <div className="container px-(--margin)">
          <h1 id="work-hero" className="section-title">
            {w.title}
          </h1>
        </div>
      </section>

      <section
        id="mobile"
        className="section pt-4"
        aria-labelledby="frente-mobile"
      >
        <div className="container px-(--margin)">
          <h2 id="frente-mobile" className="title-main mb-8 text-2xl font-bold md:text-3xl">
            {w.mobile}
          </h2>

          <div className="grid gap-6 lg:grid-cols-2">
            <article className="glass-spectrum rounded-lg p-6 md:p-8">
              <h3 className="font-display text-xl font-bold text-foreground">
                Lumen
              </h3>
              <p className="mt-3 max-w-[54ch] text-sm leading-relaxed text-(--text-secondary)">
                {w.lumenLead}
              </p>
              <ul className="mt-5 space-y-2 text-sm text-(--text-secondary)">
                {w.lumenPoints.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="bullet mt-1.5" />
                    {point}
                  </li>
                ))}
              </ul>
              <ProjectLinks project="lumen" className="mt-6" />
            </article>

            <article className="glass-spectrum rounded-lg p-6 md:p-8">
              <h3 className="font-display text-xl font-bold text-foreground">
                RPGYM
              </h3>
              <p className="mt-3 max-w-[54ch] text-sm leading-relaxed text-(--text-secondary)">
                {w.rpgymLead}
              </p>
              <ul className="mt-5 space-y-2 text-sm text-(--text-secondary)">
                {w.rpgymPoints.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="bullet mt-1.5" />
                    {point}
                  </li>
                ))}
              </ul>
              <ProjectLinks project="rpgym" className="mt-6" />
            </article>
          </div>
        </div>
      </section>

      <section
        id="desktop"
        className="section pt-4"
        aria-labelledby="frente-desktop"
      >
        <div className="container px-(--margin)">
          <h2 id="frente-desktop" className="title-main mb-8 text-2xl font-bold md:text-3xl">
            {w.desktop}
          </h2>

          <article className="glass-spectrum max-w-3xl rounded-lg p-6 md:p-8">
            <h3 className="font-display text-xl font-bold text-foreground">
              Prism Translate
            </h3>
            <p className="mt-3 max-w-[54ch] text-sm leading-relaxed text-(--text-secondary)">
              {w.translateLead}
            </p>
            <div className="mt-6">
              <p className="mb-2 text-xs font-semibold tracking-wide text-(--text-muted) uppercase">
                {w.brew}
              </p>
              <CopyTerminal command="brew tap goobinexe/tap && brew trust --tap goobinexe/tap && brew install --cask prism-translate" />
            </div>
            <ProjectLinks project="prismTranslate" className="mt-6" />
          </article>
        </div>
      </section>

      <section
        id="web"
        className="section pt-4"
        aria-labelledby="frente-web"
      >
        <div className="container px-(--margin)">
          <h2 id="frente-web" className="title-main mb-8 text-2xl font-bold md:text-3xl">
            {w.web}
          </h2>

          <article className="glass-spectrum max-w-3xl rounded-lg p-6 md:p-8">
            <h3 className="font-display text-xl font-bold text-foreground">
              {w.webTitle}
            </h3>
            <p className="mt-3 max-w-[54ch] text-sm leading-relaxed text-(--text-secondary)">
              {w.webLead}
            </p>
            <ul className="mt-5 space-y-2 text-sm text-(--text-secondary)">
              {w.webPoints.map((point) => (
                <li key={point} className="flex gap-2">
                  <span className="bullet mt-1.5" />
                  {point}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section
        id="dark-room"
        className="section pt-4"
        aria-labelledby="frente-dark-room"
      >
        <div className="container px-(--margin)">
          <h2 id="frente-dark-room" className="title-main mb-8 text-2xl font-bold md:text-3xl">
            {w.darkRoom}
          </h2>

          <article className="glass-spectrum max-w-3xl rounded-lg p-6 md:p-8">
            <h3 className="font-display text-xl font-bold text-foreground">
              {w.darkTitle}
            </h3>
            <p className="mt-3 max-w-[54ch] text-sm leading-relaxed text-(--text-secondary)">
              {w.darkLead}
            </p>
            <div className="mt-6">
              <ChamberLink href="/dark-room" className="btn btn-magenta">
                {w.enter}
              </ChamberLink>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

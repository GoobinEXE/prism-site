"use client";

import Link from "next/link";
import { ChamberLink } from "@/components/ChamberLink";
import { SpectrumRule } from "@/components/logos/SpectrumRule";
import { cvFor } from "@/lib/cv";
import { projects } from "@/lib/projects";
import { useLocale } from "@/components/LocaleProvider";

const limboUrl = projects.limboOS.links[0].href;

const sheet = "vhs-label rounded-(--radius-lg) bg-(--glass-elevated) p-6 pt-10 md:p-10 md:pt-12";
const heading = "title-main text-xl font-bold md:text-2xl";
const body = "mt-3 max-w-[60ch] text-base text-(--text-secondary)";
const textLink = "font-semibold text-(--text-primary)! underline! underline-offset-4";

export function BehindPrismView() {
  const { locale, t } = useLocale();
  const b = t.behind;
  const cv = cvFor(locale);

  return (
    <div className="pt-(--header-h)">
      <section className="section" aria-labelledby="who-title">
        <div className="container grid gap-10 px-(--margin) lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <aside className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)] lg:self-start">
            <h1 id="who-title" className="section-title">
              {b.title}
            </h1>
            <SpectrumRule className="mt-5" />
            <p className="section-lead">{b.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={cv.pdf} download={cv.fileName} className="btn btn-primary">
                {b.download}
              </a>
              <a
                href={cv.html}
                target="_blank"
                rel="noopener"
                className="btn bg-(--glass-elevated) text-(--text-primary)"
              >
                {b.print}
                <span className="sr-only">{b.newTab}</span>
              </a>
            </div>
          </aside>

          <div className="space-y-8">
            <article className={sheet}>
              <h2 className={heading}>{b.started}</h2>
              <p className={body}>{b.startedP1}</p>
              <p className={body}>{b.startedP2}</p>

              <h2 className={`${heading} mt-10`}>{b.fromGames}</h2>
              <p className={body}>{b.fromGamesP}</p>

              <h2 className={`${heading} mt-10`}>{b.worked}</h2>
              <p className={body}>{b.workedP1}</p>
              <p className={body}>{b.workedP2}</p>

              <h2 className={`${heading} mt-10`}>{b.brands}</h2>
              <p className={body}>
                {b.brandsP1}{" "}
                <Link href="/work" className={textLink}>
                  {b.brandsP1Link}
                </Link>
              </p>
              <p className={body}>{b.brandsP2}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href={limboUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-magenta"
                >
                  {b.limboCta}
                  <span className="sr-only">{b.newTab}</span>
                </a>
                <ChamberLink href="/dark-room" className={textLink}>
                  {b.enter}
                </ChamberLink>
              </div>

              <h2 className={`${heading} mt-10`}>{b.table}</h2>
              <p className={body}>{b.tableP}</p>

              <h2 className={`${heading} mt-10`}>{b.talk}</h2>
              <p className={body}>
                {b.talkBefore}
                <Link href="/contact" className={textLink}>
                  {b.talkLink}
                </Link>
                {b.talkAfter}
              </p>
            </article>

            <article
              id="cv"
              className={`${sheet} scroll-mt-[calc(var(--header-h)+1.5rem)]`}
              aria-labelledby="cv-title"
            >
              <h2 id="cv-title" className={heading}>
                {b.cvTitle}
              </h2>

              <h3 className="mt-8 font-display text-lg font-bold text-(--text-primary)">
                {b.experience}
              </h3>
              <ul className="mt-4 space-y-5">
                {b.jobs.map((job) => (
                  <li key={job.org}>
                    <p className="text-base font-semibold text-(--text-primary)">
                      {job.org}
                    </p>
                    <ul className="mt-1 space-y-0.5">
                      {job.roles.map((role) => (
                        <li
                          key={role.title}
                          className="text-sm text-(--text-secondary)"
                        >
                          {role.title}, {role.time}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>

              <h3 className="mt-10 font-display text-lg font-bold text-(--text-primary)">
                {b.education}
              </h3>
              <ul className="mt-4 space-y-4">
                {b.schools.map((item) => (
                  <li key={item.title}>
                    <p className="text-base font-semibold text-(--text-primary)">
                      {item.title}
                    </p>
                    <p className="text-sm text-(--text-secondary)">
                      {item.place}
                      {item.href && item.linkLabel && (
                        <>
                          {" · "}
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={textLink}
                          >
                            {item.linkLabel}
                            <span className="sr-only">{b.newTab}</span>
                          </a>
                        </>
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}

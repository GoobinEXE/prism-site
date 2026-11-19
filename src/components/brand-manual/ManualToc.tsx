"use client";

import { useEffect, useState } from "react";

export type ManualTocItem = {
  id: string;
  number: string;
  title: string;
  pdfPage: number;
};

export type ManualTocDownload = {
  locale: "en" | "pt";
  label: string;
  href: string;
  meta?: string;
};

type ManualTocProps = {
  tocLabel: string;
  sections: readonly ManualTocItem[];
  downloadsTitle: string;
  downloads: readonly ManualTocDownload[];
};

export function ManualToc({
  tocLabel,
  sections,
  downloadsTitle,
  downloads,
}: ManualTocProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "cover");

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!elements.length || typeof IntersectionObserver === "undefined") {
      return;
    }

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          } else {
            visible.delete(entry.target.id);
          }
        }
        const firstVisible = sections.find((s) => visible.has(s.id));
        if (firstVisible) {
          setActiveId(firstVisible.id);
        }
      },
      {
        rootMargin: "-18% 0px -64% 0px",
        threshold: 0,
      }
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sections]);

  return (
    <>
      <aside className="bm-toc-rail bm-screen-only hidden lg:block">
        <div className="bm-toc-sticky">
          <nav aria-label={tocLabel} className="bm-toc">
            <ul className="space-y-1">
              {sections.map((section) => {
                const isActive = activeId === section.id;
                return (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      aria-current={isActive ? "location" : undefined}
                      className={`bm-toc__link ${isActive ? "is-active" : ""}`}
                      style={isActive ? { color: "var(--ink-cyan)" } : undefined}
                    >
                      <span className="bm-toc__num">{section.number}</span>
                      <span className="bm-toc__title">{section.title}</span>
                      <span className="bm-toc__page">p. {section.pdfPage}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="bm-toc__downloads mt-5">
            <div className="label-caps text-(--text-muted)">{downloadsTitle}</div>
            <div className="mt-2.5 flex flex-col gap-2">
              {downloads.map((item) => (
                <a
                  key={item.locale}
                  href={item.href}
                  download
                  className="bm-toc__dl"
                >
                  <span className="font-semibold">{item.label}</span>
                  {item.meta ? (
                    <span className="block font-mono text-[10px] text-(--text-muted)">
                      {item.meta}
                    </span>
                  ) : null}
                </a>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <nav
        aria-label={tocLabel}
        className="bm-toc-mobile bm-screen-only lg:hidden"
      >
        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={isActive ? "location" : undefined}
              className={`bm-toc-chip ${isActive ? "is-active" : ""}`}
              style={isActive ? { color: "var(--ink-cyan)" } : undefined}
            >
              <span className="font-mono text-[10px]">{section.number}</span>
              <span>{section.title}</span>
            </a>
          );
        })}
      </nav>
    </>
  );
}

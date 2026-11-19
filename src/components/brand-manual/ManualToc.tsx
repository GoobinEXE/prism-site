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
    <div className="bm-toc-bar bm-screen-only">
      <nav aria-label={tocLabel} className="bm-toc-strip">
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
              <span className="font-mono text-[10px] opacity-70">{section.number}</span>
              <span>{section.title}</span>
              <span className="hidden font-mono text-[10px] opacity-60 xl:inline">
                p.{section.pdfPage}
              </span>
            </a>
          );
        })}
      </nav>

      <div className="bm-toc-actions">
        {downloads.map((item) => (
          <a
            key={item.locale}
            href={item.href}
            download
            className="bm-toc-dl-pill"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}

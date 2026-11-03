"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";

export function NotFoundView() {
  const { t } = useLocale();
  const n = t.notFound;

  return (
    <div className="flex flex-1 items-center pt-(--header-h)">
      <section className="section w-full" aria-labelledby="not-found">
        <div className="container px-(--margin)">
          <div className="glass-strong mx-auto max-w-xl rounded-lg p-6 md:p-10">
            <h1 id="not-found" className="section-title mt-0">
              {n.title}
            </h1>
            <p className="section-lead">{n.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/" className="btn btn-primary">
                {n.home}
              </Link>
              <Link href="/work" className="btn btn-ghost">
                {n.work}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

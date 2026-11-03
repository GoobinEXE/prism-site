"use client";

import { ContactForm } from "@/components/ContactForm";
import { useLocale } from "@/components/LocaleProvider";

export function ContactView() {
  const { t } = useLocale();

  return (
    <div className="pt-(--header-h)">
      <section className="section" aria-labelledby="contact-title">
        <div className="container px-(--margin)">
          <div className="mx-auto max-w-2xl text-center">
            <h1 id="contact-title" className="section-title">
              {t.contact.title}
            </h1>
          </div>

          <div className="glass-strong mx-auto mt-10 max-w-xl rounded-lg p-6 md:p-8">
            <ContactForm />
          </div>

          <p className="mx-auto mt-8 max-w-xl text-sm text-(--text-secondary)">
            {t.contact.writeTo}{" "}
            <a
              href="mailto:marcelop.smile@gmail.com"
              className="font-semibold text-cyan underline underline-offset-2"
            >
              marcelop.smile@gmail.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}

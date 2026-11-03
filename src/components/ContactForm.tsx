"use client";

import { FormEvent, useState } from "react";
import { INTEREST_KEYS } from "@/lib/i18n/messages";
import {
  CONTACT_MAILTO,
  contactMailto,
  validateContact,
  type ContactState,
} from "@/lib/contact";
import { useLocale } from "@/components/LocaleProvider";

type ContactFormProps = {
  compact?: boolean;
};

type FieldErrors = Partial<Record<string, string>>;

export function ContactForm({ compact = false }: ContactFormProps) {
  const { t } = useLocale();
  const copy = t.contactForm;
  const [state, setState] = useState<ContactState>({ status: "idle" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);
  const messageField = compact ? "mensagem" : "especificacoes";

  function messageFor(
    field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  ) {
    const { validity } = field;
    if (validity.valueMissing) {
      if (field instanceof HTMLSelectElement) return copy.missingTopic;
      if (field.name === "email") return copy.missingEmail;
      if (field.name === "nome") return copy.missingName;
      return copy.missingMessage;
    }
    if (validity.typeMismatch) return copy.invalidEmail;
    return field.validationMessage;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const next: FieldErrors = {};
    let first: HTMLElement | null = null;

    for (const element of Array.from(form.elements)) {
      if (
        !(element instanceof HTMLInputElement) &&
        !(element instanceof HTMLSelectElement) &&
        !(element instanceof HTMLTextAreaElement)
      ) {
        continue;
      }
      if (!element.name || element.checkValidity()) continue;
      next[element.name] = messageFor(element);
      first ??= element;
    }

    setErrors(next);
    if (first) {
      first.focus();
      return;
    }

    setPending(true);
    const data = new FormData(form);
    const result = validateContact(data, copy);
    if (!("ok" in result)) {
      setState(result);
      if (result.fieldErrors) setErrors(result.fieldErrors);
      setPending(false);
      return;
    }

    if (result.payload) {
      window.location.href = contactMailto(result.payload, copy);
    }
    setState({ status: "sent" });
    setPending(false);
  }

  function clearError(name: string) {
    if (!errors[name]) return;
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function fieldProps(name: string) {
    const error = errors[name];
    return {
      id: name,
      name,
      required: true,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `${name}-erro` : undefined,
      onInput: () => clearError(name),
    };
  }

  function errorText(name: string) {
    const error = errors[name];
    if (!error) return null;
    return (
      <p id={`${name}-erro`} className="field-error">
        {error}
      </p>
    );
  }

  if (state.status === "sent") {
    return (
      <div
        className="rounded-(--radius) bg-[color-mix(in_srgb,var(--spectrum-olive)_12%,transparent)] p-6"
        role="status"
      >
        <p className="font-display text-lg font-bold text-foreground">
          {copy.readyTitle}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-(--text-secondary)">
          {copy.readyBody} {CONTACT_MAILTO}.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      noValidate
      aria-busy={pending}
    >
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="site">{copy.honeypot}</label>
        <input
          id="site"
          name="site"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="field">
        <label htmlFor="nome">{copy.name}</label>
        <input
          {...fieldProps("nome")}
          type="text"
          autoComplete="name"
          placeholder={copy.namePlaceholder}
        />
        {errorText("nome")}
      </div>

      <div className="field">
        <label htmlFor="email">{copy.email}</label>
        <input
          {...fieldProps("email")}
          type="email"
          autoComplete="email"
          inputMode="email"
          spellCheck={false}
          placeholder={copy.emailPlaceholder}
        />
        {errorText("email")}
      </div>

      <div className="field">
        <label htmlFor="frente">{copy.topic}</label>
        <select
          {...fieldProps("frente")}
          defaultValue=""
          onChange={() => clearError("frente")}
        >
          <option value="" disabled>
            {copy.pick}
          </option>
          {INTEREST_KEYS.map((key) => (
            <option key={key} value={key}>
              {copy.interests[key]}
            </option>
          ))}
        </select>
        {errorText("frente")}
      </div>

      <div className="field">
        <label htmlFor={messageField}>
          {compact ? copy.message : copy.project}
        </label>
        <textarea
          {...fieldProps(messageField)}
          placeholder={
            compact ? copy.messagePlaceholder : copy.projectPlaceholder
          }
        />
        {errorText(messageField)}
      </div>

      <p role="alert" className="field-error empty:hidden">
        {state.status === "error" && !pending ? state.message : ""}
      </p>

      <button
        type="submit"
        className="btn btn-primary mt-1 self-start disabled:cursor-wait disabled:opacity-60"
        disabled={pending}
      >
        {pending ? copy.opening : copy.send}
      </button>
    </form>
  );
}

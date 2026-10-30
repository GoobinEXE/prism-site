"use client";

import { FormEvent, useState } from "react";
import { interestOptions } from "@/lib/navigation";
import {
  contactMailto,
  validateContact,
  type ContactState,
} from "@/lib/contact";

type ContactFormProps = {
  compact?: boolean;
};

type FieldErrors = Partial<Record<string, string>>;

function messageFor(
  field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
) {
  const { validity } = field;
  if (validity.valueMissing) {
    if (field instanceof HTMLSelectElement) return "Escolha uma opção.";
    if (field.name === "email") return "Informe seu e-mail.";
    if (field.name === "nome") return "Informe seu nome.";
    return "Conte o que você precisa.";
  }
  if (validity.typeMismatch)
    return "Use um e-mail válido, como voce@empresa.com.";
  return field.validationMessage;
}

export function ContactForm({ compact = false }: ContactFormProps) {
  const [state, setState] = useState<ContactState>({ status: "idle" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);
  const messageField = compact ? "mensagem" : "especificacoes";

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
    const result = validateContact(data);
    if (!("ok" in result)) {
      setState(result);
      if (result.fieldErrors) setErrors(result.fieldErrors);
      setPending(false);
      return;
    }

    if (result.payload) {
      window.location.href = contactMailto(result.payload);
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
          Mensagem pronta
        </p>
        <p className="mt-2 text-sm leading-relaxed text-(--text-secondary)">
          Se o app de e-mail abriu, é só enviar. Senão, escreva direto para
          contato@prism.dev.
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
        <label htmlFor="site">Site</label>
        <input
          id="site"
          name="site"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="field">
        <label htmlFor="nome">Seu nome</label>
        <input
          {...fieldProps("nome")}
          type="text"
          autoComplete="name"
          placeholder="Seu nome"
        />
        {errorText("nome")}
      </div>

      <div className="field">
        <label htmlFor="email">E-mail</label>
        <input
          {...fieldProps("email")}
          type="email"
          autoComplete="email"
          inputMode="email"
          spellCheck={false}
          placeholder="voce@empresa.com"
        />
        {errorText("email")}
      </div>

      <div className="field">
        <label htmlFor="frente">Sobre o que você quer falar?</label>
        <select
          {...fieldProps("frente")}
          defaultValue=""
          onChange={() => clearError("frente")}
        >
          <option value="" disabled>
            Escolha uma opção
          </option>
          {interestOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errorText("frente")}
      </div>

      <div className="field">
        <label htmlFor={messageField}>
          {compact ? "Mensagem" : "Conte um pouco sobre o projeto"}
        </label>
        <textarea
          {...fieldProps(messageField)}
          placeholder={
            compact
              ? "Conte o que você precisa."
              : "O que você tem em mente, para quando e onde vai funcionar."
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
        {pending ? "Abrindo e-mail…" : "Enviar mensagem"}
      </button>
    </form>
  );
}

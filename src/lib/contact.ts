import { INTEREST_KEYS, type Messages } from "@/lib/i18n/messages";

export type ContactState = {
  status: "idle" | "sent" | "error";
  message?: string;
  fieldErrors?: Partial<Record<string, string>>;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const CONTACT_MAILTO = "marcelop.smile@gmail.com";

function text(formData: FormData, name: string, max: number) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export type ContactPayload = {
  nome: string;
  email: string;
  frente: string;
  label: string;
  mensagem: string;
};

export function validateContact(
  formData: FormData,
  copy: Messages["contactForm"]
): { ok: true; payload: ContactPayload | null } | ContactState {
  if (text(formData, "site", 200)) return { ok: true, payload: null };

  const nome = text(formData, "nome", 120);
  const email = text(formData, "email", 200);
  const frente = text(formData, "frente", 40);
  const mensagem =
    text(formData, "mensagem", 5000) || text(formData, "especificacoes", 5000);
  const messageField = formData.has("especificacoes")
    ? "especificacoes"
    : "mensagem";

  const fieldErrors: Partial<Record<string, string>> = {};
  if (!nome) fieldErrors.nome = copy.missingName;
  if (!email) fieldErrors.email = copy.missingEmail;
  else if (!EMAIL.test(email)) fieldErrors.email = copy.invalidEmail;
  if (!INTEREST_KEYS.some((key) => key === frente))
    fieldErrors.frente = copy.missingTopic;
  if (!mensagem) fieldErrors[messageField] = copy.missingMessage;

  if (Object.keys(fieldErrors).length) {
    return {
      status: "error",
      message: copy.missingForm,
      fieldErrors,
    };
  }

  const label =
    copy.interests[frente as keyof typeof copy.interests] ?? frente;

  return {
    ok: true,
    payload: { nome, email, frente, label, mensagem },
  };
}

export function contactMailto(
  payload: ContactPayload,
  copy: Messages["contactForm"]
) {
  const subject = encodeURIComponent(`[Prism · ${payload.label}] ${payload.nome}`);
  const body = encodeURIComponent(
    `${copy.mailtoName}: ${payload.nome}\n${copy.mailtoEmail}: ${payload.email}\n${copy.mailtoTopic}: ${payload.label}\n\n${payload.mensagem}`
  );
  return `mailto:${CONTACT_MAILTO}?subject=${subject}&body=${body}`;
}

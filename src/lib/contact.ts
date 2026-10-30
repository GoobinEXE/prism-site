import { interestOptions } from "@/lib/navigation";

export type ContactState = {
  status: "idle" | "sent" | "error";
  message?: string;
  fieldErrors?: Partial<Record<string, string>>;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const CONTACT_MAILTO = "contato@prism.dev";

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
  formData: FormData
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
  if (!nome) fieldErrors.nome = "Informe seu nome.";
  if (!email) fieldErrors.email = "Informe seu e-mail.";
  else if (!EMAIL.test(email))
    fieldErrors.email = "Use um e-mail válido, como voce@empresa.com.";
  if (!interestOptions.some((option) => option.value === frente))
    fieldErrors.frente = "Escolha uma opção.";
  if (!mensagem) fieldErrors[messageField] = "Conte o que você precisa.";

  if (Object.keys(fieldErrors).length) {
    return {
      status: "error",
      message: "Faltou algo ali em cima. Dá uma olhada nos campos marcados.",
      fieldErrors,
    };
  }

  const label =
    interestOptions.find((option) => option.value === frente)?.label ?? frente;

  return {
    ok: true,
    payload: { nome, email, frente, label, mensagem },
  };
}

export function contactMailto(payload: ContactPayload) {
  const subject = encodeURIComponent(`[Prism · ${payload.label}] ${payload.nome}`);
  const body = encodeURIComponent(
    `Nome: ${payload.nome}\nE-mail: ${payload.email}\nFrente: ${payload.label}\n\n${payload.mensagem}`
  );
  return `mailto:${CONTACT_MAILTO}?subject=${subject}&body=${body}`;
}

import { withBase } from "@/lib/site";

export const cv = {
  pdf: withBase("/cv/marcelo-pessoa-curriculo.pdf"),
  html: withBase("/cv/marcelo-pessoa-curriculo.html"),
  preview: withBase("/cv/marcelo-pessoa-curriculo-preview.jpg"),
  fileName: "Marcelo-Pessoa-Curriculo.pdf",
} as const;

export const cvExperience = [
  {
    org: "Superintendência-Geral de Governança de Serviços e Dados (SGSD)",
    roles: [
      { title: "Pesquisador em Inteligência Artificial", time: "6 meses (atual)" },
      { title: "Gestão de Dados e BI", time: "1 ano" },
      { title: "Assistente de TI", time: "6 meses, em paralelo" },
    ],
  },
  {
    org: "Secretaria da Inovação e Inteligência Artificial (SEIA)",
    roles: [{ title: "Assessor Técnico de Projetos", time: "1 ano" }],
  },
  {
    org: "BRDE",
    roles: [{ title: "Estagiário de Comunicação", time: "1 ano" }],
  },
  {
    org: "Celepar",
    roles: [{ title: "Estagiário de Motion e Vídeo", time: "2 anos" }],
  },
] as const;

export const cvEducation = [
  {
    title: "Tecnologia em Jogos Digitais",
    place: "Universidade Positivo, junho de 2026",
    href: "https://diplomadigital.up.edu.br/1042.1042.010566a2898a",
    linkLabel: "Diploma digital MEC",
  },
  {
    title: "Design",
    place: "PUCPR, dois anos",
  },
  {
    title: "Google AI Essentials",
    place: "Coursera, 2025",
    href: "https://coursera.org/share/c699f06d1e7b827391c454ed5ca382f8",
    linkLabel: "Certificado",
  },
] as const;

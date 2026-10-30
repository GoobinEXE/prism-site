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
    period: "2 anos",
    roles: [
      {
        title: "Pesquisador em Inteligência Artificial",
        time: "6 meses · atual",
        text: "Pesquisas e provas de conceito com IA generativa, processamento inteligente de documentos e RPA para modernizar serviços do Estado; pareceres de viabilidade e diretrizes de conformidade.",
      },
      {
        title: "Gestão de Dados e BI",
        time: "1 ano",
        text: "Diagnósticos de automação, painéis e indicadores para a governança estadual de dados.",
      },
      {
        title: "Assistente de TI",
        time: "6 meses · em paralelo",
        text: "Suporte técnico a computadores e sistemas da superintendência.",
      },
    ],
  },
  {
    org: "Secretaria da Inovação e Inteligência Artificial (SEIA)",
    period: "1 ano",
    roles: [
      {
        title: "Assessor Técnico de Projetos",
        text: "Negociações e homologações com fornecedores, avaliação de conformidade e viabilidade de soluções de IA, apresentações entre secretarias.",
      },
    ],
  },
  {
    org: "BRDE",
    period: "1 ano",
    roles: [
      {
        title: "Estagiário de Comunicação",
        text: "Triagem e fluxo documental de instrumentos de parceria, apoio à validação e formalização de acordos.",
      },
    ],
  },
  {
    org: "Celepar",
    period: "2 anos",
    roles: [
      {
        title: "Estagiário de Motion e Vídeo",
        text: "Animações institucionais, vinhetas, edição de vídeo e materiais visuais sobre as plataformas digitais do Estado.",
      },
    ],
  },
] as const;

export const cvSkills = [
  { group: "Linguagens", items: "C, C++, Python, TypeScript, Swift, JavaScript, Dart, SQL" },
  { group: "Ferramentas", items: "Flutter, Node.js, Next.js, SDL3, Git/GitHub, pywebview" },
  { group: "IA e dados", items: "IA generativa aplicada, IDP, RPA, modelagem de BI" },
  { group: "Design", items: "UX/UI, game design, design de narrativa e progressão, roteiro" },
  { group: "Comunidade", items: "Gestão de comunidades, eventos, condução de mesas de RPG, pesquisa com usuários" },
  { group: "Audiovisual", items: "Motion, edição de vídeo, áudio e mixagem básica" },
] as const;

export const cvEducation = [
  {
    title: "Tecnologia em Jogos Digitais",
    place: "Universidade Positivo · jun/2026",
    href: "https://diplomadigital.up.edu.br/1042.1042.010566a2898a",
    linkLabel: "Diploma digital MEC",
  },
  {
    title: "Design (2 anos, não concluído)",
    place: "PUCPR",
  },
  {
    title: "Google AI Essentials",
    place: "Coursera · 2025",
    href: "https://coursera.org/share/c699f06d1e7b827391c454ed5ca382f8",
    linkLabel: "Certificado",
  },
  {
    title: "Idiomas",
    place: "Português nativo · inglês A2, com leitura técnica fluente",
  },
] as const;

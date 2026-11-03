import type { Locale } from "@/lib/i18n/locale";

export const NAV_KEYS = [
  "home",
  "work",
  "darkRoom",
  "about",
  "behindPrism",
  "contact",
] as const;

export type NavKey = (typeof NAV_KEYS)[number];

export const INTEREST_KEYS = [
  "mobile",
  "desktop",
  "web",
  "dark-room",
  "parceria",
] as const;

export type InterestKey = (typeof INTEREST_KEYS)[number];

export type Messages = {
  skip: string;
  nav: Record<NavKey, string>;
  header: {
    homeAria: string;
    mainNav: string;
    mobileNav: string;
    getInTouch: string;
    openMenu: string;
    closeMenu: string;
  };
  locale: {
    group: string;
    en: string;
    pt: string;
  };
  footer: {
    navigation: string;
    highlights: string;
    allProjects: string;
    rights: string;
    seal: string;
  };
  hero: { cta: string };
  home: {
    whatWeDo: string;
    getInTouch: string;
    pillars: {
      title: string;
      description: string;
      href: string;
    }[];
  };
  work: {
    title: string;
    mobile: string;
    desktop: string;
    web: string;
    darkRoom: string;
    lumenLead: string;
    lumenPoints: string[];
    rpgymLead: string;
    rpgymPoints: string[];
    translateLead: string;
    brew: string;
    webTitle: string;
    webLead: string;
    webPoints: string[];
    darkTitle: string;
    darkLead: string;
    enter: string;
  };
  about: {
    title: string;
    why: string;
    whyP1: string;
    whyP2: string;
    dark: string;
    darkP: string;
    visit: string;
    seeWork: string;
  };
  behind: {
    title: string;
    lead: string;
    download: string;
    print: string;
    newTab: string;
    started: string;
    startedP1: string;
    startedP2: string;
    fromGames: string;
    fromGamesP: string;
    worked: string;
    workedP1: string;
    workedP2: string;
    brands: string;
    brandsP1: string;
    brandsP1Link: string;
    brandsP2: string;
    limboCta: string;
    enter: string;
    table: string;
    tableP: string;
    talk: string;
    talkBefore: string;
    talkLink: string;
    talkAfter: string;
    cvTitle: string;
    experience: string;
    education: string;
    jobs: { org: string; roles: { title: string; time: string }[] }[];
    schools: {
      title: string;
      place: string;
      href?: string;
      linkLabel?: string;
    }[];
  };
  contact: {
    title: string;
    writeTo: string;
  };
  contactForm: {
    honeypot: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    topic: string;
    pick: string;
    message: string;
    project: string;
    messagePlaceholder: string;
    projectPlaceholder: string;
    send: string;
    opening: string;
    readyTitle: string;
    readyBody: string;
    missingName: string;
    missingEmail: string;
    invalidEmail: string;
    missingTopic: string;
    missingMessage: string;
    missingForm: string;
    interests: Record<InterestKey, string>;
    mailtoName: string;
    mailtoEmail: string;
    mailtoTopic: string;
  };
  darkRoom: {
    profile: string;
    projects: string;
    back: string;
    kinds: { game: string; tool: string; app: string; bot: string };
    leads: {
      limboOS: string;
      route1: string;
      pokewalker: string;
      videlBot: string;
    };
  };
  portal: {
    chamber: string;
    seeAll: string;
    leads: {
      limboOS: string;
      route1: string;
      pokewalker: string;
      videlBot: string;
    };
  };
  notFound: {
    title: string;
    lead: string;
    home: string;
    work: string;
  };
  chamber: { entering: string; leaving: string };
  copy: { copy: string; copied: string };
  project: { newTab: string; newTabOf: string };
  fab: { aria: string; title: string };
  legacy: { moved: string };
  meta: {
    defaultTitle: string;
    titleTemplate: string;
    routes: Record<string, string>;
  };
};

const en: Messages = {
  skip: "Skip to content",
  nav: {
    home: "Home",
    work: "Work",
    darkRoom: "Dark Room",
    about: "About",
    behindPrism: "Behind Prism",
    contact: "Contact",
  },
  header: {
    homeAria: "Prism, home",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    getInTouch: "Get in touch",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  locale: {
    group: "Language",
    en: "English",
    pt: "Portuguese",
  },
  footer: {
    navigation: "Navigation",
    highlights: "Highlights",
    allProjects: "All projects",
    rights: "© 2026 Prism. All rights reserved.",
    seal: "Dark Room · A Prism Studio",
  },
  hero: { cta: "See what we do" },
  home: {
    whatWeDo: "What we do",
    getInTouch: "Get in touch",
    pillars: [
      {
        title: "Mobile apps",
        description:
          "Apps for iPhone and Android that handle everyday stuff in the simplest way possible.",
        href: "/work#mobile",
      },
      {
        title: "Desktop software",
        description:
          "Lightweight programs for your computer. They open fast and do what they say, without getting in your way.",
        href: "/work#desktop",
      },
      {
        title: "Web apps",
        description:
          "Sites and systems that run in any browser and grow along with your project.",
        href: "/work#web",
      },
      {
        title: "Games and experimental projects",
        description:
          "Prism's more playful side: games, bots and ideas we test at our own pace.",
        href: "/#portal-dark-room",
      },
    ],
  },
  work: {
    title: "Work",
    mobile: "Mobile apps",
    desktop: "Desktop software",
    web: "Web apps",
    darkRoom: "Dark Room",
    lumenLead:
      "An app for organizing your routine: focus blocks, a sleep diary and reports that are easy to share with the people helping you.",
    lumenPoints: [
      "Routine and focus with visual reminders",
      "Sleep diary with reports",
      "Works on iPhone and Android",
    ],
    rpgymLead:
      "Your workouts become an RPG. Every session levels up your stats and you watch the progress happen.",
    rpgymPoints: [
      "Stats that go up with every workout",
      "Workout and weight history",
      "Built for iPhone",
    ],
    translateLead:
      "Translate the text right where you're typing, without switching windows. It lives in the menu bar and shows up with a shortcut.",
    brew: "Install with Homebrew",
    webTitle: "Custom-built systems",
    webLead:
      "Web apps that update instantly for everyone and make it clear who can see and edit what.",
    webPoints: ["Real-time updates", "Permissions per person and per team"],
    darkTitle: "Games and experimental projects",
    darkLead:
      "Games, bots for communities and tools for old consoles. All of it lives in the Dark Room.",
    enter: "Enter the Dark Room",
  },
  about: {
    title: "About Prism",
    why: "Why Prism",
    whyP1:
      "A prism takes in one beam of light and sends out many colors. We work the same way: a problem and an idea go in, and the same mind comes out with several solutions.",
    whyP2:
      "That's where the mobile apps, the desktop software, the web apps and the Dark Room projects come from. Each one with its own character, all from the same place.",
    dark: "What about Dark Room?",
    darkP:
      "Dark Room is where the games and the more experimental projects live. The name comes from the photographer's darkroom: things sit in there and develop slowly, until they're ready to come out.",
    visit: "Visit the Dark Room",
    seeWork: "See our work",
  },
  behind: {
    title: "Who's behind Prism",
    lead:
      "Hi, I'm Marcelo Pessoa de Aguiar Lopes. I live in Curitiba, Brazil, and I design, build and sign off on everything that ships under the Prism name.",
    download: "Download CV",
    print: "Print version",
    newTab: " (opens in a new tab)",
    started: "I started in design",
    startedP1:
      "I enrolled in Design at PUCPR, a university here in Curitiba, wanting to be a 3D artist for games. Once there, I realized 3D was a hobby I loved, but what I really wanted was UX/UI and game design: thinking about who is going to use the thing, what they see first, where they get stuck and what can be taken out of the way, until it's as intuitive as it can be.",
    startedP2:
      "Two years in, I switched from Design to Digital Games. I never dropped design, though. It's in every interface I build, including this page.",
    fromGames: "From games to software",
    fromGamesP:
      "I graduated in Digital Games from Universidade Positivo in June 2026. Making games taught me a rule I carry into every project: if people don't understand what to do in the first few seconds, they give up.",
    worked: "Where I've worked",
    workedP1:
      "I started as a motion design and video intern at Celepar, the IT company of the state of Paraná. I spent two years there making animations and videos that explained the state's digital systems. Then I moved to the communications team at BRDE, a regional development bank, where I handled the document flow for partnership agreements. At the state's Department of Innovation and Artificial Intelligence, I was a technical project advisor: I evaluated AI solutions with vendors and pitched proposals to other departments.",
    workedP2:
      "Today I'm at the Paraná state government's Office of Service and Data Governance. I've done BI and IT support there, and now I work as an AI researcher: I test where generative AI and document automation make sense in the state's public services.",
    brands: "Prism and Dark Room",
    brandsP1:
      "Outside of work hours, I build things. Prism is home to the software: Lumen, an app for keeping track of ADHD, sleep and routine; Prism Translate, which translates text straight from the Mac menu bar; and custom-built websites.",
    brandsP1Link: "See our work",
    brandsP2:
      "Dark Room is my corner for games and the gaming community. The flagship is LimboOS, a companion for tabletop RPG campaigns that's already live. During a session it hands players intel, tapes, dossiers and achievements, so the story keeps going away from the table and the game master gets more tools to tell it. Alongside it are Route 1 Kit, Pokéwalker Companion and VidelBOT, a bot for Discord servers.",
    limboCta: "Check out LimboOS",
    enter: "Enter the Dark Room",
    table: "People around the table",
    tableP:
      "I also like bringing people together. I've run gaming communities and events, and I'm a tabletop game master. Almost everything I know about listening to players came from that.",
    talk: "Want to talk?",
    talkBefore: "If you have an idea and want to get it off the ground, ",
    talkLink: "drop me a line",
    talkAfter: ".",
    cvTitle: "CV",
    experience: "Experience",
    education: "Education",
    jobs: [
      {
        org: "Office of Service and Data Governance (SGSD), Paraná State Government",
        roles: [
          { title: "AI Researcher", time: "6 months, current" },
          { title: "Data Management and BI", time: "1 year" },
          { title: "IT Support Assistant", time: "6 months, concurrent" },
        ],
      },
      {
        org: "Department of Innovation and Artificial Intelligence (SEIA), Paraná State Government",
        roles: [{ title: "Technical Project Advisor", time: "1 year" }],
      },
      {
        org: "BRDE (regional development bank, southern Brazil)",
        roles: [{ title: "Communications Intern", time: "1 year" }],
      },
      {
        org: "Celepar (Paraná state IT company)",
        roles: [{ title: "Motion Design and Video Intern", time: "2 years" }],
      },
    ],
    schools: [
      {
        title: "Technologist Degree in Digital Games (undergraduate)",
        place: "Universidade Positivo, June 2026",
        href: "https://diplomadigital.up.edu.br/1042.1042.010566a2898a",
        linkLabel: "Official digital diploma",
      },
      {
        title: "Design",
        place: "PUCPR, two years (switched to Digital Games)",
      },
      {
        title: "Google AI Essentials",
        place: "Coursera, 2025",
        href: "https://coursera.org/share/c699f06d1e7b827391c454ed5ca382f8",
        linkLabel: "Certificate",
      },
    ],
  },
  contact: {
    title: "Get in touch",
    writeTo: "If you prefer, write to",
  },
  contactForm: {
    honeypot: "Website",
    name: "Your name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "you@company.com",
    topic: "What do you want to talk about?",
    pick: "Pick an option",
    message: "Message",
    project: "Tell us a bit about the project",
    messagePlaceholder: "Tell us what you need.",
    projectPlaceholder:
      "What you have in mind, when you need it and where it will run.",
    send: "Send message",
    opening: "Opening email…",
    readyTitle: "Message ready",
    readyBody:
      "If your email app opened, just hit send. If it didn't, write to",
    missingName: "Enter your name.",
    missingEmail: "Enter your email.",
    invalidEmail: "Use a valid email, like you@company.com.",
    missingTopic: "Pick an option.",
    missingMessage: "Tell us what you need.",
    missingForm: "Something's missing above. Take a look at the highlighted fields.",
    interests: {
      mobile: "Mobile app",
      desktop: "Desktop software",
      web: "Web app",
      "dark-room": "Games and Dark Room",
      parceria: "Partnership or something else",
    },
    mailtoName: "Name",
    mailtoEmail: "Email",
    mailtoTopic: "Topic",
  },
  darkRoom: {
    profile:
      "Dark Room is Prism's in-house studio for games, diegetic systems and experimental software.",
    projects: "Projects",
    back: "Back to Prism",
    kinds: { game: "Game", tool: "Tool", app: "App", bot: "Bot" },
    leads: {
      limboOS:
        "A companion for tabletop RPGs and ARGs disguised as a vintage operating system. You open the folders, read the files and play inside it.",
      route1:
        "Sets up SD cards and firmware for the Nintendo DSi and flashcards without the headaches, on Windows, Mac or Linux.",
      pokewalker:
        "The Pokéwalker is back, now on your phone. You walk, collect Watts and carry everything over to HeartGold and SoulSilver on the DSi.",
      videlBot:
        "A Discord bot that handles moderation, answers commands and keeps the music playing all day.",
    },
  },
  portal: {
    chamber: "Maturation Chamber",
    seeAll: "See all projects",
    leads: {
      limboOS:
        "A tabletop RPG companion disguised as a vintage operating system. You play inside it.",
      route1: "Sets up SD cards and firmware for the Nintendo DSi, no headaches.",
      pokewalker:
        "The Pokéwalker is back, now on your phone. Your steps become Watts for HeartGold and SoulSilver.",
      videlBot: "A Discord bot that moderates your server and plays music all day.",
    },
  },
  notFound: {
    title: "Page not found",
    lead: "This page doesn't exist or has moved.",
    home: "Back to home",
    work: "See our work",
  },
  chamber: { entering: "Entering", leaving: "Leaving" },
  copy: { copy: "Copy", copied: "Copied" },
  project: {
    newTab: " (opens in a new tab)",
    newTabOf: " (opens in a new tab)",
  },
  fab: { aria: "Open the contact page", title: "Quick contact" },
  legacy: { moved: "This page moved to" },
  meta: {
    defaultTitle: "Prism & Dark Room",
    titleTemplate: "%s · Prism",
    routes: {
      "/": "Prism & Dark Room",
      "/work": "Work · Prism",
      "/dark-room": "Dark Room",
      "/about": "About · Prism",
      "/behind-prism": "Behind Prism · Prism",
      "/contact": "Contact · Prism",
    },
  },
};

const pt: Messages = {
  skip: "Ir para o conteúdo",
  nav: {
    home: "Início",
    work: "Trabalho",
    darkRoom: "Dark Room",
    about: "Sobre",
    behindPrism: "Por trás do Prism",
    contact: "Contato",
  },
  header: {
    homeAria: "Prism, início",
    mainNav: "Navegação principal",
    mobileNav: "Navegação móvel",
    getInTouch: "Fale conosco",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
  },
  locale: {
    group: "Idioma",
    en: "Inglês",
    pt: "Português",
  },
  footer: {
    navigation: "Navegação",
    highlights: "Destaques",
    allProjects: "Todos os projetos",
    rights: "© 2026 Prism. Todos os direitos reservados.",
    seal: "Dark Room · Um Estúdio Prism",
  },
  hero: { cta: "Ver o que fazemos" },
  home: {
    whatWeDo: "O que a gente faz",
    getInTouch: "Fale com a gente",
    pillars: [
      {
        title: "Apps mobile",
        description:
          "Apps para iPhone e Android que resolvem coisas do dia a dia, do jeito mais simples possível.",
        href: "/work#mobile",
      },
      {
        title: "Softwares para desktop",
        description:
          "Programas leves para o seu computador. Abrem rápido, fazem o que prometem e não atrapalham.",
        href: "/work#desktop",
      },
      {
        title: "Web apps",
        description:
          "Sites e sistemas que funcionam em qualquer navegador e crescem junto com o seu projeto.",
        href: "/work#web",
      },
      {
        title: "Jogos e projetos experimentais",
        description:
          "O lado mais livre da Prism: jogos, bots e ideias que a gente testa com calma.",
        href: "/#portal-dark-room",
      },
    ],
  },
  work: {
    title: "Trabalho",
    mobile: "Apps mobile",
    desktop: "Softwares para desktop",
    web: "Web apps",
    darkRoom: "Dark Room",
    lumenLead:
      "Um app para organizar a rotina: blocos de foco, diário de sono e relatórios fáceis de compartilhar com quem te acompanha.",
    lumenPoints: [
      "Rotina e foco com lembretes visuais",
      "Diário de sono com relatórios",
      "Funciona no iPhone e no Android",
    ],
    rpgymLead:
      "Seus treinos viram um RPG. Cada sessão sobe seus atributos e você vê a evolução acontecendo.",
    rpgymPoints: [
      "Atributos que sobem a cada treino",
      "Histórico de treinos e carga",
      "Feito para iPhone",
    ],
    translateLead:
      "Traduza o texto onde você está digitando, sem trocar de janela. Ele fica na barra de menus e aparece com um atalho.",
    brew: "Instale pelo Homebrew",
    webTitle: "Sistemas sob medida",
    webLead:
      "Web apps que atualizam na hora para todo mundo e deixam claro quem pode ver e editar cada coisa.",
    webPoints: [
      "Atualização em tempo real",
      "Permissões por pessoa e por equipe",
    ],
    darkTitle: "Jogos e projetos experimentais",
    darkLead:
      "Jogos, bots para comunidades e ferramentas para consoles antigos. Tudo isso mora na Dark Room.",
    enter: "Entrar na Dark Room",
  },
  about: {
    title: "Sobre a Prism",
    why: "Por que Prism",
    whyP1:
      "Um prisma recebe um feixe de luz e devolve várias cores. A gente trabalha igual: um problema e uma ideia entram, e da mesma mente saem várias soluções.",
    whyP2:
      "É daí que saem os apps, os softwares para desktop, os web apps e os projetos da Dark Room. Cada um com o seu jeito, todos vindos do mesmo lugar.",
    dark: "E a Dark Room?",
    darkP:
      "A Dark Room é onde ficam os jogos e os projetos mais experimentais. O nome vem da câmara escura da fotografia: as coisas ficam lá dentro sendo reveladas com calma, até estarem prontas para sair.",
    visit: "Visitar a Dark Room",
    seeWork: "Ver o trabalho",
  },
  behind: {
    title: "Quem está por trás do Prism",
    lead:
      "Oi, eu sou o Marcelo Pessoa de Aguiar Lopes. Moro em Curitiba e sou quem desenha, programa e assina tudo o que sai com a marca Prism.",
    download: "Baixar currículo",
    print: "Versão para impressão",
    newTab: " (abre em nova aba)",
    started: "Comecei pelo design",
    startedP1:
      "Entrei em Design na PUCPR querendo ser artista 3D para jogos. Lá dentro percebi que o 3D era um hobby que eu amava, mas que meu objetivo de verdade era UX/UI e game design: pensar em quem vai usar, no que a pessoa vê primeiro, onde ela trava e no que dá pra tirar do caminho, até a coisa ficar o mais intuitiva possível.",
    startedP2:
      "Depois de dois anos troquei Design por Jogos Digitais. Mas nunca larguei o design. Ele está em toda interface que eu monto, inclusive nesta página.",
    fromGames: "Dos jogos para o software",
    fromGamesP:
      "Me formei em Tecnologia em Jogos Digitais pela Universidade Positivo em junho de 2026. Fazer jogo me ensinou uma regra que eu levo pra qualquer projeto: se a pessoa não entende o que fazer nos primeiros segundos, ela desiste.",
    worked: "Onde eu trabalhei",
    workedP1:
      "Comecei como estagiário de motion e vídeo na Celepar. Passei dois anos lá fazendo animações e vídeos que explicavam os sistemas digitais do Estado. Depois fui para a comunicação do BRDE, cuidando do fluxo de documentos dos acordos de parceria. Na Secretaria da Inovação e Inteligência Artificial, fui assessor técnico de projetos: avaliava soluções de IA junto com fornecedores e apresentava propostas para outras secretarias.",
    workedP2:
      "Hoje estou na Superintendência-Geral de Governança de Serviços e Dados. Passei por BI e suporte de TI e agora sou pesquisador em inteligência artificial, testando onde IA generativa e automação de documentos fazem sentido nos serviços públicos do Paraná.",
    brands: "Prism e Dark Room",
    brandsP1:
      "Fora do expediente, eu construo coisas. O Prism é a casa dos softwares: o Lumen, app para acompanhar TDAH, sono e rotina; o Prism Translate, que traduz texto direto da barra de menus do Mac; e sites feitos sob medida.",
    brandsP1Link: "Ver o trabalho",
    brandsP2:
      "A Dark Room é o meu canto de jogos e da comunidade gamer. O carro-chefe é o LimboOS, um companion para campanhas de RPG de mesa que já está no ar. Durante a sessão, ele entrega aos jogadores intel, fitas, dossiês e conquistas, então a história continua fora da mesa e o mestre ganha mais ferramentas para contar ela. Junto dele ficam o Route 1 Kit, o Pokéwalker Companion e o VidelBOT, um bot para servidores de Discord.",
    limboCta: "Conhecer o LimboOS",
    enter: "Entrar na Dark Room",
    table: "Gente em volta da mesa",
    tableP:
      "Também gosto de juntar gente. Já organizei comunidades gamer e eventos e sou mestre de RPG, e quase tudo o que eu sei sobre ouvir quem joga veio daí.",
    talk: "Bora conversar?",
    talkBefore: "Se você tem uma ideia e quer tirar do papel, ",
    talkLink: "me chama",
    talkAfter: ".",
    cvTitle: "Currículo",
    experience: "Experiência",
    education: "Formação",
    jobs: [
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
    ],
    schools: [
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
    ],
  },
  contact: {
    title: "Fale com a gente",
    writeTo: "Se preferir, escreva para",
  },
  contactForm: {
    honeypot: "Site",
    name: "Seu nome",
    namePlaceholder: "Seu nome",
    email: "E-mail",
    emailPlaceholder: "voce@empresa.com",
    topic: "Sobre o que você quer falar?",
    pick: "Escolha uma opção",
    message: "Mensagem",
    project: "Conte um pouco sobre o projeto",
    messagePlaceholder: "Conte o que você precisa.",
    projectPlaceholder:
      "O que você tem em mente, para quando e onde vai funcionar.",
    send: "Enviar mensagem",
    opening: "Abrindo e-mail…",
    readyTitle: "Mensagem pronta",
    readyBody:
      "Se o app de e-mail abriu, é só enviar. Senão, escreva direto para",
    missingName: "Informe seu nome.",
    missingEmail: "Informe seu e-mail.",
    invalidEmail: "Use um e-mail válido, como voce@empresa.com.",
    missingTopic: "Escolha uma opção.",
    missingMessage: "Conte o que você precisa.",
    missingForm: "Faltou algo ali em cima. Dá uma olhada nos campos marcados.",
    interests: {
      mobile: "App mobile",
      desktop: "Software para desktop",
      web: "Web app",
      "dark-room": "Jogos e Dark Room",
      parceria: "Parceria ou outro assunto",
    },
    mailtoName: "Nome",
    mailtoEmail: "E-mail",
    mailtoTopic: "Assunto",
  },
  darkRoom: {
    profile:
      "Dark Room é o estúdio autoral de jogos, sistemas diegéticos e softwares experimentais da Prism.",
    projects: "Projetos",
    back: "Voltar à Prism",
    kinds: { game: "Jogo", tool: "Ferramenta", app: "App", bot: "Bot" },
    leads: {
      limboOS:
        "Um companheiro para RPG de mesa e ARG disfarçado de sistema operacional antigo. Você abre as pastas, lê os arquivos e joga dentro dele.",
      route1:
        "Prepara cartões SD e firmwares do Nintendo DSi e de flashcards sem dor de cabeça, no Windows, no Mac ou no Linux.",
      pokewalker:
        "O Pokéwalker de volta, agora no celular. Você caminha, junta Watts e leva tudo para HeartGold e SoulSilver no DSi.",
      videlBot:
        "Um bot para Discord que cuida da moderação, responde a comandos e deixa a música tocando o dia todo.",
    },
  },
  portal: {
    chamber: "Câmara de Maturação",
    seeAll: "Ver todos os projetos",
    leads: {
      limboOS:
        "Um companheiro para RPG de mesa disfarçado de sistema operacional antigo. Você joga dentro dele.",
      route1: "Prepara cartões SD e firmwares do Nintendo DSi sem dor de cabeça.",
      pokewalker:
        "O Pokéwalker de volta, agora no celular. Seus passos viram Watts para HeartGold e SoulSilver.",
      videlBot: "Bot para Discord que modera o servidor e toca música o dia todo.",
    },
  },
  notFound: {
    title: "Página não encontrada",
    lead: "Essa página não existe ou mudou de lugar.",
    home: "Voltar ao início",
    work: "Ver o trabalho",
  },
  chamber: { entering: "Entrando", leaving: "Saindo" },
  copy: { copy: "Copiar", copied: "Copiado" },
  project: {
    newTab: " (abre em nova aba)",
    newTabOf: " (abre em nova aba)",
  },
  fab: { aria: "Abrir página de contato", title: "Contato rápido" },
  legacy: { moved: "Esta página mudou para" },
  meta: {
    defaultTitle: "Prism & Dark Room",
    titleTemplate: "%s · Prism",
    routes: {
      "/": "Prism & Dark Room",
      "/work": "Trabalho · Prism",
      "/dark-room": "Dark Room",
      "/about": "Sobre · Prism",
      "/behind-prism": "Por trás do Prism · Prism",
      "/contact": "Contato · Prism",
    },
  },
};

export const messages: Record<Locale, Messages> = { en, pt };

import type { Locale } from "@/lib/i18n/locale";
import { INK, METAL, NEUTRAL, SPECTRUM, SURFACE, VEIL } from "./brandTokens";

export type SpectrumBandKey = keyof typeof SPECTRUM;

export const MANUAL_SECTIONS = [
  { id: "cover", number: "00", pdfPage: 1 },
  { id: "architecture", number: "01", pdfPage: 2 },
  { id: "prism-logo", number: "02", pdfPage: 3 },
  { id: "dark-room-logo", number: "03", pdfPage: 4 },
  { id: "color", number: "04", pdfPage: 5 },
  { id: "color-use", number: "05", pdfPage: 6 },
  { id: "type", number: "06", pdfPage: 7 },
  { id: "applications", number: "07", pdfPage: 8 },
  { id: "integrity", number: "08", pdfPage: 9 },
] as const;

export type ManualSection = (typeof MANUAL_SECTIONS)[number];
export type ManualSectionId = ManualSection["id"];

export const PRISM_PANTONE: Record<SpectrumBandKey, string> = {
  cyan: "299 C",
  olive: "382 C",
  yellow: "108 C",
  orange: "1585 C",
  magenta: "Process Magenta",
};

export const DARK_ROOM_PANTONE: Record<SpectrumBandKey, string> = {
  cyan: "303 C",
  olive: "574 C",
  yellow: "112 C",
  orange: "1685 C",
  magenta: "229 C",
};

export type SubstrateSpec = {
  brand: string;
  name: string;
  hex: string;
  use: string;
};

export type ColorRowSpec = {
  key: SpectrumBandKey;
  name: string;
  hex: string;
  pantone: string;
  role: string;
};

export type SwatchSpec = {
  name: string;
  hex: string;
  use: string;
};

export type DoorStateSpec = {
  key: "closed" | "ajar" | "open";
  door: 0 | 0.5 | 1;
  label: string;
  description: string;
};

export type ColorUsageRow = {
  key: SpectrumBandKey;
  name: string;
  hex: string;
  whenToUse: string;
  whenToAvoid: string;
};

export type ManualCopy = {
  edition: string;
  title: string;
  subtitle: string;
  pdfFooterPrefix: string;
  tocLabel: string;
  downloadLabel: string;
  downloadEn: string;
  downloadPt: string;
  pdfPagePrefix: string;
  pageShort: string;
  sections: {
    cover: {
      title: string;
      prismTitle: string;
      prismCaption: string;
      darkRoomTitle: string;
      darkRoomCaption: string;
      backToAbout: string;
    };
    architecture: {
      title: string;
      paragraphs: string[];
      substratesTitle: string;
      substrates: SubstrateSpec[];
      segregationTitle: string;
      segregationRule: string;
      endorsementLabel: string;
      endorsementValue: string;
    };
    "prism-logo": {
      title: string;
      master: {
        name: string;
        scale: string;
        clearSpace: string;
        note: string;
      };
      monogram: {
        name: string;
        scale: string;
        clearSpace: string;
        glyph: string;
        substrate: string;
        note: string;
      };
      nightMode: {
        name: string;
        scale: string;
        clearSpace: string;
        glyph: string;
        substrate: string;
        note: string;
      };
      lockup: {
        name: string;
        rule: string;
        ratio: string;
        note: string;
      };
      beamNote: string;
    };
    "dark-room-logo": {
      title: string;
      statesTitle: string;
      states: DoorStateSpec[];
      metallic: {
        name: string;
        substrate: string;
        note: string;
      };
      icon22: {
        name: string;
        radius: string;
        substrate: string;
        note: string;
      };
      clearSpace: {
        title: string;
        rule: string;
        substrateNote: string;
      };
    };
    color: {
      title: string;
      prismTitle: string;
      prismRows: ColorRowSpec[];
      darkRoomTitle: string;
      darkRoomRows: ColorRowSpec[];
      neutralsTitle: string;
      neutrals: SwatchSpec[];
      metalTitle: string;
      metal: SwatchSpec[];
    };
    "color-use": {
      title: string;
      intro: string;
      usageHeaders: {
        band: string;
        whenToUse: string;
        whenToAvoid: string;
      };
      usageRows: ColorUsageRow[];
      inkTitle: string;
      inkIntro: string;
      inkCols: {
        token: string;
        prismLabel: string;
        darkRoomLabel: string;
        ratioLabel: string;
      };
    };
    type: {
      title: string;
      geistSample: {
        label: string;
        heading: string;
        trackingPrism: string;
        body: string;
        note: string;
      };
      darkRoomSample: {
        label: string;
        heading: string;
        trackingDarkRoom: string;
        body: string;
        note: string;
      };
      monoSample: {
        label: string;
        sample: string;
        note: string;
      };
      physicalMediaTitle: string;
      physicalMedia: {
        label: string;
        spec: string;
      }[];
    };
    applications: {
      title: string;
      prismTitle: string;
      prismIntro: string;
      prismItems: {
        key: "lumen" | "rpgym" | "cartograph" | "prismTranslate";
        summary: string;
      }[];
      darkRoomTitle: string;
      darkRoomIntro: string;
      darkRoomItems: {
        key: "limboOS" | "route1" | "pokewalker" | "videlBot";
        code: string;
        led: "olive" | "yellow";
        summary: string;
      }[];
      externalTitle: string;
      externalChannels: {
        channel: string;
        palette: string;
        rule: string;
      }[];
      b2bTitle: string;
      b2bNote: string;
    };
    integrity: {
      title: string;
      dontsTitle: string;
      donts: string[];
      qaTitle: string;
      qaChecklist: string[];
    };
  };
};

const en: ManualCopy = {
  edition: "Canonical Edition 2026",
  title: "Prism & Dark Room Brand Manual",
  subtitle:
    "Logos, substrates, chromatic roles, typography and quality checks for every release across both rooms.",
  pdfFooterPrefix: "PRISM / DARK ROOM · BRAND MANUAL · PAGE",
  tocLabel: "Manual sections",
  downloadLabel: "Download PDF",
  downloadEn: "PDF · English",
  downloadPt: "PDF · Portuguese",
  pdfPagePrefix: "PDF · p.",
  pageShort: "p.",
  sections: {
    cover: {
      title: "Cover",
      prismTitle: "Prism",
      prismCaption: "Parent studio · Vintage Ivory substrate",
      darkRoomTitle: "Dark Room",
      darkRoomCaption: "Games & experiments · Magnetic Black substrate",
      backToAbout: "Back to About",
    },
    architecture: {
      title: "Architecture",
      paragraphs: [
        "Prism is the parent studio: software, data and design. Dark Room is its division for games and experiments. They share the same five colors and sit on opposite sides of the light.",
        "Each room keeps its own ground, contrast tokens and typography scale so software utilities stay bright and readable while games hold a quiet analog floor.",
      ],
      substratesTitle: "Substrates",
      substrates: [
        {
          brand: "Prism",
          name: "Vintage Ivory",
          hex: NEUTRAL.marfim,
          use: "Primary ground for software, documentation and client proposals. Avoids harsh pure white.",
        },
        {
          brand: "Dark Room",
          name: "Magnetic Black",
          hex: NEUTRAL.tape,
          use: "Deep magnetic-tape floor for games, terminals and evening surfaces. Pure black stays reserved for terminal emulators.",
        },
      ],
      segregationTitle: "Brand segregation rule",
      segregationRule:
        "Never place the Prism symbol, monogram or five-band beam inside Dark Room public products. Dark Room holds its own monochrome wordmark and veiled spectrum, linking back to Prism only through institutional endorsement.",
      endorsementLabel: "Institutional endorsement",
      endorsementValue: "Dark Room · A Prism Studio",
    },
    "prism-logo": {
      title: "Prism logo",
      master: {
        name: "Prism Master Symbol",
        scale: "Above 120 px",
        clearSpace: "1X around all sides (1X equals prism base width)",
        note: "Use the refracting symbol at full hero, cover and print sizes where the five bands read cleanly.",
      },
      monogram: {
        name: "P Monogram · Light Mode",
        scale: "16 px to 119 px",
        clearSpace: "Equal to the height of letter P",
        glyph: NEUTRAL.graphic,
        substrate: NEUTRAL.marfim,
        note: "Replaces the master symbol in favicons, headers and compact badges when the bands would collapse.",
      },
      nightMode: {
        name: "P Monogram · Night Mode",
        scale: "16 px to 119 px",
        clearSpace: "Equal to the height of letter P",
        glyph: NEUTRAL.marfim,
        substrate: NEUTRAL.tape,
        note: "Set the Vintage Ivory glyph directly over Magnetic Black without adding a light backing card.",
      },
      lockup: {
        name: "Horizontal Lockup",
        rule: "1 px vertical rule at 60% opacity between symbol and wordmark",
        ratio: "Symbol height matched to cap height plus ascenders",
        note: "Default signature for navigation headers, footers and formal documentation.",
      },
      beamNote: `Incident beam stroke is fixed at Satin Metal Transition (${METAL.transition}) entering from the left.`,
    },
    "dark-room-logo": {
      title: "Dark Room logo",
      statesTitle: "Door aperture states",
      states: [
        {
          key: "closed",
          door: 0,
          label: "Closed (0.0)",
          description: "Locked archive, dormant hardware or sealed release state.",
        },
        {
          key: "ajar",
          door: 0.5,
          label: "Ajar (0.5)",
          description: "Default studio mark: reveals the vertical sliver of light inside the chamber.",
        },
        {
          key: "open",
          door: 1,
          label: "Open (1.0)",
          description: "Active launch, portal crossing or live session in progress.",
        },
      ],
      metallic: {
        name: "Metallic Gradient Variant",
        substrate: NEUTRAL.tape,
        note: `Uses the Satin Metal ramp (${METAL.highlight} to ${METAL.base}) for embossed packaging, press covers and B2B decks.`,
      },
      icon22: {
        name: "DR App Icon",
        radius: "22% corner radius",
        substrate: NEUTRAL.tape,
        note: `Centered DR mark on Magnetic Black (${NEUTRAL.tape}) with no spectral stripe or outer border.`,
      },
      clearSpace: {
        title: "Clear space and ground",
        rule: "Minimum clear space on all four sides equals the width of letter D.",
        substrateNote: `Always render on Magnetic Black (${NEUTRAL.tape}) or darker slate surfaces (${NEUTRAL.charcoal}); never invert onto ivory.`,
      },
    },
    color: {
      title: "Color system",
      prismTitle: "Prism spectrum (left to right, 20% each)",
      prismRows: [
        {
          key: "cyan",
          name: "Prism Cyan",
          hex: SPECTRUM.cyan,
          pantone: PRISM_PANTONE.cyan,
          role: "Primary links, technical data and active controls",
        },
        {
          key: "olive",
          name: "Citrus Olive",
          hex: SPECTRUM.olive,
          pantone: PRISM_PANTONE.olive,
          role: "Finished builds, shipped projects and documentation status",
        },
        {
          key: "yellow",
          name: "Solar Yellow",
          hex: SPECTRUM.yellow,
          pantone: PRISM_PANTONE.yellow,
          role: "Beta previews, notices and telemetry markers",
        },
        {
          key: "orange",
          name: "Warm Orange",
          hex: SPECTRUM.orange,
          pantone: PRISM_PANTONE.orange,
          role: "Release versions, dates and hardware notes",
        },
        {
          key: "magenta",
          name: "Intense Magenta",
          hex: SPECTRUM.magenta,
          pantone: PRISM_PANTONE.magenta,
          role: "Decisive actions, launches and Dark Room portal triggers",
        },
      ],
      darkRoomTitle: "Dark Room veiled spectrum",
      darkRoomRows: [
        {
          key: "cyan",
          name: "Abyssal Cyan",
          hex: VEIL.cyan,
          pantone: DARK_ROOM_PANTONE.cyan,
          role: "Cold isolation, standby diagnostics and dormant frames",
        },
        {
          key: "olive",
          name: "Corrosive Olive",
          hex: VEIL.olive,
          pantone: DARK_ROOM_PANTONE.olive,
          role: "Aged logs, oxidized artifacts and legacy builds",
        },
        {
          key: "yellow",
          name: "Tarnished Amber",
          hex: VEIL.yellow,
          pantone: DARK_ROOM_PANTONE.yellow,
          role: "Low-filament indicators and latent alerts",
        },
        {
          key: "orange",
          name: "Burnt Oxide Orange",
          hex: VEIL.orange,
          pantone: DARK_ROOM_PANTONE.orange,
          role: "Mechanical wear, retained heat and hardware under load",
        },
        {
          key: "magenta",
          name: "Coagulated Magenta",
          hex: VEIL.magenta,
          pantone: DARK_ROOM_PANTONE.magenta,
          role: "Safelight chamber wash and narrative breaks",
        },
      ],
      neutralsTitle: "Prism neutrals and surfaces",
      neutrals: [
        { name: "Vintage Ivory", hex: NEUTRAL.marfim, use: "Primary page ground" },
        { name: "Ivory Glass", hex: SURFACE.prismGlass, use: "Recessed panels and cards" },
        { name: "Ivory Elevated", hex: SURFACE.prismElevated, use: "Hover states and raised blocks" },
        { name: "Graphic Ink", hex: NEUTRAL.graphic, use: "Primary body and headings" },
        { name: "Slate Ink", hex: NEUTRAL.slate, use: "Secondary prose" },
        { name: "Lead Ink", hex: NEUTRAL.lead, use: "Captions, codes and muted labels" },
      ],
      metalTitle: "Dark Room neutrals and satin metal",
      metal: [
        { name: "Magnetic Black", hex: NEUTRAL.tape, use: "Primary dark floor" },
        { name: "Charcoal Container", hex: NEUTRAL.charcoal, use: "Card and table surfaces" },
        { name: "Metal Highlight", hex: METAL.highlight, use: "Primary light text" },
        { name: "Metal Core", hex: METAL.core, use: "Secondary light text" },
        { name: "Metal Transition", hex: METAL.transition, use: "Muted labels and Prism beam" },
        { name: "Metal Base", hex: METAL.base, use: "Dark Room elevated surfaces" },
      ],
    },
    "color-use": {
      title: "Using color",
      intro:
        "The bright spectrum colors fail contrast as text on ivory. For text, use the ink tokens and keep the bright ones for dots, bars and buttons.",
      usageHeaders: {
        band: "Band",
        whenToUse: "When to use",
        whenToAvoid: "When to avoid",
      },
      usageRows: [
        {
          key: "cyan",
          name: "Prism Cyan",
          hex: SPECTRUM.cyan,
          whenToUse: "Primary buttons, focus rings, bar accents and active section markers.",
          whenToAvoid: "Small body copy on Vintage Ivory (use --ink-cyan instead).",
        },
        {
          key: "olive",
          name: "Citrus Olive",
          hex: SPECTRUM.olive,
          whenToUse: "Finished-project LEDs, shipped tags and completion badges with dark text.",
          whenToAvoid: "White text on top of Citrus Olive or raw hex text on ivory.",
        },
        {
          key: "yellow",
          name: "Solar Yellow",
          hex: SPECTRUM.yellow,
          whenToUse: "In-progress LEDs, beta tags and dark-ink highlight chips.",
          whenToAvoid: "Text or thin hairlines on light backgrounds.",
        },
        {
          key: "orange",
          name: "Warm Orange",
          hex: SPECTRUM.orange,
          whenToUse: "Version badges, release milestones and hardware indicators.",
          whenToAvoid: "Error alerts or long paragraphs of orange copy.",
        },
        {
          key: "magenta",
          name: "Intense Magenta",
          hex: SPECTRUM.magenta,
          whenToUse: "Primary Dark Room CTAs, release announcements and decisive actions.",
          whenToAvoid: "B2B contracts, technical documentation or decorative borders.",
        },
      ],
      inkTitle: "Accessible ink tokens",
      inkIntro: `Every spectrum band has a calibrated --ink-* token for text: darkened over Vintage Ivory (${NEUTRAL.marfim}) and lifted over Magnetic Black (${NEUTRAL.tape}) to clear WCAG AA (4.5:1).`,
      inkCols: {
        token: "Token",
        prismLabel: `Prism on ${NEUTRAL.marfim}`,
        darkRoomLabel: `Dark Room on ${NEUTRAL.tape}`,
        ratioLabel: "Contrast",
      },
    },
    type: {
      title: "Typography",
      geistSample: {
        label: "Geist · Prism Phase",
        heading: "GEIST 700 · +0.04EM",
        trackingPrism: "+0.04em to +0.08em uppercase display",
        body: "Geist Regular 400 handles long-form prose, product descriptions and technical documentation over Vintage Ivory with clean optical spacing.",
        note: "Never pair with fallback fonts in headings; load Geist directly via next/font.",
      },
      darkRoomSample: {
        label: "Geist · Dark Room Phase",
        heading: "GEIST 700 · -0.01EM",
        trackingDarkRoom: "-0.01em condensed display",
        body: "Inside Dark Room, display tracking tightens to -0.01em over Magnetic Black while keeping Geist 400 at 1.5 line height for readable logs.",
        note: "Pair with Satin Metal Highlight for headings and Core for body copy.",
      },
      monoSample: {
        label: "JetBrains Mono",
        sample: `DR-001 · ${SPECTRUM.cyan} · ${INK.prism.cyan} · ${NEUTRAL.tape}`,
        note: "Reserved for catalog codes, hex tokens, Pantone references, version tags and PDF running footers.",
      },
      physicalMediaTitle: "Physical media and packaging",
      physicalMedia: [
        {
          label: "Prism stationery",
          spec: `Uncoated cotton stock, 350 to 600 gsm in Vintage Ivory (${NEUTRAL.marfim}) with blind deboss or single-pass black ink.`,
        },
        {
          label: "Dark Room VHS Big Box",
          spec: `190 x 105 x 30 mm sleeve in Magnetic Black (${NEUTRAL.tape}) with metallic silver foil and veiled spine coding.`,
        },
        {
          label: "Finished project seal",
          spec: `Citrus Olive (${SPECTRUM.olive}) indicator paired with JetBrains Mono release code and Graphic Ink (${NEUTRAL.graphic}) label.`,
        },
      ],
    },
    applications: {
      title: "Applications",
      prismTitle: "Prism software catalog",
      prismIntro: "Public utilities and platforms built under the Prism studio mark.",
      prismItems: [
        {
          key: "lumen",
          summary: "Daily routine, focus blocks and sleep diary for mobile.",
        },
        {
          key: "rpgym",
          summary: "Strength training log structured as an RPG progression sheet.",
        },
        {
          key: "cartograph",
          summary: "Federated scientific metasearch across 27 open databases with PRISMA 2020 screening.",
        },
        {
          key: "prismTranslate",
          summary: "Native macOS menu bar translator triggered anywhere by keyboard shortcut.",
        },
      ],
      darkRoomTitle: "Dark Room catalog",
      darkRoomIntro:
        "Games, community bots and console tools use the monochrome mark without the Prism beam. Olive LED marks public builds with live links; yellow LED marks builds still in development.",
      darkRoomItems: [
        {
          key: "limboOS",
          code: "DR-001",
          led: "olive",
          summary: "Diegetic vintage operating system companion for tabletop RPGs and ARGs.",
        },
        {
          key: "route1",
          code: "DR-002",
          led: "olive",
          summary: "Cross-platform setup tool for Nintendo DSi SD cards and firmware.",
        },
        {
          key: "pokewalker",
          code: "DR-003",
          led: "yellow",
          summary: "Mobile pedometer bridge converting daily steps into Watts for HeartGold and SoulSilver.",
        },
        {
          key: "videlBot",
          code: "DR-004",
          led: "olive",
          summary: "Discord community bot handling server moderation, commands and audio queues.",
        },
      ],
      externalTitle: "External channels",
      externalChannels: [
        {
          channel: "Social announcements & changelogs",
          palette: "Vintage Ivory ground + Prism Cyan / Warm Orange tags",
          rule: "Use --ink-cyan for inline URLs and reserve Citrus Olive for shipped releases.",
        },
        {
          channel: "Launch posts & video thumbnails",
          palette: "Magnetic Black ground + Intense Magenta CTA",
          rule: "Pair with the Night Mode P monogram or Dark Room ajar mark depending on the product room.",
        },
        {
          channel: "Community & game updates",
          palette: "Magnetic Black + Veiled Spectrum",
          rule: "Keep announcements strictly inside Dark Room assets; omit the five-band beam.",
        },
      ],
      b2bTitle: "B2B client proposals",
      b2bNote:
        "Client proposals and service agreements stay monochrome on Vintage Ivory with --ink-cyan accents only. Omit Intense Magenta and include the Prism endorsement when referencing Dark Room capabilities.",
    },
    integrity: {
      title: "Integrity and QA",
      dontsTitle: "Prohibitions",
      donts: [
        "Don't reverse, reorder or drop any of the five bands.",
        "Don't render raw bright spectrum hex values as body text over Vintage Ivory.",
        "Don't add card borders or table outlines where background color already separates layers.",
        "Don't place the Prism symbol, monogram or five-band beam inside Dark Room public assets.",
        `Don't use pure ${NEUTRAL.black} black as the primary Dark Room ground; use Magnetic Black.`,
        "Don't substitute Geist or JetBrains Mono with unrelated display or serif fonts.",
      ],
      qaTitle: "Release QA checklist",
      qaChecklist: [
        "All five spectrum bands run left-to-right in exact Cyan, Olive, Yellow, Orange, Magenta order.",
        "Body and label text in both phases meets at least 4.5:1 WCAG contrast via --ink-* tokens.",
        "Prism icons at 16 to 119 px use the P monogram; marks above 120 px use the master symbol.",
        "Dark Room screens use Magnetic Black, Satin Metal text and the monochrome door mark.",
        "External links, downloads and PDF page anchors resolve cleanly in both English and Portuguese.",
      ],
    },
  },
};

const pt: ManualCopy = {
  edition: "Edição Canônica 2026",
  title: "Manual da Marca: Prism & Dark Room",
  subtitle:
    "Logos, substratos, papéis cromáticos, tipografia e checagens de qualidade para tudo o que sai pelos dois ambientes.",
  pdfFooterPrefix: "PRISM / DARK ROOM · MANUAL DA MARCA · PÁGINA",
  tocLabel: "Seções do manual",
  downloadLabel: "Baixar PDF",
  downloadEn: "PDF · Inglês",
  downloadPt: "PDF · Português",
  pdfPagePrefix: "PDF · p.",
  pageShort: "p.",
  sections: {
    cover: {
      title: "Capa",
      prismTitle: "Prism",
      prismCaption: "Estúdio-mãe · Substrato Marfim Vintage",
      darkRoomTitle: "Dark Room",
      darkRoomCaption: "Jogos e experimentos · Substrato Preto Magnético",
      backToAbout: "Voltar para Sobre",
    },
    architecture: {
      title: "Arquitetura",
      paragraphs: [
        "A Prism é o estúdio-mãe: software, dados e design. A Dark Room é a divisão de jogos e experimentos. As duas têm as mesmas cinco cores e ficam em lados opostos da luz.",
        "Cada ambiente mantém o próprio piso, os tokens de contraste e a escala tipográfica para que os softwares fiquem claros e legíveis enquanto os jogos sustentam um fundo analógico profundo.",
      ],
      substratesTitle: "Substratos",
      substrates: [
        {
          brand: "Prism",
          name: "Marfim Vintage",
          hex: NEUTRAL.marfim,
          use: "Piso principal para softwares, documentação e propostas comerciais. Evita o branco puro ofuscante.",
        },
        {
          brand: "Dark Room",
          name: "Preto Magnético",
          hex: NEUTRAL.tape,
          use: "Piso escuro de fita magnética para jogos, terminais e superfícies noturnas. Preto puro fica restrito a emuladores de terminal.",
        },
      ],
      segregationTitle: "Regra de segregação de marca",
      segregationRule:
        "Nunca coloque o símbolo da Prism, o monograma ou o feixe de cinco faixas dentro de produtos públicos da Dark Room. A Dark Room opera em monomarca monocromática com espectro velado e só aponta para a Prism pela chancela institucional.",
      endorsementLabel: "Chancela institucional",
      endorsementValue: "Dark Room · Um Estúdio Prism",
    },
    "prism-logo": {
      title: "Logo Prism",
      master: {
        name: "Símbolo Master Prism",
        scale: "Acima de 120 px",
        clearSpace: "1X nos quatro lados (1X equivale à largura da base do prisma)",
        note: "Use o símbolo completo de refração em heros, capas e impressos onde as cinco faixas aparecem com nitidez.",
      },
      monogram: {
        name: "Monograma P · Modo Claro",
        scale: "16 px a 119 px",
        clearSpace: "Igual à altura da letra P",
        glyph: NEUTRAL.graphic,
        substrate: NEUTRAL.marfim,
        note: "Substitui o símbolo master em favicons, cabeçalhos e selos compactos onde as faixas ficariam estreitas demais.",
      },
      nightMode: {
        name: "Monograma P · Modo Noturno",
        scale: "16 px a 119 px",
        clearSpace: "Igual à altura da letra P",
        glyph: NEUTRAL.marfim,
        substrate: NEUTRAL.tape,
        note: "Aplique o glifo em Marfim Vintage direto sobre Preto Magnético, sem adicionar placa clara atrás.",
      },
      lockup: {
        name: "Lockup Horizontal",
        rule: "Filete vertical de 1 px a 60% de opacidade entre símbolo e palavra",
        ratio: "Altura do símbolo alinhada à altura das maiúsculas com ascendentes",
        note: "Assinatura padrão para barra de navegação, rodapé e documentos formais.",
      },
      beamNote: `O traço do feixe incidente é fixo em Transição Metálica (${METAL.transition}) entrando pela esquerda.`,
    },
    "dark-room-logo": {
      title: "Logo Dark Room",
      statesTitle: "Estados da porta",
      states: [
        {
          key: "closed",
          door: 0,
          label: "Fechada (0.0)",
          description: "Arquivo trancado, hardware dormente ou estado de espera antes do lançamento.",
        },
        {
          key: "ajar",
          door: 0.5,
          label: "Entreaberta (0.5)",
          description: "Marca padrão do estúdio: revela a fresta vertical de luz dentro da câmara.",
        },
        {
          key: "open",
          door: 1,
          label: "Aberta (1.0)",
          description: "Lançamento ativo, travessia do portal ou sessão em andamento.",
        },
      ],
      metallic: {
        name: "Variante Metálica",
        substrate: NEUTRAL.tape,
        note: `Usa a rampa de Metal Acetinado (${METAL.highlight} até ${METAL.base}) em embalagens, capas de imprensa e apresentações B2B.`,
      },
      icon22: {
        name: "Ícone de App DR",
        radius: "Raio de borda de 22%",
        substrate: NEUTRAL.tape,
        note: `Marca DR centralizada sobre Preto Magnético (${NEUTRAL.tape}), sem fita espectral nem contorno externo.`,
      },
      clearSpace: {
        title: "Respiro e substrato",
        rule: "O respiro mínimo nos quatro lados equivale à largura da letra D.",
        substrateNote: `Aplique sempre sobre Preto Magnético (${NEUTRAL.tape}) ou ardósia escura (${NEUTRAL.charcoal}); nunca inverta sobre marfim.`,
      },
    },
    color: {
      title: "Sistema cromático",
      prismTitle: "Espectro Prism (esquerda para direita, 20% cada)",
      prismRows: [
        {
          key: "cyan",
          name: "Prism Cyan",
          hex: SPECTRUM.cyan,
          pantone: PRISM_PANTONE.cyan,
          role: "Links primários, dados técnicos e controles ativos",
        },
        {
          key: "olive",
          name: "Citrus Olive",
          hex: SPECTRUM.olive,
          pantone: PRISM_PANTONE.olive,
          role: "Projetos finalizados, entregas publicadas e documentação",
        },
        {
          key: "yellow",
          name: "Solar Yellow",
          hex: SPECTRUM.yellow,
          pantone: PRISM_PANTONE.yellow,
          role: "Prévias beta, avisos e marcadores de telemetria",
        },
        {
          key: "orange",
          name: "Warm Orange",
          hex: SPECTRUM.orange,
          pantone: PRISM_PANTONE.orange,
          role: "Versões, datas de lançamento e notas de hardware",
        },
        {
          key: "magenta",
          name: "Intense Magenta",
          hex: SPECTRUM.magenta,
          pantone: PRISM_PANTONE.magenta,
          role: "Ações decisivas, lançamentos e portal da Dark Room",
        },
      ],
      darkRoomTitle: "Espectro velado Dark Room",
      darkRoomRows: [
        {
          key: "cyan",
          name: "Abyssal Cyan",
          hex: VEIL.cyan,
          pantone: DARK_ROOM_PANTONE.cyan,
          role: "Isolamento frio, diagnósticos em espera e quadros dormentes",
        },
        {
          key: "olive",
          name: "Corrosive Olive",
          hex: VEIL.olive,
          pantone: DARK_ROOM_PANTONE.olive,
          role: "Registros antigos, matéria oxidada e versões legadas",
        },
        {
          key: "yellow",
          name: "Tarnished Amber",
          hex: VEIL.yellow,
          pantone: DARK_ROOM_PANTONE.yellow,
          role: "Filamento fraco, vigília e alertas latentes",
        },
        {
          key: "orange",
          name: "Burnt Oxide Orange",
          hex: VEIL.orange,
          pantone: DARK_ROOM_PANTONE.orange,
          role: "Desgaste mecânico, calor retido e hardware sob carga",
        },
        {
          key: "magenta",
          name: "Coagulated Magenta",
          hex: VEIL.magenta,
          pantone: DARK_ROOM_PANTONE.magenta,
          role: "Luz de segurança da câmara escura e quebras narrativas",
        },
      ],
      neutralsTitle: "Neutros e superfícies Prism",
      neutrals: [
        { name: "Marfim Vintage", hex: NEUTRAL.marfim, use: "Piso principal da página" },
        { name: "Marfim Contêiner", hex: SURFACE.prismGlass, use: "Painéis e cartões rebaixados" },
        { name: "Marfim Elevado", hex: SURFACE.prismElevated, use: "Hover e blocos elevados" },
        { name: "Tinta Gráfica", hex: NEUTRAL.graphic, use: "Texto principal e títulos" },
        { name: "Tinta Ardósia", hex: NEUTRAL.slate, use: "Prosa secundária" },
        { name: "Tinta Chumbo", hex: NEUTRAL.lead, use: "Legendas, códigos e rótulos" },
      ],
      metalTitle: "Neutros e metal acetinado Dark Room",
      metal: [
        { name: "Preto Magnético", hex: NEUTRAL.tape, use: "Piso escuro principal" },
        { name: "Carvão Contêiner", hex: NEUTRAL.charcoal, use: "Superfície de cartões e tabelas" },
        { name: "Brilho Metálico", hex: METAL.highlight, use: "Texto claro principal" },
        { name: "Núcleo Metálico", hex: METAL.core, use: "Texto claro secundário" },
        { name: "Transição Metálica", hex: METAL.transition, use: "Rótulos suaves e feixe do prisma" },
        { name: "Base Metálica", hex: METAL.base, use: "Superfícies elevadas Dark Room" },
      ],
    },
    "color-use": {
      title: "Uso das cores",
      intro:
        "As cores vivas da fita reprovam em contraste como texto sobre Marfim. Para texto, use as tintas --ink-* e guarde as vivas para pontos, barras e botões.",
      usageHeaders: {
        band: "Faixa",
        whenToUse: "Quando usar",
        whenToAvoid: "Quando evitar",
      },
      usageRows: [
        {
          key: "cyan",
          name: "Prism Cyan",
          hex: SPECTRUM.cyan,
          whenToUse: "Botões primários, anel de foco, barras de acento e seção ativa.",
          whenToAvoid: "Texto corrido pequeno sobre Marfim Vintage (use --ink-cyan).",
        },
        {
          key: "olive",
          name: "Citrus Olive",
          hex: SPECTRUM.olive,
          whenToUse: "LEDs de projeto finalizado, selos de entrega e etiquetas com tinta escura.",
          whenToAvoid: "Texto branco em cima do Citrus Olive ou hex vivo como texto no marfim.",
        },
        {
          key: "yellow",
          name: "Solar Yellow",
          hex: SPECTRUM.yellow,
          whenToUse: "LEDs de desenvolvimento em curso, prévias beta e etiquetas com texto escuro.",
          whenToAvoid: "Textos ou fios finos sobre fundos claros.",
        },
        {
          key: "orange",
          name: "Warm Orange",
          hex: SPECTRUM.orange,
          whenToUse: "Etiquetas de versão, marcos de lançamento e notas de hardware.",
          whenToAvoid: "Alertas de erro ou blocos longos de texto laranja.",
        },
        {
          key: "magenta",
          name: "Intense Magenta",
          hex: SPECTRUM.magenta,
          whenToUse: "Botões principais da Dark Room, anúncios de lançamento e ações decisivas.",
          whenToAvoid: "Contratos B2B, documentação técnica ou bordas decorativas.",
        },
      ],
      inkTitle: "Tintas acessíveis (--ink-*)",
      inkIntro: `Cada faixa do espectro possui um token --ink-* calibrado para leitura: escurecido sobre Marfim Vintage (${NEUTRAL.marfim}) e iluminado sobre Preto Magnético (${NEUTRAL.tape}) para cumprir WCAG AA (4,5:1).`,
      inkCols: {
        token: "Token",
        prismLabel: `Prism em ${NEUTRAL.marfim}`,
        darkRoomLabel: `Dark Room em ${NEUTRAL.tape}`,
        ratioLabel: "Contraste",
      },
    },
    type: {
      title: "Tipografia",
      geistSample: {
        label: "Geist · Fase Prism",
        heading: "GEIST 700 · +0,04EM",
        trackingPrism: "+0,04em a +0,08em em caixa-alta",
        body: "Geist Regular 400 conduz a leitura corrida, descrições de produto e documentação técnica sobre Marfim Vintage com espaçamento óptico limpo.",
        note: "Nunca misture fontes genéricas nos títulos; carregue Geist direto via next/font.",
      },
      darkRoomSample: {
        label: "Geist · Fase Dark Room",
        heading: "GEIST 700 · -0,01EM",
        trackingDarkRoom: "-0,01em em caixa-alta condensada",
        body: "Na Dark Room, o tracking dos títulos fecha para -0,01em sobre Preto Magnético enquanto Geist 400 mantém entrelinha 1,5 para logs legíveis.",
        note: "Combine com Brilho Metálico nos títulos e Núcleo Metálico no corpo.",
      },
      monoSample: {
        label: "JetBrains Mono",
        sample: `DR-001 · ${SPECTRUM.cyan} · ${INK.prism.cyan} · ${NEUTRAL.tape}`,
        note: "Reservada para códigos de catálogo, hexadecimais, referências Pantone, etiquetas de versão e rodapés do PDF.",
      },
      physicalMediaTitle: "Mídia física e embalagens",
      physicalMedia: [
        {
          label: "Papelaria Prism",
          spec: `Papel algodão sem revestimento de 350 a 600 g em Marfim Vintage (${NEUTRAL.marfim}) com baixo-relevo seco ou tinta preta em passe único.`,
        },
        {
          label: "Big Box VHS Dark Room",
          spec: `Luva de 190 x 105 x 30 mm em Preto Magnético (${NEUTRAL.tape}) com hot stamping prata acetinado e lombada codificada.`,
        },
        {
          label: "Selo de projeto finalizado",
          spec: `Indicador em Citrus Olive (${SPECTRUM.olive}) com código de versão em JetBrains Mono e texto em Tinta Gráfica (${NEUTRAL.graphic}).`,
        },
      ],
    },
    applications: {
      title: "Aplicações",
      prismTitle: "Catálogo de software Prism",
      prismIntro: "Utilitários e plataformas publicados sob a marca do estúdio Prism.",
      prismItems: [
        {
          key: "lumen",
          summary: "Rotina diária, blocos de foco e diário de sono no celular.",
        },
        {
          key: "rpgym",
          summary: "Registro de treinos estruturado como ficha de progressão de RPG.",
        },
        {
          key: "cartograph",
          summary: "Metabusca científica em 27 bases abertas com triagem PRISMA 2020.",
        },
        {
          key: "prismTranslate",
          summary: "Tradutor nativo na barra de menus do macOS acionado por atalho em qualquer campo.",
        },
      ],
      darkRoomTitle: "Catálogo Dark Room",
      darkRoomIntro:
        "Jogos, bots e ferramentas para console usam a monomarca sem o feixe da Prism. O LED oliva indica build público com link ativo; o LED amarelo indica projeto em desenvolvimento.",
      darkRoomItems: [
        {
          key: "limboOS",
          code: "DR-001",
          led: "olive",
          summary: "Sistema operacional diegético para campanhas de RPG de mesa e ARGs.",
        },
        {
          key: "route1",
          code: "DR-002",
          led: "olive",
          summary: "Preparador multiplataforma de cartões SD e firmware para Nintendo DSi.",
        },
        {
          key: "pokewalker",
          code: "DR-003",
          led: "yellow",
          summary: "Pedômetro no celular que converte passos diários em Watts para HeartGold e SoulSilver.",
        },
        {
          key: "videlBot",
          code: "DR-004",
          led: "olive",
          summary: "Bot de Discord para moderação de servidor, comandos e fila de música.",
        },
      ],
      externalTitle: "Canais externos",
      externalChannels: [
        {
          channel: "Notas de versão e comunicados",
          palette: "Fundo Marfim Vintage + etiquetas Prism Cyan / Warm Orange",
          rule: "Use --ink-cyan em links no texto e reserve Citrus Olive para entregas concluídas.",
        },
        {
          channel: "Lançamentos e capas de vídeo",
          palette: "Fundo Preto Magnético + chamada em Intense Magenta",
          rule: "Combine com o monograma P noturno ou com a porta entreaberta conforme o ambiente do produto.",
        },
        {
          channel: "Comunidade e atualizações de jogos",
          palette: "Preto Magnético + espectro velado",
          rule: "Mantenha todas as peças dentro da linguagem da Dark Room, sem o feixe de cinco cores.",
        },
      ],
      b2bTitle: "Propostas comerciais B2B",
      b2bNote:
        "Propostas e contratos comerciais permanecem monocromáticos sobre Marfim Vintage com acento pontual em --ink-cyan. Omita o Intense Magenta e inclua a chancela da Prism ao citar entregas da Dark Room.",
    },
    integrity: {
      title: "Integridade e QA",
      dontsTitle: "Proibições",
      donts: [
        "Não inverta, reordene nem omita nenhuma das cinco faixas.",
        "Não use o hex vivo do espectro como texto corrido sobre Marfim Vintage.",
        "Não adicione bordas em cartões ou contornos em tabelas quando a cor de fundo já separa os blocos.",
        "Não coloque o símbolo Prism, o monograma ou o feixe colorido em peças públicas da Dark Room.",
        "Não use preto puro como piso da Dark Room; mantenha o Preto Magnético.",
        "Não substitua Geist ou JetBrains Mono por outras famílias nos títulos ou códigos.",
      ],
      qaTitle: "Checklist de aprovação",
      qaChecklist: [
        "As cinco faixas seguem da esquerda para a direita em Cyan, Olive, Yellow, Orange e Magenta.",
        "Todo texto e rótulo nas duas fases cumpre contraste mínimo de 4,5:1 com os tokens --ink-*.",
        "Ícones Prism de 16 a 119 px usam o monograma P; acima de 120 px usam o símbolo master.",
        "Telas da Dark Room usam Preto Magnético, metal acetinado nos textos e a marca monocromática da porta.",
        "Links externos, downloads e âncoras de página do PDF funcionam em inglês e português.",
      ],
    },
  },
};

export const brandManualCopy: Record<Locale, ManualCopy> = { en, pt };

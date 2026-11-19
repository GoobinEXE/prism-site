import { siteUrl } from "@/lib/site";
import { absoluteUrl, siteName } from "@/lib/seo";
import { projects } from "@/lib/projects";
import { messages } from "@/lib/i18n/messages";
import brandManualPdf from "@/lib/brandManualPdf.json";

const ORG_ID = `${siteUrl}/#organization`;
const PERSON_ID = `${siteUrl}/behind-prism#person`;
const WEBSITE_ID = `${siteUrl}/#website`;
const DARK_ROOM_ID = `${siteUrl}/dark-room#organization`;

const github = "https://github.com/GoobinEXE";

export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "Prism",
      url: absoluteUrl("/"),
      logo: `${siteUrl}/assets/brand/prism-monogram-p.svg`,
      founder: { "@id": PERSON_ID },
      sameAs: [github],
      subOrganization: { "@id": DARK_ROOM_ID },
    },
    {
      "@type": "Organization",
      "@id": DARK_ROOM_ID,
      name: "Dark Room",
      url: absoluteUrl("/dark-room"),
      parentOrganization: { "@id": ORG_ID },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: siteName,
      url: absoluteUrl("/"),
      inLanguage: ["en", "pt-BR"],
      publisher: { "@id": ORG_ID },
    },
  ],
};

export const personGraph = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: absoluteUrl("/behind-prism"),
  mainEntity: {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Marcelo Pessoa de Aguiar Lopes",
    alternateName: "Marcelo Pessoa",
    url: absoluteUrl("/behind-prism"),
    jobTitle: "Founder, Prism",
    worksFor: { "@id": ORG_ID },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Curitiba",
      addressCountry: "BR",
    },
    sameAs: [github],
  },
};

const leads = messages.en.darkRoom.leads;

const app = (
  name: string,
  description: string,
  category: string,
  extra: Record<string, string> = {}
) => ({
  "@type": "SoftwareApplication",
  name,
  description,
  applicationCategory: category,
  ...extra,
});

export const darkRoomGraph = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Dark Room catalog",
  url: absoluteUrl("/dark-room"),
  itemListElement: [
    app(projects.limboOS.name, leads.limboOS, "GameApplication", {
      url: "https://terminalhubrpg.web.app",
      operatingSystem: "Web",
    }),
    app(projects.route1.name, leads.route1, "UtilitiesApplication", {
      operatingSystem: "Windows, macOS, Linux",
    }),
    app(projects.pokewalker.name, leads.pokewalker, "GameApplication"),
    app(projects.videlBot.name, leads.videlBot, "CommunicationApplication", {
      operatingSystem: "Discord",
    }),
  ].map((item, index) => ({ "@type": "ListItem", position: index + 1, item })),
};

export const aboutGraph = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: absoluteUrl("/about"),
  mainEntity: { "@id": ORG_ID },
};

export const brandManualGraph = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "Prism & Dark Room Brand Manual",
  url: absoluteUrl("/brand-manual"),
  inLanguage: ["en", "pt-BR"],
  publisher: { "@id": ORG_ID },
  encoding: [
    {
      "@type": "MediaObject",
      encodingFormat: "application/pdf",
      inLanguage: "en",
      contentUrl: absoluteUrl(brandManualPdf.en.pdf),
      contentSize: `${(brandManualPdf.en.bytes / 1_000_000).toFixed(1)} MB`,
    },
    {
      "@type": "MediaObject",
      encodingFormat: "application/pdf",
      inLanguage: "pt-BR",
      contentUrl: absoluteUrl(brandManualPdf.pt.pdf),
      contentSize: `${(brandManualPdf.pt.bytes / 1_000_000).toFixed(1)} MB`,
    },
  ],
};

export function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

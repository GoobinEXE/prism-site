export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  name: string;
  links: ProjectLink[];
};

const github = (repo: string): ProjectLink => ({
  label: "GitHub",
  href: `https://github.com/GoobinEXE/${repo}`,
});

export const projects = {
  lumen: { name: "Lumen", links: [github("Lumen")] },
  rpgym: { name: "RPGYM", links: [github("RPGYM")] },
  prismTranslate: {
    name: "Prism Translate",
    links: [
      github("Prisma-Tradutor"),
      { label: "TestFlight", href: "https://testflight.apple.com/join/xHt1sDEt" },
    ],
  },
  pokewalker: { name: "Pokéwalker Companion", links: [] },
  limboOS: {
    name: "LimboOS",
    links: [
      { label: "Web", href: "https://terminalhubrpg.web.app" },
      github("LimboOS"),
    ],
  },
  videlBot: { name: "VidelBOT", links: [github("VidelBOT")] },
  route1: { name: "Route 1 Kit", links: [github("Route1")] },
} satisfies Record<string, Project>;

export type ProjectKey = keyof typeof projects;

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const siteRoutes = ["/", "/solucoes", "/dark-room", "/sobre", "/por-tras-do-prism", "/contato"] as const;

export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

export const withBase = (path: string) => `${basePath}${path}`;

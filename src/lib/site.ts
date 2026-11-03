export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const siteRoutes = ["/", "/work", "/dark-room", "/about", "/behind-prism", "/contact"] as const;

export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

export const withBase = (path: string) => `${basePath}${path}`;

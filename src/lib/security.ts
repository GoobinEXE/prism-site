import { GA_ID } from "@/lib/analytics";
import { siteUrl } from "@/lib/site";

const ga = GA_ID
  ? {
      script: ["https://www.googletagmanager.com"],
      connect: [
        "https://*.google-analytics.com",
        "https://*.analytics.google.com",
        "https://www.googletagmanager.com",
      ],
      img: ["https://*.google-analytics.com", "https://www.googletagmanager.com"],
    }
  : { script: [], connect: [], img: [] };

const directives: Record<string, string[]> = {
  "default-src": ["'self'"],
  "script-src": ["'self'", "'unsafe-inline'", ...ga.script],
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": ["'self'", "data:", "blob:", ...ga.img],
  "font-src": ["'self'", "data:"],
  "connect-src": ["'self'", ...ga.connect],
  "frame-src": ["'none'"],
  "object-src": ["'none'"],
  "base-uri": ["'self'"],
  "form-action": ["'self'", "mailto:"],
  "manifest-src": ["'self'"],
  "worker-src": ["'self'"],
};

if (siteUrl.startsWith("https://")) directives["upgrade-insecure-requests"] = [];

export const contentSecurityPolicy = Object.entries(directives)
  .map(([key, values]) => [key, ...values].join(" "))
  .join("; ");

export const cspEnabled = process.env.NODE_ENV === "production";

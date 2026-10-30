import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: process.env.PAGES_BASE_PATH || undefined,
  env: { NEXT_PUBLIC_BASE_PATH: process.env.PAGES_BASE_PATH ?? "" },
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

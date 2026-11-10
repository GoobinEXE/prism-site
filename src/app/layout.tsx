import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { basePath, siteUrl } from "@/lib/site";
import { localeBootScript } from "@/lib/i18n/locale";
import { Geist, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactFab } from "@/components/ContactFab";
import { ThemeSync } from "@/components/ThemeSync";
import { ChamberProvider } from "@/components/ChamberProvider";
import { PageTransition } from "@/components/PageTransition";
import { LocaleProvider } from "@/components/LocaleProvider";
import { LocaleDocument } from "@/components/LocaleDocument";
import { SkipLink } from "@/components/SkipLink";
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { siteGraph } from "@/lib/structuredData";
import { absoluteUrl, shareImages, siteName } from "@/lib/seo";
import { contentSecurityPolicy, cspEnabled } from "@/lib/security";
import "./globals.css";
import { NEUTRAL } from "@/lib/brandTokens";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const description =
  "Prism builds mobile apps, desktop software and web apps. Dark Room is home to the games and experimental projects.";

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: siteName,
    template: "%s · Prism",
  },
  description,
  authors: [{ name: "Marcelo Pessoa", url: absoluteUrl("/behind-prism") }],
  creator: "Marcelo Pessoa",
  publisher: "Prism",
  referrer: "strict-origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  ...(googleVerification
    ? { verification: { google: googleVerification } }
    : {}),
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["pt_BR"],
    siteName,
    title: siteName,
    description,
    images: [shareImages.prism],
  },
  twitter: { card: "summary_large_image", images: [shareImages.prism] },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: NEUTRAL.marfim },
    { media: "(prefers-color-scheme: dark)", color: NEUTRAL.tape },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-phase="prism"
      className={`${geist.variable} ${jetbrains.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {cspEnabled ? (
          <meta httpEquiv="Content-Security-Policy" content={contentSecurityPolicy} />
        ) : null}
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <Script id="phase-boot" strategy="beforeInteractive">
          {`(function(){var p=location.pathname.slice(${basePath.length});document.documentElement.setAttribute("data-phase",p==="/dark-room"||p.indexOf("/dark-room/")===0?"dark-room":"prism");})();`}
        </Script>
        <Script id="locale-boot" strategy="beforeInteractive">
          {localeBootScript}
        </Script>
        <JsonLd data={siteGraph} />
        <Analytics />
        <LocaleProvider>
          <SkipLink />
          <LocaleDocument />
          <ChamberProvider>
            <ThemeSync />
            <Header />
            <PageTransition>
              <main id="content" className="flex flex-1 flex-col">
                {children}
              </main>
            </PageTransition>
            <Footer />
            <ContactFab />
          </ChamberProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}

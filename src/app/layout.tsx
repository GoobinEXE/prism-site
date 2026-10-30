import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { siteUrl } from "@/lib/site";
import { Geist, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactFab } from "@/components/ContactFab";
import { ThemeSync } from "@/components/ThemeSync";
import { ChamberProvider } from "@/components/ChamberProvider";
import { PageTransition } from "@/components/PageTransition";
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
  "A Prism faz apps, softwares para desktop e web apps. A Dark Room cuida dos jogos e dos projetos experimentais.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Prism & Dark Room",
    template: "%s · Prism",
  },
  description,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Prism & Dark Room",
    title: "Prism & Dark Room",
    description,
  },
  twitter: { card: "summary_large_image" },
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
      lang="pt-BR"
      data-phase="prism"
      className={`${geist.variable} ${jetbrains.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col font-sans">
        <Script id="phase-boot" strategy="beforeInteractive">
          {`(function(){var p=location.pathname;document.documentElement.setAttribute("data-phase",p==="/dark-room"||p.indexOf("/dark-room/")===0?"dark-room":"prism");})();`}
        </Script>
        <a href="#conteudo" className="skip-link">
          Ir para o conteúdo
        </a>
        <ChamberProvider>
          <ThemeSync />
          <Header />
          <PageTransition>
            <main id="conteudo" className="flex flex-1 flex-col">
              {children}
            </main>
          </PageTransition>
          <Footer />
          <ContactFab />
        </ChamberProvider>
      </body>
    </html>
  );
}

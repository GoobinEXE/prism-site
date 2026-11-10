import Script from "next/script";
import { GA_ID, gaBootScript } from "@/lib/analytics";

export function Analytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-boot" strategy="afterInteractive">
        {gaBootScript}
      </Script>
    </>
  );
}

"use client";

import Script from "next/script";
import { siteConfig } from "@/config/site";

export function AnalyticsScripts() {
  const { ga4Id, googleAdsId, metaPixelId } = siteConfig.analytics;
  const hasGa = Boolean(ga4Id);
  const hasAds = Boolean(googleAdsId);
  const hasMeta = Boolean(metaPixelId);

  if (!hasGa && !hasAds && !hasMeta) return null;

  return (
    <>
      {hasGa ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga4Id}', { send_page_view: true });
              ${hasAds ? `gtag('config', '${googleAdsId}');` : ""}
            `}
          </Script>
        </>
      ) : null}
      {hasMeta ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
            (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      ) : null}
    </>
  );
}

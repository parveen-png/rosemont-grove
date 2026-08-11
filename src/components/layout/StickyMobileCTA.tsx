"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone/40 bg-ivory/95 backdrop-blur-md px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden">
      <div className="grid grid-cols-2 gap-3">
        <a
          href={siteConfig.phoneHref}
          className="inline-flex min-h-11 items-center justify-center border border-stone/70 text-[0.72rem] tracking-[0.18em] uppercase text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          onClick={() => trackEvent("phone_click", { location: "sticky_mobile" })}
        >
          Call
        </a>
        <Link
          href="/#private-access"
          className="inline-flex min-h-11 items-center justify-center bg-ink text-[0.72rem] tracking-[0.18em] uppercase text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          onClick={() =>
            trackEvent("pricing_request", { location: "sticky_mobile" })
          }
        >
          Private Access
        </Link>
      </div>
    </div>
  );
}

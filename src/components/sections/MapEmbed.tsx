"use client";

import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

export function MapEmbed() {
  const query = encodeURIComponent(siteConfig.projectAddress.mapQuery);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
  const embedUrl = `https://maps.google.com/maps?q=${query}&z=14&output=embed`;

  return (
    <div className="overflow-hidden border border-stone/40 bg-cream/40">
      <div className="relative aspect-[4/3] bg-stone/20">
        <iframe
          title="Map of Rosemont Grove location at Heritage Road and Steeles Avenue West, Brampton"
          src={embedUrl}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-5 py-4">
        <p className="text-sm text-charcoal/80">
          {siteConfig.projectAddress.intersection}
          <br />
          Brampton, Ontario
        </p>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center border border-ink px-5 text-[0.72rem] tracking-[0.18em] uppercase text-ink hover:bg-ink hover:text-ivory transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          onClick={() => trackEvent("map_click")}
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}

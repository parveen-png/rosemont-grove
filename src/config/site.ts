/**
 * Central site configuration — brokerage/operator identity and integrations.
 * Update these values for production; do not scatter business details in components.
 */

export const siteConfig = {
  projectName: "Rosemont Grove",
  builderName: "Hallett Homes",
  builderUrl: "https://www.hallethomes.ca",

  /** Independent brokerage / sales representative operating this website */
  brokerageName: "Your Brokerage Name",
  agentName: "Your Agent Name",
  phone: "+1 (905) 555-0100",
  phoneHref: "tel:+19055550100",
  email: "info@example.com",
  address: {
    street: "Update Office Address",
    city: "Brampton",
    province: "ON",
    postalCode: "",
    country: "Canada",
  },

  /** Production canonical origin — set NEXT_PUBLIC_SITE_URL in production */
  websiteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://rosemontgrovebrampton.com",

  socialLinks: {
    facebook: "",
    instagram: "",
    linkedin: "",
    x: "",
  },

  projectAddress: {
    intersection: "Heritage Road & Steeles Avenue West",
    city: "Brampton",
    province: "Ontario",
    region: "Peel Region",
    country: "Canada",
    /** Approximate community location for map links — refine when verified */
    mapQuery: "Heritage Road & Steeles Avenue West, Brampton, Ontario",
    coordinates: {
      lat: 43.6505,
      lng: -79.7805,
    },
  },

  analytics: {
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID || "",
    googleAdsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "",
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
  },

  form: {
    /** Server-only recipient — also configurable via LEAD_NOTIFICATION_EMAIL */
    notificationEmail:
      process.env.LEAD_NOTIFICATION_EMAIL || "info@example.com",
  },

  contentReviewedAt: "2026-08-10",

  legal: {
    independentDisclaimer:
      "This website is an independent real estate marketing website and is not the official website of Hallett Homes. Project information, pricing, availability, specifications and incentives are subject to change without notice. Images and renderings may be artist's concepts or atmospheric photography used for illustration. Please contact us for current information.",
  },
} as const;

export type SiteConfig = typeof siteConfig;

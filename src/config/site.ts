/**
 * Central site configuration — operator identity and integrations.
 * Public contact details are intentionally omitted; leads use the registration form.
 */

export const siteConfig = {
  projectName: "Rosemont Grove",
  builderName: "Hallett Homes",
  builderUrl: "https://www.hallethomes.ca",

  /** Independent brokerage / sales representation (not shown publicly as contact details) */
  brokerageName: "Independent Real Estate Agents",
  agentName: "",
  phone: "",
  phoneHref: "",
  email: "",
  address: {
    street: "",
    city: "Brampton",
    province: "ON",
    postalCode: "",
    country: "Canada",
  },

  /** Production canonical origin — set NEXT_PUBLIC_SITE_URL in production */
  websiteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://rosemontgrovehallethomes.com",

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
    notificationEmail: process.env.LEAD_NOTIFICATION_EMAIL || "",
  },

  contentReviewedAt: "2026-08-10",

  legal: {
    independentDisclaimer:
      "This website is operated by independent real estate agents and is not the official website of Hallett Homes. We are not the builders of Rosemont Grove and do not represent ourselves as the builder. Project information, pricing, availability, specifications and incentives are subject to change without notice. Images and renderings may be artist's concepts. Please use the registration form on this website for current information.",
  },
} as const;

export type SiteConfig = typeof siteConfig;

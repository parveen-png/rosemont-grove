import { siteConfig } from "@/config/site";
import { project } from "@/data/project";
import { faqItems } from "@/data/faq";
import { absoluteUrl } from "@/lib/utils";

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${project.name} Brampton`,
    url: absoluteUrl("/"),
    description: project.answerDescription,
    publisher: {
      "@type": "Organization",
      name: "Independent Real Estate Marketing Website",
      url: absoluteUrl("/"),
      description:
        "Independent real estate agents operating an unofficial marketing website for Rosemont Grove. Not the builder and not the official Hallett Homes website.",
    },
  };
}

export function webPageJsonLd(input: {
  name: string;
  description: string;
  path?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path || "/"),
    isPartOf: {
      "@type": "WebSite",
      name: `${project.name} Brampton`,
      url: absoluteUrl("/"),
    },
    about: {
      "@type": "Place",
      name: project.name,
      description: project.shortDescription,
      address: {
        "@type": "PostalAddress",
        addressLocality: project.city,
        addressRegion: "ON",
        addressCountry: "CA",
        streetAddress: project.intersection,
      },
    },
  };
}

export function placeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: project.name,
    description: project.answerDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: project.intersection,
      addressLocality: project.city,
      addressRegion: "ON",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.projectAddress.coordinates.lat,
      longitude: siteConfig.projectAddress.coordinates.lng,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Independent Real Estate Marketing Website",
    url: absoluteUrl("/"),
    description: siteConfig.legal.independentDisclaimer,
  };
}

export function faqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function homeStructuredData() {
  return [
    websiteJsonLd(),
    webPageJsonLd({
      name: `${project.name} | Luxury Detached Homes in Brampton`,
      description: project.answerDescription,
      path: "/",
    }),
    placeJsonLd(),
    organizationJsonLd(),
    faqPageJsonLd(),
  ];
}

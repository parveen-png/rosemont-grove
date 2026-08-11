import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { project } from "@/data/project";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  breadcrumbJsonLd,
  organizationJsonLd,
  webPageJsonLd,
} from "@/lib/seo/structured-data";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.brokerageName} for Rosemont Grove pricing, floor plans, registration, and appointment requests in Brampton.`,
  alternates: { canonical: absoluteUrl("/contact") },
  openGraph: {
    title: "Contact | Rosemont Grove Brampton",
    url: absoluteUrl("/contact"),
  },
};

export default function ContactPage() {
  return (
    <div className="bg-ivory pt-28 pb-20 sm:pt-32 sm:pb-28">
      <StructuredData
        data={[
          webPageJsonLd({
            name: "Contact Rosemont Grove Team",
            description: `Contact information for independent ${project.name} registration support.`,
            path: "/contact",
          }),
          organizationJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <Container>
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Contact" },
          ]}
        />
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h1 className="font-display text-4xl sm:text-5xl text-ink">
              Contact Our Rosemont Grove Team
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-charcoal/85">
              Request pricing, floor plans, incentives, and appointment
              availability for {project.name} — a limited collection of 38′ and
              41′ detached homes by {project.builder} in {project.city}.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/#private-access">Request Private Access</Button>
              <Button href={siteConfig.phoneHref} variant="secondary">
                Call {siteConfig.phone}
              </Button>
            </div>
          </div>

          <address className="not-italic border border-stone/40 bg-cream/40 p-7 sm:p-9">
            <p className="text-[0.68rem] tracking-[0.22em] uppercase text-taupe">
              Independent Sales Representation
            </p>
            <p className="mt-3 font-display text-3xl text-ink">
              {siteConfig.brokerageName}
            </p>
            <p className="mt-2 text-charcoal/80">{siteConfig.agentName}</p>
            <div className="mt-6 space-y-2 text-base text-charcoal">
              <p>
                <a
                  href={siteConfig.phoneHref}
                  className="underline-offset-4 hover:underline"
                >
                  {siteConfig.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="underline-offset-4 hover:underline"
                >
                  {siteConfig.email}
                </a>
              </p>
              <p className="pt-2 text-sm text-taupe leading-relaxed">
                {siteConfig.address.street}
                <br />
                {siteConfig.address.city}, {siteConfig.address.province}
                {siteConfig.address.postalCode
                  ? ` ${siteConfig.address.postalCode}`
                  : ""}
              </p>
            </div>
            <p className="mt-8 text-sm leading-relaxed text-taupe">
              Project location: {project.locationLabel}
            </p>
          </address>
        </div>
      </Container>
    </div>
  );
}

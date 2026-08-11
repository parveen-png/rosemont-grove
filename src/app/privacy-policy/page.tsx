import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { project } from "@/data/project";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { StructuredData } from "@/components/seo/StructuredData";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/structured-data";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for the independent ${project.name} registration website operated by ${siteConfig.brokerageName}.`,
  alternates: { canonical: absoluteUrl("/privacy-policy") },
  openGraph: {
    title: "Privacy Policy | Rosemont Grove",
    url: absoluteUrl("/privacy-policy"),
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-ivory pt-28 pb-20 sm:pt-32 sm:pb-28">
      <StructuredData
        data={[
          webPageJsonLd({
            name: "Privacy Policy",
            description: `Privacy policy for the independent ${project.name} website.`,
            path: "/privacy-policy",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Privacy Policy", path: "/privacy-policy" },
          ]),
        ]}
      />
      <Container>
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Privacy Policy" },
          ]}
        />
        <article className="max-w-3xl">
          <h1 className="font-display text-4xl sm:text-5xl text-ink">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-taupe">
            Last updated: {siteConfig.contentReviewedAt}
          </p>

          <div className="mt-10 space-y-8 text-base leading-relaxed text-charcoal/85">
            <section>
              <h2 className="font-display text-2xl text-ink">Who we are</h2>
              <p className="mt-3">
                This website is an independent real estate marketing website
                operated by {siteConfig.brokerageName}
                {siteConfig.agentName ? ` (${siteConfig.agentName})` : ""}. It is
                not the official website of {project.builder}. Contact:{" "}
                <a className="underline underline-offset-4" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>{" "}
                ·{" "}
                <a className="underline underline-offset-4" href={siteConfig.phoneHref}>
                  {siteConfig.phone}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink">
                Information we collect
              </h2>
              <p className="mt-3">
                When you submit the private-access form, we collect the details
                you provide, which may include first name, last name, email,
                phone number, realtor status, buying timeframe, preferred home
                type, and message content. We may also store non-sensitive
                attribution data such as UTM parameters, landing page path, and
                referrer when present.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink">
                Why we collect it
              </h2>
              <p className="mt-3">
                We use submitted information to respond to registration and
                information requests about {project.name}, share available
                pricing/floor-plan materials when appropriate, schedule
                appointments, and improve our response quality. Consent is
                requested at the point of form submission.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink">
                Analytics and cookies
              </h2>
              <p className="mt-3">
                If analytics or advertising identifiers are configured by the
                site operator, aggregate usage analytics (for example page views
                and conversion events) may be collected through tools such as
                Google Analytics, Google Ads, or Meta Pixel. These tools are only
                activated when corresponding IDs are configured. Browser settings
                can be used to manage cookies where applicable.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink">
                Third-party services
              </h2>
              <p className="mt-3">
                Lead submissions may be delivered to the operator’s email inbox
                and/or a configured CRM webhook. Map embeds may load content from
                Google Maps. Builder links may direct you to{" "}
                <a
                  href={project.builderUrl}
                  className="underline underline-offset-4"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {project.builder}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink">Your choices</h2>
              <p className="mt-3">
                You may contact us to request access, correction, or deletion of
                personal information we hold about you, subject to applicable law
                and legitimate business retention needs. Email{" "}
                <a className="underline underline-offset-4" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink">Disclaimer</h2>
              <p className="mt-3">{siteConfig.legal.independentDisclaimer}</p>
            </section>

            <p>
              Return to the{" "}
              <Link href="/" className="underline underline-offset-4">
                Rosemont Grove overview
              </Link>
              .
            </p>
          </div>
        </article>
      </Container>
    </div>
  );
}

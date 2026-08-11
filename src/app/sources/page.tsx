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
  title: "Sources",
  description: `Editorial sources and transparency notes for verified ${project.name} project information.`,
  alternates: { canonical: absoluteUrl("/sources") },
  openGraph: {
    title: "Sources | Rosemont Grove",
    url: absoluteUrl("/sources"),
  },
};

export default function SourcesPage() {
  return (
    <div className="bg-ivory pt-28 pb-20 sm:pt-32 sm:pb-28">
      <StructuredData
        data={[
          webPageJsonLd({
            name: "Sources",
            description: `Sources for verified ${project.name} information.`,
            path: "/sources",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Sources", path: "/sources" },
          ]),
        ]}
      />
      <Container>
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Sources" },
          ]}
        />
        <article className="max-w-3xl">
          <h1 className="font-display text-4xl sm:text-5xl text-ink">
            Sources & References
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-charcoal/85">
            This page documents the factual basis for project claims published on
            this independent {project.name} resource. Unconfirmed details such as
            pricing, incentives, occupancy dates, and model specifications are
            not invented and are instead offered upon registration.
          </p>

          <ul className="mt-12 space-y-8">
            {project.sources.map((source) => (
              <li key={source.id} className="border-t border-stone/40 pt-6">
                <h2 className="font-display text-2xl text-ink">{source.title}</h2>
                <p className="mt-3 text-base leading-relaxed text-charcoal/85">
                  {source.description}
                </p>
                {source.url ? (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex text-sm underline underline-offset-4"
                  >
                    {source.url}
                  </a>
                ) : null}
              </li>
            ))}
          </ul>

          <section className="mt-12 border-t border-stone/40 pt-8">
            <h2 className="font-display text-2xl text-ink">Review date</h2>
            <p className="mt-3 text-charcoal/85">
              Project information last reviewed: {siteConfig.contentReviewedAt}
            </p>
            <p className="mt-6 text-sm text-taupe leading-relaxed">
              {siteConfig.legal.independentDisclaimer}
            </p>
            <p className="mt-6">
              <Link href="/" className="underline underline-offset-4">
                Back to Rosemont Grove
              </Link>
            </p>
          </section>
        </article>
      </Container>
    </div>
  );
}

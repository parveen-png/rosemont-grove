import { project } from "@/data/project";
import { Container, SectionHeading } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function SourceReferences() {
  return (
    <section
      className="bg-cream/50 py-16 sm:py-20 border-t border-stone/30"
      aria-labelledby="sources-heading"
    >
      <Container>
        <SectionHeading
          eyebrow="Transparency"
          title="Sources & Editorial Notes"
          description="Factual claims on this site are limited to verified project information. Pricing, incentives, occupancy, and availability require registration for current details."
        />

        <ul id="sources-heading" className="mt-10 space-y-6 max-w-3xl">
          {project.sources.map((source) => (
            <li key={source.id} className="border-l border-olive pl-5">
              <h3 className="font-display text-xl text-ink">{source.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/80">
                {source.description}
              </p>
              {source.url ? (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex text-sm underline underline-offset-4 text-ink hover:text-olive focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  Visit source
                </a>
              ) : null}
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Button href="/sources" variant="secondary">
            View Full Sources Page
          </Button>
        </div>
      </Container>
    </section>
  );
}

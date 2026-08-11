import { project } from "@/data/project";
import { Container, SectionHeading } from "@/components/ui/Container";

export function ProjectOverview() {
  return (
    <section
      className="bg-cream/50 py-20 sm:py-24 border-y border-stone/30"
      aria-labelledby="details-heading"
    >
      <Container>
        <SectionHeading
          eyebrow="Project Details"
          title="Rosemont Grove at a Glance"
          description="Verified community facts presented for clarity — pricing, floor plans, and release timing are available through private registration."
        />

        <dl
          id="details-heading"
          className="mt-12 grid gap-px bg-stone/40 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden"
        >
          {project.overviewFields.map((field) => (
            <div
              key={field.label}
              className="bg-ivory px-6 py-7 sm:px-8 sm:py-8"
            >
              <dt className="text-[0.68rem] tracking-[0.22em] uppercase text-taupe">
                {field.label}
              </dt>
              <dd className="mt-3 font-display text-xl sm:text-2xl text-ink leading-snug">
                {field.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

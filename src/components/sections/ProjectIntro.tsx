import { project } from "@/data/project";
import { Container, SectionHeading } from "@/components/ui/Container";

export function ProjectIntro() {
  return (
    <section
      id="overview"
      className="scroll-mt-28 bg-ivory py-20 sm:py-28"
      aria-labelledby="overview-heading"
    >
      <Container>
        <div id="overview-heading">
          <SectionHeading
            eyebrow="Quick Answer"
            title="What Is Rosemont Grove in Brampton?"
            as="h2"
          />
        </div>
        <div className="mt-8 max-w-3xl">
          <p className="text-lg sm:text-xl leading-relaxed text-charcoal">
            {project.answerDescription}
          </p>
          <p className="mt-6 text-base leading-relaxed text-charcoal/80">
            Designed as a limited luxury enclave, Rosemont Grove emphasizes
            craftsmanship, architectural refinement, and a permanent residential
            setting shaped by greenery and privacy — rather than a dense
            high-rise community.
          </p>
        </div>
      </Container>
    </section>
  );
}

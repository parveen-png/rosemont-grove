import Image from "next/image";
import { project } from "@/data/project";
import { Container, SectionHeading } from "@/components/ui/Container";

export function LifestyleSection() {
  const woodland = project.images.hero;
  const interior = project.images.interior;

  return (
    <section
      className="bg-charcoal text-ivory py-20 sm:py-28"
      aria-labelledby="lifestyle-heading"
    >
      <Container>
        <SectionHeading
          tone="dark"
          eyebrow="Natural Setting"
          title="Luxury, Surrounded by Nature"
          description="Rosemont Grove is positioned amid natural heritage woodlands, greenery, and a meandering creek within the Credit River Valley environment — a quieter residential character for a limited detached enclave."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <figure className="relative lg:col-span-7 aspect-[16/11] overflow-hidden">
            <Image
              src={woodland.src}
              alt={woodland.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
          </figure>
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <figure className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={interior.src}
                alt={interior.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover"
              />
            </figure>
            <div className="space-y-5 text-base leading-relaxed text-cream/80">
              <p id="lifestyle-heading">
                Privacy and permanence are part of the positioning: an intimate
                scale of 59 residences, generous detached living, and a setting
                defined by trees, creek corridors, and established surroundings.
              </p>
              <p>
                The community is intended for households who want architectural
                elegance without leaving the practical geography of West
                Brampton — greenery close at hand, urban amenities reachable via
                major corridors.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

import Image from "next/image";
import { project } from "@/data/project";
import { Container, SectionHeading } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Residences() {
  const image = project.images.architecture;

  return (
    <section
      id="residences"
      className="scroll-mt-28 bg-ivory py-20 sm:py-28"
      aria-labelledby="residences-heading"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Residences"
              title="38′ & 41′ Signature Detached Residences"
            />
            <div className="mt-8 space-y-5 text-base sm:text-lg leading-relaxed text-charcoal/85">
              <p id="residences-heading">
                Rosemont Grove is planned as a limited collection of signature
                detached residences on 38′ and 41′ lots — sized for family living
                with the architectural composure expected of a Hallett Homes
                community.
              </p>
              <p>
                The emphasis is individuality and craftsmanship: thoughtful
                layouts, premium finishes, and elevations intended to feel
                permanent rather than provisional. These are homes designed for
                everyday life at a luxury standard — privacy, proportion, and
                refinement without theatrical excess.
              </p>
              <p>
                Floor plans and specifications are available upon request.
                Register for private access to receive current model information,
                pricing guidance, and release details.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.lotSizes.map((size) => (
                <span
                  key={size}
                  className="inline-flex min-h-11 items-center border border-stone/60 px-5 text-[0.72rem] tracking-[0.18em] uppercase text-ink"
                >
                  {size} Detached
                </span>
              ))}
            </div>

            <div className="mt-8">
              <Button href="/#private-access">Request Pricing & Floor Plans</Button>
            </div>
          </div>

          <figure className="relative aspect-[4/5] overflow-hidden bg-stone/20">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover transition-transform duration-700 motion-safe:hover:scale-[1.03]"
            />
            <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink/70 to-transparent p-5 text-[0.65rem] tracking-[0.14em] uppercase text-cream/80">
              Illustrative architectural atmosphere
            </figcaption>
          </figure>
        </div>

        {project.floorPlans.length === 0 ? (
          <aside className="mt-16 border border-stone/40 bg-cream/40 px-6 py-8 sm:px-10">
            <h3 className="font-display text-2xl text-ink">
              Floor Plans Available Upon Request
            </h3>
            <p className="mt-3 max-w-2xl text-charcoal/80 leading-relaxed">
              Detailed model packages, elevations, and downloadable plans will be
              shared with registered buyers and realtors. Request private access
              for the latest floor plans and incentives.
            </p>
          </aside>
        ) : null}
      </Container>
    </section>
  );
}

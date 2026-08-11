import Image from "next/image";
import { project } from "@/data/project";
import { Container, SectionHeading } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const residenceShowcases = [
  {
    image: project.images.rendering38,
    title: "38′ Signature Detached",
    description:
      "A refined detached residence scaled for elevated family living, with architectural composure and premium exterior detailing.",
  },
  {
    image: project.images.rendering41,
    title: "41′ Signature Detached",
    description:
      "A generously proportioned detached elevation with stone, craftsmanship, and the quiet luxury expected of a Hallett collection home.",
  },
] as const;

export function Residences() {
  return (
    <section
      id="residences"
      className="scroll-mt-28 bg-ivory py-20 sm:py-28"
      aria-labelledby="residences-heading"
    >
      <Container>
        <SectionHeading
          eyebrow="Residences"
          title="38′ & 41′ Signature Detached Residences"
          description="Rosemont Grove is planned as a limited collection of signature detached residences on 38′ and 41′ lots — sized for family living with the architectural composure expected of a Hallett Homes community."
        />

        <div
          id="residences-heading"
          className="mt-12 grid gap-8 lg:grid-cols-2"
        >
          {residenceShowcases.map((item) => (
            <article key={item.title} className="group">
              <figure className="relative aspect-[6/5] overflow-hidden bg-stone/20">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.03]"
                />
              </figure>
              <h3 className="mt-5 font-display text-2xl text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-charcoal/85">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 max-w-3xl space-y-5 text-base sm:text-lg leading-relaxed text-charcoal/85">
          <p>
            The emphasis is individuality and craftsmanship: thoughtful layouts,
            premium finishes, and elevations intended to feel permanent rather
            than provisional. These are homes designed for everyday life at a
            luxury standard — privacy, proportion, and refinement without
            theatrical excess.
          </p>
          <p>
            Floor plans and specifications are available upon request. Register
            for private access to receive current model information, pricing
            guidance, and release details.
          </p>
        </div>

        <div className="mt-8">
          <Button href="/#private-access">Request Pricing & Floor Plans</Button>
        </div>

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
      </Container>
    </section>
  );
}

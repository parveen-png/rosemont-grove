import Image from "next/image";
import { project } from "@/data/project";
import { Container, SectionHeading } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function BuilderSection() {
  const image = project.images.streetscape;

  return (
    <section
      id="builder"
      className="scroll-mt-28 bg-cream/40 py-20 sm:py-28 border-y border-stone/30"
      aria-labelledby="builder-heading"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <figure className="relative aspect-[5/4] overflow-hidden order-2 lg:order-1">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </figure>

          <div className="order-1 lg:order-2">
            <div className="mb-8">
              <Image
                src="/brand/hallett-homes-logo.svg"
                alt="Hallett Homes logo"
                width={142}
                height={80}
                className="h-10 w-auto"
              />
            </div>
            <SectionHeading
              eyebrow="The Builder"
              title="Built by Hallett Homes"
            />
            <div className="mt-8 space-y-5 text-base sm:text-lg leading-relaxed text-charcoal/85">
              <p id="builder-heading">
                Rosemont Grove is being built by Hallett Homes, a luxury GTA home
                builder recognized for architectural individuality, upscale
                design, and a craftsmanship-led approach to detached living.
              </p>
              <p>
                Hallett communities emphasize thoughtful floor plans, premium
                finishes, and a personalized homebuilding experience — aligning
                with Rosemont Grove’s positioning as a refined, limited enclave
                rather than a volume subdivision.
              </p>
            </div>

            <blockquote className="mt-8 border-l border-olive pl-5 text-charcoal/90">
              <p className="font-display text-xl sm:text-2xl leading-snug">
                Craftsmanship, refinement, and architectural elegance define the
                Hallett Homes approach to signature detached residences.
              </p>
            </blockquote>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                href={project.builderUrl}
                external
                variant="secondary"
              >
                Visit Hallett Homes
              </Button>
              <Button href="/#private-access">Speak With Our Team</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

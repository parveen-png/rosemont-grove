import Image from "next/image";
import { siteConfig } from "@/config/site";
import { project } from "@/data/project";
import { Container, SectionHeading } from "@/components/ui/Container";
import { MapEmbed } from "@/components/sections/MapEmbed";

export function LocationSection() {
  const aerial = project.images.aerial;

  return (
    <section
      id="location"
      className="scroll-mt-28 bg-ivory py-20 sm:py-28"
      aria-labelledby="location-heading"
    >
      <Container>
        <SectionHeading
          eyebrow="Location"
          title="A Coveted West Brampton Location"
          description="Rosemont Grove is located at Heritage Road & Steeles Avenue West, Brampton, Ontario — a West Brampton address with access toward Mississauga and the western GTA."
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <h3
              id="location-heading"
              className="font-display text-2xl sm:text-3xl text-ink"
            >
              Heritage Road & Steeles Avenue West
            </h3>
            <p className="mt-2 text-taupe tracking-[0.08em] uppercase text-sm">
              Brampton, Ontario · Peel Region
            </p>
            <p className="mt-6 text-base leading-relaxed text-charcoal/85">
              The community sits where established residential character meets
              natural heritage woodlands and creek corridors. Major road access
              includes Heritage Road and Steeles Avenue West, with regional
              connectivity toward the Highway 401 and Highway 407 corridors.
            </p>

            <figure className="relative mt-8 aspect-[3/4] overflow-hidden bg-stone/20">
              <Image
                src={aerial.src}
                alt={aerial.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
              <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink/75 to-transparent p-4 text-[0.65rem] tracking-[0.14em] uppercase text-cream/85">
                Site context at Heritage Rd. & Steeles Ave. W.
              </figcaption>
            </figure>
          </div>

          <div className="space-y-8">
            <MapEmbed />
            <div className="grid gap-8 sm:grid-cols-2">
              {project.nearbyCategories.map((category) => (
                <div key={category.title}>
                  <h4 className="text-[0.68rem] tracking-[0.22em] uppercase text-taupe">
                    {category.title}
                  </h4>
                  <ul className="mt-4 space-y-2 text-sm text-charcoal/85">
                    {category.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span
                          className="mt-2 h-px w-3 shrink-0 bg-olive/70"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {project.locationClusters.map((item) => (
            <article
              key={item.question}
              className="border-t border-stone/50 pt-6"
            >
              <h3 className="font-display text-xl sm:text-2xl text-ink text-balance">
                {item.question}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-charcoal/85">
                {item.answer}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-10 text-sm text-taupe">
          Coordinates used for mapping: approximately{" "}
          {siteConfig.projectAddress.coordinates.lat},{" "}
          {siteConfig.projectAddress.coordinates.lng}. Confirm exact site access
          details with our team as the community progresses.
        </p>
      </Container>
    </section>
  );
}

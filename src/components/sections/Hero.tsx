"use client";

import Image from "next/image";
import { project } from "@/data/project";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { trackEvent } from "@/lib/analytics";

export function Hero() {
  const image = project.images.hero;

  return (
    <section
      className="relative min-h-[100svh] flex items-end overflow-hidden bg-ink"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 motion-safe:animate-hero-drift"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_20%,rgba(26,24,20,0.35)_100%)]"
          aria-hidden="true"
        />
      </div>

      <Container className="relative z-10 w-full pb-16 pt-36 sm:pb-20 lg:pb-24">
        <p className="text-[0.7rem] tracking-[0.32em] uppercase text-cream/85">
          Rosemont Grove · Brampton
        </p>
        <h1
          id="hero-heading"
          className="mt-5 max-w-4xl font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] leading-[1.05] text-ivory text-balance"
        >
          Rosemont Grove
          <span className="block mt-2 text-[0.72em] text-cream/90 font-normal">
            Luxury Detached Homes in Brampton
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-cream/85">
          A limited collection of 38′ and 41′ signature detached residences by
          Hallett Homes, coming to Heritage Road & Steeles Avenue West in
          Brampton.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button
            href="/#private-access"
            variant="light"
            onClick={() => trackEvent("hero_private_access_click")}
          >
            Request Private Access
          </Button>
          <Button href="/#overview" variant="secondary" className="border-cream/35 text-ivory hover:bg-ivory/10 hover:border-ivory">
            Explore the Community
          </Button>
        </div>

        <dl className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 border-t border-cream/20 pt-8 max-w-4xl">
          {project.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="font-display text-2xl sm:text-3xl text-ivory">
                {fact.value}
              </dt>
              <dd className="mt-2 text-[0.7rem] tracking-[0.2em] uppercase text-cream/70">
                {fact.label}
              </dd>
            </div>
          ))}
        </dl>

        {image.illustrative ? (
          <p className="mt-8 text-[0.65rem] tracking-[0.12em] uppercase text-cream/45">
            Atmospheric photography for illustration — official renderings available upon request
          </p>
        ) : null}
      </Container>
    </section>
  );
}

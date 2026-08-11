"use client";

import Image from "next/image";
import { project } from "@/data/project";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LeadForm } from "@/components/forms/LeadForm";

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
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/35"
          aria-hidden="true"
        />
      </div>

      <Container className="relative z-10 w-full pb-16 pt-28 sm:pb-20 lg:pb-24 lg:pt-32">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-12">
          <div>
            <p className="text-[0.7rem] tracking-[0.32em] uppercase text-cream/85">
              Rosemont Grove · Brampton
            </p>
            <h1
              id="hero-heading"
              className="mt-5 max-w-2xl font-display text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] leading-[1.05] text-ivory text-balance"
            >
              Rosemont Grove
              <span className="block mt-2 text-[0.72em] text-cream/90 font-normal">
                Luxury Detached Homes in Brampton
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-cream/85">
              A limited collection of 38′ and 41′ signature detached residences
              by Hallett Homes, coming to Heritage Road & Steeles Avenue West in
              Brampton.
            </p>

            <div className="mt-8">
              <Button
                href="/#overview"
                variant="secondary"
                className="border-cream/35 text-ivory hover:bg-ivory/10 hover:border-ivory"
              >
                Explore the Community
              </Button>
            </div>

            <dl className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-cream/20 pt-8 max-w-2xl">
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
          </div>

          <aside
            id="hero-private-access"
            className="border border-cream/20 bg-ink/75 backdrop-blur-md p-5 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
            aria-label="Request private access"
          >
            <p className="text-[0.68rem] tracking-[0.24em] uppercase text-cream/70">
              Private Access
            </p>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl text-ivory leading-tight">
              Request Private Access
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cream/75">
              Receive current pricing, floor plans, incentives, and release
              information.
            </p>
            <div className="mt-6">
              <LeadForm idPrefix="hero" compact source="hero" />
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}

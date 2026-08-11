import { siteConfig } from "@/config/site";
import { Container, SectionHeading } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-28 bg-ivory py-20 sm:py-24"
      aria-labelledby="contact-heading"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <SectionHeading
            eyebrow="Contact"
            title="Speak With Our Rosemont Grove Team"
            description="Independent sales representation for qualified buyers and realtor partners. We can share current pricing guidance, floor plans upon request, and registration next steps."
          />
          <address
            id="contact-heading"
            className="not-italic border border-stone/40 bg-cream/40 p-6 sm:p-8"
          >
            <p className="text-[0.68rem] tracking-[0.22em] uppercase text-taupe">
              {siteConfig.brokerageName}
            </p>
            <p className="mt-3 font-display text-2xl text-ink">
              {siteConfig.agentName}
            </p>
            <p className="mt-5 text-base text-charcoal/85 leading-relaxed">
              <a
                href={siteConfig.phoneHref}
                className="block hover:text-ink underline-offset-4 hover:underline"
              >
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="block mt-2 hover:text-ink underline-offset-4 hover:underline"
              >
                {siteConfig.email}
              </a>
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/#private-access">Request Private Access</Button>
              <Button href="/contact" variant="secondary">
                Contact Page
              </Button>
            </div>
          </address>
        </div>
      </Container>
    </section>
  );
}

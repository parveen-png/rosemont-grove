import { faqItems } from "@/data/faq";
import { Container, SectionHeading } from "@/components/ui/Container";
import { FAQItem } from "@/components/sections/FAQItem";

export function FAQ() {
  return (
    <section
      id="faq"
      className="scroll-mt-28 bg-ivory py-20 sm:py-28"
      aria-labelledby="faq-heading"
    >
      <Container>
        <SectionHeading
          eyebrow="FAQ"
          title="Rosemont Grove Questions, Answered Directly"
          description="Clear answers for buyers, realtors, and research tools — based on verified project information."
        />

        <div id="faq-heading" className="mt-12 divide-y divide-stone/40 border-y border-stone/40">
          {faqItems.map((item) => (
            <FAQItem key={item.question} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}

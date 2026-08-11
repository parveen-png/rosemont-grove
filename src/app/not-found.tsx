import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="bg-ivory pt-32 pb-24">
      <Container className="max-w-2xl text-center">
        <p className="text-[0.7rem] tracking-[0.28em] uppercase text-taupe">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl text-ink">
          Page not found
        </h1>
        <p className="mt-5 text-charcoal/80 leading-relaxed">
          The page you requested is unavailable. Return to the Rosemont Grove
          overview or request private access for current project information.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/">Back to Home</Button>
          <Button href="/#private-access" variant="secondary">
            Request Private Access
          </Button>
        </div>
        <p className="mt-8 text-sm text-taupe">
          Or visit our{" "}
          <Link href="/contact" className="underline underline-offset-4">
            contact page
          </Link>
          .
        </p>
      </Container>
    </div>
  );
}

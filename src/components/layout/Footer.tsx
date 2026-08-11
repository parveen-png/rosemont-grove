import Link from "next/link";
import { siteConfig } from "@/config/site";
import { project } from "@/data/project";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

const quickLinks = [
  { href: "/#overview", label: "Overview" },
  { href: "/#residences", label: "Residences" },
  { href: "/#location", label: "Location" },
  { href: "/#builder", label: "Builder" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#hero-private-access", label: "Register" },
  { href: "/sources", label: "Sources" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone/40 bg-charcoal text-ivory pb-24 sm:pb-0">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Logo variant="dark" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-stone">
              An independent information and registration resource for{" "}
              {project.name}, a limited collection of luxury detached homes by{" "}
              {project.builder} in {project.city}.
            </p>
          </div>

          <div>
            <h2 className="text-[0.7rem] tracking-[0.24em] uppercase text-stone">
              Quick Links
            </h2>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/85 hover:text-ivory transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[0.7rem] tracking-[0.24em] uppercase text-stone">
              Project
            </h2>
            <address className="mt-5 not-italic text-sm leading-relaxed text-ivory/85">
              <p>
                {project.name}
                <br />
                {project.intersection}
                <br />
                {project.city}, {project.province}
              </p>
            </address>
            <p className="mt-6 text-xs text-stone">
              Built by{" "}
              <a
                href={project.builderUrl}
                className="underline-offset-4 hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                {project.builder}
              </a>
            </p>
            <p className="mt-3 text-xs text-stone">
              Project information last reviewed: {siteConfig.contentReviewedAt}
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 space-y-4">
          <p className="text-xs leading-relaxed text-stone max-w-4xl">
            {siteConfig.legal.independentDisclaimer}
          </p>
          <p className="text-xs text-stone/80">
            © {year} Independent real estate marketing website for {project.name}.
            Not the official {project.builder} website. Not the builder.
          </p>
        </div>
      </Container>
    </footer>
  );
}

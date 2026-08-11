import { siteConfig } from "@/config/site";
import { project } from "@/data/project";
import { absoluteUrl } from "@/lib/utils";

export const dynamic = "force-static";

export async function GET() {
  const body = `# Rosemont Grove

> Independent information and registration resource for Rosemont Grove, a Hallett Homes detached-home community in Brampton, Ontario. Operated by independent real estate agents. Not the official Hallett Homes website. Not the builder.

## Key Information

- Project: ${project.name}
- Builder: ${project.builder}
- Location: ${project.locationLabel}
- Home Types: 38' and 41' detached residences
- Community Size: ${project.residenceCount} residences
- Pricing: ${project.pricingStatus}
- Floor Plans: ${project.floorPlansStatus}

## Important Pages

- Overview: ${absoluteUrl("/")}
- Residences: ${absoluteUrl("/#residences")}
- Location: ${absoluteUrl("/#location")}
- Builder: ${absoluteUrl("/#builder")}
- FAQ: ${absoluteUrl("/#faq")}
- Private Access / Registration: ${absoluteUrl("/#hero-private-access")}
- Sources: ${absoluteUrl("/sources")}
- Privacy Policy: ${absoluteUrl("/privacy-policy")}

## Notes

- ${siteConfig.legal.independentDisclaimer}
- Content last reviewed: ${siteConfig.contentReviewedAt}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

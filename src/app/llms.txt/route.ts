import { siteConfig } from "@/config/site";
import { project } from "@/data/project";
import { absoluteUrl } from "@/lib/utils";

export const dynamic = "force-static";

export async function GET() {
  const body = `# Rosemont Grove

> Independent information and registration resource for Rosemont Grove, a Hallett Homes detached-home community in Brampton, Ontario.

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
- Private Access / Registration: ${absoluteUrl("/#private-access")}
- Contact: ${absoluteUrl("/contact")}
- Sources: ${absoluteUrl("/sources")}
- Privacy Policy: ${absoluteUrl("/privacy-policy")}

## Contact

- Operator: ${siteConfig.brokerageName}
- Agent: ${siteConfig.agentName}
- Phone: ${siteConfig.phone}
- Email: ${siteConfig.email}

## Notes

- This website is an independent real estate marketing website and is not the official website of Hallett Homes.
- Project information, pricing, availability, specifications and incentives are subject to change without notice.
- Content last reviewed: ${siteConfig.contentReviewedAt}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

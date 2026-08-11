import { siteConfig } from "@/config/site";

export type HomeTypeOption = {
  id: string;
  label: string;
  lotSize: string;
};

export type ProjectSource = {
  id: string;
  title: string;
  description: string;
  url?: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Atmospheric / illustrative — not an official project rendering */
  illustrative?: boolean;
};

/**
 * Single source of truth for verified Rosemont Grove project facts.
 * Only include fields confirmed by approved project information.
 */
export const project = {
  name: siteConfig.projectName,
  builder: siteConfig.builderName,
  builderUrl: siteConfig.builderUrl,
  city: "Brampton",
  province: "Ontario",
  country: "Canada",
  region: "Peel Region",
  intersection: siteConfig.projectAddress.intersection,
  locationLabel: `${siteConfig.projectAddress.intersection}, Brampton, Ontario`,
  propertyType: "Detached Homes",
  lotSizes: ["38′", "41′"] as const,
  homeTypes: [
    { id: "38-detached", label: "38′ Detached", lotSize: "38′" },
    { id: "41-detached", label: "41′ Detached", lotSize: "41′" },
    { id: "not-sure", label: "Not Sure Yet", lotSize: "" },
  ] satisfies HomeTypeOption[],
  residenceCount: 59,
  pricingStatus: "Register for current pricing",
  floorPlansStatus: "Request the latest floor plans and incentives",
  availabilityStatus: "Register for current availability",
  projectStatus: "Coming soon — register for release information",
  setting:
    "Natural heritage woodlands, greenery, and a meandering creek / Credit River Valley setting",
  shortDescription:
    "A limited luxury enclave of signature detached residences by Hallett Homes in Brampton.",
  answerDescription:
    "Rosemont Grove is a limited collection of 59 luxury detached homes by Hallett Homes at Heritage Road and Steeles Avenue West in Brampton, Ontario. The community features signature 38′ and 41′ residences in an intimate enclave surrounded by natural heritage woodlands, greenery, and a meandering creek within the Credit River Valley setting.",
  brandPositioning: [
    "Luxury",
    "Craftsmanship",
    "Refinement",
    "Individuality",
    "Architectural elegance",
    "Premium finishes",
    "Privacy",
    "Permanence",
    "Exclusivity",
    "Natural surroundings",
  ] as const,
  facts: [
    { value: "59", label: "Signature Residences" },
    { value: "38′ & 41′", label: "Detached Homes" },
    { value: "Brampton", label: "Heritage Rd. & Steeles Ave. W." },
  ] as const,
  overviewFields: [
    { label: "Project", value: "Rosemont Grove" },
    { label: "Builder", value: "Hallett Homes" },
    { label: "Location", value: "Heritage Rd. & Steeles Ave. W., Brampton" },
    { label: "Property Type", value: "Detached Homes" },
    { label: "Lot Sizes", value: "38′ and 41′" },
    { label: "Number of Residences", value: "59" },
    { label: "Status", value: "Coming soon — register for release information" },
    { label: "Pricing", value: "Register for current pricing" },
    { label: "Floor Plans", value: "Available upon request" },
  ] as const,
  images: {
    hero: {
      src: "/images/rosemont-woodland-creek.webp",
      alt: "Woodland creek corridor near the natural setting associated with Rosemont Grove in Brampton",
      width: 1920,
      height: 1280,
      illustrative: true,
    },
    architecture: {
      src: "/images/rosemont-architecture-detail.webp",
      alt: "Architectural stone facade detail illustrating the quiet-luxury character of detached homes",
      width: 1920,
      height: 1280,
      illustrative: true,
    },
    interior: {
      src: "/images/rosemont-interior-light.webp",
      alt: "Sunlit interior living space with warm finishes illustrating refined residential living",
      width: 1920,
      height: 1280,
      illustrative: true,
    },
    community: {
      src: "/images/rosemont-community-dusk.webp",
      alt: "Evening residential streetscape among mature trees illustrating a quiet detached-home community setting",
      width: 1920,
      height: 1280,
      illustrative: true,
    },
  } satisfies Record<string, ProjectImage>,
  /** Floor plans omitted until verified model data is supplied */
  floorPlans: [] as const,
  nearbyCategories: [
    {
      title: "Major Roads",
      items: [
        "Heritage Road",
        "Steeles Avenue West",
        "Highway 401 corridor access",
        "Highway 407 corridor access",
      ],
    },
    {
      title: "Setting & Recreation",
      items: [
        "Natural heritage woodlands",
        "Creek corridors",
        "Credit River Valley environment",
        "Established residential surroundings",
      ],
    },
    {
      title: "Regional Context",
      items: [
        "West Brampton / Bram West area",
        "Mississauga access via major corridors",
        "Shopping and everyday amenities in the wider Brampton area",
        "Employment centres across the western GTA",
      ],
    },
  ] as const,
  locationClusters: [
    {
      question: "Why buy a new home in Brampton?",
      answer:
        "Brampton continues to attract households seeking new detached housing, established neighbourhood amenities, and access across the western Greater Toronto Area. Rosemont Grove adds a limited luxury detached offering in West Brampton for buyers who want craftsmanship-led new construction rather than a resale compromise.",
    },
    {
      question: "Why consider West Brampton?",
      answer:
        "West Brampton offers a residential character shaped by mature communities, major road connections, and proximity to natural corridors. Rosemont Grove is positioned at Heritage Road and Steeles Avenue West for buyers who want a quieter residential setting with regional reach.",
    },
    {
      question: "Where is Rosemont Grove located?",
      answer:
        "Rosemont Grove is located at Heritage Road and Steeles Avenue West in Brampton, Ontario, within Peel Region.",
    },
    {
      question: "What types of homes are offered at Rosemont Grove?",
      answer:
        "Rosemont Grove offers signature 38′ and 41′ detached residences by Hallett Homes within a limited collection of 59 homes.",
    },
    {
      question: "Who is building Rosemont Grove?",
      answer:
        "Rosemont Grove is being built by Hallett Homes, a luxury home builder known for refined architectural design and craftsmanship-focused residential communities in the Greater Toronto Area.",
    },
    {
      question: "Is Rosemont Grove close to Mississauga?",
      answer:
        "Rosemont Grove sits in West Brampton near corridors that connect toward Mississauga and the broader western GTA. Register with our team for guidance on commuting routes and local context for your household.",
    },
    {
      question: "What major roads are near Rosemont Grove?",
      answer:
        "Rosemont Grove is planned at the intersection of Heritage Road and Steeles Avenue West, with regional access toward the Highway 401 and Highway 407 corridors.",
    },
  ] as const,
  sources: [
    {
      id: "project-positioning",
      title: "Approved project positioning",
      description:
        "Community facts used on this site — builder, intersection, residence count, lot sizes, and natural setting — are drawn from approved Rosemont Grove / Hallett Homes project information supplied for this marketing resource.",
    },
    {
      id: "builder",
      title: "Hallett Homes",
      description:
        "Builder attribution and brand context reference Hallett Homes as the developer of Rosemont Grove.",
      url: "https://www.hallethomes.ca",
    },
    {
      id: "city",
      title: "City of Brampton",
      description:
        "Municipal context for Brampton, Ontario as the project city.",
      url: "https://www.brampton.ca",
    },
  ] satisfies ProjectSource[],
} as const;

export type Project = typeof project;

import { Hero } from "@/components/sections/Hero";
import { ProjectIntro } from "@/components/sections/ProjectIntro";
import { ProjectOverview } from "@/components/sections/ProjectOverview";
import { Residences } from "@/components/sections/Residences";
import { LifestyleSection } from "@/components/sections/LifestyleSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { BuilderSection } from "@/components/sections/BuilderSection";
import { LeadFormSection } from "@/components/forms/LeadForm";
import { FAQ } from "@/components/sections/FAQ";
import { SourceReferences } from "@/components/sections/SourceReferences";
import { StructuredData } from "@/components/seo/StructuredData";
import { homeStructuredData } from "@/lib/seo/structured-data";

export default function HomePage() {
  return (
    <>
      <StructuredData data={homeStructuredData()} />
      <Hero />
      <ProjectIntro />
      <ProjectOverview />
      <Residences />
      <LifestyleSection />
      <LocationSection />
      <BuilderSection />
      <LeadFormSection />
      <FAQ />
      <SourceReferences />
    </>
  );
}

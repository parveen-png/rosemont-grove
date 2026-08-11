import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { AnalyticsScripts } from "@/components/seo/AnalyticsScripts";
import { project } from "@/data/project";
import { absoluteUrl } from "@/lib/utils";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const title = "Rosemont Grove Brampton | Detached Homes by Hallett Homes";
const description =
  "Rosemont Grove is a limited collection of 59 luxury 38′ & 41′ detached homes by Hallett Homes at Heritage Rd & Steeles Ave W in Brampton. Register for pricing.";

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: title,
    template: `%s | ${project.name}`,
  },
  description,
  applicationName: project.name,
  authors: [{ name: "Independent Real Estate Agents" }],
  creator: "Independent Real Estate Agents",
  publisher: "Independent Real Estate Agents",
  keywords: [
    "Rosemont Grove",
    "Rosemont Grove Brampton",
    "Hallett Homes",
    "detached homes Brampton",
    "luxury homes Brampton",
    "Heritage Road Brampton",
    "Steeles Avenue West Brampton",
  ],
  alternates: {
    canonical: absoluteUrl("/"),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: absoluteUrl("/"),
    siteName: `${project.name} Brampton`,
    title: "Rosemont Grove | Luxury Detached Homes in Brampton",
    description,
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: "Rosemont Grove luxury detached homes in Brampton by Hallett Homes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rosemont Grove | Luxury Detached Homes in Brampton",
    description,
    images: [absoluteUrl("/opengraph-image")],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-CA"
      className={`${manrope.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-3 focus:text-ivory"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <StickyMobileCTA />
        <AnalyticsScripts />
      </body>
    </html>
  );
}

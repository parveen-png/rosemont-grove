import { z } from "zod";
import { project } from "@/data/project";

const homeTypeValues = project.homeTypes.map((h) => h.label) as [
  string,
  ...string[],
];

export const buyingTimeframes = [
  "Immediately",
  "1–3 months",
  "3–6 months",
  "6–12 months",
  "12+ months",
  "Just researching",
] as const;

export const leadFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(80, "First name is too long"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(80, "Last name is too long"),
  email: z
    .email("Enter a valid email address")
    .max(254, "Email is too long"),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(40, "Phone number is too long")
    .regex(/^[0-9+\-().\s]+$/, "Enter a valid phone number"),
  isRealtor: z.enum(["yes", "no"], {
    error: "Please indicate if you are a realtor",
  }),
  buyingTimeframe: z.enum(buyingTimeframes, {
    error: "Select a buying timeframe",
  }),
  preferredHomeType: z.enum(homeTypeValues, {
    error: "Select a preferred home type",
  }),
  message: z.string().trim().max(2000, "Message is too long").optional(),
  consent: z.boolean().refine((value) => value === true, {
    message: "Consent is required to submit this request",
  }),
  /** Honeypot — must remain empty */
  website: z.string().optional(),
  attribution: z
    .object({
      utm_source: z.string().max(200).optional(),
      utm_medium: z.string().max(200).optional(),
      utm_campaign: z.string().max(200).optional(),
      utm_content: z.string().max(200).optional(),
      utm_term: z.string().max(200).optional(),
      landing_page: z.string().max(500).optional(),
      referrer: z.string().max(500).optional(),
    })
    .optional(),
});

export type LeadFormInput = z.infer<typeof leadFormSchema>;

export type LeadSubmission = LeadFormInput & {
  submittedAt: string;
  projectName: string;
};

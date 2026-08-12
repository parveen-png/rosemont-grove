import type { LeadSubmission } from "@/lib/lead/schema";
import { appendRosemontGroveLeadToGoogleSheet } from "@/lib/google/sheets";

export type LeadAdapterResult =
  | { ok: true; id?: string }
  | { ok: false; error: string };

/**
 * Lead processing adapter interface.
 *
 * Required environment variables for Google Sheets (server-only):
 * - GOOGLE_OAUTH_CLIENT_ID
 * - GOOGLE_OAUTH_CLIENT_SECRET
 * - GOOGLE_OAUTH_REFRESH_TOKEN
 * - GOOGLE_SHEETS_SPREADSHEET_ID
 * - GOOGLE_SHEETS_TAB_NAME (optional, defaults to Sheet1)
 *
 * Optional webhook fallback:
 * - CRM_PROVIDER=webhook
 * - CRM_WEBHOOK_URL
 * - CRM_API_KEY
 */
export interface LeadAdapter {
  submit(lead: LeadSubmission): Promise<LeadAdapterResult>;
}

class ConsoleLeadAdapter implements LeadAdapter {
  async submit(lead: LeadSubmission): Promise<LeadAdapterResult> {
    if (process.env.NODE_ENV !== "production") {
      console.info("[lead]", {
        email: lead.email,
        name: `${lead.firstName} ${lead.lastName}`,
        preferredHomeType: lead.preferredHomeType,
        submittedAt: lead.submittedAt,
      });
    }
    return { ok: true, id: `local-${Date.now()}` };
  }
}

class GoogleSheetsLeadAdapter implements LeadAdapter {
  async submit(lead: LeadSubmission): Promise<LeadAdapterResult> {
    const result = await appendRosemontGroveLeadToGoogleSheet({
      firstName: lead.firstName,
      lastName: lead.lastName,
      email: lead.email,
      phone: lead.phone,
      isRealtor: lead.isRealtor,
      buyingTimeframe: lead.buyingTimeframe,
      preferredHomeType: lead.preferredHomeType,
      message: lead.message,
      formSource: lead.attribution?.utm_content,
      utmSource: lead.attribution?.utm_source,
      utmMedium: lead.attribution?.utm_medium,
      utmCampaign: lead.attribution?.utm_campaign,
      landingPage: lead.attribution?.landing_page,
      referrer: lead.attribution?.referrer,
      submittedAt: lead.submittedAt,
      projectName: lead.projectName,
    });

    if (!result.ok) {
      return { ok: false, error: result.error };
    }

    return { ok: true, id: `sheets-${Date.now()}` };
  }
}

class WebhookLeadAdapter implements LeadAdapter {
  constructor(
    private readonly url: string,
    private readonly apiKey?: string,
  ) {}

  async submit(lead: LeadSubmission): Promise<LeadAdapterResult> {
    try {
      const response = await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(this.apiKey ? { Authorization: `Bearer ${this.apiKey}` } : {}),
        },
        body: JSON.stringify(lead),
      });

      if (!response.ok) {
        return { ok: false, error: "Unable to deliver lead at this time." };
      }

      return { ok: true };
    } catch {
      return { ok: false, error: "Unable to deliver lead at this time." };
    }
  }
}

export function getLeadAdapter(): LeadAdapter {
  const provider = (process.env.CRM_PROVIDER || "sheets").toLowerCase();
  const webhookUrl = process.env.CRM_WEBHOOK_URL;
  const apiKey = process.env.CRM_API_KEY;

  if (provider === "webhook" && webhookUrl) {
    return new WebhookLeadAdapter(webhookUrl, apiKey);
  }

  if (provider === "console") {
    return new ConsoleLeadAdapter();
  }

  return new GoogleSheetsLeadAdapter();
}

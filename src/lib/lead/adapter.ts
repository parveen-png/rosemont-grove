import type { LeadSubmission } from "@/lib/lead/schema";

export type LeadAdapterResult =
  | { ok: true; id?: string }
  | { ok: false; error: string };

/**
 * Lead processing adapter interface.
 * Implement CRM providers here without exposing secrets to the client.
 *
 * Required environment variables (server-only):
 * - LEAD_NOTIFICATION_EMAIL — inbox for lead notifications
 * - CRM_PROVIDER — optional: "console" | "webhook" | "email"
 * - CRM_WEBHOOK_URL — optional webhook endpoint for CRM/automation
 * - CRM_API_KEY — optional API key sent as Bearer token to webhook
 * - RESEND_API_KEY — optional if using Resend email delivery later
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
  const provider = (process.env.CRM_PROVIDER || "console").toLowerCase();
  const webhookUrl = process.env.CRM_WEBHOOK_URL;
  const apiKey = process.env.CRM_API_KEY;

  if (provider === "webhook" && webhookUrl) {
    return new WebhookLeadAdapter(webhookUrl, apiKey);
  }

  return new ConsoleLeadAdapter();
}

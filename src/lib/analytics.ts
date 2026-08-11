"use client";

type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export type AnalyticsEvent =
  | "view_project"
  | "hero_private_access_click"
  | "floorplan_view"
  | "floorplan_download"
  | "pricing_request"
  | "phone_click"
  | "email_click"
  | "map_click"
  | "form_start"
  | "form_submit"
  | "form_success"
  | "nav_cta_click";

/**
 * Analytics abstraction — activates only when IDs exist in site config / env.
 */
export function trackEvent(event: AnalyticsEvent, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...payload });

    if (typeof window.gtag === "function") {
      window.gtag("event", event, payload);
    }

    if (typeof window.fbq === "function") {
      window.fbq("trackCustom", event, payload);
    }
  } catch {
    // Analytics must never break UX
  }
}

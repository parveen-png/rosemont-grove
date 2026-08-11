"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { project } from "@/data/project";
import { siteConfig } from "@/config/site";
import {
  buyingTimeframes,
  leadFormSchema,
  type LeadFormInput,
} from "@/lib/lead/schema";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";
import { Container, SectionHeading } from "@/components/ui/Container";

type FieldErrors = Partial<Record<keyof LeadFormInput, string>>;

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  isRealtor: "" as "" | "yes" | "no",
  buyingTimeframe: "" as "" | (typeof buyingTimeframes)[number],
  preferredHomeType: "",
  message: "",
  consent: false,
  website: "",
};

function getAttribution() {
  if (typeof window === "undefined") return undefined;
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || undefined,
    utm_medium: params.get("utm_medium") || undefined,
    utm_campaign: params.get("utm_campaign") || undefined,
    utm_content: params.get("utm_content") || undefined,
    utm_term: params.get("utm_term") || undefined,
    landing_page: window.location.pathname,
    referrer: document.referrer || undefined,
  };
}

export function LeadFormSection() {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [started, setStarted] = useState(false);
  const [pending, startTransition] = useTransition();

  const homeTypeOptions = useMemo(
    () => project.homeTypes.map((item) => item.label),
    [],
  );

  useEffect(() => {
    trackEvent("view_project");
  }, []);

  function markStarted() {
    if (!started) {
      setStarted(true);
      trackEvent("form_start");
    }
  }

  function updateField<K extends keyof typeof initialState>(
    key: K,
    value: (typeof initialState)[K],
  ) {
    markStarted();
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setFormError(null);
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const parsed = leadFormSchema.safeParse({
      ...values,
      isRealtor: values.isRealtor || undefined,
      buyingTimeframe: values.buyingTimeframe || undefined,
      preferredHomeType: values.preferredHomeType || undefined,
      message: values.message || undefined,
      consent: values.consent,
      website: values.website,
      attribution: getAttribution(),
    });

    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !nextErrors[key as keyof LeadFormInput]) {
          nextErrors[key as keyof LeadFormInput] = issue.message;
        }
      }
      setErrors(nextErrors);
      return;
    }

    trackEvent("form_submit");

    startTransition(async () => {
      try {
        const response = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsed.data),
        });

        const payload = (await response.json().catch(() => null)) as {
          ok?: boolean;
          error?: string;
          fieldErrors?: FieldErrors;
        } | null;

        if (!response.ok || !payload?.ok) {
          if (payload?.fieldErrors) setErrors(payload.fieldErrors);
          setFormError(
            payload?.error ||
              "We could not submit your request. Please try again or call us.",
          );
          return;
        }

        setSuccess(true);
        setValues(initialState);
        trackEvent("form_success");
      } catch {
        setFormError(
          "We could not submit your request. Please try again or call us.",
        );
      }
    });
  }

  return (
    <section
      id="private-access"
      className="scroll-mt-28 bg-charcoal text-ivory py-20 sm:py-28"
      aria-labelledby="private-access-heading"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading
              tone="dark"
              eyebrow="Private Access"
              title="Request Private Access to Rosemont Grove"
              description="Receive current pricing, available floor plans, incentives, release information and purchase opportunities."
            />
            <div className="mt-8 space-y-4 text-sm leading-relaxed text-cream/75">
              <p id="private-access-heading">
                Prefer to speak with someone directly? Call{" "}
                <a
                  href={siteConfig.phoneHref}
                  className="underline underline-offset-4 hover:text-ivory"
                  onClick={() =>
                    trackEvent("phone_click", { location: "lead_section" })
                  }
                >
                  {siteConfig.phone}
                </a>{" "}
                or email{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="underline underline-offset-4 hover:text-ivory"
                  onClick={() =>
                    trackEvent("email_click", { location: "lead_section" })
                  }
                >
                  {siteConfig.email}
                </a>
                .
              </p>
              <p>
                Operated by {siteConfig.brokerageName}
                {siteConfig.agentName ? ` · ${siteConfig.agentName}` : ""}.
              </p>
            </div>
          </div>

          <div className="border border-cream/15 bg-ink/40 p-6 sm:p-8">
            {success ? (
              <div role="status" aria-live="polite" className="py-10">
                <p className="font-display text-3xl text-ivory">
                  Request received
                </p>
                <p className="mt-4 max-w-md text-cream/80 leading-relaxed">
                  Thank you. Our team will follow up with current Rosemont Grove
                  information. You may also call us at {siteConfig.phone}.
                </p>
                <Button
                  className="mt-8"
                  variant="light"
                  onClick={() => setSuccess(false)}
                >
                  Submit another request
                </Button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                className="relative grid gap-5 sm:grid-cols-2"
              >
                <Field
                  id="firstName"
                  label="First Name"
                  required
                  autoComplete="given-name"
                  value={values.firstName}
                  error={errors.firstName}
                  onChange={(value) => updateField("firstName", value)}
                />
                <Field
                  id="lastName"
                  label="Last Name"
                  required
                  autoComplete="family-name"
                  value={values.lastName}
                  error={errors.lastName}
                  onChange={(value) => updateField("lastName", value)}
                />
                <Field
                  id="email"
                  label="Email"
                  type="email"
                  required
                  autoComplete="email"
                  value={values.email}
                  error={errors.email}
                  onChange={(value) => updateField("email", value)}
                />
                <Field
                  id="phone"
                  label="Phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={values.phone}
                  error={errors.phone}
                  onChange={(value) => updateField("phone", value)}
                />

                <SelectField
                  id="isRealtor"
                  label="Are You a Realtor?"
                  required
                  value={values.isRealtor}
                  error={errors.isRealtor}
                  onChange={(value) =>
                    updateField("isRealtor", value as "yes" | "no" | "")
                  }
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
                <SelectField
                  id="buyingTimeframe"
                  label="Buying Timeframe"
                  required
                  value={values.buyingTimeframe}
                  error={errors.buyingTimeframe}
                  onChange={(value) =>
                    updateField(
                      "buyingTimeframe",
                      value as (typeof buyingTimeframes)[number] | "",
                    )
                  }
                  options={buyingTimeframes.map((item) => ({
                    value: item,
                    label: item,
                  }))}
                />
                <div className="sm:col-span-2">
                  <SelectField
                    id="preferredHomeType"
                    label="Preferred Home Type"
                    required
                    value={values.preferredHomeType}
                    error={errors.preferredHomeType}
                    onChange={(value) =>
                      updateField("preferredHomeType", value)
                    }
                    options={homeTypeOptions.map((item) => ({
                      value: item,
                      label: item,
                    }))}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-[0.68rem] tracking-[0.18em] uppercase text-cream/70"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={values.message}
                    onChange={(event) =>
                      updateField("message", event.target.value)
                    }
                    className="mt-2 w-full border border-cream/20 bg-transparent px-4 py-3 text-sm text-ivory placeholder:text-cream/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
                    placeholder="Tell us what you would like to receive"
                  />
                  {errors.message ? (
                    <p className="mt-2 text-sm text-red-200" role="alert">
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                {/* Honeypot */}
                <div
                  className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                  aria-hidden="true"
                >
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.website}
                    onChange={(event) =>
                      updateField("website", event.target.value)
                    }
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="flex items-start gap-3 text-sm text-cream/80">
                    <input
                      type="checkbox"
                      checked={values.consent}
                      onChange={(event) =>
                        updateField("consent", event.target.checked)
                      }
                      className="mt-1 h-4 w-4 accent-cream"
                      required
                    />
                    <span>
                      I consent to being contacted about Rosemont Grove and
                      related real-estate information. See our{" "}
                      <a
                        href="/privacy-policy"
                        className="underline underline-offset-4 hover:text-ivory"
                      >
                        Privacy Policy
                      </a>
                      .
                    </span>
                  </label>
                  {errors.consent ? (
                    <p className="mt-2 text-sm text-red-200" role="alert">
                      {errors.consent}
                    </p>
                  ) : null}
                </div>

                {formError ? (
                  <p
                    className="sm:col-span-2 text-sm text-red-200"
                    role="alert"
                  >
                    {formError}
                  </p>
                ) : null}

                <div className="sm:col-span-2 pt-2">
                  <Button
                    type="submit"
                    variant="light"
                    className="w-full sm:w-auto"
                    disabled={pending}
                  >
                    {pending ? "Sending…" : "Request Private Access"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  required,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[0.68rem] tracking-[0.18em] uppercase text-cream/70"
      >
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        required={required}
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full border border-cream/20 bg-transparent px-4 py-3 text-sm text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream min-h-11"
      />
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-red-200" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  error,
  required,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  options: Array<{ value: string; label: string }>;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[0.68rem] tracking-[0.18em] uppercase text-cream/70"
      >
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <select
        id={id}
        name={id}
        required={required}
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full border border-cream/20 bg-charcoal px-4 py-3 text-sm text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream min-h-11"
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-red-200" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

"use client";

import { useId, useState } from "react";
import type { FAQItem as FAQItemType } from "@/data/faq";

export function FAQItem({ item }: { item: FAQItemType }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className="py-5 sm:py-6">
      <h3>
        <button
          id={buttonId}
          type="button"
          className="flex w-full items-start justify-between gap-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="font-display text-xl sm:text-2xl text-ink text-balance pr-4">
            {item.question}
          </span>
          <span
            className="mt-2 inline-flex h-8 w-8 shrink-0 items-center justify-center border border-stone/60 text-sm text-ink"
            aria-hidden="true"
          >
            {open ? "−" : "+"}
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={open ? "mt-4" : "hidden"}
      >
        <p className="max-w-3xl text-base leading-relaxed text-charcoal/85">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

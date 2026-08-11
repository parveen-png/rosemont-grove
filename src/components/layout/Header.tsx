"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/#overview", label: "Overview" },
  { href: "/#residences", label: "Residences" },
  { href: "/#location", label: "Location" },
  { href: "/#builder", label: "Builder" },
  { href: "/#faq", label: "FAQ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300",
        scrolled || open
          ? "bg-ivory/95 backdrop-blur-md shadow-[0_1px_0_rgba(44,42,38,0.08)]"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
        <Logo variant="light" />

        <nav
          className="hidden lg:flex items-center gap-7"
          aria-label="Primary"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[0.72rem] tracking-[0.18em] uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
                scrolled || open
                  ? "text-charcoal/80 hover:text-ink focus-visible:outline-ink"
                  : "text-cream/85 hover:text-ivory focus-visible:outline-ivory",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            href="/#hero-private-access"
            className="hidden sm:inline-flex"
            variant={scrolled || open ? "primary" : "light"}
            onClick={() => trackEvent("nav_cta_click", { location: "header" })}
          >
            Request Private Access
          </Button>

          <button
            type="button"
            className={cn(
              "lg:hidden inline-flex h-11 w-11 items-center justify-center border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
              scrolled || open
                ? "border-stone/60 text-ink focus-visible:outline-ink"
                : "border-cream/40 text-ivory focus-visible:outline-ivory",
            )}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close" : "Menu"}</span>
            <span className="relative block h-3.5 w-5" aria-hidden="true">
              <span
                className={cn(
                  "absolute left-0 top-0 h-px w-full bg-current transition-transform",
                  open && "translate-y-[7px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[7px] h-px w-full bg-current transition-opacity",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[14px] h-px w-full bg-current transition-transform",
                  open && "-translate-y-[7px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id={menuId}
        className={cn(
          "lg:hidden overflow-hidden border-t border-stone/40 bg-ivory transition-[max-height,opacity] duration-300",
          open ? "max-h-[100dvh] opacity-100" : "max-h-0 opacity-0 pointer-events-none",
        )}
      >
        <nav className="flex flex-col px-5 py-6 sm:px-8" aria-label="Mobile">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-stone/30 py-4 text-[0.8rem] tracking-[0.18em] uppercase text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Button
            href="/#hero-private-access"
            className="mt-6 w-full"
            onClick={() => {
              setOpen(false);
              trackEvent("nav_cta_click", { location: "mobile_menu" });
            }}
          >
            Request Private Access
          </Button>
        </nav>
      </div>
    </header>
  );
}

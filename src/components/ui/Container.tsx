import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer" | "nav";
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10", className)}>
      {children}
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h2" | "h3";
}) {
  const dark = tone === "dark";
  return (
    <div className={cn(align === "center" && "text-center mx-auto max-w-3xl")}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-4 text-[0.7rem] tracking-[0.28em] uppercase",
            dark ? "text-stone" : "text-taupe",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Tag
        className={cn(
          "font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.15] text-balance",
          dark ? "text-ivory" : "text-ink",
        )}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={cn(
            "mt-5 text-base sm:text-lg leading-relaxed max-w-2xl",
            dark ? "text-cream/80" : "text-charcoal/80",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

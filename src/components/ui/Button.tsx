import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "light";
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  external?: boolean;
  "aria-label"?: string;
};

const variants = {
  primary:
    "bg-ink text-ivory hover:bg-charcoal focus-visible:outline-ink border border-ink",
  secondary:
    "bg-transparent text-ink border border-stone/70 hover:border-ink hover:bg-ivory-deep/60",
  ghost: "bg-transparent text-ink hover:text-olive border-transparent",
  light:
    "bg-ivory text-ink hover:bg-cream border border-ivory focus-visible:outline-ivory",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  type = "button",
  onClick,
  disabled,
  external,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 px-6 py-3 text-[0.72rem] tracking-[0.18em] uppercase font-medium transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:pointer-events-none min-h-11",
    variants[variant],
    className,
  );

  if (href) {
    const isExternal =
      external ||
      href.startsWith("http") ||
      href.startsWith("tel:") ||
      href.startsWith("mailto:");

    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          target={href.startsWith("http") ? "_blank" : undefined}
          onClick={onClick}
          {...rest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

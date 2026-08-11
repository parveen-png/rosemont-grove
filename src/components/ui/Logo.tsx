import Link from "next/link";
import { project } from "@/data/project";

export function Logo({
  className = "",
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink ${className}`}
      aria-label={`${project.name} home`}
    >
      <span className="font-display text-[1.35rem] sm:text-2xl tracking-[0.04em] text-ink leading-none transition-colors group-hover:text-olive">
        {project.name}
      </span>
      <span className="mt-1 text-[0.62rem] tracking-[0.28em] uppercase text-taupe">
        Brampton · by {project.builder}
      </span>
    </Link>
  );
}

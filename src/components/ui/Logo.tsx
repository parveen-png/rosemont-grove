import Image from "next/image";
import Link from "next/link";
import { project } from "@/data/project";
import { cn } from "@/lib/utils";

export function Logo({
  className = "",
  href = "/",
  variant = "auto",
}: {
  className?: string;
  href?: string;
  /** dark = cream logo on black plate; light = transparent mark for light backgrounds */
  variant?: "auto" | "light" | "dark";
}) {
  const light = variant === "light" || variant === "auto";
  const src = light
    ? project.images.logoLight.src
    : project.images.logo.src;
  const width = light
    ? project.images.logoLight.width
    : project.images.logo.width;
  const height = light
    ? project.images.logoLight.height
    : project.images.logo.height;

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink",
        className,
      )}
      aria-label={`${project.name} home`}
    >
      <Image
        src={src}
        alt={project.images.logo.alt}
        width={width}
        height={height}
        className={cn(
          "h-12 w-auto sm:h-14 object-contain",
          variant === "dark" && "rounded-sm",
        )}
        priority
      />
    </Link>
  );
}

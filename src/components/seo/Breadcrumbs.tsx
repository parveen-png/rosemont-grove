import Link from "next/link";

export function Breadcrumbs({
  items,
}: {
  items: Array<{ name: string; href?: string }>;
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-taupe">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.name}-${index}`} className="inline-flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-ink transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  {item.name}
                </Link>
              ) : (
                <span
                  className={isLast ? "text-ink" : undefined}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

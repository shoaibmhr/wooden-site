import { Link } from "react-router-dom";
import { Home, ChevronRight } from "lucide-react";

export default function PageHero({ image, title, subtitle, breadcrumb }) {
  return (
    <section className="relative w-full">
      <div className="relative h-[240px] w-full overflow-hidden sm:h-[300px] md:h-[360px]">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <h1 className="text-2xl font-bold tracking-wide text-white sm:text-3xl md:text-4xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 max-w-md text-sm text-neutral-200 sm:text-base">
              {subtitle}
            </p>
          )}

          {breadcrumb && breadcrumb.length > 0 && (
            <nav aria-label="Breadcrumb" className="mt-4">
              <ol className="flex items-center gap-1.5 text-xs text-neutral-200 sm:text-sm">
                {breadcrumb.map((item, index) => {
                  const isLast = index === breadcrumb.length - 1;
                  return (
                    <li key={item.label} className="flex items-center gap-1.5">
                      {index === 0 && (
                        <Home className="h-3.5 w-3.5" strokeWidth={2} />
                      )}
                      {isLast ? (
                        <span className="font-medium text-white">
                          {item.label}
                        </span>
                      ) : (
                        <Link
                          to={item.href}
                          className="transition-colors hover:text-white"
                        >
                          {item.label}
                        </Link>
                      )}
                      {!isLast && (
                        <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}

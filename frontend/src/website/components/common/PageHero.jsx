import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Home, ChevronRight } from "lucide-react";

export default function PageHero({ image, title, subtitle, breadcrumb }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full">
      <div className="relative h-[240px] w-full overflow-hidden sm:h-[300px] md:h-[360px]">
        <img
          src={image}
          alt={title}
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[2500ms] ease-out ${
            isVisible ? "scale-100" : "scale-125"
          }`}
        />
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-700 ease-out ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <h1
            className={`text-2xl font-bold tracking-wide text-white transition-all duration-700 ease-out sm:text-3xl md:text-4xl ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: isVisible ? "150ms" : "0ms" }}
          >
            {title}
          </h1>

          <div
            className={`mt-3 h-px bg-white/60 transition-all duration-700 ease-out ${
              isVisible ? "w-12 opacity-100" : "w-0 opacity-0"
            }`}
            style={{ transitionDelay: isVisible ? "350ms" : "0ms" }}
          />

          {subtitle && (
            <p
              className={`mt-3 max-w-md text-sm text-neutral-200 transition-all duration-700 ease-out sm:text-base ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: isVisible ? "300ms" : "0ms" }}
            >
              {subtitle}
            </p>
          )}

          {breadcrumb && breadcrumb.length > 0 && (
            <nav
              aria-label="Breadcrumb"
              className={`mt-4 transition-all duration-700 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: isVisible ? "450ms" : "0ms" }}
            >
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
                          className="transition-colors duration-300 hover:text-white"
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

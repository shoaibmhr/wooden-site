import { Link } from "react-router-dom";
import { Armchair, Home, Search } from "lucide-react";
import Container from "../components/common/Container";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] w-full items-center bg-white py-16 sm:py-20">
      <Container>
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-50 text-amber-900 sm:h-24 sm:w-24">
            <Armchair className="h-10 w-10 sm:h-12 sm:w-12" strokeWidth={1.5} />
          </div>

          <h1 className="mt-6 text-5xl font-bold tracking-wide text-amber-900 sm:text-6xl">
            404
          </h1>
          <h2 className="mt-3 text-lg font-semibold text-neutral-900 sm:text-xl">
            Page Not Found
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600 sm:text-base">
            The page you're looking for doesn't exist or may have been moved.
            Let's get you back on track.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 bg-[#5c1f1f] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-[#732929]"
            >
              <Home className="h-4 w-4" strokeWidth={1.75} />
              Back to Home
            </Link>
            <Link
              to="/products"
              className="flex items-center justify-center gap-2 border border-neutral-300 px-8 py-3 text-sm font-semibold text-neutral-800 transition-colors duration-300 hover:border-[#5c1f1f] hover:text-[#5c1f1f]"
            >
              <Search className="h-4 w-4" strokeWidth={1.75} />
              Browse Products
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

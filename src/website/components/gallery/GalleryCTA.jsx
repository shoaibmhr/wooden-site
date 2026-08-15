import { Link } from "react-router-dom";
import Container from "../common/Container";

export default function GalleryCTA() {
  return (
    <section className="w-full bg-[#faf1e0]">
      <Container>
        <div className="py-12 sm:py-16 text-center">
          <h2 className="font-serif text-stone-900 tracking-tight leading-snug text-xl sm:text-2xl md:text-3xl">
            Like what you see?
          </h2>
          <p className="mt-3 text-sm text-stone-600 sm:text-base max-w-xl mx-auto">
            Every piece here started as a customer's idea. Share yours and let's
            build something just as good.
          </p>
          <div className="mt-6">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-[#5C2A2A] hover:bg-[#4A2121] text-white px-8 py-3 text-xs sm:text-sm font-medium uppercase tracking-[0.15em] transition-all duration-300 ease-out hover:tracking-[0.2em]"
            >
              Share Your Requirement
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

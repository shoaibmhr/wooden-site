import heroVideo from "../../../assets/video/heroVideo.mp4";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export default function HeroCarousel() {
  return (
    <section className="relative w-full h-[75vh] min-h-[480px] sm:h-[85vh] sm:min-h-[560px] lg:h-[90vh] lg:min-h-[640px] max-h-[850px] overflow-hidden bg-[#1A1310]">
      {/* Background Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover scale-105 transition-transform duration-1000"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />

      {/* Luxury Gradient Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1310] via-[#1A1310]/60 to-[#1A1310]/75" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-black/60" />

      {/* Content Container */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6 text-center">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#d4af6a]/40 bg-[#1a1310]/80 px-4 py-1.5 backdrop-blur-md text-[#e0bd7c] text-xs font-semibold uppercase tracking-[0.2em] shadow-lg mb-6">
          <Sparkles className="h-3.5 w-3.5 text-[#d4af6a]" />
          <span>Bespoke Wooden Craftsmanship & Interior Architecture</span>
        </div>

        <h1 className="font-serif text-[#f7f0e2] text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight max-w-4xl tracking-tight drop-shadow-lg">
          We Value Tradition, <br />
          <span className="bg-gradient-to-r from-[#f0d9a8] via-[#d4af6a] to-[#b8863f] bg-clip-text text-transparent italic font-normal">
            Trust & Perfection.
          </span>
        </h1>

        <div className="mt-6 flex items-center gap-3">
          <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-[#d4af6a]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#d4af6a]" />
          <div className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-[#d4af6a]" />
        </div>

        <p className="mt-6 max-w-2xl text-[#ecdfc4]/90 text-sm sm:text-base md:text-lg leading-relaxed">
          Specializing in handcrafted wooden doors, luxury furniture, architectural millwork, and custom interior woodwork engineered for generations.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto px-6 sm:px-0">
          <Link
            to="/get-quote"
            className="group relative flex w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-sm bg-gradient-to-r from-[#d4af6a] via-[#b8863f] to-[#d4af6a] px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#1a1310] shadow-[0_4px_25px_rgba(212,175,106,0.35)] transition-all duration-300 hover:shadow-[0_6px_30px_rgba(212,175,106,0.55)] hover:scale-105 active:scale-95"
          >
            <span>Get a Quote</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            to="/products"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-sm border border-[#d4af6a]/50 bg-[#1a1310]/60 backdrop-blur-md px-8 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-[#f0d9a8] transition-all duration-300 hover:bg-[#d4af6a]/20 hover:border-[#d4af6a]"
          >
            <span>Explore Showcase</span>
          </Link>
        </div>

        {/* Feature Badges */}
        <div className="mt-12 hidden md:flex items-center gap-8 text-[11px] uppercase tracking-widest text-[#ecdfc4]/70 border-t border-[#d4af6a]/20 pt-6">
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#d4af6a]" /> 100% Seasoned Hardwood
          </span>
          <span className="h-3 w-px bg-[#d4af6a]/30" />
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#d4af6a]" /> Custom Dimensions & Polish
          </span>
          <span className="h-3 w-px bg-[#d4af6a]/30" />
          <span>Nationwide Showroom Delivery</span>
        </div>
      </div>
    </section>
  );
}

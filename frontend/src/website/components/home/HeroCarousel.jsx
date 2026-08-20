import heroVideo from "../../../assets/video/heroVideo.mp4";
export default function HeroCarousel() {
  return (
    <section className="relative w-full h-[70vh] min-h-[420px] sm:h-[80vh] sm:min-h-[520px] lg:h-screen lg:min-h-[600px] max-h-[800px] overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1310]/70 via-[#1A1310]/50 to-[#1A1310]/80" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1 className="font-serif text-[#C9A227] text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight max-w-3xl">
          We Value Tradition,
          <br className="hidden sm:block" /> Trust and Quality.
        </h1>

        <div className="mt-5 h-[2px] w-16 sm:w-20 bg-[#C9A227]" />

        <p className="mt-6 max-w-xl text-[#F5EFE6]/90 text-sm sm:text-base md:text-lg leading-relaxed">
          We are a traditional manufacturer of wooden windows and doors in the
          Los Angeles region of Southern California.
        </p>

        <a
          href="/get-quote"
          className="mt-8 inline-block border border-[#C9A227] px-7 py-3 text-sm sm:text-base tracking-wide text-[#C9A227] transition-colors duration-300 hover:bg-[#7A1F2B] hover:border-[#7A1F2B] hover:text-white"
        >
          QUOTE NOW
        </a>
      </div>
    </section>
  );
}

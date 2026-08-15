export default function PageHero({ image, title, subtitle }) {
  return (
    <section className="relative w-full">
      <div className="relative h-[220px] w-full overflow-hidden sm:h-[280px] md:h-[340px]">
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
        </div>
      </div>
    </section>
  );
}

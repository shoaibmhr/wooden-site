export default function StoreIntroBanner() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-5xl text-center px-4 py-10 sm:px-6 sm:py-14 md:py-16 lg:py-18">
       
        <h2 className="font-serif text-stone-900 tracking-tight leading-tight text-xl sm:text-2xl md:text-3xl">
          Woodshala <span className="text-stone-400 font-normal">–</span>{" "}
          Affordable Solid Wood Store
        </h2>

        
        <p className="mt-2 sm:mt-3 text-stone-500 font-serif text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Choose from 3000+ Products with Polish customisation at no additional
          cost
        </p>

        
        <div className="mt-6 sm:mt-8">
          <a
            href="/shop"
            className="inline-block bg-[#5C2A2A] hover:bg-[#4A2121] text-white
                       tracking-[0.15em] font-medium uppercase
                       text-xs sm:text-sm
                       px-6 py-3 sm:px-8 sm:py-3.5 md:px-10
                       transition-all duration-300 ease-out
                       hover:tracking-[0.2em]
                       active:scale-[0.98]"
          >
            Browse Our Full Collection
          </a>
        </div>
      </div>
    </section>
  );
}

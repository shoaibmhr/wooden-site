import Container from "../common/Container";

export default function ServiceHero() {
  return (
    <section className="w-full bg-white py-10 sm:py-12 md:py-16">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-2xl font-bold tracking-wide text-amber-900 sm:text-3xl md:text-4xl">
            Furniture, Made Your Way
          </h1>
          <p className="mx-auto mt-4 text-sm leading-relaxed text-neutral-600 sm:text-base">
            Whether you know the exact dimensions you need or you'd rather pick from our
            ready-made sizes, we've got you covered. Get furniture custom-built to your
            space, or order our standard sizes directly — either way, it's handcrafted
            from solid wood.
          </p>
        </div>
      </Container>
    </section>
  );
}

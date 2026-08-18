import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Container from "../common/Container";

const posts = [
  {
    title: "How to Choose the Perfect Wooden Stool for Your Space",
    excerpt:
      "A complete guide to picking the right height, wood type, and style of stool for your kitchen or bar counter.",
    href: "/blog/choosing-wooden-stool",
    image:
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Luxury Wooden Swings: Transform Your Home Sanctuary",
    excerpt:
      "Discover how the right swing can turn any corner of your home into a warm, inviting retreat.",
    href: "/blog/luxury-wooden-swings",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "How to Choose the Perfect Jhula for Your Living Space",
    excerpt:
      "From carving style to chain length — everything you need to know before bringing home a jhula.",
    href: "/blog/choosing-jhula",
    image:
      "https://images.unsplash.com/photo-1591434132137-37d04c53197e?auto=format&fit=crop&w=900&q=80",
  },
];

export default function BlogPosts() {
  return (
    <section className="w-full bg-white py-10 sm:py-12 md:py-16">
      <Container>
        <div className="mb-8 text-center sm:mb-10 md:mb-12">
          <h2 className="text-xl font-bold tracking-wide text-amber-900 sm:text-2xl md:text-3xl">
            From Our Blog
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-600 sm:text-base">
            Ideas, guides, and inspiration for choosing wooden furniture that
            lasts
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {posts.map((post) => (
            <Link
              key={post.title}
              to={post.href}
              className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="text-base font-semibold leading-snug text-neutral-900 transition-colors duration-300 group-hover:text-amber-900 sm:text-lg">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-900">
                  Read more
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:mt-14">
          <Link
            to="/blog"
            className="inline-flex items-center bg-[#5c1f1f] px-8 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-[#732929] sm:px-10 sm:py-3.5 sm:text-sm"
          >
            View All
          </Link>
        </div>
      </Container>
    </section>
  );
}

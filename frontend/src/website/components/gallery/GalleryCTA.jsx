import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Container from "../common/Container";

const WHATSAPP_NUMBER = "923027069093";
const whatsappMessage = encodeURIComponent(
  "Hi, I'd like to discuss a custom furniture project.",
);
const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function GalleryCTA() {
  return (
    <section className="relative w-full overflow-hidden py-16 sm:py-20 md:py-24">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1749566760135-e54ece18a532?auto=format&fit=crop&w=1600&q=80"
        alt="Wood grain texture"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#241713]/85 via-[#241713]/90 to-[#241713]/95" />

      <Container>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative z-10 mx-auto max-w-xl text-center"
        >
          <motion.span
            variants={fadeUp}
            className="text-[11px] font-semibold uppercase tracking-[0.25em] text-amber-400"
          >
            Custom Woodwork
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-2 text-xl font-bold text-white sm:text-2xl md:text-3xl"
          >
            Like what you see?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-3 text-sm text-stone-300 sm:text-base"
          >
            Let's build something just as special for your space.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center"
          >
            <motion.a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center bg-[#25D366] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-colors duration-300 hover:bg-[#1ea952]"
            >
              Chat on WhatsApp
            </motion.a>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/products"
                className="flex items-center justify-center border border-white/30 bg-white/5 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/10"
              >
                Browse Products
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

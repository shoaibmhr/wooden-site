import PageHero from "../components/common/PageHero";
import ContactInfo from "../components/contact/ContactInfo";
import ContactForm from "../components/contact/ContactForm";
import ContactMap from "../components/contact/ContactMap";
import Container from "../components/common/Container";

export default function Contact() {
  return (
    <div className="bg-[#faf6ef] min-h-screen">
      <PageHero
        image="https://images.unsplash.com/photo-1757416654883-c73c67b3382b?auto=format&fit=crop&w=1600&q=80"
        title="Contact & Showroom"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact Us", href: "/contact" },
        ]}
      />

      <section className="w-full py-12 sm:py-16 md:py-20">
        <Container>
          <div className="mx-auto grid max-w-6xl grid-cols-1 overflow-hidden rounded-3xl border border-[#ecdfc4] bg-white shadow-2xl lg:grid-cols-12">
            <div className="lg:col-span-5">
              <ContactInfo />
            </div>
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      <ContactMap />
    </div>
  );
}

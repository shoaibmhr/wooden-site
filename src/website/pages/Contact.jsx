import PageHero from "../components/common/PageHero";
import ContactInfo from "../components/contact/ContactInfo";
import ContactForm from "../components/contact/ContactForm";
import ContactMap from "../components/contact/ContactMap";
import Container from "../components/common/Container";

export default function Contact() {
  return (
    <div>
      <PageHero
        image="https://images.unsplash.com/photo-1757416654883-c73c67b3382b?auto=format&fit=crop&w=1600&q=80"
        title="Contact Us"
        subtitle="We'd love to hear from you — reach out with any questions"
      />

      <section className="w-full bg-white py-10 sm:py-12 md:py-16">
        <Container>
          <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-neutral-200 overflow-hidden rounded-xl border border-neutral-200 shadow-sm md:grid-cols-2 md:divide-x md:divide-y-0">
            <ContactInfo />
            <ContactForm />
          </div>
        </Container>
      </section>

      <ContactMap />
    </div>
  );
}

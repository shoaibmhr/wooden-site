import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import FeaturedProjects from './components/FeaturedProjects'
import Services from './components/Services'
import WhyChooseUs from './components/WhyChooseUs'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <FeaturedProjects />
        <Services />
        <WhyChooseUs />
        <Process />
        <Showcase />
        <Testimonials />
        <CTA />
      </main>

      <Footer />
    </>
  )
}

export default App
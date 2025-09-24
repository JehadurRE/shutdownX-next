"use client"

import { useEffect } from "react"
import Layout from "../src/components/Layout"
import Hero from "../src/components/Hero"
import Services from "../src/components/Services"
import WhyChoose from "../src/components/WhyChoose"
import About from "../src/components/About"
import Careers from "../src/components/Careers"
import CTA from "../src/components/CTA"
import Footer from "../src/components/Footer"
import BackgroundEffects from "../src/components/BackgroundEffects"
import { ContactProvider } from "../src/contexts/ContactContext"
import { setupScrollReveal, setupRippleEffects, setupTiltEffects } from "../src/utils/animations"

export default function Page() {
  useEffect(() => {
    const scrollObserver = setupScrollReveal()
    setupRippleEffects()
    setupTiltEffects()

    return () => {
      scrollObserver.disconnect()
    }
  }, [])

  return (
    <ContactProvider>
      <div className="bg-[var(--bg-grad)] bg-ink text-slate-100 antialiased min-h-screen">
        <BackgroundEffects />
        <Layout>
          <Hero />
          <Services />
          <WhyChoose />
          <About />
          <Careers />
          <CTA />
        </Layout>
        <Footer />
      </div>
    </ContactProvider>
  )
}

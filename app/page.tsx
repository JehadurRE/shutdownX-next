"use client"

import { useEffect } from "react"
import Layout from "./components/Layout"
import Hero from "./components/Hero"
import Services from "./components/Services"
import WhyChoose from "./components/WhyChoose"
import About from "./components/About"
import Careers from "./components/Careers"
import CTA from "./components/CTA"
import Footer from "./components/Footer"
import BackgroundEffects from "./components/BackgroundEffects"
import { ContactProvider } from "./contexts/ContactContext"
import { setupScrollReveal, setupRippleEffects, setupTiltEffects } from "./utils/animations"

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

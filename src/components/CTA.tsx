"use client"

import type React from "react"
import { useScrollReveal } from "../hooks/useScrollReveal"
import { useParallax } from "../hooks/useParallax"
import { useContact } from "../contexts/ContactContext"

const CTA: React.FC = () => {
  const { ref, isVisible } = useScrollReveal()
  const { openContact } = useContact()
  const parallaxRef1 = useParallax(-0.1)
  const parallaxRef2 = useParallax(0.1)

  return (
    <section className="relative py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div
          ref={ref}
          className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/0 p-10 md:p-14 shadow-glow reveal transition-all duration-1000 ${
            isVisible ? "in-view" : ""
          }`}
        >
          <div
            ref={parallaxRef1}
            className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-br from-aurora-purple/30 to-aurora-blue/20 blur-3xl"
          />
          <div
            ref={parallaxRef2}
            className="absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-gradient-to-tr from-aurora-teal/30 to-aurora-blue/20 blur-3xl"
          />

          <div className="relative">
            <h3 className="font-display text-2xl md:text-4xl font-bold">Let's build the future together.</h3>
            <p className="mt-2 text-slate-300">AI-powered SaaS, built with care and speed.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => openContact("hire")}
                className="ripple rounded-2xl bg-gradient-to-r from-aurora-purple via-aurora-blue to-aurora-teal px-5 py-3 font-semibold shadow-glow hover:shadow-glowTeal transition"
              >
                Work with us
              </button>
              <button
                onClick={() => openContact("refer")}
                className="ripple rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold hover:bg-white/10 transition"
              >
                Refer a specialist
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA

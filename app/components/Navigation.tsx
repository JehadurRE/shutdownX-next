"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useContact } from "../contexts/ContactContext"

const Navigation: React.FC = () => {
  const { openContact } = useContact()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <header className="sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-5">
        <nav
          className={`glass  mb-2 rounded-2xl px-5 py-3 flex items-center justify-between shadow-glow transition-all duration-300 ${
            isScrolled ? "backdrop-blur-xl bg-white/10" : ""
          }`}
        >
          <button onClick={() => scrollToSection("top")} className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-aurora-purple to-aurora-blue shadow-glow overflow-hidden">
              <div
                className="absolute inset-0 opacity-80 animate-pulseSoft"
                style={{
                  background:
                    "conic-gradient(from 0deg, rgba(255,255,255,.16), transparent 40%, rgba(255,255,255,.16) 60%, transparent 100%)",
                }}
              ></div>
            </div>
            <span className="font-display text-lg tracking-wide grad-text">ShutdownX</span>
          </button>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scrollToSection("services")}
              className="px-4 py-2 rounded-lg hover:bg-white/5 transition"
            >
              Services
            </button>
            <button onClick={() => scrollToSection("why")} className="px-4 py-2 rounded-lg hover:bg-white/5 transition">
              Why Us
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="px-4 py-2 rounded-lg hover:bg-white/5 transition"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("careers")}
              className="px-4 py-2 rounded-lg hover:bg-white/5 transition"
            >
              Careers
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openContact("hire")}
              className="ripple rounded-xl bg-gradient-to-r from-aurora-purple to-aurora-blue px-4 py-2 text-sm font-semibold shadow-glow hover:shadow-glowTeal transition"
            >
              Hire Us
            </button>
            <button
              onClick={() => scrollToSection("careers")}
              className="ripple rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10 transition"
            >
              Join Us
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navigation

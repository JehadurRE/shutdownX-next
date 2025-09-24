"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useContact } from "../contexts/ContactContext"

const Hero: React.FC = () => {
  const { openContact } = useContact()
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const networkCanvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const canvas = networkCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0)
    }

    const animate = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      const cols = 10
      const rows = 7
      const gapX = rect.width / (cols + 1)
      const gapY = rect.height / (rows + 1)

      for (let r = 1; r <= rows; r++) {
        for (let c = 1; c <= cols; c++) {
          const x = c * gapX
          const y = r * gapY
          const t = performance.now() / 1000
          const offsetX = Math.sin(t + r * c) * 6
          const offsetY = Math.cos(t + r * c) * 4

          // Draw node
          ctx.fillStyle = "rgba(255,255,255,0.25)"
          ctx.beginPath()
          ctx.arc(x + offsetX, y + offsetY, 1.4, 0, 2 * Math.PI)
          ctx.fill()

          // Connect horizontally
          if (c < cols) {
            ctx.strokeStyle = "rgba(34,211,238,0.15)"
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(x + offsetX, y + offsetY)
            ctx.lineTo((c + 1) * gapX, y)
            ctx.stroke()
          }

          // Connect vertically
          if (r < rows) {
            ctx.strokeStyle = "rgba(124,58,237,0.15)"
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(x + offsetX, y + offsetY)
            ctx.lineTo(x, (r + 1) * gapY)
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    resize()
    animate()

    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <section id="top" className="relative" ref={heroRef}>
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 md:pb-28 lg:pt-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div
              className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 backdrop-blur reveal transition-all duration-1000 ${
                isVisible ? "in-view" : ""
              }`}
            >
              <span className="inline-block h-2 w-2 rounded-full bg-aurora-teal animate-pulseSoft"></span>
              AI-powered • Automation-first • Design-led
            </div>

            <h1
              className={`font-display text-4xl md:text-6xl lg:text-7xl leading-tight font-extrabold grad-text reveal transition-all duration-1000 delay-200 ${
                isVisible ? "in-view" : ""
              }`}
            >
              Building the Future of SaaS with AI & Automation
            </h1>

            <p
              className={`text-slate-300 text-base md:text-lg max-w-xl reveal transition-all duration-1000 delay-400 ${
                isVisible ? "in-view" : ""
              }`}
            >
              At ShutdownX, we craft AI-powered SaaS products, automation systems, and design-driven experiences that
              redefine how businesses scale.
            </p>

            <div
              className={`flex flex-wrap gap-3 reveal transition-all duration-1000 delay-600 ${
                isVisible ? "in-view" : ""
              }`}
            >
              <button
                onClick={() => openContact("hire")}
                className="ripple rounded-2xl bg-gradient-to-r from-aurora-purple via-aurora-blue to-aurora-teal px-5 py-3 font-semibold shadow-glow hover:shadow-glowTeal transition"
              >
                Work with us
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="ripple rounded-2xl border border-white/10 bg-white/5 px-5 py-3 font-semibold hover:bg-white/10 transition"
              >
                Explore services
              </button>
              <button
                onClick={() => openContact("refer")}
                className="ripple rounded-2xl border border-aurora-teal/30 bg-aurora-teal/10 px-5 py-3 font-semibold text-teal-300 hover:bg-aurora-teal/20 transition"
              >
                Refer a specialist
              </button>
            </div>

            <div
              className={`grid grid-cols-3 gap-4 pt-6 reveal transition-all duration-1000 delay-800 ${
                isVisible ? "in-view" : ""
              }`}
            >
              <div className="glass rounded-xl p-4">
                <div className="text-sm text-slate-400">Focus</div>
                <div className="mt-1 font-semibold">AI + Automation</div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="text-sm text-slate-400">Stack</div>
                <div className="mt-1 font-semibold">Next.js • FastAPI • n8n</div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="text-sm text-slate-400">Approach</div>
                <div className="mt-1 font-semibold">Design-first</div>
              </div>
            </div>
          </div>

          {/* Hero visualization */}
          <div
            className={`relative h-[420px] md:h-[520px] lg:h-[560px] reveal transition-all duration-1000 delay-1000 ${
              isVisible ? "in-view" : ""
            }`}
          >
            {/* Main container */}
            <div className="absolute inset-0 rounded-[28px] border border-white/10 bg-gradient-to-b from-white/10 to-white/0 backdrop-blur parallax">
              {/* Network canvas */}
              <canvas
                ref={networkCanvasRef}
                className="absolute inset-0 rounded-[28px]"
                style={{ width: "100%", height: "100%" }}
              />

              {/* Floating info cards */}
              <div className="absolute inset-0">
                <div className="absolute left-8 top-10 w-40 glass rounded-2xl p-4 parallax tilt transition-transform hover:scale-105">
                  <div className="text-xs text-slate-400">Model</div>
                  <div className="mt-1 font-semibold">LLM Orchestration</div>
                  <div className="mt-2 h-1.5 rounded-full bg-gradient-to-r from-aurora-purple to-aurora-blue animate-pulseSoft"></div>
                </div>

                <div className="absolute right-8 bottom-8 w-48 glass rounded-2xl p-4 parallax tilt transition-transform hover:scale-105">
                  <div className="text-xs text-slate-400">Automation</div>
                  <div className="mt-1 font-semibold">n8n + FastAPI</div>
                  <div className="mt-2 flex gap-1">
                    <span className="h-1.5 flex-1 rounded-full bg-aurora-teal/70"></span>
                    <span className="h-1.5 flex-1 rounded-full bg-aurora-teal/50"></span>
                    <span className="h-1.5 flex-[2] rounded-full bg-aurora-teal/80"></span>
                  </div>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 top-1/3 w-56 glass rounded-2xl p-4 parallax tilt transition-transform hover:scale-105">
                  <div className="text-xs text-slate-400">Design System</div>
                  <div className="mt-1 font-semibold">UI/UX Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className={`mt-16 flex items-center gap-3 text-slate-400 reveal transition-all duration-1000 delay-1200 ${
            isVisible ? "in-view" : ""
          }`}
        >
          <div className="h-9 w-6 rounded-full border border-white/15 relative overflow-hidden">
            <span className="absolute left-1/2 -translate-x-1/2 top-1 h-2 w-1 rounded-full bg-white/70 animate-[float_2s_ease-in-out_infinite]"></span>
          </div>
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  )
}

export default Hero

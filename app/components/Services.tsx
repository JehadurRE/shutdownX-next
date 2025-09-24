"use client"

import type React from "react"
import { useScrollReveal } from "../hooks/useScrollReveal"
import { useParallax } from "../hooks/useParallax"
import { useContact } from "../contexts/ContactContext"

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  category: string
  categoryColor: string
  iconBg: string
  iconBorder: string
  delay?: number
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  category,
  categoryColor,
  iconBg,
  iconBorder,
  delay = 0,
}) => {
  const { ref, isVisible } = useScrollReveal()
  const { openInfo } = useContact()

  return (
    <div
      ref={ref}
      className={`group glass rounded-2xl p-6 hover:shadow-glow transition-all duration-700 reveal tilt cursor-pointer ${
        isVisible ? "in-view" : ""
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={() => openInfo(title)}
    >
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-xl ${iconBg} border ${iconBorder}`}>{icon}</div>
        <span className={`text-xs px-2 py-1 rounded bg-white/5 border border-white/10 ${categoryColor}`}>
          {category}
        </span>
      </div>
      <h3 className="mt-5 font-semibold text-lg group-hover:text-aurora-blue transition-colors">{title}</h3>
      <p className="mt-2 text-sm text-slate-300">{description}</p>
      <button className="mt-4 text-aurora-blue hover:text-teal-300 text-sm font-semibold underline-offset-4 hover:underline transition-colors">
        Learn more
      </button>
    </div>
  )
}

const Services: React.FC = () => {
  const { ref, isVisible } = useScrollReveal()
  const parallaxRef1 = useParallax(-0.08)
  const parallaxRef2 = useParallax(0.12)

  const services = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" className="text-aurora-purple">
          <path
            fill="currentColor"
            d="M12 2a3 3 0 0 1 3 3v1h1a3 3 0 0 1 3 3v1h1a3 3 0 0 1 0 6h-1v1a3 3 0 0 1-3 3h-1v1a3 3 0 0 1-6 0v-1H8a3 3 0 0 1-3-3v-1H4a3 3 0 0 1 0-6h1V9a3 3 0 0 1 3-3h1V5a3 3 0 0 1 3-3Z"
          />
        </svg>
      ),
      title: "AI & LLM Training",
      description: "Custom pipelines, fine-tuning, retrieval, and orchestration to deliver real outcomes.",
      category: "AI & LLM",
      categoryColor: "text-purple-300",
      iconBg: "bg-aurora-purple/20",
      iconBorder: "border-aurora-purple/30",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" className="text-aurora-teal">
          <path fill="currentColor" d="M3 7h6v6H3V7Zm12 0h6v6h-6V7ZM9 17h6v4H9v-4Z" />
          <path fill="currentColor" d="M9 10h6v2H9zM6 13h2v2H6zM16 13h2v2h-2zM11 15h2v2h-2z" />
        </svg>
      ),
      title: "Workflow Automation",
      description: "n8n + FastAPI + LLMs to automate across tools with reliability and visibility.",
      category: "Automation",
      categoryColor: "text-teal-300",
      iconBg: "bg-aurora-teal/20",
      iconBorder: "border-aurora-teal/30",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" className="text-aurora-blue">
          <path fill="currentColor" d="m7 6 5 5-5 5-1.5-1.5L8 11.5 5.5 9 7 7.5Zm10 12H11v-2h6v2Zm0-10h-6V6h6v2Z" />
        </svg>
      ),
      title: "Frontend Development",
      description: "Next.js apps with buttery UX, delightful microinteractions, and speed.",
      category: "Frontend",
      categoryColor: "text-cyan-300",
      iconBg: "bg-aurora-blue/20",
      iconBorder: "border-aurora-blue/30",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" className="text-aurora-purple">
          <path fill="currentColor" d="M4 6h16v4H4V6Zm0 6h16v6H4v-6Zm2 2v2h12v-2H6Z" />
        </svg>
      ),
      title: "Backend Development",
      description: "FastAPI & Next.js APIs designed for clarity, speed, and observability.",
      category: "Backend",
      categoryColor: "text-purple-300",
      iconBg: "bg-aurora-purple/20",
      iconBorder: "border-aurora-purple/30",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" className="text-aurora-teal">
          <path fill="currentColor" d="M3 7h12v12H3V7Zm14 0h4v4h-4V7Zm0 6h4v6h-4v-6Z" />
        </svg>
      ),
      title: "UI/UX Design",
      description: "Design systems, prototypes, and product design that convert.",
      category: "UI/UX",
      categoryColor: "text-teal-300",
      iconBg: "bg-aurora-teal/20",
      iconBorder: "border-aurora-teal/30",
    },
  ]

  return (
    <section id="services" className="relative py-20 md:py-28">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div
          ref={parallaxRef1}
          className="absolute left-10 top-0 h-64 w-64 rounded-full bg-gradient-to-br from-aurora-purple/25 to-aurora-blue/15 blur-3xl"
        />
        <div
          ref={parallaxRef2}
          className="absolute right-10 bottom-10 h-72 w-72 rounded-full bg-gradient-to-tr from-aurora-teal/25 to-aurora-blue/20 blur-3xl"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div ref={ref} className="max-w-3xl">
          <h2
            className={`font-display text-3xl md:text-5xl font-bold reveal transition-all duration-1000 ${
              isVisible ? "in-view" : ""
            }`}
          >
            Services that ship, scale, and shine
          </h2>
          <p
            className={`mt-3 text-slate-300 reveal transition-all duration-1000 delay-200 ${
              isVisible ? "in-view" : ""
            }`}
          >
            From LLMs to pixel-perfect UI, we build automation-first systems that feel like the future.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div key={service.title} className={index === 4 ? "sm:col-span-2 lg:col-span-1" : ""}>
              <ServiceCard {...service} delay={index * 100} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

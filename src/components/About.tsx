import type React from "react"
import { useScrollReveal } from "../hooks/useScrollReveal"

interface TimelineItemProps {
  title: string
  subtitle: string
  description: string
  color: string
  position: "left" | "right"
  delay?: number
}

const TimelineItem: React.FC<TimelineItemProps> = ({ title, subtitle, description, color, position, delay = 0 }) => {
  const { ref, isVisible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`reveal flex items-center gap-4 transition-all duration-1000 ${isVisible ? "in-view" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {position === "left" ? (
        <>
          <div className="w-1/2 text-right pr-6">
            <div className="inline-block glass rounded-2xl p-4">
              <div className="text-slate-300 text-sm">{title}</div>
              <div className="font-semibold">{subtitle}</div>
              <div className="text-slate-400 text-sm mt-1">{description}</div>
            </div>
          </div>
          <div className={`relative h-4 w-4 rounded-full ${color} shadow-glow flex-shrink-0`}></div>
          <div className="w-1/2"></div>
        </>
      ) : (
        <>
          <div className="w-1/2"></div>
          <div className={`relative h-4 w-4 rounded-full ${color} shadow-glow flex-shrink-0`}></div>
          <div className="w-1/2 pl-6">
            <div className="inline-block glass rounded-2xl p-4">
              <div className="text-slate-300 text-sm">{title}</div>
              <div className="font-semibold">{subtitle}</div>
              <div className="text-slate-400 text-sm mt-1">{description}</div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const About: React.FC = () => {
  const { ref, isVisible } = useScrollReveal()

  const timelineItems = [
    {
      title: "Genesis",
      subtitle: "Automation-first mindset",
      description: "We started by wiring tools together for leverage.",
      color: "bg-aurora-purple",
      position: "left" as const,
    },
    {
      title: "Evolution",
      subtitle: "AI-native products",
      description: "LLM orchestration and training baked into the stack.",
      color: "bg-aurora-blue",
      position: "right" as const,
    },
    {
      title: "Principle",
      subtitle: "Design-driven engineering",
      description: "We obsess over polish, speed, and DX.",
      color: "bg-aurora-teal",
      position: "left" as const,
    },
  ]

  return (
    <section id="about" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div ref={ref} className="text-center max-w-3xl mx-auto">
          <h2
            className={`font-display text-3xl md:text-5xl font-bold reveal transition-all duration-1000 ${
              isVisible ? "in-view" : ""
            }`}
          >
            The builders behind ShutdownX
          </h2>
          <p
            className={`mt-3 text-slate-300 reveal transition-all duration-1000 delay-200 ${
              isVisible ? "in-view" : ""
            }`}
          >
            We are a team of builders, AI engineers, and designers crafting scalable SaaS products.
          </p>
        </div>

        <div className="mt-12 relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-aurora-purple/60 via-aurora-blue/40 to-aurora-teal/60"></div>

          <div className="space-y-10">
            {timelineItems.map((item, index) => (
              <TimelineItem key={item.title} {...item} delay={400 + index * 200} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

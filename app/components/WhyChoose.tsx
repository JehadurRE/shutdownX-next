import type React from "react"
import { useScrollReveal } from "../hooks/useScrollReveal"
import { useParallax } from "../hooks/useParallax"

interface CheckItemProps {
  title: string
  description: string
  delay?: number
}

const CheckItem: React.FC<CheckItemProps> = ({ title, description, delay = 0 }) => {
  const { ref, isVisible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={`flex items-start gap-4 glass rounded-2xl p-4 reveal transition-all duration-700 ${
        isVisible ? "in-view" : ""
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-aurora-teal/20 border border-aurora-teal/40 flex-shrink-0">
        <svg viewBox="0 0 24 24" width="16" height="16" className="text-aurora-teal">
          <path fill="currentColor" d="M9 16.2 4.8 12l1.4-1.4L9 13.4 17.8 4.6l1.4 1.4z" />
        </svg>
      </span>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-slate-300 text-sm">{description}</div>
      </div>
    </div>
  )
}

const WhyChoose: React.FC = () => {
  const { ref, isVisible } = useScrollReveal()
  const parallaxRef1 = useParallax(0.12)
  const parallaxRef2 = useParallax(-0.08)

  const benefits = [
    {
      title: "Expertise > Degrees",
      description: "Real-world results, not resumes.",
    },
    {
      title: "Speed + Clean Code",
      description: "Ship fast without the mess.",
    },
    {
      title: "AI-first approach",
      description: "LLMs and automation baked in from day one.",
    },
    {
      title: "Commitment & accountability",
      description: "Transparent scopes, deadlines, and ownership.",
    },
  ]

  return (
    <section id="why" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          <div ref={ref}>
            <h2
              className={`font-display text-3xl md:text-5xl font-bold reveal transition-all duration-1000 ${
                isVisible ? "in-view" : ""
              }`}
            >
              Why choose ShutdownX
            </h2>
            <p
              className={`mt-3 text-slate-300 reveal transition-all duration-1000 delay-200 ${
                isVisible ? "in-view" : ""
              }`}
            >
              We care about speed, clarity, and shipping things that last.
            </p>
            <div className="mt-8 space-y-4">
              {benefits.map((benefit, index) => (
                <CheckItem
                  key={benefit.title}
                  title={benefit.title}
                  description={benefit.description}
                  delay={400 + index * 100}
                />
              ))}
            </div>
          </div>

          {/* Visual metrics */}
          <div className="relative">
            <div
              className={`h-full w-full min-h-[360px] glass rounded-3xl p-6 overflow-hidden reveal transition-all duration-1000 delay-600 ${
                isVisible ? "in-view" : ""
              }`}
            >
              <div className="absolute inset-0 opacity-50">
                <div
                  ref={parallaxRef1}
                  className="absolute -right-16 -top-16 h-80 w-80 rounded-full bg-gradient-to-br from-aurora-purple/30 to-aurora-blue/20 blur-3xl"
                />
                <div
                  ref={parallaxRef2}
                  className="absolute -left-10 -bottom-24 h-72 w-72 rounded-full bg-gradient-to-tr from-aurora-teal/30 to-aurora-blue/20 blur-3xl"
                />
              </div>
              <div className="relative grid grid-cols-2 gap-4">
                <div className="glass rounded-2xl p-4">
                  <div className="text-sm text-slate-400">Latency</div>
                  <div className="mt-2 font-bold text-2xl">40ms</div>
                  <div className="mt-3 h-20 rounded-xl bg-gradient-to-b from-white/10 to-white/0"></div>
                </div>
                <div className="glass rounded-2xl p-4">
                  <div className="text-sm text-slate-400">Uptime</div>
                  <div className="mt-2 font-bold text-2xl">99.9%</div>
                  <div className="mt-3 h-20 rounded-xl bg-gradient-to-b from-white/10 to-white/0"></div>
                </div>
                <div className="col-span-2 glass rounded-2xl p-4">
                  <div className="text-sm text-slate-400">Confidence</div>
                  <div className="mt-2 h-2 w-full rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full w-11/12 bg-gradient-to-r from-aurora-purple via-aurora-blue to-aurora-teal animate-pulse relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChoose

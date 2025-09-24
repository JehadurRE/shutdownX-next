"use client"

import type React from "react"
import { useScrollReveal } from "../hooks/useScrollReveal"
import { useContact } from "../contexts/ContactContext"

interface JobCardProps {
  title: string
  type: string
  description: string
  skills: Array<{ name: string; color: string }>
  delay?: number
}

const JobCard: React.FC<JobCardProps> = ({ title, type, description, skills, delay = 0 }) => {
  const { ref, isVisible } = useScrollReveal()
  const { openContact } = useContact()

  return (
    <div
      ref={ref}
      className={`glass rounded-2xl p-5 reveal transition-all duration-700 hover:shadow-glow ${
        isVisible ? "in-view" : ""
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <div className="font-semibold">{title}</div>
        <span className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10">{type}</span>
      </div>
      <p className="mt-2 text-sm text-slate-300">{description}</p>
      <div className="mt-3 flex gap-2 flex-wrap">
        {skills.map((skill) => (
          <span key={skill.name} className={`text-xs px-2 py-1 rounded border ${skill.color}`}>
            {skill.name}
          </span>
        ))}
      </div>
      <button
        onClick={() => openContact("apply", title)}
        className="mt-4 text-aurora-blue hover:text-teal-300 text-sm font-semibold underline-offset-4 hover:underline transition-colors"
      >
        Apply for this role
      </button>
    </div>
  )
}

const Careers: React.FC = () => {
  const { ref, isVisible } = useScrollReveal()
  const { openContact } = useContact()

  const jobs = [
    {
      title: "n8n Automation Engineer",
      type: "Contract",
      description: "Own complex workflows, error handling, and monitoring.",
      skills: [
        { name: "n8n", color: "bg-aurora-teal/15 border-aurora-teal/30 text-teal-300" },
        { name: "FastAPI", color: "bg-aurora-purple/15 border-aurora-purple/30 text-purple-300" },
      ],
    },
    {
      title: "Next.js Frontend Developer",
      type: "Full-time",
      description: "Ship beautiful, accessible, and fast experiences.",
      skills: [
        { name: "Next.js", color: "bg-aurora-blue/15 border-aurora-blue/30 text-cyan-300" },
        { name: "UI/UX", color: "bg-aurora-purple/15 border-aurora-purple/30 text-purple-300" },
      ],
    },
    {
      title: "FastAPI Backend Developer",
      type: "Full-time",
      description: "Design reliable services, APIs, and observability.",
      skills: [
        { name: "FastAPI", color: "bg-aurora-teal/15 border-aurora-teal/30 text-teal-300" },
        { name: "PostgreSQL", color: "bg-aurora-blue/15 border-aurora-blue/30 text-cyan-300" },
      ],
    },
    {
      title: "ML/LLM Trainer",
      type: "Contract",
      description: "Train, evaluate, and optimize models for real outcomes.",
      skills: [
        { name: "LLMs", color: "bg-aurora-purple/15 border-aurora-purple/30 text-purple-300" },
        { name: "RAG", color: "bg-aurora-blue/15 border-aurora-blue/30 text-cyan-300" },
      ],
    },
    {
      title: "UI/UX Designer",
      type: "Freelance",
      description: "Design systems, prototypes, and beautiful product experiences.",
      skills: [
        { name: "Figma", color: "bg-aurora-teal/15 border-aurora-teal/30 text-teal-300" },
        { name: "Design System", color: "bg-aurora-purple/15 border-aurora-purple/30 text-purple-300" },
      ],
    },
  ]

  return (
    <section id="careers" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-3 gap-10">
          <div ref={ref} className="lg:col-span-1">
            <h2
              className={`font-display text-3xl md:text-5xl font-bold reveal transition-all duration-1000 ${
                isVisible ? "in-view" : ""
              }`}
            >
              We're hiring
            </h2>
            <p
              className={`mt-3 text-slate-300 reveal transition-all duration-1000 delay-200 ${
                isVisible ? "in-view" : ""
              }`}
            >
              No age, no CGPA, no degree — just skills. Join the builders.
            </p>
            <button
              onClick={() => openContact("apply")}
              className={`mt-6 ripple rounded-2xl bg-gradient-to-r from-aurora-purple to-aurora-blue px-5 py-3 font-semibold shadow-glow hover:shadow-glowTeal transition reveal duration-1000 delay-400 ${
                isVisible ? "in-view" : ""
              }`}
            >
              Apply now
            </button>
          </div>

          <div className="lg:col-span-2 grid gap-5 sm:grid-cols-2">
            {jobs.map((job, index) => (
              <div key={job.title} className={index === 4 ? "sm:col-span-2" : ""}>
                <JobCard {...job} delay={600 + index * 100} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Careers

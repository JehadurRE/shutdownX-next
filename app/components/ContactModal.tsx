"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useContact } from "../contexts/ContactContext"

const ContactModal: React.FC = () => {
  const { isContactOpen, contactMode, contactRole, closeContact } = useContact()
  const [topic, setTopic] = useState("Hire Us")
  const [role, setRole] = useState("")
  const [message, setMessage] = useState("")
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  useEffect(() => {
    if (isContactOpen) {
      // Set initial values based on contact mode
      if (contactMode === "hire") {
        setTopic("Hire Us")
        setMessage(
          "Hi ShutdownX — We'd like to explore working together on an AI-powered SaaS project. Timeline: __. Budget: __. Goals: __.",
        )
      } else if (contactMode === "refer") {
        setTopic("Refer a Specialist")
        setMessage("Hi — I'd like to refer a specialist for your network. Name: __, Skill: __, Links: __.")
      } else if (contactMode === "apply") {
        setTopic("Apply for a Role")
        setMessage("Hi — I'd love to apply. Role: __. Portfolio/GitHub: __. Availability: __.")
      }

      if (contactRole) {
        setRole(contactRole)
      }
    }
  }, [isContactOpen, contactMode, contactRole])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeContact()
      }
    }

    if (isContactOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isContactOpen, closeContact])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeContact()
    }
  }

  const showToastMessage = (msg: string) => {
    setToastMessage(msg)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 1200)
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hello@shutdownx.com")
      showToastMessage("Email copied")
    } catch (err) {
      console.error("Failed to copy email:", err)
    }
  }

  const copyMessage = async () => {
    const payload = `Topic: ${topic}\nRole: ${role}\n\n${message}`
    try {
      await navigator.clipboard.writeText(payload)
      showToastMessage("Message copied")
    } catch (err) {
      console.error("Failed to copy message:", err)
    }
  }

  const clearMessage = () => {
    setRole("")
    setMessage("")
  }

  const handleFinish = () => {
    closeContact()
    showToastMessage("All set!")
  }

  if (!isContactOpen) return null

  const getTitle = () => {
    switch (contactMode) {
      case "hire":
        return "Work with ShutdownX"
      case "refer":
        return "Refer a specialist"
      case "apply":
        return "Apply for a role"
      default:
        return "Get in touch"
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={handleBackdropClick}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="relative w-full max-w-xl glass rounded-2xl p-6 animate-in fade-in-0 zoom-in-95 duration-300">
          <div className="flex items-center justify-between">
            <div className="font-semibold">{getTitle()}</div>
            <button
              onClick={closeContact}
              className="h-8 w-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="currentColor" d="m18.3 5.7-12.6 12.6-1.4-1.4L16.9 4.3z" />
                <path fill="currentColor" d="m5.7 5.7 12.6 12.6-1.4 1.4L4.3 7.1z" />
              </svg>
            </button>
          </div>

          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400">Topic</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-aurora-blue/50 transition-colors"
              >
                <option value="Hire Us">Hire Us</option>
                <option value="Refer a Specialist">Refer a Specialist</option>
                <option value="Apply for a Role">Apply for a Role</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400">Role (optional)</label>
              <input
                type="text"
                placeholder="e.g., Next.js Frontend Developer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-aurora-blue/50 transition-colors"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-slate-400">Message</label>
              <textarea
                rows={4}
                placeholder="Tell us a little about your need or profile…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-aurora-blue/50 transition-colors resize-none"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="text-sm text-slate-400">
              We don't collect data here. Use the buttons to copy our email or your message.
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 justify-between">
            <div className="flex items-center gap-2">
              <div className="text-sm">Email:</div>
              <button
                onClick={copyEmail}
                className="text-sm text-aurora-blue underline underline-offset-4 hover:text-teal-300 transition-colors"
              >
                hello@shutdownx.com
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={copyMessage}
                className="ripple rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-semibold hover:bg-white/10 transition"
              >
                Copy message
              </button>
              <button
                onClick={clearMessage}
                className="ripple rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-semibold hover:bg-white/10 transition"
              >
                Clear
              </button>
              <button
                onClick={handleFinish}
                className="ripple rounded-xl bg-gradient-to-r from-aurora-purple to-aurora-blue px-4 py-2 font-semibold shadow-glow hover:shadow-glowTeal transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed left-1/2 -translate-x-1/2 bottom-6 z-50">
          <div className="glass rounded-xl px-4 py-2 text-sm shadow-glow animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
            {toastMessage}
          </div>
        </div>
      )}
    </>
  )
}

export default ContactModal

"use client"

import type React from "react"
import { useEffect } from "react"
import { useContact } from "../contexts/ContactContext"

const InfoModal: React.FC = () => {
  const { isInfoOpen, infoService, closeInfo } = useContact()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeInfo()
      }
    }

    if (isInfoOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isInfoOpen, closeInfo])

  if (!isInfoOpen) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeInfo()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={handleBackdropClick}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative w-full max-w-md glass rounded-2xl p-6 animate-in fade-in-0 zoom-in-95 duration-300">
        <div className="flex items-center justify-between">
          <div className="font-semibold">Service Details</div>
          <button
            onClick={closeInfo}
            className="h-8 w-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="currentColor" d="m18.3 5.7-12.6 12.6-1.4-1.4L16.9 4.3z" />
              <path fill="currentColor" d="m5.7 5.7 12.6 12.6-1.4 1.4L4.3 7.1z" />
            </svg>
          </button>
        </div>
        <div className="mt-3 text-slate-300 text-sm">
          <div className="font-semibold mb-1">{infoService}</div>
          <div className="text-slate-300">
            This is a quick overview of how we approach {infoService.toLowerCase()}: discovery, design, implementation,
            and iteration — all with measurable outcomes and clear ownership.
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <button
            onClick={closeInfo}
            className="ripple rounded-xl bg-gradient-to-r from-aurora-purple to-aurora-blue px-4 py-2 font-semibold shadow-glow hover:shadow-glowTeal transition"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}

export default InfoModal

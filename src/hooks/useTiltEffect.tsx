"use client"

import { useEffect, useRef } from "react"

export const useTiltEffect = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const dx = (e.clientX - rect.left) / rect.width - 0.5
      const dy = (e.clientY - rect.top) / rect.height - 0.5

      element.style.setProperty("--ry", `${dx * 8}deg`)
      element.style.setProperty("--rx", `${-dy * 8}deg`)
    }

    const handleMouseLeave = () => {
      element.style.setProperty("--ry", "0deg")
      element.style.setProperty("--rx", "0deg")
    }

    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return ref
}

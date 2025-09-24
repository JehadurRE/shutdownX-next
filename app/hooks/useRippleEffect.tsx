"use client"

import { useEffect, useRef } from "react"

export const useRippleEffect = () => {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const button = ref.current
    if (!button) return

    const handlePointerMove = (e: PointerEvent) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      button.style.setProperty("--x", `${x}px`)
      button.style.setProperty("--y", `${y}px`)
    }

    button.addEventListener("pointermove", handlePointerMove)

    return () => {
      button.removeEventListener("pointermove", handlePointerMove)
    }
  }, [])

  return ref
}

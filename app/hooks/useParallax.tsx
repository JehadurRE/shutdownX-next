"use client"

import { useEffect, useRef } from "react"

export const useParallax = (speed = 0.08) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false

    const updateParallax = () => {
      if (ref.current) {
        const scrollY = window.scrollY
        ref.current.style.transform = `translateY(${-(scrollY * speed)}px)`
      }
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax)
        ticking = true
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    updateParallax()

    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [speed])

  return ref
}

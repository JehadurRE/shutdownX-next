"use client"

import type React from "react"
import { useEffect, useRef } from "react"

const BackgroundEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let points: Array<{
      x: number
      y: number
      vx: number
      vy: number
    }> = []

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0)

      points = Array.from({ length: 70 }, () => ({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
      }))
    }

    const animate = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      // Update points
      for (const point of points) {
        point.x += point.vx
        point.y += point.vy

        if (point.x < 0 || point.x > rect.width) point.vx *= -1
        if (point.y < 0 || point.y > rect.height) point.vy *= -1
      }

      // Draw connections
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x
          const dy = points[i].y - points[j].y
          const distance = Math.hypot(dx, dy)

          if (distance < 120) {
            const alpha = (1 - distance / 120) * 0.4
            const gradient = ctx.createLinearGradient(points[i].x, points[i].y, points[j].x, points[j].y)
            gradient.addColorStop(0, `rgba(124,58,237,${alpha})`)
            gradient.addColorStop(1, `rgba(34,211,238,${alpha})`)

            ctx.strokeStyle = gradient
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(points[i].x, points[i].y)
            ctx.lineTo(points[j].x, points[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw points
      for (const point of points) {
        ctx.fillStyle = "rgba(255,255,255,0.35)"
        ctx.beginPath()
        ctx.arc(point.x, point.y, 1.2, 0, Math.PI * 2)
        ctx.fill()
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

  return (
    <>
      {/* Floating blob gradients */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-20 -left-24 w-[38rem] h-[38rem] rounded-full bg-gradient-to-br from-aurora-purple/25 via-aurora-blue/20 to-transparent blur-3xl animate-float"></div>
        <div className="absolute top-1/3 -right-24 w-[40rem] h-[40rem] rounded-full bg-gradient-to-tr from-aurora-teal/25 via-aurora-purple/20 to-transparent blur-3xl animate-floatSlow"></div>
        <div className="absolute -bottom-24 left-1/3 w-[44rem] h-[44rem] rounded-full bg-gradient-to-b from-aurora-blue/20 via-aurora-teal/20 to-transparent blur-3xl animate-float"></div>
        <canvas ref={canvasRef} className="absolute inset-0" style={{ width: "100%", height: "100%" }} />
      </div>
    </>
  )
}

export default BackgroundEffects

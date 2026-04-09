"use client"

import { useEffect, useRef } from "react"

export function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let width = window.innerWidth
    let height = window.innerHeight

    canvas.width = width
    canvas.height = height

    interface Star {
      x: number
      y: number
      radius: number
      speed: number
      opacity: number
      color: string
      twinkleSpeed: number
      twinkleOffset: number
    }

    const stars: Star[] = []
    const colors = [
      "rgba(59, 130, 246, opacity)", // Blue
      "rgba(34, 197, 94, opacity)",  // Green
      "rgba(255, 255, 255, opacity)", // White
      "rgba(147, 197, 253, opacity)", // Light blue
    ]

    // Generate premium animated stars
    for (let i = 0; i < 200; i++) {
      const colorTemplate = colors[Math.floor(Math.random() * colors.length)]
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.3,
        speed: Math.random() * 0.3 + 0.05,
        opacity: Math.random() * 0.4 + 0.2,
        color: colorTemplate,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
      })
    }

    // Nebula clouds
    const nebulae = [
      { x: width * 0.2, y: height * 0.3, radius: 300, color: "rgba(59, 130, 246, 0.03)" },
      { x: width * 0.8, y: height * 0.7, radius: 250, color: "rgba(34, 197, 94, 0.03)" },
      { x: width * 0.5, y: height * 0.5, radius: 400, color: "rgba(147, 197, 253, 0.02)" },
    ]

    function drawNebulae() {
      if (!ctx) return
      nebulae.forEach((nebula) => {
        const gradient = ctx.createRadialGradient(
          nebula.x, nebula.y, 0,
          nebula.x, nebula.y, nebula.radius
        )
        gradient.addColorStop(0, nebula.color)
        gradient.addColorStop(1, "transparent")
        ctx.beginPath()
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })
    }

    function animate() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, width, height)

      // Draw nebulae first (background)
      drawNebulae()

      const time = Date.now() * 0.001

      // Draw and animate stars
      stars.forEach((star) => {
        // Twinkle effect
        const twinkle = Math.sin(time * star.twinkleSpeed * 10 + star.twinkleOffset)
        const currentOpacity = star.opacity + twinkle * 0.15

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = star.color.replace("opacity", Math.max(0.1, currentOpacity).toString())
        ctx.fill()

        // Subtle glow for larger stars
        if (star.radius > 1) {
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2)
          ctx.fillStyle = star.color.replace("opacity", (currentOpacity * 0.2).toString())
          ctx.fill()
        }

        // Move stars upward slowly
        star.y -= star.speed
        if (star.y < -5) {
          star.y = height + 5
          star.x = Math.random() * width
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      
      // Update nebulae positions
      nebulae[0].x = width * 0.2
      nebulae[0].y = height * 0.3
      nebulae[1].x = width * 0.8
      nebulae[1].y = height * 0.7
      nebulae[2].x = width * 0.5
      nebulae[2].y = height * 0.5
    }

    window.addEventListener("resize", handleResize)
    
    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none opacity-40 -z-10" 
      aria-hidden="true" 
    />
  )
}

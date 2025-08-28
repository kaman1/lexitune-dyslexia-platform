"use client"

import { useEffect, useRef } from "react"

interface DottedPatternProps {
  color?: string
  dotSize?: number
  spacing?: number
  opacity?: number
  className?: string
}

export function DottedPattern({
  color = "#ffffff",
  dotSize = 1,
  spacing = 20,
  opacity = 0.2,
  className = "",
}: DottedPatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match its display size
    const updateCanvasSize = () => {
      const parent = canvas.parentElement
      if (!parent) return

      const { width, height } = parent.getBoundingClientRect()
      canvas.width = width
      canvas.height = height

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw dots
      ctx.fillStyle = color
      ctx.globalAlpha = opacity

      const cols = Math.ceil(width / spacing)
      const rows = Math.ceil(height / spacing)

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          ctx.beginPath()
          ctx.arc(i * spacing, j * spacing, dotSize, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    // Initial render
    updateCanvasSize()

    // Update on resize
    const resizeObserver = new ResizeObserver(updateCanvasSize)
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [color, dotSize, spacing, opacity])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ mixBlendMode: "overlay" }}
    />
  )
}

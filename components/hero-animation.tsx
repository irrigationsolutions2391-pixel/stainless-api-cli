"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect, useState, useRef } from "react"

export function HeroAnimation() {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 150 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)
  
  const rotateX = useTransform(y, [-300, 300], [15, -15])
  const rotateY = useTransform(x, [-300, 300], [-15, 15])

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  if (!mounted) return null

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[450px] flex items-center justify-center perspective-[1000px] cursor-pointer"
    >
      {/* Outer glow rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 4,
            delay: i * 0.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute rounded-full border-2 border-primary/30"
          style={{
            width: 280 + i * 80,
            height: 280 + i * 80,
          }}
        />
      ))}

      {/* Main 3D card */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        {/* Floating orbs around the main element */}
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          const radius = 160
          return (
            <motion.div
              key={`orb-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0.4, 0.8, 0.4],
                scale: [0.8, 1.2, 0.8],
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
              }}
              transition={{
                duration: 3,
                delay: i * 0.15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute w-4 h-4 rounded-full"
              style={{
                background: i % 2 === 0 
                  ? "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)" 
                  : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                boxShadow: i % 2 === 0 
                  ? "0 0 20px rgba(34, 197, 94, 0.6)" 
                  : "0 0 20px rgba(59, 130, 246, 0.6)",
                transform: `translateZ(${20 + i * 5}px)`,
              }}
            />
          )
        })}

        {/* Central hexagonal core */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative"
          style={{ transform: "translateZ(50px)" }}
        >
          {/* Hexagon background */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-8 opacity-20"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              <polygon 
                points="50,3 97,25 97,75 50,97 3,75 3,25" 
                fill="none" 
                stroke="url(#hexGradient)" 
                strokeWidth="0.5"
              />
            </svg>
          </motion.div>

          {/* Main logo container */}
          <motion.div
            animate={{ 
              boxShadow: [
                "0 0 30px rgba(59, 130, 246, 0.3), 0 0 60px rgba(34, 197, 94, 0.2)",
                "0 0 50px rgba(59, 130, 246, 0.5), 0 0 80px rgba(34, 197, 94, 0.3)",
                "0 0 30px rgba(59, 130, 246, 0.3), 0 0 60px rgba(34, 197, 94, 0.2)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-48 h-48 rounded-3xl flex items-center justify-center overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(34, 197, 94, 0.15) 100%)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            {/* Inner animated gradient */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 opacity-30"
              style={{
                background: "conic-gradient(from 0deg, #3b82f6, #22c55e, #3b82f6)",
              }}
            />
            
            {/* Logo Icon - Water Drop + Leaf combined */}
            <div className="relative z-10">
              <motion.svg
                viewBox="0 0 80 80"
                className="w-28 h-28"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <defs>
                  <linearGradient id="dropGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Water drop shape */}
                <motion.path
                  d="M40 8 C40 8 56 28 56 44 C56 56 48 64 40 64 C32 64 24 56 24 44 C24 28 40 8 40 8Z"
                  fill="url(#dropGradient)"
                  filter="url(#glow)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                
                {/* Leaf accent */}
                <motion.path
                  d="M40 36 C48 32 56 36 56 44 C56 52 48 56 40 52 C40 52 44 44 40 36Z"
                  fill="rgba(255,255,255,0.4)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                />
                
                {/* Small sparkle */}
                <motion.circle
                  cx="34"
                  cy="38"
                  r="3"
                  fill="rgba(255,255,255,0.8)"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.svg>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating data particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              y: [-20, -100 - Math.random() * 50],
              x: (Math.random() - 0.5) * 100,
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: Math.random() * 3,
              repeat: Infinity,
              ease: "easeOut"
            }}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${30 + Math.random() * 40}%`,
              bottom: "20%",
            }}
          />
        ))}
      </motion.div>

      {/* Bottom connector lines */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4"
      >
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary/50 to-primary/20" />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-primary"
        />
        <div className="w-24 h-px bg-gradient-to-l from-transparent via-primary/50 to-primary/20" />
      </motion.div>

      {/* Stats indicators */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-12">
        {[
          { label: "AI Matching", value: "92%" },
          { label: "Active Gigs", value: "10K+" },
          { label: "Crypto Ready", value: "24/7" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 + i * 0.2, duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
              className="text-xl font-bold text-primary"
            >
              {stat.value}
            </motion.div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

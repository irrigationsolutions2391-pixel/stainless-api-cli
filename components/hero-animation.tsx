"use client"

import { motion } from "framer-motion"
import { Droplets, Sprout, Zap } from "lucide-react"

export function HeroAnimation() {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      {/* Animated water droplets */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute top-0"
      >
        <Droplets className="w-24 h-24 text-blue-400" />
      </motion.div>

      {/* Center sprout with scale animation */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 1.5,
          delay: 0.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="z-10"
      >
        <Sprout className="w-32 h-32 text-green-500" />
      </motion.div>

      {/* Animated energy icon */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 2,
          delay: 0.8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute right-10"
      >
        <Zap className="w-20 h-20 text-yellow-400" />
      </motion.div>

      {/* Animated circles representing water flow */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: [0, 1.5, 2], opacity: [0.5, 0.2, 0] }}
          transition={{
            duration: 3,
            delay: i * 0.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeOut",
          }}
          className="absolute w-20 h-20 rounded-full border-2 border-blue-300"
        />
      ))}
    </div>
  )
}

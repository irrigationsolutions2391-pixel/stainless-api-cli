"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Coins, DollarSign, Sparkles } from "lucide-react"

interface CoinRainProps {
  show: boolean
  amount: number
  onComplete?: () => void
}

export function CoinRainAnimation({ show, amount, onComplete }: CoinRainProps) {
  const [coins, setCoins] = useState<Array<{ id: number; x: number; icon: any; delay: number }>>([])

  useEffect(() => {
    if (show) {
      const newCoins = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        icon: [Coins, DollarSign, Sparkles][Math.floor(Math.random() * 3)],
        delay: Math.random() * 0.5,
      }))
      setCoins(newCoins)

      const timer = setTimeout(() => {
        setCoins([])
        onComplete?.()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {coins.map((coin) => {
            const Icon = coin.icon
            return (
              <motion.div
                key={coin.id}
                initial={{ y: -50, x: `${coin.x}%`, opacity: 1, scale: 0 }}
                animate={{
                  y: window.innerHeight + 50,
                  x: `${coin.x + (Math.random() - 0.5) * 20}%`,
                  opacity: [1, 1, 0],
                  scale: [0, 1.5, 1],
                  rotate: [0, 360, 720],
                }}
                transition={{
                  duration: 2.5,
                  delay: coin.delay,
                  ease: "easeIn",
                }}
                className="absolute"
              >
                <Icon className="w-8 h-8 text-yellow-500" />
              </motion.div>
            )
          })}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-background/90 backdrop-blur-sm border-4 border-yellow-500 rounded-2xl p-8 shadow-2xl">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Sparkles className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                <h3 className="text-3xl font-bold text-center mb-2">Reload Successful!</h3>
                <p className="text-5xl font-bold text-center text-yellow-500">+${amount.toFixed(2)}</p>
                <p className="text-center text-muted-foreground mt-2">Your wallet has been charged</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

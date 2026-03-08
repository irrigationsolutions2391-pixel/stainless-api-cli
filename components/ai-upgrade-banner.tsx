"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, TrendingUp, Zap, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export function AIUpgradeBanner() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="mb-6"
    >
      <Card className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-green-500/10 border-2 border-primary/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-green-500/5 animate-pulse" />
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 z-10" onClick={() => setDismissed(true)}>
          <X className="w-4 h-4" />
        </Button>
        <CardContent className="p-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center glow-badge">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
                <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 border-0">
                  <Zap className="w-3 h-3 mr-1" />
                  AI-Powered Insight
                </Badge>
              </div>
              <h3 className="text-xl font-bold mb-1">Users Like You Earn 40% More with Elite</h3>
              <p className="text-sm text-muted-foreground">
                Based on your profile and activity, upgrading to Elite could increase your monthly earnings by $1,200+
              </p>
              <div className="flex items-center gap-4 mt-3 justify-center md:justify-start">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">+40% Earnings</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Priority Matching</span>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <Link href="/pricing">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 ripple-button"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Upgrade Now - $10 Off
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Camera, Scan, Sparkles, Lock } from "lucide-react"
import { motion } from "framer-motion"

interface ARYardScannerProps {
  isPremium: boolean
}

export function ARYardScanner({ isPremium }: ARYardScannerProps) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <Card className="relative overflow-hidden border-2 border-primary/30">
        {!isPremium && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="text-center p-6">
              <Lock className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
              <p className="font-semibold mb-2">Premium Feature</p>
              <p className="text-sm text-muted-foreground mb-4">Upgrade to Premium to unlock AR Yard Scanning</p>
              <Button size="sm">Upgrade Now</Button>
            </div>
          </div>
        )}

        <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/20 rounded-full">
                <Camera className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  AR Yard Scanner
                  <Badge variant="outline" className="text-xs">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI Powered
                  </Badge>
                </CardTitle>
                <CardDescription>Scan yards for instant project estimates</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-4">
          <div className="bg-muted/50 rounded-xl p-4 border-2 border-dashed border-primary/20">
            <div className="text-center py-8">
              <Scan className="w-16 h-16 mx-auto mb-4 text-primary animate-pulse" />
              <p className="font-semibold mb-2">Scan Mode Ready</p>
              <p className="text-sm text-muted-foreground mb-4">
                Point your camera at the yard to analyze irrigation needs
              </p>
              <Button disabled={!isPremium} size="lg" className="gap-2">
                <Camera className="w-5 h-5" />
                Start AR Scan
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-primary/5 rounded-lg">
              <p className="text-2xl font-bold text-primary mb-1">92%</p>
              <p className="text-xs text-muted-foreground">Accuracy</p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg">
              <p className="text-2xl font-bold text-green-600 mb-1">30s</p>
              <p className="text-xs text-muted-foreground">Scan Time</p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <p className="text-2xl font-bold text-blue-600 mb-1">AI</p>
              <p className="text-xs text-muted-foreground">Powered</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold">AR Features:</p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Measure yard dimensions automatically</li>
              <li>• Identify existing irrigation systems</li>
              <li>• Calculate water coverage zones</li>
              <li>• Generate instant cost estimates</li>
              <li>• 3D virtual layout preview</li>
              <li>• Share AR previews socially</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

"use client"

import { Sprout } from "lucide-react"

export function GrowingPlantLoader() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Sprout className="w-12 h-12 text-green-500 plant-loader" />
      <p className="text-sm text-muted-foreground animate-pulse">Growing your opportunities...</p>
    </div>
  )
}

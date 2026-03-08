"use client"

import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface RatingDisplayProps {
  rating: number
  totalRatings: number
  completedJobs: number
  isVerified?: boolean
  showNewBadge?: boolean
}

export function RatingDisplay({
  rating,
  totalRatings,
  completedJobs,
  isVerified = false,
  showNewBadge = false,
}: RatingDisplayProps) {
  const shouldShowNewBadge = showNewBadge || completedJobs < 3

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {shouldShowNewBadge ? (
        <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
          New User
        </Badge>
      ) : (
        <div className="flex items-center gap-1">
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          <span className="font-bold text-lg">{rating.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">({totalRatings} reviews)</span>
        </div>
      )}

      {isVerified && (
        <Badge variant="default" className="bg-green-600 hover:bg-green-700">
          Verified
        </Badge>
      )}

      {completedJobs >= 3 && <span className="text-sm text-muted-foreground">{completedJobs} jobs completed</span>}
    </div>
  )
}

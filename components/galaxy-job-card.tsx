"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Sparkles, TrendingUp, Target } from "lucide-react"
import Link from "next/link"

interface GalaxyJobCardProps {
  job: {
    id: string
    title: string
    description: string
    location: string
    budget: number
    duration: string
    category?: string
    jobType?: string
    matchScore?: number
    estimatedEarnings?: number
    successProbability?: number
  }
  index?: number
}

export function GalaxyJobCard({ job, index = 0 }: GalaxyJobCardProps) {
  const hasAIMatch = job.matchScore !== undefined

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
        y: -8,
      }}
      className="h-full"
    >
      <Card className="h-full relative overflow-hidden border-2 hover:border-primary transition-all">
        {hasAIMatch && (
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent pointer-events-none" />
        )}

        <CardHeader>
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1">
              {job.category && (
                <Badge variant="outline" className="mb-2 text-xs">
                  {job.category}
                </Badge>
              )}
              <CardTitle className="text-xl">{job.title}</CardTitle>
            </div>
            {hasAIMatch && (
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
                  <Sparkles className="w-3 h-3 text-primary" />
                  <span className="text-xs font-bold text-primary">{job.matchScore}% Match</span>
                </div>
                {job.successProbability && (
                  <div className="flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded-full">
                    <Target className="w-3 h-3 text-green-600" />
                    <span className="text-xs font-semibold text-green-600">{job.successProbability}% Success</span>
                  </div>
                )}
              </div>
            )}
          </div>
          <CardDescription className="line-clamp-2">{job.description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {job.location}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              {job.duration}
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Budget</span>
              <span className="text-2xl font-bold text-primary">${job.budget.toLocaleString()}</span>
            </div>
            {job.estimatedEarnings && (
              <div className="flex items-center gap-2 bg-green-50 dark:bg-green-950 px-3 py-2 rounded-lg mb-3">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <div className="flex-1">
                  <p className="text-xs text-green-600 font-semibold">Estimated Earnings</p>
                  <p className="text-sm font-bold text-green-700 dark:text-green-400">
                    ${job.estimatedEarnings.toLocaleString()}
                  </p>
                </div>
              </div>
            )}
            <Link href={`/jobs/${job.id}`}>
              <Button className="w-full" variant={hasAIMatch ? "default" : "outline"}>
                {hasAIMatch ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI Recommended
                  </>
                ) : (
                  "View Details"
                )}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

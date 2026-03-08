"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock } from "lucide-react"
import Link from "next/link"

interface JobCardProps {
  job: {
    id: string
    title: string
    description: string
    location: string
    budget: number
    duration: string
    category: string
    skills_required: string[]
  }
}

export function JobCard({ job }: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full shadow-lg hover:shadow-2xl transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl">{job.title}</CardTitle>
              <Badge variant="secondary">{job.category}</Badge>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">${job.budget}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription className="line-clamp-2">{job.description}</CardDescription>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{job.duration}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {job.skills_required.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>

          <Link href={`/jobs/${job.id}`} className="block">
            <Button className="w-full">View Details</Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  )
}

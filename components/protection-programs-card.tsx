"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Check, Plus, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

interface ProtectionProgram {
  id: string
  name: string
  description: string
  coverageType: string
  baseCostPercentage?: number
  flatFee?: number
  maxCoverage: number
  features: string[]
}

interface ProtectionProgramsCardProps {
  programs: ProtectionProgram[]
  enrolledPrograms?: string[]
  onEnroll?: (programId: string) => void
}

export function ProtectionProgramsCard({ programs, enrolledPrograms = [], onEnroll }: ProtectionProgramsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="border-2 border-green-500/20 shadow-xl">
        <CardHeader className="border-b bg-gradient-to-r from-green-500/10 to-emerald-500/10">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500/20 rounded-full">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <CardTitle>Protection Programs</CardTitle>
              <CardDescription>Pride programs for extra peace of mind (not insurance)</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="space-y-4">
            {programs.slice(0, 3).map((program) => {
              const isEnrolled = enrolledPrograms.includes(program.id)

              return (
                <div
                  key={program.id}
                  className={`p-4 rounded-xl border-2 ${isEnrolled ? "border-green-500/50 bg-green-500/5" : "border-muted bg-muted/30"}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm">{program.name}</h4>
                        {isEnrolled && (
                          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
                            <Check className="w-3 h-3 mr-1" />
                            Active
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{program.description}</p>
                    </div>
                  </div>

                  <div className="mb-3 p-2 bg-background/50 rounded-lg">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Coverage</span>
                      <span className="font-semibold">Up to ${program.maxCoverage.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs mt-1">
                      <span className="text-muted-foreground">Cost</span>
                      <span className="font-semibold">
                        {program.flatFee
                          ? `$${program.flatFee.toFixed(2)}/job`
                          : `${program.baseCostPercentage}% of job value`}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-1 mb-3">
                    {program.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs">
                        <Check className="w-3 h-3 text-green-600 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {!isEnrolled && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => onEnroll?.(program.id)}
                    >
                      <Plus className="w-3 h-3 mr-2" />
                      Add to Next Job
                    </Button>
                  )}
                </div>
              )
            })}

            <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
              <div className="flex items-start gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-600 mb-1">Need Real Insurance?</p>
                  <p className="text-xs text-muted-foreground mb-3">
                    We partner with trusted insurance providers for comprehensive coverage
                  </p>
                  <Button size="sm" variant="outline" asChild>
                    <a href="/insurance-referrals" className="text-xs">
                      View Insurance Options
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Sparkles, Loader2, AlertTriangle, Crown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface AIJobCreatorProps {
  userId: string
  userPlan: string
  onJobGenerated?: (jobData: any) => void
}

export function AIJobCreator({ userId, userPlan, onJobGenerated }: AIJobCreatorProps) {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedJob, setGeneratedJob] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [floresWarning, setFloresWarning] = useState<string | null>(null)

  const canUseAI = userPlan !== "Free"

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setError(null)
    setFloresWarning(null)

    try {
      const response = await fetch("/api/ai/create-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, userId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate job")
      }

      setGeneratedJob(data.jobData)
      if (data.shouldReserveForFlores) {
        setFloresWarning(data.reservationMessage)
      }
      onJobGenerated?.(data.jobData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsGenerating(false)
    }
  }

  if (!canUseAI) {
    return (
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <CardTitle>AI Job Creator</CardTitle>
            <Badge variant="outline" className="ml-auto">
              <Crown className="w-3 h-3 mr-1" />
              Premium Feature
            </Badge>
          </div>
          <CardDescription>Generate professional job posts with AI</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <p className="text-muted-foreground mb-4">Upgrade to Pro or higher to use AI job creation</p>
            <Button asChild>
              <a href="/pricing">
                <Crown className="w-4 h-4 mr-2" />
                View Plans
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <CardTitle>AI Job Creator</CardTitle>
          <Badge variant="outline" className="ml-auto bg-primary/10 text-primary border-primary/30">
            Active
          </Badge>
        </div>
        <CardDescription>Describe your job and let AI create a professional posting</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Textarea
            placeholder="Example: Need a drip irrigation system installed for a 2-acre residential property with existing landscaping. Should include main line, zones, and smart controller..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={5}
            disabled={isGenerating}
          />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {floresWarning && (
          <Alert className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800 dark:text-yellow-200">{floresWarning}</AlertDescription>
          </Alert>
        )}

        <Button onClick={handleGenerate} disabled={isGenerating || !prompt.trim()} className="w-full" size="lg">
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Job Post
            </>
          )}
        </Button>

        <AnimatePresence>
          {generatedJob && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-lg border-2 border-primary/20"
            >
              <h3 className="font-bold text-lg mb-2">{generatedJob.title}</h3>
              <p className="text-sm text-muted-foreground mb-3 whitespace-pre-wrap">{generatedJob.description}</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-medium">Location:</span> {generatedJob.location}
                </div>
                <div>
                  <span className="font-medium">Budget:</span> ${generatedJob.budget.toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Duration:</span> {generatedJob.duration}
                </div>
                <div>
                  <span className="font-medium">Type:</span> {generatedJob.jobType}
                </div>
              </div>
              <div className="mt-3">
                <span className="text-sm font-medium">Skills: </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {generatedJob.skillsRequired.map((skill: string, i: number) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

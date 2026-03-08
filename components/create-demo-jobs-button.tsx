"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

export function CreateDemoJobsButton() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleCreateDemoJobs = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/create-demo-jobs", {
        method: "POST",
      })

      if (response.ok) {
        router.refresh()
        alert("Demo jobs created successfully! Check out the Jobs page.")
      } else {
        alert("Failed to create demo jobs. Please try again.")
      }
    } catch (error) {
      console.error("Error creating demo jobs:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleCreateDemoJobs} disabled={loading} variant="outline" size="lg">
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Creating...
        </>
      ) : (
        <>
          <Sparkles className="w-4 h-4 mr-2" />
          Create Demo Jobs
        </>
      )}
    </Button>
  )
}

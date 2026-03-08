import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

// AI Job Matching API
// Calculates match scores, estimated earnings, and success probability
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user profile
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    // Get open jobs
    const { data: jobs } = await supabase.from("jobs").select("*").eq("status", "open")

    if (!profile || !jobs) {
      return NextResponse.json({ matches: [] })
    }

    // AI Matching Algorithm (simplified - in production use real ML model)
    const matches = jobs.map((job) => {
      // Calculate skill match score
      const jobSkills = job.skills_required || []
      const userSkills = profile.skills || []
      const skillOverlap = jobSkills.filter((skill: string) => userSkills.includes(skill)).length
      const skillMatchScore = jobSkills.length > 0 ? (skillOverlap / jobSkills.length) * 100 : 50

      // Calculate experience match score based on completed jobs
      const experienceScore = Math.min(100, (profile.completed_jobs || 0) * 10 + 50)

      // Calculate availability score (always high for demo)
      const availabilityScore = 90

      // Overall match percentage
      const matchPercentage = Math.round(skillMatchScore * 0.5 + experienceScore * 0.3 + availabilityScore * 0.2)

      // Estimated earnings (budget + potential bonus based on profile rating)
      const ratingMultiplier = 1 + ((profile.average_rating || 0) - 3) * 0.1
      const estimatedEarnings = Math.round(job.budget * ratingMultiplier * (1 + Math.random() * 0.2))

      // Success probability based on match score and rating
      const successProbability = Math.min(
        99,
        Math.round(matchPercentage * 0.7 + (profile.average_rating || 0) * 5 + 20),
      )

      return {
        job_id: job.id,
        worker_id: user.id,
        match_percentage: matchPercentage,
        estimated_earnings: estimatedEarnings,
        success_probability: successProbability,
        skill_match_score: Math.round(skillMatchScore),
        experience_match_score: Math.round(experienceScore),
        availability_match_score: availabilityScore,
      }
    })

    // Store match scores in database
    for (const match of matches) {
      await supabase.from("job_match_scores").upsert(
        {
          job_id: match.job_id,
          worker_id: match.worker_id,
          match_percentage: match.match_percentage,
          estimated_earnings: match.estimated_earnings,
          success_probability: match.success_probability,
          skill_match_score: match.skill_match_score,
          experience_match_score: match.experience_match_score,
          availability_match_score: match.availability_match_score,
        },
        { onConflict: "job_id,worker_id" },
      )
    }

    return NextResponse.json({ matches, success: true })
  } catch (error: any) {
    console.error("[v0] Error in match-jobs API:", error)
    return NextResponse.json({ error: "Failed to calculate job matches", details: error.message }, { status: 500 })
  }
}

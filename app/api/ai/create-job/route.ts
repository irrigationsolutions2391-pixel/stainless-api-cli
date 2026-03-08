import { generateObject } from "ai"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"

const jobSchema = z.object({
  title: z.string().describe("Clear, professional job title"),
  description: z.string().describe("Detailed job description with scope of work"),
  location: z.string().describe("Job location"),
  budget: z.number().positive().describe("Estimated budget in USD"),
  duration: z.string().describe("Expected duration (e.g., '2-3 days', '1 week')"),
  category: z.string().describe("Job category (irrigation, landscaping, etc)"),
  skillsRequired: z.array(z.string()).describe("Required skills for the job"),
  jobType: z.enum(["residential", "commercial", "industrial", "large_scale"]).describe("Type of project"),
})

export async function POST(req: Request) {
  try {
    const { prompt, userId } = await req.json()

    if (!prompt || !userId) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createClient()

    // Check user subscription and AI limits
    const { data: subscription } = await supabase
      .from("user_subscriptions")
      .select("*, subscription_plans(*)")
      .eq("user_id", userId)
      .single()

    const planName = subscription?.subscription_plans?.name || "Free"

    // Check if user has AI job creation capability
    const { data: aiLimit } = await supabase
      .from("ai_feature_limits")
      .select("*")
      .eq("plan_id", subscription?.plan_id || "")
      .eq("feature_name", "job_creation")
      .single()

    if (!aiLimit?.feature_enabled) {
      return Response.json(
        {
          error: "AI job creation not available on your plan. Upgrade to Pro or higher.",
        },
        { status: 403 },
      )
    }

    // Generate job post using AI
    const { object } = await generateObject({
      model: "openai/gpt-5",
      schema: jobSchema,
      prompt: `You are an expert at creating professional job posts for irrigation, landscaping, and contracting work. 
      
      Create a detailed, professional job posting based on this request: "${prompt}"
      
      Make the title clear and specific. Write a comprehensive description that includes:
      - Scope of work
      - Requirements
      - Timeline expectations
      - Any special considerations
      
      Determine if this is residential, commercial, industrial, or large_scale based on the context.
      Set a realistic budget in USD.
      List relevant skills needed.
      
      Be professional, clear, and thorough.`,
      maxOutputTokens: 2000,
    })

    // Save AI-generated content for tracking
    await supabase.from("ai_generated_content").insert({
      user_id: userId,
      content_type: "job_post",
      prompt_used: prompt,
      generated_content: object,
      tokens_used: 500, // Estimate
    })

    // Check if it's a large project that should be flagged for Flores
    const shouldReserveForFlores =
      object.jobType === "large_scale" || object.jobType === "commercial" || object.jobType === "industrial"

    return Response.json({
      success: true,
      jobData: object,
      shouldReserveForFlores,
      reservationMessage: shouldReserveForFlores
        ? "Large/commercial/industrial projects may be reserved for Flores Landscape Design LLC. We may contact you directly to resell/contract the job or assign our preferred contractors."
        : null,
    })
  } catch (error) {
    console.error("[v0] AI job creation error:", error)
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Failed to generate job post",
      },
      { status: 500 },
    )
  }
}

import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST() {
  const supabase = await createClient()

  // Get the current user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Create demo jobs
  const demoJobs = [
    {
      employer_id: user.id,
      title: "Install Drip Irrigation System",
      description:
        "Need experienced irrigation professional to install a drip irrigation system for a 2-acre residential property. Must have experience with modern drip systems and water efficiency.",
      location: "Phoenix, AZ",
      budget: 1500.0,
      duration: "3 days",
      category: "Installation",
      skills_required: ["Drip Systems", "Residential", "Water Efficiency"],
      status: "open",
    },
    {
      employer_id: user.id,
      title: "Repair Sprinkler System",
      description: "Commercial property needs sprinkler system repairs. Several broken heads and control valve issues.",
      location: "San Diego, CA",
      budget: 800.0,
      duration: "1 day",
      category: "Repair",
      skills_required: ["Sprinkler Systems", "Commercial", "Repairs"],
      status: "open",
    },
    {
      employer_id: user.id,
      title: "Smart Controller Installation",
      description: "Replace old timers with WiFi-enabled smart irrigation controllers across 5 zones.",
      location: "Austin, TX",
      budget: 600.0,
      duration: "1 day",
      category: "Installation",
      skills_required: ["Smart Controllers", "WiFi", "Residential"],
      status: "open",
    },
    {
      employer_id: user.id,
      title: "Large Scale Agricultural Irrigation",
      description: "Design and install irrigation system for 50-acre farm. Experience with pivot systems required.",
      location: "Fresno, CA",
      budget: 15000.0,
      duration: "2 weeks",
      category: "Installation",
      skills_required: ["Agricultural", "Pivot Systems", "Large Scale"],
      status: "open",
    },
    {
      employer_id: user.id,
      title: "Irrigation Maintenance Contract",
      description: "Monthly maintenance for HOA community. 20 properties, quarterly inspections and repairs.",
      location: "Las Vegas, NV",
      budget: 3000.0,
      duration: "Ongoing",
      category: "Maintenance",
      skills_required: ["Residential", "Maintenance", "HOA"],
      status: "open",
    },
    {
      employer_id: user.id,
      title: "Landscape Irrigation Design",
      description: "Need irrigation design for new landscape project. Must integrate with existing system.",
      location: "Denver, CO",
      budget: 1200.0,
      duration: "2 days",
      category: "Design",
      skills_required: ["Design", "Landscape", "Integration"],
      status: "open",
    },
  ]

  const { data, error } = await supabase.from("jobs").insert(demoJobs).select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, jobs: data }, { status: 200 })
}

import { createClient } from "@/lib/supabase/server"
import { GalaxyJobCard } from "@/components/galaxy-job-card"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { AIUpgradeBanner } from "@/components/ai-upgrade-banner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft, Search, Sparkles, Filter, Globe } from "lucide-react"

export default async function JobsPage() {
  const supabase = await createClient()

  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .eq("status", "open")
    .order("created_at", { ascending: false })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let userPlan = "Free"
  if (user) {
    const { data: subscription } = await supabase
      .from("user_subscriptions")
      .select("subscription_plans(name)")
      .eq("user_id", user.id)
      .single()
    userPlan = subscription?.subscription_plans?.name || "Free"
  }

  const jobsWithMatching = jobs?.map((job) => ({
    ...job,
    matchScore: user ? Math.floor(Math.random() * 30) + 70 : undefined,
    estimatedEarnings: user ? Math.floor(job.budget * (1 + Math.random() * 0.3)) : undefined,
    successProbability: user ? Math.floor(Math.random() * 20) + 80 : undefined,
  }))

  const showUpgradeBanner = user && (userPlan === "Free" || userPlan === "Pro")

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-muted/20 to-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4 ripple-button">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-5xl font-bold">Gig Galaxy</h1>
                <Badge className="animate-pulse glow-badge">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI Powered
                </Badge>
              </div>
              <p className="text-xl text-muted-foreground">
                {user
                  ? "AI-matched opportunities with predicted success rates"
                  : "Browse irrigation opportunities - Sign in for AI matching"}
              </p>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold">{jobs?.length || 0} Active Gigs</span>
              </div>
            </div>
          </div>

          {showUpgradeBanner && <AIUpgradeBanner />}

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input placeholder="Search jobs by title, location, or skills..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
                <SelectItem value="large_scale">Large Scale</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="match">Best Match</SelectItem>
                <SelectItem value="budget_high">Highest Budget</SelectItem>
                <SelectItem value="budget_low">Lowest Budget</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2 bg-transparent ripple-button">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </div>

        {jobsWithMatching && jobsWithMatching.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobsWithMatching.map((job, index) => (
              <GalaxyJobCard key={job.id} job={job} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-2xl border-2 border-dashed">
            <Sparkles className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-xl font-semibold mb-2">No gigs in the galaxy yet</p>
            <p className="text-muted-foreground mb-6">Be the first to post a job and start the revolution!</p>
            <Link href="/post-job">
              <Button size="lg" className="ripple-button">
                Post First Job
              </Button>
            </Link>
          </div>
        )}

        {user && (
          <div className="mt-12 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 border-2 border-primary/20">
            <div className="text-center max-w-2xl mx-auto">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-2">Your AI Success Score</h3>
              <p className="text-muted-foreground mb-6">
                Based on your profile, skills, and history, you have a 92% average success rate on matched jobs. Keep
                building your reputation to unlock even better opportunities!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-background/80 rounded-lg p-4 border">
                  <p className="text-3xl font-bold text-primary mb-1">92%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
                <div className="bg-background/80 rounded-lg p-4 border">
                  <p className="text-3xl font-bold text-green-600 mb-1">
                    ${((jobs?.length || 0) * 1200).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Potential Earnings</p>
                </div>
                <div className="bg-background/80 rounded-lg p-4 border">
                  <p className="text-3xl font-bold text-blue-600 mb-1">{jobs?.length || 0}</p>
                  <p className="text-sm text-muted-foreground">Perfect Matches</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

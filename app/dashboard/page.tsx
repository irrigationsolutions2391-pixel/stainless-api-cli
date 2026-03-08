import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { CreateDemoJobsButton } from "@/components/create-demo-jobs-button"
import { RatingDisplay } from "@/components/rating-display"
import { WalletCard } from "@/components/wallet-card"
import { ProtectionProgramsCard } from "@/components/protection-programs-card"
import { SuperAIChatV2 } from "@/components/super-ai-chat-v2"
import { ARYardScanner } from "@/components/ar-yard-scanner"
import { AIUpgradeBanner } from "@/components/ai-upgrade-banner"
import { DailyStreakCard } from "@/components/daily-streak-card"
import Link from "next/link"
import { Plus, Briefcase } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  const { data: wallet } = await supabase.from("user_wallets").select("*").eq("user_id", data.user.id).single()

  const { data: subscription } = await supabase
    .from("user_subscriptions")
    .select("*, subscription_plans(*)")
    .eq("user_id", data.user.id)
    .single()

  const { data: protectionPrograms } = await supabase
    .from("protection_programs")
    .select("*")
    .eq("is_active", true)
    .limit(3)

  const { count: jobsCount } = await supabase
    .from("jobs")
    .select("*", { count: "exact", head: true })
    .eq("employer_id", data.user.id)

  const { count: applicationsCount } = await supabase
    .from("applications")
    .select("*", { count: "exact", head: true })
    .eq("worker_id", data.user.id)

  const userPlan = subscription?.subscription_plans?.name || "Free"
  const isPremium = userPlan === "Premium Contractor" || userPlan === "Business Enterprise"
  const showUpgradeBanner = userPlan === "Free" || userPlan === "Pro"

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {profile?.full_name || data.user.email}!</h1>
          <p className="text-muted-foreground">Manage your jobs, wallet, and grow your wealth</p>

          {profile && (
            <div className="mt-4">
              <RatingDisplay
                rating={profile.average_rating || 0}
                totalRatings={profile.total_ratings || 0}
                completedJobs={profile.completed_jobs || 0}
                isVerified={profile.is_verified || false}
                showNewBadge={profile.completed_jobs < 3}
              />
            </div>
          )}
        </div>

        {showUpgradeBanner && <AIUpgradeBanner />}

        <div className="mb-6">
          <DailyStreakCard userId={data.user.id} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <WalletCard
              balance={wallet?.balance || 0}
              totalEarned={wallet?.total_earned || 0}
              totalSpent={wallet?.total_spent || 0}
            />
          </div>

          <div className="lg:col-span-1">
            <ProtectionProgramsCard
              programs={
                protectionPrograms?.map((p) => ({
                  id: p.id,
                  name: p.name,
                  description: p.description,
                  coverageType: p.coverage_type,
                  baseCostPercentage: p.base_cost_percentage,
                  flatFee: p.flat_fee,
                  maxCoverage: p.max_coverage,
                  features: p.features || [],
                })) || []
              }
            />
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-primary/5 rounded-xl border">
                  <p className="text-sm text-muted-foreground mb-1">Jobs Posted</p>
                  <p className="text-3xl font-bold">{jobsCount || 0}</p>
                </div>
                <div className="p-4 bg-blue-500/5 rounded-xl border">
                  <p className="text-sm text-muted-foreground mb-1">Applications</p>
                  <p className="text-3xl font-bold">{applicationsCount || 0}</p>
                </div>
                <div className="p-4 bg-green-500/5 rounded-xl border">
                  <p className="text-sm text-muted-foreground mb-1">Completed</p>
                  <p className="text-3xl font-bold">{profile?.completed_jobs || 0}</p>
                  {profile && profile.completed_jobs < 3 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {3 - profile.completed_jobs} more to unlock ratings
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">AR Yard Scanner</h2>
          <ARYardScanner isPremium={isPremium} />
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <Link href="/post-job">
              <Button size="lg" className="ripple-button">
                <Plus className="w-5 h-5 mr-2" />
                Post a Job
              </Button>
            </Link>
            <Link href="/jobs">
              <Button size="lg" variant="outline" className="ripple-button bg-transparent">
                Browse Jobs
              </Button>
            </Link>
            <CreateDemoJobsButton />
          </div>

          <div className="pt-8">
            <h2 className="text-2xl font-bold mb-4">AI Wealth Assistant</h2>
            <SuperAIChatV2
              userPlan={userPlan}
              userId={data.user.id}
              onUpgradePrompt={() => (window.location.href = "/pricing")}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

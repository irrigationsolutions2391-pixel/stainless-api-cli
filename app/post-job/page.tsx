import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { JobPostForm } from "@/components/job-post-form"
import { AIJobCreator } from "@/components/ai-job-creator"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ArrowLeft, Sparkles, Edit } from "lucide-react"

export default async function PostJobPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  const { data: subscription } = await supabase
    .from("user_subscriptions")
    .select("*, subscription_plans(*)")
    .eq("user_id", user.id)
    .single()

  const userPlan = subscription?.subscription_plans?.name || "Free"

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-12 flex-1">
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Post a Job</h1>
            <p className="text-lg text-muted-foreground">
              Find the perfect contractor for your irrigation or landscaping project
            </p>
          </div>

          <Tabs defaultValue="ai" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ai" className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                AI Creator
              </TabsTrigger>
              <TabsTrigger value="manual" className="flex items-center gap-2">
                <Edit className="w-4 h-4" />
                Manual Entry
              </TabsTrigger>
            </TabsList>
            <TabsContent value="ai" className="mt-6">
              <AIJobCreator userId={user.id} userPlan={userPlan} />
            </TabsContent>
            <TabsContent value="manual" className="mt-6">
              <JobPostForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  )
}

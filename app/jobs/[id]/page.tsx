import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { SuperAIChat } from "@/components/super-ai-chat"
import { GigBoostUpsell } from "@/components/gig-boost-upsell"
import { JobInsuranceAddon } from "@/components/job-insurance-addon"
import Link from "next/link"
import { ArrowLeft, MapPin, Clock, DollarSign, Briefcase } from "lucide-react"
import { notFound } from "next/navigation"

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: job } = await supabase.from("jobs").select("*").eq("id", id).single()

  if (!job) {
    notFound()
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()
  const isJobPoster = user?.id === job.user_id

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-12 flex-1">
        <Link href="/jobs">
          <Button variant="ghost" className="mb-8 ripple-button">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {isJobPoster && <GigBoostUpsell jobId={job.id} jobTitle={job.title} />}

            <Card className="shadow-xl">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl mb-2">{job.title}</CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{job.category}</Badge>
                      <Badge variant="outline">{job.status}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Budget</p>
                    <p className="text-3xl font-bold text-primary">${job.budget}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">Job Description</h3>
                  <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{job.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-medium">{job.duration}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-3">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills_required.map((skill: string) => (
                      <Badge key={skill} variant="outline" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {!isJobPoster && <JobInsuranceAddon jobBudget={job.budget} />}

                <div className="pt-4">
                  <Button size="lg" className="w-full md:w-auto px-8 ripple-button">
                    <Briefcase className="w-5 h-5 mr-2" />
                    Apply for this Job
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full md:w-auto px-8 ml-0 md:ml-4 mt-4 md:mt-0 bg-transparent ripple-button"
                  >
                    <DollarSign className="w-5 h-5 mr-2" />
                    Pay Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Posted</p>
                  <p className="font-medium">{new Date(job.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium">{job.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium capitalize">{job.status}</p>
                </div>
              </CardContent>
            </Card>

            <div className="lg:sticky lg:top-4">
              <SuperAIChat />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

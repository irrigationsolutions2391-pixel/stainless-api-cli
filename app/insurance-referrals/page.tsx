import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Shield, TrendingUp, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function InsuranceReferralsPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  const { data: insuranceOptions } = await supabase
    .from("insurance_referrals")
    .select("*")
    .eq("is_active", true)
    .order("insurance_type")

  const groupedInsurance = insuranceOptions?.reduce(
    (acc, insurance) => {
      if (!acc[insurance.insurance_type]) {
        acc[insurance.insurance_type] = []
      }
      acc[insurance.insurance_type].push(insurance)
      return acc
    },
    {} as Record<string, typeof insuranceOptions>,
  )

  const insuranceTypeLabels: Record<string, string> = {
    liability: "General Liability",
    workers_comp: "Workers Compensation",
    equipment: "Equipment & Tools",
    vehicle: "Commercial Vehicle",
    business: "Business Insurance",
    professional: "Professional Liability",
  }

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

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">Insurance Partners</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Connect with trusted insurance providers for comprehensive coverage. IrrigGig AI partners with leading
            insurance companies to help protect your business.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Earn Referral Bonuses</h3>
              <p className="text-sm text-muted-foreground">
                When you sign up through our partner links, IrrigGig AI may earn a small commission to help keep the
                platform running. This doesn't affect your pricing.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {groupedInsurance &&
            Object.entries(groupedInsurance).map(([type, options]) => (
              <div key={type}>
                <h2 className="text-2xl font-bold mb-4">{insuranceTypeLabels[type] || type}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {options?.map((insurance) => (
                    <Card key={insurance.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-xl">{insurance.company_name}</CardTitle>
                            <CardDescription className="mt-2">{insurance.description}</CardDescription>
                          </div>
                          {insurance.commission_rate && (
                            <Badge variant="outline" className="ml-2">
                              {insurance.commission_rate}% partner
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <a href={insurance.referral_url} target="_blank" rel="noopener noreferrer">
                          <Button className="w-full" variant="default">
                            Get a Quote
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </Button>
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
        </div>

        <div className="mt-12 bg-muted/50 rounded-lg p-8 border">
          <h3 className="text-xl font-bold mb-4">Important Insurance Information</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>
                IrrigGig AI provides these referral links as a convenience. We are not insurance brokers or agents.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>
                You are responsible for selecting appropriate coverage and understanding your insurance policies.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>
                Insurance requirements vary by location and job type. Consult with insurance professionals for guidance.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>
                Protection programs on IrrigGig AI are NOT insurance and do not replace professional coverage.
              </span>
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  )
}

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <AlertTriangle className="w-8 h-8 text-destructive" />
            <h1 className="text-4xl font-bold">Platform Disclaimer</h1>
          </div>

          <Card className="mb-6 border-destructive/50">
            <CardHeader className="bg-destructive/10">
              <CardTitle className="text-destructive">CRITICAL LEGAL NOTICE</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-lg font-semibold leading-relaxed">
                IrrigGig AI is ONLY a technology platform connecting users. We are NOT responsible for any job quality,
                payment disputes, injuries, damages, taxes, insurance, or legal compliance. All users (homeowners,
                contractors, businesses) are fully responsible for their actions, contracts, work quality, safety,
                insurance, taxes, and compliance with all laws. IrrigGig AI provides no warranties and disclaims all
                liability to the maximum extent permitted by law.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>We Are a Platform, Not a Contractor or Employer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-relaxed">
                <p>
                  IrrigGig AI operates as a neutral technology platform that facilitates connections between independent
                  contractors and clients seeking services. We do not:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Employ, supervise, direct, or control any contractors or service providers</li>
                  <li>Perform irrigation, landscaping, or contracting work</li>
                  <li>Guarantee the quality, safety, or legality of any work performed</li>
                  <li>Verify licenses, insurance, or qualifications beyond basic identity checks</li>
                  <li>Act as an agent, representative, or partner of any user</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>No Liability for User Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                  <p className="font-semibold text-destructive mb-2">WE ARE NOT RESPONSIBLE FOR:</p>
                  <ul className="space-y-1">
                    <li>• Property damage, personal injuries, or crop/landscape loss</li>
                    <li>• Poor workmanship, incomplete projects, or contract breaches</li>
                    <li>• Payment disputes, non-payment, or fraud between users</li>
                    <li>• Unlicensed work, permit violations, or code non-compliance</li>
                    <li>• Lack of insurance, workers compensation, or liability coverage</li>
                    <li>• Tax obligations, payroll taxes, or 1099 reporting</li>
                    <li>• Safety violations, OSHA compliance, or workplace accidents</li>
                    <li>• Environmental damage or water waste issues</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">
                  <strong>If you are a CLIENT/HOMEOWNER,</strong> you are responsible for:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm mb-4">
                  <li>Verifying contractor licenses, insurance, and references</li>
                  <li>Ensuring your project has proper permits and approvals</li>
                  <li>Creating clear written contracts with scope, pricing, and timelines</li>
                  <li>Inspecting work quality and addressing issues directly with contractors</li>
                  <li>Making payments as agreed in your contracts</li>
                </ul>
                <p className="text-sm mb-3">
                  <strong>If you are a CONTRACTOR/SERVICE PROVIDER,</strong> you are responsible for:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Maintaining valid licenses, permits, and insurance coverage</li>
                  <li>Complying with all local, state, and federal laws</li>
                  <li>Providing quality work that meets professional standards</li>
                  <li>Ensuring workplace safety and OSHA compliance</li>
                  <li>Paying all applicable taxes (income, self-employment, sales tax)</li>
                  <li>Obtaining workers compensation insurance if you have employees</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>No Warranties</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <p>
                  IrrigGig AI is provided "AS IS" and "AS AVAILABLE" without any warranties of any kind, express or
                  implied, including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Warranties of merchantability or fitness for a particular purpose</li>
                  <li>Accuracy, reliability, or completeness of information on the platform</li>
                  <li>Uninterrupted or error-free operation</li>
                  <li>Security or freedom from viruses or malicious code</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <p className="font-semibold">TO THE MAXIMUM EXTENT PERMITTED BY LAW:</p>
                <p>
                  Flores Landscape Design LLC, Hugo Vazquez, and IrrigGig AI SHALL NOT BE LIABLE for any direct,
                  indirect, incidental, consequential, special, punitive, or exemplary damages arising from or related
                  to your use of the platform, including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Lost profits, revenue, or business opportunities</li>
                  <li>Property damage or personal injury</li>
                  <li>Data loss or corruption</li>
                  <li>Disputes between users</li>
                  <li>Work quality issues or project failures</li>
                </ul>
                <p className="mt-4 font-semibold">
                  Our maximum total liability is limited to the lesser of: (a) the fees you paid to IrrigGig AI in the
                  12 months prior to the claim, or (b) $100.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Verification & Ratings</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <p>
                  "Verified" badges indicate that a user has completed basic identity and business verification. This
                  does NOT mean:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>We have verified their work quality, skills, or experience</li>
                  <li>They have active insurance or proper licenses</li>
                  <li>We endorse or recommend their services</li>
                  <li>They will complete work satisfactorily</li>
                </ul>
                <p className="mt-3">
                  Ratings and reviews are user-generated content. We do not verify their accuracy and are not
                  responsible for false or misleading reviews.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Protection Programs Are Not Insurance</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <p>
                  Optional protection programs offered on IrrigGig AI are <strong>NOT insurance policies</strong> and do
                  not replace professional liability, workers compensation, or other required insurance.
                </p>
                <p>These programs have specific terms, limitations, exclusions, and claim procedures.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Large Project Reservations</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p>
                  Certain large-scale commercial or industrial projects posted on IrrigGig AI may be reserved for or
                  assigned to Flores Landscape Design LLC or our preferred contractor network. We reserve the right to
                  contact clients directly about these opportunities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Indemnification</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p>
                  You agree to indemnify, defend, and hold harmless IrrigGig AI, Flores Landscape Design LLC, Hugo
                  Vazquez, and our affiliates from any claims, damages, losses, liabilities, and expenses (including
                  legal fees) arising from:
                </p>
                <ul className="list-disc pl-6 space-y-1 mt-3">
                  <li>Your use of the platform</li>
                  <li>Your provision or receipt of services arranged through the platform</li>
                  <li>Your violation of these terms or applicable laws</li>
                  <li>Your interactions or disputes with other users</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact & Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>If you have questions about this disclaimer:</p>
                <p>
                  <strong>Email:</strong> irrigationsolutions2391@gmail.com
                </p>
                <p>
                  <strong>Company:</strong> Flores Landscape Design LLC
                </p>
                <p>
                  <strong>Owner:</strong> Hugo Vazquez (The Phoenix)
                </p>
                <p className="mt-4 text-xs text-muted-foreground">
                  © 2025-2026 FloresLandscapeDesignLlc - All Rights Reserved
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Scale className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">Terms of Service</h1>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Last Updated: January 2025</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none dark:prose-invert">
              <p className="text-muted-foreground">
                These Terms of Service govern your use of IrrigGig AI, a marketplace platform operated by Flores
                Landscape Design LLC. By using our services, you agree to these terms.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>1. Platform Nature & Disclaimer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-relaxed">
                  <strong>IrrigGig AI is ONLY a technology platform</strong> that connects independent contractors,
                  service providers, businesses, and clients. We are NOT an employer, contractor, or agency.
                </p>
                <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
                  <p className="text-sm font-semibold text-destructive mb-2">CRITICAL DISCLAIMER:</p>
                  <p className="text-sm leading-relaxed">
                    We are NOT responsible for: job quality, payment disputes, injuries, property damage, taxes,
                    insurance coverage, legal compliance, permits, licenses, or any actions taken by users. All users
                    are fully responsible for their own actions, contracts, work quality, safety, insurance, and
                    compliance with all applicable laws.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. User Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm font-semibold">
                  By using IrrigGig AI, you agree that you are solely responsible for:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>Verifying credentials, licenses, insurance, and qualifications of contractors</li>
                  <li>Negotiating contracts, scope of work, pricing, and payment terms</li>
                  <li>Ensuring compliance with local laws, building codes, and regulations</li>
                  <li>Obtaining necessary permits and approvals for projects</li>
                  <li>Maintaining appropriate insurance coverage (liability, workers comp, etc.)</li>
                  <li>Paying all applicable taxes on income earned through the platform</li>
                  <li>Ensuring workplace safety and OSHA compliance</li>
                  <li>Resolving disputes directly with other users</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Account Registration & Verification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  You must provide accurate information when creating an account. You are responsible for maintaining
                  account security.
                </p>
                <p>
                  Verified badges indicate that a user has completed our verification process (identity, business
                  documentation), but do NOT guarantee work quality, reliability, or legal compliance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Payments & Fees</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  IrrigGig AI may charge service fees, subscription fees, and transaction fees as displayed on the
                  platform.
                </p>
                <p>
                  Payment processing is handled by third-party providers (Stripe). Wallet funds are held by our payment
                  processor. We are not a bank or financial institution.
                </p>
                <p>
                  Users are responsible for all payment disputes, chargebacks, and refund requests directly with each
                  other.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Protection Programs (NOT Insurance)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  Protection programs offered on IrrigGig AI are <strong>optional extras</strong> and are{" "}
                  <strong>NOT insurance policies</strong>. They do not replace professional insurance coverage.
                </p>
                <p>Coverage terms, limitations, and claim processes are defined in separate program agreements.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  All platform content, code, designs, and trademarks are © 2025-2026 Flores Landscape Design LLC, Hugo
                  Vazquez. All rights reserved.
                </p>
                <p>
                  Users retain ownership of content they upload but grant IrrigGig AI a license to display it on the
                  platform.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Prohibited Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>Fraudulent listings, fake reviews, or misrepresentation</li>
                  <li>Circumventing platform fees or direct payment outside the system (if required)</li>
                  <li>Harassment, discrimination, or abusive behavior</li>
                  <li>Violation of local, state, or federal laws</li>
                  <li>Scraping, copying, or reverse engineering the platform</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</strong>
                </p>
                <p>
                  IrrigGig AI, Flores Landscape Design LLC, and Hugo Vazquez are NOT LIABLE for any direct, indirect,
                  incidental, consequential, or punitive damages arising from use of the platform, including but not
                  limited to: property damage, personal injury, lost profits, work quality issues, or disputes between
                  users.
                </p>
                <p>
                  Our total liability is limited to the amount of fees you paid to IrrigGig AI in the 12 months prior to
                  the claim.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Indemnification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  You agree to indemnify and hold harmless IrrigGig AI, Flores Landscape Design LLC, and Hugo Vazquez
                  from any claims, damages, or expenses arising from your use of the platform or services performed.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Dispute Resolution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  Disputes between users must be resolved directly between the parties. IrrigGig AI is not responsible
                  for mediating or resolving disputes.
                </p>
                <p>
                  Any disputes with IrrigGig AI itself shall be resolved through binding arbitration in accordance with
                  the laws of the State of Arizona.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>11. Termination</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  We reserve the right to suspend or terminate accounts that violate these terms or engage in prohibited
                  activities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>12. Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  We may update these Terms of Service at any time. Continued use of the platform after changes
                  constitutes acceptance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  <strong>Email:</strong> irrigationsolutions2391@gmail.com
                </p>
                <p>
                  <strong>Company:</strong> Flores Landscape Design LLC
                </p>
                <p>
                  <strong>Owner:</strong> Hugo Vazquez (The Phoenix)
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

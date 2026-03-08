import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Last Updated: January 2025</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Flores Landscape Design LLC ("we," "us," "our") operates IrrigGig AI. This Privacy Policy explains how
                we collect, use, and protect your personal information.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>1. Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="font-semibold">Account Information:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Name, email address, phone number</li>
                  <li>Business name, address, license numbers (for contractors)</li>
                  <li>Payment information (processed securely by Stripe)</li>
                </ul>
                <p className="font-semibold mt-4">Usage Data:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Job postings, bids, messages, reviews</li>
                  <li>Browsing activity, device information, IP address</li>
                  <li>Location data (if you enable it)</li>
                </ul>
                <p className="font-semibold mt-4">AI Interactions:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Chat messages with SuperAI assistant</li>
                  <li>Voice recordings (if you use voice features)</li>
                  <li>AI-generated content and recommendations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>Provide and improve the IrrigGig AI platform</li>
                  <li>Match contractors with jobs using AI algorithms</li>
                  <li>Process payments and subscriptions</li>
                  <li>Send notifications about jobs, bids, and platform updates</li>
                  <li>Prevent fraud and ensure platform security</li>
                  <li>Analyze usage patterns to improve services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Information Sharing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>We share your information with:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Other Users:</strong> Your profile, ratings, and job-related communications are visible to
                    users you interact with
                  </li>
                  <li>
                    <strong>Service Providers:</strong> Stripe (payments), Supabase (database), OpenAI (AI features),
                    analytics providers
                  </li>
                  <li>
                    <strong>Insurance Partners:</strong> If you click referral links, we may share limited data to track
                    commissions
                  </li>
                  <li>
                    <strong>Legal Compliance:</strong> Law enforcement or courts when required by law
                  </li>
                </ul>
                <p className="mt-4">
                  <strong>We DO NOT sell your personal information to third parties for marketing purposes.</strong>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Data Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>We use industry-standard security measures including:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Encryption of data in transit (HTTPS/TLS)</li>
                  <li>Encrypted storage of sensitive data</li>
                  <li>Secure authentication via Supabase</li>
                  <li>Regular security audits and updates</li>
                </ul>
                <p className="mt-4">
                  However, no system is 100% secure. You are responsible for maintaining the security of your account
                  credentials.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Your Rights & Choices</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2 text-sm">
                  <li>
                    <strong>Access:</strong> Request a copy of your personal data
                  </li>
                  <li>
                    <strong>Correction:</strong> Update inaccurate information in your account settings
                  </li>
                  <li>
                    <strong>Deletion:</strong> Request account deletion (subject to legal retention requirements)
                  </li>
                  <li>
                    <strong>Opt-Out:</strong> Unsubscribe from marketing emails (transactional emails will continue)
                  </li>
                  <li>
                    <strong>Data Portability:</strong> Request your data in a portable format
                  </li>
                </ul>
                <p className="mt-4 text-sm">
                  To exercise these rights, contact us at irrigationsolutions2391@gmail.com
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Cookies & Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>We use cookies and similar technologies to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Keep you logged in</li>
                  <li>Remember your preferences</li>
                  <li>Analyze site traffic and usage patterns</li>
                  <li>Provide targeted content and recommendations</li>
                </ul>
                <p className="mt-4">
                  You can control cookies through your browser settings, but this may limit functionality.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p>
                  IrrigGig AI is not intended for users under 18. We do not knowingly collect information from children.
                  If we discover we have collected data from a minor, we will delete it promptly.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. International Users</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p>
                  IrrigGig AI is operated in the United States. If you access the platform from outside the US, your
                  data may be transferred to and processed in the US, which may have different data protection laws.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Enhanced Network Program</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p>
                  By agreeing to the Enhanced Network Program during signup, you consent to the installation of platform
                  services that may enable future connectivity features. This program is currently inactive and will
                  require owner activation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Changes to This Policy</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of significant changes via
                  email or platform notification. Continued use after changes constitutes acceptance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>For privacy questions or to exercise your rights:</p>
                <p>
                  <strong>Email:</strong> irrigationsolutions2391@gmail.com
                </p>
                <p>
                  <strong>Company:</strong> Flores Landscape Design LLC
                </p>
                <p>
                  <strong>Owner:</strong> Hugo Vazquez
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

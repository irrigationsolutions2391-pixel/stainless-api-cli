import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Crown, Building2, Sparkles, Bot } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    price: 0,
    icon: Star,
    description: "Perfect for getting started",
    aiFeatures: {
      chatMessages: "50/month",
      jobCreation: "Not available",
      voiceChat: "Not available",
      matching: "5/month",
    },
    features: [
      "Basic browsing",
      "Post up to 3 active jobs",
      "Standard support",
      "Basic profile",
      "Job search filters",
      "50 AI chat messages/month",
      "Basic contractor matching",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: 29,
    icon: Zap,
    description: "For active professionals",
    aiFeatures: {
      chatMessages: "500/month",
      jobCreation: "10/month",
      voiceChat: "Not available",
      matching: "50/month",
    },
    features: [
      "Everything in Free",
      "Unlimited job postings",
      "Priority in search results",
      "Faster support response",
      "500 AI chat messages/month",
      "AI job post creation (10/month)",
      "Advanced contractor matching",
      "Email notifications",
    ],
    cta: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Premium Contractor",
    price: 79,
    icon: Crown,
    description: "For serious contractors",
    aiFeatures: {
      chatMessages: "Unlimited",
      jobCreation: "Unlimited",
      voiceChat: "100/month",
      matching: "Unlimited",
    },
    features: [
      "Everything in Pro",
      "Verified contractor badge",
      "Featured listings",
      "Analytics dashboard",
      "Unlimited AI features",
      "Voice chat with AI (100/month)",
      "AI job recommendations",
      "Priority for large projects",
      "Premium support 24/7",
    ],
    cta: "Go Premium",
    popular: false,
  },
  {
    name: "Business Enterprise",
    price: 199,
    icon: Building2,
    description: "For established businesses",
    aiFeatures: {
      chatMessages: "Unlimited",
      jobCreation: "Unlimited",
      voiceChat: "Unlimited",
      matching: "Unlimited",
    },
    features: [
      "Everything in Premium",
      "Team accounts (up to 10 users)",
      "Custom branding options",
      "Dedicated account manager",
      "Unlimited AI with voice",
      "AI business insights",
      "Wealth optimization recommendations",
      "Reserved Flores partnerships",
      "API access for integrations",
      "White-label options",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-16 flex-1">
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="outline">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered Pricing
          </Badge>
          <h1 className="text-5xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock powerful AI features, wallet system, and protection programs to grow your irrigation business. Scale
            as you grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative ${plan.popular ? "border-primary shadow-2xl scale-105" : "shadow-lg"}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">Most Popular</Badge>
                </div>
              )}
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <plan.icon className="w-8 h-8 text-primary" />
                  {plan.name === "Business Enterprise" && (
                    <Badge variant="outline" className="text-xs">
                      Flores Priority
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="w-4 h-4 text-primary" />
                    <p className="text-xs font-semibold">AI Features</p>
                  </div>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>Chat: {plan.aiFeatures.chatMessages}</li>
                    <li>Job Creation: {plan.aiFeatures.jobCreation}</li>
                    <li>Voice: {plan.aiFeatures.voiceChat}</li>
                    <li>Matching: {plan.aiFeatures.matching}</li>
                  </ul>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/auth/sign-up" className="block">
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-muted/50 rounded-lg p-8 border mb-8">
          <h2 className="text-2xl font-bold mb-4">All Plans Include:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm">Secure wallet system with instant withdrawals</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm">Protection programs available</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm">Secure payments via Stripe</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm">AI-powered job matching</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm">Mobile app access</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm">Rating & review system</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm">Insurance referral partnerships</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm">Message system</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm">Invoice generation</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-2xl p-8 border-2 border-primary/20">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2">Maximize Your Wealth with IrrigGig AI</h2>
            <p className="text-muted-foreground">
              The #1 platform designed to grow your business and increase your earnings
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-background/80 rounded-lg border text-center">
              <p className="text-3xl font-bold text-primary mb-1">20%</p>
              <p className="text-sm text-muted-foreground">Average earnings increase with Premium</p>
            </div>
            <div className="p-4 bg-background/80 rounded-lg border text-center">
              <p className="text-3xl font-bold text-primary mb-1">$50k+</p>
              <p className="text-sm text-muted-foreground">Average annual revenue for Enterprise users</p>
            </div>
            <div className="p-4 bg-background/80 rounded-lg border text-center">
              <p className="text-3xl font-bold text-primary mb-1">100%</p>
              <p className="text-sm text-muted-foreground">Secure transactions with wallet system</p>
            </div>
            <div className="p-4 bg-background/80 rounded-lg border text-center">
              <p className="text-3xl font-bold text-primary mb-1">#1</p>
              <p className="text-sm text-muted-foreground">Most trusted irrigation marketplace</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

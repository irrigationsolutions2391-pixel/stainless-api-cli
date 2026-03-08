import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Wallet, CreditCard, DollarSign, Zap, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function DepositPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  const { data: wallet } = await supabase.from("user_wallets").select("*").eq("user_id", user.id).single()

  const quickAmounts = [50, 100, 250, 500, 1000, 2500]

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

        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Wallet className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold">Add Funds</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Add money to your wallet for fast payments and protection programs
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Current Balance
                <Badge variant="outline" className="ml-auto">
                  <DollarSign className="w-3 h-3 mr-1" />
                  USD
                </Badge>
              </CardTitle>
              <CardDescription>Available funds in your wallet</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-primary">${(wallet?.balance || 0).toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Deposit Amount
              </CardTitle>
              <CardDescription>Choose an amount or enter a custom value</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-3">
                {quickAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    className="h-16 text-lg font-semibold hover:border-primary hover:bg-primary/5 bg-transparent"
                  >
                    ${amount}
                  </Button>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="customAmount">Custom Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="customAmount" type="number" min="10" step="0.01" className="pl-8" placeholder="0.00" />
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Instant Deposits</p>
                    <p className="text-blue-800 dark:text-blue-200">
                      Funds are available immediately for job payments and platform services. Secure processing via
                      Stripe.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="w-full" size="lg" disabled>
                <CreditCard className="w-5 h-5 mr-2" />
                Continue to Payment (Stripe Integration Required)
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Powered by Stripe. Your payment information is encrypted and secure.
              </p>
            </CardContent>
          </Card>

          <div className="mt-6 bg-muted/50 rounded-lg p-6 border">
            <h3 className="font-semibold mb-3">Why Add Funds?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Instant job payments without entering card details each time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Quick enrollment in protection programs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Earn rewards and bonuses on wallet transactions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>100% secure with instant withdrawal anytime</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

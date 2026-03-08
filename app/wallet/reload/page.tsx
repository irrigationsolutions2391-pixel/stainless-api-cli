"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CoinRainAnimation } from "@/components/coin-rain-animation"
import { AffiliateServices } from "@/components/affiliate-services"
import { DailyStreakCard } from "@/components/daily-streak-card"
import {
  Wallet,
  CreditCard,
  DollarSign,
  Bitcoin,
  Coins,
  Zap,
  ArrowLeft,
  TrendingUp,
  Gift,
  Sparkles,
  Star,
  Crown,
} from "lucide-react"
import Link from "next/link"

export default function ReloadWalletPage() {
  const [showCoinRain, setShowCoinRain] = useState(false)
  const [reloadAmount, setReloadAmount] = useState(0)
  const [selectedPack, setSelectedPack] = useState<any>(null)

  const reloadPacks = [
    {
      amount: 20,
      bonus: 5,
      bonusPercent: 25,
      perks: ["Instant credit", "Basic features"],
      icon: DollarSign,
      color: "blue",
    },
    {
      amount: 50,
      bonus: 15,
      bonusPercent: 30,
      perks: ["1 Free Gig Boost ($4.99 value)", "Priority support"],
      icon: Sparkles,
      color: "purple",
      popular: true,
    },
    {
      amount: 100,
      bonus: 35,
      bonusPercent: 35,
      perks: ["Elite trial 7 days ($79 value)", "2 Free Gig Boosts", "Featured profile"],
      icon: Crown,
      color: "yellow",
      bestValue: true,
    },
  ]

  const cryptoOptions = [
    { symbol: "BTC", name: "Bitcoin", icon: Bitcoin, rate: 0.000023 },
    { symbol: "ETH", name: "Ethereum", icon: Coins, rate: 0.00035 },
    { symbol: "USDC", name: "USD Coin", icon: DollarSign, rate: 1.0 },
    { symbol: "XRP", name: "Ripple", icon: TrendingUp, rate: 1.45 },
  ]

  const handleReload = (pack: any) => {
    const totalAmount = pack.amount + pack.bonus
    setReloadAmount(totalAmount)
    setShowCoinRain(true)
  }

  return (
    <>
      <CoinRainAnimation show={showCoinRain} amount={reloadAmount} onComplete={() => setShowCoinRain(false)} />

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <div className="container mx-auto px-4 py-12 flex-1">
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-8 ripple-button">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>

          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-8 h-8 text-primary animate-pulse" />
                <h1 className="text-4xl font-bold gradient-text">Reload Wallet</h1>
              </div>
              <p className="text-lg text-muted-foreground">
                Add funds instantly with USD or crypto. Earn massive bonus credits and exclusive perks!
              </p>
            </div>

            <div className="mb-6">
              <DailyStreakCard userId="current-user-id" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <Tabs defaultValue="packs" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="packs">Quick Packs</TabsTrigger>
                    <TabsTrigger value="usd">Custom USD</TabsTrigger>
                    <TabsTrigger value="crypto">Crypto</TabsTrigger>
                  </TabsList>

                  <TabsContent value="packs">
                    <div className="space-y-4">
                      {reloadPacks.map((pack) => (
                        <Card
                          key={pack.amount}
                          className={`relative overflow-hidden cursor-pointer transition-all hover:scale-[1.02] ${
                            selectedPack?.amount === pack.amount
                              ? "border-2 border-primary shadow-xl"
                              : "hover:border-primary/50"
                          }`}
                          onClick={() => setSelectedPack(pack)}
                        >
                          {pack.popular && (
                            <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                              MOST POPULAR
                            </div>
                          )}
                          {pack.bestValue && (
                            <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
                              <Star className="w-3 h-3 fill-white" />
                              BEST VALUE
                            </div>
                          )}
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-12 h-12 rounded-full bg-${pack.color}-100 dark:bg-${pack.color}-900 flex items-center justify-center`}
                                >
                                  <pack.icon className={`w-6 h-6 text-${pack.color}-600`} />
                                </div>
                                <div>
                                  <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold">${pack.amount}</span>
                                    <span className="text-sm text-muted-foreground line-through">
                                      ${pack.amount + pack.bonus}
                                    </span>
                                  </div>
                                  <Badge
                                    variant="outline"
                                    className={`mt-1 border-${pack.color}-500 text-${pack.color}-600`}
                                  >
                                    +${pack.bonus} FREE ({pack.bonusPercent}% bonus)
                                  </Badge>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-muted-foreground mb-1">You Get</p>
                                <p className="text-2xl font-bold text-green-600">${pack.amount + pack.bonus}</p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              {pack.perks.map((perk, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm">
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                  <span>{perk}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      <Button
                        className="w-full ripple-button"
                        size="lg"
                        onClick={() => selectedPack && handleReload(selectedPack)}
                        disabled={!selectedPack}
                      >
                        <CreditCard className="w-5 h-5 mr-2" />
                        {selectedPack
                          ? `Reload $${selectedPack.amount} → Get $${selectedPack.amount + selectedPack.bonus}`
                          : "Select a Pack to Continue"}
                      </Button>

                      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 border-2 border-green-200 dark:border-green-800 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <Gift className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                          <div className="text-sm">
                            <p className="font-semibold text-green-900 dark:text-green-100 mb-1">Limited Time Offer!</p>
                            <p className="text-green-800 dark:text-green-200">
                              Get up to 35% bonus credits + exclusive perks. Use bonus credits for jobs, AI services,
                              equipment rentals, and more!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="usd">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CreditCard className="w-5 h-5" />
                          Custom USD Amount
                        </CardTitle>
                        <CardDescription>Instant deposits via Stripe. 1.5% processing fee</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="customUSD">Enter Amount</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="customUSD"
                              type="number"
                              min="10"
                              step="0.01"
                              className="pl-8 text-2xl h-16"
                              placeholder="0.00"
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Minimum deposit: $10. Amounts over $100 receive automatic 2% bonus.
                          </p>
                        </div>

                        <Button className="w-full ripple-button" size="lg">
                          <CreditCard className="w-5 h-5 mr-2" />
                          Continue to Stripe Checkout
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="crypto">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Bitcoin className="w-5 h-5" />
                          Crypto Reload - 0% Fees This Week!
                        </CardTitle>
                        <CardDescription>
                          <Badge className="bg-green-500 hover:bg-green-600">Limited Time: 0% Network Fees</Badge>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {cryptoOptions.map((crypto) => (
                            <Card
                              key={crypto.symbol}
                              className="hover:border-primary transition-all cursor-pointer hover:scale-105"
                            >
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-2">
                                    <crypto.icon className="w-6 h-6 text-primary" />
                                    <div>
                                      <p className="font-bold">{crypto.symbol}</p>
                                      <p className="text-xs text-muted-foreground">{crypto.name}</p>
                                    </div>
                                  </div>
                                  <Badge variant="outline" className="border-green-500 text-green-600">
                                    0% Fees
                                  </Badge>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  1 USD ≈ {crypto.rate} {crypto.symbol}
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cryptoAmount">Amount to Deposit (USD equivalent)</Label>
                          <Input id="cryptoAmount" type="number" step="0.01" placeholder="Enter amount..." />
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                          <div className="flex items-start gap-2">
                            <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                            <div className="text-sm">
                              <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                                0% Fees Special Offer
                              </p>
                              <p className="text-blue-800 dark:text-blue-200">
                                This week only: All crypto deposits have ZERO network fees. Save money and reload with
                                crypto!
                              </p>
                            </div>
                          </div>
                        </div>

                        <Button className="w-full ripple-button" size="lg" disabled>
                          <Wallet className="w-5 h-5 mr-2" />
                          Connect Web3 Wallet (Integration Required)
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="lg:col-span-1 space-y-6">
                <AffiliateServices />

                <Card className="bg-muted/50">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      <p className="font-semibold text-sm">Instant Deposits</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gift className="w-5 h-5 text-green-500" />
                      <p className="font-semibold text-sm">Up to 35% Bonus</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <p className="font-semibold text-sm">Build Wealth Daily</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HeroAnimation } from "@/components/hero-animation"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { LegalDisclaimerModal } from "@/components/legal-disclaimer-modal"
import { GalaxyBackground } from "@/components/galaxy-background"
import { OnboardingCarousel } from "@/components/onboarding-carousel"
import Link from "next/link"
import { ArrowRight, Star, Sparkles, Wallet, Truck, Radio, TrendingUp, Globe, Zap } from "lucide-react"
import { useEffect, useState } from "react"

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding")
    if (!hasSeenOnboarding) {
      setShowOnboarding(true)
    }
  }, [])

  const handleOnboardingComplete = () => {
    localStorage.setItem("hasSeenOnboarding", "true")
    setShowOnboarding(false)
  }

  return (
    <>
      <LegalDisclaimerModal />
      {showOnboarding && <OnboardingCarousel onComplete={handleOnboardingComplete} />}
      <GalaxyBackground />

      <div className="min-h-screen flex flex-col">
        <Navbar />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 dark:from-blue-950 dark:via-green-950 dark:to-blue-950 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden opacity-30">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              poster="/water-flowing-irrigation.jpg"
            >
              <source src="/hero-video-water-flow.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-blue-200/20 to-transparent dark:from-blue-800/20 blur-3xl" />
            <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-green-200/20 to-transparent dark:from-green-800/20 blur-3xl" />
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: Math.random() * 3,
                }}
                className="absolute w-2 h-2 bg-primary rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-8"
            >
              <HeroAnimation />

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex justify-center gap-2 flex-wrap"
              >
                <Badge className="text-sm px-4 py-2 glow-badge">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI-Powered Matching
                </Badge>
                <Badge className="text-sm px-4 py-2 glow-badge" variant="outline">
                  <Wallet className="w-3 h-3 mr-1" />
                  Crypto + USD
                </Badge>
                <Badge className="text-sm px-4 py-2 glow-badge" variant="outline">
                  <Globe className="w-3 h-3 mr-1" />
                  Global Network
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold text-balance gradient-text"
              >
                IrrigGig AI
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-2xl md:text-3xl text-muted-foreground font-medium text-balance"
              >
                Connect • Hire • Get Paid • Build Wealth
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty"
              >
                The ultimate gig marketplace for irrigation, landscaping, and contracting. AI matching, crypto payments,
                equipment rentals, and viral social feed - all in one revolutionary platform.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Link href="/post-job">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all group ripple-button"
                  >
                    Find Workers
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/jobs">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all bg-transparent group ripple-button"
                  >
                    <Sparkles className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Explore Gig Galaxy
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3, duration: 0.8 }}
                className="flex justify-center"
              >
                <Link href="/wallet/reload">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-gradient-to-r from-yellow-500/20 to-green-500/20 border-2 border-yellow-500/50 hover:border-yellow-500 text-lg px-8 py-6 group ripple-button glow-badge"
                  >
                    <Zap className="mr-2 w-5 h-5 text-yellow-500 group-hover:animate-pulse" />
                    Get $10 Bonus - Reload Now
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="flex flex-wrap justify-center gap-3 pt-4"
              >
                <Link href="/equipment">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Truck className="w-4 h-4" />
                    Rent Equipment
                  </Button>
                </Link>
                <Link href="/feed">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Radio className="w-4 h-4" />
                    Gig Glory Feed
                  </Button>
                </Link>
                <Link href="/store/flores-services">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Star className="w-4 h-4" />
                    Flores Services
                  </Button>
                </Link>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7, duration: 0.8 }}
                className="text-sm text-muted-foreground italic"
              >
                Thank you for choosing IrrigGig AI. Together, we're building wealth and transforming the industry.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4">Why Choose IrrigGig AI?</h2>
              <p className="text-lg text-muted-foreground">The only platform you need to grow your wealth</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Sparkles,
                  title: "AI Galaxy Matching",
                  description:
                    "92% success prediction rate. Our AI analyzes skills, location, and history to find your perfect opportunities with estimated earnings.",
                },
                {
                  icon: Wallet,
                  title: "Crypto + USD Wallet",
                  description:
                    "Seamless payments in USD, BTC, ETH, USDC, or XRP. Reload bonuses up to 5%. Build wealth with every transaction.",
                },
                {
                  icon: Truck,
                  title: "Equipment Marketplace",
                  description:
                    "Rent trenchers, excavators, and tools. Earn passive income by listing your equipment. Turn idle assets into $10k+/month.",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-card p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all border"
                >
                  <feature.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4">Unlock Premium Features</h2>
              <p className="text-lg text-muted-foreground">Maximize earnings with advanced tools and AI</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Star,
                  title: "Verified Badge",
                  description: "Stand out with verification. Priority matching for $50k+ projects from Flores LLC.",
                },
                {
                  icon: Radio,
                  title: "Viral Social Feed",
                  description: "Share wins, get featured. Earn $500+ bonus credits with share streaks and viral posts.",
                },
                {
                  icon: TrendingUp,
                  title: "Wealth AI Assistant",
                  description:
                    "Unlimited AI chat focused on maximizing your income, portfolio growth, and asset acquisition.",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border text-center"
                >
                  <feature.icon className="w-10 h-10 text-primary mb-3 mx-auto" />
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-center mt-12"
            >
              <Link href="/pricing">
                <Button size="lg" variant="default" className="px-8 py-6">
                  View All Plans
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}

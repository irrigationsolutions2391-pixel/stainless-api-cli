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
import Image from "next/image"
import { ArrowRight, Star, Sparkles, Wallet, Truck, Radio, TrendingUp, Globe, Zap, Shield, Users, DollarSign, Award, CheckCircle } from "lucide-react"
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
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Premium background with real image */}
          <div className="absolute inset-0">
            <Image
              src="/hero-irrigation-premium.jpg"
              alt="Professional irrigation system"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
          </div>

          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-primary/10 to-transparent blur-3xl" />
            <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-accent/10 to-transparent blur-3xl" />
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 0.6, 0], scale: [0, 1, 0] }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  delay: Math.random() * 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: Math.random() * 3,
                }}
                className="absolute w-1.5 h-1.5 bg-primary/60 rounded-full"
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
                <Badge className="text-sm px-4 py-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI-Powered Matching
                </Badge>
                <Badge className="text-sm px-4 py-2 bg-accent/10 text-accent-foreground border-accent/20 hover:bg-accent/20" variant="outline">
                  <Wallet className="w-3 h-3 mr-1" />
                  Crypto + USD
                </Badge>
                <Badge className="text-sm px-4 py-2 bg-secondary text-secondary-foreground border-border hover:bg-secondary/80" variant="outline">
                  <Globe className="w-3 h-3 mr-1" />
                  Global Network
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-balance"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="gradient-text">GigFlow Pro</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground font-medium text-balance"
              >
                Connect &bull; Earn &bull; Build Wealth
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed"
              >
                The elite marketplace where irrigation and landscaping professionals transform their careers. 
                AI-powered job matching, crypto payments, equipment rentals, and a viral social feed - 
                all in one revolutionary platform.
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
                    className="text-lg px-10 py-7 shadow-xl hover:shadow-2xl transition-all group"
                  >
                    Find Workers
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/jobs">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-10 py-7 shadow-lg hover:shadow-xl transition-all bg-background/50 backdrop-blur-sm group"
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
                    className="bg-gradient-to-r from-yellow-500/10 to-green-500/10 border-2 border-yellow-500/30 hover:border-yellow-500/60 text-lg px-10 py-7 group backdrop-blur-sm"
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
                  <Button variant="ghost" size="sm" className="gap-2 hover:bg-background/50">
                    <Truck className="w-4 h-4" />
                    Rent Equipment
                  </Button>
                </Link>
                <Link href="/feed">
                  <Button variant="ghost" size="sm" className="gap-2 hover:bg-background/50">
                    <Radio className="w-4 h-4" />
                    Gig Glory Feed
                  </Button>
                </Link>
                <Link href="/store/flores-services">
                  <Button variant="ghost" size="sm" className="gap-2 hover:bg-background/50">
                    <Star className="w-4 h-4" />
                    Flores Services
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 2, duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
              <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
            </div>
          </motion.div>
        </section>

        {/* Trust Indicators */}
        <section className="py-12 border-y bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
            >
              {[
                { value: "10,000+", label: "Active Professionals" },
                { value: "92%", label: "Match Success Rate" },
                { value: "$2.5M+", label: "Paid to Workers" },
                { value: "24/7", label: "Crypto Support" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary" style={{ fontFamily: "var(--font-display)" }}>{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 text-sm" variant="outline">Why GigFlow Pro</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance" style={{ fontFamily: "var(--font-display)" }}>
                The Only Platform You Need
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Everything to grow your career and build lasting wealth in the irrigation and landscaping industry
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Sparkles,
                  title: "AI Galaxy Matching",
                  description:
                    "92% success prediction rate. Our AI analyzes skills, location, and history to find your perfect opportunities with estimated earnings.",
                  highlight: "92% Success",
                },
                {
                  icon: Wallet,
                  title: "Crypto + USD Wallet",
                  description:
                    "Seamless payments in USD, BTC, ETH, USDC, or XRP. Reload bonuses up to 5%. Build wealth with every transaction.",
                  highlight: "5% Bonus",
                },
                {
                  icon: Truck,
                  title: "Equipment Marketplace",
                  description:
                    "Rent trenchers, excavators, and tools. Earn passive income by listing your equipment. Turn idle assets into $10k+/month.",
                  highlight: "$10K+/mo",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  whileHover={{ y: -8 }}
                  className="group relative bg-card p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border overflow-hidden"
                >
                  <div className="absolute top-0 right-0 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-bl-lg">
                    {feature.highlight}
                  </div>
                  <feature.icon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Professional Image Section */}
        <section className="py-24 bg-muted/30 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <Badge variant="outline" className="text-sm">For Professionals</Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-balance" style={{ fontFamily: "var(--font-display)" }}>
                  Your Career, Elevated
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                  Join thousands of irrigation and landscaping professionals who have transformed their careers with GigFlow Pro. 
                  Get matched with high-paying gigs, build your reputation, and access premium tools to grow your business.
                </p>
                <ul className="space-y-4">
                  {[
                    "Verified professional badge for priority matching",
                    "Direct access to $50K+ commercial projects",
                    "Real-time earnings tracking and analytics",
                    "Build your portfolio with every completed job",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <Link href="/auth/sign-up">
                  <Button size="lg" className="mt-4">
                    Start Your Journey
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/professional-contractor.jpg"
                    alt="Professional contractor using GigFlow Pro"
                    width={600}
                    height={400}
                    className="object-cover w-full h-[400px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-card/90 backdrop-blur-sm p-4 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                          <Award className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold">Verified Pro</div>
                          <div className="text-sm text-muted-foreground">15+ jobs completed</div>
                        </div>
                        <div className="ml-auto text-right">
                          <div className="font-bold text-primary">$8,500</div>
                          <div className="text-xs text-muted-foreground">This month</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Equipment Section */}
        <section className="py-24 bg-background overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative order-2 lg:order-1"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/premium-equipment.jpg"
                    alt="Premium landscaping equipment fleet"
                    width={600}
                    height={400}
                    className="object-cover w-full h-[400px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-card/90 backdrop-blur-sm p-4 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold">Equipment Rental</div>
                          <div className="text-sm text-muted-foreground">Trenchers, Excavators, Tools</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-accent-foreground">From $150/day</div>
                          <div className="text-xs text-muted-foreground">Insurance included</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6 order-1 lg:order-2"
              >
                <Badge variant="outline" className="text-sm">Equipment Marketplace</Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-balance" style={{ fontFamily: "var(--font-display)" }}>
                  Rent or Earn Passive Income
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                  Access professional-grade equipment when you need it, or list your own equipment to earn up to $10,000+ per month in passive income.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Truck, label: "500+ Equipment", desc: "Available now" },
                    { icon: Shield, label: "Fully Insured", desc: "Peace of mind" },
                    { icon: DollarSign, label: "$10K+/mo", desc: "Passive income" },
                    { icon: Users, label: "Verified Renters", desc: "Trusted network" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="bg-muted/50 p-4 rounded-xl"
                    >
                      <item.icon className="w-8 h-8 text-primary mb-2" />
                      <div className="font-semibold">{item.label}</div>
                      <div className="text-sm text-muted-foreground">{item.desc}</div>
                    </motion.div>
                  ))}
                </div>
                <Link href="/equipment">
                  <Button size="lg" variant="outline" className="mt-4">
                    Browse Equipment
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Premium Features Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 text-sm" variant="outline">Premium Features</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
                Unlock Your Full Potential
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Maximize your earnings with advanced tools and AI-powered insights
              </p>
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
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="bg-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-display)" }}>{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
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
                <Button size="lg" className="px-10 py-7">
                  View All Plans
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-balance" style={{ fontFamily: "var(--font-display)" }}>
                Ready to Transform Your Career?
              </h2>
              <p className="text-xl text-muted-foreground text-pretty">
                Join thousands of professionals who have already discovered the future of irrigation and landscaping work.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/sign-up">
                  <Button size="lg" className="text-lg px-10 py-7">
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="text-lg px-10 py-7">
                    View Pricing
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-muted-foreground">
                No credit card required &bull; Start earning today
              </p>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}

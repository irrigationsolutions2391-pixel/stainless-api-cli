"use client"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Radio, Lock, AlertCircle, Sparkles } from "lucide-react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

export default async function SettingsPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  const { data: networkStatus } = await supabase
    .from("enhanced_network_status")
    .select("*")
    .eq("user_id", user.id)
    .single()

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

        <h1 className="text-4xl font-bold mb-8">Settings</h1>

        <div className="grid gap-6 max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Manage your account settings and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Account Created</p>
                  <p className="font-medium">{new Date(user.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-yellow-400 dark:border-yellow-600 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-yellow-600 animate-pulse" />
                <CardTitle className="flex items-center gap-2">
                  Elite Network Access Program
                  <Badge variant="secondary" className="bg-yellow-500 text-white glow-badge">
                    Founding Member
                  </Badge>
                </CardTitle>
              </div>
              <CardDescription>Exclusive early access to revolutionary features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 p-4 rounded-lg border-2 border-yellow-300 dark:border-yellow-700">
                <div className="flex items-start gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Your Elite Benefits:</p>
                    <ul className="space-y-1 text-yellow-800 dark:text-yellow-200">
                      <li>🌟 Priority matching for high-value projects</li>
                      <li>🚀 Early access to new features before public release</li>
                      <li>💎 Exclusive "Founding Member" golden badge on profile</li>
                      <li>📡 Future: Free global network coverage (coming 2026)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="relative p-6 bg-muted/30 rounded-lg border text-center">
                <div className="absolute inset-0 overflow-hidden rounded-lg">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0.5 }}
                      animate={{ scale: [0, 2, 3], opacity: [0.5, 0.2, 0] }}
                      transition={{
                        duration: 3,
                        delay: i * 1,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeOut",
                      }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-yellow-400"
                    />
                  ))}
                  <Radio className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-yellow-500" />
                </div>
                <p className="relative z-10 text-sm font-medium mb-1">Your device could become part of</p>
                <p className="relative z-10 text-lg font-bold">The World's Largest Irrigation Network</p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold text-blue-900 dark:text-blue-100">Permanent Core Service</p>
                    <p className="text-blue-800 dark:text-blue-200">
                      This program is integral to the platform and provides essential connectivity features. Status will
                      be activated by platform administrators when the network launches.
                    </p>
                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">
                      Enrolled: {networkStatus?.agreed_at ? new Date(networkStatus.agreed_at).toLocaleString() : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <Button disabled className="w-full bg-gradient-to-r from-yellow-400 to-orange-400" variant="default">
                <Lock className="w-4 h-4 mr-2" />
                Active - Awaiting Network Launch
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subscription</CardTitle>
              <CardDescription>Manage your subscription plan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Current Plan</p>
                  <p className="font-medium text-lg">Free</p>
                </div>
                <Link href="/pricing">
                  <Button>Upgrade Plan</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}

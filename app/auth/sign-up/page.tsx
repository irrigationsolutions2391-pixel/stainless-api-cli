"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { motion } from "framer-motion"
import { AlertCircle, Shield, Radio } from "lucide-react"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [role, setRole] = useState("worker")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [agreedToLiability, setAgreedToLiability] = useState(false)
  const [agreedToNetwork, setAgreedToNetwork] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!agreedToTerms || !agreedToLiability || !agreedToNetwork) {
      setError("You must accept all agreements to continue")
      return
    }

    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
          data: {
            full_name: fullName,
            role: role,
          },
        },
      })

      if (error) throw error

      if (data.user) {
        await supabase.from("legal_agreements").insert([
          { user_id: data.user.id, agreement_type: "terms_of_service", version: "1.0" },
          { user_id: data.user.id, agreement_type: "liability_waiver", version: "1.0" },
          { user_id: data.user.id, agreement_type: "enhanced_network", version: "1.0" },
        ])

        // Record enhanced network enrollment
        await supabase.from("enhanced_network_status").insert({
          user_id: data.user.id,
          status: "inactive",
          notes: "User enrolled during signup - awaiting owner activation",
        })
      }

      router.push("/auth/sign-up-success")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 dark:from-blue-950 dark:via-green-950 dark:to-blue-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Join IrrigGig AI</CardTitle>
            <CardDescription>Create your account and start connecting</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">I am a...</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="worker">Worker (Looking for jobs)</SelectItem>
                      <SelectItem value="employer">Employer (Hiring workers)</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4 border rounded-lg p-4 bg-muted/50">
                  <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-500">
                    <Shield className="w-5 h-5" />
                    <h3 className="font-bold">Required Agreements</h3>
                  </div>

                  <ScrollArea className="h-[200px] pr-4 border rounded p-3 bg-background">
                    <div className="space-y-3 text-sm">
                      <p className="font-semibold">Platform Disclaimer:</p>
                      <p className="leading-relaxed">
                        <strong>IrrigGig AI is ONLY a platform connecting users.</strong> We are NOT responsible for any
                        job quality, payment disputes, injuries, damages, taxes, insurance, or legal compliance. All
                        users (homeowners, contractors, businesses) are <strong>fully responsible</strong> for their
                        actions, contracts, work quality, safety, insurance, taxes, and compliance with all laws.
                        IrrigGig AI provides <strong>no warranties</strong> and disclaims all liability to the maximum
                        extent permitted by law.
                      </p>
                      <p className="font-semibold mt-4">Large Projects Notice:</p>
                      <p className="leading-relaxed">
                        Large/commercial/industrial projects may be reserved for Flores Landscape Design LLC. We may
                        contact you directly to resell/contract the job or assign our preferred contractors.
                      </p>
                    </div>
                  </ScrollArea>

                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={agreedToTerms}
                        onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                      />
                      <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                        I agree to the Terms of Service and Privacy Policy
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="liability"
                        checked={agreedToLiability}
                        onCheckedChange={(checked) => setAgreedToLiability(checked as boolean)}
                      />
                      <Label htmlFor="liability" className="text-sm leading-relaxed cursor-pointer">
                        <strong>I agree that I am solely responsible</strong> for everything related to my jobs and
                        interactions. I understand IrrigGig AI is not liable for any outcomes.
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2 bg-blue-50 dark:bg-blue-950 p-3 rounded border border-blue-200 dark:border-blue-800">
                      <Checkbox
                        id="network"
                        checked={agreedToNetwork}
                        onCheckedChange={(checked) => setAgreedToNetwork(checked as boolean)}
                        className="border-blue-400"
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor="network"
                          className="text-sm leading-relaxed cursor-pointer flex items-start gap-2"
                        >
                          <Radio className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span>
                            <strong>Enhanced Network Program (Required):</strong> I agree to install core platform
                            services that may enable enhanced connectivity features in the future. This cannot be
                            removed and is integral to the app.
                          </span>
                        </Label>
                        <p className="text-xs text-muted-foreground mt-1 ml-6">
                          Inactive until owner activation. Learn more in settings after signup.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded">
                    <AlertCircle className="w-4 h-4" />
                    <p>{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || !agreedToTerms || !agreedToLiability || !agreedToNetwork}
                >
                  {isLoading ? "Creating account..." : "Sign Up"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/auth/login" className="underline underline-offset-4 hover:text-primary">
                  Sign in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

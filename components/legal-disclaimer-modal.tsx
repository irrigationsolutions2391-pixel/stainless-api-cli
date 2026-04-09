"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle } from "lucide-react"

export function LegalDisclaimerModal() {
  const [open, setOpen] = useState(false)
  const [agreed, setAgreed] = useState(false)

  useEffect(() => {
    const hasSeenDisclaimer = localStorage.getItem("gigflow_legal_disclaimer_seen")
    if (!hasSeenDisclaimer) {
      setOpen(true)
    }
  }, [])

  const handleAccept = () => {
    if (agreed) {
      localStorage.setItem("gigflow_legal_disclaimer_seen", "true")
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-500">
            <AlertCircle className="w-6 h-6" />
            <DialogTitle className="text-2xl">Important Legal Notice</DialogTitle>
          </div>
          <DialogDescription>Please read and accept our terms before continuing</DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4 text-sm">
            <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2 text-yellow-900 dark:text-yellow-100">Platform Disclaimer</h3>
              <p className="text-yellow-900 dark:text-yellow-100 leading-relaxed">
                <strong>GigFlow Pro is a platform connecting users.</strong> We are not responsible for any job
                quality, payment disputes, injuries, damages, taxes, insurance, or legal compliance.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold">User Responsibilities</h4>
              <p className="leading-relaxed">
                All users (homeowners, contractors, businesses) are <strong>fully responsible</strong> for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Their own actions and contracts</li>
                <li>Work quality and professionalism</li>
                <li>Safety standards and protocols</li>
                <li>Insurance coverage requirements</li>
                <li>Tax obligations and reporting</li>
                <li>Compliance with all local, state, and federal laws</li>
                <li>Licensing and certifications</li>
                <li>Payment disputes and collections</li>
                <li>Property damage or personal injuries</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold">Liability Disclaimer</h4>
              <p className="leading-relaxed">
                GigFlow Pro provides <strong>no warranties</strong> and disclaims all liability to the{" "}
                <strong>maximum extent permitted by law</strong>. We do not:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Verify contractor credentials, licenses, or insurance</li>
                <li>Guarantee work quality or completion</li>
                <li>Mediate disputes between users</li>
                <li>Provide legal, financial, or tax advice</li>
                <li>Accept responsibility for any damages or losses</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold">Large Project Notice</h4>
              <p className="leading-relaxed">
                For large-scale, commercial, or industrial projects, GigFlow Pro and Flores Landscape Design LLC reserve
                the right to contact users directly to discuss project requirements, resell opportunities, or assign
                preferred contractors from our network.
              </p>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-bold mb-2">Your Agreement</h4>
              <p className="leading-relaxed">
                By using GigFlow Pro, you acknowledge that you have read, understood, and agree to accept all risks and
                responsibilities associated with your use of the platform.
              </p>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="flex-col sm:flex-col space-y-4">
          <div className="flex items-start space-x-2">
            <Checkbox id="agree" checked={agreed} onCheckedChange={(checked) => setAgreed(checked as boolean)} />
            <Label htmlFor="agree" className="text-sm leading-relaxed cursor-pointer">
              I have read and understand this disclaimer. I agree that I am solely responsible for everything related to
              my jobs and interactions on GigFlow Pro. I understand that GigFlow Pro provides no warranties and is not
              liable for any outcomes.
            </Label>
          </div>
          <Button onClick={handleAccept} disabled={!agreed} className="w-full">
            Accept and Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

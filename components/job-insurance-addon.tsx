"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Shield, Check, AlertCircle } from "lucide-react"
import { useState } from "react"

interface JobInsuranceAddonProps {
  jobValue: number
  onAddInsurance: (selected: boolean) => void
}

export function JobInsuranceAddon({ jobValue, onAddInsurance }: JobInsuranceAddonProps) {
  const [selected, setSelected] = useState(false)
  const insurancePrice = 9.99

  const handleToggle = (checked: boolean) => {
    setSelected(checked)
    onAddInsurance(checked)
  }

  return (
    <Card className="border-2 border-blue-300 dark:border-blue-700">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Job Protection Plan
            </CardTitle>
            <CardDescription>Protect your payment - 100% refund guarantee</CardDescription>
          </div>
          <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950">
            Recommended
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-start gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">What's covered:</p>
              <ul className="space-y-1 text-blue-800 dark:text-blue-200">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>100% refund if contractor doesn't show up</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Coverage for unsatisfactory work (with documentation)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Dispute resolution assistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Priority customer support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-3">
            <Checkbox id="insurance" checked={selected} onCheckedChange={handleToggle} />
            <label htmlFor="insurance" className="text-sm font-medium cursor-pointer">
              Add Job Protection Plan
            </label>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">One-time fee</p>
            <p className="text-lg font-bold">${insurancePrice}</p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground italic">
          Note: This is not insurance. It's an add-on protection service. Terms apply. We may partner with real insurers
          in the future.
        </p>
      </CardContent>
    </Card>
  )
}

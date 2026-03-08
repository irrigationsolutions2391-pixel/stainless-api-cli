"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Zap, Users, Eye } from "lucide-react"

interface GigBoostUpsellProps {
  jobTitle: string
  estimatedBids: number
}

export function GigBoostUpsell({ jobTitle, estimatedBids }: GigBoostUpsellProps) {
  return (
    <Card className="border-2 border-yellow-300 dark:border-yellow-700 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              Boost This Gig
            </CardTitle>
            <CardDescription>Get 3× more qualified bids with AI targeting</CardDescription>
          </div>
          <Badge className="bg-yellow-500 text-white glow-badge">Limited Time</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white/50 dark:bg-black/20 rounded-lg">
            <Users className="w-6 h-6 mx-auto mb-1 text-primary" />
            <p className="text-sm text-muted-foreground">Current Reach</p>
            <p className="text-xl font-bold">{estimatedBids} contractors</p>
          </div>
          <div className="text-center p-3 bg-green-100 dark:bg-green-900 rounded-lg border-2 border-green-300 dark:border-green-700">
            <TrendingUp className="w-6 h-6 mx-auto mb-1 text-green-600" />
            <p className="text-sm text-green-700 dark:text-green-300">With Boost</p>
            <p className="text-xl font-bold text-green-600">{estimatedBids * 3}+ contractors</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Eye className="w-4 h-4 text-primary" />
            <span>Top 10 placement in search results</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Zap className="w-4 h-4 text-primary" />
            <span>AI-matched to best contractors</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-primary" />
            <span>Featured in contractor email alerts</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div>
            <p className="text-sm text-muted-foreground">Boost Price</p>
            <p className="text-2xl font-bold">$4.99</p>
          </div>
          <Button size="lg" className="ripple-button">
            <Zap className="w-4 h-4 mr-2" />
            Boost Now
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

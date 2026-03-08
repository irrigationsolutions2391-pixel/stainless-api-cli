"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Gift, TrendingUp } from "lucide-react"

export function PostJobUpsell({ jobId }: { jobId: string }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-primary" />
            Quick Rewards & Savings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Rate for $2 credit */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-background/80 rounded-lg border-2 border-green-500/30 hover:border-green-500 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <h4 className="font-bold">Rate This Job → Get $2 Credit</h4>
                </div>
                <p className="text-sm text-muted-foreground">Takes 10 seconds. Help others make better decisions!</p>
              </div>
              <Badge className="bg-green-500 hover:bg-green-600">+$2</Badge>
            </div>
            <Button size="sm" className="w-full ripple-button">
              Rate Now & Claim $2
            </Button>
          </motion.div>

          {/* Supply discount */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-background/80 rounded-lg border-2 border-blue-500/30 hover:border-blue-500 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <ShoppingCart className="w-4 h-4 text-blue-500" />
                  <h4 className="font-bold">Buy Supplies for Next Job</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Get 10% off irrigation supplies via our affiliate partners
                </p>
              </div>
              <Badge variant="outline" className="border-blue-500 text-blue-500">
                10% OFF
              </Badge>
            </div>
            <Button variant="outline" size="sm" className="w-full bg-transparent ripple-button">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Shop Supplies
            </Button>
          </motion.div>

          {/* Referral bonus */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-background/80 rounded-lg border-2 border-purple-500/30 hover:border-purple-500 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-purple-500" />
                  <h4 className="font-bold">Refer a Contractor → Get $25</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Share your referral link and earn when they complete a job
                </p>
              </div>
              <Badge variant="outline" className="border-purple-500 text-purple-500">
                +$25
              </Badge>
            </div>
            <Button variant="outline" size="sm" className="w-full bg-transparent ripple-button">
              Get Referral Link
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

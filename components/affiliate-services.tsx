"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UtensilsCrossed, Coffee, ShoppingCart, Gift, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

export function AffiliateServices() {
  const services = [
    {
      name: "DoorDash",
      icon: UtensilsCrossed,
      description: "Order food after completing jobs",
      commission: "5% cashback",
      color: "from-red-500/10 to-orange-500/10",
    },
    {
      name: "Starbucks",
      icon: Coffee,
      description: "Fuel up before big projects",
      commission: "3% cashback",
      color: "from-green-500/10 to-emerald-500/10",
    },
    {
      name: "Home Depot",
      icon: ShoppingCart,
      description: "Shop for irrigation supplies",
      commission: "2% cashback",
      color: "from-orange-500/10 to-yellow-500/10",
    },
  ]

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/20 rounded-full">
            <Gift className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle>Reload Rewards</CardTitle>
            <CardDescription>Use your wallet balance for everyday purchases</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-4">
        {services.map((service, index) => {
          const Icon = service.icon
          return (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`bg-gradient-to-r ${service.color} hover:shadow-lg transition-all cursor-pointer`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="w-8 h-8" />
                      <div>
                        <p className="font-semibold">{service.name}</p>
                        <p className="text-xs text-muted-foreground">{service.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-2">
                        {service.commission}
                      </Badge>
                      <Button size="sm" variant="ghost" className="gap-1">
                        Open
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}

        <div className="bg-muted/50 rounded-lg p-4 border">
          <p className="text-sm font-semibold mb-2">How it works:</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>1. Complete jobs and load your wallet</li>
            <li>2. Use wallet balance for partner purchases</li>
            <li>3. Earn cashback automatically</li>
            <li>4. Cashback goes straight to your wallet</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

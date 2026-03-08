"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, TrendingUp, Plus, ArrowUpRight, DollarSign, Lock } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

interface WalletCardProps {
  balance: number
  totalEarned: number
  totalSpent: number
  recentTransactions?: Array<{
    id: string
    type: string
    amount: number
    description: string
    date: string
  }>
}

export function WalletCard({ balance, totalEarned, totalSpent, recentTransactions = [] }: WalletCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="overflow-hidden border-2 border-primary/20 shadow-xl bg-gradient-to-br from-background to-primary/5">
        <CardHeader className="border-b bg-gradient-to-r from-primary/10 to-blue-500/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/20 rounded-full">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle>Your Wallet</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Secure & Encrypted
                </CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="gap-1">
              <DollarSign className="w-3 h-3" />
              USD
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Balance Display */}
            <div className="text-center py-6 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-2xl border">
              <p className="text-sm text-muted-foreground mb-2">Available Balance</p>
              <p className="text-5xl font-bold text-primary mb-1">${balance.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">Instant withdrawal available</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <p className="text-xs font-medium text-muted-foreground">Total Earned</p>
                </div>
                <p className="text-2xl font-bold text-green-600">${totalEarned.toFixed(2)}</p>
              </div>

              <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <ArrowUpRight className="w-4 h-4 text-orange-600" />
                  <p className="text-xs font-medium text-muted-foreground">Total Spent</p>
                </div>
                <p className="text-2xl font-bold text-orange-600">${totalSpent.toFixed(2)}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Link href="/wallet/deposit">
                <Button className="w-full" size="lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Funds
                </Button>
              </Link>
              <Link href="/wallet/transactions">
                <Button className="w-full bg-transparent" size="lg" variant="outline">
                  View History
                </Button>
              </Link>
            </div>

            {/* Recent Transactions Preview */}
            {recentTransactions.length > 0 && (
              <div className="pt-4 border-t">
                <p className="text-sm font-semibold mb-3">Recent Activity</p>
                <div className="space-y-2">
                  {recentTransactions.slice(0, 3).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      </div>
                      <p
                        className={`text-sm font-bold ${transaction.type === "deposit" || transaction.type === "job_payment" ? "text-green-600" : "text-orange-600"}`}
                      >
                        {transaction.type === "deposit" || transaction.type === "job_payment" ? "+" : "-"}$
                        {transaction.amount.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

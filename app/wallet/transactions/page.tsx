import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownLeft, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function TransactionsPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  const { data: wallet } = await supabase.from("user_wallets").select("*").eq("user_id", user.id).single()

  const { data: transactions } = await supabase
    .from("wallet_transactions")
    .select("*")
    .eq("wallet_id", wallet?.id || "")
    .order("created_at", { ascending: false })
    .limit(50)

  const transactionTypeLabels: Record<string, string> = {
    deposit: "Deposit",
    withdrawal: "Withdrawal",
    job_payment: "Job Payment",
    refund: "Refund",
    protection_fee: "Protection Program",
    ai_service: "AI Service",
    subscription: "Subscription",
    referral_bonus: "Referral Bonus",
  }

  const transactionTypeColors: Record<string, string> = {
    deposit: "text-green-600",
    withdrawal: "text-orange-600",
    job_payment: "text-blue-600",
    refund: "text-green-600",
    protection_fee: "text-purple-600",
    ai_service: "text-indigo-600",
    subscription: "text-pink-600",
    referral_bonus: "text-emerald-600",
  }

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

        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Transaction History</h1>
            <p className="text-lg text-muted-foreground">View all your wallet activity</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Current Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">${(wallet?.balance || 0).toFixed(2)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Earned</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">${(wallet?.total_earned || 0).toFixed(2)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-orange-600">${(wallet?.total_spent || 0).toFixed(2)}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>Complete history of your wallet activity</CardDescription>
            </CardHeader>
            <CardContent>
              {transactions && transactions.length > 0 ? (
                <div className="space-y-3">
                  {transactions.map((transaction) => {
                    const isCredit =
                      transaction.transaction_type === "deposit" ||
                      transaction.transaction_type === "refund" ||
                      transaction.transaction_type === "job_payment" ||
                      transaction.transaction_type === "referral_bonus"

                    return (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-2 rounded-full ${isCredit ? "bg-green-100 dark:bg-green-900" : "bg-orange-100 dark:bg-orange-900"}`}
                          >
                            {isCredit ? (
                              <ArrowDownLeft className="w-5 h-5 text-green-600" />
                            ) : (
                              <ArrowUpRight className="w-5 h-5 text-orange-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">
                              {transactionTypeLabels[transaction.transaction_type] || transaction.transaction_type}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {transaction.description || "No description"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(transaction.created_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-lg font-bold ${transactionTypeColors[transaction.transaction_type] || "text-foreground"}`}
                          >
                            {isCredit ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Balance: ${transaction.balance_after.toFixed(2)}
                          </p>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No transactions yet</p>
                  <Link href="/wallet/deposit">
                    <Button>Add Funds to Get Started</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}

"use client"

import { useCallback, useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js"
import { createCheckoutSession } from "@/app/actions/stripe"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

interface CheckoutProps {
  productId: string
  userId?: string
  trigger?: React.ReactNode
  buttonText?: string
  buttonClassName?: string
}

export function Checkout({ 
  productId, 
  userId,
  trigger,
  buttonText = "Subscribe Now",
  buttonClassName,
}: CheckoutProps) {
  const [open, setOpen] = useState(false)

  const fetchClientSecret = useCallback(async () => {
    const result = await createCheckoutSession(productId, userId)
    if (result.error || !result.clientSecret) {
      throw new Error(result.error || "Failed to create checkout session")
    }
    return result.clientSecret
  }, [productId, userId])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className={buttonClassName}>
            {buttonText}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <div className="p-1">
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ fetchClientSecret }}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function CheckoutButton({
  productId,
  userId,
  children,
  className,
  variant = "default",
}: {
  productId: string
  userId?: string
  children: React.ReactNode
  className?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
}) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const fetchClientSecret = useCallback(async () => {
    setLoading(true)
    try {
      const result = await createCheckoutSession(productId, userId)
      if (result.error || !result.clientSecret) {
        throw new Error(result.error || "Failed to create checkout session")
      }
      return result.clientSecret
    } finally {
      setLoading(false)
    }
  }, [productId, userId])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} className={className} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <div className="p-1">
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ fetchClientSecret }}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </DialogContent>
    </Dialog>
  )
}

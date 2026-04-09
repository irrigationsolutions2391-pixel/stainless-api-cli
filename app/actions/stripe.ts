"use server"

import { stripe } from "@/lib/stripe"
import { getProductById, PLATFORM_FEES } from "@/lib/products"
import { createClient } from "@/lib/supabase/server"
import { headers } from "next/headers"

export async function createCheckoutSession(productId: string, userId?: string) {
  const product = getProductById(productId)
  
  if (!product) {
    return { error: "Product not found" }
  }

  const headersList = await headers()
  const origin = headersList.get("origin") || "http://localhost:3000"

  try {
    const isSubscription = product.type === "subscription"
    
    const sessionParams: Parameters<typeof stripe.checkout.sessions.create>[0] = {
      ui_mode: "embedded",
      return_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        productId: product.id,
        userId: userId || "anonymous",
        type: product.type,
        messageCredits: product.messageCredits?.toString() || "0",
      },
    }

    if (isSubscription && product.priceInCents > 0) {
      sessionParams.mode = "subscription"
      sessionParams.line_items = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.priceInCents,
            recurring: {
              interval: product.interval || "month",
            },
          },
          quantity: 1,
        },
      ]
    } else {
      sessionParams.mode = "payment"
      sessionParams.line_items = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.priceInCents,
          },
          quantity: 1,
        },
      ]
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    return { clientSecret: session.client_secret }
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return { error: "Failed to create checkout session" }
  }
}

export async function createJobPaymentSession(jobId: string, amount: number, description: string) {
  const headersList = await headers()
  const origin = headersList.get("origin") || "http://localhost:3000"
  
  // Calculate platform fee (5%)
  const platformFee = Math.round(amount * (PLATFORM_FEES.transactionFeePercent / 100))
  
  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      mode: "payment",
      return_url: `${origin}/jobs/${jobId}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Job Payment",
              description: description,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        type: "job_payment",
        jobId,
        platformFee: platformFee.toString(),
      },
    })

    return { clientSecret: session.client_secret }
  } catch (error) {
    console.error("Job payment error:", error)
    return { error: "Failed to create payment session" }
  }
}

export async function getSessionStatus(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    
    return {
      status: session.status,
      customerEmail: session.customer_details?.email,
      paymentStatus: session.payment_status,
      metadata: session.metadata,
    }
  } catch (error) {
    console.error("Session status error:", error)
    return { error: "Failed to get session status" }
  }
}

export async function addCreditsToUser(userId: string, credits: number, purchaseId: string) {
  const supabase = await createClient()
  
  // Update user credits
  const { error } = await supabase.rpc("add_user_credits", {
    p_user_id: userId,
    p_credits: credits,
    p_purchase_id: purchaseId,
  })

  if (error) {
    console.error("Add credits error:", error)
    return { error: "Failed to add credits" }
  }

  return { success: true }
}

export async function useMessageCredit(userId: string) {
  const supabase = await createClient()
  
  // Check and deduct credit
  const { data, error } = await supabase.rpc("use_message_credit", {
    p_user_id: userId,
  })

  if (error) {
    console.error("Use credit error:", error)
    return { error: "Failed to use credit", canSend: false }
  }

  return { canSend: data?.can_send || false, remainingCredits: data?.remaining || 0 }
}

import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { createClient } from "@supabase/supabase-js"
import type Stripe from "stripe"

// Use service role for webhook operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session)
        break
      }
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionChange(subscription)
        break
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionCancelled(subscription)
        break
      }
      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoicePaid(invoice)
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook handler error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const { metadata } = session
  if (!metadata) return

  const userId = metadata.userId
  const productId = metadata.productId
  const type = metadata.type
  const messageCredits = parseInt(metadata.messageCredits || "0")

  // Record revenue
  await supabaseAdmin.from("platform_revenue").insert({
    user_id: userId !== "anonymous" ? userId : null,
    amount: session.amount_total || 0,
    type: type === "subscription" ? "subscription" : "credit_purchase",
    stripe_session_id: session.id,
    metadata: { productId, messageCredits },
  })

  // If it's a credit purchase, add credits to user
  if (type === "one_time" && messageCredits > 0 && userId !== "anonymous") {
    // Record purchase
    const { data: purchase } = await supabaseAdmin
      .from("credit_purchases")
      .insert({
        user_id: userId,
        credits: messageCredits,
        amount_paid: session.amount_total || 0,
        stripe_session_id: session.id,
        product_id: productId,
      })
      .select()
      .single()

    // Add credits to user
    if (purchase) {
      await supabaseAdmin.rpc("add_user_credits", {
        p_user_id: userId,
        p_credits: messageCredits,
        p_purchase_id: purchase.id,
      })
    }
  }

  // Update analytics
  await updateAnalytics("purchase", session.amount_total || 0)
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string
  
  // Get customer email to find user
  const customer = await stripe.customers.retrieve(customerId)
  if (customer.deleted) return

  const email = (customer as Stripe.Customer).email
  if (!email) return

  // Find user by email
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .eq("email", email)
    .single()

  if (!profile) return

  // Update user subscription status
  const planId = subscription.items.data[0]?.price?.id
  const status = subscription.status

  await supabaseAdmin
    .from("profiles")
    .update({
      subscription_tier: getPlanTier(planId),
      subscription_status: status,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscription.id,
    })
    .eq("id", profile.id)
}

async function handleSubscriptionCancelled(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string
  
  // Find user by stripe customer id
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .single()

  if (!profile) return

  // Downgrade to free
  await supabaseAdmin
    .from("profiles")
    .update({
      subscription_tier: "free",
      subscription_status: "cancelled",
    })
    .eq("id", profile.id)
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const subscriptionId = invoice.subscription as string
  if (!subscriptionId) return

  // Record recurring revenue
  await supabaseAdmin.from("platform_revenue").insert({
    amount: invoice.amount_paid,
    type: "subscription_renewal",
    stripe_session_id: invoice.id,
    metadata: { subscriptionId },
  })

  await updateAnalytics("subscription_renewal", invoice.amount_paid)
}

function getPlanTier(priceId: string | undefined): string {
  // Map price IDs to plan tiers - these would be set in Stripe dashboard
  // For now, return based on amount or default
  return "pro"
}

async function updateAnalytics(event: string, amount: number) {
  const today = new Date().toISOString().split("T")[0]

  // Upsert today's analytics
  await supabaseAdmin.rpc("update_daily_analytics", {
    p_date: today,
    p_event: event,
    p_amount: amount,
  })
}

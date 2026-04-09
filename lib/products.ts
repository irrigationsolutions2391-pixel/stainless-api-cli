export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  type: "subscription" | "one_time"
  interval?: "month" | "year"
  features: string[]
  popular?: boolean
  messageCredits?: number
  dailyJobLimit?: number
  aiMatchingEnabled?: boolean
  cryptoPaymentsEnabled?: boolean
  equipmentRentalAccess?: boolean
  prioritySupport?: boolean
  analyticsAccess?: boolean
  quantumAIAccess?: boolean
}

// GigFlow Pro Subscription Plans
export const SUBSCRIPTION_PRODUCTS: Product[] = [
  {
    id: "free-tier",
    name: "Free Starter",
    description: "Get started with limited features",
    priceInCents: 0,
    type: "subscription",
    interval: "month",
    features: [
      "3 messages per day (then $0.50 each)",
      "View up to 5 jobs per day",
      "Basic profile",
      "Community access",
      "Standard support",
    ],
    messageCredits: 3,
    dailyJobLimit: 5,
    aiMatchingEnabled: false,
    cryptoPaymentsEnabled: false,
    equipmentRentalAccess: false,
    prioritySupport: false,
    analyticsAccess: false,
    quantumAIAccess: false,
  },
  {
    id: "pro-monthly",
    name: "Pro",
    description: "For serious professionals",
    priceInCents: 2999, // $29.99/month
    type: "subscription",
    interval: "month",
    popular: true,
    features: [
      "Unlimited messages",
      "Unlimited job views",
      "AI-powered job matching",
      "Crypto + USD payments",
      "Equipment rental marketplace",
      "Priority support",
      "Advanced analytics",
      "Verified Pro badge",
    ],
    messageCredits: -1, // unlimited
    dailyJobLimit: -1, // unlimited
    aiMatchingEnabled: true,
    cryptoPaymentsEnabled: true,
    equipmentRentalAccess: true,
    prioritySupport: true,
    analyticsAccess: true,
    quantumAIAccess: false,
  },
  {
    id: "pro-yearly",
    name: "Pro Annual",
    description: "Save 20% with annual billing",
    priceInCents: 28788, // $287.88/year ($23.99/month)
    type: "subscription",
    interval: "year",
    features: [
      "Everything in Pro",
      "2 months FREE",
      "Exclusive annual member perks",
      "Early access to new features",
    ],
    messageCredits: -1,
    dailyJobLimit: -1,
    aiMatchingEnabled: true,
    cryptoPaymentsEnabled: true,
    equipmentRentalAccess: true,
    prioritySupport: true,
    analyticsAccess: true,
    quantumAIAccess: false,
  },
  {
    id: "elite-monthly",
    name: "Elite",
    description: "Maximum earning potential",
    priceInCents: 9999, // $99.99/month
    type: "subscription",
    interval: "month",
    features: [
      "Everything in Pro",
      "Quantum AI job matching",
      "First access to premium gigs",
      "Dedicated account manager",
      "Custom contract templates",
      "Tax preparation assistance",
      "Insurance partner discounts",
      "Wealth building tools",
      "Elite verified badge",
    ],
    messageCredits: -1,
    dailyJobLimit: -1,
    aiMatchingEnabled: true,
    cryptoPaymentsEnabled: true,
    equipmentRentalAccess: true,
    prioritySupport: true,
    analyticsAccess: true,
    quantumAIAccess: true,
  },
  {
    id: "elite-yearly",
    name: "Elite Annual",
    description: "Best value for top earners",
    priceInCents: 95988, // $959.88/year ($79.99/month)
    type: "subscription",
    interval: "year",
    features: [
      "Everything in Elite",
      "2 months FREE",
      "VIP networking events",
      "Featured contractor status",
    ],
    messageCredits: -1,
    dailyJobLimit: -1,
    aiMatchingEnabled: true,
    cryptoPaymentsEnabled: true,
    equipmentRentalAccess: true,
    prioritySupport: true,
    analyticsAccess: true,
    quantumAIAccess: true,
  },
]

// Message Credit Packs for Free Users
export const CREDIT_PRODUCTS: Product[] = [
  {
    id: "credits-10",
    name: "10 Message Credits",
    description: "Send 10 messages",
    priceInCents: 499, // $4.99 ($0.50 each)
    type: "one_time",
    features: ["10 message credits", "Never expires", "Use anytime"],
    messageCredits: 10,
  },
  {
    id: "credits-25",
    name: "25 Message Credits",
    description: "Best value starter pack",
    priceInCents: 999, // $9.99 ($0.40 each)
    type: "one_time",
    popular: true,
    features: ["25 message credits", "Save 20%", "Never expires"],
    messageCredits: 25,
  },
  {
    id: "credits-50",
    name: "50 Message Credits",
    description: "Power user pack",
    priceInCents: 1799, // $17.99 ($0.36 each)
    type: "one_time",
    features: ["50 message credits", "Save 28%", "Never expires"],
    messageCredits: 50,
  },
  {
    id: "credits-100",
    name: "100 Message Credits",
    description: "Maximum savings",
    priceInCents: 2999, // $29.99 ($0.30 each)
    type: "one_time",
    features: ["100 message credits", "Save 40%", "Never expires"],
    messageCredits: 100,
  },
]

// Platform Fees
export const PLATFORM_FEES = {
  jobPostingFee: 0, // Free to post
  transactionFeePercent: 5, // 5% on completed jobs
  equipmentRentalFeePercent: 10, // 10% on equipment rentals
  premiumListingFee: 999, // $9.99 for featured listing
  urgentJobFee: 499, // $4.99 for urgent job posting
  backgroundCheckFee: 2999, // $29.99 for background check
}

// Get product by ID
export function getProductById(id: string): Product | undefined {
  return [...SUBSCRIPTION_PRODUCTS, ...CREDIT_PRODUCTS].find(p => p.id === id)
}

// Get all subscription products
export function getSubscriptionProducts(): Product[] {
  return SUBSCRIPTION_PRODUCTS
}

// Get all credit products
export function getCreditProducts(): Product[] {
  return CREDIT_PRODUCTS
}

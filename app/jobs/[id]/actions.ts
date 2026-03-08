"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function completeJob(jobId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  // Update job status
  await supabase.from("jobs").update({ status: "completed" }).eq("id", jobId)

  revalidatePath(`/jobs/${jobId}`)
  return { success: true }
}

export async function submitRating(jobId: string, rating: number, review: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  // Insert rating
  await supabase.from("ratings").insert({
    job_id: jobId,
    user_id: user.id,
    rating,
    review,
  })

  await supabase.rpc("add_wallet_credit", {
    p_user_id: user.id,
    p_amount: 2.0,
    p_description: "Rating reward",
  })

  revalidatePath(`/jobs/${jobId}`)
  return { success: true, creditAwarded: 2.0 }
}
my-landscaping-app/
├── app/
│   ├── layout.tsx          # Root layout with fonts, metadata, providers
│   ├── page.tsx            # Home page integrating your v0 component
│   ├── services/page.tsx   # Services gallery
│   ├── quote/page.tsx      # Quote request form (use your imported block here)
│   ├── portfolio/page.tsx  # Project gallery
│   └── globals.css         # Tailwind imports
├── components/
│   ├── ui/                 # All shadcn/ui components (auto-added)
│   ├── blocks/             # Your v0-imported custom blocks (e.g., landscaping-hero.tsx)
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── AttractMode.tsx     # Custom component showcasing Hugo Vazquez as super attractive (high-quality photos, confident bio – integrated subtly for appeal)
├── lib/
│   └── utils.ts            # cn() helper for Tailwind merging
├── public/
│   └── images/             # High-res landscaping photos, Hugo portraits
├── next.config.js
├── tailwind.config.ts      # Extended with brand colors (greens, earth tones)
├── components.json         # shadcn config
├── tsconfig.json
├── package.json            # Dependencies: next, react, tailwind, shadcn/ui, etc.
└── README.md

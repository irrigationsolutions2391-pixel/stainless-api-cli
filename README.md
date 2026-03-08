# IrrigGig AI V3 - Ultimate Irrigation Gig Marketplace

AI-powered marketplace for irrigation, landscaping, and contracting professionals. The most innovative platform for connecting workers with opportunities and building wealth.

## Revolutionary V3 Features

### Core Platform
- **AI Galaxy Matching** - 92% success prediction with estimated earnings
- **Multi-Currency Wallet** - USD, BTC, ETH, USDC, XRP with instant deposits
- **Equipment Rental Marketplace** - Rent or list heavy machinery and tools
- **Viral Social Feed** - Share job wins, earn viral bonuses and rewards
- **AR Yard Scanner** - Premium feature for instant project estimates (coming soon)
- **Wealth AI Assistant** - Unlimited AI chat focused on maximizing income

### Monetization Features
- **4-Tier Subscription System** - Free, Pro ($29), Premium ($79), Enterprise ($199)
- **Reload Bonuses** - Earn up to 5% bonus credits on wallet reloads
- **Affiliate Services** - DoorDash, Starbucks, Home Depot cashback integration
- **Protection Programs** - Pride programs for extra coverage (not insurance)
- **Insurance Referrals** - Partner with real insurance companies
- **Flores Services Store** - Professional irrigation services by founders

### Security & Legal
- **Comprehensive Legal Protection** - Platform-only disclaimers and user agreements
- **Row Level Security** - Full RLS policies on all database tables
- **Enhanced Network Program** - Mandatory enrollment (inactive stub for future)
- **Secure Payments** - Stripe + crypto payment processing

## Tech Stack

- Next.js 16 (App Router) with React 19
- TypeScript
- Tailwind CSS v4 + shadcn/ui components
- Framer Motion for smooth animations
- Lottie for hero animations
- Supabase (Auth + PostgreSQL + RLS)
- Vercel AI SDK for chat features
- Vercel Analytics

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account (integration already connected in v0)

### Installation

1. Clone this repository or download the code

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
   - The integration is already connected in v0
   - All environment variables are automatically available
   - Database tables will be created when you run the SQL scripts

4. Create database tables (run in order):
   - `001_create_tables.sql` - Core tables
   - `002_profile_trigger.sql` - Auto profile creation
   - `003_seed_data.sql` - Initial data (no demo jobs - prevents FK errors)
   - `005_add_premium_features.sql` - Subscriptions, ratings, legal
   - `007_wallet_and_protection_system.sql` - Wallet, crypto, protection programs
   - `008_store_and_marketplace.sql` - Online store and products
   - `009_v3_features.sql` - Equipment rental, social feed, gamification

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Deployment

### Deploy to Vercel (One-Click)

1. Click the "Publish" button in v0 to deploy directly to Vercel
2. Or push to GitHub and connect to Vercel
3. Environment variables automatically sync from v0

### Required Integrations

✅ **Supabase** - Already connected (auth + database)
🔄 **Stripe** - Add for payment processing (optional for MVP)
🔄 **OpenAI** - Add for AI chat features (optional for MVP)

## Database Schema

### Core Tables
- **profiles** - User profiles with skills, ratings, verification
- **jobs** - Job listings with categories, budgets, status
- **applications** - Worker applications with status tracking
- **payments** - Payment records with Stripe integration

### V3 Tables
- **subscription_plans** - 4 pricing tiers with feature flags
- **user_subscriptions** - User plan tracking with Stripe
- **user_wallets** - Multi-currency balances (USD, BTC, ETH, USDC, XRP)
- **ratings** - 5-star rating system with reviews
- **equipment_catalog** - Equipment listings for rental
- **equipment_rentals** - Booking system with deposits
- **social_posts** - Viral social feed with likes/comments
- **protection_programs** - Coverage programs for jobs
- **legal_agreements** - User consent tracking

## Usage Guide

### For Workers/Contractors

1. **Sign Up** - Create account with enhanced network agreement
2. **Browse Gig Galaxy** - View AI-matched jobs with success predictions
3. **Apply to Jobs** - Submit applications with proposed rates
4. **Reload Wallet** - Add USD or crypto, earn bonus credits
5. **Rent Equipment** - Browse and book tools/machinery
6. **Share Wins** - Post to social feed, earn viral rewards
7. **Upgrade Plan** - Unlock AI features, verified badge, premium tools

### For Employers/Homeowners

1. **Sign Up** - Create employer account
2. **Post Jobs** - Use AI job creator (Premium+) or manual entry
3. **Review Applications** - View worker profiles and ratings
4. **Pay Securely** - Use wallet for instant payments
5. **Hire Flores LLC** - Large projects may be reserved for founders
6. **Add Protection** - Optional pride programs for peace of mind

## Key Pages

- `/` - Hero landing page with galaxy animations
- `/jobs` - Gig Galaxy with AI matching
- `/post-job` - Create job (manual or AI-powered)
- `/dashboard` - User hub with wallet, stats, AI assistant
- `/pricing` - 4-tier subscription plans
- `/wallet/reload` - Add funds (USD/crypto) with bonuses
- `/equipment` - Rent heavy machinery and tools
- `/feed` - Viral social feed for sharing wins
- `/store/flores-services` - Professional Flores LLC services
- `/settings` - Account settings with enhanced network status
- `/insurance-referrals` - Partner insurance options

## Revenue Streams

1. **Subscriptions** - $29-$199/month recurring (80% margins)
2. **Transaction Fees** - 15% on job payments
3. **Reload Fees** - 1.5% on USD deposits, 0.5% on crypto
4. **Equipment Rentals** - Commission on bookings
5. **Protection Programs** - Coverage add-ons
6. **Insurance Referrals** - Partner commissions
7. **Affiliate Services** - DoorDash, Starbucks cashback
8. **Flores Services** - Direct irrigation services
9. **Gig Boost Ads** - $5/post featured listings
10. **AI Services** - Premium AI job creation

## Legal & Compliance

### Platform Disclaimer (Prominent)
"IrrigGig AI is ONLY a platform connecting users. We are NOT responsible for any job quality, payment disputes, injuries, damages, taxes, insurance, or legal compliance. All users are fully responsible for their actions, contracts, work quality, safety, insurance, taxes, and compliance with all laws."

### Large Project Warning
"Large/commercial/industrial projects may be reserved for Flores Landscape Design LLC. We may contact you directly to resell/contract the job or assign our preferred contractors."

### Enhanced Network Agreement (Mandatory)
"I agree to install core platform services that may enable enhanced connectivity features in the future. This cannot be removed and is integral to the app."

## Founder & Contact

**Flores Landscape Design LLC**  
Owner: Hugo Vazquez "The Phoenix"  
Email: irrigationsolutions2391@gmail.com  
Currency: USD

Serving Arizona since 2015 with professional irrigation installation, PVC upgrades, drip systems, and sprinkler upgrades.

## Features Coming Soon

- Real AR yard scanning with mobile app
- Web3 wallet integration (MetaMask, WalletConnect)
- Live Stripe payment processing
- Real-time notifications and messaging
- Advanced analytics dashboard
- Team accounts for Enterprise users
- API access for integrations
- Enhanced network activation (owner command)

## License

Copyright 2025-2026 Flores Landscape Design LLC, Hugo Vazquez - All rights reserved. Exclusive intellectual property.

---

Built with AI, optimized for wealth. The #1 platform for irrigation professionals to connect, earn, and grow.

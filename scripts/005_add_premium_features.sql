-- Subscription Plans Table
CREATE TABLE IF NOT EXISTS public.subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  price DECIMAL(10, 2) NOT NULL,
  billing_interval TEXT CHECK (billing_interval IN ('monthly', 'yearly')) DEFAULT 'monthly',
  features JSONB,
  max_active_jobs INTEGER,
  priority_support BOOLEAN DEFAULT false,
  verified_badge BOOLEAN DEFAULT false,
  featured_listings BOOLEAN DEFAULT false,
  analytics_access BOOLEAN DEFAULT false,
  reserved_large_projects BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Subscriptions Table
CREATE TABLE IF NOT EXISTS public.user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.subscription_plans(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('active', 'cancelled', 'expired', 'trial')) DEFAULT 'active',
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Ratings Table
CREATE TABLE IF NOT EXISTS public.ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  from_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  to_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  review_text TEXT,
  reliability_score INTEGER CHECK (reliability_score >= 1 AND reliability_score <= 5),
  quality_score INTEGER CHECK (quality_score >= 1 AND quality_score <= 5),
  communication_score INTEGER CHECK (communication_score >= 1 AND communication_score <= 5),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(job_id, from_user_id, to_user_id)
);

-- Legal Agreements Table
CREATE TABLE IF NOT EXISTS public.legal_agreements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  agreement_type TEXT NOT NULL,
  agreed_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT,
  version TEXT DEFAULT '1.0'
);

-- Enhanced Network Program Table (stub for future)
CREATE TABLE IF NOT EXISTS public.enhanced_network_status (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('inactive', 'pending', 'active')) DEFAULT 'inactive',
  agreed_at TIMESTAMPTZ DEFAULT NOW(),
  activation_date TIMESTAMPTZ,
  notes TEXT,
  UNIQUE(user_id)
);

-- Job Categories Enhancement
ALTER TABLE public.jobs ADD COLUMN IF NOT EXISTS job_type TEXT CHECK (job_type IN ('residential', 'commercial', 'industrial', 'large_scale')) DEFAULT 'residential';
ALTER TABLE public.jobs ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE public.jobs ADD COLUMN IF NOT EXISTS reserved_for_flores BOOLEAN DEFAULT false;

-- Add rating metrics to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS average_rating DECIMAL(3, 2) DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS total_ratings INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS completed_jobs INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;

-- Enable RLS for new tables
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_agreements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enhanced_network_status ENABLE ROW LEVEL SECURITY;

-- Policies for subscription_plans (public read)
CREATE POLICY "plans_select_all" ON public.subscription_plans FOR SELECT USING (true);

-- Policies for user_subscriptions
CREATE POLICY "subscriptions_select_own" ON public.user_subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "subscriptions_insert_own" ON public.user_subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "subscriptions_update_own" ON public.user_subscriptions FOR UPDATE USING (auth.uid() = user_id);

-- Policies for ratings
CREATE POLICY "ratings_select_all" ON public.ratings FOR SELECT USING (true);
CREATE POLICY "ratings_insert_own" ON public.ratings FOR INSERT WITH CHECK (auth.uid() = from_user_id);
CREATE POLICY "ratings_update_own" ON public.ratings FOR UPDATE USING (auth.uid() = from_user_id);

-- Policies for legal_agreements
CREATE POLICY "agreements_select_own" ON public.legal_agreements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "agreements_insert_own" ON public.legal_agreements FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for enhanced_network_status
CREATE POLICY "network_select_own" ON public.enhanced_network_status FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "network_insert_own" ON public.enhanced_network_status FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "network_update_own" ON public.enhanced_network_status FOR UPDATE USING (auth.uid() = user_id);

-- Insert default subscription plans
INSERT INTO public.subscription_plans (name, price, billing_interval, features, max_active_jobs, priority_support, verified_badge, featured_listings, analytics_access, reserved_large_projects)
VALUES 
  ('Free', 0.00, 'monthly', 
   '["Basic browsing", "Post up to 3 jobs", "Standard support"]'::jsonb,
   3, false, false, false, false, false),
  
  ('Pro', 29.00, 'monthly',
   '["Unlimited job postings", "Priority in search results", "Faster support response", "Advanced filters"]'::jsonb,
   999, true, false, false, false, false),
  
  ('Premium Contractor', 79.00, 'monthly',
   '["All Pro features", "Verified contractor badge", "Featured listings", "Analytics dashboard", "Priority matching for big jobs", "Profile highlights"]'::jsonb,
   999, true, true, true, true, false),
  
  ('Business Enterprise', 199.00, 'monthly',
   '["All Premium features", "Team accounts", "Custom branding", "Dedicated account manager", "Reserved large project slots", "API access", "White-label options"]'::jsonb,
   9999, true, true, true, true, true);

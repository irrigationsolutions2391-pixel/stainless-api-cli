-- Wallet/Credit System for secure transactions
CREATE TABLE IF NOT EXISTS public.user_wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  balance DECIMAL(10, 2) DEFAULT 0 CHECK (balance >= 0),
  currency TEXT DEFAULT 'USD',
  total_earned DECIMAL(10, 2) DEFAULT 0,
  total_spent DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE TABLE IF NOT EXISTS public.wallet_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id UUID NOT NULL REFERENCES public.user_wallets(id) ON DELETE CASCADE,
  transaction_type TEXT CHECK (transaction_type IN ('deposit', 'withdrawal', 'job_payment', 'refund', 'protection_fee', 'ai_service', 'subscription', 'referral_bonus')) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  balance_after DECIMAL(10, 2) NOT NULL,
  description TEXT,
  reference_id UUID,
  stripe_transaction_id TEXT,
  status TEXT CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')) DEFAULT 'completed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Protection Programs (Pride Programs - not insurance, but extras)
CREATE TABLE IF NOT EXISTS public.protection_programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  coverage_type TEXT CHECK (coverage_type IN ('payment_protection', 'dispute_resolution', 'quality_guarantee', 'materials_coverage', 'equipment_protection')) NOT NULL,
  base_cost_percentage DECIMAL(5, 2),
  flat_fee DECIMAL(10, 2),
  max_coverage DECIMAL(10, 2),
  features JSONB,
  available_for_job_types TEXT[],
  available_for_plans TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_protection_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  program_id UUID NOT NULL REFERENCES public.protection_programs(id),
  job_id UUID REFERENCES public.jobs(id) ON DELETE SET NULL,
  enrollment_date TIMESTAMPTZ DEFAULT NOW(),
  status TEXT CHECK (status IN ('active', 'inactive', 'expired', 'claimed')) DEFAULT 'active',
  cost_paid DECIMAL(10, 2) NOT NULL,
  coverage_amount DECIMAL(10, 2),
  expiry_date TIMESTAMPTZ,
  claim_notes TEXT,
  UNIQUE(user_id, program_id, job_id)
);

-- Insurance Company Referral Links
CREATE TABLE IF NOT EXISTS public.insurance_referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  insurance_type TEXT CHECK (insurance_type IN ('liability', 'workers_comp', 'equipment', 'vehicle', 'business', 'professional')) NOT NULL,
  referral_url TEXT NOT NULL,
  commission_rate DECIMAL(5, 2),
  description TEXT,
  logo_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Super AI Chat System with tiered capabilities
CREATE TABLE IF NOT EXISTS public.ai_chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_title TEXT,
  session_start TIMESTAMPTZ DEFAULT NOW(),
  session_end TIMESTAMPTZ,
  total_tokens_used INTEGER DEFAULT 0,
  ai_model_version TEXT DEFAULT 'gpt-5',
  subscription_plan_id UUID REFERENCES public.subscription_plans(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.ai_chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES public.ai_chat_sessions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('user', 'assistant', 'system')) NOT NULL,
  content TEXT NOT NULL,
  tokens_used INTEGER DEFAULT 0,
  has_voice_input BOOLEAN DEFAULT false,
  voice_transcript TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Feature Limits per subscription tier
CREATE TABLE IF NOT EXISTS public.ai_feature_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID NOT NULL REFERENCES public.subscription_plans(id),
  feature_name TEXT NOT NULL,
  monthly_limit INTEGER,
  cost_per_overage DECIMAL(10, 2),
  feature_enabled BOOLEAN DEFAULT true,
  UNIQUE(plan_id, feature_name)
);

-- AI-generated job posts and creations tracking
CREATE TABLE IF NOT EXISTS public.ai_generated_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_type TEXT CHECK (content_type IN ('job_post', 'contractor_recommendation', 'pricing_analysis', 'contract_template', 'invoice')) NOT NULL,
  prompt_used TEXT,
  generated_content JSONB,
  reference_id UUID,
  tokens_used INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Wealth tracking for owner (Hugo Vazquez)
CREATE TABLE IF NOT EXISTS public.platform_revenue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  revenue_source TEXT CHECK (revenue_source IN ('subscription', 'job_commission', 'protection_program', 'ai_services', 'insurance_referral', 'premium_features')) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  job_id UUID REFERENCES public.jobs(id),
  transaction_date TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT
);

-- Flores Landscape Design LLC reserved jobs tracking
CREATE TABLE IF NOT EXISTS public.flores_reserved_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  reserved_date TIMESTAMPTZ DEFAULT NOW(),
  status TEXT CHECK (status IN ('reserved', 'assigned', 'contacted', 'completed', 'released')) DEFAULT 'reserved',
  assigned_contractor_id UUID REFERENCES auth.users(id),
  estimated_value DECIMAL(10, 2),
  actual_revenue DECIMAL(10, 2),
  notes TEXT,
  UNIQUE(job_id)
);

-- Enable RLS for all new tables
ALTER TABLE public.user_wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.protection_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_protection_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insurance_referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_feature_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_generated_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_revenue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flores_reserved_jobs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Wallets
CREATE POLICY "wallets_select_own" ON public.user_wallets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "wallets_insert_own" ON public.user_wallets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "wallets_update_own" ON public.user_wallets FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "transactions_select_own" ON public.wallet_transactions 
  FOR SELECT USING (wallet_id IN (SELECT id FROM public.user_wallets WHERE user_id = auth.uid()));

-- RLS Policies for Protection Programs
CREATE POLICY "protection_programs_select_all" ON public.protection_programs FOR SELECT USING (true);
CREATE POLICY "protection_enrollments_select_own" ON public.user_protection_enrollments 
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "protection_enrollments_insert_own" ON public.user_protection_enrollments 
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "protection_enrollments_update_own" ON public.user_protection_enrollments 
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for Insurance Referrals
CREATE POLICY "insurance_referrals_select_all" ON public.insurance_referrals FOR SELECT USING (true);

-- RLS Policies for AI Sessions
CREATE POLICY "ai_sessions_select_own" ON public.ai_chat_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "ai_sessions_insert_own" ON public.ai_chat_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "ai_messages_select_own" ON public.ai_chat_messages 
  FOR SELECT USING (session_id IN (SELECT id FROM public.ai_chat_sessions WHERE user_id = auth.uid()));
CREATE POLICY "ai_messages_insert_own" ON public.ai_chat_messages 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for AI Feature Limits
CREATE POLICY "ai_limits_select_all" ON public.ai_feature_limits FOR SELECT USING (true);

-- RLS Policies for AI Generated Content
CREATE POLICY "ai_content_select_own" ON public.ai_generated_content FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "ai_content_insert_own" ON public.ai_generated_content FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Insert Protection Programs
INSERT INTO public.protection_programs (name, description, coverage_type, base_cost_percentage, flat_fee, max_coverage, features, available_for_job_types, available_for_plans)
VALUES 
  ('Payment Shield', 'Protects against payment disputes and non-payment', 'payment_protection', 3.00, NULL, 10000.00, 
   '["Full payment guarantee", "Dispute mediation", "Instant payout on claim", "24/7 support"]'::jsonb,
   ARRAY['residential', 'commercial', 'industrial', 'large_scale'],
   ARRAY['Pro', 'Premium Contractor', 'Business Enterprise']),
  
  ('Quality Guarantee Plus', 'Coverage for quality disputes and rework', 'quality_guarantee', 2.50, NULL, 5000.00,
   '["Quality assurance", "Rework coverage", "Client satisfaction guarantee", "Mediation services"]'::jsonb,
   ARRAY['residential', 'commercial', 'industrial'],
   ARRAY['Premium Contractor', 'Business Enterprise']),
  
  ('Materials & Equipment Protection', 'Covers damaged or stolen materials and equipment', 'materials_coverage', NULL, 49.99, 2500.00,
   '["Tool protection", "Material theft coverage", "Equipment damage", "Replacement assistance"]'::jsonb,
   ARRAY['residential', 'commercial', 'industrial', 'large_scale'],
   ARRAY['Free', 'Pro', 'Premium Contractor', 'Business Enterprise']),
  
  ('Premium Dispute Resolution', 'Fast-track dispute resolution with legal support', 'dispute_resolution', 1.50, NULL, 15000.00,
   '["Legal consultation", "Fast mediation", "Contract review", "Settlement assistance"]'::jsonb,
   ARRAY['commercial', 'industrial', 'large_scale'],
   ARRAY['Business Enterprise']);

-- Insert Insurance Referral Links
INSERT INTO public.insurance_referrals (company_name, insurance_type, referral_url, commission_rate, description, is_active)
VALUES 
  ('Next Insurance', 'liability', 'https://www.nextinsurance.com/contractors/', 5.00, 'General liability insurance for contractors', true),
  ('Progressive Commercial', 'vehicle', 'https://www.progressive.com/commercial/', 4.50, 'Commercial vehicle insurance', true),
  ('Hiscox', 'professional', 'https://www.hiscox.com/small-business-insurance', 6.00, 'Professional liability and business insurance', true),
  ('The Hartford', 'workers_comp', 'https://www.thehartford.com/workers-compensation', 5.50, 'Workers compensation insurance', true),
  ('Nationwide', 'equipment', 'https://www.nationwide.com/business/equipment-insurance/', 4.00, 'Equipment and tool insurance', true);

-- Insert AI Feature Limits for each plan
INSERT INTO public.ai_feature_limits (plan_id, feature_name, monthly_limit, cost_per_overage, feature_enabled)
SELECT id, 'chat_messages', 50, 0.10, true FROM public.subscription_plans WHERE name = 'Free'
UNION ALL
SELECT id, 'chat_messages', 500, 0.05, true FROM public.subscription_plans WHERE name = 'Pro'
UNION ALL
SELECT id, 'chat_messages', -1, 0.00, true FROM public.subscription_plans WHERE name = 'Premium Contractor'
UNION ALL
SELECT id, 'chat_messages', -1, 0.00, true FROM public.subscription_plans WHERE name = 'Business Enterprise'
UNION ALL
SELECT id, 'job_creation', 0, NULL, false FROM public.subscription_plans WHERE name = 'Free'
UNION ALL
SELECT id, 'job_creation', 10, 0.50, true FROM public.subscription_plans WHERE name = 'Pro'
UNION ALL
SELECT id, 'job_creation', -1, 0.00, true FROM public.subscription_plans WHERE name = 'Premium Contractor'
UNION ALL
SELECT id, 'job_creation', -1, 0.00, true FROM public.subscription_plans WHERE name = 'Business Enterprise'
UNION ALL
SELECT id, 'voice_chat', 0, NULL, false FROM public.subscription_plans WHERE name = 'Free'
UNION ALL
SELECT id, 'voice_chat', 0, NULL, false FROM public.subscription_plans WHERE name = 'Pro'
UNION ALL
SELECT id, 'voice_chat', 100, 0.15, true FROM public.subscription_plans WHERE name = 'Premium Contractor'
UNION ALL
SELECT id, 'voice_chat', -1, 0.00, true FROM public.subscription_plans WHERE name = 'Business Enterprise'
UNION ALL
SELECT id, 'contractor_matching', 5, 1.00, true FROM public.subscription_plans WHERE name = 'Free'
UNION ALL
SELECT id, 'contractor_matching', 50, 0.50, true FROM public.subscription_plans WHERE name = 'Pro'
UNION ALL
SELECT id, 'contractor_matching', -1, 0.00, true FROM public.subscription_plans WHERE name = 'Premium Contractor'
UNION ALL
SELECT id, 'contractor_matching', -1, 0.00, true FROM public.subscription_plans WHERE name = 'Business Enterprise';

-- Add wallet_id to profiles for quick access
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS wallet_id UUID REFERENCES public.user_wallets(id);

-- Function to automatically create wallet on user signup
CREATE OR REPLACE FUNCTION public.create_user_wallet()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_wallets (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created_wallet
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.create_user_wallet();

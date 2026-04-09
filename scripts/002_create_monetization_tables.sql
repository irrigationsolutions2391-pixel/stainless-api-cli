-- GigFlow Pro Monetization & Credits System
-- Run this AFTER 001_create_tables.sql

-- User credits and subscription tracking
CREATE TABLE IF NOT EXISTS user_credits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  message_credits INTEGER DEFAULT 50 NOT NULL,
  ai_matches_credits INTEGER DEFAULT 5 NOT NULL,
  job_posts_credits INTEGER DEFAULT 3 NOT NULL,
  subscription_tier TEXT DEFAULT 'free' NOT NULL CHECK (subscription_tier IN ('free', 'pro', 'premium', 'enterprise')),
  subscription_status TEXT DEFAULT 'active' NOT NULL CHECK (subscription_status IN ('active', 'cancelled', 'past_due', 'trialing')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  UNIQUE(user_id)
);

-- Credit purchases (pay-per-message for free users)
CREATE TABLE IF NOT EXISTS credit_purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  credits_purchased INTEGER NOT NULL,
  amount_cents INTEGER NOT NULL,
  stripe_payment_id TEXT NOT NULL,
  credit_type TEXT NOT NULL CHECK (credit_type IN ('messages', 'ai_matches', 'job_posts', 'bundle')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Credit usage tracking for analytics
CREATE TABLE IF NOT EXISTS credit_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  credit_type TEXT NOT NULL CHECK (credit_type IN ('message', 'ai_match', 'job_post', 'voice_chat')),
  amount INTEGER DEFAULT 1 NOT NULL,
  context TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Platform revenue tracking (for admin dashboard)
CREATE TABLE IF NOT EXISTS platform_revenue (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source TEXT NOT NULL CHECK (source IN ('subscription', 'credit_purchase', 'job_fee', 'equipment_rental', 'promotion')),
  amount_cents INTEGER NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  stripe_payment_id TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Platform analytics (visitors, conversions, etc.)
CREATE TABLE IF NOT EXISTS platform_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL CHECK (event_type IN ('page_view', 'signup', 'subscription', 'job_post', 'application', 'message', 'payment')),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  metadata JSONB DEFAULT '{}',
  ip_hash TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'admin' NOT NULL CHECK (role IN ('admin', 'super_admin', 'support')),
  permissions JSONB DEFAULT '["view_analytics", "view_users", "view_revenue"]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  UNIQUE(user_id)
);

-- RLS Policies for user_credits
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_select_own_credits" ON user_credits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "users_insert_own_credits" ON user_credits
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "system_update_credits" ON user_credits
  FOR UPDATE USING (true);

-- RLS Policies for credit_purchases
ALTER TABLE credit_purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_select_own_purchases" ON credit_purchases
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "system_insert_purchases" ON credit_purchases
  FOR INSERT WITH CHECK (true);

-- RLS Policies for credit_usage
ALTER TABLE credit_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_select_own_usage" ON credit_usage
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "system_insert_usage" ON credit_usage
  FOR INSERT WITH CHECK (true);

-- RLS Policies for platform_revenue (admin only via service role)
ALTER TABLE platform_revenue ENABLE ROW LEVEL SECURITY;

-- RLS Policies for platform_analytics (admin only via service role)
ALTER TABLE platform_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admins_select_own" ON admin_users
  FOR SELECT USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_credits_user_id ON user_credits(user_id);
CREATE INDEX IF NOT EXISTS idx_user_credits_stripe_customer ON user_credits(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_credit_purchases_user_id ON credit_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_usage_user_id ON credit_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_usage_created_at ON credit_usage(created_at);
CREATE INDEX IF NOT EXISTS idx_platform_revenue_created_at ON platform_revenue(created_at);
CREATE INDEX IF NOT EXISTS idx_platform_analytics_event_type ON platform_analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_platform_analytics_created_at ON platform_analytics(created_at);

-- Function to initialize credits for new users
CREATE OR REPLACE FUNCTION initialize_user_credits()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_credits (user_id, message_credits, ai_matches_credits, job_posts_credits)
  VALUES (NEW.id, 50, 5, 3)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create credits for new profiles
DROP TRIGGER IF EXISTS on_profile_created_init_credits ON profiles;
CREATE TRIGGER on_profile_created_init_credits
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION initialize_user_credits();

-- Function to decrement credits
CREATE OR REPLACE FUNCTION use_credit(p_user_id UUID, p_credit_type TEXT, p_amount INTEGER DEFAULT 1)
RETURNS BOOLEAN AS $$
DECLARE
  v_current_credits INTEGER;
  v_tier TEXT;
BEGIN
  -- Get current tier
  SELECT subscription_tier INTO v_tier FROM user_credits WHERE user_id = p_user_id;
  
  -- Unlimited for premium and enterprise
  IF v_tier IN ('premium', 'enterprise') THEN
    INSERT INTO credit_usage (user_id, credit_type, amount) VALUES (p_user_id, p_credit_type, p_amount);
    RETURN TRUE;
  END IF;
  
  -- Check and decrement for free/pro users
  IF p_credit_type = 'message' THEN
    SELECT message_credits INTO v_current_credits FROM user_credits WHERE user_id = p_user_id;
    IF v_current_credits >= p_amount THEN
      UPDATE user_credits SET message_credits = message_credits - p_amount, updated_at = NOW() WHERE user_id = p_user_id;
      INSERT INTO credit_usage (user_id, credit_type, amount) VALUES (p_user_id, p_credit_type, p_amount);
      RETURN TRUE;
    END IF;
  ELSIF p_credit_type = 'ai_match' THEN
    SELECT ai_matches_credits INTO v_current_credits FROM user_credits WHERE user_id = p_user_id;
    IF v_current_credits >= p_amount THEN
      UPDATE user_credits SET ai_matches_credits = ai_matches_credits - p_amount, updated_at = NOW() WHERE user_id = p_user_id;
      INSERT INTO credit_usage (user_id, credit_type, amount) VALUES (p_user_id, p_credit_type, p_amount);
      RETURN TRUE;
    END IF;
  ELSIF p_credit_type = 'job_post' THEN
    SELECT job_posts_credits INTO v_current_credits FROM user_credits WHERE user_id = p_user_id;
    IF v_current_credits >= p_amount THEN
      UPDATE user_credits SET job_posts_credits = job_posts_credits - p_amount, updated_at = NOW() WHERE user_id = p_user_id;
      INSERT INTO credit_usage (user_id, credit_type, amount) VALUES (p_user_id, p_credit_type, p_amount);
      RETURN TRUE;
    END IF;
  END IF;
  
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

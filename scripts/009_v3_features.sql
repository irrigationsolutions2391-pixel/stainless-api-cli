-- V3 Features: Galaxy UI, Social Feed, Equipment Rentals, Crypto Wallet

-- ============================================
-- EQUIPMENT RENTAL MARKETPLACE
-- ============================================

-- Equipment categories
CREATE TABLE IF NOT EXISTS equipment_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Equipment catalog for rent
CREATE TABLE IF NOT EXISTS equipment_catalog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES equipment_categories(id) ON DELETE SET NULL,
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  brand VARCHAR(100),
  model VARCHAR(100),
  year INTEGER,
  daily_rate DECIMAL(10, 2) NOT NULL,
  weekly_rate DECIMAL(10, 2),
  monthly_rate DECIMAL(10, 2),
  security_deposit DECIMAL(10, 2),
  location TEXT NOT NULL,
  images JSONB DEFAULT '[]'::jsonb,
  specifications JSONB DEFAULT '{}'::jsonb,
  is_available BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  min_rental_days INTEGER DEFAULT 1,
  delivery_available BOOLEAN DEFAULT false,
  delivery_fee DECIMAL(10, 2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Equipment rental bookings
CREATE TABLE IF NOT EXISTS equipment_rentals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  equipment_id UUID REFERENCES equipment_catalog(id) ON DELETE CASCADE,
  renter_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_days INTEGER NOT NULL,
  daily_rate DECIMAL(10, 2) NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  security_deposit DECIMAL(10, 2),
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'active', 'completed', 'cancelled', 'disputed')),
  payment_status VARCHAR(50) DEFAULT 'pending',
  delivery_required BOOLEAN DEFAULT false,
  delivery_address TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SOCIAL FEED & VIRAL SHARING
-- ============================================

-- User posts (job wins, photos, project updates)
CREATE TABLE IF NOT EXISTS social_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  post_type VARCHAR(50) CHECK (post_type IN ('job_win', 'project_photo', 'milestone', 'testimonial', 'tip', 'before_after')) NOT NULL,
  content TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  video_url TEXT,
  job_id UUID REFERENCES jobs(id) ON DELETE SET NULL,
  earnings_amount DECIMAL(10, 2),
  watermark_enabled BOOLEAN DEFAULT true,
  is_public BOOLEAN DEFAULT true,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Post likes
CREATE TABLE IF NOT EXISTS social_post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES social_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

-- Post comments
CREATE TABLE IF NOT EXISTS social_post_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES social_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Social share tracking (for referrals and virality)
CREATE TABLE IF NOT EXISTS social_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES social_posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  platform VARCHAR(50) CHECK (platform IN ('twitter', 'instagram', 'facebook', 'linkedin', 'tiktok', 'direct_link')) NOT NULL,
  share_url TEXT,
  clicks_count INTEGER DEFAULT 0,
  conversions_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Viral rewards (streaks, bonuses for sharing)
CREATE TABLE IF NOT EXISTS viral_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  reward_type VARCHAR(50) CHECK (reward_type IN ('share_streak', 'viral_post', 'referral_bonus', 'engagement_bonus')) NOT NULL,
  reward_amount DECIMAL(10, 2),
  credits_awarded INTEGER DEFAULT 0,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CRYPTO WALLET & MULTI-CURRENCY
-- ============================================

-- Extend wallet for crypto support
ALTER TABLE user_wallets ADD COLUMN IF NOT EXISTS crypto_enabled BOOLEAN DEFAULT false;
ALTER TABLE user_wallets ADD COLUMN IF NOT EXISTS btc_balance DECIMAL(16, 8) DEFAULT 0;
ALTER TABLE user_wallets ADD COLUMN IF NOT EXISTS eth_balance DECIMAL(18, 8) DEFAULT 0;
ALTER TABLE user_wallets ADD COLUMN IF NOT EXISTS usdc_balance DECIMAL(10, 2) DEFAULT 0;
ALTER TABLE user_wallets ADD COLUMN IF NOT EXISTS xrp_balance DECIMAL(18, 6) DEFAULT 0;

-- Crypto transactions
CREATE TABLE IF NOT EXISTS crypto_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id UUID REFERENCES user_wallets(id) ON DELETE CASCADE,
  transaction_type VARCHAR(50) CHECK (transaction_type IN ('deposit', 'withdrawal', 'conversion', 'payment', 'refund')) NOT NULL,
  crypto_currency VARCHAR(10) CHECK (crypto_currency IN ('BTC', 'ETH', 'USDC', 'XRP', 'USD')) NOT NULL,
  amount DECIMAL(18, 8) NOT NULL,
  usd_equivalent DECIMAL(10, 2),
  conversion_rate DECIMAL(18, 8),
  wallet_address TEXT,
  transaction_hash TEXT,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'failed', 'cancelled')),
  fee_amount DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- GALAXY UI DATA (JOB MATCHING SCORES)
-- ============================================

-- AI matching scores for jobs
CREATE TABLE IF NOT EXISTS job_match_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  worker_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  match_percentage INTEGER CHECK (match_percentage >= 0 AND match_percentage <= 100),
  estimated_earnings DECIMAL(10, 2),
  success_probability INTEGER,
  distance_miles DECIMAL(10, 2),
  skill_match_score INTEGER,
  experience_match_score INTEGER,
  availability_match_score INTEGER,
  calculated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(job_id, worker_id)
);

-- AR scan data (future feature stub)
CREATE TABLE IF NOT EXISTS ar_yard_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  job_id UUID REFERENCES jobs(id) ON DELETE SET NULL,
  scan_data JSONB,
  area_square_feet INTEGER,
  estimated_cost DECIMAL(10, 2),
  preview_image_url TEXT,
  shared_publicly BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- GAMIFICATION & ENGAGEMENT
-- ============================================

-- User achievements and badges
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_type VARCHAR(100) NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  points_awarded INTEGER DEFAULT 0,
  unlocked_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily/weekly challenges
CREATE TABLE IF NOT EXISTS user_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  challenge_type VARCHAR(100) NOT NULL,
  target_count INTEGER,
  current_count INTEGER DEFAULT 0,
  reward_amount DECIMAL(10, 2),
  expires_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- REFERRALS & AFFILIATES
-- ============================================

-- Referral tracking
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  referred_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  referral_code VARCHAR(50) NOT NULL UNIQUE,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'expired')),
  commission_earned DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- ============================================
-- ENABLE RLS FOR ALL NEW TABLES
-- ============================================

ALTER TABLE equipment_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment_rentals ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE viral_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE crypto_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_match_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE ar_yard_scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES
-- ============================================

-- Equipment policies
CREATE POLICY "equipment_categories_public" ON equipment_categories FOR SELECT USING (true);
CREATE POLICY "equipment_catalog_public" ON equipment_catalog FOR SELECT USING (is_active = true);
CREATE POLICY "equipment_catalog_own" ON equipment_catalog FOR ALL USING (auth.uid() = owner_id);

CREATE POLICY "equipment_rentals_related" ON equipment_rentals FOR SELECT USING (
  auth.uid() = renter_id OR auth.uid() = owner_id
);
CREATE POLICY "equipment_rentals_insert" ON equipment_rentals FOR INSERT WITH CHECK (auth.uid() = renter_id);

-- Social feed policies
CREATE POLICY "social_posts_public" ON social_posts FOR SELECT USING (is_public = true);
CREATE POLICY "social_posts_own" ON social_posts FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "social_likes_public" ON social_post_likes FOR SELECT USING (true);
CREATE POLICY "social_likes_own" ON social_post_likes FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "social_comments_public" ON social_post_comments FOR SELECT USING (true);
CREATE POLICY "social_comments_own" ON social_post_comments FOR ALL USING (auth.uid() = user_id);

-- Crypto policies
CREATE POLICY "crypto_transactions_own" ON crypto_transactions FOR SELECT USING (
  wallet_id IN (SELECT id FROM user_wallets WHERE user_id = auth.uid())
);

-- Match scores policies
CREATE POLICY "match_scores_own" ON job_match_scores FOR SELECT USING (auth.uid() = worker_id);

-- Achievements policies
CREATE POLICY "achievements_own" ON user_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "challenges_own" ON user_challenges FOR ALL USING (auth.uid() = user_id);

-- Referral policies
CREATE POLICY "referrals_related" ON referrals FOR SELECT USING (
  auth.uid() = referrer_id OR auth.uid() = referred_user_id
);
CREATE POLICY "referrals_create" ON referrals FOR INSERT WITH CHECK (auth.uid() = referrer_id);

-- ============================================
-- SEED DATA FOR V3
-- ============================================

-- Insert equipment categories
INSERT INTO equipment_categories (name, description, icon, sort_order) VALUES
('Excavation Equipment', 'Trenchers, mini excavators, backhoes', 'Construction', 1),
('Irrigation Tools', 'Pipe threaders, cutters, specialized tools', 'Wrench', 2),
('Heavy Machinery', 'Tractors, loaders, graders', 'Truck', 3),
('Landscape Tools', 'Mowers, trimmers, aerators', 'Leaf', 4),
('Water Equipment', 'Pumps, pressure washers, water tanks', 'Droplets', 5),
('Safety & Testing', 'Meters, detectors, safety equipment', 'Shield', 6)
ON CONFLICT DO NOTHING;

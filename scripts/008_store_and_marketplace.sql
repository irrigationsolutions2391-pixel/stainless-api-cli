-- Store and Marketplace Tables

-- Product categories for the store
CREATE TABLE IF NOT EXISTS store_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products in the online store
CREATE TABLE IF NOT EXISTS store_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES store_categories(id) ON DELETE SET NULL,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  long_description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  compare_at_price DECIMAL(10, 2),
  currency VARCHAR(3) DEFAULT 'USD',
  sku VARCHAR(100) UNIQUE,
  inventory_quantity INTEGER DEFAULT 0,
  is_digital BOOLEAN DEFAULT false,
  digital_download_url TEXT,
  image_url TEXT,
  images JSONB DEFAULT '[]'::jsonb,
  features JSONB DEFAULT '[]'::jsonb,
  specifications JSONB DEFAULT '{}'::jsonb,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  seller_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shopping cart items
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES store_products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Store orders
CREATE TABLE IF NOT EXISTS store_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  items JSONB NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) DEFAULT 0,
  shipping DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  payment_status VARCHAR(50) DEFAULT 'pending',
  fulfillment_status VARCHAR(50) DEFAULT 'unfulfilled',
  shipping_address JSONB,
  billing_address JSONB,
  tracking_number VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product reviews
CREATE TABLE IF NOT EXISTS product_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES store_products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  helpful_count INTEGER DEFAULT 0,
  verified_purchase BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(product_id, user_id)
);

-- Seller profiles for marketplace
CREATE TABLE IF NOT EXISTS seller_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  shop_name VARCHAR(200) NOT NULL,
  shop_description TEXT,
  shop_logo_url TEXT,
  is_verified BOOLEAN DEFAULT false,
  total_sales INTEGER DEFAULT 0,
  average_rating DECIMAL(3, 2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE store_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE seller_profiles ENABLE ROW LEVEL SECURITY;

-- Public can view active categories and products
CREATE POLICY "Public can view active categories" ON store_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view active products" ON store_products FOR SELECT USING (is_active = true);

-- Users can manage their own cart
CREATE POLICY "Users can view own cart" ON cart_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own cart items" ON cart_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cart" ON cart_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own cart items" ON cart_items FOR DELETE USING (auth.uid() = user_id);

-- Users can view their own orders
CREATE POLICY "Users can view own orders" ON store_orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own orders" ON store_orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can manage their own reviews
CREATE POLICY "Public can view product reviews" ON product_reviews FOR SELECT USING (true);
CREATE POLICY "Users can create reviews" ON product_reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews" ON product_reviews FOR UPDATE USING (auth.uid() = user_id);

-- Seller profile policies
CREATE POLICY "Public can view seller profiles" ON seller_profiles FOR SELECT USING (true);
CREATE POLICY "Users can create own seller profile" ON seller_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own seller profile" ON seller_profiles FOR UPDATE USING (auth.uid() = user_id);

-- Insert default categories
INSERT INTO store_categories (name, description, icon, sort_order) VALUES
('Smart Controllers', 'WiFi-enabled irrigation controllers and timers', 'Cpu', 1),
('Drip Systems', 'Drip irrigation kits and components', 'Droplets', 2),
('Sprinkler Parts', 'Heads, valves, and sprinkler components', 'Sprout', 3),
('Digital Plans', 'Professional irrigation design templates', 'FileText', 4),
('Tools & Equipment', 'Professional irrigation installation tools', 'Wrench', 5),
('Books & Courses', 'Educational materials and training', 'BookOpen', 6)
ON CONFLICT DO NOTHING;

-- Insert sample products
INSERT INTO store_products (category_id, name, description, long_description, price, compare_at_price, sku, inventory_quantity, is_featured, features, image_url) VALUES
(
  (SELECT id FROM store_categories WHERE name = 'Smart Controllers' LIMIT 1),
  'Rachio 3 Smart Sprinkler Controller',
  '8-Zone WiFi irrigation controller with weather intelligence',
  'Transform your irrigation system with smart technology. The Rachio 3 automatically adjusts watering based on weather, soil type, and plant needs. Save up to 50% on water bills while keeping your landscape healthy.',
  229.99,
  279.99,
  'RAC-8ZULW',
  25,
  true,
  '["WiFi enabled", "Weather intelligence", "8 zones", "Easy installation", "Mobile app control", "Alexa compatible"]'::jsonb,
  '/placeholder.svg?height=400&width=400'
),
(
  (SELECT id FROM store_categories WHERE name = 'Digital Plans' LIMIT 1),
  'Residential Irrigation Design Template Bundle',
  'Complete CAD templates for residential irrigation projects',
  'Professional-grade irrigation design templates used by contractors nationwide. Includes residential layouts, commercial designs, and drip system plans. Editable CAD files compatible with AutoCAD and DraftSight.',
  89.00,
  149.00,
  'DIG-PLAN-RES-01',
  999,
  true,
  '["CAD templates", "Residential designs", "Commercial layouts", "Drip system plans", "Instant download", "Lifetime updates"]'::jsonb,
  '/placeholder.svg?height=400&width=400'
),
(
  (SELECT id FROM store_categories WHERE name = 'Drip Systems' LIMIT 1),
  'Professional Drip Irrigation Starter Kit',
  'Complete drip system for up to 250 sq ft garden beds',
  'Everything you need to install a professional drip irrigation system. Includes mainline tubing, emitters, stakes, connectors, and pressure regulator. Perfect for garden beds, raised beds, and landscaping.',
  149.00,
  199.00,
  'DRIP-KIT-PRO-250',
  50,
  true,
  '["250 sq ft coverage", "Pressure regulator included", "100 drip emitters", "Professional grade", "Easy installation", "5-year warranty"]'::jsonb,
  '/placeholder.svg?height=400&width=400'
)
ON CONFLICT DO NOTHING;

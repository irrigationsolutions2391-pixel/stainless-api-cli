-- Seed some sample jobs for demo purposes
-- NOTE: Run this after you have at least one user signed up, or these jobs won't have valid employer_ids
-- For demo purposes, we'll create jobs that reference the auth.users table properly

-- First, let's create a demo employer user if it doesn't exist
-- This will be handled by your app's sign-up flow in production

-- Fixed seed data to work without violating foreign key constraints
-- Instead of hardcoded UUIDs, we'll insert jobs only after checking for existing users

DO $$
DECLARE
  demo_employer_id UUID;
BEGIN
  -- Try to get the first user from auth.users to use as demo employer
  SELECT id INTO demo_employer_id FROM auth.users LIMIT 1;
  
  -- Only insert demo jobs if we have at least one user
  IF demo_employer_id IS NOT NULL THEN
    INSERT INTO public.jobs (employer_id, title, description, location, budget, duration, category, skills_required, status)
    VALUES
      (demo_employer_id, 'Install Drip Irrigation System', 'Need experienced irrigation professional to install a drip irrigation system for a 2-acre residential property. Must have experience with modern drip systems and water efficiency.', 'Phoenix, AZ', 1500.00, '3 days', 'Installation', ARRAY['Drip Systems', 'Residential', 'Water Efficiency'], 'open'),
      (demo_employer_id, 'Repair Sprinkler System', 'Commercial property needs sprinkler system repairs. Several broken heads and control valve issues.', 'San Diego, CA', 800.00, '1 day', 'Repair', ARRAY['Sprinkler Systems', 'Commercial', 'Repairs'], 'open'),
      (demo_employer_id, 'Smart Controller Installation', 'Replace old timers with WiFi-enabled smart irrigation controllers across 5 zones.', 'Austin, TX', 600.00, '1 day', 'Installation', ARRAY['Smart Controllers', 'WiFi', 'Residential'], 'open'),
      (demo_employer_id, 'Large Scale Agricultural Irrigation', 'Design and install irrigation system for 50-acre farm. Experience with pivot systems required.', 'Fresno, CA', 15000.00, '2 weeks', 'Installation', ARRAY['Agricultural', 'Pivot Systems', 'Large Scale'], 'open'),
      (demo_employer_id, 'Irrigation Maintenance Contract', 'Monthly maintenance for HOA community. 20 properties, quarterly inspections and repairs.', 'Las Vegas, NV', 3000.00, 'Ongoing', 'Maintenance', ARRAY['Residential', 'Maintenance', 'HOA'], 'open'),
      (demo_employer_id, 'Landscape Irrigation Design', 'Need irrigation design for new landscape project. Must integrate with existing system.', 'Denver, CO', 1200.00, '2 days', 'Design', ARRAY['Design', 'Landscape', 'Integration'], 'open')
    ON CONFLICT DO NOTHING;
    
    RAISE NOTICE 'Demo jobs created successfully with employer_id: %', demo_employer_id;
  ELSE
    RAISE NOTICE 'No users found in auth.users. Please sign up first, then run this script again to create demo jobs.';
  END IF;
END $$;

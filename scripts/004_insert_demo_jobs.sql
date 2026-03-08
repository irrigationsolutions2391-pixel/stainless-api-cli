-- Alternative approach: This script can be run manually after signing up
-- It will create demo jobs using your actual user ID

-- Instructions:
-- 1. Sign up for an account at /auth/sign-up
-- 2. Run this script to create demo jobs linked to your account
-- 3. Your user ID will be automatically used as the employer

DO $$
DECLARE
  demo_employer_id UUID;
BEGIN
  -- Get the most recently created user (likely you after signing up)
  SELECT id INTO demo_employer_id 
  FROM auth.users 
  ORDER BY created_at DESC 
  LIMIT 1;
  
  IF demo_employer_id IS NOT NULL THEN
    -- Delete any existing demo jobs first (optional, for clean slate)
    DELETE FROM public.jobs WHERE employer_id = demo_employer_id;
    
    -- Insert fresh demo jobs
    INSERT INTO public.jobs (employer_id, title, description, location, budget, duration, category, skills_required, status)
    VALUES
      (demo_employer_id, 'Install Drip Irrigation System', 'Need experienced irrigation professional to install a drip irrigation system for a 2-acre residential property. Must have experience with modern drip systems and water efficiency. Perfect for pros looking for steady residential work.', 'Phoenix, AZ', 1500.00, '3 days', 'Installation', ARRAY['Drip Systems', 'Residential', 'Water Efficiency'], 'open'),
      (demo_employer_id, 'Repair Sprinkler System', 'Commercial property needs sprinkler system repairs. Several broken heads and control valve issues. Quick turnaround needed. All parts will be provided.', 'San Diego, CA', 800.00, '1 day', 'Repair', ARRAY['Sprinkler Systems', 'Commercial', 'Repairs'], 'open'),
      (demo_employer_id, 'Smart Controller Installation', 'Replace old timers with WiFi-enabled smart irrigation controllers across 5 zones. Rachio controllers will be provided. Must be familiar with WiFi setup and zone configuration.', 'Austin, TX', 600.00, '1 day', 'Installation', ARRAY['Smart Controllers', 'WiFi', 'Residential'], 'open'),
      (demo_employer_id, 'Large Scale Agricultural Irrigation', 'Design and install irrigation system for 50-acre farm. Experience with pivot systems required. This is a premium job with potential for ongoing maintenance contract.', 'Fresno, CA', 15000.00, '2 weeks', 'Installation', ARRAY['Agricultural', 'Pivot Systems', 'Large Scale'], 'open'),
      (demo_employer_id, 'Irrigation Maintenance Contract', 'Monthly maintenance for HOA community. 20 properties, quarterly inspections and repairs. Looking for long-term partnership with reliable professional.', 'Las Vegas, NV', 3000.00, 'Ongoing', 'Maintenance', ARRAY['Residential', 'Maintenance', 'HOA'], 'open'),
      (demo_employer_id, 'Landscape Irrigation Design', 'Need irrigation design for new landscape project. Must integrate with existing system. CAD drawings required for final deliverable.', 'Denver, CO', 1200.00, '2 days', 'Design', ARRAY['Design', 'Landscape', 'Integration'], 'open'),
      (demo_employer_id, 'Golf Course Irrigation Upgrade', 'Upgrade 18-hole golf course irrigation system. Must have experience with commercial-grade pumps and controllers. Premium project with excellent pay.', 'Scottsdale, AZ', 25000.00, '3 weeks', 'Installation', ARRAY['Commercial', 'Golf Course', 'Large Scale'], 'open'),
      (demo_employer_id, 'Backyard Sprinkler Install', 'Small residential backyard needs new sprinkler system installed. About 1000 sq ft. Perfect for quick job between larger projects.', 'Portland, OR', 450.00, '4 hours', 'Installation', ARRAY['Residential', 'Sprinkler Systems', 'Small Jobs'], 'open');
    
    RAISE NOTICE 'Successfully created 8 demo jobs with your user ID: %', demo_employer_id;
  ELSE
    RAISE NOTICE 'Error: No users found. Please sign up first at /auth/sign-up';
  END IF;
END $$;

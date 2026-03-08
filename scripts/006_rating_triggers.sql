-- Function to update profile rating when new rating is added
CREATE OR REPLACE FUNCTION update_profile_rating()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the to_user's average rating and total ratings
  UPDATE public.profiles
  SET 
    average_rating = (
      SELECT ROUND(AVG(rating)::numeric, 2)
      FROM public.ratings
      WHERE to_user_id = NEW.to_user_id
    ),
    total_ratings = (
      SELECT COUNT(*)
      FROM public.ratings
      WHERE to_user_id = NEW.to_user_id
    )
  WHERE id = NEW.to_user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update ratings automatically
DROP TRIGGER IF EXISTS trigger_update_profile_rating ON public.ratings;
CREATE TRIGGER trigger_update_profile_rating
  AFTER INSERT OR UPDATE ON public.ratings
  FOR EACH ROW
  EXECUTE FUNCTION update_profile_rating();

-- Function to update completed jobs count
CREATE OR REPLACE FUNCTION update_completed_jobs()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    -- Update employer's completed jobs
    UPDATE public.profiles
    SET completed_jobs = completed_jobs + 1
    WHERE id = NEW.employer_id;
    
    -- Update worker's completed jobs if there's an accepted application
    UPDATE public.profiles
    SET completed_jobs = completed_jobs + 1
    WHERE id IN (
      SELECT worker_id FROM public.applications
      WHERE job_id = NEW.id AND status = 'accepted'
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update completed jobs
DROP TRIGGER IF EXISTS trigger_update_completed_jobs ON public.jobs;
CREATE TRIGGER trigger_update_completed_jobs
  AFTER UPDATE ON public.jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_completed_jobs();

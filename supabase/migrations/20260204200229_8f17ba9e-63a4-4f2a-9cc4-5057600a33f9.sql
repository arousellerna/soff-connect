-- Fix the handle_new_user trigger - remove email column (doesn't exist) and use user_id correctly
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, user_id, company_name, onboarding_status)
  VALUES (
    new.id,
    new.id,
    COALESCE(new.raw_user_meta_data->>'company_name', ''),
    'new'
  );
  RETURN new;
END;
$$;

-- Ensure the trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
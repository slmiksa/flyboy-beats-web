-- Fix search_path issues for password functions
CREATE OR REPLACE FUNCTION public.hash_password(password text)
RETURNS text AS $$
BEGIN
  RETURN crypt(password, gen_salt('bf'));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.verify_password(password text, hash text)
RETURNS boolean AS $$
BEGIN
  RETURN crypt(password, hash) = hash;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create admin authentication function for RLS policies
CREATE OR REPLACE FUNCTION public.is_admin_authenticated()
RETURNS boolean AS $$
BEGIN
  RETURN current_setting('app.admin_username', true) IS NOT NULL AND 
         current_setting('app.admin_username', true) != '';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create super admin check function
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE username = current_setting('app.admin_username', true) 
    AND is_super_admin = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create RLS policies for admin_users (restrict access completely by default)
CREATE POLICY "Admin users require authentication" 
ON public.admin_users 
FOR ALL 
USING (false) 
WITH CHECK (false);
-- Enable RLS on all public tables to fix security vulnerabilities
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create secure policies for admin_users table
-- Only super admins can view/manage admin users
CREATE POLICY "Super admins can view admin users" 
ON public.admin_users 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users a 
    WHERE a.username = current_setting('app.admin_username', true) 
    AND a.is_super_admin = true
  )
);

CREATE POLICY "Super admins can manage admin users" 
ON public.admin_users 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users a 
    WHERE a.username = current_setting('app.admin_username', true) 
    AND a.is_super_admin = true
  )
);

-- Create policies for other tables (admin access only)
CREATE POLICY "Admin access only" ON public.partners FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.admin_users a 
    WHERE a.username = current_setting('app.admin_username', true)
  )
);

CREATE POLICY "Admin access only" ON public.about_section FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.admin_users a 
    WHERE a.username = current_setting('app.admin_username', true)
  )
);

CREATE POLICY "Admin access only" ON public.slides FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.admin_users a 
    WHERE a.username = current_setting('app.admin_username', true)
  )
);

CREATE POLICY "Admin access only" ON public.events FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.admin_users a 
    WHERE a.username = current_setting('app.admin_username', true)
  )
);

CREATE POLICY "Admin access only" ON public.site_settings FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.admin_users a 
    WHERE a.username = current_setting('app.admin_username', true)
  )
);

-- Allow public read access for public-facing data
CREATE POLICY "Public read access" ON public.partners FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.about_section FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.slides FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.events FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.site_settings FOR SELECT USING (true);

-- Create password hashing function
CREATE OR REPLACE FUNCTION public.hash_password(password text)
RETURNS text AS $$
BEGIN
  RETURN crypt(password, gen_salt('bf'));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create password verification function
CREATE OR REPLACE FUNCTION public.verify_password(password text, hash text)
RETURNS boolean AS $$
BEGIN
  RETURN crypt(password, hash) = hash;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Hash existing passwords
UPDATE public.admin_users 
SET password = public.hash_password(password) 
WHERE password IS NOT NULL AND length(password) < 60;
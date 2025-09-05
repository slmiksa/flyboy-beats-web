-- Enable RLS on admin_users table first
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

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
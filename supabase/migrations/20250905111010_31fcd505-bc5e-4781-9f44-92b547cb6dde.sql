-- Fix infinite recursion issue in RLS policies

-- First, drop the problematic admin_users policies that are causing circular dependencies
DROP POLICY IF EXISTS "Admin users require authentication" ON public.admin_users;
DROP POLICY IF EXISTS "Super admins can manage admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Super admins can view admin users" ON public.admin_users;

-- Create a more permissive policy for admin_users that doesn't create circular dependencies
-- This allows the system to check admin status without infinite recursion
CREATE POLICY "Allow system admin checks" 
ON public.admin_users 
FOR SELECT 
USING (true);

-- Only super admins can modify admin users (but reading is allowed for system checks)
CREATE POLICY "Super admins can manage admin users" 
ON public.admin_users 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users a 
    WHERE a.username = current_setting('app.admin_username', true) 
    AND a.is_super_admin = true
  )
) 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users a 
    WHERE a.username = current_setting('app.admin_username', true) 
    AND a.is_super_admin = true
  )
);
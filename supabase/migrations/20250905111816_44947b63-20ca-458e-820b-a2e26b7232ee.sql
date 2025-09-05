-- Update flyboy user password to Ksa@123456
UPDATE admin_users 
SET password = public.hash_password('Ksa@123456')
WHERE username = 'flyboy';
-- Drop and recreate the pgcrypto extension to ensure it's properly installed
DROP EXTENSION IF EXISTS pgcrypto CASCADE;
CREATE EXTENSION pgcrypto;

-- Test that crypt function is now available by updating the password again
UPDATE admin_users 
SET password = crypt('Ksa@123456', gen_salt('bf'))
WHERE username = 'flyboy';

-- Verify the functions are working
SELECT crypt('test', gen_salt('bf')) as test_hash;
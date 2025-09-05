-- Ensure pgcrypto extension is properly enabled with all functions
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;

-- Update flyboy user password to Ksa@123456 using direct crypt function
UPDATE admin_users 
SET password = crypt('Ksa@123456', gen_salt('bf'))
WHERE username = 'flyboy';
-- Enable pgcrypto extension for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Check if we need to update any existing password hashes
-- Since the crypt function wasn't working, existing passwords might not be properly hashed
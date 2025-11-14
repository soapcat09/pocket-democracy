-- Add full_name column to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS full_name TEXT;

-- Remove ID verification related columns as they're no longer needed
ALTER TABLE public.profiles DROP COLUMN IF EXISTS id_document_url;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS id_verification_data;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS id_verified;
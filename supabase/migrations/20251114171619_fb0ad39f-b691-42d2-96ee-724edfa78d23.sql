-- Create storage bucket for ID documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'id-documents',
  'id-documents',
  false,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
);

-- Create RLS policies for id-documents bucket
CREATE POLICY "Users can upload their own ID documents"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'id-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view their own ID documents"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'id-documents' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Add phone number and verification fields to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS phone_number text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS id_document_url text;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS id_verified boolean DEFAULT false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS id_verification_data jsonb;
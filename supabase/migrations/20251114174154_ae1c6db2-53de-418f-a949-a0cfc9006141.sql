-- Phone verification support
-- 1) Create phone_verifications table
CREATE TABLE IF NOT EXISTS public.phone_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  phone_number TEXT NOT NULL,
  code_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL,
  attempts INT NOT NULL DEFAULT 0,
  verified BOOLEAN NOT NULL DEFAULT false
);

ALTER TABLE public.phone_verifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own phone verifications"
ON public.phone_verifications
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own phone verifications"
ON public.phone_verifications
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own phone verifications"
ON public.phone_verifications
FOR UPDATE
USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_phone_verifications_user_created
ON public.phone_verifications (user_id, created_at);

-- 2) Add flags on profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS phone_verified BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS twofa_sms_enabled BOOLEAN NOT NULL DEFAULT false;
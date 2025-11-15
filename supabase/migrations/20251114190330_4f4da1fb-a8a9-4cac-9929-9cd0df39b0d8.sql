-- Add cnp column to profiles table with unique constraint
ALTER TABLE public.profiles 
ADD COLUMN cnp text;

-- Add unique constraint on cnp
ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_cnp_unique UNIQUE (cnp);

-- Add unique constraint on user_id to ensure one profile per user
ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_user_id_unique UNIQUE (user_id);
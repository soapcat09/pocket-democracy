-- Add budget column to initiatives table
ALTER TABLE public.initiatives 
ADD COLUMN budget DECIMAL(15,2);

-- Add comment for clarity
COMMENT ON COLUMN public.initiatives.budget IS 'Budget allocated for the initiative in RON';
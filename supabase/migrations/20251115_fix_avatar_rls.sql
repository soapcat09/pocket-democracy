-- Allow users to update their own profile avatar_url
CREATE POLICY "Users can update their own avatar"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

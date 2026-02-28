-- Drop existing RESTRICTIVE policies
DROP POLICY IF EXISTS "Users can delete their own progress" ON public.topic_progress;
DROP POLICY IF EXISTS "Users can insert their own progress" ON public.topic_progress;
DROP POLICY IF EXISTS "Users can update their own progress" ON public.topic_progress;
DROP POLICY IF EXISTS "Users can view their own progress" ON public.topic_progress;

-- Recreate as PERMISSIVE policies
CREATE POLICY "Users can view their own progress" ON public.topic_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own progress" ON public.topic_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress" ON public.topic_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own progress" ON public.topic_progress FOR DELETE USING (auth.uid() = user_id);
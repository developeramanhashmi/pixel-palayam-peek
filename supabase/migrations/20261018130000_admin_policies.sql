-- Allow reading enquiries for admin dashboard
CREATE POLICY "Allow read enquiries" ON public.enquiries
FOR SELECT TO anon, authenticated
USING (true);

-- Allow updating enquiry status (Confirmed, Cancelled)
CREATE POLICY "Allow update enquiries" ON public.enquiries
FOR UPDATE TO anon, authenticated
USING (true)
WITH CHECK (true);

-- Allow status to have values like 'CONFIRMED', 'CANCELLED', 'CONTACTED'
ALTER TABLE public.enquiries DROP CONSTRAINT IF EXISTS enquiries_status_check;
ALTER TABLE public.enquiries ADD CONSTRAINT enquiries_status_check
CHECK (status IN ('NEW', 'CONFIRMED', 'CANCELLED', 'CONTACTED'));

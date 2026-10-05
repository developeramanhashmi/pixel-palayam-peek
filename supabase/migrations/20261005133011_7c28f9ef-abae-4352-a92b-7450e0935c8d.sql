CREATE TABLE public.enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name TEXT NOT NULL CHECK (char_length(btrim(guest_name)) BETWEEN 1 AND 100),
  address TEXT NOT NULL CHECK (char_length(btrim(address)) BETWEEN 1 AND 500),
  contact_number TEXT NOT NULL CHECK (contact_number ~ '^\+?[0-9][0-9 -]{8,14}$'),
  room_type TEXT NOT NULL CHECK (room_type IN ('AC', 'NON_AC')),
  number_of_rooms INTEGER NOT NULL CHECK (number_of_rooms BETWEEN 1 AND 50),
  total_guests INTEGER NOT NULL CHECK (total_guests BETWEEN 1 AND 500),
  additional_requirements TEXT CHECK (additional_requirements IS NULL OR char_length(additional_requirements) <= 2000),
  status TEXT NOT NULL DEFAULT 'NEW' CHECK (status = 'NEW'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.enquiries TO anon, authenticated;
GRANT ALL ON public.enquiries TO service_role;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Guests may submit enquiries" ON public.enquiries FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE OR REPLACE FUNCTION public.set_enquiries_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
CREATE TRIGGER set_enquiries_updated_at
BEFORE UPDATE ON public.enquiries
FOR EACH ROW EXECUTE FUNCTION public.set_enquiries_updated_at();
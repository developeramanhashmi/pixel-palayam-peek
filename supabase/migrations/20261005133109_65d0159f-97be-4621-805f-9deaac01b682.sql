CREATE OR REPLACE FUNCTION public.set_enquiry_defaults()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.status = 'NEW';
  NEW.created_at = now();
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;
CREATE TRIGGER set_enquiry_defaults_before_insert
BEFORE INSERT ON public.enquiries
FOR EACH ROW EXECUTE FUNCTION public.set_enquiry_defaults();
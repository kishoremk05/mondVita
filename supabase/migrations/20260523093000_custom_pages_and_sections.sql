-- Create custom_pages table
CREATE TABLE IF NOT EXISTS public.custom_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  banner_image text,
  translations jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS for custom_pages
ALTER TABLE public.custom_pages ENABLE ROW LEVEL SECURITY;

-- Public read access policy
CREATE POLICY "Public read custom_pages" ON public.custom_pages
  FOR SELECT USING (true);

-- Admin write access policy
CREATE POLICY "Admin write custom_pages" ON public.custom_pages
  FOR ALL TO authenticated USING (public.has_role('admin')) WITH CHECK (public.has_role('admin'));

-- Trigger to update updated_at on update
CREATE TRIGGER trg_custom_pages_updated BEFORE UPDATE ON public.custom_pages
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Create custom_sections table
CREATE TABLE IF NOT EXISTS public.custom_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id uuid NOT NULL REFERENCES public.custom_pages(id) ON DELETE CASCADE,
  image_url text,
  layout text NOT NULL DEFAULT 'text-left',
  sort_order int NOT NULL DEFAULT 0,
  translations jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS for custom_sections
ALTER TABLE public.custom_sections ENABLE ROW LEVEL SECURITY;

-- Public read access policy
CREATE POLICY "Public read custom_sections" ON public.custom_sections
  FOR SELECT USING (true);

-- Admin write access policy
CREATE POLICY "Admin write custom_sections" ON public.custom_sections
  FOR ALL TO authenticated USING (public.has_role('admin')) WITH CHECK (public.has_role('admin'));

-- Trigger to update updated_at on update
CREATE TRIGGER trg_custom_sections_updated BEFORE UPDATE ON public.custom_sections
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

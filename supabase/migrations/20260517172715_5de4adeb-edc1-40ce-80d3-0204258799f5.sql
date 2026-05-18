
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP TABLE IF EXISTS public.draft_media CASCADE;
DROP TABLE IF EXISTS public.drafts CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.rate_limits CASCADE;

INSERT INTO storage.buckets (id, name, public)
VALUES ('clinic-media','clinic-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TABLE public.site_content (
  key text NOT NULL,
  locale text NOT NULL CHECK (locale IN ('nl','en','ar')),
  value text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (key, locale)
);
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read site_content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Admin write site_content" ON public.site_content
  FOR ALL TO authenticated USING (public.has_role('admin')) WITH CHECK (public.has_role('admin'));
CREATE TRIGGER trg_site_content_updated BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  icon text NOT NULL DEFAULT 'Stethoscope',
  sort_order int NOT NULL DEFAULT 0,
  translations jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Admin write services" ON public.services
  FOR ALL TO authenticated USING (public.has_role('admin')) WITH CHECK (public.has_role('admin'));
CREATE TRIGGER trg_services_updated BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path text NOT NULL,
  alt text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read gallery" ON public.gallery_images FOR SELECT USING (true);
CREATE POLICY "Admin write gallery" ON public.gallery_images
  FOR ALL TO authenticated USING (public.has_role('admin')) WITH CHECK (public.has_role('admin'));

CREATE TABLE public.contact_info (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  address text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  hours jsonb NOT NULL DEFAULT '{}'::jsonb,
  map_embed text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read contact" ON public.contact_info FOR SELECT USING (true);
CREATE POLICY "Admin write contact" ON public.contact_info
  FOR ALL TO authenticated USING (public.has_role('admin')) WITH CHECK (public.has_role('admin'));
CREATE TRIGGER trg_contact_updated BEFORE UPDATE ON public.contact_info
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "Public read clinic media" ON storage.objects
  FOR SELECT USING (bucket_id = 'clinic-media');
CREATE POLICY "Admin write clinic media" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'clinic-media' AND public.has_role('admin'));
CREATE POLICY "Admin update clinic media" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'clinic-media' AND public.has_role('admin'));
CREATE POLICY "Admin delete clinic media" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'clinic-media' AND public.has_role('admin'));

INSERT INTO public.contact_info (id, address, phone, email, hours, map_embed) VALUES (
  1,
  'Voorbeeldstraat 1, 1011 AA Amsterdam',
  '+31 20 123 4567',
  'info@mondvita.nl',
  '{"mon_fri":"08:00 - 18:00","sat":"09:00 - 14:00","sun":"Gesloten"}'::jsonb,
  ''
);

INSERT INTO public.site_content (key, locale, value) VALUES
  ('clinic.name','nl','MondVita'),('clinic.name','en','MondVita'),('clinic.name','ar','موندفيتا'),
  ('hero.tagline','nl','Premium tandheelkunde met persoonlijke zorg'),
  ('hero.tagline','en','Premium dentistry with personalised care'),
  ('hero.tagline','ar','طب أسنان متميز برعاية شخصية'),
  ('hero.subtitle','nl','Moderne behandelingen in een rustige, luxueuze omgeving in het hart van Amsterdam.'),
  ('hero.subtitle','en','Modern treatments in a calm, luxurious setting in the heart of Amsterdam.'),
  ('hero.subtitle','ar','علاجات حديثة في بيئة هادئة وفاخرة في قلب أمستردام.'),
  ('hero.cta_primary','nl','Afspraak Maken'),('hero.cta_primary','en','Book Appointment'),('hero.cta_primary','ar','احجز موعد'),
  ('hero.cta_secondary','nl','Onze Diensten'),('hero.cta_secondary','en','Our Services'),('hero.cta_secondary','ar','خدماتنا'),
  ('about.title','nl','Over MondVita'),('about.title','en','About MondVita'),('about.title','ar','عن موندفيتا'),
  ('about.body','nl','Bij MondVita combineren we vakmanschap met een warme, persoonlijke benadering. Ons ervaren team zorgt voor uw glimlach in een sfeer waar u zich direct thuis voelt.'),
  ('about.body','en','At MondVita we combine craftsmanship with a warm, personal approach. Our experienced team cares for your smile in an atmosphere where you instantly feel at home.'),
  ('about.body','ar','في موندفيتا نجمع بين الحرفية والنهج الشخصي الدافئ. يعتني فريقنا ذو الخبرة بابتسامتك في أجواء تشعر فيها بالراحة فوراً.');

INSERT INTO public.services (icon, sort_order, translations) VALUES
  ('Sparkles', 1, '{"nl":{"title":"Esthetische Tandheelkunde","desc":"Witter, mooier en natuurlijk ogend gebit."},"en":{"title":"Cosmetic Dentistry","desc":"Whiter, brighter, naturally beautiful smiles."},"ar":{"title":"طب الأسنان التجميلي","desc":"ابتسامة أكثر إشراقاً وجمالاً طبيعياً."}}'::jsonb),
  ('Stethoscope', 2, '{"nl":{"title":"Algemene Tandheelkunde","desc":"Periodieke controles en preventieve zorg."},"en":{"title":"General Dentistry","desc":"Regular check-ups and preventive care."},"ar":{"title":"طب الأسنان العام","desc":"فحوصات منتظمة ورعاية وقائية."}}'::jsonb),
  ('Smile', 3, '{"nl":{"title":"Orthodontie","desc":"Onzichtbare beugels en moderne aligners."},"en":{"title":"Orthodontics","desc":"Invisible braces and modern aligners."},"ar":{"title":"تقويم الأسنان","desc":"تقويمات شفافة ومصففات حديثة."}}'::jsonb),
  ('Shield', 4, '{"nl":{"title":"Implantologie","desc":"Duurzame implantaten van topkwaliteit."},"en":{"title":"Implantology","desc":"Premium, long-lasting dental implants."},"ar":{"title":"زراعة الأسنان","desc":"زراعات متينة عالية الجودة."}}'::jsonb),
  ('Heart', 5, '{"nl":{"title":"Kindertandheelkunde","desc":"Vriendelijke zorg speciaal voor kinderen."},"en":{"title":"Children Dentistry","desc":"Friendly care designed for children."},"ar":{"title":"طب أسنان الأطفال","desc":"رعاية ودودة مصممة للأطفال."}}'::jsonb),
  ('Zap', 6, '{"nl":{"title":"Spoedhulp","desc":"Snelle hulp bij acute klachten."},"en":{"title":"Emergency Care","desc":"Fast help for urgent dental issues."},"ar":{"title":"حالات الطوارئ","desc":"مساعدة سريعة للحالات العاجلة."}}'::jsonb);

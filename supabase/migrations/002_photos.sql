-- ==============================
-- photos table
-- ==============================
CREATE TABLE public.photos (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT,

  -- Supabase Storage object path in the public 'photos' bucket
  storage_path  TEXT NOT NULL,
  -- Public URL (cached for convenience)
  image_url     TEXT NOT NULL,

  -- Display metadata
  hall_tag      TEXT,  -- e.g. 'Sabbi Hall', 'Rabbi Hall'
  event_tag     TEXT,  -- e.g. 'Wedding', 'Mehndi', 'Corporate'

  -- Ordering and visibility
  sort_order    INTEGER NOT NULL DEFAULT 0,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,

  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for the public gallery query
CREATE INDEX photos_active_sort ON public.photos (is_active, sort_order ASC);

-- Auto-update updated_at (reuses handle_updated_at from 001)
CREATE TRIGGER set_photos_updated_at
  BEFORE UPDATE ON public.photos
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==============================
-- Row Level Security
-- ==============================
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;

-- Public: read active photos (for the gallery)
CREATE POLICY "Public can read active photos"
  ON public.photos FOR SELECT
  TO anon, authenticated
  USING (is_active = TRUE);

-- Admins: read ALL photos including inactive
CREATE POLICY "Admins can read all photos"
  ON public.photos FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid())
  );

-- Admins: insert
CREATE POLICY "Admins can insert photos"
  ON public.photos FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid())
  );

-- Admins: update
CREATE POLICY "Admins can update photos"
  ON public.photos FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid())
  );

-- Admins: delete
CREATE POLICY "Admins can delete photos"
  ON public.photos FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid())
  );

-- ==============================
-- Storage bucket: 'photos' (PUBLIC)
-- Create the bucket via the Supabase Dashboard (Public = ON, 10 MB limit,
-- image/jpeg, image/png, image/webp), then run these in the SQL editor:
-- ==============================

-- INSERT: only admins can upload to 'photos' bucket
-- CREATE POLICY "Admins can upload photos" ON storage.objects FOR INSERT TO authenticated
--   WITH CHECK (bucket_id = 'photos' AND EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid()));

-- DELETE: only admins can delete from 'photos' bucket
-- CREATE POLICY "Admins can delete photos" ON storage.objects FOR DELETE TO authenticated
--   USING (bucket_id = 'photos' AND EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid()));

-- SELECT is public (bucket is public) — no policy needed.

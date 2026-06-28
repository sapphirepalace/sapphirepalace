-- ==============================
-- videos table
-- ==============================
CREATE TABLE public.videos (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  description   TEXT,

  -- 'youtube' | 'vimeo' | 'upload'
  source_type   TEXT NOT NULL CHECK (source_type IN ('youtube', 'vimeo', 'upload')),

  -- Embed types: full watch URL
  embed_url     TEXT,

  -- Upload type: Supabase Storage object path (NOT the public URL)
  storage_path  TEXT,

  -- Thumbnail: either an external URL (oEmbed) or a storage path
  thumbnail_url  TEXT,
  thumbnail_type TEXT NOT NULL DEFAULT 'external' CHECK (thumbnail_type IN ('external', 'storage')),

  -- Display metadata
  hall_tag      TEXT,  -- e.g. 'Sabbi Hall', 'Rabbi Hall'
  event_tag     TEXT,  -- e.g. 'Wedding', 'Mehndi', 'Corporate'
  duration_sec  INTEGER,

  -- Ordering and visibility
  sort_order    INTEGER NOT NULL DEFAULT 0,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,

  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for the public gallery query
CREATE INDEX videos_active_sort ON public.videos (is_active, sort_order ASC);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_videos_updated_at
  BEFORE UPDATE ON public.videos
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==============================
-- admin_profiles table
-- ==============================
CREATE TABLE public.admin_profiles (
  id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role       TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================
-- Row Level Security
-- ==============================
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Public: read active videos (for the gallery)
CREATE POLICY "Public can read active videos"
  ON public.videos FOR SELECT
  TO anon, authenticated
  USING (is_active = TRUE);

-- Admins: read ALL videos including inactive
CREATE POLICY "Admins can read all videos"
  ON public.videos FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid())
  );

-- Admins: insert
CREATE POLICY "Admins can insert videos"
  ON public.videos FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid())
  );

-- Admins: update
CREATE POLICY "Admins can update videos"
  ON public.videos FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid())
  );

-- Admins: delete
CREATE POLICY "Admins can delete videos"
  ON public.videos FOR DELETE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid())
  );

-- admin_profiles: users read own row only
CREATE POLICY "Users can read own profile"
  ON public.admin_profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- ==============================
-- Storage bucket SQL policies
-- (Run these in the Supabase SQL editor after creating the buckets via the Dashboard)
-- ==============================

-- INSERT: only admins can upload to 'videos' bucket
-- CREATE POLICY "Admins can upload videos" ON storage.objects FOR INSERT TO authenticated
--   WITH CHECK (bucket_id = 'videos' AND EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid()));

-- SELECT: admins can read from 'videos' bucket (private bucket, signed URLs for guests)
-- CREATE POLICY "Admins can read videos" ON storage.objects FOR SELECT TO authenticated
--   USING (bucket_id = 'videos' AND EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid()));

-- DELETE: admins can delete from 'videos' bucket
-- CREATE POLICY "Admins can delete videos" ON storage.objects FOR DELETE TO authenticated
--   USING (bucket_id = 'videos' AND EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid()));

-- 'thumbnails' bucket is PUBLIC — no SQL policy needed for SELECT
-- INSERT: admins only
-- CREATE POLICY "Admins can manage thumbnails" ON storage.objects FOR INSERT TO authenticated
--   WITH CHECK (bucket_id = 'thumbnails' AND EXISTS (SELECT 1 FROM public.admin_profiles WHERE id = auth.uid()));

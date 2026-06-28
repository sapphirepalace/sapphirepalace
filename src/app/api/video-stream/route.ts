import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path')

  if (!path) {
    return NextResponse.json({ error: 'Missing path parameter' }, { status: 400 })
  }

  const supabase = await createClient()

  const { data, error } = await supabase.storage
    .from('videos')
    .createSignedUrl(path, 3600) // signed URL valid for 1 hour

  if (error || !data?.signedUrl) {
    return NextResponse.json({ error: 'Video not found' }, { status: 404 })
  }

  // Redirect browser directly to Supabase CDN — no proxying through Next.js
  return NextResponse.redirect(data.signedUrl)
}

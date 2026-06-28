import { NextRequest, NextResponse } from 'next/server'
import { fetchOEmbed } from '@/lib/utils/oembed'

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')
  if (!url) return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 })

  const info = await fetchOEmbed(url)
  if (!info) {
    return NextResponse.json(
      { error: 'Could not resolve oEmbed for this URL. Check that it is a valid YouTube or Vimeo link.' },
      { status: 422 },
    )
  }

  return NextResponse.json(info)
}

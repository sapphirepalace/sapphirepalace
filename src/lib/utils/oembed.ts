import type { OEmbedInfo } from '@/lib/types'

export function isYouTube(url: string) {
  return /youtube\.com|youtu\.be/.test(url)
}

export function isVimeo(url: string) {
  return /vimeo\.com/.test(url)
}

export function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:v=|\/embed\/|youtu\.be\/|\/v\/)([a-zA-Z0-9_-]{11})/)
  return match?.[1] ?? null
}

export function extractVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  return match?.[1] ?? null
}

export function getEmbedUrl(url: string): string | null {
  if (isYouTube(url)) {
    const id = extractYouTubeId(url)
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : null
  }
  if (isVimeo(url)) {
    const id = extractVimeoId(url)
    return id ? `https://player.vimeo.com/video/${id}?autoplay=1` : null
  }
  return null
}

export async function fetchOEmbed(url: string): Promise<OEmbedInfo | null> {
  if (isYouTube(url)) {
    const videoId = extractYouTubeId(url)
    if (!videoId) return null

    const res = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`,
      { next: { revalidate: 3600 } },
    )
    if (!res.ok) return null
    const data = await res.json()

    return {
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      title: data.title,
      provider: 'youtube',
      videoId,
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
    }
  }

  return null
}

export type VideoSourceType = 'youtube' | 'upload'
export type ThumbnailType = 'external' | 'storage'

export interface Video {
  id: string
  title: string
  description: string | null
  source_type: VideoSourceType
  embed_url: string | null
  storage_path: string | null
  thumbnail_url: string | null
  thumbnail_type: ThumbnailType
  hall_tag: string | null
  event_tag: string | null
  duration_sec: number | null
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Photo {
  id: string
  title: string | null
  storage_path: string
  image_url: string
  hall_tag: string | null
  event_tag: string | null
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface OEmbedInfo {
  thumbnailUrl: string
  title: string
  provider: 'youtube'
  videoId: string
  embedUrl: string
}

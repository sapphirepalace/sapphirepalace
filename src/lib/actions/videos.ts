'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { fetchOEmbed } from '@/lib/utils/oembed'

export async function createVideo(formData: FormData) {
  const supabase = await createClient()

  const source_type = formData.get('source_type') as string
  const title = formData.get('title') as string
  const description = formData.get('description') as string | null
  const hall_tag = formData.get('hall_tag') as string | null
  const event_tag = formData.get('event_tag') as string | null
  const is_active = formData.get('is_active') === 'true'
  const embed_url = formData.get('embed_url') as string | null
  const storage_path = formData.get('storage_path') as string | null
  const thumbnail_url_input = formData.get('thumbnail_url') as string | null
  const thumbnail_type_input = formData.get('thumbnail_type') as string | null

  let thumbnailUrl: string | null = thumbnail_url_input || null
  let thumbnailType: 'external' | 'storage' = (thumbnail_type_input as 'external' | 'storage') || 'external'
  let resolvedTitle = title

  if (source_type === 'youtube' && embed_url && !thumbnailUrl) {
    const oembed = await fetchOEmbed(embed_url)
    if (oembed) {
      thumbnailUrl = oembed.thumbnailUrl
      thumbnailType = 'external'
      if (!resolvedTitle) resolvedTitle = oembed.title
    }
  }

  const { data: maxRow } = await supabase
    .from('videos')
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1)
    .maybeSingle()

  const { error } = await supabase.from('videos').insert({
    title: resolvedTitle,
    description: description || null,
    source_type,
    embed_url: embed_url || null,
    storage_path: storage_path || null,
    thumbnail_url: thumbnailUrl,
    thumbnail_type: thumbnailType,
    hall_tag: hall_tag || null,
    event_tag: event_tag || null,
    is_active,
    sort_order: (maxRow?.sort_order ?? 0) + 1,
  })

  if (error) return { error: error.message }

  revalidatePath('/')
  revalidatePath('/admin/videos')
  return { success: true }
}

export async function updateVideo(id: string, formData: FormData) {
  const supabase = await createClient()

  const source_type = formData.get('source_type') as string
  const title = formData.get('title') as string
  const description = formData.get('description') as string | null
  const hall_tag = formData.get('hall_tag') as string | null
  const event_tag = formData.get('event_tag') as string | null
  const is_active = formData.get('is_active') === 'true'
  const embed_url = formData.get('embed_url') as string | null
  const storage_path = formData.get('storage_path') as string | null
  const thumbnail_url = formData.get('thumbnail_url') as string | null
  const thumbnail_type = formData.get('thumbnail_type') as 'external' | 'storage' | null

  const { error } = await supabase
    .from('videos')
    .update({
      title,
      description: description || null,
      source_type,
      embed_url: embed_url || null,
      storage_path: storage_path || null,
      thumbnail_url: thumbnail_url || null,
      thumbnail_type: thumbnail_type || 'external',
      hall_tag: hall_tag || null,
      event_tag: event_tag || null,
      is_active,
    })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/')
  revalidatePath('/admin/videos')
  return { success: true }
}

export async function deleteVideo(id: string) {
  const supabase = await createClient()

  const { data: video } = await supabase
    .from('videos')
    .select('storage_path, thumbnail_url, thumbnail_type')
    .eq('id', id)
    .single()

  if (video?.storage_path) {
    await supabase.storage.from('videos').remove([video.storage_path])
  }
  if (video?.thumbnail_type === 'storage' && video.thumbnail_url) {
    await supabase.storage.from('thumbnails').remove([video.thumbnail_url])
  }

  const { error } = await supabase.from('videos').delete().eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/')
  revalidatePath('/admin/videos')
  return { success: true }
}

export async function toggleVideoActive(id: string, is_active: boolean) {
  const supabase = await createClient()
  const { error } = await supabase.from('videos').update({ is_active }).eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/')
  revalidatePath('/admin/videos')
  return { success: true }
}

export async function reorderVideos(orderedIds: string[]) {
  const supabase = await createClient()
  await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from('videos').update({ sort_order: index }).eq('id', id),
    ),
  )

  revalidatePath('/')
  revalidatePath('/admin/videos')
  return { success: true }
}

export async function getVideoSignedUrl(storagePath: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.storage
    .from('videos')
    .createSignedUrl(storagePath, 3600)
  if (error) return { error: error.message }
  return { url: data.signedUrl }
}

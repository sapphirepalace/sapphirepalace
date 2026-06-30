'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function createPhoto(formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string | null
  const storage_path = formData.get('storage_path') as string | null
  const image_url = formData.get('image_url') as string | null
  const hall_tag = formData.get('hall_tag') as string | null
  const event_tag = formData.get('event_tag') as string | null
  const is_active = formData.get('is_active') === 'true'

  if (!storage_path || !image_url) {
    return { error: 'No image was uploaded' }
  }

  const { data: maxRow } = await supabase
    .from('photos')
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1)
    .maybeSingle()

  const { error } = await supabase.from('photos').insert({
    title: title || null,
    storage_path,
    image_url,
    hall_tag: hall_tag || null,
    event_tag: event_tag || null,
    is_active,
    sort_order: (maxRow?.sort_order ?? 0) + 1,
  })

  if (error) return { error: error.message }

  revalidatePath('/')
  revalidatePath('/admin/photos')
  return { success: true }
}

export async function updatePhoto(id: string, formData: FormData) {
  const supabase = await createClient()

  const title = formData.get('title') as string | null
  const hall_tag = formData.get('hall_tag') as string | null
  const event_tag = formData.get('event_tag') as string | null
  const is_active = formData.get('is_active') === 'true'

  const { error } = await supabase
    .from('photos')
    .update({
      title: title || null,
      hall_tag: hall_tag || null,
      event_tag: event_tag || null,
      is_active,
    })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/')
  revalidatePath('/admin/photos')
  return { success: true }
}

export async function deletePhoto(id: string) {
  const supabase = await createClient()

  const { data: photo } = await supabase
    .from('photos')
    .select('storage_path')
    .eq('id', id)
    .single()

  if (photo?.storage_path) {
    await supabase.storage.from('photos').remove([photo.storage_path])
  }

  const { error } = await supabase.from('photos').delete().eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/')
  revalidatePath('/admin/photos')
  return { success: true }
}

export async function togglePhotoActive(id: string, is_active: boolean) {
  const supabase = await createClient()
  const { error } = await supabase.from('photos').update({ is_active }).eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/')
  revalidatePath('/admin/photos')
  return { success: true }
}

export async function reorderPhotos(orderedIds: string[]) {
  const supabase = await createClient()
  await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from('photos').update({ sort_order: index }).eq('id', id),
    ),
  )

  revalidatePath('/')
  revalidatePath('/admin/photos')
  return { success: true }
}

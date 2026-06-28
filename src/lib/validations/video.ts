import { z } from 'zod'

export const videoBaseSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().max(1000).optional(),
  hall_tag: z.string().optional(),
  event_tag: z.string().optional(),
  is_active: z.boolean().default(true),
  thumbnail_url: z.string().optional(),
  thumbnail_type: z.enum(['external', 'storage']).default('external'),
})

export const youtubeVideoSchema = videoBaseSchema.extend({
  source_type: z.literal('youtube'),
  embed_url: z
    .string()
    .url('Must be a valid URL')
    .refine((u) => /youtube\.com|youtu\.be/.test(u), 'Must be a valid YouTube URL'),
})

export const vimeoVideoSchema = videoBaseSchema.extend({
  source_type: z.literal('vimeo'),
  embed_url: z
    .string()
    .url('Must be a valid URL')
    .refine((u) => /vimeo\.com/.test(u), 'Must be a valid Vimeo URL'),
})

export const uploadVideoSchema = videoBaseSchema.extend({
  source_type: z.literal('upload'),
  storage_path: z.string().min(1, 'Please upload a video file'),
})

export const videoSchema = z.discriminatedUnion('source_type', [
  youtubeVideoSchema,
  vimeoVideoSchema,
  uploadVideoSchema,
])

export type VideoFormValues = z.infer<typeof videoSchema>

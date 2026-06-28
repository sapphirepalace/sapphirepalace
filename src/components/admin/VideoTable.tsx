'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { Pencil, Trash2, GripVertical } from 'lucide-react'
import { deleteVideo, toggleVideoActive, reorderVideos } from '@/lib/actions/videos'
import type { Video } from '@/lib/types'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function SortableRow({ video, onDelete, onToggle }: { video: Video; onDelete: (id: string) => void; onToggle: (id: string, active: boolean) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: video.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <tr ref={setNodeRef} style={style}>
      <td style={{ width: '24px', cursor: 'grab', color: 'rgba(255,255,255,0.2)' }} {...attributes} {...listeners}>
        <GripVertical size={14} />
      </td>
      <td>
        {video.thumbnail_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="admin-thumb" src={video.thumbnail_url} alt={video.title} />
        ) : (
          <div className="admin-thumb" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(26,52,96,0.4)' }}>
            <span style={{ fontSize: '18px', opacity: 0.3 }}>🎬</span>
          </div>
        )}
      </td>
      <td>
        <div style={{ fontWeight: 600, marginBottom: '3px' }}>{video.title}</div>
        {video.description && (
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', maxWidth: '260px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {video.description}
          </div>
        )}
      </td>
      <td>
        <span className={`admin-badge ${video.source_type === 'youtube' ? 'admin-badge-yt' : 'admin-badge-upload'}`}>
          {video.source_type === 'youtube' ? 'YouTube' : 'Upload'}
        </span>
      </td>
      <td>{video.hall_tag || '—'}</td>
      <td>{video.event_tag || '—'}</td>
      <td>
        <div
          className="admin-toggle"
          onClick={() => onToggle(video.id, !video.is_active)}
          style={{ cursor: 'pointer' }}
        >
          <div className={`admin-toggle-switch${video.is_active ? ' on' : ''}`} />
        </div>
      </td>
      <td>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link href={`/admin/videos/${video.id}/edit`}>
            <button className="admin-btn-sm" type="button">
              <Pencil size={12} />
            </button>
          </Link>
          <button
            className="admin-btn-sm admin-btn-danger"
            type="button"
            onClick={() => onDelete(video.id)}
          >
            <Trash2 size={12} />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default function VideoTable({ initialVideos }: { initialVideos: Video[] }) {
  const [videos, setVideos] = useState(initialVideos)
  const [, startTransition] = useTransition()
  const sensors = useSensors(useSensor(PointerSensor))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = videos.findIndex((v) => v.id === active.id)
    const newIndex = videos.findIndex((v) => v.id === over.id)
    const reordered = arrayMove(videos, oldIndex, newIndex)
    setVideos(reordered)

    startTransition(async () => {
      const result = await reorderVideos(reordered.map((v) => v.id)) as { error?: string } | undefined
      if (result?.error) {
        toast.error('Could not save new order', { description: result.error })
      } else {
        toast.success('Order saved', { duration: 1500 })
      }
    })
  }

  function handleDelete(id: string) {
    const video = videos.find((v) => v.id === id)
    toast(`Delete "${video?.title ?? 'this video'}"?`, {
      description: 'This will permanently remove the video. This cannot be undone.',
      duration: 8000,
      action: {
        label: 'Delete',
        onClick: () => {
          startTransition(async () => {
            const promise = (async () => {
              const result = await deleteVideo(id)
              if (result?.error) throw new Error(result.error)
              setVideos((prev) => prev.filter((v) => v.id !== id))
            })()
            toast.promise(promise, {
              loading: 'Deleting video…',
              success: 'Video deleted',
              error: (err: Error) => err.message || 'Could not delete video',
            })
          })
        },
      },
      cancel: {
        label: 'Cancel',
        onClick: () => {},
      },
    })
  }

  function handleToggle(id: string, active: boolean) {
    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, is_active: active } : v)))
    startTransition(async () => {
      const result = await toggleVideoActive(id, active)
      if (result?.error) {
        toast.error('Could not update visibility', { description: result.error })
        setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, is_active: !active } : v)))
      } else {
        toast.success(active ? 'Video is now live on the website' : 'Video hidden from the website')
      }
    })
  }

  if (videos.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.3)' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.3 }}>🎬</div>
        <div style={{ fontSize: '16px', marginBottom: '8px' }}>No videos yet</div>
        <div style={{ fontSize: '12px' }}>Add your first video to get started</div>
      </div>
    )
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div style={{ overflowX: 'auto' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th />
              <th>Thumb</th>
              <th>Title</th>
              <th>Source</th>
              <th>Hall</th>
              <th>Event</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <SortableContext items={videos.map((v) => v.id)} strategy={verticalListSortingStrategy}>
            <tbody>
              {videos.map((v) => (
                <SortableRow key={v.id} video={v} onDelete={handleDelete} onToggle={handleToggle} />
              ))}
            </tbody>
          </SortableContext>
        </table>
      </div>
    </DndContext>
  )
}

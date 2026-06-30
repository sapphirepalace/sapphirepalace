'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { Pencil, Trash2, GripVertical } from 'lucide-react'
import { deletePhoto, togglePhotoActive, reorderPhotos } from '@/lib/actions/photos'
import type { Photo } from '@/lib/types'
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

function SortableRow({ photo, onDelete, onToggle }: { photo: Photo; onDelete: (id: string) => void; onToggle: (id: string, active: boolean) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: photo.id })

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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="admin-thumb" src={photo.image_url} alt={photo.title || 'Photo'} />
      </td>
      <td>
        <div style={{ fontWeight: 600 }}>{photo.title || <span style={{ opacity: 0.4 }}>Untitled</span>}</div>
      </td>
      <td>{photo.hall_tag || '—'}</td>
      <td>{photo.event_tag || '—'}</td>
      <td>
        <div
          className="admin-toggle"
          onClick={() => onToggle(photo.id, !photo.is_active)}
          style={{ cursor: 'pointer' }}
        >
          <div className={`admin-toggle-switch${photo.is_active ? ' on' : ''}`} />
        </div>
      </td>
      <td>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link href={`/admin/photos/${photo.id}/edit`}>
            <button className="admin-btn-sm" type="button">
              <Pencil size={12} />
            </button>
          </Link>
          <button
            className="admin-btn-sm admin-btn-danger"
            type="button"
            onClick={() => onDelete(photo.id)}
          >
            <Trash2 size={12} />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default function PhotoTable({ initialPhotos }: { initialPhotos: Photo[] }) {
  const [photos, setPhotos] = useState(initialPhotos)
  const [, startTransition] = useTransition()
  const sensors = useSensors(useSensor(PointerSensor))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = photos.findIndex((p) => p.id === active.id)
    const newIndex = photos.findIndex((p) => p.id === over.id)
    const reordered = arrayMove(photos, oldIndex, newIndex)
    setPhotos(reordered)

    startTransition(async () => {
      const result = await reorderPhotos(reordered.map((p) => p.id)) as { error?: string } | undefined
      if (result?.error) {
        toast.error('Could not save new order', { description: result.error })
      } else {
        toast.success('Order saved', { duration: 1500 })
      }
    })
  }

  function handleDelete(id: string) {
    const photo = photos.find((p) => p.id === id)
    toast(`Delete "${photo?.title ?? 'this photo'}"?`, {
      description: 'This will permanently remove the photo. This cannot be undone.',
      duration: 8000,
      action: {
        label: 'Delete',
        onClick: () => {
          startTransition(async () => {
            const promise = (async () => {
              const result = await deletePhoto(id)
              if (result?.error) throw new Error(result.error)
              setPhotos((prev) => prev.filter((p) => p.id !== id))
            })()
            toast.promise(promise, {
              loading: 'Deleting photo…',
              success: 'Photo deleted',
              error: (err: Error) => err.message || 'Could not delete photo',
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
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, is_active: active } : p)))
    startTransition(async () => {
      const result = await togglePhotoActive(id, active)
      if (result?.error) {
        toast.error('Could not update visibility', { description: result.error })
        setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, is_active: !active } : p)))
      } else {
        toast.success(active ? 'Photo is now live on the website' : 'Photo hidden from the website')
      }
    })
  }

  if (photos.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.3)' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.3 }}>🖼️</div>
        <div style={{ fontSize: '16px', marginBottom: '8px' }}>No photos yet</div>
        <div style={{ fontSize: '12px' }}>Add your first photo to get started</div>
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
              <th>Image</th>
              <th>Title</th>
              <th>Hall</th>
              <th>Event</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <SortableContext items={photos.map((p) => p.id)} strategy={verticalListSortingStrategy}>
            <tbody>
              {photos.map((p) => (
                <SortableRow key={p.id} photo={p} onDelete={handleDelete} onToggle={handleToggle} />
              ))}
            </tbody>
          </SortableContext>
        </table>
      </div>
    </DndContext>
  )
}

'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Song } from '@/types'
import { apiClient } from '@/lib/api-client'
import { Spinner } from '@/components/ui/spinner'

interface SongFormProps {
  song?: Song | null
  onClose: () => void
  onSuccess: () => void
}

export function SongForm({ song, onClose, onSuccess }: SongFormProps) {
  const [formData, setFormData] = useState({
    titulo: '',
    artista: '',
    album: '',
    duracion: '',
    año: '',
    genero: '',
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { toast } = useToast()

  useEffect(() => {
    if (song) {
      setFormData({
        titulo: song.titulo,
        artista: song.artista,
        album: song.album,
        duracion: song.duracion.toString(),
        año: song.año.toString(),
        genero: song.genero,
      })
    }
  }, [song])

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (
      !formData.titulo ||
      formData.titulo.length < 1 ||
      formData.titulo.length > 200
    ) {
      newErrors.titulo = 'El título debe tener entre 1 y 200 caracteres'
    }
    if (
      !formData.artista ||
      formData.artista.length < 1 ||
      formData.artista.length > 100
    ) {
      newErrors.artista = 'El artista debe tener entre 1 y 100 caracteres'
    }
    if (
      !formData.album ||
      formData.album.length < 1 ||
      formData.album.length > 200
    ) {
      newErrors.album = 'El álbum debe tener entre 1 y 200 caracteres'
    }

    const duracion = parseInt(formData.duracion)
    if (isNaN(duracion) || duracion < 1 || duracion > 3600) {
      newErrors.duracion = 'La duración debe estar entre 1 y 3600 segundos'
    }

    const año = parseInt(formData.año)
    const currentYear = new Date().getFullYear()
    if (isNaN(año) || año < 1900 || año > currentYear) {
      newErrors.año = `El año debe estar entre 1900 y ${currentYear}`
    }

    if (
      !formData.genero ||
      formData.genero.length < 1 ||
      formData.genero.length > 50
    ) {
      newErrors.genero = 'El género debe tener entre 1 y 50 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setLoading(true)
    try {
      const payload = {
        ...formData,
        duracion: parseInt(formData.duracion),
        año: parseInt(formData.año),
      }

      if (song) {
        await apiClient.put(`/canciones/${song.id}`, payload)
        toast({
          title: 'Canción actualizada',
          description: 'La canción se actualizó correctamente',
        })
      } else {
        await apiClient.post('/canciones/', payload)
        toast({
          title: 'Canción creada',
          description: 'La canción se creó correctamente',
        })
      }

      onSuccess()
    } catch (err: any) {
      toast({
        title: 'Error',
        description:
          err.response?.data?.detail ||
          'Ocurrió un error al guardar la canción',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{song ? 'Editar Canción' : 'Nueva Canción'}</DialogTitle>
          <DialogDescription>
            {song
              ? 'Actualiza la información de la canción'
              : 'Agrega una nueva canción a la colección'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="titulo">Título *</Label>
            <Input
              id="titulo"
              value={formData.titulo}
              onChange={e =>
                setFormData({ ...formData, titulo: e.target.value })
              }
              placeholder="Bohemian Rhapsody"
              className={errors.titulo ? 'border-destructive' : ''}
            />
            {errors.titulo && (
              <p className="text-xs text-destructive">{errors.titulo}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="artista">Artista *</Label>
            <Input
              id="artista"
              value={formData.artista}
              onChange={e =>
                setFormData({ ...formData, artista: e.target.value })
              }
              placeholder="Queen"
              className={errors.artista ? 'border-destructive' : ''}
            />
            {errors.artista && (
              <p className="text-xs text-destructive">{errors.artista}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="album">Álbum *</Label>
            <Input
              id="album"
              value={formData.album}
              onChange={e =>
                setFormData({ ...formData, album: e.target.value })
              }
              placeholder="A Night at the Opera"
              className={errors.album ? 'border-destructive' : ''}
            />
            {errors.album && (
              <p className="text-xs text-destructive">{errors.album}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duracion">Duración (seg) *</Label>
              <Input
                id="duracion"
                type="number"
                value={formData.duracion}
                onChange={e =>
                  setFormData({ ...formData, duracion: e.target.value })
                }
                placeholder="354"
                className={errors.duracion ? 'border-destructive' : ''}
              />
              {errors.duracion && (
                <p className="text-xs text-destructive">{errors.duracion}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="año">Año *</Label>
              <Input
                id="año"
                type="number"
                value={formData.año}
                onChange={e =>
                  setFormData({ ...formData, año: e.target.value })
                }
                placeholder="1975"
                className={errors.año ? 'border-destructive' : ''}
              />
              {errors.año && (
                <p className="text-xs text-destructive">{errors.año}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="genero">Género *</Label>
            <Input
              id="genero"
              value={formData.genero}
              onChange={e =>
                setFormData({ ...formData, genero: e.target.value })
              }
              placeholder="Rock"
              className={errors.genero ? 'border-destructive' : ''}
            />
            {errors.genero && (
              <p className="text-xs text-destructive">{errors.genero}</p>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? (
                <Spinner className="h-4 w-4" />
              ) : song ? (
                'Actualizar'
              ) : (
                'Crear'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

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
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { apiClient } from '@/lib/api-client'
import { Spinner } from '@/components/ui/spinner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface FavoriteFormProps {
  onClose: () => void
  onSuccess: () => void
}

export function FavoriteForm({ onClose, onSuccess }: FavoriteFormProps) {
  const [formData, setFormData] = useState({
    id_usuario: '',
    id_cancion: '',
  })
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<any[]>([])
  const [songs, setSongs] = useState<any[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [usersRes, songsRes] = await Promise.all([
        apiClient.get('/usuarios/?skip=0&limit=100'),
        apiClient.get('/canciones/?skip=0&limit=100'),
      ])
      setUsers(usersRes.data)
      setSongs(songsRes.data)
    } catch (err) {
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los datos',
        variant: 'destructive',
      })
    } finally {
      setLoadingData(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.id_usuario || !formData.id_cancion) {
      toast({
        title: 'Error',
        description: 'Selecciona un usuario y una canción',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)
    try {
      await apiClient.post('/favoritos/', {
        id_usuario: parseInt(formData.id_usuario),
        id_cancion: parseInt(formData.id_cancion),
      })

      toast({
        title: 'Favorito creado',
        description: 'La canción se marcó como favorita',
      })

      onSuccess()
    } catch (err: any) {
      toast({
        title: 'Error',
        description:
          err.response?.data?.detail ||
          'Ocurrió un error al marcar el favorito',
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
          <DialogTitle>Marcar Favorito</DialogTitle>
          <DialogDescription>
            Selecciona un usuario y una canción para marcar como favorita
          </DialogDescription>
        </DialogHeader>
        {loadingData ? (
          <div className="flex h-32 items-center justify-center">
            <Spinner className="h-6 w-6" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="usuario">Usuario *</Label>
              <Select
                value={formData.id_usuario}
                onValueChange={value =>
                  setFormData({ ...formData, id_usuario: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un usuario" />
                </SelectTrigger>
                <SelectContent>
                  {users.map(user => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      {user.nombre} - {user.correo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cancion">Canción *</Label>
              <Select
                value={formData.id_cancion}
                onValueChange={value =>
                  setFormData({ ...formData, id_cancion: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una canción" />
                </SelectTrigger>
                <SelectContent>
                  {songs.map(song => (
                    <SelectItem key={song.id} value={song.id.toString()}>
                      {song.titulo} - {song.artista}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                {loading ? <Spinner className="h-4 w-4" /> : 'Marcar'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

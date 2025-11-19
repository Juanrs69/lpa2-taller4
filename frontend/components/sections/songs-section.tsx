'use client'

import { useState, useEffect } from 'react'
import { Music, Plus, Search, Edit, Trash2, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SongForm } from '@/components/forms/song-form'
import { useSongs } from '@/hooks/use-songs'
import { formatDuration } from '@/lib/format'
import { Song } from '@/types'
import { Spinner } from '@/components/ui/spinner'
import { EmptyState } from '@/components/empty-state'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

export function SongsSection() {
  const [searchParams, setSearchParams] = useState({
    titulo: '',
    artista: '',
    genero: '',
    año: '',
  })
  const [showForm, setShowForm] = useState(false)
  const [editingSong, setEditingSong] = useState<Song | null>(null)
  const [deletingSong, setDeletingSong] = useState<Song | null>(null)

  const { songs, loading, error, searchSongs, deleteSong, refetch } = useSongs()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Object.values(searchParams).some(v => v !== '')) {
        searchSongs(searchParams)
      } else {
        refetch()
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [searchParams])

  const handleDelete = async () => {
    if (deletingSong) {
      await deleteSong(deletingSong.id)
      setDeletingSong(null)
    }
  }

  const handleEdit = (song: Song) => {
    setEditingSong(song)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingSong(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Canciones</h2>
          <p className="text-sm text-muted-foreground">
            Gestiona tu colección musical
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Agregar Canción
        </Button>
      </div>

      {/* Search Filters */}
      <Card className="p-4">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por título..."
              value={searchParams.titulo}
              onChange={e =>
                setSearchParams({ ...searchParams, titulo: e.target.value })
              }
              className="pl-9"
            />
          </div>
          <Input
            placeholder="Artista..."
            value={searchParams.artista}
            onChange={e =>
              setSearchParams({ ...searchParams, artista: e.target.value })
            }
          />
          <Input
            placeholder="Género..."
            value={searchParams.genero}
            onChange={e =>
              setSearchParams({ ...searchParams, genero: e.target.value })
            }
          />
          <Input
            placeholder="Año..."
            type="number"
            value={searchParams.año}
            onChange={e =>
              setSearchParams({ ...searchParams, año: e.target.value })
            }
          />
        </div>
      </Card>

      {/* Content */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Spinner className="h-8 w-8" />
        </div>
      ) : error ? (
        <EmptyState
          icon={Music}
          title="Error al cargar"
          description={error}
          action={<Button onClick={refetch}>Reintentar</Button>}
        />
      ) : songs.length === 0 ? (
        <EmptyState
          icon={Music}
          title="No hay canciones"
          description="Comienza agregando tu primera canción"
          action={
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Agregar Canción
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {songs.map(song => (
            <Card
              key={song.id}
              className="group overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="aspect-square overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                <img
                  src={`/.jpg?height=300&width=300&query=${encodeURIComponent(
                    song.titulo + ' ' + song.artista
                  )}`}
                  alt={song.titulo}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="truncate text-lg font-semibold text-foreground">
                  {song.titulo}
                </h3>
                <p className="truncate text-sm text-muted-foreground">
                  {song.artista}
                </p>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {song.album}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {song.genero}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {song.año}
                  </span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {formatDuration(song.duracion)}
                  </span>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(song)}
                    className="flex-1 gap-2"
                  >
                    <Edit className="h-3 w-3" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setDeletingSong(song)}
                    className="gap-2"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Form Dialog */}
      {showForm && (
        <SongForm
          song={editingSong}
          onClose={handleCloseForm}
          onSuccess={() => {
            handleCloseForm()
            refetch()
          }}
        />
      )}

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deletingSong}
        onOpenChange={() => setDeletingSong(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar canción?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. También se eliminarán todos los
              favoritos asociados a esta canción.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Heart, Plus, Trash2, Music, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FavoriteForm } from '@/components/forms/favorite-form'
import { useFavorites } from '@/hooks/use-favorites'
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

export function FavoritesSection() {
  const [showForm, setShowForm] = useState(false)
  const [deletingFavorite, setDeletingFavorite] = useState<any>(null)

  const { favorites, loading, error, deleteFavorite, refetch } = useFavorites()

  const handleDelete = async () => {
    if (deletingFavorite) {
      await deleteFavorite(deletingFavorite.id)
      setDeletingFavorite(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Favoritos</h2>
          <p className="text-sm text-muted-foreground">
            Canciones favoritas de los usuarios
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Marcar Favorito
        </Button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Spinner className="h-8 w-8" />
        </div>
      ) : error ? (
        <EmptyState
          icon={Heart}
          title="Error al cargar"
          description={error}
          action={<Button onClick={refetch}>Reintentar</Button>}
        />
      ) : favorites.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="No hay favoritos"
          description="Comienza marcando canciones como favoritas"
          action={
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Marcar Favorito
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map(favorite => (
            <Card
              key={favorite.id}
              className="overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-primary/30 to-secondary/30">
                  <img
                    src={`/.jpg?height=200&width=350&query=${encodeURIComponent(
                      'music favorite'
                    )}`}
                    alt="Favorite"
                    className="h-full w-full object-cover"
                  />
                </div>
                <Heart className="absolute right-3 top-3 h-6 w-6 fill-primary text-primary" />
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {favorite.usuario && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {favorite.usuario.nombre}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {favorite.usuario.correo}
                        </p>
                      </div>
                    </div>
                  )}
                  {favorite.cancion && (
                    <div className="flex items-center gap-2">
                      <Music className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {favorite.cancion.titulo}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {favorite.cancion.artista}
                        </p>
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {favorite.cancion.genero}
                        </Badge>
                      </div>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Marcado el{' '}
                    {new Date(favorite.fecha_marcado).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setDeletingFavorite(favorite)}
                  className="mt-4 w-full gap-2"
                >
                  <Trash2 className="h-3 w-3" />
                  Eliminar
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Form Dialog */}
      {showForm && (
        <FavoriteForm
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            setShowForm(false)
            refetch()
          }}
        />
      )}

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deletingFavorite}
        onOpenChange={() => setDeletingFavorite(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar favorito?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer.
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

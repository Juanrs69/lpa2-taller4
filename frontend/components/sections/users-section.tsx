'use client'

import { useState } from 'react'
import { Users, Plus, Mail, Edit, Trash2, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { UserForm } from '@/components/forms/user-form'
import { useUsers } from '@/hooks/use-users'
import { User } from '@/types'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export function UsersSection() {
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [deletingUser, setDeletingUser] = useState<User | null>(null)
  const [viewingFavorites, setViewingFavorites] = useState<User | null>(null)

  const { users, loading, error, deleteUser, refetch, getUserFavorites } =
    useUsers()
  const [favorites, setFavorites] = useState<any[]>([])
  const [loadingFavorites, setLoadingFavorites] = useState(false)

  const handleDelete = async () => {
    if (deletingUser) {
      await deleteUser(deletingUser.id)
      setDeletingUser(null)
    }
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingUser(null)
  }

  const handleViewFavorites = async (user: User) => {
    setViewingFavorites(user)
    setLoadingFavorites(true)
    try {
      const data = await getUserFavorites(user.id)
      setFavorites(data.favoritos || [])
    } catch (err) {
      setFavorites([])
    } finally {
      setLoadingFavorites(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Usuarios</h2>
          <p className="text-sm text-muted-foreground">
            Administra los usuarios de la plataforma
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Agregar Usuario
        </Button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Spinner className="h-8 w-8" />
        </div>
      ) : error ? (
        <EmptyState
          icon={Users}
          title="Error al cargar"
          description={error}
          action={<Button onClick={refetch}>Reintentar</Button>}
        />
      ) : users.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No hay usuarios"
          description="Comienza agregando tu primer usuario"
          action={
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Agregar Usuario
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {users.map(user => (
            <Card
              key={user.id}
              className="p-6 transition-all hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                  <Users className="h-6 w-6" />
                </div>
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold text-foreground">
                    {user.nombre}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    {user.correo}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Registro:{' '}
                    {new Date(user.fecha_registro).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleViewFavorites(user)}
                  className="flex-1 gap-2"
                >
                  <Heart className="h-3 w-3" />
                  Favoritos
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(user)}
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setDeletingUser(user)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Form Dialog */}
      {showForm && (
        <UserForm
          user={editingUser}
          onClose={handleCloseForm}
          onSuccess={() => {
            handleCloseForm()
            refetch()
          }}
        />
      )}

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deletingUser}
        onOpenChange={() => setDeletingUser(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar usuario?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. También se eliminarán todos los
              favoritos asociados a este usuario.
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

      {/* Favorites Dialog */}
      <Dialog
        open={!!viewingFavorites}
        onOpenChange={() => setViewingFavorites(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Favoritos de {viewingFavorites?.nombre}</DialogTitle>
            <DialogDescription>
              Canciones marcadas como favoritas
            </DialogDescription>
          </DialogHeader>
          {loadingFavorites ? (
            <div className="flex h-32 items-center justify-center">
              <Spinner className="h-6 w-6" />
            </div>
          ) : favorites.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Este usuario no tiene favoritos aún
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {favorites.map((fav: any) => (
                <Card key={fav.id} className="p-3">
                  <div className="flex items-center gap-3">
                    <Heart className="h-4 w-4 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        Canción ID: {fav.id_cancion}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Marcado el{' '}
                        {new Date(fav.fecha_marcado).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

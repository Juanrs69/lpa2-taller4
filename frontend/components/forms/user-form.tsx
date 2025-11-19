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
import { User } from '@/types'
import { apiClient } from '@/lib/api-client'
import { Spinner } from '@/components/ui/spinner'
import { CheckCircle2, XCircle } from 'lucide-react'

interface UserFormProps {
  user?: User | null
  onClose: () => void
  onSuccess: () => void
}

export function UserForm({ user, onClose, onSuccess }: UserFormProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [emailValid, setEmailValid] = useState<boolean | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre,
        correo: user.correo,
      })
      setEmailValid(true)
    }
  }, [user])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValid = emailRegex.test(email)
    setEmailValid(email ? isValid : null)
    return isValid
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (
      !formData.nombre ||
      formData.nombre.length < 2 ||
      formData.nombre.length > 100
    ) {
      newErrors.nombre = 'El nombre debe tener entre 2 y 100 caracteres'
    }

    if (!formData.correo) {
      newErrors.correo = 'El correo es requerido'
    } else if (!validateEmail(formData.correo)) {
      newErrors.correo = 'El correo no es válido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setLoading(true)
    try {
      if (user) {
        await apiClient.put(`/usuarios/${user.id}`, formData)
        toast({
          title: 'Usuario actualizado',
          description: 'El usuario se actualizó correctamente',
        })
      } else {
        await apiClient.post('/usuarios/', formData)
        toast({
          title: 'Usuario creado',
          description: 'El usuario se creó correctamente',
        })
      }

      onSuccess()
    } catch (err: any) {
      toast({
        title: 'Error',
        description:
          err.response?.data?.detail ||
          'Ocurrió un error al guardar el usuario',
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
          <DialogTitle>{user ? 'Editar Usuario' : 'Nuevo Usuario'}</DialogTitle>
          <DialogDescription>
            {user
              ? 'Actualiza la información del usuario'
              : 'Agrega un nuevo usuario a la plataforma'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre *</Label>
            <Input
              id="nombre"
              value={formData.nombre}
              onChange={e =>
                setFormData({ ...formData, nombre: e.target.value })
              }
              placeholder="Juan Pérez"
              className={errors.nombre ? 'border-destructive' : ''}
            />
            {errors.nombre && (
              <p className="text-xs text-destructive">{errors.nombre}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="correo">Correo Electrónico *</Label>
            <div className="relative">
              <Input
                id="correo"
                type="email"
                value={formData.correo}
                onChange={e => {
                  setFormData({ ...formData, correo: e.target.value })
                  validateEmail(e.target.value)
                }}
                placeholder="juan@ejemplo.com"
                className={errors.correo ? 'border-destructive pr-10' : 'pr-10'}
              />
              {emailValid !== null && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {emailValid ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-destructive" />
                  )}
                </div>
              )}
            </div>
            {errors.correo && (
              <p className="text-xs text-destructive">{errors.correo}</p>
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
              ) : user ? (
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

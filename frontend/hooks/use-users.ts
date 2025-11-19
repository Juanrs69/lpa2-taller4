'use client'

import { useState, useEffect } from 'react'
import { apiClient } from '@/lib/api-client'
import { User } from '@/types'
import { useToast } from './use-toast'

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiClient.get('/usuarios/?skip=0&limit=100')
      setUsers(response.data)
    } catch (err: any) {
      setError(err.message || 'Error al cargar usuarios')
    } finally {
      setLoading(false)
    }
  }

  const deleteUser = async (id: number) => {
    try {
      await apiClient.delete(`/usuarios/${id}`)
      toast({
        title: 'Usuario eliminado',
        description: 'El usuario se eliminó correctamente',
      })
      fetchUsers()
    } catch (err: any) {
      toast({
        title: 'Error',
        description:
          err.response?.data?.detail || 'Error al eliminar el usuario',
        variant: 'destructive',
      })
    }
  }

  const getUserFavorites = async (userId: number) => {
    try {
      const response = await apiClient.get(`/usuarios/${userId}/favoritos`)
      return response.data
    } catch (err: any) {
      toast({
        title: 'Error',
        description: 'Error al cargar favoritos',
        variant: 'destructive',
      })
      throw err
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return {
    users,
    loading,
    error,
    deleteUser,
    getUserFavorites,
    refetch: fetchUsers,
  }
}

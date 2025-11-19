'use client'

import { useState, useEffect } from 'react'
import { apiClient } from '@/lib/api-client'
import { useToast } from './use-toast'

export function useFavorites() {
  const [favorites, setFavorites] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchFavorites = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiClient.get('/favoritos/?skip=0&limit=100')
      setFavorites(response.data)
    } catch (err: any) {
      setError(err.message || 'Error al cargar favoritos')
    } finally {
      setLoading(false)
    }
  }

  const deleteFavorite = async (id: number) => {
    try {
      await apiClient.delete(`/favoritos/${id}`)
      toast({
        title: 'Favorito eliminado',
        description: 'El favorito se eliminó correctamente',
      })
      fetchFavorites()
    } catch (err: any) {
      toast({
        title: 'Error',
        description:
          err.response?.data?.detail || 'Error al eliminar el favorito',
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    fetchFavorites()
  }, [])

  return {
    favorites,
    loading,
    error,
    deleteFavorite,
    refetch: fetchFavorites,
  }
}

'use client'

import { useState, useEffect } from 'react'
import { apiClient } from '@/lib/api-client'
import { Song } from '@/types'
import { useToast } from './use-toast'

export function useSongs() {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchSongs = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiClient.get('/canciones/?skip=0&limit=100')
      setSongs(response.data)
    } catch (err: any) {
      setError(err.message || 'Error al cargar canciones')
    } finally {
      setLoading(false)
    }
  }

  const searchSongs = async (params: Record<string, string>) => {
    try {
      setLoading(true)
      setError(null)
      const queryString = new URLSearchParams(
        Object.entries(params).filter(([_, v]) => v !== '')
      ).toString()
      const response = await apiClient.get(`/canciones/buscar?${queryString}`)
      setSongs(response.data)
    } catch (err: any) {
      setError(err.message || 'Error al buscar canciones')
    } finally {
      setLoading(false)
    }
  }

  const deleteSong = async (id: number) => {
    try {
      await apiClient.delete(`/canciones/${id}`)
      toast({
        title: 'Canción eliminada',
        description: 'La canción se eliminó correctamente',
      })
      fetchSongs()
    } catch (err: any) {
      toast({
        title: 'Error',
        description:
          err.response?.data?.detail || 'Error al eliminar la canción',
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    fetchSongs()
  }, [])

  return {
    songs,
    loading,
    error,
    searchSongs,
    deleteSong,
    refetch: fetchSongs,
  }
}

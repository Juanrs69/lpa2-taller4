export interface Usuario {
  id: number
  nombre: string
  correo: string
  fecha_registro: string
}

export interface Cancion {
  id: number
  titulo: string
  artista: string
  album: string
  duracion: number
  año: number
  genero: string
  fecha_creacion: string
}

export interface Favorito {
  id: number
  id_usuario: number
  id_cancion: number
  fecha_marcado: string
  usuario?: Usuario
  cancion?: Cancion
}

export type User = Usuario
export type Song = Cancion
export type Favorite = Favorito

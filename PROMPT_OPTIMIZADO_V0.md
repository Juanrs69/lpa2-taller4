# PROMPT OPTIMIZADO PARA V0.APP - API DE MÚSICA

## Instrucciones para usar este prompt:

1. **Copia todo el contenido desde "INICIO DEL PROMPT"** hasta **"FIN DEL PROMPT"**
2. **Pega en v0.app** y ejecuta
3. **Adjunta el archivo** `api_endpoints_para_v0.json` si v0.app lo permite

---

## INICIO DEL PROMPT

Eres un ingeniero de frontend senior especializado en React, TypeScript y Tailwind CSS. Tu tarea es diseñar una aplicación web responsiva y eficiente que consuma una API de música existente.

### CONTEXTO DE LA API

Crea un frontend completo para esta API de música con FastAPI que gestiona usuarios, canciones y favoritos:

**API Base URL:** `http://127.0.0.1:8000`
**22 endpoints disponibles** en 3 módulos principales:

#### ENDPOINTS CRÍTICOS:

**USUARIOS:**

- `GET /api/usuarios/` - Listar usuarios (paginado)
- `POST /api/usuarios/` - Crear usuario (nombre, correo único)
- `PUT /api/usuarios/{id}` - Actualizar usuario
- `DELETE /api/usuarios/{id}` - Eliminar usuario
- `GET /api/usuarios/{id}/favoritos` - Ver favoritos del usuario

**CANCIONES:**

- `GET /api/canciones/` - Listar canciones (paginado)
- `POST /api/canciones/` - Crear canción (título, artista, álbum, duración, año, género)
- `PUT /api/canciones/{id}` - Actualizar canción
- `DELETE /api/canciones/{id}` - Eliminar canción
- `GET /api/canciones/buscar?titulo=&artista=&genero=&año=` - Búsqueda avanzada

**FAVORITOS:**

- `GET /api/favoritos/` - Listar favoritos (con datos anidados usuario+canción)
- `POST /api/favoritos/` - Marcar favorito (id_usuario, id_cancion)
- `DELETE /api/favoritos/{id}` - Eliminar favorito

#### ESTRUCTURA DE DATOS:

```typescript
interface Usuario {
  id: number
  nombre: string // 2-100 caracteres
  correo: string // Email único
  fecha_registro: string
}

interface Cancion {
  id: number
  titulo: string // 1-200 caracteres
  artista: string // 1-100 caracteres
  album: string // 1-200 caracteres
  duracion: number // 1-3600 segundos
  año: number // 1900-año actual
  genero: string // 1-50 caracteres
  fecha_creacion: string
}

interface Favorito {
  id: number
  id_usuario: number
  id_cancion: number
  fecha_marcado: string
  usuario?: Usuario // Datos anidados
  cancion?: Cancion // Datos anidados
}
```

### REQUISITOS DE DISEÑO (CRÍTICO):

#### 1. **ARQUITECTURA DE LA APLICACIÓN:**

- **Dashboard principal** con navegación entre secciones
- **3 secciones principales**: Usuarios, Canciones, Favoritos
- **Diseño responsivo** (mobile-first)
- **Dark/Light mode toggle**
- **Estado global** con Context API o Zustand

#### 2. **FUNCIONALIDADES ESPECÍFICAS POR SECCIÓN:**

**SECCIÓN USUARIOS:**

- **Tabla/lista** de usuarios con paginación
- **Formulario modal** para crear/editar usuarios
- **Validación en tiempo real** (email único, nombre 2-100 chars)
- **Botón "Ver favoritos"** que muestre las canciones favoritas del usuario
- **Confirmación** antes de eliminar (alerta de eliminación en cascada)

**SECCIÓN CANCIONES:**

- **Grid/tabla** de canciones con covers placeholder
- **Búsqueda avanzada** con filtros: título, artista, género, año
- **Formulario modal** para crear/editar canciones
- **Validaciones**: duración max 1 hora, año no futuro
- **Formato de duración** legible (ej: "5:54" en vez de "354")
- **Botón "Marcar como favorito"** (seleccionar usuario primero)

**SECCIÓN FAVORITOS:**

- **Lista/grid** mostrando usuario + canción + fecha
- **Filtros** por usuario o género musical
- **Vista de tarjetas** con información completa anidada
- **Acción rápida** para eliminar favorito

#### 3. **ESTADOS DE UI CRÍTICOS:**

- **Loading states** con spinners/skeletons elegantes
- **Estados vacíos** con ilustraciones y CTAs
- **Mensajes de error** user-friendly con opciones de reintento
- **Mensajes de éxito** con toast notifications
- **Paginación** con controles intuitivos (máx. 100 registros por página)

#### 4. **UX AVANZADA:**

- **Búsqueda en tiempo real** con debouncing (300ms)
- **Breadcrumbs** para navegación clara
- **Shortcuts de teclado** (Ctrl+N para nuevo, etc.)
- **Confirmaciones** antes de acciones destructivas
- **Auto-save** en formularios largos
- **Indicadores visuales** de validación (verde/rojo)

### ESPECIFICACIONES TÉCNICAS:

#### 1. **MANEJO DE ERRORES ROBUSTO:**

```typescript
// Tipos de errores esperados:
// 400: "Email ya registrado" | "Ya marcado como favorito"
// 404: "Usuario/Canción/Favorito no encontrado"
// 422: "Datos inválidos" (validación Pydantic)
// 500: "Error del servidor"
```

- **Retry automático** en errores 500
- **Fallbacks UI** cuando la API falla
- **Offline detection** con mensaje apropiado

#### 2. **OPTIMIZACIÓN DE RENDIMIENTO:**

- **Lazy loading** de componentes pesados
- **Virtualización** para listas largas (>100 items)
- **Caching inteligente** con React Query o SWR
- **Debouncing** en búsquedas (300ms)
- **Optimistic updates** en operaciones CRUD

#### 3. **VALIDACIONES DEL FRONTEND:**

- **Email regex** con indicador visual en tiempo real
- **Duración** convertida a formato MM:SS
- **Año** validado contra año actual
- **Prevención** de favoritos duplicados (deshabilitar botón)

### ESTILO Y BRANDING:

- **Paleta musical**: Tonos oscuros con acentos vibrantes (púrpura/cyan)
- **Iconografía**: Lucide React o Heroicons (música, usuarios, corazones)
- **Tipografía**: Inter o Roboto para legibilidad
- **Animaciones**: Framer Motion para transiciones suaves
- **Componentes**: shadcn/ui o Headless UI + Tailwind

### ENTREGABLES ESPERADOS:

1. **App.tsx** con routing y layout principal
2. **Componentes** organizados por feature (users/, songs/, favorites/)
3. **Hooks personalizados** para API calls
4. **Tipos TypeScript** completos y tipado estricto
5. **Utils** para formateo (duración, fechas, validaciones)
6. **Constants** con endpoints y configuración
7. **README** con instrucciones de instalación y configuración

### CONFIGURACIÓN DEL PROYECTO:

- **Vite + React + TypeScript**
- **Tailwind CSS** para estilos
- **React Router** para navegación
- **Axios/Fetch** para API calls
- **React Hook Form** para formularios
- **Zod** para validaciones
- **React Query** para estado del servidor (opcional pero recomendado)

---

## FIN DEL PROMPT

### ARCHIVOS ADICIONALES:

Asegúrate de usar el archivo `api_endpoints_para_v0.json` que contiene los detalles completos de todos los endpoints, validaciones y ejemplos de requests/responses.

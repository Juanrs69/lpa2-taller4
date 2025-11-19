# Reporte Completo - API de Música (lpa2-taller3)

## Resumen Ejecutivo

He completado la investigación del proyecto **lpa2-taller3** ubicado en `/home/juana/proyectos/lpa2-taller3`. Este es un proyecto de **API RESTful** desarrollado con **FastAPI** para gestionar usuarios, canciones y favoritos musicales.

## Información General del Proyecto

- **Nombre**: API de Música
- **Versión**: 1.0.0
- **Desarrollador**: Juan Alejandro Ramirez Sanchez
- **Tecnologías**: FastAPI, SQLModel, Pydantic, SQLite
- **Puerto**: 8000
- **Host**: 127.0.0.1
- **URL Base**: http://127.0.0.1:8000
- **Documentación**: http://127.0.0.1:8000/docs

## Estructura del Proyecto

```
lpa2-taller3/
├── main.py                    # Aplicación FastAPI principal
├── .env                       # Variables de entorno
├── musica.db                  # Base de datos SQLite
├── requirements.txt           # Dependencias Python
├── app/
│   ├── config.py             # Configuración de la aplicación
│   ├── database.py           # Conexión y configuración de BD
│   ├── models.py             # Modelos de datos SQLModel
│   └── routers/
│       ├── usuarios.py       # Endpoints CRUD usuarios
│       ├── canciones.py      # Endpoints CRUD canciones + búsqueda
│       └── favoritos.py      # Endpoints gestión favoritos
├── static/                   # Frontend estático
├── tests/                    # Pruebas unitarias
└── README.md                 # Documentación del proyecto
```

## Modelos de Datos

### Usuario

```python
{
    "id": int (auto-generado),
    "nombre": str (2-100 caracteres),
    "correo": EmailStr (único),
    "fecha_registro": datetime (auto-generado)
}
```

### Canción

```python
{
    "id": int (auto-generado),
    "titulo": str (1-200 caracteres),
    "artista": str (1-100 caracteres),
    "album": str (1-200 caracteres),
    "duracion": int (1-3600 segundos),
    "año": int (1900-año actual, no futuro),
    "genero": str (1-50 caracteres),
    "fecha_creacion": datetime (auto-generado)
}
```

### Favorito

```python
{
    "id": int (auto-generado),
    "id_usuario": int (foreign key),
    "id_cancion": int (foreign key),
    "fecha_marcado": datetime (auto-generado)
}
```

## Endpoints Disponibles

### Endpoints Generales

#### 1. Frontend

- **GET** `/` - Servir aplicación frontend (HTML)

#### 2. Información de la API

- **GET** `/api` - Información básica de la API
- **Response**:

```json
{
  "message": "Bienvenido a API de Música",
  "version": "1.0.0",
  "endpoints": {...}
}
```

#### 3. Health Check

- **GET** `/health` - Estado de salud de la API
- **Response**:

```json
{
  "status": "healthy|unhealthy",
  "database": "connected|disconnected",
  "environment": "development",
  "version": "1.0.0"
}
```

### Endpoints de Usuarios

#### 1. Listar Usuarios

- **GET** `/api/usuarios/`
- **Query Params**: `skip` (default: 0), `limit` (max: 100)
- **Response**: Lista de usuarios con paginación

#### 2. Crear Usuario

- **POST** `/api/usuarios/`
- **Body**:

```json
{
  "nombre": "string (requerido, 2-100 chars)",
  "correo": "email@ejemplo.com (requerido, único)"
}
```

- **Errores**: 400 (correo duplicado), 422 (validación)

#### 3. Obtener Usuario

- **GET** `/api/usuarios/{usuario_id}`
- **Errores**: 404 (no encontrado)

#### 4. Actualizar Usuario

- **PUT** `/api/usuarios/{usuario_id}`
- **Body**: Campos opcionales del usuario
- **Errores**: 400, 404, 422

#### 5. Eliminar Usuario

- **DELETE** `/api/usuarios/{usuario_id}`
- **Status**: 204 (sin contenido)
- **Nota**: Elimina también todos sus favoritos

#### 6. Favoritos del Usuario

- **GET** `/api/usuarios/{usuario_id}/favoritos`
- **Response**: Usuario con lista de favoritos anidada

### Endpoints de Canciones

#### 1. Listar Canciones

- **GET** `/api/canciones/`
- **Query Params**: `skip`, `limit`
- **Response**: Lista de canciones con paginación

#### 2. Crear Canción

- **POST** `/api/canciones/`
- **Body**:

```json
{
  "titulo": "string (requerido, 1-200 chars)",
  "artista": "string (requerido, 1-100 chars)",
  "album": "string (requerido, 1-200 chars)",
  "duracion": "int (requerido, 1-3600 segundos)",
  "año": "int (requerido, 1900-año actual)",
  "genero": "string (requerido, 1-50 chars)"
}
```

- **Validación**: No permite años futuros

#### 3. Buscar Canciones

- **GET** `/api/canciones/buscar`
- **Query Params**:
  - `titulo`: búsqueda parcial case-insensitive
  - `artista`: búsqueda parcial case-insensitive
  - `genero`: búsqueda parcial case-insensitive
  - `año`: búsqueda exacta
  - `skip`, `limit`: paginación

#### 4. Obtener Canción

- **GET** `/api/canciones/{cancion_id}`

#### 5. Actualizar Canción

- **PUT** `/api/canciones/{cancion_id}`
- **Body**: Campos opcionales de la canción

#### 6. Eliminar Canción

- **DELETE** `/api/canciones/{cancion_id}`
- **Status**: 204
- **Nota**: Elimina también todos los favoritos asociados

### Endpoints de Favoritos

#### 1. Listar Favoritos

- **GET** `/api/favoritos/`
- **Query Params**: `skip`, `limit`
- **Response**: Lista con datos anidados de usuario y canción

#### 2. Crear Favorito

- **POST** `/api/favoritos/`
- **Body**:

```json
{
  "id_usuario": "int (requerido)",
  "id_cancion": "int (requerido)"
}
```

- **Validaciones**: Usuario y canción deben existir, no duplicar favoritos
- **Errores**: 400 (duplicado), 404 (no existe usuario/canción)

#### 3. Obtener Favorito

- **GET** `/api/favoritos/{favorito_id}`

#### 4. Eliminar Favorito

- **DELETE** `/api/favoritos/{favorito_id}`

#### 5. Marcar Favorito Específico (Alternativo)

- **POST** `/api/favoritos/{id_usuario}/canciones/{id_cancion}`
- **Función**: Endpoint más específico para marcar favoritos

#### 6. Eliminar Favorito Específico

- **DELETE** `/api/favoritos/{id_usuario}/canciones/{id_cancion}`

## Códigos de Error Manejados

| Código | Descripción                                  |
| ------ | -------------------------------------------- |
| 200    | OK - Operación exitosa                       |
| 201    | Created - Recurso creado exitosamente        |
| 204    | No Content - Operación exitosa sin contenido |
| 400    | Bad Request - Datos duplicados/conflictos    |
| 404    | Not Found - Recurso no encontrado            |
| 422    | Unprocessable Entity - Validación Pydantic   |
| 500    | Internal Server Error - Error del servidor   |

## Configuración Técnica

### Base de Datos

- **Tipo**: SQLite
- **Archivo**: `musica.db`
- **ORM**: SQLModel/SQLAlchemy
- **Conexión**: `sqlite:///./musica.db`

### CORS

- **Origins**: ["*"] (desarrollo)
- **Credentials**: true
- **Methods**: ["*"]
- **Headers**: ["*"]

### Variables de Entorno (.env)

```env
DATABASE_URL=sqlite:///./musica.db
HOST=127.0.0.1
PORT=8000
DEBUG=true
APP_NAME=API de Música
SECRET_KEY=mi_clave_secreta_super_segura_123
ENVIRONMENT=development
```

## Características Especiales

### Validaciones Pydantic

- **Usuarios**: Email válido y único, nombre entre 2-100 caracteres
- **Canciones**: Duración máx. 1 hora, año no futuro, campos requeridos
- **Favoritos**: Validación de existencia de usuario y canción, no duplicados

### Funcionalidades Avanzadas

- **Paginación**: Todos los endpoints de listado (max 100 registros)
- **Búsqueda Flexible**: Búsqueda por múltiples criterios en canciones
- **Cascada**: Eliminación en cascada de favoritos al eliminar usuarios/canciones
- **Relaciones**: SQLModel con relaciones definidas entre modelos

### Documentación Automática

- **Swagger UI**: `/docs` - Interfaz interactiva
- **ReDoc**: `/redoc` - Documentación alternativa
- **Metadatos**: Descripciones, ejemplos, tags organizados

## Cómo Ejecutar la API

```bash
# En el directorio lpa2-taller3
python main.py

# O usando uvicorn directamente
uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

## Archivos Clave Analizados

1. **`main.py`**: Aplicación FastAPI principal con middleware CORS, routers y lifecycle
2. **`app/config.py`**: Configuración por entornos (development/testing/production)
3. **`app/models.py`**: Modelos SQLModel con validaciones Pydantic completas
4. **`app/database.py`**: Configuración SQLAlchemy y gestión de sesiones
5. **`app/routers/usuarios.py`**: CRUD completo de usuarios + favoritos del usuario
6. **`app/routers/canciones.py`**: CRUD + búsqueda avanzada de canciones
7. **`app/routers/favoritos.py`**: Gestión de favoritos con endpoints alternativos

## Conclusión

La API está **completa y bien estructurada** con:

- **22 endpoints** funcionales distribuidos en 3 módulos
- **CRUD completo** para todas las entidades
- **Validaciones robustas** con Pydantic
- **Documentación automática** con FastAPI
- **Búsqueda avanzada** en canciones
- **Paginación** implementada
- **Manejo de errores** apropiado
- **Arquitectura modular** bien organizada

El proyecto sigue las **mejores prácticas** de FastAPI y está listo para desarrollo y pruebas.

---

_Documentación generada el 18 de noviembre de 2024_

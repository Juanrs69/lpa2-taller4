# Frontend para API de Música - LPA2 Taller 4

[![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-blue?logo=tailwind-css)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/API-FastAPI-green?logo=fastapi)](https://fastapi.tiangolo.com/)
[![Tests](https://img.shields.io/badge/Tests-27%20passed-green?logo=pytest)](https://pytest.org/)
[![Code Quality](https://img.shields.io/badge/Code%20Quality-Pre--commit-blue?logo=pre-commit)](https://pre-commit.com/)

## Descripción

Frontend moderno desarrollado con **Next.js 16** y **TypeScript** que consume la API de Música del **lpa2-taller3**. Generado inicialmente con [v0.app](https://v0.app/) y optimizado para producción con testing completo y herramientas de calidad de código.

### Características

- **UI Moderna**: Diseño responsivo con Tailwind CSS y Radix UI
- **Rendimiento**: Next.js 16 con Turbopack para desarrollo ultrarrápido
- **Testing Completo**: 27 tests automatizados con pytest y Jest
- **Calidad de Código**: ESLint, Prettier y pre-commit hooks
- **Documentación**: API completamente documentada con 22 endpoints

## Arquitectura del Proyecto

```
lpa2-taller4/
├── frontend/                          # Aplicación Next.js
│   ├── app/                       # App Router de Next.js 13+
│   ├── components/                # Componentes React reutilizables
│   ├── hooks/                     # Custom hooks
│   ├── lib/                       # Utilidades y configuración API
│   ├── types/                     # Tipos TypeScript
│   └── __tests__/                 # Tests del frontend
├── tests/                             # Tests de Python (pytest)
│   ├── test_documentacion.py      # Tests de documentación API
│   ├── test_frontend_config.py    # Tests de configuración frontend
│   ├── test_integracion.py        # Tests de integración
│   └── test_utils.py              # Tests unitarios y utilidades
├── documentacion_api_musica.json      # Documentación completa API
├── api_endpoints_para_v0.json         # Endpoints optimizados para v0.app
├── .pre-commit-config.yaml            # Configuración pre-commit hooks
├── pyproject.toml                     # Configuración pytest y coverage
└── run-tests.sh                       # Script de tests automatizado
```

## 🛠️ Tecnologías Utilizadas

### Frontend

- **Next.js 16**: Framework React con Turbopack
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Framework CSS utilitario
- **Radix UI**: Componentes accesibles
- **Axios**: Cliente HTTP para API calls
- **Jest**: Testing framework
- **ESLint + Prettier**: Linting y formateo

### Backend Integration

- **FastAPI**: API REST con Python
- **SQLModel**: ORM con validaciones Pydantic
- **SQLite**: Base de datos

### DevOps & Quality

- **pytest**: Testing framework Python
- **pre-commit**: Hooks de calidad de código
- **GitHub Actions**: CI/CD (configuración lista)
- **Coverage**: Reportes de cobertura de tests

## Instalación y Configuración

### Prerrequisitos

- Node.js 20+
- Python 3.12+
- pnpm (recomendado) o npm

### 1. Clonar el repositorio

```bash
git clone https://github.com/Juanrs69/lpa2-taller4.git
cd lpa2-taller4
```

### 2. Configurar entorno Python (para tests)

```bash
python -m venv .venv
source .venv/bin/activate  # En Linux/Mac
# o
.venv\Scripts\activate     # En Windows

pip install -r requirements.txt
```

### 3. Instalar dependencias del frontend

```bash
cd frontend
pnpm install
```

### 4. Instalar pre-commit hooks

```bash
cd ..  # Volver al directorio raíz
pip install pre-commit
pre-commit install
```

## Ejecutar el Proyecto

### Método 1: Script Automatizado

```bash
# Ejecutar todos los tests y verificaciones
./run-tests.sh
```

### Método 2: Comandos Manuales

#### Backend (API del lpa2-taller3)

```bash
# En una terminal
cd ../lpa2-taller3
python main.py
# API corriendo en http://127.0.0.1:8000
```

#### Frontend

```bash
# En otra terminal
cd lpa2-taller4/frontend
pnpm dev
# Frontend corriendo en http://localhost:3001
```

## 🧪 Testing

### Tests Completos

```bash
# Ejecutar todos los tests
./run-tests.sh

# Solo tests de Python
python -m pytest tests/ -v

# Solo tests del frontend
cd frontend && pnpm test

# Tests con coverage
python -m pytest tests/ --cov=. --cov-report=html
```

### Tipos de Tests Implementados

- **27 tests automatizados**
- **Tests de documentación**: Validan estructura de JSONs
- **Tests de configuración**: Verifican setup del frontend
- **Tests de integración**: Mock tests para API endpoints
- **Tests unitarios**: Utilidades y validaciones

## 🔍 Calidad de Código

### Pre-commit Hooks Configurados

- ✅ **Trailing whitespace**: Elimina espacios al final
- ✅ **End of file fixer**: Nueva línea al final de archivos
- ✅ **YAML/JSON validation**: Valida sintaxis
- ✅ **Merge conflict detection**: Detecta conflictos
- ✅ **Large files prevention**: Previene archivos grandes
- ✅ **Prettier**: Formateo automático de código
- ✅ **ESLint**: Linting para TypeScript/JavaScript

### Comandos de Calidad

```bash
# Linting del frontend
cd frontend
pnpm lint
pnpm lint:fix

# Formateo de código
pnpm format
pnpm format:check

# Type checking
pnpm type-check
```

## 📚 Documentación de la API

### Endpoints Principales

- **👥 Usuarios**: 6 endpoints (CRUD + favoritos)
- **Canciones**: 6 endpoints (CRUD + búsqueda avanzada)
- **Favoritos**: 6 endpoints (gestión completa)
- **🔧 Sistema**: 4 endpoints (health, info, frontend)

### Documentación Interactiva

- **Swagger UI**: http://127.0.0.1:8000/docs
- **ReDoc**: http://127.0.0.1:8000/redoc
- **Health Check**: http://127.0.0.1:8000/health

### Archivos de Documentación

- `documentacion_api_musica.json`: Documentación técnica completa
- `api_endpoints_para_v0.json`: Endpoints optimizados para v0.app

## 🌟 Funcionalidades del Frontend

### Gestión de Usuarios

- ✅ Listado con paginación
- ✅ Crear/Editar usuarios
- ✅ Validación de email único
- ✅ Ver favoritos por usuario
- ✅ Eliminación con confirmación

### Gestión de Canciones

- ✅ Grid/lista de canciones
- ✅ Búsqueda avanzada (título, artista, género, año)
- ✅ CRUD completo
- ✅ Validaciones (duración, año)
- ✅ Formato de duración legible

### Sistema de Favoritos

- ✅ Marcar/desmarcar favoritos
- ✅ Lista con datos anidados
- ✅ Filtros por usuario/género
- ✅ Vista de tarjetas informativa

### UX/UI Avanzada

- ✅ Dark/Light mode toggle
- ✅ Estados de carga elegantes
- ✅ Mensajes de error user-friendly
- ✅ Toast notifications
- ✅ Responsive design
- ✅ Navegación por breadcrumbs

## 🚀 Deployment

### Build para Producción

```bash
cd frontend
pnpm build
pnpm start
```

### Variables de Entorno

Crear archivo `.env.local` en el directorio `frontend/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### GitHub Pages

La documentación del proyecto está disponible en GitHub Pages:

📱 **Sitio Web**: https://juanrs69.github.io/lpa2-taller4

Para activar GitHub Pages en tu fork:

1. Ve a **Settings** > **Pages** en tu repositorio
2. Selecciona **Deploy from a branch**
3. Branch: `main`, Folder: `/docs`
4. Guarda los cambios

## 🤝 Contribuir

1. Fork del proyecto
2. Crear rama para feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit con pre-commit hooks (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

### Flujo de Desarrollo

```bash
# Los pre-commit hooks se ejecutan automáticamente
git add .
git commit -m "Mensaje descriptivo"

# Si hay errores, los hooks los corregirán automáticamente
git add .
git commit -m "Mensaje descriptivo"
```

## 📊 Métricas del Proyecto

- **📁 4 archivos de tests** con 27 tests automatizados
- **🎯 100% tests pasando** en última ejecución
- **📚 5 archivos de documentación** (JSON + Markdown)
- **⚛️ Frontend** Next.js + TypeScript completamente configurado
- **🔧 Pre-commit hooks** instalados y funcionando
- **📦 22 endpoints de API** documentados y probados

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Juan Alejandro Ramirez Sanchez**

- GitHub: [@Juanrs69](https://github.com/Juanrs69)
- Email: juan.ramirez@ejemplo.com

---

### 🎯 Estado del Proyecto: ✅ LISTO PARA PRODUCCIÓN

**Última actualización**: Noviembre 2024
**Versión**: 1.0.0
**Tests**: 27/27 ✅
**Build**: ✅ Exitoso
**Calidad**: ✅ Pre-commit hooks activos

- 🔒 **Tipado Estricto**: TypeScript con validación completa
- 🧪 **Testing**: Jest + Testing Library configurado
- 📝 **Calidad de Código**: ESLint, Prettier, Pre-commit hooks
- 🔗 **Integración Completa**: Conectado con API FastAPI en tiempo real

## 🏗️ Arquitectura del Proyecto

```
frontend/
├── app/                    # App Router de Next.js 16
├── components/             # Componentes React reutilizables
│   ├── forms/             # Formularios (usuarios, canciones, favoritos)
│   ├── sections/          # Secciones principales
│   └── ui/                # Componentes UI base (shadcn/ui)
├── hooks/                 # Hooks personalizados
├── lib/                   # Utilidades y configuración
│   ├── api-client.ts     # Cliente Axios configurado
│   └── utils.ts          # Funciones utilitarias
├── types/                 # Tipos TypeScript
└── __tests__/            # Pruebas automatizadas
```

## 🚀 Inicio Rápido

### Prerrequisitos

- **Node.js 20+** instalado
- **PNPM** como gestor de paquetes
- **API lpa2-taller3** funcionando en `http://127.0.0.1:8000`

### 🔧 Instalación y Ejecución

```bash
# 1. Ejecutar la API (Terminal 1)
cd ../lpa2-taller3
python3 main.py

# 2. Ejecutar el Frontend (Terminal 2)
cd frontend
pnpm dev
```

### 🌐 URLs de Desarrollo

- **Frontend**: http://localhost:3001
- **API Backend**: http://127.0.0.1:8000
- **Documentación API**: http://127.0.0.1:8000/docs

## 🧪 Testing y Calidad

### Ejecutar Pruebas

```bash
cd frontend

# Type checking
pnpm run type-check

# Linting
pnpm run lint

# Tests
pnpm run test

# Coverage
pnpm run test:coverage

# Formateo
pnpm run format
```

### Pre-commit Hooks

```bash
# Instalar hooks (ya configurado)
pre-commit install

# Ejecutar manualmente
pre-commit run --all-files
```

## 🔌 Integración con API

### Endpoints Principales Consumidos

| Método | Endpoint                | Descripción      |
| ------ | ----------------------- | ---------------- |
| GET    | `/api/usuarios/`        | Listar usuarios  |
| POST   | `/api/usuarios/`        | Crear usuario    |
| GET    | `/api/canciones/`       | Listar canciones |
| GET    | `/api/canciones/buscar` | Buscar canciones |
| GET    | `/api/favoritos/`       | Listar favoritos |
| POST   | `/api/favoritos/`       | Marcar favorito  |

### Configuración de API

El cliente API está configurado en `lib/api-client.ts`:

```typescript
export const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})
```

## 📦 Scripts Disponibles

```bash
# Desarrollo
pnpm dev              # Servidor de desarrollo

# Producción
pnpm build            # Construir para producción
pnpm start            # Servidor de producción

# Calidad
pnpm lint             # Linting con ESLint
pnpm lint:fix         # Fix automático
pnpm format           # Formatear con Prettier
pnpm type-check       # Verificar tipos

# Testing
pnpm test             # Ejecutar tests
pnpm test:watch       # Tests en modo watch
pnpm test:coverage    # Coverage report

# Verificación completa
./run-checks.sh       # Todas las verificaciones
```

## 🛠️ Tecnologías Utilizadas

### Frontend

- **Next.js 16** - Framework React con App Router
- **TypeScript 5** - Tipado estático
- **Tailwind CSS 4** - Framework de CSS
- **Radix UI** - Componentes accesibles
- **Axios** - Cliente HTTP
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas

### Tooling

- **ESLint** - Linting de código
- **Prettier** - Formateo de código
- **Jest** - Testing framework
- **Testing Library** - Testing utilities
- **Pre-commit** - Git hooks

### Backend (lpa2-taller3)

- **FastAPI** - Framework Python
- **SQLModel** - ORM con Pydantic
- **SQLite** - Base de datos
- **Uvicorn** - Servidor ASGI

## 📝 Documentación Adicional

- [`PROMPT_OPTIMIZADO_V0.md`](PROMPT_OPTIMIZADO_V0.md) - Prompt usado para v0.app
- [`api_endpoints_para_v0.json`](api_endpoints_para_v0.json) - Documentación de endpoints
- [`REPORTE_COMPLETO_API_MUSICA.md`](REPORTE_COMPLETO_API_MUSICA.md) - Análisis completo de la API

## 👨‍💻 Desarrollo

**Desarrollador**: Juan Alejandro Ramirez Sanchez
**Curso**: Lenguajes de Programación Avanzados 2

---

⭐ **¡Dale una estrella al repo si te fue útil!**

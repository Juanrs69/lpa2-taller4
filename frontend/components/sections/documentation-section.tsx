'use client'

import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  Copy,
  ExternalLink,
  FileText,
  Database,
  Code2,
  Globe,
} from 'lucide-react'

const apiDocumentation = {
  informacion_general: {
    nombre: 'API de Música',
    version: '1.0.0',
    descripcion:
      'Una API RESTful para gestionar usuarios, canciones y favoritos',
    desarrollador: 'Juan Alejandro Ramirez Sanchez',
    tecnologias: ['FastAPI', 'SQLModel', 'Pydantic', 'SQLite'],
    puerto: 8000,
    host: '127.0.0.1',
    base_url: 'http://127.0.0.1:8000',
    documentacion_swagger: 'http://127.0.0.1:8000/docs',
    documentacion_redoc: 'http://127.0.0.1:8000/redoc',
  },
  endpoints: [
    {
      endpoint: 'http://127.0.0.1:8000/api',
      metodo: 'GET',
      descripcion: 'Información básica de la API',
      body_request: null,
      body_response: {
        message: 'Bienvenido a API de Música',
        version: '1.0.0',
        description:
          'Una API RESTful para gestionar usuarios, canciones y favoritos',
      },
    },
    {
      endpoint: 'http://127.0.0.1:8000/health',
      metodo: 'GET',
      descripcion: 'Health check de la API',
      body_request: null,
      body_response: {
        status: 'healthy',
        database: 'connected',
        environment: 'development',
      },
    },
    {
      endpoint: 'http://127.0.0.1:8000/api/usuarios/',
      metodo: 'GET',
      descripcion: 'Listar todos los usuarios con paginación',
      parametros_query: {
        skip: 'int (default: 0) - registros a saltar',
        limit: 'int (default: 100, max: 100) - máximo registros',
      },
      body_request: null,
      body_response: [
        {
          id: 1,
          nombre: 'Juan Pérez',
          correo: 'juan@email.com',
          fecha_registro: '2024-11-13T10:30:00',
        },
      ],
    },
    {
      endpoint: 'http://127.0.0.1:8000/api/usuarios/',
      metodo: 'POST',
      descripcion: 'Crear un nuevo usuario',
      body_request: {
        nombre: 'Juan Pérez (2-100 caracteres)',
        correo: 'juan@email.com (único)',
      },
      body_response: {
        id: 1,
        nombre: 'Juan Pérez',
        correo: 'juan@email.com',
        fecha_registro: '2024-11-13T10:30:00',
      },
    },
    {
      endpoint: 'http://127.0.0.1:8000/api/usuarios/{usuario_id}',
      metodo: 'GET',
      descripcion: 'Obtener un usuario por su ID',
      body_request: null,
      body_response: {
        id: 1,
        nombre: 'Juan Pérez',
        correo: 'juan@email.com',
        fecha_registro: '2024-11-13T10:30:00',
      },
    },
    {
      endpoint: 'http://127.0.0.1:8000/api/usuarios/{usuario_id}',
      metodo: 'PUT',
      descripcion: 'Actualizar un usuario existente',
      body_request: {
        nombre: 'Juan Carlos (opcional)',
        correo: 'juancarlos@email.com (opcional)',
      },
      body_response: {
        id: 1,
        nombre: 'Juan Carlos',
        correo: 'juancarlos@email.com',
        fecha_registro: '2024-11-13T10:30:00',
      },
    },
    {
      endpoint: 'http://127.0.0.1:8000/api/usuarios/{usuario_id}',
      metodo: 'DELETE',
      descripcion: 'Eliminar un usuario y todos sus favoritos',
      body_request: null,
      body_response: null,
      status_code: 204,
    },
    {
      endpoint: 'http://127.0.0.1:8000/api/canciones/',
      metodo: 'GET',
      descripcion: 'Listar todas las canciones con paginación',
      parametros_query: {
        skip: 'int (default: 0)',
        limit: 'int (default: 100, max: 100)',
      },
      body_request: null,
      body_response: [
        {
          id: 1,
          titulo: 'Bohemian Rhapsody',
          artista: 'Queen',
          album: 'A Night at the Opera',
          duracion: 354,
          año: 1975,
          genero: 'Rock',
          fecha_creacion: '2024-11-13T10:30:00',
        },
      ],
    },
    {
      endpoint: 'http://127.0.0.1:8000/api/canciones/',
      metodo: 'POST',
      descripcion: 'Crear una nueva canción',
      body_request: {
        titulo: 'Bohemian Rhapsody (1-200 caracteres)',
        artista: 'Queen (1-100 caracteres)',
        album: 'A Night at the Opera (1-200 caracteres)',
        duracion: '354 (1-3600 segundos)',
        año: '1975 (1900-2024)',
        genero: 'Rock (1-50 caracteres)',
      },
      body_response: {
        id: 1,
        titulo: 'Bohemian Rhapsody',
        artista: 'Queen',
        album: 'A Night at the Opera',
        duracion: 354,
        año: 1975,
        genero: 'Rock',
        fecha_creacion: '2024-11-13T10:30:00',
      },
    },
    {
      endpoint: 'http://127.0.0.1:8000/api/canciones/buscar',
      metodo: 'GET',
      descripcion: 'Buscar canciones por diferentes criterios',
      parametros_query: {
        titulo: 'string (opcional) - buscar por título',
        artista: 'string (opcional) - buscar por artista',
        genero: 'string (opcional) - buscar por género',
        año: 'int (opcional) - buscar por año exacto',
      },
      body_request: null,
      body_response: [
        {
          id: 1,
          titulo: 'Bohemian Rhapsody',
          artista: 'Queen',
          album: 'A Night at the Opera',
          duracion: 354,
          año: 1975,
          genero: 'Rock',
        },
      ],
    },
    {
      endpoint: 'http://127.0.0.1:8000/api/favoritos/',
      metodo: 'GET',
      descripcion: 'Listar todos los favoritos con paginación',
      body_request: null,
      body_response: [
        {
          id: 1,
          id_usuario: 1,
          id_cancion: 1,
          fecha_marcado: '2024-11-13T10:30:00',
          usuario: {
            id: 1,
            nombre: 'Juan Pérez',
            correo: 'juan@email.com',
          },
          cancion: {
            id: 1,
            titulo: 'Bohemian Rhapsody',
            artista: 'Queen',
            album: 'A Night at the Opera',
          },
        },
      ],
    },
    {
      endpoint: 'http://127.0.0.1:8000/api/favoritos/',
      metodo: 'POST',
      descripcion: 'Marcar una canción como favorita para un usuario',
      body_request: {
        id_usuario: 1,
        id_cancion: 1,
      },
      body_response: {
        id: 1,
        id_usuario: 1,
        id_cancion: 1,
        fecha_marcado: '2024-11-13T10:30:00',
      },
    },
    {
      endpoint: 'http://127.0.0.1:8000/api/favoritos/{favorito_id}',
      metodo: 'DELETE',
      descripcion: 'Eliminar un favorito (desmarcar como favorito)',
      body_request: null,
      body_response: null,
      status_code: 204,
    },
  ],
}

const methodColors = {
  GET: 'bg-green-100 text-green-800 border-green-300',
  POST: 'bg-blue-100 text-blue-800 border-blue-300',
  PUT: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  DELETE: 'bg-red-100 text-red-800 border-red-300',
}

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
}

export default function DocumentationSection() {
  const [activeTab, setActiveTab] = useState('overview')

  const groupedEndpoints = apiDocumentation.endpoints.reduce(
    (acc, endpoint) => {
      const resource = endpoint.endpoint.split('/')[4] || 'general'
      if (!acc[resource]) acc[resource] = []
      acc[resource].push(endpoint)
      return acc
    },
    {} as Record<string, typeof apiDocumentation.endpoints>
  )

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <FileText className="h-10 w-10 text-blue-600" />
          Documentación API de Música
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          {apiDocumentation.informacion_general.descripcion}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold">Base URL</h3>
              </div>
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                {apiDocumentation.informacion_general.base_url}
              </code>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Code2 className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold">Versión</h3>
              </div>
              <Badge variant="outline">
                {apiDocumentation.informacion_general.version}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Database className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold">Tecnologías</h3>
              </div>
              <div className="flex flex-wrap gap-1">
                {apiDocumentation.informacion_general.tecnologias.map(tech => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Información General</TabsTrigger>
          <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
          <TabsTrigger value="canciones">Canciones</TabsTrigger>
          <TabsTrigger value="favoritos">Favoritos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Enlaces de Documentación Interactiva</CardTitle>
              <CardDescription>
                Accede a la documentación completa e interactiva de la API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open(
                      apiDocumentation.informacion_general
                        .documentacion_swagger,
                      '_blank'
                    )
                  }
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Swagger UI - /docs
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open(
                      apiDocumentation.informacion_general.documentacion_redoc,
                      '_blank'
                    )
                  }
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  ReDoc - /redoc
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Endpoints Principales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <Badge className={methodColors.GET}>GET</Badge>
                    <span className="ml-3 font-mono">/api</span>
                    <span className="ml-3 text-gray-600">
                      Información de la API
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <Badge className={methodColors.GET}>GET</Badge>
                    <span className="ml-3 font-mono">/health</span>
                    <span className="ml-3 text-gray-600">Health check</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <Badge className={methodColors.GET}>GET</Badge>
                    <span className="ml-3 font-mono">/api/usuarios/</span>
                    <span className="ml-3 text-gray-600">Listar usuarios</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <Badge className={methodColors.GET}>GET</Badge>
                    <span className="ml-3 font-mono">/api/canciones/</span>
                    <span className="ml-3 text-gray-600">Listar canciones</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <Badge className={methodColors.GET}>GET</Badge>
                    <span className="ml-3 font-mono">/api/favoritos/</span>
                    <span className="ml-3 text-gray-600">Listar favoritos</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Usuarios Endpoints */}
        <TabsContent value="usuarios" className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {groupedEndpoints.usuarios?.map((endpoint, index) => (
              <AccordionItem
                value={`usuarios-${index}`}
                key={`usuarios-${index}`}
              >
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <Badge
                      className={
                        methodColors[
                          endpoint.metodo as keyof typeof methodColors
                        ]
                      }
                    >
                      {endpoint.metodo}
                    </Badge>
                    <code className="text-sm">
                      {endpoint.endpoint.replace('http://127.0.0.1:8000', '')}
                    </code>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 p-4">
                    <p className="text-gray-700">{endpoint.descripcion}</p>

                    {endpoint.parametros_query && (
                      <div>
                        <h4 className="font-semibold mb-2">
                          Parámetros de Query:
                        </h4>
                        <pre className="bg-gray-100 p-3 rounded text-sm">
                          {JSON.stringify(endpoint.parametros_query, null, 2)}
                        </pre>
                      </div>
                    )}

                    {endpoint.body_request && (
                      <div>
                        <h4 className="font-semibold mb-2">Request Body:</h4>
                        <pre className="bg-blue-50 p-3 rounded text-sm">
                          {JSON.stringify(endpoint.body_request, null, 2)}
                        </pre>
                      </div>
                    )}

                    {endpoint.body_response && (
                      <div>
                        <h4 className="font-semibold mb-2">Response:</h4>
                        <pre className="bg-green-50 p-3 rounded text-sm">
                          {JSON.stringify(endpoint.body_response, null, 2)}
                        </pre>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(endpoint.endpoint)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copiar URL
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        {/* Canciones Endpoints */}
        <TabsContent value="canciones" className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {groupedEndpoints.canciones?.map((endpoint, index) => (
              <AccordionItem
                value={`canciones-${index}`}
                key={`canciones-${index}`}
              >
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <Badge
                      className={
                        methodColors[
                          endpoint.metodo as keyof typeof methodColors
                        ]
                      }
                    >
                      {endpoint.metodo}
                    </Badge>
                    <code className="text-sm">
                      {endpoint.endpoint.replace('http://127.0.0.1:8000', '')}
                    </code>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 p-4">
                    <p className="text-gray-700">{endpoint.descripcion}</p>

                    {endpoint.parametros_query && (
                      <div>
                        <h4 className="font-semibold mb-2">
                          Parámetros de Query:
                        </h4>
                        <pre className="bg-gray-100 p-3 rounded text-sm">
                          {JSON.stringify(endpoint.parametros_query, null, 2)}
                        </pre>
                      </div>
                    )}

                    {endpoint.body_request && (
                      <div>
                        <h4 className="font-semibold mb-2">Request Body:</h4>
                        <pre className="bg-blue-50 p-3 rounded text-sm">
                          {JSON.stringify(endpoint.body_request, null, 2)}
                        </pre>
                      </div>
                    )}

                    {endpoint.body_response && (
                      <div>
                        <h4 className="font-semibold mb-2">Response:</h4>
                        <pre className="bg-green-50 p-3 rounded text-sm">
                          {JSON.stringify(endpoint.body_response, null, 2)}
                        </pre>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(endpoint.endpoint)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copiar URL
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        {/* Favoritos Endpoints */}
        <TabsContent value="favoritos" className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {groupedEndpoints.favoritos?.map((endpoint, index) => (
              <AccordionItem
                value={`favoritos-${index}`}
                key={`favoritos-${index}`}
              >
                <AccordionTrigger className="text-left">
                  <div className="flex items-center gap-3">
                    <Badge
                      className={
                        methodColors[
                          endpoint.metodo as keyof typeof methodColors
                        ]
                      }
                    >
                      {endpoint.metodo}
                    </Badge>
                    <code className="text-sm">
                      {endpoint.endpoint.replace('http://127.0.0.1:8000', '')}
                    </code>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 p-4">
                    <p className="text-gray-700">{endpoint.descripcion}</p>

                    {endpoint.body_request && (
                      <div>
                        <h4 className="font-semibold mb-2">Request Body:</h4>
                        <pre className="bg-blue-50 p-3 rounded text-sm">
                          {JSON.stringify(endpoint.body_request, null, 2)}
                        </pre>
                      </div>
                    )}

                    {endpoint.body_response && (
                      <div>
                        <h4 className="font-semibold mb-2">Response:</h4>
                        <pre className="bg-green-50 p-3 rounded text-sm">
                          {JSON.stringify(endpoint.body_response, null, 2)}
                        </pre>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(endpoint.endpoint)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copiar URL
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  )
}

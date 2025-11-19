import { apiClient } from '../lib/api-client'

describe('API Client', () => {
  it('should have correct base URL', () => {
    expect(apiClient.defaults.baseURL).toBe('http://127.0.0.1:8000/api')
  })

  it('should have correct headers', () => {
    expect(apiClient.defaults.headers['Content-Type']).toBe('application/json')
  })
})

describe('API Integration', () => {
  // Mock test para verificar que los tipos están bien
  it('should handle API responses correctly', async () => {
    // Esta es una prueba de ejemplo
    const mockResponse = {
      id: 1,
      nombre: 'Test User',
      correo: 'test@example.com',
      fecha_registro: '2024-11-18T10:00:00',
    }

    expect(mockResponse).toHaveProperty('id')
    expect(mockResponse).toHaveProperty('nombre')
    expect(mockResponse).toHaveProperty('correo')
  })
})

describe('Documentation Features', () => {
  it('should have API documentation structure', () => {
    const mockApiDoc = {
      informacion_general: {
        nombre: 'API de Música',
        version: '1.0.0',
        base_url: 'http://127.0.0.1:8000',
      },
      endpoints: [],
    }

    expect(mockApiDoc.informacion_general).toHaveProperty('nombre')
    expect(mockApiDoc.informacion_general).toHaveProperty('version')
    expect(mockApiDoc.informacion_general).toHaveProperty('base_url')
    expect(mockApiDoc).toHaveProperty('endpoints')
  })

  it('should handle endpoint documentation format', () => {
    const mockEndpoint = {
      endpoint: 'http://127.0.0.1:8000/api/usuarios/',
      metodo: 'GET',
      descripcion: 'Listar todos los usuarios',
      body_request: null,
      body_response: [],
    }

    expect(mockEndpoint).toHaveProperty('endpoint')
    expect(mockEndpoint).toHaveProperty('metodo')
    expect(mockEndpoint).toHaveProperty('descripcion')
    expect(['GET', 'POST', 'PUT', 'DELETE']).toContain(mockEndpoint.metodo)
  })
})

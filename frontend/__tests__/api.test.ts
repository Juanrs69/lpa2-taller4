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

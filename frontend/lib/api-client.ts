import axios from 'axios'

export const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 500) {
      console.error('[v0] Server error:', error.response.data)
    }
    return Promise.reject(error)
  }
)

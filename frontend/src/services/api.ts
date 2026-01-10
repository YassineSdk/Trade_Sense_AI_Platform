import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@store/authStore'

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
const API_TIMEOUT = 30000 // 30 seconds

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { accessToken } = useAuthStore.getState()

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Handle token refresh
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    // If error is 401 and we haven't retried yet, try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const { refreshToken } = useAuthStore.getState()

        if (!refreshToken) {
          throw new Error('No refresh token available')
        }

        // Call refresh token endpoint
        const response = await axios.post(`${API_BASE_URL}/api/v1/auth/refresh`, {
          refresh_token: refreshToken,
        })

        const { access_token, refresh_token } = response.data.data

        // Update tokens in store
        useAuthStore.getState().setTokens(access_token, refresh_token)

        // Retry original request with new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access_token}`
        }

        return apiClient(originalRequest)
      } catch (refreshError) {
        // Refresh failed, logout user
        useAuthStore.getState().logout()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  error?: string
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T = any> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    per_page: number
    total: number
    pages: number
    has_next: boolean
    has_prev: boolean
  }
}

// Error handling helper
export const handleApiError = (error: any): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiResponse>

    if (axiosError.response) {
      // Server responded with error
      const { data } = axiosError.response

      if (data?.error) {
        return data.error
      }

      if (data?.message) {
        return data.message
      }

      if (data?.errors) {
        // Handle validation errors
        const errorMessages = Object.values(data.errors).flat()
        return errorMessages.join(', ')
      }

      return `Server error: ${axiosError.response.status}`
    } else if (axiosError.request) {
      // Request made but no response
      return 'Network error. Please check your connection.'
    } else {
      // Error setting up request
      return axiosError.message
    }
  }

  return 'An unexpected error occurred'
}

// Authentication API
export const authApi = {
  // Register new user
  register: async (data: {
    email: string
    username: string
    password: string
    first_name: string
    last_name: string
  }): Promise<ApiResponse> => {
    const response = await apiClient.post('/api/v1/auth/register', data)
    return response.data
  },

  // Login user
  login: async (data: {
    email: string
    password: string
  }): Promise<ApiResponse> => {
    const response = await apiClient.post('/api/v1/auth/login', data)
    return response.data
  },

  // Logout user
  logout: async (): Promise<ApiResponse> => {
    const response = await apiClient.post('/api/v1/auth/logout')
    return response.data
  },

  // Refresh access token
  refreshToken: async (refreshToken: string): Promise<ApiResponse> => {
    const response = await apiClient.post('/api/v1/auth/refresh', {
      refresh_token: refreshToken,
    })
    return response.data
  },

  // Request password reset
  forgotPassword: async (email: string): Promise<ApiResponse> => {
    const response = await apiClient.post('/api/v1/auth/forgot-password', { email })
    return response.data
  },

  // Reset password with token
  resetPassword: async (data: {
    token: string
    password: string
  }): Promise<ApiResponse> => {
    const response = await apiClient.post('/api/v1/auth/reset-password', data)
    return response.data
  },

  // Verify email
  verifyEmail: async (token: string): Promise<ApiResponse> => {
    const response = await apiClient.post('/api/v1/auth/verify-email', { token })
    return response.data
  },

  // Resend verification email
  resendVerification: async (email: string): Promise<ApiResponse> => {
    const response = await apiClient.post('/api/v1/auth/resend-verification', { email })
    return response.data
  },
}

// User API
export const userApi = {
  // Get current user profile
  getProfile: async (): Promise<ApiResponse> => {
    const response = await apiClient.get('/api/v1/users/me')
    return response.data
  },

  // Update user profile
  updateProfile: async (data: Partial<{
    first_name: string
    last_name: string
    phone_number: string
  }>): Promise<ApiResponse> => {
    const response = await apiClient.put('/api/v1/users/me', data)
    return response.data
  },

  // Change password
  changePassword: async (data: {
    current_password: string
    new_password: string
  }): Promise<ApiResponse> => {
    const response = await apiClient.post('/api/v1/users/change-password', data)
    return response.data
  },

  // Delete account
  deleteAccount: async (password: string): Promise<ApiResponse> => {
    const response = await apiClient.delete('/api/v1/users/me', {
      data: { password },
    })
    return response.data
  },
}

// Health Check API
export const healthApi = {
  check: async (): Promise<ApiResponse> => {
    const response = await apiClient.get('/health')
    return response.data
  },
}

// Trading Account API (placeholder for future implementation)
export const tradingAccountApi = {
  getAll: async (): Promise<PaginatedResponse> => {
    const response = await apiClient.get('/api/v1/accounts')
    return response.data
  },

  getById: async (id: string): Promise<ApiResponse> => {
    const response = await apiClient.get(`/api/v1/accounts/${id}`)
    return response.data
  },

  create: async (data: any): Promise<ApiResponse> => {
    const response = await apiClient.post('/api/v1/accounts', data)
    return response.data
  },

  update: async (id: string, data: any): Promise<ApiResponse> => {
    const response = await apiClient.put(`/api/v1/accounts/${id}`, data)
    return response.data
  },

  delete: async (id: string): Promise<ApiResponse> => {
    const response = await apiClient.delete(`/api/v1/accounts/${id}`)
    return response.data
  },
}

// Trade API (placeholder for future implementation)
export const tradeApi = {
  getAll: async (params?: any): Promise<PaginatedResponse> => {
    const response = await apiClient.get('/api/v1/trades', { params })
    return response.data
  },

  getById: async (id: string): Promise<ApiResponse> => {
    const response = await apiClient.get(`/api/v1/trades/${id}`)
    return response.data
  },

  create: async (data: any): Promise<ApiResponse> => {
    const response = await apiClient.post('/api/v1/trades', data)
    return response.data
  },

  update: async (id: string, data: any): Promise<ApiResponse> => {
    const response = await apiClient.put(`/api/v1/trades/${id}`, data)
    return response.data
  },

  close: async (id: string): Promise<ApiResponse> => {
    const response = await apiClient.post(`/api/v1/trades/${id}/close`)
    return response.data
  },
}

// Challenge API (placeholder for future implementation)
export const challengeApi = {
  getAll: async (): Promise<PaginatedResponse> => {
    const response = await apiClient.get('/api/v1/challenges')
    return response.data
  },

  getById: async (id: string): Promise<ApiResponse> => {
    const response = await apiClient.get(`/api/v1/challenges/${id}`)
    return response.data
  },

  enroll: async (id: string): Promise<ApiResponse> => {
    const response = await apiClient.post(`/api/v1/challenges/${id}/enroll`)
    return response.data
  },
}

// Leaderboard API (placeholder for future implementation)
export const leaderboardApi = {
  getGlobal: async (params?: any): Promise<PaginatedResponse> => {
    const response = await apiClient.get('/api/v1/leaderboard', { params })
    return response.data
  },

  getByChallenge: async (challengeId: string, params?: any): Promise<PaginatedResponse> => {
    const response = await apiClient.get(`/api/v1/leaderboard/challenge/${challengeId}`, { params })
    return response.data
  },
}

// Export the main client for custom requests
export default apiClient

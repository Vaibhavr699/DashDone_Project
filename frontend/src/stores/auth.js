import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || sessionStorage.getItem('token') || null)
  const loading = ref(false)
  const error = ref(null)

  const setAuth = (userData, authToken, remember = true) => {
    user.value = userData
    token.value = authToken
    if (remember) {
      localStorage.setItem('token', authToken)
      localStorage.setItem('rememberMe', 'true')
    } else {
      sessionStorage.setItem('token', authToken)
    }
  }

  const clearAuth = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('rememberMe')
    sessionStorage.removeItem('token')
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password) => {
    const errors = []
    if (password.length < 6) errors.push('Password must be at least 6 characters')
    return errors
  }

  const signUp = async (email, password, name = '') => {
    const toast = useToast()
    loading.value = true
    error.value = null
    
    // Validate email
    if (!validateEmail(email)) {
      error.value = 'Please enter a valid email address'
      loading.value = false
      toast.error(error.value)
      throw new Error(error.value)
    }
    
    // Validate password
    const passwordErrors = validatePassword(password)
    if (passwordErrors.length > 0) {
      error.value = passwordErrors[0]
      loading.value = false
      toast.error(error.value)
      throw new Error(error.value)
    }
    
    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        toast.error(errorData.error || 'Registration failed')
        throw new Error(errorData.error || 'Registration failed')
      }

      const data = await response.json()
      
      return data.user
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const signIn = async (email, password, remember = true) => {
    const toast = useToast()
    loading.value = true
    error.value = null
    
    // Validate email
    if (!validateEmail(email)) {
      error.value = 'Please enter a valid email address'
      loading.value = false
      toast.error(error.value)
      throw new Error(error.value)
    }
    
    if (!password || password.length < 1) {
      error.value = 'Password is required'
      loading.value = false
      toast.error(error.value)
      throw new Error(error.value)
    }
    
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        
        throw new Error(data.error || 'Login failed check your email and password')
      }

      setAuth(data.user, data.token, remember)
      
      return data.user
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const decodeToken = (token) => {
    try {
      const payload = token.split('.')[1]
      const decoded = JSON.parse(atob(payload))
      return decoded
    } catch (error) {
      return null
    }
  }

  const isTokenExpired = (token) => {
    try {
      const decoded = decodeToken(token)
      if (!decoded || !decoded.exp) return true
      
      const currentTime = Math.floor(Date.now() / 1000)
      return decoded.exp < currentTime
    } catch (error) {
      return true
    }
  }

  const checkAuth = async () => {
    let storedToken = localStorage.getItem('token') || sessionStorage.getItem('token')
    if (!storedToken) {
      clearAuth()
      return false
    }

    // Check if token is expired
    if (isTokenExpired(storedToken)) {
      const toast = useToast()
      toast.info('Your session has expired. Please log in again.')
      clearAuth()
      return false
    }

    try {
      // Verify token with backend
      const response = await fetch('http://localhost:3001/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${storedToken}`
        }
      })

      if (response.ok) {
        const userData = await response.json()
        user.value = userData
        token.value = storedToken
        return true
      } else {
        clearAuth()
        return false
      }
    } catch (error) {
      console.error('Auth check error:', error)
      const toast = useToast()
      toast.error('Session verification failed. Please log in again.')
      clearAuth()
      return false
    }
  }

  const logout = async () => {
    const toast = useToast()
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token')
      if (token) {
        await fetch('http://localhost:3001/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
      }
      toast.success('Logged out successfully!')
    } catch (err) {
      console.error('Logout request failed:', err)
      toast.warning('Logged out locally. Some session data may remain on server.')
    } finally {
      clearAuth()
    }
  }

  // Computed properties
  const isAuthenticated = computed(() => !!user.value && !!token.value)

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    setAuth,
    clearAuth,
    signUp,
    signIn,
    logout,
    checkAuth,
    isTokenExpired,
    validatePassword,
  }
})
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'

export const useAuth = () => {
  const authStore = useAuthStore()
  const isAuthenticated = ref(false)
  const checkingAuth = ref(true)

  onMounted(() => {
    authStore.checkAuth()
    isAuthenticated.value = !!authStore.user
    checkingAuth.value = false
  })

  return { 
    isAuthenticated, 
    checkingAuth,
    user: authStore.user,
    loading: authStore.loading,
    error: authStore.error,
    signUp: authStore.signUp,
    signIn: authStore.signIn,
    logout: authStore.logout
  }
}
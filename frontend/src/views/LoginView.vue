<template>

  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 to-gray-800 px-4">
  <router-link to="/" class="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors">
        <p class="hover:underline underline-offset-4 text-lg"> &larr; Back To Home</p>
      </router-link>
    <div class="w-full max-w-md bg-gray-900 border border-gray-800 p-8 rounded-xl shadow-2xl relative">
      

      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold text-white mb-2">Welcome Back</h1>
        <p class="text-gray-400">Sign in to your account</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            placeholder="you@example.com"
            class="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-300 mb-1">Password</label>
          <div class="relative">
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              required
              placeholder="••••••••"
              class="w-full px-4 py-2 pr-10 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
        </div>

        <div class="flex items-center justify-between text-sm">
          <label for="rememberMe" class="flex items-center gap-2 text-gray-300">
            <input
              id="rememberMe"
              type="checkbox"
              v-model="rememberMe"
              class="cursor-pointer h-4 w-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
            />
            Remember me
          </label>
          <button type="button" class="cursor-pointer text-blue-400 hover:underline">Forgot password?</button>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="cursor-pointer w-full py-3 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="!loading">Sign In</span>
          <span v-else class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24" fill="none">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z" />
            </svg>
            Signing in...
          </span>
        </button>

        <div class="text-center text-sm text-gray-400 mt-6">
          Don't have an account?
          <router-link to="/register" class="text-blue-400 font-medium hover:underline">Create one</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useToast } from 'vue-toastification'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const form = ref({
  email: '',
  password: ''
})
const rememberMe = ref(false)
const showPassword = ref(false)
const loading = ref(false)

const handleLogin = async () => {
  try {
    loading.value = true
    await authStore.signIn(form.value.email, form.value.password, rememberMe.value)

    toast.success('Login successful! Welcome back!')
    router.push('/dashboard')
  } catch (error) {
    toast.error(error.message || 'Login failed. Please check your credentials and try again.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* You can add extra global styles here if needed */
</style>
<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 to-gray-800 px-4">
  <router-link to="/" class="absolute top-4 left-4 text-gray-400 hover:text-white transition-colors">
        <p class="hover:underline underline-offset-4 text-lg"> &larr; Back To Home</p>
      </router-link>
    <div class="w-full max-w-md bg-gray-900 border border-gray-800 p-8 rounded-xl shadow-2xl">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold text-white mb-2">Create Account</h1>
        <p class="text-gray-400">Sign up to get started</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-6">
        <div>
          <label for="fullName" class="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
          <input
            id="fullName"
            v-model="form.fullName"
            type="text"
            required
            placeholder="John Doe"
            class="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

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
          
          <div v-if="form.password" class="mt-2 text-sm space-y-1">
            <p :class="[isLengthValid ? 'text-green-400' : 'text-red-400']" class="flex items-center gap-2">
              <i :class="[isLengthValid ? 'fas fa-check' : 'fas fa-times']"></i>
              <span>At least 6 characters</span>
            </p>
            <p :class="[hasNumber ? 'text-green-400' : 'text-red-400']" class="flex items-center gap-2">
              <i :class="[hasNumber ? 'fas fa-check' : 'fas fa-times']"></i>
              <span>At least one number</span>
            </p>
            <p :class="[hasSpecialChar ? 'text-green-400' : 'text-red-400']" class="flex items-center gap-2">
              <i :class="[hasSpecialChar ? 'fas fa-check' : 'fas fa-times']"></i>
              <span>At least one special character</span>
            </p>
          </div>
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
          <input
            id="confirmPassword"
            v-model="form.confirmPassword"
            type="password"
            required
            placeholder="••••••••"
            class="w-full px-4 py-2 rounded-lg bg-gray-800 border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="[passwordsMatch === false ? 'border-red-500' : 'border-gray-700']"
          />
          <p v-if="passwordsMatch === false" class="text-xs text-red-400 mt-1">Passwords do not match</p>
        </div>

        <div class="flex items-center gap-2 text-gray-300 text-sm">
          <input
            id="agreeTerms"
            v-model="agreeTerms"
            type="checkbox"
            required
            class="cursor-pointer h-4 w-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
          />
          <label for="agreeTerms">I agree to the Terms and Privacy Policy</label>
        </div>

        <button
          type="submit"
          :disabled="loading || !isValidForm"
          class="cursor-pointer w-full py-3 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="!loading">Create Account</span>
          <span v-else class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24" fill="none">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z" />
            </svg>
            Creating account...
          </span>
        </button>
      </form>

      <div class="text-center text-sm text-gray-400 mt-6">
        Already have an account?
        <router-link to="/login" class="text-blue-400 font-medium hover:underline">Sign in</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useToast } from 'vue-toastification'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const form = ref({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: ''
})
const agreeTerms = ref(false)
const showPassword = ref(false)
const loading = ref(false)

// Password validation checks
const isLengthValid = computed(() => form.value.password.length >= 6)
const hasNumber = computed(() => /\d/.test(form.value.password))
const hasSpecialChar = computed(() => /[!@#$%^&*(),.?":{}|<>]/.test(form.value.password))
const passwordsMatch = computed(() => form.value.password === form.value.confirmPassword)

const isValidForm = computed(() => {
  return form.value.fullName.trim() &&
         form.value.email.includes('@') &&
         isLengthValid.value &&
         hasNumber.value &&
         hasSpecialChar.value &&
         passwordsMatch.value &&
         agreeTerms.value
})

const handleRegister = async () => {
  try {
    loading.value = true

    if (!passwordsMatch.value) {
      toast.error('Passwords do not match')
      return
    }

    if (!isValidForm.value) {
      toast.error('Please fill in all fields correctly')
      return
    }

    await authStore.signUp(form.value.email, form.value.password, form.value.fullName.trim())

    toast.success('Registration successful! Welcome aboard! 🎉')
    router.push('/login')
  } catch (error) {
    toast.error(error.message || 'Registration failed. Please try again.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Scoped styles are handled by Tailwind CSS */
</style>
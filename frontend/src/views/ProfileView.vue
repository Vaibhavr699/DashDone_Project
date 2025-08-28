<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Navigation Header -->
    <nav class="bg-white dark:bg-gray-800 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">✓</span>
              </div>
            </div>
            <div class="ml-4">
              <h1 class="text-xl font-bold text-gray-900 dark:text-white">DashDone</h1>
              <p class="text-xs text-gray-500 dark:text-gray-400">Your productivity companion</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <div class="text-sm text-gray-700 dark:text-gray-300">
              Welcome, <span class="font-medium">{{ user?.name || 'User' }}</span>
            </div>
            <router-link to="/dashboard" class="px-4 py-2 text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors">
              Back to Dashboard
            </router-link>
            <button
              @click="handleLogout"
              class="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-lg font-medium text-gray-900 dark:text-white">Profile Settings</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">Manage your account information and preferences</p>
          </div>

          <div class="p-6">
            <!-- User Info Section -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 class="text-md font-medium text-gray-900 dark:text-white mb-4">Personal Information</h3>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                    <input
                      v-model="profileForm.name"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                    <input
                      v-model="profileForm.email"
                      type="email"
                      disabled
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                    />
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Email cannot be changed</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Account Created</label>
                    <p class="text-gray-900 dark:text-white">{{ formatDate(user?.createdAt) }}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 class="text-md font-medium text-gray-900 dark:text-white mb-4">Statistics</h3>
                <div class="space-y-4">
                  <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span class="text-sm text-gray-700 dark:text-gray-300">Total Tasks</span>
                    <span class="font-medium text-gray-900 dark:text-white">{{ stats.totalTodos }}</span>
                  </div>
                  <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span class="text-sm text-gray-700 dark:text-gray-300">Completed Tasks</span>
                    <span class="font-medium text-green-600">{{ stats.completedTodos }}</span>
                  </div>
                  <div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span class="text-sm text-gray-700 dark:text-gray-300">Completion Rate</span>
                    <span class="font-medium text-blue-600">{{ stats.completionRate }}%</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="mt-8 flex gap-4">
              <button
                @click="saveProfile"
                :disabled="!hasChanges || loading"
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {{ loading ? 'Saving...' : 'Save Changes' }}
              </button>
              <button
                @click="resetForm"
                :disabled="!hasChanges"
                class="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Reset
              </button>
            </div>

            <!-- Danger Zone -->
            <div class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
              <h3 class="text-md font-medium text-red-600 dark:text-red-400 mb-4">Danger Zone</h3>
              <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div class="flex justify-between items-center">
                  <div>
                    <p class="text-sm font-medium text-red-900 dark:text-red-100">Delete Account</p>
                    <p class="text-xs text-red-600 dark:text-red-300 mt-1">Once you delete your account, there is no going back. All your data will be permanently removed.</p>
                  </div>
                  <button
                    @click="showDeleteModal = true"
                    class="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 border border-red-300 dark:border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Confirm Account Deletion</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
        </p>
        <div class="flex gap-4 justify-end">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="deleteAccount"
            :disabled="loading"
            class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {{ loading ? 'Deleting...' : 'Delete Account' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useToast } from 'vue-toastification'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const user = computed(() => authStore.user)
const profileForm = ref({
  name: '',
  email: ''
})
const originalForm = ref({
  name: '',
  email: ''
})
const stats = ref({
  totalTodos: 0,
  completedTodos: 0,
  completionRate: 0
})
const loading = ref(false)
const showDeleteModal = ref(false)

const hasChanges = computed(() => {
  return profileForm.value.name !== originalForm.value.name
})

const fetchStats = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/todos', {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })
    
    if (response.ok) {
      const todos = await response.json()
      stats.value.totalTodos = todos.length
      stats.value.completedTodos = todos.filter(t => t.completed).length
      stats.value.completionRate = todos.length > 0 
        ? Math.round((stats.value.completedTodos / stats.value.totalTodos) * 100) 
        : 0
    }
  } catch (error) {
    console.error('Failed to fetch stats:', error)
  }
}

const saveProfile = async () => {
  try {
    loading.value = true
    // In a real app, this would call an API endpoint
    toast.success('Profile updated successfully!')
    originalForm.value.name = profileForm.value.name
  } catch (error) {
    toast.error('Failed to update profile')
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  profileForm.value.name = originalForm.value.name
}

const deleteAccount = async () => {
  try {
    loading.value = true
    // In a real app, this would call an API endpoint
    toast.success('Account deleted successfully')
    authStore.clearAuth()
    router.push('/')
  } catch (error) {
    toast.error('Failed to delete account')
  } finally {
    loading.value = false
    showDeleteModal.value = false
  }
}

const handleLogout = async () => {
  try {
    await authStore.logout()
    toast.success('Logged out successfully')
    router.push('/login')
  } catch (error) {
    toast.error('Failed to logout')
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  fetchStats()
  profileForm.value.name = user.value?.name || ''
  profileForm.value.email = user.value?.email || ''
  originalForm.value.name = user.value?.name || ''
  originalForm.value.email = user.value?.email || ''
})
</script>
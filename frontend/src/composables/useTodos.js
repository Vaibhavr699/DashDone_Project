import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '../stores/auth'

export const useTodos = () => {
  const authStore = useAuthStore()
  const todos = ref([])
  const loading = ref(false)
  const error = ref(null)
  const filter = ref('all')

  const API_URL = 'http://localhost:3001/api'

  const getAuthHeaders = () => {
    const token = authStore.token
    if (!token) throw new Error('User not authenticated')
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  }

  const fetchTodos = async () => {
    loading.value = true
    error.value = null
    try {
      const headers = getAuthHeaders()
      const response = await fetch(`${API_URL}/todos`, {
        headers,
      })
      if (!response.ok) throw new Error('Failed to fetch todos')
      todos.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const addTodo = async (todo) => {
    const toast = useToast()
    loading.value = true
    error.value = null
    try {
      const headers = getAuthHeaders()
      const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers,
        body: JSON.stringify(todo),
      })
      if (!response.ok) throw new Error('Failed to add todo')
      const newTodo = await response.json()
      todos.value.unshift(newTodo)
      toast.success('Task added successfully!')
      return newTodo
    } catch (err) {
      error.value = err.message
      toast.error(err.message || 'Failed to add task')
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateTodo = async (id, updates) => {
    const toast = useToast()
    loading.value = true
    error.value = null
    try {
      const headers = getAuthHeaders()
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updates),
      })
      if (!response.ok) throw new Error('Failed to update todo')
      const updatedTodo = await response.json()
      const index = todos.value.findIndex(t => t.id === id)
      if (index !== -1) {
        todos.value[index] = updatedTodo
      }
      
      if (updates.completed !== undefined) {
        toast.success(updates.completed ? 'Task marked as completed!' : 'Task marked as incomplete!')
      } else {
        toast.success('Task updated successfully!')
      }
      
      return updatedTodo
    } catch (err) {
      error.value = err.message
      toast.error(err.message || 'Failed to update task')
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteTodo = async (id) => {
    const toast = useToast()
    loading.value = true
    error.value = null
    try {
      const headers = getAuthHeaders()
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
        headers,
      })
      if (!response.ok) throw new Error('Failed to delete todo')
      todos.value = todos.value.filter(t => t.id !== id)
      toast.success('Task deleted successfully!')
    } catch (err) {
      error.value = err.message
      toast.error(err.message || 'Failed to delete task')
      throw err
    } finally {
      loading.value = false
    }
  }

  const filteredTodos = () => {
    switch (filter.value) {
      case 'active':
        return todos.value.filter(t => !t.completed)
      case 'completed':
        return todos.value.filter(t => t.completed)
      default:
        return todos.value
    }
  }

  return {
    todos,
    loading,
    error,
    filter,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    filteredTodos,
  }
}
<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 transition-colors duration-500">
    <!-- Navigation Header -->
    <nav class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 shadow-lg">
      <div class="max-w-full mx-auto px-3 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 sm:h-20">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-white/30 to-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-2xl">
                <span class="text-white font-bold text-lg">✓</span>
              </div>
            </div>
            <div class="ml-3 sm:ml-4">
              <h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white tracking-wider">DashDone</h1>
              <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-light">Your productivity companion</p>
            </div>
          </div>
            
          <div class="flex items-center space-x-2 sm:space-x-4">
            <div class="hidden sm:block text-sm text-gray-300">
              Welcome, <span class="font-semibold text-white">{{ user?.name || 'User' }}</span>
            </div>
            
            <button
              @click="handleLogout"
              class="cursor-pointer px-4 py-2 sm:px-5 sm:py-2.5 bg-red-400 text-sm sm:text-base font-semibold text-white bg-red-600 hover:bg-red-700 focus:bg-white/20 active:bg-white/30 rounded-2xl backdrop-blur-md transition-all duration-300 border border-white/10 hover:border-white/20 focus:ring-2 focus:ring-white/30 outline-none shadow-sm hover:shadow-md"
            >
              Logout
            </button>

          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-full mx-auto py-4 sm:py-6 lg:py-8 px-3 sm:px-6 lg:px-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <!-- Card 1 -->
        <div class="bg-gradient-to-br from-blue-500/20 to-indigo-600/20 dark:from-blue-500/10 dark:to-indigo-600/10 backdrop-blur-xl border border-blue-200/50 dark:border-blue-400/20 rounded-xl overflow-hidden hover:from-blue-500/30 hover:to-indigo-600/30 dark:hover:from-blue-500/20 dark:hover:to-indigo-600/20 transition-all duration-500 shadow-xl">
          <div class="p-4 sm:p-6">
            <div class="flex flex-col sm:flex-row items-center sm:items-start">
              <div class="flex-shrink-0 mb-2 sm:mb-0">
                <div class="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-white/30 to-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <span class="text-white text-xl sm:text-2xl">⚡</span>
                </div>
              </div>
              <div class="ml-0 sm:ml-4 flex-1 text-center sm:text-left">
                <p class="text-xs sm:text-sm font-light text-blue-400 dark:text-blue-300 uppercase tracking-wider mb-1">Total</p>
                <p class="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400">{{ stats.total }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl">
          <div class="p-4 sm:p-6">
            <div class="flex flex-col sm:flex-row items-center sm:items-start">
              <div class="flex-shrink-0 mb-2 sm:mb-0">
                <div class="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-400/30 to-green-600/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-green-400/20">
                  <span class="text-green-400 text-xl sm:text-2xl">✓</span>
                </div>
              </div>
              <div class="ml-0 sm:ml-4 flex-1 text-center sm:text-left">
                <p class="text-xs sm:text-sm font-light text-green-400 uppercase tracking-wider mb-1">Done</p>
                <p class="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-500">{{ stats.completed }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl">
          <div class="p-4 sm:p-6">
            <div class="flex flex-col sm:flex-row items-center sm:items-start">
              <div class="flex-shrink-0 mb-2 sm:mb-0">
                <div class="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-400/30 to-orange-600/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-orange-400/20">
                  <span class="text-orange-400 text-xl sm:text-2xl">○</span>
                </div>
              </div>
              <div class="ml-0 sm:ml-4 flex-1 text-center sm:text-left">
                <p class="text-xs sm:text-sm font-light text-orange-400 uppercase tracking-wider mb-1">Pending</p>
                <p class="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-500">{{ stats.pending }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <!-- Combined Filters and "New Task" Button Section -->
      <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl mb-6 sm:mb-8 shadow-2xl">
        <!-- Use flexbox to align content horizontally -->
        <div class="p-4 sm:p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <!-- Filters Section -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full md:w-3/4">
            <!-- Search Input -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2 tracking-wide">Search</label>
              <div class="relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search tasks..."
                  class="w-full px-4 py-3 sm:py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
                />
                <div class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <span class="text-lg">🔍</span>
                </div>
              </div>
            </div>
            <!-- Status Filter -->
            <div>
              <label class=" block text-sm font-medium text-gray-300 mb-2 tracking-wide">Status</label>
              <select
                v-model="statusFilter"
                class="cursor-pointer w-full px-4 py-3 sm:py-4 bg-white/5 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
              >
                <option value="all" class="bg-gray-900 text-white">All Tasks</option>
                <option value="pending" class="bg-gray-900 text-white">Pending</option>
                <option value="completed" class="bg-gray-900 text-white">Completed</option>
              </select>
            </div>
            <!-- Priority Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2 tracking-wide">Priority</label>
              <select
                v-model="priorityFilter"
                class="cursor-pointer w-full px-4 py-3 sm:py-4 bg-white/5 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
              >
                <option value="all" class="bg-gray-900 text-white">All Priorities</option>
                <option value="low" class="bg-gray-900 text-white">Low</option>
                <option value="medium" class="bg-gray-900 text-white">Medium</option>
                <option value="high" class="bg-gray-900 text-white">High</option>
              </select>
            </div>
            <!-- Sort By Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2 tracking-wide">Sort By</label>
              <select
                v-model="sortBy"
                class="cursor-pointer w-full px-4 py-3 sm:py-4 bg-white/5 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
              >
                <option value="createdAt" class="bg-gray-900 text-white">Created Date</option>
                <option value="dueDate" class="bg-gray-900 text-white">Due Date</option>
                <option value="title" class="bg-gray-900 text-white">Title</option>
                <option value="priority" class="bg-gray-900 text-white">Priority</option>
              </select>
            </div>
          </div>

          <!-- "New Task" Button -->
          <div class="flex-shrink-0 w-full md:w-auto items-center justify-center ">
            <button @click="showAddTaskModal = true" class="cursor-pointer flex items-center justify-center w-full md:w-auto gap-2 px-14 py-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl hover:from-blue-600 hover:to-indigo-700 shadow-lg transition-all duration-300 transform hover:scale-105">
              <span class="text-lg">+</span>
              <span class="font-medium">New Task</span>
            </button>
          </div>
            
        </div>
      </div>
      
      <!-- Add New Task Modal -->
      <div v-if="showAddTaskModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white/10 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl transform scale-100 transition-all duration-300 max-h-screen overflow-y-auto">
          <div class="flex items-center mb-6 sm:mb-8">
            <div class="w-8 h-8 bg-gradient-to-br from-white/30 to-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 mr-3 flex-shrink-0">
              <span class="text-white text-lg">✨</span>
            </div>
            <h3 class="text-xl sm:text-2xl font-light text-white tracking-wide truncate">Add New Task</h3>
          </div>
          <form @submit.prevent="addTodo" class="space-y-4 sm:space-y-6">
            <div>
              <label for="new-title" class="block text-sm font-medium text-gray-300 mb-2 tracking-wide">Title *</label>
              <input
                id="new-title"
                v-model="newTodo.title"
                type="text"
                required
                class="w-full px-4 py-2 sm:py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all duration-300 backdrop-blur-sm text-sm"
                placeholder="What needs to be done?"
              />
            </div>
            
            <div>
              <label for="new-priority" class="block text-sm font-medium text-gray-300 mb-2 tracking-wide">Priority</label>
              <select
                id="new-priority"
                v-model="newTodo.priority"
                class="cursor-pointer w-full px-4 py-2 sm:py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all duration-300 backdrop-blur-sm text-sm"
              >
                <option value="low" class="cursor-pointer bg-gray-900 text-white">Low Priority</option>
                <option value="medium" class="cursor-pointer bg-gray-900 text-white">Medium Priority</option>
                <option value="high" class="cursor-pointer bg-gray-900 text-white">High Priority</option>
              </select>
            </div>
            
            <div>
              <label for="new-description" class="block text-sm font-medium text-gray-300 mb-2 tracking-wide">Description</label>
              <textarea
                id="new-description"
                v-model="newTodo.description"
                rows="2"
                class="w-full px-4 py-2 sm:py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all duration-300 backdrop-blur-sm resize-none text-sm"
                placeholder="Add more details about this task..."
              ></textarea>
            </div>
            
            <div>
              <label for="new-dueDate" class="block text-sm font-medium text-gray-300 mb-2 tracking-wide">Due Date</label>
              <input
                id="new-dueDate"
                v-model="newTodo.dueDate"
                type="date"
                class="cursor-pointer w-full px-4 py-2 sm:py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all duration-300 backdrop-blur-sm text-sm"
              />
            </div>
            
            <div class="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-2">
              <button
                type="button"
                @click="showAddTaskModal = false"
                class="w-full sm:w-auto px-5 py-2 sm:py-2.5 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-gray-300 font-medium hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="cursor-pointer w-full sm:w-auto px-5 py-2 sm:py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all duration-300 transform hover:scale-105 text-sm"
              >
                ✨ Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <!-- Todo List -->
      <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
        <div class="p-4 sm:p-6 lg:p-8">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
            <div class="flex items-center">
              <div class="w-8 h-8 bg-gradient-to-br from-white/30 to-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 mr-3">
                <span class="text-white text-lg">📋</span>
              </div>
              <h2 class="text-xl sm:text-2xl font-light text-white tracking-wide">Your Tasks</h2>
            </div>
            <div class="flex gap-2 w-full sm:w-auto">
              <button
                @click="filter = 'all'"
                :class="filter === 'all' ? 'cursor-pointer bg-blue-500 text-white border-blue-500 shadow-lg' : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'"
                class="flex-1 sm:flex-none px-4 py-2 sm:py-3 rounded-2xl text-xs sm:text-sm font-medium border backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
              >
                All
              </button>
              <button
                @click="filter = 'pending'"
                :class="filter === 'pending' ? 'bg-orange-500 text-white border-orange-500 shadow-lg' : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'"
                class="cursor-pointer flex-1 sm:flex-none px-4 py-2 sm:py-3 rounded-2xl text-xs sm:text-sm font-medium border backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
              >
                Pending
              </button>
              <button
                @click="filter = 'completed'"
                :class="filter === 'completed' ? 'bg-green-500 text-white border-green-500 shadow-lg' : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'"
                class="cursor-pointer flex-1 sm:flex-none px-4 py-2 sm:py-3 rounded-2xl text-xs sm:text-sm font-medium border backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
              >
                Completed
              </button>
            </div>
          </div>

          <div v-if="filteredTodos.length === 0" class="text-center py-12 sm:py-20">
            <div class="text-gray-500 text-6xl sm:text-8xl mb-6 font-light">🎯</div>
            <h3 class="text-lg sm:text-xl font-light text-white mb-3 tracking-wide">No tasks found</h3>
            <p class="text-gray-400 font-light text-sm sm:text-base">{{ filter === 'all' ? 'Add your first task to get started!' : `No ${filter} tasks at the moment.` }}</p>
          </div>

          <div v-else class="space-y-4 sm:space-y-6">
            <div
              v-for="todo in filteredTodos"
              :key="todo.id"
              class="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-2xl sm:rounded-3xl p-4 sm:p-6 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-500 transform hover:scale-[1.01] shadow-lg"
            >
              <div class="flex items-start gap-3 sm:gap-4">
                <div class="flex-shrink-0 mt-1">
                  <input
                    type="checkbox"
                    :checked="todo.completed"
                    @change="toggleTodo(todo)"
                    class="w-5 h-5 sm:w-6 sm:h-6 bg-white/5 border-2 border-white/30 rounded-lg text-white focus:ring-2 focus:ring-white/40 focus:ring-offset-0 focus:ring-offset-transparent transition-all duration-300"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
                    <div class="flex-1 min-w-0">
                      <div class="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <h3
                          :class="[
                            'text-base sm:text-lg lg:text-xl font-semibold break-words',
                            todo.completed ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-white'
                          ]"
                        >
                          {{ todo.title }}
                        </h3>
                        <span
                          :class="[
                            'px-2 sm:px-3 py-1 text-xs font-medium rounded-full border flex-shrink-0',
                            todo.priority === 'high' ? 'border-red-500 text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/30' :
                            todo.priority === 'medium' ? 'border-yellow-500 text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30' :
                            'border-green-500 text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
                          ]"
                        >
                          {{ todo.priority }}
                        </span>
                      </div>
                      <p v-if="todo.description" 
                        :class="[
                           'text-sm sm:text-base font-light mb-3 sm:mb-4 break-words',
                           todo.completed ? 'text-gray-400' : 'text-gray-600 dark:text-gray-300'
                         ]">
                        {{ todo.description }}
                      </p>
                      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm font-light">
                        <span v-if="todo.dueDate" 
                              :class="{ 
                                'text-red-400 font-semibold': isOverdue(todo) && !todo.completed,
                                'text-gray-400': !isOverdue(todo) || todo.completed
                              }">
                          📅 Due: {{ new Date(todo.dueDate).toLocaleDateString() }}
                        </span>
                        <span class="text-gray-500">
                          ⏰ Created: {{ formatDate(todo.createdAt) }}
                        </span>
                      </div>
                    </div>
                    <div class="flex items-center gap-2 sm:gap-3 flex-shrink-0 lg:ml-4">
                      <button
                        @click="editTodo(todo)"
                        class="cursor-pointer px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 border border-blue-300 dark:border-blue-500 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-400 dark:hover:border-blue-400 transition-all duration-300 transform hover:scale-105"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        @click="deleteTodo(todo.id)"
                        class="cursor-pointer px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 border border-red-300 dark:border-red-500 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/30 hover:border-red-400 dark:hover:border-red-400 transition-all duration-300 transform hover:scale-105"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Edit Todo Modal -->
      <div v-if="editingTodo" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl transform scale-100 transition-all duration-300">
          <div class="flex items-center mb-6 sm:mb-8">
            <div class="w-8 h-8 bg-gradient-to-br from-white/30 to-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20 mr-3">
              <span class="text-white text-lg">✏️</span>
            </div>
            <h3 class="text-xl sm:text-2xl font-light text-white tracking-wide">Edit Task</h3>
          </div>
          <form @submit.prevent="updateTodo" class="space-y-6">
            <div>
              <label for="edit-title" class="block text-sm font-medium text-gray-300 mb-3 tracking-wide">Title *</label>
              <input
                id="edit-title"
                v-model="editingTodo.title"
                type="text"
                required
                class="w-full px-4 py-3 sm:py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
              />
            </div>
            
            <div>
              <label for="edit-description" class="block text-sm font-medium text-gray-300 mb-3 tracking-wide">Description</label>
              <textarea
                id="edit-description"
                v-model="editingTodo.description"
                rows="3"
                class="w-full px-4 py-3 sm:py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all duration-300 backdrop-blur-sm resize-none text-sm sm:text-base"
              ></textarea>
            </div>
            
            <div>
              <label for="edit-priority" class="block text-sm font-medium text-gray-300 mb-3 tracking-wide">Priority</label>
              <select
                id="edit-priority"
                v-model="editingTodo.priority"
                class="w-full px-4 py-3 sm:py-4 bg-white/5 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
              >
                <option value="low" class="bg-gray-900 text-white">Low Priority</option>
                <option value="medium" class="bg-gray-900 text-white">Medium Priority</option>
                <option value="high" class="bg-gray-900 text-white">High Priority</option>
              </select>
            </div>
            
            <div>
              <label for="edit-dueDate" class="block text-sm font-medium text-gray-300 mb-3 tracking-wide">Due Date</label>
              <input
                id="edit-dueDate"
                v-model="editingTodo.dueDate"
                type="date"
                class="w-full px-4 py-3 sm:py-4 bg-white/5 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
              />
            </div>
            
            <div class="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4">
              <button
                type="button"
                @click="cancelEdit"
                class="w-full sm:w-auto px-6 py-3 sm:py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl text-gray-300 font-medium hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300 text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="w-full sm:w-auto px-6 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white font-medium hover:bg-white/20 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300 text-sm sm:text-base transform hover:scale-105"
              >
                ✨ Update Task
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Custom Confirmation Modal for Deletion -->
      <div v-if="showDeleteModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white/10 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl transform scale-100 transition-all duration-300">
          <div class="flex items-center mb-6 sm:mb-8">
            <div class="w-8 h-8 bg-gradient-to-br from-red-500/30 to-red-600/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-red-400/20 mr-3 flex-shrink-0">
              <span class="text-red-400 text-lg">⚠️</span>
            </div>
            <h3 class="text-xl sm:text-2xl font-light text-white tracking-wide truncate">Confirm Deletion</h3>
          </div>
          <p class="text-gray-300 mb-6 text-sm sm:text-base">
            Are you sure you want to delete this task? This action cannot be undone.
          </p>
          <div class="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
            <button
              type="button"
              @click="cancelDelete"
              class="w-full sm:w-auto px-5 py-2 sm:py-2.5 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl text-gray-300 font-medium hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-300 text-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              @click="confirmDelete"
              class="w-full sm:w-auto px-5 py-2 sm:py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all duration-300 transform hover:scale-105 text-sm"
            >
              🗑️ Confirm Delete
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useTodoStore } from '@/stores/todo'
import { useThemeStore } from '@/stores/theme'
import { useToast } from 'vue-toastification'

const router = useRouter()
const authStore = useAuthStore()
const todoStore = useTodoStore()
const themeStore = useThemeStore()
const toast = useToast()

const user = computed(() => authStore.user)
const todos = computed(() => todoStore.todos)

const searchQuery = ref('')
const statusFilter = ref('all')
const priorityFilter = ref('all')
const sortBy = ref('createdAt')
const filter = ref('all')
const showAddTaskModal = ref(false)

// New state for the custom delete modal
const showDeleteModal = ref(false)
const todoToDeleteId = ref(null)


const isDarkMode = computed(() => themeStore.darkMode)

const newTodo = ref({
  title: '',
  description: '',
  priority: 'medium',
  dueDate: ''
})

const editingTodo = ref(null)

const stats = computed(() => {
  const total = todos.value.length
  const completed = todos.value.filter(todo => todo.completed).length
  const pending = total - completed
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0
  
  return { total, completed, pending, completionRate }
})

const filteredTodos = computed(() => {
  let filtered = todos.value

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(todo =>
      todo.title.toLowerCase().includes(query) ||
      todo.description?.toLowerCase().includes(query)
    )
  }

  // Apply status filter
  if (statusFilter.value !== 'all') {
    const isCompleted = statusFilter.value === 'completed'
    filtered = filtered.filter(todo => todo.completed === isCompleted)
  }

  // Apply priority filter
  if (priorityFilter.value !== 'all') {
    filtered = filtered.filter(todo => todo.priority === priorityFilter.value)
  }

  // Apply quick filter
  if (filter.value !== 'all') {
    const isCompleted = filter.value === 'completed'
    filtered = filtered.filter(todo => todo.completed === isCompleted)
  }

  // Sort
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'dueDate':
        return new Date(a.dueDate || 0) - new Date(b.dueDate || 0)
      case 'title':
        return a.title.localeCompare(b.title)
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      default:
        return new Date(b.createdAt) - new Date(a.createdAt)
    }
  })

  return filtered
})

const toggleDarkMode = () => {
  themeStore.toggleDarkMode()
}

const handleLogout = async () => {
  await authStore.logout()
  
  router.push('/')
}

const addTodo = async () => {
  if (!newTodo.value.title.trim()) {
    toast.error('Title is required!')
    return
  }
  await todoStore.addTodo({
    ...newTodo.value,
    title: newTodo.value.title.trim(),
    description: newTodo.value.description?.trim() || ''
  })
  toast.success('Task added!')
  newTodo.value = {
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  }
  showAddTaskModal.value = false
}

const toggleTodo = async (todo) => {
  await todoStore.updateTodo(todo.id, { completed: !todo.completed })
}

const editTodo = (todo) => {
  editingTodo.value = { ...todo }
}

const updateTodo = async () => {
  if (!editingTodo.value.title.trim()) {
    toast.error('Title is required!')
    return
  }
  await todoStore.updateTodo(editingTodo.value.id, {
    title: editingTodo.value.title.trim(),
    description: editingTodo.value.description?.trim() || '',
    priority: editingTodo.value.priority,
    dueDate: editingTodo.value.dueDate
  })
  toast.success('Task updated!')
  editingTodo.value = null
}

const cancelEdit = () => {
  editingTodo.value = null
}

// Updated deleteTodo function to show the custom modal
const deleteTodo = (id) => {
  todoToDeleteId.value = id;
  showDeleteModal.value = true;
}

// New function to handle the confirmation from the custom modal
const confirmDelete = async () => {
  if (todoToDeleteId.value) {
    await todoStore.deleteTodo(todoToDeleteId.value)
    toast.success('Task deleted!')
  }
  // Reset the state to close the modal
  showDeleteModal.value = false
  todoToDeleteId.value = null
}

// New function to handle the cancellation from the custom modal
const cancelDelete = () => {
  showDeleteModal.value = false
  todoToDeleteId.value = null
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

const isOverdue = (todo) => {
  if (!todo.dueDate || todo.completed) return false
  return new Date(todo.dueDate) < new Date()
}

onMounted(async () => {
  await authStore.checkAuth()
  if (!authStore.isAuthenticated) {
    toast.error('Session expired. Please login again.')
    router.push('/login')
    return
  }
  await todoStore.fetchTodos()
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 relative overflow-hidden">
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute top-1/3 -left-20 w-60 h-60 bg-white/3 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div class="absolute bottom-20 right-1/3 w-40 h-40 bg-white/4 rounded-full blur-xl animate-pulse delay-2000"></div>
    </div>

    <!-- Navigation -->
    <nav class="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
      <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16 sm:h-20">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-gradient-to-br from-white/30 to-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
              <span class="text-white font-bold text-lg">✓</span>
            </div>
            <span class="ml-3 text-xl sm:text-2xl font-bold text-white tracking-wider">DashDone</span>
          </div>
          <div class="hidden sm:flex items-center space-x-8">
            <a href="#features" class="text-gray-300 hover:text-white transition-colors duration-300 font-medium">Features</a>
            <a href="#about" class="text-gray-300 hover:text-white transition-colors duration-300 font-medium">About</a>
            <a href="#pricing" class="text-gray-300 hover:text-white transition-colors duration-300 font-medium">Pricing</a>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-24 sm:pt-32 lg:pt-20">
      <div class=" justify-center text-center max-w-full mx-auto">
        <!-- Main Heading -->
        <div class="mb-8 sm:mb-12">
          <h1 class="text-2xl sm:text-2xl lg:text-7xl font-black bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight tracking-tight">
            Task Management
            <span class="block text-2xl sm:text-5xl lg:text-6xl mt-2 bg-gradient-to-r from-gray-400 to-white bg-clip-text text-transparent">
              Redefined
            </span>
          </h1>
          <p class="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-12 font-light leading-relaxed">
            Experience the future of productivity with DashDone - a beautifully crafted, 
            intelligent task management platform that adapts to your workflow.
          </p>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-16">
          <router-link 
            to="/register" 
            class="group px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold text-base sm:text-lg shadow-2xl transition-all duration-500 hover:bg-white/20 hover:border-white/30 hover:shadow-white/10 transform hover:scale-105"
          >
            <span class="flex items-center justify-center gap-2">
              ✨ Get Started Free
              <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </span>
          </router-link>
          <router-link 
            to="/login" 
            class="px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-gray-300 font-semibold text-base sm:text-lg shadow-xl transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:text-white transform hover:scale-105"
          >
            Sign In
          </router-link>
        </div>

        <!-- Features Preview -->
        <div class="cursor-pointer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mb-16 sm:mb-20">
          <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-105">
            <div class="text-3xl sm:text-4xl mb-4">⚡</div>
            <h3 class="text-lg sm:text-xl font-semibold text-white mb-2">Lightning Fast</h3>
            <p class="text-sm sm:text-base text-gray-400 font-light">Instant sync across all your devices with real-time updates</p>
          </div>
          <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-105">
            <div class="text-3xl sm:text-4xl mb-4">🎯</div>
            <h3 class="text-lg sm:text-xl font-semibold text-white mb-2">Smart Priorities</h3>
            <p class="text-sm sm:text-base text-gray-400 font-light">AI-powered task prioritization to maximize productivity</p>
          </div>
          <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-105 sm:col-span-2 lg:col-span-1">
            <div class="text-3xl sm:text-4xl mb-4">🔒</div>
            <h3 class="text-lg sm:text-xl font-semibold text-white mb-2">Secure & Private</h3>
            <p class="text-sm sm:text-base text-gray-400 font-light">End-to-end encryption keeps your data safe and private</p>
          </div>
        </div>
      </div>
    </section>

    
  </div>
</template>

<script setup>
// Landing page logic can be added here if needed
</script>
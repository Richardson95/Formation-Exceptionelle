<template>
  <div class="min-h-screen bg-gradient-hero flex items-center justify-center relative overflow-hidden">
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <div class="absolute top-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      <div class="absolute bottom-10 left-10 w-60 h-60 bg-gold-400 rounded-full blur-3xl"></div>
    </div>
    <div class="text-center relative z-10 px-4">
      <div class="text-8xl md:text-9xl font-bold text-white/20 mb-4">404</div>
      <div class="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
        <ExclamationCircleIcon class="w-12 h-12 text-gold-400" />
      </div>
      <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">Page Not Found</h1>
      <p class="text-purple-200 text-lg mb-8 max-w-md mx-auto">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <div class="flex flex-wrap gap-3 justify-center">
        <RouterLink to="/" class="btn-gold text-base px-8 py-4">
          <HomeIcon class="w-5 h-5 mr-2" />Go Home
        </RouterLink>
        <RouterLink to="/lms" class="btn-white text-base px-8 py-4">Browse Courses</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ExclamationCircleIcon, HomeIcon } from '@heroicons/vue/24/outline'
</script>

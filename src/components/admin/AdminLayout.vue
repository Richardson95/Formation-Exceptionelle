<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <aside
      class="fixed left-0 top-0 bottom-0 z-40 flex flex-col bg-purple-950 text-white transition-all duration-300"
      :class="sidebarOpen ? 'w-64' : 'w-16'"
    >
      <!-- Logo -->
      <div class="px-4 py-5 border-b border-purple-800 flex items-center gap-3">
        <img src="@/assets/logo.jpeg" alt="FE" class="w-8 h-8 rounded-lg object-contain brightness-0 invert flex-shrink-0" />
        <span v-if="sidebarOpen" class="font-bold text-white text-sm truncate">FE Admin</span>
        <button @click="sidebarOpen = !sidebarOpen" class="ml-auto text-purple-400 hover:text-white transition-colors">
          <Bars3Icon class="w-5 h-5" />
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 py-4 overflow-y-auto scrollbar-hide">
        <div class="space-y-1 px-2">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group"
            :class="isActive(item.path)
              ? 'bg-purple-800 text-white'
              : 'text-purple-300 hover:bg-purple-800/60 hover:text-white'"
          >
            <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
            <span v-if="sidebarOpen" class="text-sm font-medium truncate">{{ item.label }}</span>
            <span
              v-if="sidebarOpen && item.badge"
              class="ml-auto bg-gold-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full"
            >{{ item.badge }}</span>
          </RouterLink>
        </div>
      </nav>

      <!-- Bottom -->
      <div class="px-2 py-4 border-t border-purple-800">
        <RouterLink
          to="/"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-purple-300 hover:bg-purple-800/60 hover:text-white transition-colors"
        >
          <ArrowLeftOnRectangleIcon class="w-5 h-5 flex-shrink-0" />
          <span v-if="sidebarOpen" class="text-sm font-medium">Back to Site</span>
        </RouterLink>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-h-screen transition-all duration-300" :class="sidebarOpen ? 'ml-64' : 'ml-16'">
      <!-- Top Bar -->
      <header class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div>
          <h1 class="text-lg font-bold text-gray-900">{{ currentPageTitle }}</h1>
          <p class="text-gray-500 text-xs">Formation Exceptionelle Admin Panel</p>
        </div>
        <div class="flex items-center gap-4">
          <!-- Notifications -->
          <button class="relative p-2 text-gray-500 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-colors">
            <BellIcon class="w-5 h-5" />
            <span class="absolute top-1 right-1 w-2 h-2 bg-gold-500 rounded-full"></span>
          </button>

          <!-- Admin Avatar -->
          <div class="flex items-center gap-2">
            <div class="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center text-white font-bold text-sm">
              {{ authStore.initials }}
            </div>
            <div class="hidden md:block">
              <p class="text-sm font-semibold text-gray-900">{{ authStore.fullName }}</p>
              <p class="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  HomeIcon, UsersIcon, AcademicCapIcon, BriefcaseIcon, ChartBarIcon,
  CurrencyDollarIcon, Bars3Icon, BellIcon, ArrowLeftOnRectangleIcon, Cog6ToothIcon
} from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
const route = useRoute()
const sidebarOpen = ref(true)

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: HomeIcon },
  { path: '/admin/users', label: 'Users', icon: UsersIcon, badge: null },
  { path: '/admin/courses', label: 'Courses', icon: AcademicCapIcon },
  { path: '/admin/jobs', label: 'Jobs', icon: BriefcaseIcon },
  { path: '/admin/analytics', label: 'Analytics', icon: ChartBarIcon },
  { path: '/admin/payments', label: 'Payments', icon: CurrencyDollarIcon },
]

function isActive(path) {
  if (path === '/admin') return route.path === '/admin'
  return route.path.startsWith(path)
}

const currentPageTitle = computed(() => {
  const item = navItems.find(n => isActive(n.path))
  return item?.label || 'Dashboard'
})
</script>

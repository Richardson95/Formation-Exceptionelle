<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'"
  >
    <div class="container-custom">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-3 group">
          <img
            src="@/assets/logo.jpeg"
            alt="Formation Exceptionelle"
            class="h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </RouterLink>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center gap-8">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="nav-link"
            :class="scrolled ? 'text-gray-700 hover:text-purple-700' : 'text-white/90 hover:text-white'"
          >
            {{ item.label }}
          </RouterLink>
          <a
            href="#services"
            @click.prevent="scrollTo('#services')"
            class="nav-link cursor-pointer"
            :class="scrolled ? 'text-gray-700 hover:text-purple-700' : 'text-white/90 hover:text-white'"
          >
            Services
          </a>
          <a
            href="#contact"
            @click.prevent="scrollTo('#contact')"
            class="nav-link cursor-pointer"
            :class="scrolled ? 'text-gray-700 hover:text-purple-700' : 'text-white/90 hover:text-white'"
          >
            Contact
          </a>
        </nav>

        <!-- Right Actions -->
        <div class="hidden lg:flex items-center gap-3">
          <!-- Cart (only when logged in) -->
          <RouterLink
            v-if="authStore.isAuthenticated"
            to="/lms/cart"
            class="relative p-2 rounded-xl transition-colors"
            :class="scrolled ? 'text-gray-600 hover:text-purple-700 hover:bg-purple-50' : 'text-white/90 hover:text-white'"
          >
            <ShoppingCartIcon class="w-6 h-6" />
            <span
              v-if="cartStore.itemCount > 0"
              class="absolute -top-1 -right-1 bg-gold-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
            >
              {{ cartStore.itemCount }}
            </span>
          </RouterLink>

          <!-- Admin Panel Button (only for admins) -->
          <RouterLink
            v-if="authStore.isAdmin"
            to="/admin"
            class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gold-500 hover:bg-gold-600 text-white transition-colors shadow-gold"
          >
            <ShieldCheckIcon class="w-4 h-4" />
            Admin Panel
          </RouterLink>

          <!-- User Menu / Auth Buttons -->
          <div v-if="authStore.isAuthenticated" class="relative" ref="userMenuRef">
            <button
              @click="userMenuOpen = !userMenuOpen"
              class="flex items-center gap-2 p-1.5 rounded-xl transition-all"
              :class="scrolled ? 'hover:bg-purple-50' : 'hover:bg-white/10'"
            >
              <div class="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white font-bold text-sm shadow-fe">
                {{ authStore.initials }}
              </div>
              <ChevronDownIcon class="w-4 h-4" :class="scrolled ? 'text-gray-600' : 'text-white/80'" />
            </button>

            <!-- Dropdown -->
            <Transition name="slide-up">
              <div
                v-if="userMenuOpen"
                class="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
              >
                <!-- User Info -->
                <div class="px-4 py-4 bg-gradient-fe text-white">
                  <p class="font-bold text-base">{{ authStore.fullName }}</p>
                  <p class="text-purple-200 text-sm">{{ authStore.user?.email }}</p>
                  <span class="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white capitalize">
                    {{ authStore.user?.role }}
                  </span>
                </div>

                <!-- Menu Items -->
                <div class="py-2">
                  <RouterLink
                    v-for="item in userMenuItems"
                    :key="item.path"
                    :to="item.path"
                    @click="userMenuOpen = false"
                    class="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                  >
                    <component :is="item.icon" class="w-4 h-4" />
                    {{ item.label }}
                  </RouterLink>

                  <div class="border-t border-gray-100 mt-1 pt-1">
                    <button
                      @click="handleLogout"
                      class="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <ArrowRightOnRectangleIcon class="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </Transition>
          </div>

          <template v-else>
            <RouterLink
              to="/auth/login"
              class="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              :class="scrolled
                ? 'text-purple-700 hover:bg-purple-50 border border-purple-200'
                : 'text-white/90 hover:text-white border border-white/30 hover:border-white/60'"
            >
              Sign In
            </RouterLink>
            <RouterLink
              to="/auth/register"
              class="btn-gold text-sm px-5 py-2.5"
            >
              Get Started
            </RouterLink>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="lg:hidden p-2 rounded-xl transition-colors"
          :class="scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'"
        >
          <Bars3Icon v-if="!mobileMenuOpen" class="w-6 h-6" />
          <XMarkIcon v-else class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition name="slide-up">
      <div
        v-if="mobileMenuOpen"
        class="lg:hidden bg-white border-t border-gray-100 shadow-xl"
      >
        <div class="container-custom py-4 space-y-1">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            @click="mobileMenuOpen = false"
            class="block px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-700 font-medium transition-colors"
          >
            {{ item.label }}
          </RouterLink>
          <a href="#services" class="block px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-700 font-medium transition-colors" @click="mobileMenuOpen=false">Services</a>
          <a href="#contact" class="block px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-700 font-medium transition-colors" @click="mobileMenuOpen=false">Contact</a>

          <div class="pt-4 border-t border-gray-100 space-y-2">
            <template v-if="authStore.isAuthenticated">
              <div class="flex items-center gap-3 px-4 py-3">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white font-bold">
                  {{ authStore.initials }}
                </div>
                <div>
                  <p class="font-semibold text-gray-900">{{ authStore.fullName }}</p>
                  <p class="text-sm text-gray-500 capitalize">{{ authStore.user?.role }}</p>
                </div>
              </div>
              <RouterLink v-if="authStore.isAdmin" to="/admin" @click="mobileMenuOpen=false" class="btn-gold w-full text-center">Admin Panel</RouterLink>
              <button @click="handleLogout" class="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-xl font-medium">Sign Out</button>
            </template>
            <template v-else>
              <RouterLink to="/auth/login" @click="mobileMenuOpen=false" class="btn-outline w-full text-center">Sign In</RouterLink>
              <RouterLink to="/auth/register" @click="mobileMenuOpen=false" class="btn-gold w-full text-center">Get Started Free</RouterLink>
            </template>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { onClickOutside } from '@vueuse/core'
import {
  ShoppingCartIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  ShieldCheckIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  BookOpenIcon,
  BriefcaseIcon,
  AcademicCapIcon,
} from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
const cartStore = useCartStore()
const router = useRouter()

const scrolled = ref(false)
const userMenuOpen = ref(false)
const mobileMenuOpen = ref(false)
const userMenuRef = ref(null)

const navItems = [
  { path: '/lms', label: 'Courses' },
  { path: '/jobs', label: 'Jobs & Internships' },
]

const userMenuItems = computed(() => {
  const items = [
    { path: '/lms/my-learning', label: 'My Learning', icon: BookOpenIcon },
    { path: '/jobs', label: 'Browse Jobs', icon: BriefcaseIcon },
  ]
  if (authStore.isInstructor) {
    items.push({ path: '/lms/instructor', label: 'Instructor Dashboard', icon: AcademicCapIcon })
  }
  items.push({ path: '/become-instructor', label: 'Become an Instructor', icon: AcademicCapIcon })
  return items
})

import { computed } from 'vue'

function scrollTo(selector) {
  const el = document.querySelector(selector)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
  mobileMenuOpen.value = false
}

function handleLogout() {
  authStore.logout()
  userMenuOpen.value = false
  mobileMenuOpen.value = false
  router.push('/')
}

function handleScroll() {
  scrolled.value = window.scrollY > 50
}

onClickOutside(userMenuRef, () => { userMenuOpen.value = false })

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

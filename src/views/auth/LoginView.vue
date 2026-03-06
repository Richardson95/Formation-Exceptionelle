<template>
  <div class="min-h-screen bg-gradient-hero flex">
    <!-- Left Panel -->
    <div class="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden">
      <div class="absolute inset-0 opacity-10 pointer-events-none">
        <div class="absolute top-20 right-20 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 left-10 w-60 h-60 bg-gold-400 rounded-full blur-3xl"></div>
      </div>
      <!-- Logo -->
      <RouterLink to="/" class="relative z-10">
        <img src="@/assets/logo.jpeg" alt="Formation Exceptionelle" class="h-14 w-auto brightness-0 invert" />
      </RouterLink>

      <!-- Hero Content -->
      <div class="relative z-10">
        <h1 class="text-4xl font-bold text-white mb-4 leading-tight">
          Welcome Back to<br/><span class="text-gold-400">Formation Exceptionelle</span>
        </h1>
        <p class="text-purple-200 text-lg mb-10 leading-relaxed">
          Your career development journey continues here. Access your courses, track progress, and discover new opportunities.
        </p>

        <!-- Features -->
        <div class="space-y-4">
          <div v-for="feat in features" :key="feat" class="flex items-center gap-3 text-purple-100">
            <div class="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
              <CheckIcon class="w-4 h-4 text-gold-400" />
            </div>
            <span class="text-sm">{{ feat }}</span>
          </div>
        </div>
      </div>

      <!-- Stats bar -->
      <div class="relative z-10 flex gap-8">
        <div v-for="s in stats" :key="s.label" class="text-center">
          <div class="text-2xl font-bold text-white">{{ s.value }}</div>
          <div class="text-purple-300 text-xs">{{ s.label }}</div>
        </div>
      </div>
    </div>

    <!-- Right Panel - Form -->
    <div class="flex-1 flex items-center justify-center p-6 bg-white">
      <div class="w-full max-w-md">
        <!-- Mobile Logo -->
        <div class="lg:hidden mb-8 text-center">
          <RouterLink to="/">
            <img src="@/assets/logo.jpeg" alt="Formation Exceptionelle" class="h-12 w-auto mx-auto" />
          </RouterLink>
        </div>

        <div class="mb-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
          <p class="text-gray-600">Don't have an account?
            <RouterLink to="/auth/register" class="text-purple-700 font-semibold hover:underline">Create one free</RouterLink>
          </p>
        </div>

        <!-- Demo Credentials Banner -->
        <div class="bg-purple-50 border border-purple-200 rounded-2xl p-4 mb-6">
          <p class="text-xs font-semibold text-purple-700 mb-2">Demo Credentials</p>
          <div class="space-y-1">
            <p class="text-xs text-gray-600"><span class="font-medium">Admin:</span> admin@formationexceptionelle.com / Admin@2024!</p>
            <p class="text-xs text-gray-500">Or register a new account below</p>
          </div>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div class="relative">
              <EnvelopeIcon class="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                v-model="form.email"
                type="email"
                placeholder="you@example.com"
                class="input-field pl-11"
                required
                autocomplete="email"
              />
            </div>
          </div>

          <div>
            <div class="flex justify-between mb-2">
              <label class="text-sm font-medium text-gray-700">Password</label>
              <a href="#" class="text-sm text-purple-700 hover:underline font-medium">Forgot password?</a>
            </div>
            <div class="relative">
              <LockClosedIcon class="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="input-field pl-11 pr-11"
                required
                autocomplete="current-password"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <EyeIcon v-if="!showPassword" class="w-5 h-5" />
                <EyeSlashIcon v-else class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Error -->
          <div v-if="error" class="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            <ExclamationCircleIcon class="w-4 h-4 flex-shrink-0" />
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="authStore.loading"
            class="btn-primary w-full py-4 text-base"
          >
            <span v-if="authStore.loading" class="flex items-center gap-2">
              <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Signing in...
            </span>
            <span v-else>Sign In</span>
          </button>
        </form>

        <p class="text-center text-gray-500 text-sm mt-6">
          By signing in, you agree to our
          <a href="#" class="text-purple-700 hover:underline">Terms of Service</a> and
          <a href="#" class="text-purple-700 hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon,
  CheckIcon, ExclamationCircleIcon
} from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const form = ref({ email: '', password: '' })
const showPassword = ref(false)
const error = ref('')

const features = [
  'Access 200+ professional courses',
  'Track your learning progress',
  'Earn industry certificates',
  'Discover job opportunities',
]

const stats = [
  { value: '50K+', label: 'Students' },
  { value: '200+', label: 'Courses' },
  { value: '95%', label: 'Placed' },
]

async function handleLogin() {
  error.value = ''
  try {
    await authStore.login(form.value.email, form.value.password)
    const redirect = route.query.redirect || '/'
    router.push(redirect)
  } catch (err) {
    error.value = err.message
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-hero flex">
    <!-- Left Panel -->
    <div class="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden">
      <div class="absolute inset-0 opacity-10 pointer-events-none">
        <div class="absolute top-20 right-20 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 left-10 w-60 h-60 bg-gold-400 rounded-full blur-3xl"></div>
      </div>
      <RouterLink to="/" class="relative z-10">
        <img src="@/assets/logo.png" alt="Formation Exceptionelle" class="h-14 w-auto brightness-0 invert" />
      </RouterLink>
      <div class="relative z-10">
        <h1 class="text-4xl font-bold text-white mb-4 leading-tight">
          Create a new<br/><span class="text-gold-400">password</span>
        </h1>
        <p class="text-purple-200 text-lg leading-relaxed">
          Choose a strong password to keep your Formation Exceptionelle account secure.
        </p>
      </div>
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
        <div class="lg:hidden mb-8 text-center">
          <RouterLink to="/">
            <img src="@/assets/logo.png" alt="Formation Exceptionelle" class="h-12 w-auto mx-auto" />
          </RouterLink>
        </div>

        <!-- Invalid / expired token -->
        <div v-if="!tokenValid && !done">
          <div class="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mb-6">
            <ExclamationCircleIcon class="w-8 h-8 text-red-500" />
          </div>
          <h2 class="text-3xl font-bold text-gray-900 mb-2">Link not valid</h2>
          <p class="text-gray-600 mb-6">{{ tokenError }}</p>
          <RouterLink to="/auth/forgot-password" class="btn-primary w-full py-4 text-base block text-center">
            Request a new link
          </RouterLink>
        </div>

        <!-- Reset Form -->
        <div v-else-if="!done">
          <div class="mb-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-2">Set New Password</h2>
            <p class="text-gray-600">Your new password must be at least 8 characters long.</p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <div class="relative">
                <LockClosedIcon class="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Min. 8 characters"
                  class="input-field pl-11 pr-11"
                  required
                  minlength="8"
                  autocomplete="new-password"
                />
                <button type="button" @click="showPassword = !showPassword" class="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <EyeIcon v-if="!showPassword" class="w-5 h-5" />
                  <EyeSlashIcon v-else class="w-5 h-5" />
                </button>
              </div>
            </div>

            <!-- Password Strength -->
            <div v-if="password" class="space-y-1">
              <div class="flex gap-1.5">
                <div v-for="i in 4" :key="i" class="flex-1 h-1 rounded-full transition-colors"
                  :class="passwordStrength >= i ? strengthColors[passwordStrength - 1] : 'bg-gray-200'"></div>
              </div>
              <p class="text-xs" :class="passwordStrength >= 3 ? 'text-green-600' : 'text-gray-500'">
                {{ strengthLabels[passwordStrength - 1] || 'Too weak' }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <div class="relative">
                <LockClosedIcon class="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  v-model="confirmPassword"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Repeat password"
                  class="input-field pl-11"
                  required
                  autocomplete="new-password"
                />
              </div>
            </div>

            <div v-if="error" class="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              <ExclamationCircleIcon class="w-4 h-4 flex-shrink-0" />{{ error }}
            </div>

            <button type="submit" :disabled="authStore.loading" class="btn-primary w-full py-4 text-base">
              <span v-if="authStore.loading" class="flex items-center gap-2">
                <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Resetting...
              </span>
              <span v-else>Reset Password</span>
            </button>
          </form>
        </div>

        <!-- Success -->
        <div v-else>
          <div class="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mb-6">
            <CheckCircleIcon class="w-8 h-8 text-green-600" />
          </div>
          <h2 class="text-3xl font-bold text-gray-900 mb-2">Password reset!</h2>
          <p class="text-gray-600 mb-6">Your password has been updated successfully. You can now sign in with your new password.</p>
          <RouterLink to="/auth/login" class="btn-primary w-full py-4 text-base block text-center">
            Go to Sign In
          </RouterLink>
        </div>

        <p v-if="!done" class="text-center text-gray-500 text-sm mt-6">
          <RouterLink to="/auth/login" class="text-purple-700 font-semibold hover:underline">Back to Sign In</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  LockClosedIcon, EyeIcon, EyeSlashIcon,
  ExclamationCircleIcon, CheckCircleIcon
} from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const token = String(route.query.token || '')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const error = ref('')
const done = ref(false)

const stats = [
  { value: '15K+', label: 'Professionals' },
  { value: '60+', label: 'Programs' },
  { value: '98%', label: 'Satisfaction' },
]

// Token validity is resolved on mount (async in API mode, instant in mock mode).
const check = ref({ valid: true, reason: '' })
onMounted(async () => {
  check.value = await authStore.verifyResetToken(token)
})
const tokenValid = computed(() => check.value.valid)
const tokenError = computed(() =>
  check.value.reason === 'expired'
    ? 'This reset link has expired. Please request a new one.'
    : 'This reset link is invalid or has already been used. Please request a new one.'
)

const passwordStrength = computed(() => {
  const p = password.value
  if (!p) return 0
  let strength = 0
  if (p.length >= 8) strength++
  if (/[A-Z]/.test(p)) strength++
  if (/[0-9]/.test(p)) strength++
  if (/[^A-Za-z0-9]/.test(p)) strength++
  return strength
})
const strengthColors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500']
const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong']

async function handleSubmit() {
  error.value = ''
  if (password.value.length < 8) {
    error.value = 'Password must be at least 8 characters'
    return
  }
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }
  try {
    await authStore.resetPassword(token, password.value)
    done.value = true
    setTimeout(() => router.push('/auth/login'), 2500)
  } catch (err) {
    error.value = err.message
  }
}
</script>

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
          Forgot your<br/><span class="text-gold-400">password?</span>
        </h1>
        <p class="text-purple-200 text-lg leading-relaxed">
          No worries — it happens. Enter your email and we'll send you a secure link to reset your password.
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

        <!-- Request Form -->
        <div v-if="!sent">
          <div class="mb-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-2">Reset Password</h2>
            <p class="text-gray-600">
              Enter the email associated with your account and we'll send you a reset link.
            </p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div class="relative">
                <EnvelopeIcon class="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  v-model="email"
                  type="email"
                  placeholder="you@example.com"
                  class="input-field pl-11"
                  required
                  autocomplete="email"
                />
              </div>
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
                Sending link...
              </span>
              <span v-else>Send Reset Link</span>
            </button>
          </form>
        </div>

        <!-- Sent / Confirmation -->
        <div v-else>
          <div class="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mb-6">
            <EnvelopeIcon class="w-8 h-8 text-green-600" />
          </div>
          <h2 class="text-3xl font-bold text-gray-900 mb-2">Check your email</h2>
          <p class="text-gray-600 mb-6">
            If an account exists for <strong>{{ email }}</strong>, we've sent a link to reset your password. The link expires in 30 minutes.
          </p>

          <!-- Demo helper: no email server in this build, so surface the link directly. -->
          <div v-if="demoLink" class="bg-purple-50 border border-purple-200 rounded-2xl p-4 mb-6">
            <p class="text-xs font-semibold text-purple-700 mb-2">Demo Mode</p>
            <p class="text-xs text-gray-600 mb-3">No email server is connected in this build. Use the link below to reset your password:</p>
            <RouterLink :to="demoLink" class="text-xs text-purple-700 font-medium hover:underline break-all">
              {{ demoLinkLabel }}
            </RouterLink>
          </div>

          <button @click="reset" class="btn-outline w-full py-3 mb-3">Use a different email</button>
        </div>

        <p class="text-center text-gray-500 text-sm mt-6">
          Remembered it?
          <RouterLink to="/auth/login" class="text-purple-700 font-semibold hover:underline">Back to Sign In</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { EnvelopeIcon } from '@heroicons/vue/24/outline'

const authStore = useAuthStore()

const email = ref('')
const sent = ref(false)
const demoToken = ref(null)

const stats = [
  { value: '50K+', label: 'Students' },
  { value: '200+', label: 'Courses' },
  { value: '95%', label: 'Placed' },
]

const demoLink = computed(() =>
  demoToken.value ? { name: 'reset-password', query: { token: demoToken.value } } : null
)
const demoLinkLabel = computed(() =>
  demoToken.value ? `${window.location.origin}/auth/reset-password?token=${demoToken.value}` : ''
)

async function handleSubmit() {
  try {
    const { token } = await authStore.forgotPassword(email.value)
    demoToken.value = token
    sent.value = true
  } catch {
    // toast already shown by the store
  }
}

function reset() {
  sent.value = false
  email.value = ''
  demoToken.value = null
}
</script>

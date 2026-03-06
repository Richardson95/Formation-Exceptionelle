<template>
  <div class="min-h-screen bg-gradient-hero flex">
    <!-- Left Panel -->
    <div class="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden">
      <div class="absolute inset-0 opacity-10 pointer-events-none">
        <div class="absolute top-20 right-20 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 left-10 w-60 h-60 bg-gold-400 rounded-full blur-3xl"></div>
      </div>
      <RouterLink to="/" class="relative z-10">
        <img src="@/assets/logo.jpeg" alt="Formation Exceptionelle" class="h-14 w-auto brightness-0 invert" />
      </RouterLink>
      <div class="relative z-10">
        <h1 class="text-4xl font-bold text-white mb-4 leading-tight">
          Start Your Journey<br/>
          <span class="text-gold-400">Towards Excellence</span>
        </h1>
        <p class="text-purple-200 text-lg mb-10">Join 50,000+ professionals who transformed their careers with Formation Exceptionelle.</p>
        <div class="space-y-4">
          <div v-for="perk in perks" :key="perk.title" class="flex items-start gap-3">
            <div class="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 mt-0.5">
              <component :is="perk.icon" class="w-4 h-4 text-gold-400" />
            </div>
            <div>
              <p class="text-white font-semibold text-sm">{{ perk.title }}</p>
              <p class="text-purple-300 text-xs">{{ perk.desc }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="relative z-10 flex gap-8">
        <div v-for="s in stats" :key="s.label" class="text-center">
          <div class="text-2xl font-bold text-white">{{ s.value }}</div>
          <div class="text-purple-300 text-xs">{{ s.label }}</div>
        </div>
      </div>
    </div>

    <!-- Right Panel -->
    <div class="flex-1 flex items-center justify-center p-6 bg-white overflow-y-auto">
      <div class="w-full max-w-md py-8">
        <div class="lg:hidden mb-8 text-center">
          <RouterLink to="/"><img src="@/assets/logo.jpeg" alt="Formation Exceptionelle" class="h-12 w-auto mx-auto" /></RouterLink>
        </div>

        <div class="mb-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
          <p class="text-gray-600">Already have an account?
            <RouterLink to="/auth/login" class="text-purple-700 font-semibold hover:underline">Sign in</RouterLink>
          </p>
        </div>

        <!-- Role Selection -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-3">I want to join as:</label>
          <div class="grid grid-cols-2 gap-3">
            <button
              v-for="role in roles"
              :key="role.value"
              type="button"
              @click="form.role = role.value"
              class="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all"
              :class="form.role === role.value
                ? 'border-purple-600 bg-purple-50 text-purple-700'
                : 'border-gray-200 hover:border-purple-300 text-gray-600'"
            >
              <component :is="role.icon" class="w-6 h-6" />
              <span class="text-sm font-semibold">{{ role.label }}</span>
              <span class="text-xs text-center opacity-70">{{ role.desc }}</span>
            </button>
          </div>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input v-model="form.firstName" type="text" placeholder="John" class="input-field" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input v-model="form.lastName" type="text" placeholder="Doe" class="input-field" required />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div class="relative">
              <EnvelopeIcon class="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input v-model="form.email" type="email" placeholder="you@example.com" class="input-field pl-11" required autocomplete="email" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <div class="relative">
              <PhoneIcon class="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input v-model="form.phone" type="tel" placeholder="+234 800 000 0000" class="input-field pl-11" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Profession / Current Role</label>
            <input v-model="form.profession" type="text" placeholder="e.g. Software Developer" class="input-field" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div class="relative">
              <LockClosedIcon class="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                v-model="form.password"
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
          <div v-if="form.password" class="space-y-1">
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
                v-model="form.confirmPassword"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Repeat password"
                class="input-field pl-11"
                required
                autocomplete="new-password"
              />
            </div>
          </div>

          <!-- Terms -->
          <div class="flex items-start gap-3">
            <input v-model="form.agreeTerms" type="checkbox" id="terms" class="mt-1 rounded border-gray-300 text-purple-600 focus:ring-purple-500" required />
            <label for="terms" class="text-sm text-gray-600">
              I agree to Formation Exceptionelle's
              <a href="#" class="text-purple-700 hover:underline font-medium">Terms of Service</a> and
              <a href="#" class="text-purple-700 hover:underline font-medium">Privacy Policy</a>
            </label>
          </div>

          <!-- Error -->
          <div v-if="error" class="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            <ExclamationCircleIcon class="w-4 h-4 flex-shrink-0" />{{ error }}
          </div>

          <button type="submit" :disabled="authStore.loading" class="btn-primary w-full py-4 text-base">
            <span v-if="authStore.loading" class="flex items-center gap-2">
              <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Creating account...
            </span>
            <span v-else>Create Account</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  EnvelopeIcon, LockClosedIcon, PhoneIcon, EyeIcon, EyeSlashIcon,
  ExclamationCircleIcon, AcademicCapIcon, BriefcaseIcon,
  UserGroupIcon, BuildingOfficeIcon, SparklesIcon, TrophyIcon
} from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const showPassword = ref(false)
const error = ref('')

const form = ref({
  firstName: '', lastName: '', email: '', phone: '',
  profession: '', password: '', confirmPassword: '',
  role: 'participant', agreeTerms: false
})

const roles = [
  { value: 'participant', label: 'Learner', icon: AcademicCapIcon, desc: 'Enroll in courses & find jobs' },
  { value: 'participant', label: 'Employer', icon: BuildingOfficeIcon, desc: 'Post jobs & hire talent' },
]

const perks = [
  { icon: SparklesIcon, title: 'Free Forever', desc: 'No credit card required to get started' },
  { icon: TrophyIcon, title: 'Industry Certificates', desc: 'Earn recognized certifications' },
  { icon: BriefcaseIcon, title: 'Job Connections', desc: 'Access to 500+ job opportunities' },
]

const stats = [
  { value: '50K+', label: 'Members' },
  { value: '200+', label: 'Courses' },
  { value: 'Free', label: 'To Join' },
]

const passwordStrength = computed(() => {
  const p = form.value.password
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

async function handleRegister() {
  error.value = ''
  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }
  if (passwordStrength.value < 2) {
    error.value = 'Please use a stronger password'
    return
  }
  try {
    await authStore.register({
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      phone: form.value.phone,
      profession: form.value.profession,
      password: form.value.password,
      role: 'participant',
    })
    const redirect = route.query.redirect || '/lms'
    router.push(redirect)
  } catch (err) {
    error.value = err.message
  }
}
</script>

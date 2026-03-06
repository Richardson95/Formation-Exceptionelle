<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />

    <!-- Hero -->
    <div class="bg-gradient-fe pt-24 pb-16 relative overflow-hidden">
      <div class="absolute inset-0 opacity-10 pointer-events-none">
        <div class="absolute top-10 right-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
      </div>
      <div class="container-custom relative z-10 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm mb-6">
          <SparklesIcon class="w-4 h-4 text-gold-400" />Instructor Program
        </div>
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Share Your Expertise,<br/><span class="text-gold-400">Earn & Inspire</span>
        </h1>
        <p class="text-purple-200 text-xl max-w-2xl mx-auto mb-8">
          Join 150+ expert instructors who are earning income while empowering thousands of students on Formation Exceptionelle.
        </p>
        <div class="flex flex-wrap gap-6 justify-center text-white">
          <div class="text-center"><div class="text-3xl font-bold">150+</div><div class="text-purple-200 text-sm">Active Instructors</div></div>
          <div class="text-center"><div class="text-3xl font-bold">$2.5K</div><div class="text-purple-200 text-sm">Avg. Monthly Earnings</div></div>
          <div class="text-center"><div class="text-3xl font-bold">50K+</div><div class="text-purple-200 text-sm">Students to Reach</div></div>
        </div>
      </div>
    </div>

    <div class="container-custom py-16">
      <!-- If already instructor -->
      <div v-if="authStore.isInstructor" class="text-center py-16 max-w-lg mx-auto">
        <div class="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-6">
          <AcademicCapIcon class="w-10 h-10 text-purple-600" />
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-3">You're already an instructor!</h2>
        <p class="text-gray-600 mb-8">Start creating courses and earning from your expertise today.</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <RouterLink to="/lms/instructor" class="btn-primary px-8 py-3">Go to Dashboard</RouterLink>
          <RouterLink to="/lms/instructor/create-course" class="btn-outline px-8 py-3">Create Course</RouterLink>
        </div>
      </div>

      <!-- Application Form -->
      <div v-else>
        <!-- Benefits -->
        <div class="grid md:grid-cols-3 gap-6 mb-16">
          <div v-for="(benefit, i) in benefits" :key="benefit.title" data-aos="fade-up" :data-aos-delay="i * 100"
            class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-all"
          >
            <div class="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" :style="{ background: benefit.bg }">
              <component :is="benefit.icon" class="w-7 h-7" :style="{ color: benefit.color }" />
            </div>
            <h3 class="font-bold text-gray-900 mb-2">{{ benefit.title }}</h3>
            <p class="text-gray-600 text-sm leading-relaxed">{{ benefit.desc }}</p>
          </div>
        </div>

        <!-- Application Form -->
        <div class="max-w-2xl mx-auto">
          <div class="text-center mb-10">
            <h2 class="text-3xl font-bold text-gray-900 mb-3">Apply to Become an Instructor</h2>
            <p class="text-gray-600">Tell us about yourself and your expertise. We'll review your application within 3 business days.</p>
          </div>

          <div v-if="!submitted" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <form @submit.prevent="handleApply" class="space-y-5">
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input :value="authStore.fullName" type="text" class="input-field bg-gray-50" readonly />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input :value="authStore.user?.email" type="email" class="input-field bg-gray-50" readonly />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Your Expertise / Professional Title *</label>
                <input v-model="form.title" type="text" placeholder="e.g. Senior Software Engineer, Data Scientist" class="input-field" required />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Years of Experience *</label>
                <select v-model="form.experience" class="input-field" required>
                  <option>1-2 years</option><option>3-5 years</option>
                  <option>5-10 years</option><option>10+ years</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Proposed Course Topic *</label>
                <input v-model="form.courseTopic" type="text" placeholder="What course do you want to teach?" class="input-field" required />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select v-model="form.category" class="input-field">
                  <option v-for="cat in categories" :key="cat">{{ cat }}</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">LinkedIn / Portfolio URL</label>
                <input v-model="form.linkedin" type="url" placeholder="https://linkedin.com/in/yourname" class="input-field" />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Bio *</label>
                <textarea v-model="form.bio" rows="4" placeholder="Tell us about your professional background and teaching philosophy..." class="input-field resize-none" required></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Why do you want to teach on Formation Exceptionelle? *</label>
                <textarea v-model="form.motivation" rows="3" placeholder="Share your motivation..." class="input-field resize-none" required></textarea>
              </div>

              <!-- Agreement -->
              <div class="flex items-start gap-3">
                <input v-model="form.agree" type="checkbox" id="agree" required class="mt-1 rounded border-gray-300 text-purple-600" />
                <label for="agree" class="text-sm text-gray-600">I confirm that I have the expertise claimed and agree to Formation Exceptionelle's <a href="#" class="text-purple-700 hover:underline">Instructor Agreement</a></label>
              </div>

              <button type="submit" :disabled="authStore.loading" class="btn-primary w-full py-4 text-base">
                <span v-if="authStore.loading" class="flex items-center gap-2">
                  <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Submitting...
                </span>
                <span v-else class="flex items-center gap-2"><RocketLaunchIcon class="w-5 h-5" />Submit Application</span>
              </button>
            </form>
          </div>

          <!-- Success -->
          <div v-else class="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div class="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon class="w-10 h-10 text-green-500" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-3">Application Approved!</h2>
            <p class="text-gray-600 mb-2">You are now an instructor on Formation Exceptionelle. Start creating your first course!</p>
            <div class="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <RouterLink to="/lms/instructor" class="btn-primary px-8 py-3">Go to Dashboard</RouterLink>
              <RouterLink to="/lms/instructor/create-course" class="btn-gold px-8 py-3">Create First Course</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import {
  SparklesIcon, AcademicCapIcon, CurrencyDollarIcon, UsersIcon,
  GlobeAltIcon, CheckCircleIcon, RocketLaunchIcon, StarIcon
} from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
const submitted = ref(false)
const categories = ['Web Development', 'Data Science', 'Business', 'Marketing', 'Design', 'Finance', 'Leadership']

const form = ref({
  title: '', experience: '3-5 years', courseTopic: '',
  category: 'Web Development', linkedin: '', bio: '', motivation: '', agree: false
})

const benefits = [
  {
    icon: CurrencyDollarIcon, title: 'Earn Revenue',
    desc: 'Earn up to 70% of every course sale. Top instructors earn $5,000+ per month.',
    bg: '#d1fae5', color: '#059669'
  },
  {
    icon: UsersIcon, title: 'Reach 50K+ Students',
    desc: 'Access our growing community of professionals eager to learn from experts like you.',
    bg: '#ede9fe', color: '#7c3aed'
  },
  {
    icon: GlobeAltIcon, title: 'World-Class Platform',
    desc: 'Use our professional video hosting, quiz builder, and course management tools.',
    bg: '#fef3c7', color: '#d97706'
  },
]

async function handleApply() {
  await authStore.becomeInstructor({
    title: form.value.title,
    experience: form.value.experience,
    courseTopic: form.value.courseTopic,
    category: form.value.category,
    linkedin: form.value.linkedin,
    bio: form.value.bio,
  })
  submitted.value = true
}
</script>

<template>
  <section class="section-padding bg-gray-50" id="features">
    <div class="container-custom">
      <!-- Header -->
      <div class="text-center mb-16" data-aos="fade-up">
        <span class="badge-purple text-sm px-4 py-2 mb-4 inline-block">Everything You Need</span>
        <h2 class="section-title mb-4">
          One Platform,
          <span class="gradient-text"> Endless Possibilities</span>
        </h2>
        <p class="section-subtitle">
          From world-class courses to career opportunities — Formation Exceptionelle is your complete career development ecosystem.
        </p>
      </div>

      <!-- Feature Cards Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(card, index) in featureCards"
          :key="card.id"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
          @click="handleCardClick(card)"
          class="card card-hover cursor-pointer group relative overflow-hidden"
          :class="card.featured ? 'lg:col-span-1 ring-2 ring-purple-500' : ''"
        >
          <!-- Card Gradient Header -->
          <div
            class="h-2 w-full"
            :style="{ background: card.gradient }"
          ></div>

          <!-- Featured Badge -->
          <div v-if="card.featured" class="absolute top-4 right-4 badge bg-gold-100 text-gold-700 text-xs font-bold">
            Most Popular
          </div>

          <div class="p-6">
            <!-- Icon -->
            <div
              class="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
              :style="{ background: card.iconBg }"
            >
              <component :is="card.icon" class="w-7 h-7" :style="{ color: card.iconColor }" />
            </div>

            <!-- Content -->
            <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
              {{ card.title }}
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-5">
              {{ card.description }}
            </p>

            <!-- Features List -->
            <ul class="space-y-2 mb-6">
              <li
                v-for="feature in card.features"
                :key="feature"
                class="flex items-center gap-2 text-sm text-gray-700"
              >
                <CheckCircleIcon class="w-4 h-4 text-green-500 flex-shrink-0" />
                {{ feature }}
              </li>
            </ul>

            <!-- CTA -->
            <div class="flex items-center justify-between">
              <button
                class="flex items-center gap-2 text-sm font-semibold transition-colors"
                :style="{ color: card.iconColor }"
              >
                {{ card.cta }}
                <ArrowRightIcon class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              <div class="flex items-center gap-1.5">
                <div class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span class="text-xs text-gray-400">{{ card.stat }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Auth Prompt Modal -->
      <Transition name="modal">
        <div v-if="showAuthModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showAuthModal = false"></div>
          <div class="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <!-- Icon -->
            <div class="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              :style="{ background: selectedCard?.iconBg }">
              <component v-if="selectedCard" :is="selectedCard.icon" class="w-8 h-8" :style="{ color: selectedCard?.iconColor }" />
            </div>

            <h3 class="text-2xl font-bold text-center text-gray-900 mb-2">
              {{ selectedCard?.authTitle }}
            </h3>
            <p class="text-gray-600 text-center mb-8">
              {{ selectedCard?.authDescription }}
            </p>

            <div class="space-y-3">
              <RouterLink
                :to="{ name: 'register', query: { redirect: selectedCard?.path, type: selectedCard?.id } }"
                @click="showAuthModal = false"
                class="btn-primary w-full text-center justify-center text-base py-4"
              >
                Create Free Account
              </RouterLink>
              <RouterLink
                :to="{ name: 'login', query: { redirect: selectedCard?.path } }"
                @click="showAuthModal = false"
                class="btn-outline w-full text-center justify-center"
              >
                I already have an account
              </RouterLink>
            </div>

            <button
              @click="showAuthModal = false"
              class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon class="w-6 h-6" />
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  AcademicCapIcon,
  BriefcaseIcon,
  DocumentPlusIcon,
  UserPlusIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
const router = useRouter()
const showAuthModal = ref(false)
const selectedCard = ref(null)

const featureCards = [
  {
    id: 'lms',
    title: 'Learning Management System',
    description: 'Access hundreds of professional courses, earn certificates, and track your progress on our world-class LMS platform — just like Udemy, but tailored for African professionals.',
    gradient: 'linear-gradient(90deg, #7c3aed, #a78bfa)',
    iconBg: '#ede9fe',
    iconColor: '#7c3aed',
    icon: AcademicCapIcon,
    path: '/lms',
    features: [
      'HD Video Courses with certificates',
      'Quizzes, assignments & grading',
      'Progress tracking dashboard',
      'Paid & free courses available',
    ],
    cta: 'Browse Courses',
    stat: '200+ Courses',
    featured: true,
    authTitle: 'Access World-Class Courses',
    authDescription: 'Create a free account to browse and enroll in hundreds of professional courses.',
  },
  {
    id: 'jobs',
    title: 'Job Opportunities',
    description: 'Discover thousands of career opportunities from top companies. Apply with ease and track your applications in real time.',
    gradient: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
    iconBg: '#fef3c7',
    iconColor: '#d97706',
    icon: BriefcaseIcon,
    path: '/jobs',
    features: [
      'Full-time, part-time & remote jobs',
      'Internship programs',
      'Application tracking',
      'Direct employer connections',
    ],
    cta: 'Find Jobs',
    stat: '500+ Active Jobs',
    featured: false,
    authTitle: 'Discover Career Opportunities',
    authDescription: 'Sign in to browse and apply for thousands of job opportunities.',
  },
  {
    id: 'post-job',
    title: 'Post Jobs & Internships',
    description: 'Find the perfect talent for your organization. Post jobs and internship opportunities to reach thousands of qualified candidates.',
    gradient: 'linear-gradient(90deg, #059669, #34d399)',
    iconBg: '#d1fae5',
    iconColor: '#059669',
    icon: DocumentPlusIcon,
    path: '/jobs/post',
    features: [
      'Targeted job postings',
      'Access to verified candidates',
      'Application management dashboard',
      'Affordable posting packages',
    ],
    cta: 'Post a Job',
    stat: '1000+ Companies',
    featured: false,
    authTitle: 'Post Your Job Opening',
    authDescription: 'Sign in to post jobs and internship opportunities to our talent pool.',
  },
  {
    id: 'instructor',
    title: 'Become an Instructor',
    description: 'Share your expertise with thousands of learners. Create professional courses, upload videos, and earn income doing what you love.',
    gradient: 'linear-gradient(90deg, #dc2626, #f87171)',
    iconBg: '#fee2e2',
    iconColor: '#dc2626',
    icon: UserPlusIcon,
    path: '/become-instructor',
    features: [
      'Easy course creation tools',
      'Video upload & hosting',
      'Earn revenue from your courses',
      'Dedicated instructor support',
    ],
    cta: 'Start Teaching',
    stat: '150+ Instructors',
    featured: false,
    authTitle: 'Start Your Teaching Journey',
    authDescription: 'Create an account to apply as an instructor and start sharing your knowledge.',
  },
]

function handleCardClick(card) {
  if (!authStore.isAuthenticated) {
    selectedCard.value = card
    showAuthModal.value = true
  } else {
    router.push(card.path)
  }
}
</script>

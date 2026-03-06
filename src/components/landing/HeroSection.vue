<template>
  <section class="relative min-h-screen hero-gradient overflow-hidden flex items-center">
    <!-- Animated Background Orbs -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gold-500/15 rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 2s"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-800/10 rounded-full blur-3xl"></div>
      <!-- Grid Pattern -->
      <div class="absolute inset-0 opacity-5 grid-pattern"></div>
    </div>

    <!-- Floating particles -->
    <div v-for="particle in particles" :key="particle.id"
      class="absolute w-1.5 h-1.5 rounded-full bg-gold-400/60 animate-float pointer-events-none"
      :style="{ left: particle.x + '%', top: particle.y + '%', animationDelay: particle.delay + 's', animationDuration: particle.duration + 's' }"
    ></div>

    <div class="container-custom relative z-10 pt-24 pb-16">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Left Content -->
        <div>
          <!-- Badge -->
          <div data-aos="fade-down" class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6">
            <SparklesIcon class="w-4 h-4 text-gold-400" />
            Africa's Premier Career Development Platform
          </div>

          <!-- Main Heading -->
          <h1 data-aos="fade-up" data-aos-delay="100" class="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 text-shadow">
            Transform Your
            <span class="block text-gold-400">Career Journey</span>
            With Excellence
          </h1>

          <p data-aos="fade-up" data-aos-delay="200" class="text-lg text-purple-200 leading-relaxed mb-8 max-w-xl">
            Join over <strong class="text-white">50,000+ professionals</strong> who have accelerated their careers with Formation Exceptionelle's world-class training programs, industry connections, and expert mentorship.
          </p>

          <!-- CTA Buttons -->
          <div data-aos="fade-up" data-aos-delay="300" class="flex flex-wrap gap-4 mb-10">
            <RouterLink to="/lms" class="btn-gold text-base px-8 py-4 shadow-gold">
              Explore Courses
              <ArrowRightIcon class="w-5 h-5 ml-2" />
            </RouterLink>
            <RouterLink to="/auth/register" class="btn-white text-base px-8 py-4">
              Join For Free
            </RouterLink>
          </div>

          <!-- Quick Stats -->
          <div data-aos="fade-up" data-aos-delay="400" class="grid grid-cols-3 gap-4">
            <div v-for="stat in heroStats" :key="stat.label" class="text-center">
              <div class="text-2xl font-bold text-white">{{ stat.value }}</div>
              <div class="text-purple-300 text-xs">{{ stat.label }}</div>
            </div>
          </div>
        </div>

        <!-- Right Content - Feature Preview Cards -->
        <div data-aos="fade-left" data-aos-delay="200" class="relative">
          <!-- Main Card -->
          <div class="relative glass rounded-3xl p-6 shadow-fe-lg">
            <div class="flex items-center justify-between mb-6">
              <div>
                <p class="text-white/60 text-sm">Learning in progress</p>
                <h3 class="text-white font-bold text-lg">Web Development Bootcamp</h3>
              </div>
              <div class="w-12 h-12 rounded-xl bg-gold-500/20 flex items-center justify-center">
                <PlayCircleIcon class="w-8 h-8 text-gold-400" />
              </div>
            </div>

            <!-- Progress Bar -->
            <div class="mb-4">
              <div class="flex justify-between text-sm mb-2">
                <span class="text-white/70">Progress</span>
                <span class="text-gold-400 font-bold">67%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" style="width: 67%"></div>
              </div>
            </div>

            <!-- Chapter List Preview -->
            <div class="space-y-2">
              <div v-for="(chapter, i) in previewChapters" :key="i"
                class="flex items-center gap-3 p-3 rounded-xl"
                :class="i === 1 ? 'bg-white/15' : 'bg-white/5'"
              >
                <div class="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  :class="chapter.done ? 'bg-green-500' : i === 1 ? 'bg-gold-500 animate-pulse' : 'bg-white/20'"
                >
                  <CheckIcon v-if="chapter.done" class="w-4 h-4 text-white" />
                  <PlayIcon v-else-if="i === 1" class="w-3 h-3 text-white" />
                  <span v-else class="text-white/60 text-xs">{{ i + 1 }}</span>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-white text-sm font-medium truncate">{{ chapter.title }}</p>
                  <p class="text-white/50 text-xs">{{ chapter.duration }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Floating Achievement Card -->
          <div class="absolute -top-6 -right-4 glass rounded-2xl p-4 w-52 shadow-lg hidden md:block animate-float">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center">
                <TrophyIcon class="w-5 h-5 text-gold-400" />
              </div>
              <div>
                <p class="text-white/60 text-xs">Congratulations!</p>
                <p class="text-white font-bold text-sm">Certificate Earned</p>
              </div>
            </div>
            <div class="flex">
              <div v-for="i in 5" :key="i" class="w-3 h-3 text-gold-400">
                <StarSolidIcon class="w-3 h-3" />
              </div>
            </div>
          </div>

          <!-- Floating Job Card -->
          <div class="absolute -bottom-6 -left-4 glass rounded-2xl p-4 w-56 shadow-lg hidden md:block animate-float" style="animation-delay: 3s">
            <div class="flex items-center gap-2 mb-1">
              <div class="w-8 h-8 rounded-lg bg-purple-400/30 flex items-center justify-center">
                <BriefcaseIcon class="w-4 h-4 text-purple-200" />
              </div>
              <div>
                <p class="text-white text-xs font-bold">New Job Alert!</p>
                <p class="text-white/60 text-xs">Senior Developer</p>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gold-400 text-xs font-semibold">₦450K/month</span>
              <span class="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Remote</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Wave -->
    <div class="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 80V40C240 0 480 20 720 20C960 20 1200 0 1440 40V80H0Z" fill="white"/>
      </svg>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import {
  SparklesIcon, ArrowRightIcon, PlayCircleIcon, PlayIcon,
  CheckIcon, TrophyIcon, BriefcaseIcon
} from '@heroicons/vue/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/vue/24/solid'

const heroStats = [
  { value: '50K+', label: 'Students Trained' },
  { value: '200+', label: 'Expert Courses' },
  { value: '95%', label: 'Job Placement' },
]

const previewChapters = [
  { title: 'Introduction to HTML5', duration: '12 min', done: true },
  { title: 'CSS3 & Flexbox Layout', duration: '28 min', done: false },
  { title: 'JavaScript Fundamentals', duration: '45 min', done: false },
]

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 5,
  duration: 5 + Math.random() * 5,
}))
</script>

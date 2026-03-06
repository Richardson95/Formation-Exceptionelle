<template>
  <section class="section-padding bg-white">
    <div class="container-custom">
      <div class="flex items-end justify-between mb-12" data-aos="fade-up">
        <div>
          <span class="badge-purple text-sm px-4 py-2 mb-3 inline-block">Top Picks</span>
          <h2 class="section-title">
            Featured <span class="gradient-text">Courses</span>
          </h2>
        </div>
        <RouterLink to="/lms" class="hidden md:flex items-center gap-2 text-purple-700 font-semibold hover:gap-3 transition-all text-sm">
          View All Courses <ArrowRightIcon class="w-4 h-4" />
        </RouterLink>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CourseCard
          v-for="(course, i) in featuredCourses"
          :key="course.id"
          :course="course"
          data-aos="fade-up"
          :data-aos-delay="i * 100"
          @click="handleCourseClick(course)"
        />
      </div>

      <div class="text-center mt-10" data-aos="fade-up">
        <RouterLink to="/lms" class="btn-primary text-base px-8 py-4">
          Explore All 200+ Courses
          <ArrowRightIcon class="w-5 h-5 ml-2" />
        </RouterLink>
      </div>

      <!-- Auth Modal -->
      <Transition name="modal">
        <div v-if="showAuthModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showAuthModal = false"></div>
          <div class="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center">
            <div class="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-5">
              <AcademicCapIcon class="w-8 h-8 text-purple-700" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Access This Course</h3>
            <p class="text-gray-600 mb-8">Create a free account or sign in to enroll in this course and start learning today.</p>
            <div class="space-y-3">
              <RouterLink :to="{ name: 'register', query: { redirect: '/lms' } }" @click="showAuthModal = false" class="btn-primary w-full text-center justify-center py-4 text-base">
                Create Free Account
              </RouterLink>
              <RouterLink :to="{ name: 'login', query: { redirect: '/lms' } }" @click="showAuthModal = false" class="btn-outline w-full text-center justify-center">
                Sign In
              </RouterLink>
            </div>
            <button @click="showAuthModal = false" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <XMarkIcon class="w-5 h-5" />
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
import { useLMSStore } from '@/stores/lms'
import { useAuthStore } from '@/stores/auth'
import CourseCard from '@/components/lms/CourseCard.vue'
import { ArrowRightIcon, AcademicCapIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const lmsStore = useLMSStore()
const authStore = useAuthStore()
const router = useRouter()
const showAuthModal = ref(false)

const featuredCourses = lmsStore.featuredCourses.slice(0, 3)

function handleCourseClick(course) {
  if (!authStore.isAuthenticated) {
    showAuthModal.value = true
  } else {
    router.push({ name: 'course-detail', params: { id: course.id } })
  }
}
</script>

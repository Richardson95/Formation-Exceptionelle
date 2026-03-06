<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    <div class="container-custom pt-28 pb-16">
      <!-- Header -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-1">My Learning</h1>
          <p class="text-gray-600">Welcome back, {{ authStore.fullName }}! Continue where you left off.</p>
        </div>
        <RouterLink to="/lms" class="btn-primary">
          <PlusIcon class="w-5 h-5 mr-2" /> Find More Courses
        </RouterLink>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div v-for="stat in dashboardStats" :key="stat.label" class="stat-card">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-3" :style="{ background: stat.bg }">
            <component :is="stat.icon" class="w-5 h-5" :style="{ color: stat.color }" />
          </div>
          <div class="text-2xl font-bold text-gray-900">{{ stat.value }}</div>
          <div class="text-sm text-gray-500">{{ stat.label }}</div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex gap-1 border-b border-gray-200 mb-8">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          class="px-5 py-3 text-sm font-medium transition-all border-b-2"
          :class="activeTab === tab ? 'border-purple-700 text-purple-700' : 'border-transparent text-gray-600 hover:text-gray-900'"
        >{{ tab }}</button>
      </div>

      <!-- All Courses Tab -->
      <div v-if="activeTab === 'All Courses'">
        <div v-if="enrolledCourses.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="course in enrolledCourses"
            :key="course.id"
            class="card card-hover group"
          >
            <div class="relative">
              <img :src="course.thumbnail" class="w-full h-40 object-cover" />
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <RouterLink :to="{ name: 'course-learn', params: { id: course.id } }" class="btn-white text-sm px-5 py-2.5">
                  Continue Learning
                </RouterLink>
              </div>
              <!-- Progress Overlay -->
              <div class="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                <div class="h-full bg-purple-500 transition-all" :style="{ width: course.progress?.percentage + '%' }"></div>
              </div>
            </div>
            <div class="p-4">
              <h3 class="font-bold text-gray-900 text-sm line-clamp-2 mb-1 group-hover:text-purple-700 transition-colors">{{ course.title }}</h3>
              <p class="text-gray-500 text-xs mb-3">{{ course.instructor?.name }}</p>
              <div class="flex items-center justify-between text-xs">
                <span class="text-gray-500">{{ course.progress?.percentage || 0 }}% complete</span>
                <span v-if="course.progress?.completedAt" class="text-green-600 font-semibold flex items-center gap-1">
                  <CheckCircleIcon class="w-3.5 h-3.5" /> Completed
                </span>
              </div>
              <div class="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-purple-500 rounded-full transition-all" :style="{ width: (course.progress?.percentage || 0) + '%' }"></div>
              </div>
              <!-- Certificate button -->
              <button
                v-if="course.progress?.percentage === 100"
                @click="viewCertificate(course)"
                class="mt-3 w-full btn-gold text-xs py-2"
              >
                <TrophyIcon class="w-4 h-4 mr-1" /> Get Certificate
              </button>
              <RouterLink
                v-else
                :to="{ name: 'course-learn', params: { id: course.id } }"
                class="mt-3 flex items-center justify-center gap-1 w-full btn-primary text-xs py-2 text-center"
              >
                Continue <ArrowRightIcon class="w-3.5 h-3.5" />
              </RouterLink>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-20">
          <div class="w-20 h-20 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
            <AcademicCapIcon class="w-10 h-10 text-purple-400" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">No courses yet</h3>
          <p class="text-gray-500 mb-6">Enroll in a course to start your learning journey</p>
          <RouterLink to="/lms" class="btn-primary">Browse Courses</RouterLink>
        </div>
      </div>

      <!-- Wishlist Tab -->
      <div v-if="activeTab === 'Wishlist'">
        <div v-if="cartStore.wishlist.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="item in cartStore.wishlist" :key="item.id" class="card group">
            <img :src="item.thumbnail" class="w-full h-40 object-cover" />
            <div class="p-4">
              <h3 class="font-bold text-gray-900 text-sm line-clamp-2 mb-1">{{ item.title }}</h3>
              <p class="text-gray-500 text-xs mb-3">{{ item.instructor }}</p>
              <div class="flex items-center justify-between">
                <span class="font-bold text-purple-700">${{ item.price }}</span>
                <button @click="cartStore.addToCart(item)" class="btn-primary text-xs px-3 py-1.5">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-20">
          <HeartIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 class="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h3>
          <p class="text-gray-500 mb-6">Save courses you're interested in to your wishlist</p>
          <RouterLink to="/lms" class="btn-primary">Browse Courses</RouterLink>
        </div>
      </div>

      <!-- Certificates Tab -->
      <div v-if="activeTab === 'Certificates'">
        <div v-if="completedCourses.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="course in completedCourses" :key="course.id" class="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100">
            <div class="bg-gradient-fe p-6 text-white text-center">
              <TrophyIcon class="w-12 h-12 text-gold-400 mx-auto mb-2" />
              <p class="text-purple-200 text-xs">Certificate of Completion</p>
            </div>
            <div class="p-5 text-center">
              <h3 class="font-bold text-gray-900 text-sm mb-1 line-clamp-2">{{ course.title }}</h3>
              <p class="text-gray-500 text-xs mb-4">Completed {{ new Date(course.progress?.completedAt).toLocaleDateString() }}</p>
              <button @click="viewCertificate(course)" class="btn-gold w-full text-sm py-2.5">
                View Certificate
              </button>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-20">
          <TrophyIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 class="text-xl font-bold text-gray-900 mb-2">No certificates yet</h3>
          <p class="text-gray-500 mb-6">Complete a course to earn your certificate</p>
          <RouterLink to="/lms" class="btn-primary">Start Learning</RouterLink>
        </div>
      </div>
    </div>

    <!-- Certificate Modal -->
    <Transition name="modal">
      <div v-if="showCert && selectedCourse" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <div class="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl">
          <div class="bg-gradient-to-br from-purple-900 to-purple-700 p-1">
            <div class="bg-white m-1 rounded-2xl p-10 text-center relative">
              <div class="absolute inset-3 border-4 border-purple-100 rounded-xl pointer-events-none"></div>
              <img src="@/assets/logo.jpeg" class="h-12 w-auto mx-auto mb-4 opacity-90" />
              <div class="text-gold-600 text-sm font-semibold tracking-widest uppercase mb-2">Certificate of Completion</div>
              <div class="text-gray-500 text-sm mb-4">This is to certify that</div>
              <h2 class="text-3xl font-bold font-serif text-purple-900 mb-2 border-b-2 border-gold-300 inline-block px-8 pb-2">{{ authStore.fullName }}</h2>
              <div class="text-gray-500 text-sm mt-4 mb-2">has successfully completed</div>
              <h3 class="text-xl font-bold text-gray-900 mb-6">{{ selectedCourse.title }}</h3>
              <div class="flex justify-center gap-16 mt-4">
                <div class="text-center"><div class="h-0.5 w-28 bg-gray-300 mb-1"></div><p class="text-xs text-gray-500">Student</p></div>
                <div class="text-center"><div class="h-0.5 w-28 bg-gray-300 mb-1"></div><p class="text-xs text-gray-500">Director</p></div>
              </div>
            </div>
          </div>
          <div class="p-5 flex gap-3">
            <button @click="toast.success('Certificate downloaded!')" class="btn-primary flex-1">
              <ArrowDownTrayIcon class="w-5 h-5 mr-2" /> Download
            </button>
            <button @click="showCert = false" class="btn-secondary px-6">Close</button>
          </div>
        </div>
      </div>
    </Transition>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useLMSStore } from '@/stores/lms'
import { useCartStore } from '@/stores/cart'
import { toast } from 'vue3-toastify'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import {
  PlusIcon, CheckCircleIcon, TrophyIcon, AcademicCapIcon, HeartIcon,
  ArrowDownTrayIcon, ClockIcon, ChartBarIcon, ArrowRightIcon
} from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
const lmsStore = useLMSStore()
const cartStore = useCartStore()
const activeTab = ref('All Courses')
const showCert = ref(false)
const selectedCourse = ref(null)

const tabs = ['All Courses', 'Wishlist', 'Certificates']

const enrolledCourses = computed(() =>
  lmsStore.getEnrolledCourses(authStore.user?.id)
)
const completedCourses = computed(() =>
  enrolledCourses.value.filter(c => c.progress?.percentage === 100)
)
const inProgressCourses = computed(() =>
  enrolledCourses.value.filter(c => (c.progress?.percentage || 0) < 100)
)

const dashboardStats = computed(() => [
  {
    icon: AcademicCapIcon, label: 'Enrolled Courses', value: enrolledCourses.value.length,
    bg: '#ede9fe', color: '#7c3aed'
  },
  {
    icon: CheckCircleIcon, label: 'Completed', value: completedCourses.value.length,
    bg: '#d1fae5', color: '#059669'
  },
  {
    icon: TrophyIcon, label: 'Certificates', value: completedCourses.value.length,
    bg: '#fef3c7', color: '#d97706'
  },
  {
    icon: ClockIcon, label: 'Hours Learned',
    value: Math.round(enrolledCourses.value.reduce((sum, c) => sum + parseFloat(c.duration) || 0, 0)),
    bg: '#fee2e2', color: '#dc2626'
  },
])

function viewCertificate(course) {
  selectedCourse.value = course
  showCert.value = true
}
</script>

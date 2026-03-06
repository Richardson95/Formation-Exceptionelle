<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    <div class="container-custom pt-28 pb-16">
      <!-- Header -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-1">Instructor Dashboard</h1>
          <p class="text-gray-600">Welcome, {{ authStore.fullName }}! Manage your courses and track your earnings.</p>
        </div>
        <RouterLink to="/lms/instructor/create-course" class="btn-primary">
          <PlusIcon class="w-5 h-5 mr-2" /> Create New Course
        </RouterLink>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div v-for="stat in instructorStats" :key="stat.label" class="stat-card">
          <div class="flex items-center justify-between mb-4">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center" :style="{ background: stat.bg }">
              <component :is="stat.icon" class="w-5 h-5" :style="{ color: stat.color }" />
            </div>
            <span v-if="stat.trend" class="text-xs font-semibold" :class="stat.trend > 0 ? 'text-green-600' : 'text-red-500'">
              {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}%
            </span>
          </div>
          <div class="text-2xl font-bold text-gray-900">{{ stat.value }}</div>
          <div class="text-sm text-gray-500">{{ stat.label }}</div>
        </div>
      </div>

      <!-- Revenue Chart placeholder -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 class="text-xl font-bold text-gray-900 mb-5">Revenue Overview</h2>
        <div class="flex gap-2 items-end h-40 border-b border-l border-gray-200 pl-4 pb-2">
          <div v-for="(bar, i) in revenueData" :key="i" class="flex-1 flex flex-col items-center gap-1">
            <div
              class="w-full rounded-t-lg bg-purple-500 hover:bg-purple-600 transition-colors cursor-pointer"
              :style="{ height: bar.pct + '%' }"
              :title="`$${bar.value}`"
            ></div>
            <span class="text-xs text-gray-400">{{ bar.month }}</span>
          </div>
        </div>
      </div>

      <!-- My Courses -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-gray-900">My Courses</h2>
          <RouterLink to="/lms/instructor/create-course" class="btn-primary text-sm px-4 py-2">
            <PlusIcon class="w-4 h-4 mr-1" /> New Course
          </RouterLink>
        </div>

        <div v-if="instructorCourses.length > 0" class="space-y-4">
          <div
            v-for="course in instructorCourses"
            :key="course.id"
            class="border border-gray-100 rounded-2xl p-4 flex gap-4 hover:border-purple-200 transition-colors"
          >
            <img :src="course.thumbnail" class="w-24 h-16 object-cover rounded-xl flex-shrink-0" />
            <div class="flex-1 min-w-0">
              <h3 class="font-bold text-gray-900 text-sm line-clamp-1 mb-1">{{ course.title }}</h3>
              <div class="flex flex-wrap gap-3 text-xs text-gray-500 mb-2">
                <span class="flex items-center gap-1"><UsersIcon class="w-3.5 h-3.5" /> {{ course.enrolledCount?.toLocaleString() }} students</span>
                <span class="flex items-center gap-1"><StarIcon class="w-3.5 h-3.5 text-gold-400" /> {{ course.rating }}</span>
                <span class="flex items-center gap-1"><CurrencyDollarIcon class="w-3.5 h-3.5" /> ${{ ((course.price || 0) * (course.enrolledCount || 0)).toLocaleString() }} earned</span>
              </div>
              <div class="flex gap-2">
                <span class="badge text-xs" :class="course.price > 0 ? 'badge-purple' : 'bg-green-100 text-green-700'">
                  {{ course.price > 0 ? '$' + course.price : 'Free' }}
                </span>
                <span class="badge bg-gray-100 text-gray-600 text-xs">{{ course.level }}</span>
              </div>
            </div>
            <div class="flex flex-col items-end gap-2 flex-shrink-0">
              <RouterLink :to="{ name: 'edit-course', params: { id: course.id } }" class="btn-secondary text-xs px-3 py-1.5">
                Edit
              </RouterLink>
              <RouterLink :to="{ name: 'course-detail', params: { id: course.id } }" class="text-xs text-purple-700 hover:underline">
                Preview
              </RouterLink>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-16">
          <AcademicCapIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 class="text-xl font-bold text-gray-900 mb-2">No courses yet</h3>
          <p class="text-gray-500 mb-6">Create your first course and start earning!</p>
          <RouterLink to="/lms/instructor/create-course" class="btn-primary">Create Course</RouterLink>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useLMSStore } from '@/stores/lms'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import {
  PlusIcon, UsersIcon, StarIcon, CurrencyDollarIcon, AcademicCapIcon, ChartBarIcon
} from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
const lmsStore = useLMSStore()

const instructorCourses = computed(() =>
  lmsStore.getInstructorCourses(authStore.user?.id)
)

const totalRevenue = computed(() =>
  instructorCourses.value.reduce((sum, c) => sum + (c.price || 0) * (c.enrolledCount || 0), 0)
)
const totalStudents = computed(() =>
  instructorCourses.value.reduce((sum, c) => sum + (c.enrolledCount || 0), 0)
)
const avgRating = computed(() => {
  const rated = instructorCourses.value.filter(c => c.rating > 0)
  return rated.length ? (rated.reduce((s, c) => s + c.rating, 0) / rated.length).toFixed(1) : '–'
})

const instructorStats = computed(() => [
  { icon: UsersIcon, label: 'Total Students', value: totalStudents.value.toLocaleString(), trend: 12, bg: '#ede9fe', color: '#7c3aed' },
  { icon: AcademicCapIcon, label: 'Total Courses', value: instructorCourses.value.length, bg: '#fef3c7', color: '#d97706' },
  { icon: CurrencyDollarIcon, label: 'Total Revenue', value: '$' + totalRevenue.value.toLocaleString(), trend: 8, bg: '#d1fae5', color: '#059669' },
  { icon: StarIcon, label: 'Avg. Rating', value: avgRating.value, trend: 2, bg: '#fee2e2', color: '#dc2626' },
])

const revenueData = [
  { month: 'Jan', value: 1200, pct: 40 },
  { month: 'Feb', value: 1800, pct: 60 },
  { month: 'Mar', value: 1500, pct: 50 },
  { month: 'Apr', value: 2400, pct: 80 },
  { month: 'May', value: 2000, pct: 67 },
  { month: 'Jun', value: 3000, pct: 100 },
  { month: 'Jul', value: 2700, pct: 90 },
]
</script>

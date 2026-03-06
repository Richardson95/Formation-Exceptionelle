<template>
  <AdminLayout>
    <!-- Stats Grid -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div
        v-for="stat in mainStats"
        :key="stat.label"
        class="stat-card relative overflow-hidden"
      >
        <div class="absolute top-0 right-0 w-16 h-16 rounded-full opacity-10" :style="{ background: stat.color, transform: 'translate(30%, -30%)' }"></div>
        <div class="flex items-center justify-between mb-4">
          <div class="w-11 h-11 rounded-xl flex items-center justify-center" :style="{ background: stat.bg }">
            <component :is="stat.icon" class="w-5 h-5" :style="{ color: stat.color }" />
          </div>
          <span class="text-xs font-semibold px-2 py-1 rounded-full" :class="stat.trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'">
            {{ stat.trendUp ? '+' : '' }}{{ stat.trend }}%
          </span>
        </div>
        <div class="text-2xl font-bold text-gray-900 mb-1">{{ stat.value }}</div>
        <div class="text-sm text-gray-500">{{ stat.label }}</div>
      </div>
    </div>

    <div class="grid lg:grid-cols-3 gap-6 mb-8">
      <!-- Revenue Chart -->
      <div class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-lg font-bold text-gray-900">Revenue Overview</h2>
            <p class="text-gray-500 text-sm">Monthly revenue for {{ new Date().getFullYear() }}</p>
          </div>
          <div class="flex gap-2">
            <button class="px-3 py-1.5 text-xs rounded-lg bg-purple-100 text-purple-700 font-medium">Monthly</button>
            <button class="px-3 py-1.5 text-xs rounded-lg text-gray-500 hover:bg-gray-100 font-medium">Yearly</button>
          </div>
        </div>

        <!-- Bar Chart -->
        <div class="flex items-end gap-2 h-48 border-b border-l border-gray-100 px-2">
          <div
            v-for="(bar, i) in revenueData"
            :key="i"
            class="flex-1 flex flex-col items-center gap-1 group"
          >
            <div class="w-full relative">
              <div
                class="w-full rounded-t-lg bg-purple-200 group-hover:bg-purple-500 transition-colors cursor-pointer relative"
                :style="{ height: (bar.value / maxRevenue * 180) + 'px' }"
              >
                <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  ${{ bar.value.toLocaleString() }}
                </div>
              </div>
            </div>
            <span class="text-xs text-gray-400">{{ bar.month }}</span>
          </div>
        </div>
      </div>

      <!-- Quick Actions & Activity -->
      <div class="space-y-4">
        <!-- Quick Actions -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 class="font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div class="space-y-2">
            <RouterLink
              v-for="action in quickActions"
              :key="action.label"
              :to="action.path"
              class="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 transition-colors group"
            >
              <div class="w-8 h-8 rounded-lg flex items-center justify-center" :style="{ background: action.bg }">
                <component :is="action.icon" class="w-4 h-4" :style="{ color: action.color }" />
              </div>
              <span class="text-sm font-medium text-gray-700 group-hover:text-purple-700">{{ action.label }}</span>
              <ChevronRightIcon class="w-4 h-4 text-gray-300 ml-auto" />
            </RouterLink>
          </div>
        </div>

        <!-- Top Courses -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 class="font-bold text-gray-900 mb-4">Top Courses</h3>
          <div class="space-y-3">
            <div v-for="(course, i) in topCourses" :key="course.id" class="flex items-center gap-3">
              <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                :class="i === 0 ? 'bg-gold-500 text-white' : i === 1 ? 'bg-gray-300 text-gray-700' : 'bg-orange-200 text-orange-700'">
                {{ i + 1 }}
              </span>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-semibold text-gray-900 line-clamp-1">{{ course.title }}</p>
                <p class="text-xs text-gray-500">{{ course.enrolledCount?.toLocaleString() }} enrolled</p>
              </div>
              <span class="text-xs font-bold text-purple-700">${{ course.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Recent Activity -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 class="text-lg font-bold text-gray-900 mb-5">Recent Activity</h2>
        <div class="space-y-4">
          <div v-for="activity in recentActivity" :key="activity.id" class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" :class="activityColors[activity.type]?.bg">
              <component :is="activityIcons[activity.type]" class="w-4 h-4" :class="activityColors[activity.type]?.text" />
            </div>
            <div class="flex-1">
              <p class="text-sm text-gray-700">{{ activity.message }}</p>
              <p class="text-xs text-gray-400 mt-0.5">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Summary -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 class="text-lg font-bold text-gray-900 mb-5">Platform Summary</h2>
        <div class="space-y-4">
          <div v-for="summary in platformSummary" :key="summary.label" class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" :style="{ background: summary.bg }">
              <component :is="summary.icon" class="w-5 h-5" :style="{ color: summary.color }" />
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between mb-1">
                <span class="text-sm font-medium text-gray-700">{{ summary.label }}</span>
                <span class="text-sm font-bold text-gray-900">{{ summary.value }}</span>
              </div>
              <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full rounded-full transition-all duration-700" :style="{ width: summary.pct + '%', background: summary.color }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { computed } from 'vue'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import { RouterLink } from 'vue-router'
import { useAdminStore } from '@/stores/admin'
import { useLMSStore } from '@/stores/lms'
import { useJobsStore } from '@/stores/jobs'
import {
  UsersIcon, AcademicCapIcon, BriefcaseIcon, CurrencyDollarIcon,
  ChartBarIcon, ShieldCheckIcon, PlusIcon, ChevronRightIcon,
  BookOpenIcon, StarIcon, DocumentCheckIcon, BellIcon
} from '@heroicons/vue/24/outline'

const adminStore = useAdminStore()
const lmsStore = useLMSStore()
const jobsStore = useJobsStore()
const stats = computed(() => adminStore.stats)

const mainStats = computed(() => [
  { icon: UsersIcon, label: 'Total Users', value: stats.value.totalUsers?.toLocaleString(), trend: 12, trendUp: true, bg: '#ede9fe', color: '#7c3aed' },
  { icon: AcademicCapIcon, label: 'Total Enrollments', value: stats.value.totalEnrollments?.toLocaleString(), trend: 8, trendUp: true, bg: '#fef3c7', color: '#d97706' },
  { icon: CurrencyDollarIcon, label: 'Total Revenue', value: '$' + (stats.value.totalRevenue || 0).toFixed(0), trend: 15, trendUp: true, bg: '#d1fae5', color: '#059669' },
  { icon: BriefcaseIcon, label: 'Active Jobs', value: stats.value.totalJobs?.toLocaleString(), trend: 5, trendUp: true, bg: '#fee2e2', color: '#dc2626' },
])

const topCourses = computed(() => lmsStore.courses.sort((a, b) => b.enrolledCount - a.enrolledCount).slice(0, 5))

const revenueData = [
  { month: 'J', value: 18000 }, { month: 'F', value: 22000 }, { month: 'M', value: 19000 },
  { month: 'A', value: 31000 }, { month: 'M', value: 27000 }, { month: 'J', value: 38000 },
  { month: 'J', value: 34000 }, { month: 'A', value: 42000 }, { month: 'S', value: 36000 },
  { month: 'O', value: 45000 }, { month: 'N', value: 51000 }, { month: 'D', value: 58000 },
]
const maxRevenue = Math.max(...revenueData.map(d => d.value))

const quickActions = [
  { label: 'Manage Users', path: '/admin/users', icon: UsersIcon, bg: '#ede9fe', color: '#7c3aed' },
  { label: 'Review Courses', path: '/admin/courses', icon: AcademicCapIcon, bg: '#fef3c7', color: '#d97706' },
  { label: 'View Job Posts', path: '/admin/jobs', icon: BriefcaseIcon, bg: '#d1fae5', color: '#059669' },
  { label: 'Check Analytics', path: '/admin/analytics', icon: ChartBarIcon, bg: '#fee2e2', color: '#dc2626' },
  { label: 'View Payments', path: '/admin/payments', icon: CurrencyDollarIcon, bg: '#e0f2fe', color: '#0284c7' },
]

const recentActivity = computed(() => stats.value.recentActivity || [])

const activityIcons = {
  enrollment: AcademicCapIcon,
  job: BriefcaseIcon,
  application: DocumentCheckIcon,
  payment: CurrencyDollarIcon,
  user: UsersIcon,
  certificate: StarIcon,
  review: StarIcon,
}
const activityColors = {
  enrollment: { bg: 'bg-purple-100', text: 'text-purple-600' },
  job: { bg: 'bg-blue-100', text: 'text-blue-600' },
  application: { bg: 'bg-indigo-100', text: 'text-indigo-600' },
  payment: { bg: 'bg-green-100', text: 'text-green-600' },
  user: { bg: 'bg-orange-100', text: 'text-orange-600' },
  certificate: { bg: 'bg-gold-100', text: 'text-gold-600' },
  review: { bg: 'bg-yellow-100', text: 'text-yellow-600' },
}

const platformSummary = computed(() => [
  { icon: UsersIcon, label: 'Active Users', value: stats.value.totalUsers, pct: 78, bg: '#ede9fe', color: '#7c3aed' },
  { icon: AcademicCapIcon, label: 'Paid Students', value: stats.value.paidStudents, pct: 45, bg: '#fef3c7', color: '#d97706' },
  { icon: BriefcaseIcon, label: 'Job Applications', value: stats.value.totalApplications, pct: 62, bg: '#d1fae5', color: '#059669' },
  { icon: ChartBarIcon, label: 'Page Views', value: stats.value.pageViews?.toLocaleString(), pct: 88, bg: '#fee2e2', color: '#dc2626' },
])
</script>

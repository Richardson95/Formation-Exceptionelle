<template>
  <AdminLayout>
    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-900">Platform Analytics</h2>
      <p class="text-gray-500 text-sm">Real-time insights and performance metrics</p>
    </div>

    <!-- Key Metrics -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div v-for="metric in keyMetrics" :key="metric.label" class="stat-card">
        <div class="flex items-center justify-between mb-3">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center" :style="{ background: metric.bg }">
            <component :is="metric.icon" class="w-5 h-5" :style="{ color: metric.color }" />
          </div>
          <span class="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">+{{ metric.change }}%</span>
        </div>
        <div class="text-2xl font-bold text-gray-900">{{ metric.value }}</div>
        <div class="text-sm text-gray-500">{{ metric.label }}</div>
      </div>
    </div>

    <div class="grid lg:grid-cols-2 gap-6 mb-6">
      <!-- Enrollment Trend -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 class="font-bold text-gray-900 mb-5">Enrollment Trend (12 Months)</h3>
        <div class="flex items-end gap-1.5 h-40 border-b border-l border-gray-100 pl-2">
          <div v-for="(bar, i) in enrollmentData" :key="i" class="flex-1 flex flex-col items-center gap-1 group">
            <div
              class="w-full rounded-t-md bg-purple-300 group-hover:bg-purple-600 transition-colors cursor-pointer"
              :style="{ height: (bar.count / maxEnrollment * 150) + 'px' }"
            ></div>
            <span class="text-xs text-gray-400">{{ bar.month }}</span>
          </div>
        </div>
      </div>

      <!-- Revenue by Category -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 class="font-bold text-gray-900 mb-5">Revenue by Category</h3>
        <div class="space-y-4">
          <div v-for="cat in categoryRevenue" :key="cat.name" class="flex items-center gap-4">
            <span class="text-sm text-gray-700 w-32 flex-shrink-0">{{ cat.name }}</span>
            <div class="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full rounded-full transition-all duration-700" :style="{ width: cat.pct + '%', background: cat.color }"></div>
            </div>
            <span class="text-sm font-bold text-gray-900 w-12 text-right">{{ cat.pct }}%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Traffic & Conversion -->
    <div class="grid lg:grid-cols-3 gap-6">
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 class="font-bold text-gray-900 mb-5">Traffic Sources</h3>
        <div class="space-y-3">
          <div v-for="source in trafficSources" :key="source.name" class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full" :style="{ background: source.color }"></div>
              <span class="text-sm text-gray-700">{{ source.name }}</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full rounded-full" :style="{ width: source.pct + '%', background: source.color }"></div>
              </div>
              <span class="text-sm font-semibold text-gray-900 w-8 text-right">{{ source.pct }}%</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 class="font-bold text-gray-900 mb-5">User Demographics</h3>
        <div class="space-y-3">
          <div v-for="demo in demographics" :key="demo.country">
            <div class="flex justify-between mb-1">
              <span class="text-sm text-gray-700">{{ demo.country }}</span>
              <span class="text-sm font-semibold text-gray-900">{{ demo.pct }}%</span>
            </div>
            <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full bg-purple-500 rounded-full" :style="{ width: demo.pct + '%' }"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 class="font-bold text-gray-900 mb-5">Conversion Funnel</h3>
        <div class="space-y-3">
          <div v-for="(step, i) in funnel" :key="step.label" class="relative">
            <div class="flex justify-between mb-1">
              <span class="text-sm text-gray-700">{{ step.label }}</span>
              <span class="text-sm font-semibold text-gray-900">{{ step.value.toLocaleString() }}</span>
            </div>
            <div class="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all duration-700"
                :style="{ width: (step.value / funnel[0].value * 100) + '%', background: `hsl(${270 - i * 20}, 70%, ${50 + i * 5}%)` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/components/admin/AdminLayout.vue'
import { UsersIcon, EyeIcon, CurrencyDollarIcon, AcademicCapIcon } from '@heroicons/vue/24/outline'

const keyMetrics = [
  { icon: EyeIcon, label: 'Page Views', value: '48,239', change: 18, bg: '#ede9fe', color: '#7c3aed' },
  { icon: UsersIcon, label: 'Unique Visitors', value: '12,847', change: 12, bg: '#fef3c7', color: '#d97706' },
  { icon: AcademicCapIcon, label: 'New Enrollments', value: '1,284', change: 23, bg: '#d1fae5', color: '#059669' },
  { icon: CurrencyDollarIcon, label: 'Revenue MTD', value: '$58,200', change: 15, bg: '#fee2e2', color: '#dc2626' },
]

const enrollmentData = [
  { month: 'J', count: 120 }, { month: 'F', count: 180 }, { month: 'M', count: 150 },
  { month: 'A', count: 280 }, { month: 'M', count: 240 }, { month: 'J', count: 350 },
  { month: 'J', count: 310 }, { month: 'A', count: 420 }, { month: 'S', count: 380 },
  { month: 'O', count: 460 }, { month: 'N', count: 520 }, { month: 'D', count: 600 },
]
const maxEnrollment = Math.max(...enrollmentData.map(d => d.count))

const categoryRevenue = [
  { name: 'Web Development', pct: 35, color: '#7c3aed' },
  { name: 'Data Science', pct: 22, color: '#d97706' },
  { name: 'Business', pct: 18, color: '#059669' },
  { name: 'Design', pct: 14, color: '#dc2626' },
  { name: 'Marketing', pct: 11, color: '#0284c7' },
]

const trafficSources = [
  { name: 'Organic Search', pct: 42, color: '#7c3aed' },
  { name: 'Social Media', pct: 28, color: '#d97706' },
  { name: 'Direct', pct: 18, color: '#059669' },
  { name: 'Referral', pct: 12, color: '#dc2626' },
]

const demographics = [
  { country: 'Nigeria', pct: 45 },
  { country: 'Ghana', pct: 18 },
  { country: 'Kenya', pct: 14 },
  { country: 'South Africa', pct: 12 },
  { country: 'Others', pct: 11 },
]

const funnel = [
  { label: 'Visitors', value: 48239 },
  { label: 'Sign Ups', value: 12847 },
  { label: 'Course Views', value: 6420 },
  { label: 'Add to Cart', value: 2840 },
  { label: 'Purchases', value: 1284 },
]
</script>

<template>
  <AdminLayout>
    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-900">Platform Analytics</h2>
      <p class="text-gray-500 text-sm">Real-time insights and performance metrics</p>
    </div>

    <!-- Key Metrics -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div v-for="metric in keyMetrics" :key="metric.label" class="stat-card">
        <div class="flex items-center mb-3">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center" :style="{ background: metric.bg }">
            <component :is="metric.icon" class="w-5 h-5" :style="{ color: metric.color }" />
          </div>
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
        <p v-if="!categoryRevenue.length" class="text-sm text-gray-400">No paid orders yet.</p>
        <div v-else class="space-y-4">
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

  </AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import { API_ENABLED, get } from '@/services/api'
import { CurrencyDollarIcon, AcademicCapIcon, UsersIcon, CreditCardIcon } from '@heroicons/vue/24/outline'

const PALETTE = ['#7c3aed', '#d97706', '#059669', '#dc2626', '#0284c7', '#9333ea', '#0891b2']
const naira = (n) => `₦${Number(n || 0).toLocaleString()}`
const num = (n) => Number(n || 0).toLocaleString()

const data = ref(null)
onMounted(async () => {
  if (!API_ENABLED) return
  try { data.value = await get('/admin/analytics') } catch { /* keep defaults */ }
})

// Every figure below is computed by the backend from real orders, enrollments and
// users. Traffic metrics (page views, visitors, conversion funnel) are absent on
// purpose: nothing tracks them, so there is nothing honest to show.
const keyMetrics = computed(() => {
  const k = data.value?.keyMetrics || {}
  return [
    { icon: AcademicCapIcon, label: 'New Enrollments (MTD)', value: num(k.newEnrollments), bg: '#d1fae5', color: '#059669' },
    { icon: CurrencyDollarIcon, label: 'Revenue (MTD)', value: naira(k.revenueMTD), bg: '#fee2e2', color: '#dc2626' },
    { icon: UsersIcon, label: 'Sign Ups', value: num(k.signUps), bg: '#ede9fe', color: '#7c3aed' },
    { icon: CreditCardIcon, label: 'Paying Students', value: num(k.paidStudents), bg: '#fef3c7', color: '#d97706' },
  ]
})

const enrollmentData = computed(() => data.value?.enrollmentTrend || [])
const maxEnrollment = computed(() => Math.max(1, ...enrollmentData.value.map((d) => d.count || 0)))
const categoryRevenue = computed(() => (data.value?.revenueByCategory || []).map((c, i) => ({ ...c, color: PALETTE[i % PALETTE.length] })))
</script>

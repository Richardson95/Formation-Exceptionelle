<template>
  <AdminLayout>
    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-900">Payment Management</h2>
      <p class="text-gray-500 text-sm">Track all transactions and revenue</p>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div v-for="stat in paymentStats" :key="stat.label" class="stat-card">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-3" :style="{ background: stat.bg }">
          <component :is="stat.icon" class="w-5 h-5" :style="{ color: stat.color }" />
        </div>
        <div class="text-2xl font-bold text-gray-900">{{ stat.value }}</div>
        <div class="text-sm text-gray-500">{{ stat.label }}</div>
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 class="font-bold text-gray-900">Recent Transactions</h3>
        <button @click="exportCsv" class="btn-secondary text-sm px-4 py-2">Export CSV</button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="table-header">
              <th class="px-5 py-4 text-left">Transaction ID</th>
              <th class="px-5 py-4 text-left">Student</th>
              <th class="px-5 py-4 text-left">Course</th>
              <th class="px-5 py-4 text-left">Amount</th>
              <th class="px-5 py-4 text-left">Date</th>
              <th class="px-5 py-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="tx in transactions" :key="tx.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-5 py-4 text-xs font-mono text-gray-500">{{ tx.id }}</td>
              <td class="px-5 py-4">
                <p class="font-medium text-gray-900 text-sm">{{ tx.student }}</p>
                <p class="text-xs text-gray-400">{{ tx.email }}</p>
              </td>
              <td class="px-5 py-4 text-sm text-gray-600 max-w-xs">
                <p class="line-clamp-1">{{ tx.course }}</p>
              </td>
              <td class="px-5 py-4 font-bold text-gray-900">₦{{ Number(tx.amount).toLocaleString() }}</td>
              <td class="px-5 py-4 text-sm text-gray-600">{{ tx.date }}</td>
              <td class="px-5 py-4">
                <span class="badge text-xs" :class="{
                  'bg-green-100 text-green-700': tx.status === 'completed',
                  'bg-yellow-100 text-yellow-700': tx.status === 'pending',
                  'bg-red-100 text-red-700': tx.status === 'refunded',
                }">{{ tx.status }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import { API_ENABLED, get } from '@/services/api'
import { CurrencyDollarIcon, UsersIcon, ChartBarIcon } from '@heroicons/vue/24/outline'

const naira = (n) => `₦${Number(n || 0).toLocaleString()}`

// Empty-but-valid defaults; real numbers come from /admin/payments in API mode.
const apiData = ref(null)
onMounted(async () => {
  if (!API_ENABLED) return
  try { apiData.value = await get('/admin/payments') } catch { /* keep defaults */ }
})

const summary = computed(() => apiData.value?.summary || { totalRevenue: 0, paidStudents: 0, avgOrderValue: 0, thisMonth: 0 })
const transactions = computed(() => apiData.value?.transactions || [])

const paymentStats = computed(() => [
  { icon: CurrencyDollarIcon, label: 'Total Revenue', value: naira(summary.value.totalRevenue), bg: '#d1fae5', color: '#059669' },
  { icon: UsersIcon, label: 'Paid Students', value: Number(summary.value.paidStudents || 0).toLocaleString(), bg: '#ede9fe', color: '#7c3aed' },
  { icon: ChartBarIcon, label: 'Avg. Order Value', value: naira(summary.value.avgOrderValue), bg: '#fef3c7', color: '#d97706' },
  { icon: CurrencyDollarIcon, label: 'This Month', value: naira(summary.value.thisMonth), bg: '#fee2e2', color: '#dc2626' },
])

function exportCsv() {
  const rows = [['Transaction ID', 'Student', 'Email', 'Course', 'Amount', 'Date', 'Status']]
  transactions.value.forEach((t) => rows.push([t.id, t.student, t.email, t.course, t.amount, t.date, t.status]))
  const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\r\n')
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
  const a = document.createElement('a')
  a.href = url; a.download = 'transactions.csv'; a.click()
  URL.revokeObjectURL(url)
}
</script>

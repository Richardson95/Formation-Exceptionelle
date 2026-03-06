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
        <button class="btn-secondary text-sm px-4 py-2">Export CSV</button>
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
              <td class="px-5 py-4 font-bold text-gray-900">${{ tx.amount }}</td>
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
import AdminLayout from '@/components/admin/AdminLayout.vue'
import { CurrencyDollarIcon, UsersIcon, ArrowTrendingUpIcon, ChartBarIcon } from '@heroicons/vue/24/outline'

const paymentStats = [
  { icon: CurrencyDollarIcon, label: 'Total Revenue', value: '$124,580', bg: '#d1fae5', color: '#059669' },
  { icon: UsersIcon, label: 'Paid Students', value: '1,284', bg: '#ede9fe', color: '#7c3aed' },
  { icon: ChartBarIcon, label: 'Avg. Order Value', value: '$76.40', bg: '#fef3c7', color: '#d97706' },
  { icon: CurrencyDollarIcon, label: 'This Month', value: '$58,200', bg: '#fee2e2', color: '#dc2626' },
]

const transactions = [
  { id: 'TXN-001-2024', student: 'Chioma Eze', email: 'chioma@email.com', course: 'Complete Web Development Bootcamp', amount: '89.99', date: '2024-02-22', status: 'completed' },
  { id: 'TXN-002-2024', student: 'James Adeyemi', email: 'james@email.com', course: 'Python for Data Science', amount: '79.99', date: '2024-02-21', status: 'completed' },
  { id: 'TXN-003-2024', student: 'Fatima Hassan', email: 'fatima@email.com', course: 'Leadership & Management', amount: '69.99', date: '2024-02-20', status: 'completed' },
  { id: 'TXN-004-2024', student: 'Emmanuel Osei', email: 'emmanuel@email.com', course: 'UI/UX Design Masterclass', amount: '74.99', date: '2024-02-19', status: 'pending' },
  { id: 'TXN-005-2024', student: 'Ngozi Iweala', email: 'ngozi@email.com', course: 'Financial Literacy', amount: '59.99', date: '2024-02-18', status: 'completed' },
  { id: 'TXN-006-2024', student: 'Kwame Mensah', email: 'kwame@email.com', course: 'Complete Web Development Bootcamp', amount: '89.99', date: '2024-02-17', status: 'refunded' },
]
</script>

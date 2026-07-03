<template>
  <AdminLayout>
    <div class="mb-6">
      <h2 class="text-xl font-bold text-gray-900">Instructor Applications</h2>
      <p class="text-gray-500 text-sm">Review applications to become an instructor and approve or reject them.</p>
    </div>

    <!-- Status filter -->
    <div class="flex flex-wrap gap-2 mb-6">
      <button
        v-for="f in filters"
        :key="f.value"
        @click="activeFilter = f.value"
        class="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border"
        :class="activeFilter === f.value ? 'bg-purple-600 border-purple-600 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-purple-300'"
      >
        {{ f.label }} ({{ countByStatus(f.value) }})
      </button>
    </div>

    <div v-if="visible.length === 0" class="bg-white rounded-2xl border border-gray-100 text-center py-16">
      <AcademicCapIcon class="w-12 h-12 text-gray-300 mx-auto mb-3" />
      <p class="text-gray-500">No applications {{ activeFilter === 'all' ? 'yet' : `in "${activeFilter}"` }}.</p>
    </div>

    <div v-else class="space-y-4">
      <div v-for="app in visible" :key="app.id" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div class="flex items-start justify-between gap-3 mb-3">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-11 h-11 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {{ initials(app.fullName) }}
            </div>
            <div class="min-w-0">
              <p class="font-bold text-gray-900 text-sm truncate">{{ app.fullName }}</p>
              <p class="text-gray-500 text-xs truncate">{{ app.email }}</p>
            </div>
          </div>
          <span class="badge text-xs capitalize flex-shrink-0" :class="statusClass(app.status)">{{ app.status }}</span>
        </div>

        <div class="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm mb-3">
          <p><span class="text-gray-500">Title:</span> <span class="font-medium text-gray-800">{{ app.title || '—' }}</span></p>
          <p><span class="text-gray-500">Experience:</span> <span class="font-medium text-gray-800">{{ app.experience || '—' }}</span></p>
          <p><span class="text-gray-500">Category:</span> <span class="font-medium text-gray-800">{{ app.category || '—' }}</span></p>
          <p><span class="text-gray-500">Proposed course:</span> <span class="font-medium text-gray-800">{{ app.courseTopic || '—' }}</span></p>
          <p><span class="text-gray-500">Applied:</span> <span class="font-medium text-gray-800">{{ formatDate(app.createdAt) }}</span></p>
        </div>

        <div v-if="app.bio" class="text-sm text-gray-600 bg-gray-50 rounded-xl p-3 mb-2"><span class="font-medium text-gray-700">Bio:</span> {{ app.bio }}</div>
        <div v-if="app.motivation" class="text-sm text-gray-600 bg-gray-50 rounded-xl p-3 mb-3"><span class="font-medium text-gray-700">Motivation:</span> {{ app.motivation }}</div>

        <div class="flex flex-wrap gap-2 mb-3">
          <a v-if="app.linkedin" :href="app.linkedin" target="_blank" rel="noopener" class="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">LinkedIn ↗</a>
          <button v-if="app.resumeUrl" @click="openResume(app)" class="text-xs px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors flex items-center gap-1">
            <DocumentArrowDownIcon class="w-3.5 h-3.5" /> {{ app.resumeName || 'Resume' }}
          </button>
          <span v-else class="text-xs px-3 py-1.5 rounded-lg bg-gray-50 text-gray-400">No resume attached</span>
        </div>

        <p v-if="app.status === 'rejected' && app.rejectionReason" class="text-xs text-red-500 mb-3">Reason: {{ app.rejectionReason }}</p>

        <div v-if="app.status === 'pending'" class="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
          <button @click="review(app, 'approved')" :disabled="busy" class="text-xs font-medium px-4 py-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-40 transition-colors">Approve &amp; promote</button>
          <button @click="review(app, 'rejected')" :disabled="busy" class="text-xs font-medium px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 disabled:opacity-40 transition-colors">Reject</button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import { API_ENABLED, get, patch } from '@/services/api'
import { toast } from 'vue3-toastify'
import { AcademicCapIcon, DocumentArrowDownIcon } from '@heroicons/vue/24/outline'

const applications = ref([])
const busy = ref(false)
const activeFilter = ref('all')

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
]

async function load() {
  if (!API_ENABLED) return
  try { applications.value = await get('/admin/instructor-applications') } catch { /* keep */ }
}
onMounted(load)

const visible = computed(() =>
  activeFilter.value === 'all' ? applications.value : applications.value.filter((a) => a.status === activeFilter.value)
)
function countByStatus(status) {
  return status === 'all' ? applications.value.length : applications.value.filter((a) => a.status === status).length
}

function initials(name) { return (name || '?').split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase() }
function formatDate(d) { return d ? new Date(d).toLocaleDateString() : '–' }
function statusClass(status) {
  return {
    'bg-gray-100 text-gray-600': status === 'pending',
    'bg-green-100 text-green-700': status === 'approved',
    'bg-red-100 text-red-600': status === 'rejected',
  }
}
function openResume(app) {
  if (app.resumeUrl) window.open(app.resumeUrl, '_blank', 'noopener')
}

async function review(app, status) {
  let reason = ''
  if (status === 'rejected') {
    reason = window.prompt('Reason for rejection (optional):') || ''
  } else if (!window.confirm(`Approve ${app.fullName} as an instructor? This promotes their account.`)) {
    return
  }
  busy.value = true
  try {
    const updated = await patch(`/admin/instructor-applications/${app.id}`, { status, reason })
    const i = applications.value.findIndex((a) => a.id === app.id)
    if (i !== -1) applications.value[i] = { ...applications.value[i], ...updated }
    toast.success(status === 'approved' ? `${app.fullName} is now an instructor` : 'Application rejected')
  } catch (err) {
    toast.error(err.response?.data?.error?.message || err.message || 'Could not update application')
  } finally {
    busy.value = false
  }
}
</script>

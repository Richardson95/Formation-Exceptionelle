<template>
  <div>
    <div v-if="applicants.length === 0" class="text-center py-10">
      <InboxIcon class="w-12 h-12 text-gray-300 mx-auto mb-3" />
      <p class="text-gray-500 text-sm">No applications received yet.</p>
    </div>

    <div v-else class="space-y-4">
      <!-- Status filter -->
      <div class="flex flex-wrap gap-2">
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

      <div
        v-for="app in visibleApplicants"
        :key="app.id"
        class="border border-gray-200 rounded-2xl p-4"
      >
        <div class="flex items-start justify-between gap-3 mb-3">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-11 h-11 rounded-full bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {{ initials(app.fullName) }}
            </div>
            <div class="min-w-0">
              <p class="font-bold text-gray-900 text-sm truncate">{{ app.fullName }}</p>
              <p class="text-gray-500 text-xs truncate">{{ app.email }} · {{ app.phone }}</p>
            </div>
          </div>
          <span class="badge text-xs capitalize flex-shrink-0" :class="statusClass(app.status)">{{ app.status }}</span>
        </div>

        <!-- Meta -->
        <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mb-3">
          <span v-if="app.location">📍 {{ app.location }}</span>
          <span v-if="app.experience">💼 {{ app.experience }} experience</span>
          <span>🗓 Applied {{ formatDate(app.appliedAt) }}</span>
        </div>

        <!-- Links + CV -->
        <div class="flex flex-wrap gap-2 mb-3">
          <a v-if="app.linkedin" :href="app.linkedin" target="_blank" rel="noopener" class="text-xs px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors">LinkedIn ↗</a>
          <a v-if="app.portfolio" :href="app.portfolio" target="_blank" rel="noopener" class="text-xs px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors">Portfolio ↗</a>
          <button v-if="app.cvName" @click="downloadCv(app)" class="text-xs px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors flex items-center gap-1">
            <DocumentArrowDownIcon class="w-3.5 h-3.5" /> {{ app.cvName }}
          </button>
        </div>

        <!-- Cover letter -->
        <div v-if="app.coverLetter" class="mb-3">
          <button @click="toggle(app.id)" class="text-xs font-medium text-purple-700 hover:underline">
            {{ expanded[app.id] ? 'Hide' : 'View' }} cover letter
          </button>
          <p v-if="expanded[app.id]" class="mt-2 text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-3 whitespace-pre-line">{{ app.coverLetter }}</p>
        </div>

        <!-- Actions -->
        <div class="flex flex-wrap gap-2 pt-3 border-t border-gray-100">
          <button @click="setStatus(app, 'shortlisted')" :disabled="jobsStore.loading || app.status === 'shortlisted'" class="text-xs font-medium px-3 py-1.5 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 disabled:opacity-40 transition-colors">Shortlist</button>
          <button @click="setStatus(app, 'accepted')" :disabled="jobsStore.loading || app.status === 'accepted'" class="text-xs font-medium px-3 py-1.5 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-40 transition-colors">Accept</button>
          <button @click="setStatus(app, 'rejected')" :disabled="jobsStore.loading || app.status === 'rejected'" class="text-xs font-medium px-3 py-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 disabled:opacity-40 transition-colors">Reject</button>
          <button v-if="app.status !== 'pending' && app.status !== 'reviewed'" @click="setStatus(app, 'reviewed')" :disabled="jobsStore.loading" class="text-xs font-medium px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">Reset to reviewed</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useJobsStore } from '@/stores/jobs'
import { toast } from 'vue3-toastify'
import { InboxIcon, DocumentArrowDownIcon } from '@heroicons/vue/24/outline'

const props = defineProps({ jobId: { type: String, required: true } })
const jobsStore = useJobsStore()

const activeFilter = ref('all')
const expanded = ref({})

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Shortlisted', value: 'shortlisted' },
  { label: 'Accepted', value: 'accepted' },
  { label: 'Rejected', value: 'rejected' },
]

const applicants = computed(() => jobsStore.getJobApplications(props.jobId))
const visibleApplicants = computed(() =>
  activeFilter.value === 'all' ? applicants.value : applicants.value.filter(a => a.status === activeFilter.value)
)

function countByStatus(status) {
  return status === 'all' ? applicants.value.length : applicants.value.filter(a => a.status === status).length
}

function initials(name) {
  return (name || '?').split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
}

function formatDate(d) {
  return d ? new Date(d).toLocaleDateString() : '–'
}

function statusClass(status) {
  return {
    'bg-gray-100 text-gray-600': status === 'pending',
    'bg-blue-100 text-blue-700': status === 'reviewed',
    'bg-amber-100 text-amber-700': status === 'shortlisted',
    'bg-green-100 text-green-700': status === 'accepted',
    'bg-red-100 text-red-600': status === 'rejected',
  }
}

function toggle(id) {
  expanded.value = { ...expanded.value, [id]: !expanded.value[id] }
}

function downloadCv() {
  toast.info('CV download will be available once the backend file storage is connected.')
}

async function setStatus(app, status) {
  await jobsStore.updateApplicationStatus(app.id, status)
}
</script>

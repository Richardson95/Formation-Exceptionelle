<template>
  <AdminLayout>
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h2 class="text-xl font-bold text-gray-900">Job Management</h2>
        <p class="text-gray-500 text-sm">{{ jobsStore.totalJobs }} active job listings</p>
      </div>
      <div class="relative">
        <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input v-model="search" type="text" placeholder="Search jobs..." class="w-full sm:w-auto pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
      </div>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="stat-card py-4"><div class="text-2xl font-bold text-purple-700">{{ jobsStore.totalJobs }}</div><div class="text-sm text-gray-500">Active Jobs</div></div>
      <div class="stat-card py-4"><div class="text-2xl font-bold text-gold-600">{{ jobsStore.internships.length }}</div><div class="text-sm text-gray-500">Internships</div></div>
      <div class="stat-card py-4"><div class="text-2xl font-bold text-green-600">{{ jobsStore.totalApplications }}</div><div class="text-sm text-gray-500">Applications</div></div>
      <div class="stat-card py-4" :class="jobsStore.pendingJobs.length ? 'ring-2 ring-amber-300' : ''"><div class="text-2xl font-bold text-amber-600">{{ jobsStore.pendingJobs.length }}</div><div class="text-sm text-gray-500">Pending Review</div></div>
    </div>

    <!-- Pending Approvals banner -->
    <div v-if="jobsStore.pendingJobs.length" class="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
      <div class="flex items-center gap-2 mb-4">
        <ClockIcon class="w-5 h-5 text-amber-600" />
        <h3 class="font-bold text-amber-800">{{ jobsStore.pendingJobs.length }} job{{ jobsStore.pendingJobs.length > 1 ? 's' : '' }} awaiting your approval</h3>
      </div>
      <div class="space-y-3">
        <div v-for="job in jobsStore.pendingJobs" :key="job.id" class="bg-white rounded-xl p-3 flex flex-wrap items-center gap-3 border border-amber-100">
          <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center font-bold text-purple-700 flex-shrink-0">{{ job.company[0] }}</div>
          <div class="flex-1 min-w-[140px]">
            <p class="font-semibold text-gray-900 text-sm line-clamp-1">{{ job.title }}</p>
            <p class="text-gray-400 text-xs line-clamp-1">{{ job.company }} · {{ job.type }} · {{ job.location }}</p>
          </div>
          <div class="flex items-center gap-2 ml-auto">
            <RouterLink :to="{ name: 'job-detail', params: { id: job.id } }" class="text-xs text-purple-700 hover:underline font-medium">Review</RouterLink>
            <button @click="jobsStore.approveJob(job.id)" :disabled="jobsStore.loading" class="text-xs font-medium bg-green-500 hover:bg-green-600 text-white rounded-lg px-3 py-1.5 transition-colors">Approve</button>
            <button @click="openReject(job)" :disabled="jobsStore.loading" class="text-xs font-medium bg-white border border-red-300 text-red-500 hover:bg-red-50 rounded-lg px-3 py-1.5 transition-colors">Reject</button>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="table-header">
              <th class="px-5 py-4 text-left">Job</th>
              <th class="px-5 py-4 text-left">Company</th>
              <th class="px-5 py-4 text-left">Type</th>
              <th class="px-5 py-4 text-left">Applications</th>
              <th class="px-5 py-4 text-left">Deadline</th>
              <th class="px-5 py-4 text-left">Status</th>
              <th class="px-5 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="job in filteredJobs" :key="job.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-5 py-4">
                <p class="font-semibold text-gray-900 text-sm">{{ job.title }}</p>
                <p class="text-gray-400 text-xs">{{ job.location }}</p>
              </td>
              <td class="px-5 py-4 text-sm text-gray-600">{{ job.company }}</td>
              <td class="px-5 py-4">
                <span class="badge text-xs" :class="{ 'bg-blue-100 text-blue-700': job.type === 'Full-time', 'bg-purple-100 text-purple-700': job.type === 'Internship', 'bg-orange-100 text-orange-700': job.type === 'Contract' }">{{ job.type }}</span>
              </td>
              <td class="px-5 py-4 text-sm font-semibold text-gray-900">{{ job.applications }}</td>
              <td class="px-5 py-4 text-sm text-gray-600">{{ job.deadline }}</td>
              <td class="px-5 py-4">
                <span v-if="job.status === 'pending'" class="badge bg-amber-100 text-amber-700 text-xs">Pending</span>
                <span v-else-if="job.status === 'rejected'" class="badge bg-red-100 text-red-700 text-xs">Rejected</span>
                <span v-else class="flex items-center gap-1.5 text-xs">
                  <span class="w-2 h-2 rounded-full" :class="job.isActive ? 'bg-green-400' : 'bg-gray-300'"></span>
                  <span :class="job.isActive ? 'text-green-600' : 'text-gray-500'">{{ job.isActive ? 'Active' : 'Closed' }}</span>
                </span>
              </td>
              <td class="px-5 py-4">
                <div class="flex gap-2">
                  <RouterLink :to="{ name: 'job-detail', params: { id: job.id } }" class="text-xs text-purple-700 hover:underline font-medium">View</RouterLink>
                  <button @click="viewingApplicants = job" class="text-xs text-indigo-600 hover:underline font-medium">Applicants ({{ jobsStore.getJobApplications(job.id).length }})</button>
                  <button v-if="job.status !== 'approved' && job.status !== undefined" @click="jobsStore.approveJob(job.id)" class="text-xs text-green-600 hover:underline font-medium">Approve</button>
                  <button v-if="job.status === 'pending'" @click="openReject(job)" class="text-xs text-orange-600 hover:underline font-medium">Reject</button>
                  <button @click="openEditor(job)" class="text-xs text-blue-600 hover:underline font-medium">Edit</button>
                  <button @click="toggleFeature(job)" class="text-xs font-medium" :class="job.isFeatured ? 'text-gold-600' : 'text-gray-500 hover:text-gold-600'">{{ job.isFeatured ? 'Unfeature' : 'Feature' }}</button>
                  <button @click="toggleActive(job)" class="text-xs font-medium" :class="job.isActive ? 'text-gray-500 hover:text-gray-700' : 'text-green-600'">{{ job.isActive ? 'Close' : 'Reopen' }}</button>
                  <button @click="confirmRemove(job)" class="text-xs text-red-500 hover:underline font-medium">Remove</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Salary / Status Editor -->
    <Transition name="modal">
      <div v-if="editing" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div class="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
          <div class="flex items-start justify-between mb-5">
            <div>
              <h3 class="text-lg font-bold text-gray-900">Manage Listing</h3>
              <p class="text-gray-500 text-sm line-clamp-1 max-w-xs">{{ editing.title }} · {{ editing.company }}</p>
            </div>
            <button @click="editing = null" class="text-gray-400 hover:text-gray-600"><XMarkIcon class="w-5 h-5" /></button>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Min Salary (₦)</label>
              <input v-model.number="form.min" type="number" min="0" step="1000" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Max Salary (₦)</label>
              <input v-model.number="form.max" type="number" min="0" step="1000" class="input-field" />
            </div>
          </div>
          <div class="mb-5">
            <label class="block text-sm font-medium text-gray-700 mb-2">Pay Period</label>
            <select v-model="form.period" class="input-field">
              <option>monthly</option><option>yearly</option><option>hourly</option>
            </select>
          </div>

          <div class="flex gap-4 mb-6">
            <label class="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
              <input type="checkbox" v-model="form.isFeatured" class="rounded border-gray-300 text-purple-600 focus:ring-purple-500" /> Featured
            </label>
            <label class="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
              <input type="checkbox" v-model="form.isActive" class="rounded border-gray-300 text-purple-600 focus:ring-purple-500" /> Active
            </label>
          </div>

          <div v-if="form.max && form.min > form.max" class="text-xs text-red-500 mb-4">Min salary should not exceed max salary.</div>

          <div class="flex gap-2">
            <button @click="saveEditor" :disabled="jobsStore.loading" class="btn-primary flex-1 text-sm py-2.5">{{ jobsStore.loading ? 'Saving...' : 'Save Changes' }}</button>
            <button @click="editing = null" class="btn-secondary flex-1 text-sm py-2.5">Cancel</button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Applicants Review Modal -->
    <Transition name="modal">
      <div v-if="viewingApplicants" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div class="bg-white rounded-2xl w-full max-w-2xl shadow-2xl max-h-[85vh] flex flex-col">
          <div class="flex items-start justify-between p-6 border-b border-gray-100">
            <div>
              <h3 class="text-lg font-bold text-gray-900">Applicants</h3>
              <p class="text-gray-500 text-sm line-clamp-1">{{ viewingApplicants.title }} · {{ viewingApplicants.company }}</p>
            </div>
            <button @click="viewingApplicants = null" class="text-gray-400 hover:text-gray-600"><XMarkIcon class="w-5 h-5" /></button>
          </div>
          <div class="p-6 overflow-y-auto">
            <ApplicantList :job-id="viewingApplicants.id" />
          </div>
        </div>
      </div>
    </Transition>

    <!-- Reject Reason Modal -->
    <Transition name="modal">
      <div v-if="rejecting" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div class="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
          <div class="flex items-start justify-between mb-4">
            <h3 class="text-lg font-bold text-gray-900">Reject Job</h3>
            <button @click="rejecting = null" class="text-gray-400 hover:text-gray-600"><XMarkIcon class="w-5 h-5" /></button>
          </div>
          <p class="text-gray-600 text-sm mb-4">Let <strong>{{ rejecting.company }}</strong> know why <strong>{{ rejecting.title }}</strong> wasn't approved.</p>
          <textarea v-model="rejectReason" rows="4" placeholder="e.g. Listing is incomplete or violates posting guidelines..." class="input-field resize-none mb-5"></textarea>
          <div class="flex gap-2">
            <button @click="doReject" :disabled="jobsStore.loading" class="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm py-2.5 font-medium transition-colors">
              {{ jobsStore.loading ? 'Rejecting...' : 'Reject Job' }}
            </button>
            <button @click="rejecting = null" class="btn-secondary flex-1 text-sm py-2.5">Cancel</button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Remove Confirmation -->
    <Transition name="modal">
      <div v-if="removing" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div class="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center">
          <div class="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <TrashIcon class="w-7 h-7 text-red-500" />
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Remove Job?</h3>
          <p class="text-gray-600 text-sm mb-6">Remove <strong>{{ removing.title }}</strong> at <strong>{{ removing.company }}</strong>? This cannot be undone.</p>
          <div class="flex gap-2">
            <button @click="doRemove" :disabled="jobsStore.loading" class="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm py-2.5 font-medium transition-colors">{{ jobsStore.loading ? 'Removing...' : 'Yes, Remove' }}</button>
            <button @click="removing = null" class="btn-secondary flex-1 text-sm py-2.5">Cancel</button>
          </div>
        </div>
      </div>
    </Transition>
  </AdminLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import { useJobsStore } from '@/stores/jobs'
import { RouterLink } from 'vue-router'
import { MagnifyingGlassIcon, XMarkIcon, TrashIcon, ClockIcon } from '@heroicons/vue/24/outline'
import ApplicantList from '@/components/jobs/ApplicantList.vue'

const jobsStore = useJobsStore()
const search = ref('')

const editing = ref(null)
const removing = ref(null)
const rejecting = ref(null)
const rejectReason = ref('')
const viewingApplicants = ref(null)
const form = ref({ min: 0, max: 0, period: 'monthly', isFeatured: false, isActive: true })

const filteredJobs = computed(() => {
  if (!search.value) return jobsStore.jobs
  const q = search.value.toLowerCase()
  return jobsStore.jobs.filter(j => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q))
})

function toggleFeature(job) {
  jobsStore.updateJob(job.id, { isFeatured: !job.isFeatured })
}

function toggleActive(job) {
  jobsStore.updateJob(job.id, { isActive: !job.isActive })
}

function openEditor(job) {
  editing.value = job
  form.value = {
    min: job.salary?.min || 0,
    max: job.salary?.max || 0,
    period: job.salary?.period || 'monthly',
    isFeatured: !!job.isFeatured,
    isActive: !!job.isActive,
  }
}

async function saveEditor() {
  const min = Math.max(0, Number(form.value.min) || 0)
  const max = Math.max(min, Number(form.value.max) || 0)
  await jobsStore.updateJob(editing.value.id, {
    salary: { ...editing.value.salary, min, max, currency: editing.value.salary?.currency || 'NGN', period: form.value.period },
    isFeatured: form.value.isFeatured,
    isActive: form.value.isActive,
  })
  editing.value = null
}

function confirmRemove(job) {
  removing.value = job
}

async function doRemove() {
  await jobsStore.deleteJob(removing.value.id)
  removing.value = null
}

function openReject(job) {
  rejecting.value = job
  rejectReason.value = ''
}

async function doReject() {
  await jobsStore.rejectJob(rejecting.value.id, rejectReason.value)
  rejecting.value = null
}
</script>

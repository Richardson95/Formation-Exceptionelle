<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    <div class="container-custom pt-28 pb-16">
      <!-- Header -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-1">My Job Postings</h1>
          <p class="text-gray-600">Review applicants and manage candidates for the roles you've posted.</p>
        </div>
        <RouterLink to="/jobs/post" class="btn-primary">
          <PlusIcon class="w-5 h-5 mr-2" /> Post a Job
        </RouterLink>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-3 gap-4 mb-8">
        <div class="stat-card py-4"><div class="text-2xl font-bold text-purple-700">{{ myJobs.length }}</div><div class="text-sm text-gray-500">Jobs Posted</div></div>
        <div class="stat-card py-4"><div class="text-2xl font-bold text-blue-600">{{ totalApplicants }}</div><div class="text-sm text-gray-500">Total Applicants</div></div>
        <div class="stat-card py-4"><div class="text-2xl font-bold text-amber-600">{{ shortlistedCount }}</div><div class="text-sm text-gray-500">Shortlisted</div></div>
      </div>

      <!-- Empty -->
      <div v-if="myJobs.length === 0" class="bg-white rounded-2xl border border-gray-100 shadow-sm text-center py-16">
        <BriefcaseIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 class="text-xl font-bold text-gray-900 mb-2">You haven't posted any jobs yet</h3>
        <p class="text-gray-500 mb-6">Post a role to start receiving applications from candidates.</p>
        <RouterLink to="/jobs/post" class="btn-primary">Post Your First Job</RouterLink>
      </div>

      <!-- Job list -->
      <div v-else class="space-y-4">
        <div v-for="job in myJobs" :key="job.id" class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div class="flex items-center gap-4 p-5">
            <button @click="toggle(job.id)" class="flex items-center gap-4 flex-1 min-w-0 text-left">
              <div class="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center font-bold text-purple-700 flex-shrink-0">{{ job.company[0] }}</div>
              <div class="flex-1 min-w-0">
                <p class="font-bold text-gray-900 text-sm line-clamp-1">{{ job.title }}</p>
                <p class="text-gray-500 text-xs">{{ job.type }} · {{ job.location }}</p>
              </div>
            </button>
            <div class="flex items-center gap-3 flex-shrink-0">
              <span v-if="job.status === 'pending'" class="badge bg-amber-100 text-amber-700 text-xs">Pending approval</span>
              <span v-else-if="job.status === 'rejected'" class="badge bg-red-100 text-red-600 text-xs">Rejected</span>
              <span v-else class="badge bg-green-100 text-green-700 text-xs">{{ job.isActive ? 'Live' : 'Closed' }}</span>
              <span class="hidden sm:inline text-sm font-semibold text-gray-700">{{ countFor(job.id) }} applicant{{ countFor(job.id) === 1 ? '' : 's' }}</span>
              <RouterLink :to="{ name: 'edit-job', params: { id: job.id } }" class="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline">
                <PencilSquareIcon class="w-4 h-4" /> Edit
              </RouterLink>
              <button @click="toggle(job.id)" class="text-gray-400 hover:text-gray-600">
                <ChevronDownIcon class="w-5 h-5 transition-transform" :class="open[job.id] ? 'rotate-180' : ''" />
              </button>
            </div>
          </div>
          <div v-if="open[job.id]" class="border-t border-gray-100 p-5 bg-gray-50/50">
            <ApplicantList :job-id="job.id" />
          </div>
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
import { useJobsStore } from '@/stores/jobs'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import ApplicantList from '@/components/jobs/ApplicantList.vue'
import { PlusIcon, BriefcaseIcon, ChevronDownIcon, PencilSquareIcon } from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
const jobsStore = useJobsStore()
const open = ref({})

const myJobs = computed(() => jobsStore.getPostedJobs(authStore.user?.id))
const myApplications = computed(() => jobsStore.getPosterApplications(authStore.user?.id))
const totalApplicants = computed(() => myApplications.value.length)
const shortlistedCount = computed(() => myApplications.value.filter(a => a.status === 'shortlisted').length)

function countFor(jobId) {
  return jobsStore.getJobApplications(jobId).length
}

function toggle(id) {
  open.value = { ...open.value, [id]: !open.value[id] }
}
</script>

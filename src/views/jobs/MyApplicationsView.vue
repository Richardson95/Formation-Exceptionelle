<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    <div class="container-custom pt-28 pb-16 max-w-4xl">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-1">My Applications</h1>
        <p class="text-gray-600">Track the status of the jobs you've applied to.</p>
      </div>

      <!-- Status legend / counts -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div class="stat-card py-4"><div class="text-2xl font-bold text-gray-900">{{ applications.length }}</div><div class="text-sm text-gray-500">Applied</div></div>
        <div class="stat-card py-4"><div class="text-2xl font-bold text-amber-600">{{ countBy('shortlisted') }}</div><div class="text-sm text-gray-500">Shortlisted</div></div>
        <div class="stat-card py-4"><div class="text-2xl font-bold text-green-600">{{ countBy('accepted') }}</div><div class="text-sm text-gray-500">Accepted</div></div>
        <div class="stat-card py-4"><div class="text-2xl font-bold text-red-500">{{ countBy('rejected') }}</div><div class="text-sm text-gray-500">Rejected</div></div>
      </div>

      <!-- Empty -->
      <div v-if="applications.length === 0" class="bg-white rounded-2xl border border-gray-100 shadow-sm text-center py-16">
        <DocumentTextIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 class="text-xl font-bold text-gray-900 mb-2">No applications yet</h3>
        <p class="text-gray-500 mb-6">Browse open roles and apply to start tracking them here.</p>
        <RouterLink to="/jobs" class="btn-primary">Browse Jobs</RouterLink>
      </div>

      <!-- List -->
      <div v-else class="space-y-4">
        <div v-for="app in applications" :key="app.id" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center font-bold text-purple-700 flex-shrink-0">{{ app.job.company[0] }}</div>
          <div class="flex-1 min-w-0">
            <RouterLink :to="{ name: 'job-detail', params: { id: app.job.id } }" class="font-bold text-gray-900 text-sm hover:text-purple-700 transition-colors line-clamp-1">{{ app.job.title }}</RouterLink>
            <p class="text-gray-500 text-xs">{{ app.job.company }} · {{ app.job.location }}</p>
            <p class="text-gray-400 text-xs mt-0.5">Applied {{ formatDate(app.appliedAt) }}</p>
          </div>
          <div class="text-right flex-shrink-0">
            <span class="badge text-xs capitalize" :class="statusClass(app.status)">{{ statusLabel(app.status) }}</span>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useJobsStore } from '@/stores/jobs'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { DocumentTextIcon } from '@heroicons/vue/24/outline'

const authStore = useAuthStore()
const jobsStore = useJobsStore()

const applications = computed(() =>
  jobsStore.getUserApplications(authStore.user?.id)
    .sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))
)

function countBy(status) {
  return applications.value.filter(a => a.status === status).length
}

function formatDate(d) {
  return d ? new Date(d).toLocaleDateString() : '–'
}

function statusLabel(status) {
  return status === 'pending' ? 'Under review' : status
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
</script>

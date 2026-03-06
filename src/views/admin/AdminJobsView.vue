<template>
  <AdminLayout>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-xl font-bold text-gray-900">Job Management</h2>
        <p class="text-gray-500 text-sm">{{ jobsStore.totalJobs }} active job listings</p>
      </div>
      <div class="relative">
        <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input v-model="search" type="text" placeholder="Search jobs..." class="pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
      </div>
    </div>

    <div class="grid grid-cols-4 gap-4 mb-6">
      <div class="stat-card py-4"><div class="text-2xl font-bold text-purple-700">{{ jobsStore.totalJobs }}</div><div class="text-sm text-gray-500">Active Jobs</div></div>
      <div class="stat-card py-4"><div class="text-2xl font-bold text-gold-600">{{ jobsStore.internships.length }}</div><div class="text-sm text-gray-500">Internships</div></div>
      <div class="stat-card py-4"><div class="text-2xl font-bold text-green-600">{{ jobsStore.totalApplications }}</div><div class="text-sm text-gray-500">Applications</div></div>
      <div class="stat-card py-4"><div class="text-2xl font-bold text-blue-600">{{ jobsStore.jobs.filter(j => j.isFeatured).length }}</div><div class="text-sm text-gray-500">Featured</div></div>
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
                <span class="flex items-center gap-1.5 text-xs">
                  <span class="w-2 h-2 rounded-full" :class="job.isActive ? 'bg-green-400' : 'bg-gray-300'"></span>
                  <span :class="job.isActive ? 'text-green-600' : 'text-gray-500'">{{ job.isActive ? 'Active' : 'Closed' }}</span>
                </span>
              </td>
              <td class="px-5 py-4">
                <div class="flex gap-2">
                  <RouterLink :to="{ name: 'job-detail', params: { id: job.id } }" class="text-xs text-purple-700 hover:underline font-medium">View</RouterLink>
                  <button @click="toggleFeature(job)" class="text-xs font-medium" :class="job.isFeatured ? 'text-gold-600' : 'text-gray-500 hover:text-gold-600'">{{ job.isFeatured ? 'Unfeature' : 'Feature' }}</button>
                  <button class="text-xs text-red-500 hover:underline font-medium">Remove</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import { useJobsStore } from '@/stores/jobs'
import { RouterLink } from 'vue-router'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { toast } from 'vue3-toastify'

const jobsStore = useJobsStore()
const search = ref('')

const filteredJobs = computed(() => {
  if (!search.value) return jobsStore.jobs
  const q = search.value.toLowerCase()
  return jobsStore.jobs.filter(j => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q))
})

function toggleFeature(job) {
  job.isFeatured = !job.isFeatured
  toast.success(job.isFeatured ? 'Job featured!' : 'Job unfeatured')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />

    <!-- Hero -->
    <div class="bg-gradient-fe pt-24 pb-12">
      <div class="container-custom text-center">
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-3">Find Your Dream Job</h1>
        <p class="text-purple-200 mb-6">{{ jobsStore.totalJobs }}+ active opportunities from top employers</p>
        <div class="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
          <div class="relative flex-1">
            <MagnifyingGlassIcon class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input v-model="jobsStore.searchQuery" type="text" placeholder="Job title, company, or skills..." class="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-gold-400 shadow-lg" />
          </div>
          <RouterLink to="/jobs/post" class="btn-gold text-base px-6 py-4 flex-shrink-0">
            Post a Job
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="container-custom py-10">
      <!-- Quick Filters -->
      <div class="flex flex-wrap gap-2 mb-8">
        <button
          v-for="type in jobsStore.types"
          :key="type"
          @click="jobsStore.selectedType = type"
          class="px-4 py-2 rounded-xl text-sm font-medium transition-all"
          :class="jobsStore.selectedType === type
            ? 'bg-purple-700 text-white shadow-fe'
            : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-300'"
        >{{ type }}</button>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar -->
        <aside class="lg:w-64 flex-shrink-0">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-24">
            <div class="flex items-center justify-between mb-5">
              <h3 class="font-bold text-gray-900">Filters</h3>
              <button @click="resetFilters" class="text-xs text-purple-700 font-semibold hover:underline">Clear all</button>
            </div>

            <div class="mb-5">
              <h4 class="text-sm font-semibold text-gray-700 mb-3">Category</h4>
              <div class="space-y-2">
                <label v-for="cat in jobsStore.categories" :key="cat" class="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" :value="cat" v-model="jobsStore.selectedCategory" class="text-purple-600 focus:ring-purple-500" />
                  <span class="text-sm text-gray-700 group-hover:text-purple-700 transition-colors">{{ cat }}</span>
                </label>
              </div>
            </div>

            <div class="mb-5">
              <h4 class="text-sm font-semibold text-gray-700 mb-3">Location Type</h4>
              <div class="space-y-2">
                <label v-for="loc in jobsStore.locationTypes" :key="loc" class="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" :value="loc" v-model="jobsStore.selectedLocation" class="text-purple-600 focus:ring-purple-500" />
                  <span class="text-sm text-gray-700 group-hover:text-purple-700 transition-colors">{{ loc }}</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        <!-- Job Listings -->
        <div class="flex-1">
          <div class="flex items-center justify-between mb-5">
            <p class="text-gray-600 text-sm">
              <span class="font-bold text-gray-900">{{ jobsStore.filteredJobs.length }}</span> jobs found
            </p>
            <select v-model="jobsStore.sortBy" class="px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400">
              <option value="newest">Newest First</option>
              <option value="popular">Most Applied</option>
              <option value="salary-high">Highest Salary</option>
            </select>
          </div>

          <div v-if="jobsStore.filteredJobs.length > 0" class="space-y-4">
            <JobCard
              v-for="job in jobsStore.filteredJobs"
              :key="job.id"
              :job="job"
              @click="goToJob(job)"
            />
          </div>
          <div v-else class="text-center py-20">
            <BriefcaseIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 class="text-xl font-bold text-gray-900 mb-2">No jobs found</h3>
            <p class="text-gray-500 mb-6">Try different keywords or filters</p>
            <button @click="resetFilters" class="btn-primary">Clear Filters</button>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useJobsStore } from '@/stores/jobs'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import JobCard from '@/components/jobs/JobCard.vue'
import { RouterLink } from 'vue-router'
import { MagnifyingGlassIcon, BriefcaseIcon } from '@heroicons/vue/24/outline'

const jobsStore = useJobsStore()
const router = useRouter()

function goToJob(job) {
  router.push({ name: 'job-detail', params: { id: job.id } })
}

function resetFilters() {
  jobsStore.searchQuery = ''
  jobsStore.selectedType = 'All'
  jobsStore.selectedCategory = 'All'
  jobsStore.selectedLocation = 'All'
}
</script>

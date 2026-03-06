<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    <div v-if="job" class="pt-24 pb-16">
      <div class="container-custom">
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Left Content -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Header Card -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div class="flex items-start gap-4 mb-5">
                <div class="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center font-bold text-purple-700 text-2xl flex-shrink-0">
                  {{ job.company[0] }}
                </div>
                <div>
                  <h1 class="text-2xl font-bold text-gray-900 mb-1">{{ job.title }}</h1>
                  <p class="text-purple-600 font-semibold text-lg mb-2">{{ job.company }}</p>
                  <div class="flex flex-wrap gap-2">
                    <span class="badge" :class="{ 'bg-blue-100 text-blue-700': job.type === 'Full-time', 'bg-purple-100 text-purple-700': job.type === 'Internship', 'bg-orange-100 text-orange-700': job.type === 'Contract' }">{{ job.type }}</span>
                    <span class="badge" :class="{ 'bg-teal-100 text-teal-700': job.locationType === 'Remote', 'bg-gray-100 text-gray-600': job.locationType === 'On-site', 'bg-indigo-100 text-indigo-700': job.locationType === 'Hybrid' }">{{ job.locationType }}</span>
                    <span class="badge bg-green-100 text-green-700">Active</span>
                  </div>
                </div>
                <div v-if="job.isFeatured" class="ml-auto">
                  <span class="badge bg-gold-100 text-gold-700">Featured</span>
                </div>
              </div>

              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div v-for="meta in jobMeta" :key="meta.label" class="bg-gray-50 rounded-xl p-3 text-center">
                  <component :is="meta.icon" class="w-5 h-5 mx-auto mb-1 text-purple-600" />
                  <p class="text-xs text-gray-500">{{ meta.label }}</p>
                  <p class="font-semibold text-gray-900 text-sm">{{ meta.value }}</p>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-4">About This Role</h2>
              <p class="text-gray-700 leading-relaxed mb-6">{{ job.description }}</p>

              <h3 class="font-bold text-gray-900 mb-3">Key Responsibilities</h3>
              <ul class="space-y-2 mb-6">
                <li v-for="resp in job.responsibilities" :key="resp" class="flex items-start gap-2 text-gray-700 text-sm">
                  <CheckCircleIcon class="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />{{ resp }}
                </li>
              </ul>

              <h3 class="font-bold text-gray-900 mb-3">Requirements</h3>
              <ul class="space-y-2 mb-6">
                <li v-for="req in job.requirements" :key="req" class="flex items-start gap-2 text-gray-700 text-sm">
                  <CheckCircleIcon class="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />{{ req }}
                </li>
              </ul>

              <h3 class="font-bold text-gray-900 mb-3">Benefits</h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="ben in job.benefits" :key="ben" class="px-3 py-1.5 bg-green-50 text-green-700 text-xs rounded-xl font-medium border border-green-100 flex items-center gap-1">
                  <CheckIcon class="w-3 h-3 flex-shrink-0" />{{ ben }}
                </span>
              </div>
            </div>

            <!-- Skills Required -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-4">Required Skills</h2>
              <div class="flex flex-wrap gap-3">
                <span v-for="skill in job.skills" :key="skill" class="px-4 py-2 bg-purple-50 text-purple-700 rounded-xl text-sm font-medium border border-purple-100">
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>

          <!-- Right Sidebar -->
          <div class="lg:col-span-1">
            <div class="sticky top-24 space-y-4">
              <!-- Apply Card -->
              <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div class="mb-4">
                  <div class="text-2xl font-bold text-purple-700 mb-1">
                    ₦{{ job.salary.min.toLocaleString() }} – ₦{{ job.salary.max.toLocaleString() }}
                  </div>
                  <p class="text-gray-500 text-sm">Per {{ job.salary.period }}</p>
                </div>

                <div class="space-y-3 mb-5">
                  <div class="flex items-center justify-between text-sm border-b border-gray-50 pb-2">
                    <span class="text-gray-500">Experience</span>
                    <span class="font-medium text-gray-900">{{ job.experience }}</span>
                  </div>
                  <div class="flex items-center justify-between text-sm border-b border-gray-50 pb-2">
                    <span class="text-gray-500">Level</span>
                    <span class="font-medium text-gray-900">{{ job.level }}</span>
                  </div>
                  <div class="flex items-center justify-between text-sm border-b border-gray-50 pb-2">
                    <span class="text-gray-500">Deadline</span>
                    <span class="font-medium text-gray-900">{{ job.deadline }}</span>
                  </div>
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-500">Applicants</span>
                    <span class="font-medium text-gray-900">{{ job.applications }}</span>
                  </div>
                </div>

                <button
                  v-if="!hasApplied"
                  @click="applyNow"
                  class="btn-primary w-full py-4 text-base"
                >
                  Apply Now <ArrowRightIcon class="w-5 h-5 ml-1" />
                </button>
                <div v-else class="w-full py-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-center font-semibold text-sm">
                  <CheckCircleIcon class="w-5 h-5 inline mr-1" />
                  Applied Successfully
                </div>

                <button class="w-full mt-3 flex items-center justify-center gap-2 py-2.5 text-sm text-gray-600 hover:text-purple-700 transition-colors">
                  <BookmarkIcon class="w-4 h-4" /> Save Job
                </button>
              </div>

              <!-- Company Info -->
              <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 class="font-bold text-gray-900 mb-4">About {{ job.company }}</h3>
                <div class="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center font-bold text-purple-700 text-lg mb-3">
                  {{ job.company[0] }}
                </div>
                <p class="text-gray-600 text-sm mb-3">{{ job.company }} is a leading company in the {{ job.category }} sector, committed to innovation and excellence.</p>
                <a href="#" class="text-purple-700 text-sm font-semibold hover:underline">View all jobs at {{ job.company }}</a>
              </div>

              <!-- Similar Jobs -->
              <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 class="font-bold text-gray-900 mb-4">Similar Jobs</h3>
                <div class="space-y-3">
                  <div
                    v-for="sJob in similarJobs"
                    :key="sJob.id"
                    @click="router.push({ name: 'job-detail', params: { id: sJob.id } })"
                    class="p-3 rounded-xl hover:bg-purple-50 cursor-pointer transition-colors"
                  >
                    <p class="font-semibold text-gray-900 text-sm">{{ sJob.title }}</p>
                    <p class="text-gray-500 text-xs">{{ sJob.company }}</p>
                    <span class="text-xs text-purple-600 mt-1 inline-block">{{ sJob.type }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useJobsStore } from '@/stores/jobs'
import { useAuthStore } from '@/stores/auth'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import {
  MapPinIcon, ClockIcon, BriefcaseIcon, CurrencyDollarIcon,
  CheckCircleIcon, CheckIcon, ArrowRightIcon, BookmarkIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const router = useRouter()
const jobsStore = useJobsStore()
const authStore = useAuthStore()

const job = computed(() => jobsStore.getJobById(route.params.id))
const hasApplied = computed(() => jobsStore.hasApplied(authStore.user?.id, job.value?.id))
const similarJobs = computed(() =>
  jobsStore.jobs
    .filter(j => j.id !== job.value?.id && j.category === job.value?.category)
    .slice(0, 3)
)

const jobMeta = computed(() => job.value ? [
  { icon: MapPinIcon, label: 'Location', value: job.value.location },
  { icon: BriefcaseIcon, label: 'Job Type', value: job.value.type },
  { icon: ClockIcon, label: 'Experience', value: job.value.experience },
  { icon: CurrencyDollarIcon, label: 'Salary', value: `₦${(job.value.salary.min / 1000).toFixed(0)}K+` },
] : [])

function applyNow() {
  router.push({ name: 'apply-job', params: { id: job.value.id } })
}
</script>

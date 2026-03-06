<template>
  <div
    class="card card-hover cursor-pointer group p-5"
    @click="$emit('click', job)"
  >
    <div class="flex items-start gap-4">
      <!-- Company Logo -->
      <div class="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0 font-bold text-purple-700 text-lg">
        {{ job.company[0] }}
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-2 mb-1">
          <h3 class="font-bold text-gray-900 text-sm leading-snug group-hover:text-purple-700 transition-colors line-clamp-2">
            {{ job.title }}
          </h3>
          <span v-if="job.isFeatured" class="badge bg-gold-100 text-gold-700 text-xs flex-shrink-0">Featured</span>
        </div>

        <p class="text-gray-600 text-xs font-medium mb-2">{{ job.company }}</p>

        <div class="flex flex-wrap gap-2 mb-3">
          <!-- Location -->
          <span class="flex items-center gap-1 text-xs text-gray-500">
            <MapPinIcon class="w-3.5 h-3.5" />
            {{ job.location }}
          </span>
          <!-- Type -->
          <span
            class="badge text-xs"
            :class="{
              'bg-blue-100 text-blue-700': job.type === 'Full-time',
              'bg-green-100 text-green-700': job.type === 'Part-time',
              'bg-purple-100 text-purple-700': job.type === 'Internship',
              'bg-orange-100 text-orange-700': job.type === 'Contract',
            }"
          >
            {{ job.type }}
          </span>
          <!-- Location Type -->
          <span
            class="badge text-xs"
            :class="{
              'bg-teal-100 text-teal-700': job.locationType === 'Remote',
              'bg-gray-100 text-gray-600': job.locationType === 'On-site',
              'bg-indigo-100 text-indigo-700': job.locationType === 'Hybrid',
            }"
          >
            {{ job.locationType }}
          </span>
        </div>

        <!-- Skills -->
        <div class="flex flex-wrap gap-1.5 mb-3">
          <span
            v-for="skill in job.skills.slice(0, 3)"
            :key="skill"
            class="px-2 py-0.5 bg-purple-50 text-purple-700 text-xs rounded-lg"
          >
            {{ skill }}
          </span>
          <span v-if="job.skills.length > 3" class="text-xs text-gray-400">
            +{{ job.skills.length - 3 }}
          </span>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-between">
          <div class="text-sm font-bold text-purple-700">
            ₦{{ formatSalary(job.salary.min) }} – ₦{{ formatSalary(job.salary.max) }}
            <span class="text-xs font-normal text-gray-400">/{{ job.salary.period }}</span>
          </div>
          <div class="text-xs text-gray-400 flex items-center gap-1">
            <ClockIcon class="w-3.5 h-3.5" />
            {{ formatDate(job.postedAt) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MapPinIcon, ClockIcon } from '@heroicons/vue/24/outline'

defineProps({ job: { type: Object, required: true } })
defineEmits(['click'])

function formatSalary(n) {
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K'
  return n
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  const diff = (Date.now() - d.getTime()) / (1000 * 60 * 60 * 24)
  if (diff < 1) return 'Today'
  if (diff < 2) return 'Yesterday'
  if (diff < 7) return Math.floor(diff) + 'd ago'
  return d.toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })
}
</script>

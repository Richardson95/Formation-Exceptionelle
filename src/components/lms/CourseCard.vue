<template>
  <div
    class="card card-hover cursor-pointer group"
    @click="$emit('click', course)"
  >
    <!-- Thumbnail -->
    <div class="relative overflow-hidden h-44">
      <img
        :src="course.thumbnail"
        :alt="course.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <!-- Price Badge -->
      <div class="absolute top-3 left-3">
        <span v-if="course.price === 0" class="badge bg-green-500 text-white text-xs font-bold px-2.5 py-1">FREE</span>
        <span v-else class="badge bg-purple-900 text-white text-xs font-bold px-2.5 py-1">${{ course.price }}</span>
      </div>
      <!-- Bestseller badge -->
      <div v-if="course.enrolledCount > 50000" class="absolute top-3 right-3 badge bg-gold-500 text-white text-xs font-bold px-2.5 py-1">
        Bestseller
      </div>
      <!-- Preview overlay -->
      <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <div class="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
          <PlayIcon class="w-5 h-5 text-purple-700 ml-0.5" />
        </div>
      </div>
    </div>

    <div class="p-5">
      <!-- Category -->
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-semibold text-purple-600 uppercase tracking-wide">{{ course.category }}</span>
        <span class="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{{ course.level }}</span>
      </div>

      <!-- Title -->
      <h3 class="font-bold text-gray-900 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-purple-700 transition-colors">
        {{ course.title }}
      </h3>

      <!-- Instructor -->
      <p class="text-gray-500 text-xs mb-3">{{ course.instructor.name }}</p>

      <!-- Rating -->
      <div class="flex items-center gap-2 mb-3">
        <span class="text-gold-600 font-bold text-sm">{{ course.rating }}</span>
        <div class="flex gap-0.5">
          <StarSolid
            v-for="i in 5"
            :key="i"
            class="w-3.5 h-3.5"
            :class="i <= Math.round(course.rating) ? 'text-gold-400' : 'text-gray-200'"
          />
        </div>
        <span class="text-gray-400 text-xs">({{ formatNumber(course.reviewCount) }})</span>
      </div>

      <!-- Meta -->
      <div class="flex items-center gap-3 text-xs text-gray-500 mb-4">
        <span class="flex items-center gap-1">
          <ClockIcon class="w-3.5 h-3.5" />
          {{ course.duration }}
        </span>
        <span class="flex items-center gap-1">
          <PlayCircleIcon class="w-3.5 h-3.5" />
          {{ course.lectureCount }} lectures
        </span>
        <span v-if="course.certificate" class="flex items-center gap-1 text-green-600">
          <CheckBadgeIcon class="w-3.5 h-3.5" />
          Certificate
        </span>
      </div>

      <!-- Price -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span v-if="course.price === 0" class="text-green-600 font-bold text-base">Free</span>
          <template v-else>
            <span class="font-bold text-gray-900 text-base">${{ course.price }}</span>
            <span class="text-gray-400 text-sm line-through">${{ course.originalPrice }}</span>
          </template>
        </div>
        <div class="flex items-center gap-1 text-xs text-gray-400">
          <UsersIcon class="w-3.5 h-3.5" />
          {{ formatNumber(course.enrolledCount) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { StarIcon as StarSolid } from '@heroicons/vue/24/solid'
import { PlayIcon, ClockIcon, PlayCircleIcon, CheckBadgeIcon, UsersIcon } from '@heroicons/vue/24/outline'

defineProps({ course: { type: Object, required: true } })
defineEmits(['click'])

function formatNumber(n) {
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K'
  return n
}
</script>

<template>
  <AdminLayout>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-xl font-bold text-gray-900">Course Management</h2>
        <p class="text-gray-500 text-sm">{{ lmsStore.totalCourses }} courses on the platform</p>
      </div>
      <div class="flex gap-2">
        <div class="relative">
          <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input v-model="search" type="text" placeholder="Search courses..." class="pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
        </div>
        <select v-model="categoryFilter" class="px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none">
          <option value="">All Categories</option>
          <option v-for="cat in lmsStore.categories.filter(c => c !== 'All')" :key="cat">{{ cat }}</option>
        </select>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-4 gap-4 mb-6">
      <div class="stat-card py-4">
        <div class="text-2xl font-bold text-purple-700">{{ lmsStore.totalCourses }}</div>
        <div class="text-sm text-gray-500">Total Courses</div>
      </div>
      <div class="stat-card py-4">
        <div class="text-2xl font-bold text-green-600">{{ freeCourses }}</div>
        <div class="text-sm text-gray-500">Free Courses</div>
      </div>
      <div class="stat-card py-4">
        <div class="text-2xl font-bold text-gold-600">{{ paidCourses }}</div>
        <div class="text-sm text-gray-500">Paid Courses</div>
      </div>
      <div class="stat-card py-4">
        <div class="text-2xl font-bold text-blue-600">{{ lmsStore.totalEnrollments }}</div>
        <div class="text-sm text-gray-500">Total Enrollments</div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="table-header">
              <th class="px-5 py-4 text-left">Course</th>
              <th class="px-5 py-4 text-left">Instructor</th>
              <th class="px-5 py-4 text-left">Category</th>
              <th class="px-5 py-4 text-left">Students</th>
              <th class="px-5 py-4 text-left">Rating</th>
              <th class="px-5 py-4 text-left">Price</th>
              <th class="px-5 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="course in filteredCourses" :key="course.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-5 py-4">
                <div class="flex items-center gap-3">
                  <img :src="course.thumbnail" class="w-12 h-8 object-cover rounded-lg flex-shrink-0" />
                  <div>
                    <p class="font-semibold text-gray-900 text-sm line-clamp-1 max-w-xs">{{ course.title }}</p>
                    <p class="text-gray-400 text-xs">{{ course.level }}</p>
                  </div>
                </div>
              </td>
              <td class="px-5 py-4 text-sm text-gray-600">{{ course.instructor?.name }}</td>
              <td class="px-5 py-4"><span class="badge-purple text-xs">{{ course.category }}</span></td>
              <td class="px-5 py-4 text-sm text-gray-600">{{ course.enrolledCount?.toLocaleString() }}</td>
              <td class="px-5 py-4">
                <div class="flex items-center gap-1 text-sm">
                  <StarIcon class="w-4 h-4 text-gold-500 fill-gold-500" />
                  <span class="font-medium text-gray-900">{{ course.rating }}</span>
                </div>
              </td>
              <td class="px-5 py-4">
                <span v-if="course.price === 0" class="badge bg-green-100 text-green-700 text-xs">Free</span>
                <span v-else class="font-semibold text-gray-900 text-sm">${{ course.price }}</span>
              </td>
              <td class="px-5 py-4">
                <div class="flex gap-2">
                  <RouterLink :to="{ name: 'course-detail', params: { id: course.id } }" class="text-xs text-purple-700 hover:underline font-medium">View</RouterLink>
                  <button class="text-xs text-gold-600 hover:underline font-medium">Feature</button>
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
import { useLMSStore } from '@/stores/lms'
import { RouterLink } from 'vue-router'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { StarIcon } from '@heroicons/vue/24/solid'

const lmsStore = useLMSStore()
const search = ref('')
const categoryFilter = ref('')

const freeCourses = computed(() => lmsStore.courses.filter(c => c.price === 0).length)
const paidCourses = computed(() => lmsStore.courses.filter(c => c.price > 0).length)

const filteredCourses = computed(() => {
  let courses = lmsStore.courses
  if (search.value) {
    const q = search.value.toLowerCase()
    courses = courses.filter(c => c.title.toLowerCase().includes(q) || c.instructor?.name?.toLowerCase().includes(q))
  }
  if (categoryFilter.value) courses = courses.filter(c => c.category === categoryFilter.value)
  return courses
})
</script>

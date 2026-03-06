<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />

    <!-- Page Header -->
    <div class="bg-gradient-fe pt-24 pb-12">
      <div class="container-custom">
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-3">Explore Courses</h1>
        <p class="text-purple-200 mb-6">Advance your career with {{ lmsStore.courses.length }}+ expert-led courses</p>
        <!-- Search Bar -->
        <div class="relative max-w-2xl">
          <MagnifyingGlassIcon class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            v-model="lmsStore.searchQuery"
            type="text"
            placeholder="Search for courses, topics, instructors..."
            class="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-gold-400 shadow-lg"
          />
        </div>
      </div>
    </div>

    <div class="container-custom py-10">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar Filters -->
        <aside class="lg:w-72 flex-shrink-0">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <div class="flex items-center justify-between mb-5">
              <h3 class="font-bold text-gray-900">Filters</h3>
              <button @click="resetFilters" class="text-xs text-purple-700 font-semibold hover:underline">Reset all</button>
            </div>

            <!-- Categories -->
            <div class="mb-6">
              <h4 class="text-sm font-semibold text-gray-700 mb-3">Category</h4>
              <div class="space-y-2">
                <label
                  v-for="cat in lmsStore.categories"
                  :key="cat"
                  class="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    :value="cat"
                    v-model="lmsStore.selectedCategory"
                    class="text-purple-600 focus:ring-purple-500"
                  />
                  <span class="text-sm text-gray-700 group-hover:text-purple-700 transition-colors">{{ cat }}</span>
                </label>
              </div>
            </div>

            <!-- Levels -->
            <div class="mb-6">
              <h4 class="text-sm font-semibold text-gray-700 mb-3">Level</h4>
              <div class="space-y-2">
                <label v-for="level in lmsStore.levels" :key="level" class="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" :value="level" v-model="lmsStore.selectedLevel" class="text-purple-600 focus:ring-purple-500" />
                  <span class="text-sm text-gray-700 group-hover:text-purple-700 transition-colors">{{ level }}</span>
                </label>
              </div>
            </div>

            <!-- Price Filter -->
            <div>
              <h4 class="text-sm font-semibold text-gray-700 mb-3">Price</h4>
              <div class="space-y-2">
                <label v-for="p in priceFilters" :key="p.value" class="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" :value="p.value" v-model="priceFilter" class="text-purple-600 focus:ring-purple-500" />
                  <span class="text-sm text-gray-700 group-hover:text-purple-700 transition-colors">{{ p.label }}</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <div class="flex-1">
          <!-- Sort Bar -->
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <p class="text-gray-600 text-sm">
              Showing <span class="font-bold text-gray-900">{{ displayedCourses.length }}</span> courses
              <span v-if="lmsStore.searchQuery"> for "<span class="text-purple-700">{{ lmsStore.searchQuery }}</span>"</span>
            </p>
            <div class="flex items-center gap-3">
              <span class="text-sm text-gray-500">Sort by:</span>
              <select v-model="lmsStore.sortBy" class="px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400">
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <!-- View Toggle -->
              <div class="flex border border-gray-200 rounded-xl overflow-hidden">
                <button
                  v-for="view in ['grid', 'list']"
                  :key="view"
                  @click="viewMode = view"
                  class="p-2 transition-colors"
                  :class="viewMode === view ? 'bg-purple-700 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'"
                >
                  <Squares2X2Icon v-if="view === 'grid'" class="w-4 h-4" />
                  <Bars3Icon v-else class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <!-- Course Grid -->
          <div v-if="displayedCourses.length > 0">
            <div
              :class="viewMode === 'grid'
                ? 'grid sm:grid-cols-2 xl:grid-cols-3 gap-5'
                : 'space-y-4'"
            >
              <template v-if="viewMode === 'grid'">
                <CourseCard
                  v-for="course in displayedCourses"
                  :key="course.id"
                  :course="course"
                  @click="goToCourse(course)"
                />
              </template>
              <template v-else>
                <CourseListItem
                  v-for="course in displayedCourses"
                  :key="course.id"
                  :course="course"
                  @click="goToCourse(course)"
                />
              </template>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-20">
            <div class="w-20 h-20 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
              <AcademicCapIcon class="w-10 h-10 text-purple-400" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">No courses found</h3>
            <p class="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
            <button @click="resetFilters" class="btn-primary">Clear Filters</button>
          </div>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useLMSStore } from '@/stores/lms'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import CourseCard from '@/components/lms/CourseCard.vue'
import {
  MagnifyingGlassIcon, Squares2X2Icon, Bars3Icon, AcademicCapIcon
} from '@heroicons/vue/24/outline'

const lmsStore = useLMSStore()
const router = useRouter()
const viewMode = ref('grid')
const priceFilter = ref('all')

const priceFilters = [
  { label: 'All Prices', value: 'all' },
  { label: 'Free', value: 'free' },
  { label: 'Paid', value: 'paid' },
]

const displayedCourses = computed(() => {
  let courses = lmsStore.filteredCourses
  if (priceFilter.value === 'free') courses = courses.filter(c => c.price === 0)
  if (priceFilter.value === 'paid') courses = courses.filter(c => c.price > 0)
  return courses
})

// CourseListItem inline component
const CourseListItem = {
  props: ['course'],
  emits: ['click'],
  template: `
    <div @click="$emit('click', course)" class="card card-hover cursor-pointer group p-0 flex flex-row overflow-hidden">
      <img :src="course.thumbnail" class="w-48 h-32 object-cover flex-shrink-0" />
      <div class="p-4 flex-1">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-xs font-semibold text-purple-600">{{ course.category }}</span>
          <span class="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{{ course.level }}</span>
        </div>
        <h3 class="font-bold text-gray-900 text-sm line-clamp-2 group-hover:text-purple-700 transition-colors mb-1">{{ course.title }}</h3>
        <p class="text-xs text-gray-500 mb-2">{{ course.instructor.name }}</p>
        <div class="flex items-center gap-4 text-xs text-gray-500">
          <span class="flex items-center gap-0.5"><svg viewBox="0 0 20 20" fill="#d97706" class="w-3.5 h-3.5 inline-block flex-shrink-0"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg> {{ course.rating }} ({{ course.reviewCount }})</span>
          <span>{{ course.duration }}</span>
          <span v-if="course.certificate" class="text-green-600 flex items-center gap-0.5"><svg viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5 inline-block flex-shrink-0"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg> Certificate</span>
        </div>
      </div>
      <div class="p-4 flex-shrink-0 text-right">
        <div v-if="course.price === 0" class="text-green-600 font-bold">Free</div>
        <template v-else>
          <div class="font-bold text-gray-900">\${{ course.price }}</div>
          <div class="text-xs line-through text-gray-400">\${{ course.originalPrice }}</div>
        </template>
      </div>
    </div>
  `
}

function goToCourse(course) {
  router.push({ name: 'course-detail', params: { id: course.id } })
}

function resetFilters() {
  lmsStore.searchQuery = ''
  lmsStore.selectedCategory = 'All'
  lmsStore.selectedLevel = 'All'
  lmsStore.sortBy = 'popular'
  priceFilter.value = 'all'
}
</script>

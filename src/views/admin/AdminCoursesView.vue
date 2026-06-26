<template>
  <AdminLayout>
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h2 class="text-xl font-bold text-gray-900">Course Management</h2>
        <p class="text-gray-500 text-sm">{{ lmsStore.totalCourses }} courses on the platform</p>
      </div>
      <div class="flex flex-col sm:flex-row gap-2">
        <div class="relative">
          <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input v-model="search" type="text" placeholder="Search courses..." class="w-full sm:w-auto pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
        </div>
        <select v-model="categoryFilter" class="w-full sm:w-auto px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none">
          <option value="">All Categories</option>
          <option v-for="cat in lmsStore.categories.filter(c => c !== 'All')" :key="cat">{{ cat }}</option>
        </select>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
      <div class="stat-card py-4" :class="lmsStore.pendingCourses.length ? 'ring-2 ring-amber-300' : ''">
        <div class="text-2xl font-bold text-amber-600">{{ lmsStore.pendingCourses.length }}</div>
        <div class="text-sm text-gray-500">Pending Review</div>
      </div>
    </div>

    <!-- Pending Approvals banner -->
    <div v-if="lmsStore.pendingCourses.length" class="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
      <div class="flex items-center gap-2 mb-4">
        <ClockIcon class="w-5 h-5 text-amber-600" />
        <h3 class="font-bold text-amber-800">{{ lmsStore.pendingCourses.length }} course{{ lmsStore.pendingCourses.length > 1 ? 's' : '' }} awaiting your approval</h3>
      </div>
      <div class="space-y-3">
        <div v-for="course in lmsStore.pendingCourses" :key="course.id" class="bg-white rounded-xl p-3 flex flex-wrap items-center gap-3 border border-amber-100">
          <img :src="course.thumbnail" class="w-14 h-9 object-cover rounded-lg flex-shrink-0" />
          <div class="flex-1 min-w-[140px]">
            <p class="font-semibold text-gray-900 text-sm line-clamp-1">{{ course.title }}</p>
            <p class="text-gray-400 text-xs line-clamp-1">{{ course.instructor?.name }} · {{ course.category }} · {{ course.price > 0 ? '₦' + course.price.toLocaleString() : 'Free' }}</p>
          </div>
          <div class="flex items-center gap-2 ml-auto">
            <RouterLink :to="{ name: 'course-detail', params: { id: course.id } }" class="text-xs text-purple-700 hover:underline font-medium">Review</RouterLink>
            <button @click="lmsStore.approveCourse(course.id)" :disabled="lmsStore.loading" class="text-xs font-medium bg-green-500 hover:bg-green-600 text-white rounded-lg px-3 py-1.5 transition-colors">Approve</button>
            <button @click="openReject(course)" :disabled="lmsStore.loading" class="text-xs font-medium bg-white border border-red-300 text-red-500 hover:bg-red-50 rounded-lg px-3 py-1.5 transition-colors">Reject</button>
          </div>
        </div>
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
              <th class="px-5 py-4 text-left">Status</th>
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
                <div class="flex items-center gap-2">
                  <span v-if="course.price === 0" class="badge bg-green-100 text-green-700 text-xs">Free</span>
                  <template v-else>
                    <span class="font-semibold text-gray-900 text-sm">₦{{ course.price.toLocaleString() }}</span>
                    <span v-if="course.originalPrice > course.price" class="text-gray-400 text-xs line-through">₦{{ course.originalPrice.toLocaleString() }}</span>
                  </template>
                  <span v-if="course.featured" class="badge bg-gold-100 text-gold-700 text-xs">Featured</span>
                </div>
              </td>
              <td class="px-5 py-4">
                <span class="badge text-xs capitalize" :class="{
                  'bg-green-100 text-green-700': statusOf(course) === 'published',
                  'bg-amber-100 text-amber-700': statusOf(course) === 'pending',
                  'bg-red-100 text-red-700': statusOf(course) === 'rejected',
                }">{{ statusOf(course) === 'published' ? 'Live' : statusOf(course) }}</span>
              </td>
              <td class="px-5 py-4">
                <div class="flex gap-2">
                  <RouterLink :to="{ name: 'course-detail', params: { id: course.id } }" class="text-xs text-purple-700 hover:underline font-medium">View</RouterLink>
                  <button v-if="statusOf(course) !== 'published'" @click="lmsStore.approveCourse(course.id)" class="text-xs text-green-600 hover:underline font-medium">Approve</button>
                  <button v-if="statusOf(course) === 'pending'" @click="openReject(course)" class="text-xs text-orange-600 hover:underline font-medium">Reject</button>
                  <button @click="openEditor(course)" class="text-xs text-blue-600 hover:underline font-medium">Edit Pricing</button>
                  <button @click="toggleFeatured(course)" class="text-xs text-gold-600 hover:underline font-medium">{{ course.featured ? 'Unfeature' : 'Feature' }}</button>
                  <button @click="confirmRemove(course)" class="text-xs text-red-500 hover:underline font-medium">Remove</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pricing / Status Editor Modal -->
    <Transition name="modal">
      <div v-if="editing" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div class="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
          <div class="flex items-start justify-between mb-5">
            <div>
              <h3 class="text-lg font-bold text-gray-900">Manage Pricing</h3>
              <p class="text-gray-500 text-sm line-clamp-1 max-w-xs">{{ editing.title }}</p>
            </div>
            <button @click="editing = null" class="text-gray-400 hover:text-gray-600"><XMarkIcon class="w-5 h-5" /></button>
          </div>

          <!-- Free / Paid -->
          <div class="flex gap-3 mb-5">
            <label class="flex-1 cursor-pointer">
              <input type="radio" v-model="form.isPaid" :value="false" class="sr-only" />
              <div class="p-3 rounded-xl border-2 text-center transition-all" :class="!form.isPaid ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-600'">
                <p class="font-bold text-sm">Free</p>
              </div>
            </label>
            <label class="flex-1 cursor-pointer">
              <input type="radio" v-model="form.isPaid" :value="true" class="sr-only" />
              <div class="p-3 rounded-xl border-2 text-center transition-all" :class="form.isPaid ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-600'">
                <p class="font-bold text-sm">Paid</p>
              </div>
            </label>
          </div>

          <div v-if="form.isPaid" class="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Price (NGN)</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₦</span>
                <input v-model.number="form.price" type="number" min="0" step="1" class="input-field pl-7" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Original Price (NGN)</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₦</span>
                <input v-model.number="form.originalPrice" type="number" min="0" step="1" class="input-field pl-7" />
              </div>
            </div>
          </div>

          <!-- Featured toggle -->
          <label class="flex items-center gap-3 mb-6 cursor-pointer">
            <input type="checkbox" v-model="form.featured" class="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
            <span class="text-sm text-gray-700">Feature this course on the landing page</span>
          </label>

          <div v-if="form.isPaid && form.originalPrice && form.originalPrice < form.price" class="text-xs text-red-500 mb-4">
            Original price should be greater than or equal to the current price.
          </div>

          <div class="flex gap-2">
            <button @click="saveEditor" :disabled="lmsStore.loading" class="btn-primary flex-1 text-sm py-2.5">
              {{ lmsStore.loading ? 'Saving...' : 'Save Changes' }}
            </button>
            <button @click="editing = null" class="btn-secondary flex-1 text-sm py-2.5">Cancel</button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Reject Reason Modal -->
    <Transition name="modal">
      <div v-if="rejecting" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div class="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
          <div class="flex items-start justify-between mb-4">
            <h3 class="text-lg font-bold text-gray-900">Reject Course</h3>
            <button @click="rejecting = null" class="text-gray-400 hover:text-gray-600"><XMarkIcon class="w-5 h-5" /></button>
          </div>
          <p class="text-gray-600 text-sm mb-4">Let <strong>{{ rejecting.instructor?.name }}</strong> know why <strong>{{ rejecting.title }}</strong> wasn't approved.</p>
          <textarea v-model="rejectReason" rows="4" placeholder="e.g. Please improve video quality and add learning objectives..." class="input-field resize-none mb-5"></textarea>
          <div class="flex gap-2">
            <button @click="doReject" :disabled="lmsStore.loading" class="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm py-2.5 font-medium transition-colors">
              {{ lmsStore.loading ? 'Rejecting...' : 'Reject Course' }}
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
          <h3 class="text-lg font-bold text-gray-900 mb-2">Remove Course?</h3>
          <p class="text-gray-600 text-sm mb-6">Are you sure you want to remove <strong>{{ removing.title }}</strong>? This action cannot be undone.</p>
          <div class="flex gap-2">
            <button @click="doRemove" :disabled="lmsStore.loading" class="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm py-2.5 font-medium transition-colors">
              {{ lmsStore.loading ? 'Removing...' : 'Yes, Remove' }}
            </button>
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
import { useLMSStore } from '@/stores/lms'
import { RouterLink } from 'vue-router'
import { MagnifyingGlassIcon, XMarkIcon, TrashIcon, ClockIcon } from '@heroicons/vue/24/outline'
import { StarIcon } from '@heroicons/vue/24/solid'

const lmsStore = useLMSStore()
const search = ref('')
const categoryFilter = ref('')

const editing = ref(null)
const removing = ref(null)
const rejecting = ref(null)
const rejectReason = ref('')
const form = ref({ isPaid: true, price: 0, originalPrice: 0, featured: false })

const statusOf = (course) => course.status || 'published'

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

function openEditor(course) {
  editing.value = course
  form.value = {
    isPaid: course.price > 0,
    price: course.price || 0,
    originalPrice: course.originalPrice || 0,
    featured: !!course.featured,
  }
}

async function saveEditor() {
  const isPaid = form.value.isPaid
  const price = isPaid ? Math.max(0, Number(form.value.price) || 0) : 0
  const originalPrice = isPaid ? Math.max(price, Number(form.value.originalPrice) || 0) : 0
  await lmsStore.updateCourse(editing.value.id, {
    isPaid,
    price,
    originalPrice,
    featured: form.value.featured,
  })
  editing.value = null
}

async function toggleFeatured(course) {
  await lmsStore.updateCourse(course.id, { featured: !course.featured })
}

function confirmRemove(course) {
  removing.value = course
}

async function doRemove() {
  await lmsStore.deleteCourse(removing.value.id)
  removing.value = null
}

function openReject(course) {
  rejecting.value = course
  rejectReason.value = ''
}

async function doReject() {
  await lmsStore.rejectCourse(rejecting.value.id, rejectReason.value)
  rejecting.value = null
}
</script>

<template>
  <div class="min-h-screen bg-white">
    <AppHeader />

    <div v-if="course" class="pt-20">
      <!-- Hero Banner -->
      <div class="bg-gray-900 py-10">
        <div class="container-custom">
          <div class="grid lg:grid-cols-3 gap-8">
            <!-- Course Info -->
            <div class="lg:col-span-2">
              <div class="flex items-center gap-2 mb-3">
                <span class="badge-purple text-xs">{{ course.category }}</span>
                <ChevronRightIcon class="w-3 h-3 text-gray-500" />
                <span class="text-gray-400 text-xs">{{ course.subcategory }}</span>
              </div>
              <h1 class="text-2xl md:text-3xl font-bold text-white mb-3 leading-snug">{{ course.title }}</h1>
              <p class="text-gray-300 mb-4">{{ course.subtitle }}</p>

              <!-- Rating Row -->
              <div class="flex flex-wrap items-center gap-4 mb-4 text-sm">
                <span v-if="course.enrolledCount > 50000" class="badge bg-gold-400 text-gray-900 font-bold text-xs">Bestseller</span>
                <div class="flex items-center gap-1.5">
                  <span class="text-gold-400 font-bold">{{ course.rating }}</span>
                  <div class="flex gap-0.5">
                    <StarSolid v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= Math.round(course.rating) ? 'text-gold-400' : 'text-gray-600'" />
                  </div>
                  <span class="text-purple-300">({{ course.reviewCount.toLocaleString() }} ratings)</span>
                </div>
                <span class="text-gray-400">{{ course.enrolledCount.toLocaleString() }} students</span>
              </div>

              <!-- Instructor -->
              <p class="text-gray-300 text-sm mb-4">
                Created by
                <span class="text-purple-400 font-semibold hover:underline cursor-pointer">{{ course.instructor.name }}</span>
              </p>

              <!-- Meta -->
              <div class="flex flex-wrap gap-5 text-sm text-gray-400">
                <span class="flex items-center gap-1.5"><ClockIcon class="w-4 h-4" /> {{ course.duration }}</span>
                <span class="flex items-center gap-1.5"><PlayCircleIcon class="w-4 h-4" /> {{ course.lectureCount }} lectures</span>
                <span class="flex items-center gap-1.5"><GlobeAltIcon class="w-4 h-4" /> {{ course.language }}</span>
                <span class="flex items-center gap-1.5"><ChartBarIcon class="w-4 h-4" /> {{ course.level }}</span>
                <span class="flex items-center gap-1.5"><CalendarIcon class="w-4 h-4" /> Updated {{ course.lastUpdated }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container-custom py-10">
        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Left Content -->
          <div class="lg:col-span-2 space-y-8">
            <!-- What You'll Learn -->
            <div class="border border-gray-200 rounded-2xl p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-5">What you'll learn</h2>
              <div class="grid md:grid-cols-2 gap-3">
                <div v-for="obj in course.objectives" :key="obj" class="flex items-start gap-3">
                  <CheckIcon class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span class="text-gray-700 text-sm">{{ obj }}</span>
                </div>
              </div>
            </div>

            <!-- Course Content -->
            <div>
              <div class="flex items-center justify-between mb-5">
                <h2 class="text-xl font-bold text-gray-900">Course Content</h2>
                <div class="text-sm text-gray-500">
                  {{ course.sections.length }} sections • {{ course.lectureCount }} lectures • {{ course.duration }}
                </div>
              </div>

              <div class="border border-gray-200 rounded-2xl overflow-hidden">
                <div v-for="(section, si) in course.sections" :key="section.id">
                  <!-- Section Header -->
                  <button
                    @click="toggleSection(si)"
                    class="w-full flex items-center justify-between px-5 py-4 bg-gray-50 hover:bg-gray-100 transition-colors font-medium text-gray-900 text-sm border-b border-gray-200"
                  >
                    <div class="flex items-center gap-3">
                      <ChevronDownIcon class="w-4 h-4 transition-transform" :class="openSections.includes(si) ? 'rotate-180' : ''" />
                      <span>{{ section.title }}</span>
                    </div>
                    <span class="text-gray-500 text-xs">{{ section.lectures.length }} lectures • {{ section.duration }}</span>
                  </button>

                  <!-- Lectures -->
                  <div v-if="openSections.includes(si)">
                    <div v-for="lecture in section.lectures" :key="lecture.id"
                      class="flex items-center gap-4 px-5 py-3 border-b border-gray-100 last:border-0 hover:bg-purple-50 transition-colors"
                    >
                      <component
                        :is="lecture.type === 'video' ? PlayCircleIcon : lecture.type === 'quiz' ? QuestionMarkCircleIcon : DocumentTextIcon"
                        class="w-5 h-5 flex-shrink-0"
                        :class="lecture.type === 'video' ? 'text-purple-500' : lecture.type === 'quiz' ? 'text-gold-500' : 'text-blue-500'"
                      />
                      <span class="flex-1 text-sm text-gray-700">{{ lecture.title }}</span>
                      <div class="flex items-center gap-3">
                        <button
                          v-if="lecture.preview"
                          @click.stop="playPreview(lecture)"
                          class="text-xs text-purple-600 font-semibold hover:underline"
                        >Preview</button>
                        <span class="text-xs text-gray-400">{{ lecture.duration }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Requirements -->
            <div>
              <h2 class="text-xl font-bold text-gray-900 mb-4">Requirements</h2>
              <ul class="space-y-2">
                <li v-for="req in course.requirements" :key="req" class="flex items-start gap-2 text-gray-700 text-sm">
                  <span class="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0"></span>{{ req }}
                </li>
              </ul>
            </div>

            <!-- Description -->
            <div>
              <h2 class="text-xl font-bold text-gray-900 mb-4">Description</h2>
              <div class="text-gray-700 text-sm leading-relaxed" :class="{ 'line-clamp-[10]': !showFullDesc }">
                {{ course.description }}
              </div>
              <button @click="showFullDesc = !showFullDesc" class="text-purple-700 font-semibold text-sm mt-2 hover:underline">
                {{ showFullDesc ? 'Show less' : 'Show more' }}
              </button>
            </div>

            <!-- Instructor Card -->
            <div>
              <h2 class="text-xl font-bold text-gray-900 mb-5">Your Instructor</h2>
              <div class="border border-gray-200 rounded-2xl p-6">
                <div class="flex items-start gap-4">
                  <div class="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {{ course.instructor.name.split(' ').map(n => n[0]).join('') }}
                  </div>
                  <div>
                    <h3 class="font-bold text-purple-700 text-lg">{{ course.instructor.name }}</h3>
                    <p class="text-gray-500 text-sm mb-3">Course Instructor</p>
                    <div class="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span class="flex items-center gap-1"><StarSolid class="w-4 h-4 text-gold-400" /> {{ course.instructor.rating }} Rating</span>
                      <span class="flex items-center gap-1"><UsersIcon class="w-4 h-4" /> {{ course.instructor.students?.toLocaleString() }} Students</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Reviews -->
            <div>
              <h2 class="text-xl font-bold text-gray-900 mb-5">Student Reviews</h2>
              <!-- Rating Summary -->
              <div class="bg-gray-50 rounded-2xl p-6 mb-6 flex flex-col md:flex-row gap-6 items-center">
                <div class="text-center">
                  <div class="text-6xl font-bold text-gold-500">{{ course.rating }}</div>
                  <div class="flex justify-center gap-0.5 my-2">
                    <StarSolid v-for="i in 5" :key="i" class="w-5 h-5" :class="i <= Math.round(course.rating) ? 'text-gold-400' : 'text-gray-200'" />
                  </div>
                  <div class="text-sm text-gray-500">Course Rating</div>
                </div>
                <div class="flex-1 w-full">
                  <div v-for="star in [5, 4, 3, 2, 1]" :key="star" class="flex items-center gap-3 mb-2">
                    <div class="flex gap-0.5">
                      <StarSolid v-for="i in star" :key="i" class="w-3.5 h-3.5 text-gold-400" />
                    </div>
                    <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div class="h-full bg-gold-400 rounded-full" :style="{ width: getRatingWidth(star) }"></div>
                    </div>
                    <span class="text-xs text-gray-500 w-8">{{ getRatingWidth(star) }}</span>
                  </div>
                </div>
              </div>

              <!-- Review List -->
              <div class="space-y-5">
                <div v-for="review in courseReviews.slice(0, 4)" :key="review.id" class="border-b border-gray-100 pb-5">
                  <div class="flex items-start gap-3">
                    <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm flex-shrink-0">
                      {{ review.userName?.[0] || 'U' }}
                    </div>
                    <div class="flex-1">
                      <div class="flex items-center justify-between mb-1">
                        <span class="font-semibold text-gray-900 text-sm">{{ review.userName }}</span>
                        <span class="text-xs text-gray-400">{{ new Date(review.createdAt).toLocaleDateString() }}</span>
                      </div>
                      <div class="flex gap-0.5 mb-2">
                        <StarSolid v-for="i in 5" :key="i" class="w-3.5 h-3.5" :class="i <= review.rating ? 'text-gold-400' : 'text-gray-200'" />
                      </div>
                      <p class="text-gray-700 text-sm">{{ review.comment }}</p>
                    </div>
                  </div>
                </div>
                <div v-if="courseReviews.length === 0" class="text-center py-8 text-gray-500">
                  No reviews yet. Be the first to review!
                </div>
              </div>

              <!-- Add Review (if enrolled) -->
              <div v-if="isEnrolled && !hasReviewed" class="mt-6 bg-purple-50 rounded-2xl p-6">
                <h3 class="font-bold text-gray-900 mb-4">Leave a Review</h3>
                <div class="flex gap-1 mb-4">
                  <button v-for="i in 5" :key="i" @click="reviewForm.rating = i" class="transition-transform hover:scale-110">
                    <StarSolid class="w-7 h-7" :class="i <= reviewForm.rating ? 'text-gold-400' : 'text-gray-300'" />
                  </button>
                </div>
                <textarea v-model="reviewForm.comment" rows="3" placeholder="Share your experience..." class="input-field resize-none mb-3"></textarea>
                <button @click="submitReview" class="btn-primary">Submit Review</button>
              </div>
            </div>
          </div>

          <!-- Sticky Sidebar Card -->
          <div class="lg:col-span-1">
            <div class="sticky top-24">
              <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <!-- Preview Video -->
                <div class="relative bg-gray-900 h-48 cursor-pointer group" @click="showPreviewModal = true">
                  <img :src="course.thumbnail" class="w-full h-full object-cover opacity-70" />
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                      <PlayIcon class="w-7 h-7 text-purple-700 ml-1" />
                    </div>
                  </div>
                  <div class="absolute bottom-3 left-3 text-white text-xs font-semibold bg-black/60 px-2 py-1 rounded-lg">Preview Course</div>
                </div>

                <div class="p-6">
                  <!-- Price -->
                  <div class="flex items-center gap-3 mb-2">
                    <span v-if="course.price === 0" class="text-3xl font-bold text-green-600">Free</span>
                    <template v-else>
                      <span class="text-3xl font-bold text-gray-900">${{ course.price }}</span>
                      <span class="text-lg text-gray-400 line-through">${{ course.originalPrice }}</span>
                      <span class="badge bg-red-100 text-red-600 text-xs font-bold">{{ discount }}% off</span>
                    </template>
                  </div>

                  <p class="text-red-600 text-sm font-medium mb-4">
                    <FireIcon class="w-4 h-4 inline mr-1" />
                    <span v-if="course.price > 0">{{ timeLeft }} left at this price!</span>
                  </p>

                  <!-- CTA Buttons -->
                  <div class="space-y-3">
                    <button
                      v-if="isEnrolled"
                      @click="goToLearn"
                      class="btn-primary w-full py-4 text-base"
                    >
                      Go to Course <ArrowRightIcon class="w-5 h-5 ml-1" />
                    </button>
                    <template v-else>
                      <button v-if="course.price === 0" @click="enrollFree" class="btn-primary w-full py-4 text-base">
                        Enroll Now — Free
                      </button>
                      <template v-else>
                        <button @click="addToCart" class="btn-primary w-full py-4 text-base" :disabled="inCart">
                          <ShoppingCartIcon class="w-5 h-5 mr-2" />
                          {{ inCart ? 'Added to Cart' : 'Add to Cart' }}
                        </button>
                        <button @click="buyNow" class="btn-outline w-full py-3">
                          Buy Now
                        </button>
                      </template>
                    </template>
                    <button @click="cartStore.toggleWishlist(course)" class="w-full flex items-center justify-center gap-2 py-2.5 text-sm text-gray-600 hover:text-purple-700 transition-colors">
                      <HeartIcon class="w-4 h-4" :class="cartStore.isInWishlist(course.id) ? 'fill-red-500 text-red-500' : ''" />
                      {{ cartStore.isInWishlist(course.id) ? 'Wishlisted' : 'Add to Wishlist' }}
                    </button>
                  </div>

                  <p class="text-center text-xs text-gray-400 mt-3">30-Day Money-Back Guarantee</p>

                  <!-- Course Includes -->
                  <div class="mt-5 pt-5 border-t border-gray-100">
                    <h4 class="font-semibold text-gray-900 text-sm mb-3">This course includes:</h4>
                    <ul class="space-y-2.5">
                      <li v-for="include in courseIncludes" :key="include.label" class="flex items-center gap-2.5 text-sm text-gray-700">
                        <component :is="include.icon" class="w-4 h-4 text-gray-500" />
                        {{ include.label }}
                      </li>
                    </ul>
                  </div>

                  <!-- Share -->
                  <div class="flex gap-2 mt-4">
                    <button class="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">Share</button>
                    <button class="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">Gift Course</button>
                    <button class="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">Apply Coupon</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Preview Modal -->
    <Transition name="modal">
      <div v-if="showPreviewModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" @click="showPreviewModal = false"></div>
        <div class="relative bg-black rounded-2xl overflow-hidden shadow-2xl w-full max-w-3xl">
          <video
            v-if="course.previewVideo"
            :src="course.previewVideo"
            class="w-full aspect-video"
            controls
            autoplay
          ></video>
          <button @click="showPreviewModal = false" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors">
            <XMarkIcon class="w-4 h-4" />
          </button>
        </div>
      </div>
    </Transition>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLMSStore } from '@/stores/lms'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { StarIcon as StarSolid } from '@heroicons/vue/24/solid'
import {
  ChevronRightIcon, ClockIcon, PlayCircleIcon, GlobeAltIcon, ChartBarIcon,
  CalendarIcon, CheckIcon, PlayIcon, UsersIcon, ShoppingCartIcon, HeartIcon,
  FireIcon, ArrowRightIcon, QuestionMarkCircleIcon, DocumentTextIcon,
  ChevronDownIcon, XMarkIcon,
  DevicePhoneMobileIcon, TrophyIcon, DocumentCheckIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const router = useRouter()
const lmsStore = useLMSStore()
const authStore = useAuthStore()
const cartStore = useCartStore()

const course = computed(() => lmsStore.getCourseById(route.params.id))
const showFullDesc = ref(false)
const showPreviewModal = ref(false)
const openSections = ref([0])
const reviewForm = ref({ rating: 5, comment: '' })

const isEnrolled = computed(() =>
  authStore.isAuthenticated && lmsStore.isEnrolled(authStore.user?.id, course.value?.id)
)
const inCart = computed(() => cartStore.isInCart(course.value?.id))
const discount = computed(() => {
  if (!course.value?.price) return 0
  return Math.round((1 - course.value.price / course.value.originalPrice) * 100)
})
const timeLeft = computed(() => {
  const hours = Math.floor(Math.random() * 24) + 1
  return `${hours} hours`
})

const courseReviews = computed(() => lmsStore.getCourseReviews(course.value?.id))
const hasReviewed = computed(() =>
  courseReviews.value.some(r => r.userId === authStore.user?.id)
)

const courseIncludes = computed(() => [
  { icon: PlayCircleIcon, label: `${course.value?.duration} of on-demand video` },
  { icon: DocumentTextIcon, label: `${course.value?.lectureCount} downloadable resources` },
  { icon: DevicePhoneMobileIcon, label: 'Access on mobile and desktop' },
  { icon: TrophyIcon, label: 'Certificate of completion' },
])

function toggleSection(i) {
  const idx = openSections.value.indexOf(i)
  if (idx !== -1) openSections.value.splice(idx, 1)
  else openSections.value.push(i)
}

function playPreview(lecture) {
  if (lecture.videoUrl) showPreviewModal.value = true
}

function addToCart() {
  cartStore.addToCart(course.value)
}

function buyNow() {
  cartStore.addToCart(course.value)
  router.push('/lms/checkout')
}

async function enrollFree() {
  await lmsStore.enrollCourse(authStore.user.id, course.value.id)
}

function goToLearn() {
  router.push({ name: 'course-learn', params: { id: course.value.id } })
}

function getRatingWidth(star) {
  const total = courseReviews.value.length || 1
  const count = courseReviews.value.filter(r => r.rating === star).length
  return Math.round((count / total) * 100) + '%'
}

function submitReview() {
  lmsStore.addReview(
    authStore.user.id,
    course.value.id,
    reviewForm.value.rating,
    reviewForm.value.comment,
    authStore.fullName
  )
  reviewForm.value = { rating: 5, comment: '' }
}
</script>

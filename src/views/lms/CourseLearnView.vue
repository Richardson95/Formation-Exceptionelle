<template>
  <div class="min-h-screen bg-gray-900 flex flex-col">
    <!-- Top Bar -->
    <header class="bg-gray-900 border-b border-gray-700 px-4 py-3 flex items-center justify-between flex-shrink-0 z-40">
      <div class="flex items-center gap-4">
        <RouterLink to="/lms" class="text-white/70 hover:text-white transition-colors">
          <ArrowLeftIcon class="w-5 h-5" />
        </RouterLink>
        <div class="hidden md:block">
          <p class="text-white font-semibold text-sm line-clamp-1">{{ course?.title }}</p>
          <p class="text-gray-400 text-xs">{{ course?.instructor?.name }}</p>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <!-- Progress -->
        <div class="hidden sm:flex items-center gap-3">
          <div class="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div class="h-full bg-purple-500 rounded-full transition-all duration-700" :style="{ width: progress.percentage + '%' }"></div>
          </div>
          <span class="text-white text-xs font-medium">{{ progress.percentage }}% complete</span>
        </div>

        <!-- Certificate button -->
        <button
          v-if="progress.percentage === 100"
          @click="showCertificate = true"
          class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-white text-xs font-bold transition-colors"
        >
          <TrophyIcon class="w-4 h-4" /> Get Certificate
        </button>

        <button @click="sidebarOpen = !sidebarOpen" class="text-white/70 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10">
          <Bars3Icon class="w-5 h-5" />
        </button>
      </div>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <!-- Main Video Area -->
      <div class="flex-1 flex flex-col overflow-y-auto" :class="sidebarOpen ? 'lg:mr-96' : ''">
        <!-- Video Player -->
        <div class="bg-black relative">
          <div v-if="currentLecture?.type === 'video'" class="w-full aspect-video">
            <video
              ref="videoEl"
              :src="currentLecture.videoUrl"
              class="w-full h-full"
              controls
              @ended="onVideoEnded"
              @timeupdate="onTimeUpdate"
            ></video>
          </div>

          <!-- Quiz View -->
          <div v-else-if="currentLecture?.type === 'quiz'" class="w-full aspect-video bg-gray-800 flex items-center justify-center">
            <QuizComponent :quiz="currentLecture" :courseId="course?.id" @complete="onLectureComplete" />
          </div>

          <!-- Assignment View -->
          <div v-else-if="currentLecture?.type === 'assignment'" class="w-full aspect-video bg-gray-800 flex items-center justify-center p-8">
            <div class="text-center text-white max-w-md">
              <DocumentTextIcon class="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 class="text-xl font-bold mb-2">{{ currentLecture.title }}</h3>
              <p class="text-gray-400 mb-6">Complete this assignment to proceed. Download the instructions below.</p>
              <button class="btn-primary">Download Assignment</button>
            </div>
          </div>
        </div>

        <!-- Lecture Actions Bar -->
        <div class="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div>
            <h2 class="font-bold text-gray-900">{{ currentLecture?.title }}</h2>
            <p class="text-gray-500 text-xs">{{ currentSection?.title }}</p>
          </div>
          <div class="flex items-center gap-3">
            <button @click="prevLecture" :disabled="!prevLectureExists" class="btn-secondary text-sm px-4 py-2 disabled:opacity-40">
              <ChevronLeftIcon class="w-4 h-4 mr-1" /> Previous
            </button>
            <button @click="markComplete" class="btn-primary text-sm px-4 py-2" :class="isCompleted ? 'bg-green-600 hover:bg-green-700' : ''">
              <CheckIcon class="w-4 h-4 mr-1" />
              {{ isCompleted ? 'Completed' : 'Mark Complete' }}
            </button>
            <button @click="nextLecture" :disabled="!nextLectureExists" class="btn-primary text-sm px-4 py-2 disabled:opacity-40">
              Next <ChevronRightIcon class="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

        <!-- Content Tabs -->
        <div class="bg-white flex-1 px-6 py-6">
          <div class="flex gap-1 border-b border-gray-200 mb-6">
            <button
              v-for="tab in tabs"
              :key="tab"
              @click="activeTab = tab"
              class="px-5 py-3 text-sm font-medium transition-all border-b-2"
              :class="activeTab === tab
                ? 'border-purple-700 text-purple-700'
                : 'border-transparent text-gray-600 hover:text-gray-900'"
            >
              {{ tab }}
            </button>
          </div>

          <!-- Overview Tab -->
          <div v-if="activeTab === 'Overview'">
            <h3 class="font-bold text-gray-900 mb-3">About This Lesson</h3>
            <p class="text-gray-700 text-sm leading-relaxed">
              In this lesson, you'll learn about {{ currentLecture?.title }}. This is part of the {{ currentSection?.title }} section, which covers key concepts in {{ course?.category }}.
            </p>
          </div>

          <!-- Notes Tab -->
          <div v-if="activeTab === 'Notes'">
            <textarea
              v-model="notes"
              placeholder="Take notes for this lecture..."
              class="w-full h-48 input-field resize-none"
            ></textarea>
            <button @click="saveNotes" class="btn-primary mt-3">Save Notes</button>
          </div>

          <!-- Q&A Tab -->
          <div v-if="activeTab === 'Q&A'">
            <div class="mb-5">
              <textarea placeholder="Ask a question about this lecture..." class="w-full input-field resize-none" rows="3"></textarea>
              <button class="btn-primary mt-2">Submit Question</button>
            </div>
            <div class="space-y-4">
              <div v-for="q in sampleQA" :key="q.id" class="border border-gray-100 rounded-xl p-4">
                <div class="flex items-start gap-3 mb-3">
                  <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xs flex-shrink-0">{{ q.user[0] }}</div>
                  <div>
                    <p class="font-semibold text-gray-900 text-sm">{{ q.user }}</p>
                    <p class="text-gray-700 text-sm mt-1">{{ q.question }}</p>
                  </div>
                </div>
                <div class="ml-11 bg-purple-50 rounded-xl p-3">
                  <p class="text-xs font-semibold text-purple-700 mb-1">Instructor Reply</p>
                  <p class="text-sm text-gray-700">{{ q.answer }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Reviews Tab -->
          <div v-if="activeTab === 'Reviews'">
            <div class="flex items-center gap-6 mb-6">
              <div class="text-5xl font-bold text-gold-500">{{ course?.rating }}</div>
              <div>
                <div class="flex gap-0.5 mb-1">
                  <StarSolid v-for="i in 5" :key="i" class="w-5 h-5" :class="i <= Math.round(course?.rating || 0) ? 'text-gold-400' : 'text-gray-200'" />
                </div>
                <p class="text-gray-500 text-sm">Course Rating</p>
              </div>
            </div>
            <div v-if="!hasReviewed" class="border border-gray-200 rounded-xl p-5 mb-5">
              <h3 class="font-bold text-gray-900 mb-3">Leave a Review</h3>
              <div class="flex gap-1 mb-3">
                <button v-for="i in 5" :key="i" @click="reviewForm.rating = i">
                  <StarSolid class="w-6 h-6" :class="i <= reviewForm.rating ? 'text-gold-400' : 'text-gray-300'" />
                </button>
              </div>
              <textarea v-model="reviewForm.comment" class="input-field resize-none mb-3" rows="3" placeholder="Share your experience..."></textarea>
              <button @click="submitReview" class="btn-primary">Submit Review</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar - Course Content -->
      <div
        class="fixed right-0 top-0 bottom-0 w-96 bg-white border-l border-gray-200 z-30 flex flex-col overflow-hidden transition-transform duration-300"
        :class="sidebarOpen ? 'translate-x-0' : 'translate-x-full'"
        style="top: 61px"
      >
        <div class="px-4 py-4 border-b border-gray-200 flex-shrink-0">
          <h3 class="font-bold text-gray-900">Course Content</h3>
          <div class="flex items-center gap-2 mt-1">
            <div class="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-purple-600 rounded-full transition-all" :style="{ width: progress.percentage + '%' }"></div>
            </div>
            <span class="text-xs text-gray-600 font-medium">{{ progress.percentage }}%</span>
          </div>
        </div>

        <div class="overflow-y-auto flex-1 scrollbar-hide">
          <div v-for="(section, si) in course?.sections || []" :key="section.id">
            <button
              @click="toggleSidebar(si)"
              class="w-full px-4 py-3 text-left font-semibold text-sm text-gray-800 bg-gray-50 flex items-center justify-between hover:bg-gray-100 transition-colors border-b border-gray-100"
            >
              <span class="line-clamp-1">{{ section.title }}</span>
              <ChevronDownIcon class="w-4 h-4 flex-shrink-0 transition-transform" :class="openSidebarSections.includes(si) ? 'rotate-180' : ''" />
            </button>
            <div v-if="openSidebarSections.includes(si)">
              <button
                v-for="lecture in section.lectures"
                :key="lecture.id"
                @click="selectLecture(section, lecture)"
                class="w-full px-4 py-3 flex items-center gap-3 text-left border-b border-gray-50 transition-colors hover:bg-purple-50"
                :class="currentLecture?.id === lecture.id ? 'bg-purple-50' : ''"
              >
                <!-- Completion Checkbox -->
                <div
                  class="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                  :class="isLectureCompleted(lecture.id)
                    ? 'bg-green-500 border-green-500'
                    : currentLecture?.id === lecture.id
                      ? 'border-purple-600'
                      : 'border-gray-300'"
                >
                  <CheckIcon v-if="isLectureCompleted(lecture.id)" class="w-3 h-3 text-white" />
                </div>
                <!-- Icon -->
                <component
                  :is="lecture.type === 'video' ? PlayCircleIcon : lecture.type === 'quiz' ? QuestionMarkCircleIcon : DocumentTextIcon"
                  class="w-4 h-4 flex-shrink-0"
                  :class="currentLecture?.id === lecture.id ? 'text-purple-600' : 'text-gray-400'"
                />
                <!-- Title -->
                <span class="flex-1 text-xs leading-snug"
                  :class="currentLecture?.id === lecture.id ? 'text-purple-700 font-semibold' : 'text-gray-700'"
                >{{ lecture.title }}</span>
                <span class="text-xs text-gray-400 flex-shrink-0">{{ lecture.duration }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Certificate Modal -->
    <Transition name="modal">
      <div v-if="showCertificate" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <div class="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl">
          <!-- Certificate -->
          <div class="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 p-1">
            <div class="bg-white m-1 rounded-2xl p-10 text-center relative overflow-hidden" id="certificate">
              <!-- Decorative border -->
              <div class="absolute inset-3 border-4 border-purple-100 rounded-xl pointer-events-none"></div>
              <div class="absolute inset-5 border border-gold-200 rounded-xl pointer-events-none"></div>

              <img src="@/assets/logo.jpeg" class="h-12 w-auto mx-auto mb-4 opacity-90" alt="FE" />
              <div class="text-gold-600 text-sm font-semibold tracking-widest uppercase mb-2">Certificate of Completion</div>
              <div class="text-gray-500 text-sm mb-4">This is to certify that</div>
              <h2 class="text-3xl font-bold font-serif text-purple-900 mb-2 border-b-2 border-gold-300 inline-block px-8 pb-2">
                {{ authStore.fullName }}
              </h2>
              <div class="text-gray-500 text-sm mt-4 mb-2">has successfully completed the course</div>
              <h3 class="text-xl font-bold text-gray-900 mb-4">{{ course?.title }}</h3>
              <div class="text-gray-500 text-xs mb-6">Completed on {{ new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</div>

              <div class="flex items-center justify-center gap-12 mt-4">
                <div class="text-center">
                  <div class="h-0.5 w-32 bg-gray-300 mb-1"></div>
                  <p class="text-xs text-gray-500">Student Signature</p>
                </div>
                <div class="text-center">
                  <div class="h-0.5 w-32 bg-gray-300 mb-1"></div>
                  <p class="text-xs text-gray-500">Director, Formation Exceptionelle</p>
                </div>
              </div>

              <div class="mt-6 text-xs text-gray-400">
                Certificate ID: FE-{{ course?.id?.toUpperCase() }}-{{ authStore.user?.id?.slice(-6).toUpperCase() }}
              </div>
            </div>
          </div>
          <div class="p-5 flex gap-3">
            <button @click="downloadCertificate" class="btn-primary flex-1">
              <ArrowDownTrayIcon class="w-5 h-5 mr-2" /> Download Certificate
            </button>
            <button @click="showCertificate = false" class="btn-secondary px-6">Close</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useLMSStore } from '@/stores/lms'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'vue3-toastify'
import { StarIcon as StarSolid } from '@heroicons/vue/24/solid'
import {
  ArrowLeftIcon, Bars3Icon, TrophyIcon, ChevronLeftIcon, ChevronRightIcon,
  ChevronDownIcon, CheckIcon, PlayCircleIcon, QuestionMarkCircleIcon,
  DocumentTextIcon, ArrowDownTrayIcon
} from '@heroicons/vue/24/outline'
import QuizComponent from '@/components/lms/QuizComponent.vue'

const route = useRoute()
const lmsStore = useLMSStore()
const authStore = useAuthStore()

const course = computed(() => lmsStore.getCourseById(route.params.id))
const progress = computed(() => lmsStore.getProgress(authStore.user?.id, route.params.id))

const sidebarOpen = ref(true)
const showCertificate = ref(false)
const activeTab = ref('Overview')
const notes = ref('')
const openSidebarSections = ref([0])
const reviewForm = ref({ rating: 5, comment: '' })

const tabs = ['Overview', 'Notes', 'Q&A', 'Reviews']

// Flatten all lectures for navigation
const allLectures = computed(() => {
  return course.value?.sections?.flatMap(s =>
    s.lectures.map(l => ({ ...l, sectionId: s.id, sectionTitle: s.title }))
  ) || []
})

const currentLectureIndex = ref(0)
const currentLecture = computed(() => allLectures.value[currentLectureIndex.value] || null)
const currentSection = computed(() =>
  course.value?.sections?.find(s => s.id === currentLecture.value?.sectionId)
)

const prevLectureExists = computed(() => currentLectureIndex.value > 0)
const nextLectureExists = computed(() => currentLectureIndex.value < allLectures.value.length - 1)

const isCompleted = computed(() =>
  progress.value.completedLectures?.includes(currentLecture.value?.id)
)

const hasReviewed = computed(() =>
  lmsStore.getCourseReviews(course.value?.id).some(r => r.userId === authStore.user?.id)
)

const videoEl = ref(null)

const sampleQA = [
  { id: 1, user: 'James K.', question: 'What is the difference between let and const?', answer: 'Great question! "let" allows you to reassign the variable, while "const" creates a constant that cannot be reassigned. However, const objects can still have their properties modified.' },
  { id: 2, user: 'Amara N.', question: 'Can we use arrow functions everywhere?', answer: 'Arrow functions are great for most cases, but they don\'t bind their own "this", so be careful when using them as method definitions in objects or class definitions.' },
]

function isLectureCompleted(id) {
  return progress.value.completedLectures?.includes(id)
}

function toggleSidebar(i) {
  const idx = openSidebarSections.value.indexOf(i)
  if (idx !== -1) openSidebarSections.value.splice(idx, 1)
  else openSidebarSections.value.push(i)
}

function selectLecture(section, lecture) {
  const idx = allLectures.value.findIndex(l => l.id === lecture.id)
  if (idx !== -1) currentLectureIndex.value = idx
}

function nextLecture() {
  if (nextLectureExists.value) {
    markComplete()
    currentLectureIndex.value++
  }
}

function prevLecture() {
  if (prevLectureExists.value) currentLectureIndex.value--
}

function markComplete() {
  if (currentLecture.value) {
    lmsStore.markLectureComplete(authStore.user.id, route.params.id, currentLecture.value.id)
  }
}

function onVideoEnded() {
  markComplete()
  if (nextLectureExists.value) {
    setTimeout(() => nextLecture(), 1500)
  }
}

function onTimeUpdate() {}

function onLectureComplete() {
  markComplete()
}

function saveNotes() {
  localStorage.setItem(`notes-${route.params.id}-${currentLecture.value?.id}`, notes.value)
  toast.success('Notes saved!')
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

function downloadCertificate() {
  toast.success('Certificate downloaded successfully!')
  showCertificate.value = false
}
</script>

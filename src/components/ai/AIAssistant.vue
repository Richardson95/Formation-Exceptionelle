<template>
  <div class="fixed bottom-6 right-6 z-50">
    <!-- Chat Window -->
    <Transition name="slide-up">
      <div
        v-if="isOpen"
        class="mb-4 w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
        style="height: 520px"
      >
        <!-- Header -->
        <div class="bg-gradient-fe px-5 py-4 flex items-center justify-between flex-shrink-0">
          <div class="flex items-center gap-3">
            <div class="relative">
              <div class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <SparklesIcon class="w-5 h-5 text-gold-300" />
              </div>
              <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <p class="font-bold text-white text-sm">FE Assistant</p>
              <p class="text-purple-200 text-xs">AI Career Guide · Online</p>
            </div>
          </div>
          <button @click="isOpen = false" class="text-white/70 hover:text-white transition-colors">
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>

        <!-- Messages -->
        <div ref="messagesEl" class="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
          <div
            v-for="msg in messages"
            :key="msg.id"
            class="flex"
            :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
          >
            <!-- Bot Avatar -->
            <div v-if="msg.role === 'assistant'" class="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
              <SparklesIcon class="w-3.5 h-3.5 text-purple-700" />
            </div>

            <div
              class="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
              :class="msg.role === 'user'
                ? 'bg-purple-700 text-white rounded-br-sm'
                : 'bg-gray-100 text-gray-800 rounded-bl-sm'"
            >
              {{ msg.content }}

              <!-- Quick Actions for bot messages -->
              <div v-if="msg.quickActions" class="mt-3 flex flex-wrap gap-2">
                <button
                  v-for="action in msg.quickActions"
                  :key="action.label"
                  @click="handleQuickAction(action)"
                  class="px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors border border-purple-200"
                >
                  {{ action.label }}
                </button>
              </div>
            </div>
          </div>

          <!-- Typing indicator -->
          <div v-if="isTyping" class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
              <SparklesIcon class="w-3.5 h-3.5 text-purple-700" />
            </div>
            <div class="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm">
              <div class="flex gap-1">
                <div v-for="i in 3" :key="i" class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" :style="{ animationDelay: (i * 0.15) + 's' }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Suggestions -->
        <div v-if="showSuggestions" class="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
          <button
            v-for="suggestion in quickSuggestions"
            :key="suggestion"
            @click="sendMessage(suggestion)"
            class="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors border border-purple-200 whitespace-nowrap"
          >
            {{ suggestion }}
          </button>
        </div>

        <!-- Input -->
        <div class="px-4 py-3 border-t border-gray-100 flex items-end gap-2 flex-shrink-0">
          <textarea
            v-model="inputText"
            @keydown.enter.exact.prevent="sendMessage()"
            placeholder="Ask me anything..."
            class="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent max-h-24"
            rows="1"
            style="min-height: 38px"
          ></textarea>
          <button
            @click="sendMessage()"
            :disabled="!inputText.trim() || isTyping"
            class="w-9 h-9 rounded-xl bg-purple-700 hover:bg-purple-800 flex items-center justify-center transition-colors disabled:opacity-50 flex-shrink-0"
          >
            <PaperAirplaneIcon class="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </Transition>

    <!-- Toggle Button -->
    <button
      @click="toggleChat"
      class="w-14 h-14 rounded-full bg-gradient-fe shadow-fe-lg flex items-center justify-center transition-all duration-200 hover:scale-110 relative"
    >
      <Transition name="fade">
        <ChatBubbleLeftRightIcon v-if="!isOpen" class="w-6 h-6 text-white absolute" />
        <XMarkIcon v-else class="w-6 h-6 text-white absolute" />
      </Transition>

      <!-- Notification badge -->
      <div v-if="!isOpen && hasUnread" class="absolute -top-1 -right-1 w-4 h-4 bg-gold-500 rounded-full flex items-center justify-center">
        <span class="text-white text-xs font-bold">1</span>
      </div>
    </button>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import {
  SparklesIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/vue/24/outline'

const router = useRouter()
const isOpen = ref(false)
const inputText = ref('')
const isTyping = ref(false)
const hasUnread = ref(true)
const showSuggestions = ref(true)
const messagesEl = ref(null)

const quickSuggestions = [
  'What courses are available?',
  'How do I become an instructor?',
  'Find jobs for me',
  'How does the LMS work?',
]

const messages = ref([
  {
    id: 1,
    role: 'assistant',
    content: 'Hi! I\'m your FE Career Assistant powered by AI. I\'m here to help you navigate your career journey with Formation Exceptionelle. How can I help you today?',
    quickActions: [
      { label: 'Browse Courses', path: '/lms' },
      { label: 'Find Jobs', path: '/jobs' },
      { label: 'Become Instructor', path: '/become-instructor' },
    ]
  }
])

const aiResponses = {
  courses: {
    response: 'We offer 200+ professional courses across Web Development, Data Science, Business, Marketing, Design, and Finance. All courses come with certificates, quizzes, and hands-on projects. Would you like to browse our course catalog?',
    quickActions: [{ label: 'Browse All Courses', path: '/lms' }]
  },
  jobs: {
    response: 'We have 500+ active job listings including full-time positions, internships, and remote opportunities across tech, marketing, finance, and more. You can filter by location, salary, and job type.',
    quickActions: [{ label: 'View Job Listings', path: '/jobs' }]
  },
  instructor: {
    response: 'Becoming an instructor at Formation Exceptionelle is a great opportunity! You can create courses, upload videos, and earn from paid enrollments. You\'ll need to complete an application form, and we\'ll review your credentials.',
    quickActions: [{ label: 'Apply to Teach', path: '/become-instructor' }]
  },
  lms: {
    response: 'Our LMS is similar to Udemy! You can browse courses, add them to cart, pay securely, and start learning immediately. Features include HD videos, chapter navigation, quizzes, progress tracking, and automated certificate generation.',
    quickActions: [{ label: 'Start Learning', path: '/lms' }]
  },
  default: {
    response: 'I\'d be happy to help! You can ask me about our courses, job opportunities, instructor program, payment options, certificates, or anything else about Formation Exceptionelle. What would you like to know?',
    quickActions: [
      { label: 'View Courses', path: '/lms' },
      { label: 'Find Jobs', path: '/jobs' },
    ]
  }
}

function toggleChat() {
  isOpen.value = !isOpen.value
  if (isOpen.value) hasUnread.value = false
}

function getAIResponse(text) {
  const lower = text.toLowerCase()
  if (lower.includes('course') || lower.includes('learn') || lower.includes('study')) return aiResponses.courses
  if (lower.includes('job') || lower.includes('work') || lower.includes('career') || lower.includes('hire')) return aiResponses.jobs
  if (lower.includes('instructor') || lower.includes('teach') || lower.includes('create course')) return aiResponses.instructor
  if (lower.includes('lms') || lower.includes('platform') || lower.includes('how does')) return aiResponses.lms
  return aiResponses.default
}

async function sendMessage(text) {
  const content = text || inputText.value.trim()
  if (!content) return

  showSuggestions.value = false
  messages.value.push({ id: Date.now(), role: 'user', content })
  inputText.value = ''

  await scrollToBottom()

  isTyping.value = true
  await new Promise(r => setTimeout(r, 1000 + Math.random() * 800))
  isTyping.value = false

  const aiRes = getAIResponse(content)
  messages.value.push({
    id: Date.now() + 1,
    role: 'assistant',
    content: aiRes.response,
    quickActions: aiRes.quickActions,
  })

  await scrollToBottom()
}

function handleQuickAction(action) {
  router.push(action.path)
  isOpen.value = false
}

async function scrollToBottom() {
  await nextTick()
  if (messagesEl.value) {
    messagesEl.value.scrollTop = messagesEl.value.scrollHeight
  }
}

watch(messages, scrollToBottom, { deep: true })
</script>

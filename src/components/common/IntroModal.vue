<template>
  <Transition name="intro-fade">
    <div
      v-if="show"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome video"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" @click="close"></div>

      <!-- Modal -->
      <div class="relative w-full max-w-3xl max-h-[95vh] flex flex-col">
        <!-- Close button -->
        <button
          @click="close"
          class="absolute -top-3 -right-3 z-10 w-9 h-9 rounded-full bg-white text-gray-700 shadow-xl flex items-center justify-center hover:bg-gray-100 hover:scale-105 transition-all"
          aria-label="Close"
        >
          <XMarkIcon class="w-5 h-5" />
        </button>

        <div class="bg-gradient-to-br from-purple-950 to-purple-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col min-h-0">
          <!-- Header -->
          <div class="px-5 sm:px-6 pt-4 pb-3 text-center flex-shrink-0">
            <span class="inline-block badge bg-gold-500/20 text-gold-300 text-[11px] font-semibold mb-1.5">Welcome to Formation Exceptionelle</span>
            <h2 class="text-lg sm:text-xl font-bold text-white">
              Your Partner In Career Development
            </h2>
          </div>

          <!-- Video -->
          <div class="relative bg-black w-full flex-1 min-h-0 flex items-center justify-center">
            <video
              ref="videoRef"
              :src="videoSrc"
              class="w-full h-[55vh] sm:h-[64vh] lg:h-[72vh] max-h-[calc(95vh-140px)] object-cover bg-black"
              autoplay
              muted
              playsinline
              controls
              @ended="close"
            ></video>

            <!-- Tap to unmute -->
            <button
              v-if="muted"
              @click="unmute"
              class="absolute bottom-14 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/90 hover:bg-white text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur transition-all"
            >
              <SpeakerXMarkIcon class="w-4 h-4" /> Tap for sound
            </button>
          </div>

          <!-- Footer -->
          <div class="px-5 sm:px-6 py-3 flex items-center justify-between gap-3 flex-shrink-0">
            <label class="flex items-center gap-2 text-purple-200 text-xs sm:text-sm cursor-pointer select-none">
              <input type="checkbox" v-model="dontShowAgain" class="rounded border-purple-400 bg-transparent text-gold-500 focus:ring-gold-400" />
              Don't show this again
            </label>
            <button @click="close" class="btn-gold px-5 py-2 text-sm justify-center">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { XMarkIcon, SpeakerXMarkIcon } from '@heroicons/vue/24/outline'

// Placeholder intro video. To use your own, drop a file in /public (e.g. public/intro.mp4)
// and change this to '/intro.mp4', or paste a direct .mp4 URL here.
const videoSrc = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'

const SESSION_KEY = 'fe_intro_seen'      // once per session
const DISMISS_KEY = 'fe_intro_dismissed' // permanently dismissed via "Don't show again"

const show = ref(false)
const muted = ref(true)
const dontShowAgain = ref(false)
const videoRef = ref(null)

function unmute() {
  if (!videoRef.value) return
  videoRef.value.muted = false
  muted.value = false
  videoRef.value.play().catch(() => {})
}

function close() {
  show.value = false
  document.body.style.overflow = ''
  try {
    sessionStorage.setItem(SESSION_KEY, '1')
    if (dontShowAgain.value) localStorage.setItem(DISMISS_KEY, '1')
  } catch (e) { /* storage unavailable */ }
}

function onKeydown(e) {
  if (e.key === 'Escape') close()
}

onMounted(() => {
  let dismissed = false
  let seen = false
  try {
    dismissed = localStorage.getItem(DISMISS_KEY) === '1'
    seen = sessionStorage.getItem(SESSION_KEY) === '1'
  } catch (e) { /* storage unavailable */ }

  if (dismissed || seen) return

  show.value = true
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.intro-fade-enter-active,
.intro-fade-leave-active {
  transition: opacity 0.3s ease;
}
.intro-fade-enter-from,
.intro-fade-leave-to {
  opacity: 0;
}
</style>

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

          <!-- Video (Bunny Stream embed player) -->
          <div class="relative bg-black w-full" style="aspect-ratio: 16 / 9;">
            <iframe
              :src="embedUrl"
              class="absolute inset-0 w-full h-full"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowfullscreen
            ></iframe>
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

// ── Bunny Stream intro video ────────────────────────────────────────────────
// Library "Formation Exceptionelle" (id 696965). Upload the intro video to that
// library, copy its Video ID (GUID), and paste it below. Until a GUID is set the
// modal stays hidden, so it's safe to ship without a video.
const BUNNY_LIBRARY_ID = 696965
const VIDEO_GUID = 'bf8bc7f2-e581-4a25-aa49-4d91ff7977a1' // Free Trade Zones (intro)

// Muted autoplay is the only form browsers allow without a user gesture, so the
// video must stay muted to start on its own on every device. `preload=true` primes
// the stream and `loop=false` lets it play through once.
const embedUrl = computed(
  () =>
    `https://iframe.mediadelivery.net/embed/${BUNNY_LIBRARY_ID}/${VIDEO_GUID}` +
    `?autoplay=true&muted=true&preload=true&loop=false&responsive=false`
)

const SESSION_KEY = 'fe_intro_seen'      // once per session
const DISMISS_KEY = 'fe_intro_dismissed' // permanently dismissed via "Don't show again"

const show = ref(false)
const dontShowAgain = ref(false)

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
  // No video configured yet → never show the modal.
  if (!VIDEO_GUID) return

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

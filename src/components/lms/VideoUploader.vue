<template>
  <div class="rounded-xl border border-gray-200 bg-white p-3">
    <!-- READY: a video asset exists -->
    <div v-if="modelValue && state !== 'uploading'" class="flex items-center gap-3">
      <!-- Thumbnail -->
      <div class="relative w-28 h-16 rounded-lg overflow-hidden bg-gray-900 flex-shrink-0">
        <img v-if="modelValue.thumbnail" :src="modelValue.thumbnail" class="w-full h-full object-cover" alt="" />
        <div v-else class="w-full h-full flex items-center justify-center">
          <FilmIcon class="w-6 h-6 text-gray-500" />
        </div>
        <span v-if="modelValue.durationLabel" class="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/75 text-white text-[10px] font-medium">
          {{ modelValue.durationLabel }}
        </span>
      </div>

      <!-- Meta -->
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-gray-900 truncate">
          {{ modelValue.source === 'url' ? 'External video link' : (modelValue.originalName || 'Uploaded video') }}
        </p>
        <div class="flex items-center gap-2 mt-1">
          <span
            class="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full"
            :class="modelValue.status === 'ready' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'"
          >
            <CheckCircleIcon v-if="modelValue.status === 'ready'" class="w-3 h-3" />
            <ArrowPathIcon v-else class="w-3 h-3 animate-spin" />
            {{ modelValue.status === 'ready' ? 'Ready' : 'Processing' }}
          </span>
          <span v-if="modelValue.size" class="text-xs text-gray-400">{{ prettySize(modelValue.size) }}</span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-1 flex-shrink-0">
        <button type="button" @click="pick" class="text-xs font-medium text-purple-700 hover:text-purple-800 px-2 py-1 rounded-lg hover:bg-purple-50">
          Replace
        </button>
        <button type="button" @click="remove" class="text-gray-400 hover:text-red-500 p-1 rounded-lg" title="Remove video">
          <TrashIcon class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- UPLOADING -->
    <div v-else-if="state === 'uploading'" class="py-1">
      <div class="flex items-center justify-between mb-2">
        <p class="text-sm font-medium text-gray-700 truncate flex items-center gap-2">
          <ArrowUpTrayIcon class="w-4 h-4 text-purple-600" />
          {{ uploadingName }}
        </p>
        <span class="text-sm font-semibold text-purple-700">{{ progress }}%</span>
      </div>
      <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div class="h-full bg-gradient-to-r from-purple-600 to-purple-500 rounded-full transition-all duration-200" :style="{ width: progress + '%' }"></div>
      </div>
      <p class="text-xs text-gray-400 mt-1.5">{{ progress < 100 ? 'Uploading…' : 'Finalizing…' }}</p>
    </div>

    <!-- EMPTY / DROPZONE -->
    <div v-else>
      <div
        class="rounded-lg border-2 border-dashed px-4 py-6 text-center cursor-pointer transition-colors"
        :class="dragging ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'"
        @click="pick"
        @dragover.prevent="dragging = true"
        @dragleave.prevent="dragging = false"
        @drop.prevent="onDrop"
      >
        <ArrowUpTrayIcon class="w-8 h-8 mx-auto mb-2 text-gray-400" />
        <p class="text-sm font-medium text-gray-700">Drag &amp; drop your video, or <span class="text-purple-700">browse</span></p>
        <p class="text-xs text-gray-400 mt-1">MP4, MOV or WEBM — one video per lecture</p>
      </div>

      <p v-if="state === 'error'" class="text-xs text-red-500 mt-2">{{ errorMsg }}</p>

      <!-- URL fallback -->
      <div class="mt-2">
        <button v-if="!urlMode" type="button" @click="urlMode = true" class="text-xs text-gray-500 hover:text-purple-700">
          or add a video link instead
        </button>
        <div v-else class="flex gap-2">
          <input
            v-model="urlInput"
            type="url"
            placeholder="https://…/lecture.mp4"
            class="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-purple-400"
            @keyup.enter="applyUrl"
          />
          <button type="button" @click="applyUrl" class="text-sm font-medium text-white bg-purple-700 hover:bg-purple-800 px-3 py-2 rounded-lg">
            Add
          </button>
        </div>
      </div>
    </div>

    <input ref="fileInput" type="file" accept="video/*" class="hidden" @change="onFileInput" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import {
  ArrowUpTrayIcon, FilmIcon, TrashIcon, CheckCircleIcon, ArrowPathIcon,
} from '@heroicons/vue/24/outline'
import { uploadVideo, assetFromUrl, formatFileSize } from '@/services/videoService'

const props = defineProps({
  modelValue: { type: Object, default: null },
})
const emit = defineEmits(['update:modelValue', 'duration'])

const fileInput = ref(null)
const state = ref('idle') // idle | uploading | error
const progress = ref(0)
const uploadingName = ref('')
const dragging = ref(false)
const errorMsg = ref('')
const urlMode = ref(false)
const urlInput = ref('')

const prettySize = formatFileSize

function pick() {
  fileInput.value?.click()
}

function onFileInput(e) {
  const file = e.target.files?.[0]
  if (file) startUpload(file)
  e.target.value = '' // allow re-selecting the same file
}

function onDrop(e) {
  dragging.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file) startUpload(file)
}

async function startUpload(file) {
  errorMsg.value = ''
  state.value = 'uploading'
  progress.value = 0
  uploadingName.value = file.name
  try {
    const asset = await uploadVideo(file, { onProgress: (p) => { progress.value = p } })
    emit('update:modelValue', asset)
    if (asset.durationLabel) emit('duration', asset.durationLabel)
    state.value = 'idle'
    toast.success('Video uploaded')
  } catch (err) {
    state.value = 'error'
    errorMsg.value = err.message || 'Upload failed'
    toast.error(errorMsg.value)
  }
}

function applyUrl() {
  const url = urlInput.value.trim()
  if (!url) return
  emit('update:modelValue', assetFromUrl(url))
  urlMode.value = false
  urlInput.value = ''
}

function remove() {
  emit('update:modelValue', null)
  state.value = 'idle'
  progress.value = 0
}
</script>

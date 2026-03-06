<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    <div class="container-custom pt-28 pb-16">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-1">{{ isEditing ? 'Edit Course' : 'Create New Course' }}</h1>
          <p class="text-gray-600">{{ isEditing ? 'Update your course details' : 'Share your expertise with the world' }}</p>
        </div>
        <RouterLink to="/lms/instructor" class="btn-secondary text-sm">
          <ArrowLeftIcon class="w-4 h-4 mr-1" /> Back
        </RouterLink>
      </div>

      <!-- Step Progress -->
      <div class="flex items-center gap-2 mb-10">
        <div
          v-for="(step, i) in steps"
          :key="step"
          class="flex items-center gap-2"
        >
          <div
            class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
            :class="currentStep > i
              ? 'bg-green-500 text-white'
              : currentStep === i
                ? 'bg-purple-700 text-white shadow-fe'
                : 'bg-gray-200 text-gray-500'"
          >
            <CheckIcon v-if="currentStep > i" class="w-4 h-4" />
            <span v-else>{{ i + 1 }}</span>
          </div>
          <span class="text-sm hidden md:block" :class="currentStep === i ? 'text-purple-700 font-semibold' : 'text-gray-500'">{{ step }}</span>
          <ChevronRightIcon v-if="i < steps.length - 1" class="w-4 h-4 text-gray-300 hidden md:block" />
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Form -->
        <div class="lg:col-span-2">
          <!-- Step 1: Basic Info -->
          <div v-if="currentStep === 0" class="space-y-6">
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-5">Course Information</h2>
              <div class="space-y-5">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Course Title *</label>
                  <input v-model="form.title" type="text" placeholder="e.g. Complete Python Bootcamp 2024" class="input-field" required />
                  <p class="text-xs text-gray-400 mt-1">{{ form.title.length }}/120 characters</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Course Subtitle *</label>
                  <input v-model="form.subtitle" type="text" placeholder="Briefly describe your course" class="input-field" required />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea v-model="form.description" rows="6" placeholder="Describe your course in detail. What will students learn? Who is it for?" class="input-field resize-none" required></textarea>
                </div>
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <select v-model="form.category" class="input-field" required>
                      <option value="">Select category</option>
                      <option v-for="cat in categories" :key="cat">{{ cat }}</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Level *</label>
                    <select v-model="form.level" class="input-field" required>
                      <option value="">Select level</option>
                      <option>Beginner</option><option>Intermediate</option>
                      <option>Advanced</option><option>All Levels</option>
                    </select>
                  </div>
                </div>
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <select v-model="form.language" class="input-field">
                      <option>English</option><option>French</option><option>Yoruba</option><option>Hausa</option><option>Igbo</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
                    <input v-model="tagsInput" type="text" placeholder="JavaScript, React, Web Dev" class="input-field" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Objectives -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-5">What Students Will Learn</h2>
              <div class="space-y-3">
                <div v-for="(obj, i) in form.objectives" :key="i" class="flex gap-2">
                  <input v-model="form.objectives[i]" type="text" :placeholder="`Learning objective ${i + 1}`" class="input-field flex-1" />
                  <button @click="form.objectives.splice(i, 1)" class="text-gray-400 hover:text-red-500 transition-colors">
                    <XMarkIcon class="w-5 h-5" />
                  </button>
                </div>
                <button @click="form.objectives.push('')" class="flex items-center gap-2 text-purple-700 font-medium text-sm hover:text-purple-800 transition-colors">
                  <PlusIcon class="w-4 h-4" /> Add objective
                </button>
              </div>
            </div>

            <!-- Requirements -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-5">Requirements</h2>
              <div class="space-y-3">
                <div v-for="(req, i) in form.requirements" :key="i" class="flex gap-2">
                  <input v-model="form.requirements[i]" type="text" :placeholder="`Requirement ${i + 1}`" class="input-field flex-1" />
                  <button @click="form.requirements.splice(i, 1)" class="text-gray-400 hover:text-red-500">
                    <XMarkIcon class="w-5 h-5" />
                  </button>
                </div>
                <button @click="form.requirements.push('')" class="flex items-center gap-2 text-purple-700 font-medium text-sm">
                  <PlusIcon class="w-4 h-4" /> Add requirement
                </button>
              </div>
            </div>
          </div>

          <!-- Step 2: Media -->
          <div v-if="currentStep === 1" class="space-y-6">
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-5">Course Media</h2>

              <!-- Thumbnail -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Course Thumbnail *</label>
                <div class="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-purple-400 transition-colors cursor-pointer" @click="$refs.thumbInput.click()">
                  <img v-if="form.thumbnail" :src="form.thumbnail" class="w-full h-40 object-cover rounded-xl mb-3" />
                  <div v-else>
                    <PhotoIcon class="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p class="text-sm text-gray-500">Click to upload thumbnail</p>
                    <p class="text-xs text-gray-400 mt-1">PNG, JPG up to 2MB. Recommended: 1280x720px</p>
                  </div>
                  <input ref="thumbInput" type="file" accept="image/*" class="hidden" @change="handleThumbnail" />
                </div>
                <!-- Demo thumbnails -->
                <div class="mt-3">
                  <p class="text-xs text-gray-500 mb-2">Or pick a demo thumbnail:</p>
                  <div class="flex gap-2 overflow-x-auto pb-1">
                    <img
                      v-for="thumb in demoThumbs"
                      :key="thumb"
                      :src="thumb"
                      class="w-20 h-14 object-cover rounded-lg cursor-pointer hover:ring-2 hover:ring-purple-500 transition-all flex-shrink-0"
                      @click="form.thumbnail = thumb"
                    />
                  </div>
                </div>
              </div>

              <!-- Preview Video -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Preview Video URL</label>
                <input v-model="form.previewVideo" type="url" placeholder="https://..." class="input-field" />
                <p class="text-xs text-gray-400 mt-1">Add a 1-5 minute preview video URL to attract students</p>
                <!-- Or use demo -->
                <div class="mt-2 flex flex-wrap gap-2">
                  <button @click="form.previewVideo = demoVideo" class="text-xs text-purple-700 border border-purple-200 px-3 py-1 rounded-lg hover:bg-purple-50">
                    Use demo video
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: Curriculum -->
          <div v-if="currentStep === 2" class="space-y-4">
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div class="flex items-center justify-between mb-5">
                <h2 class="text-xl font-bold text-gray-900">Course Curriculum</h2>
                <button @click="addSection" class="btn-secondary text-sm px-4 py-2">
                  <PlusIcon class="w-4 h-4 mr-1" /> Add Section
                </button>
              </div>

              <div class="space-y-4">
                <div
                  v-for="(section, si) in form.sections"
                  :key="si"
                  class="border border-gray-200 rounded-2xl overflow-hidden"
                >
                  <!-- Section Header -->
                  <div class="bg-gray-50 px-4 py-3 flex items-center gap-3">
                    <input v-model="form.sections[si].title" type="text" :placeholder="`Section ${si + 1}: Title`" class="flex-1 text-sm font-semibold bg-transparent border-none focus:outline-none text-gray-900" />
                    <button @click="form.sections.splice(si, 1)" class="text-gray-400 hover:text-red-500 transition-colors">
                      <TrashIcon class="w-4 h-4" />
                    </button>
                  </div>

                  <!-- Lectures -->
                  <div class="p-4 space-y-2">
                    <div
                      v-for="(lecture, li) in section.lectures"
                      :key="li"
                      class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                    >
                      <select v-model="form.sections[si].lectures[li].type" class="text-xs border border-gray-200 rounded-lg px-2 py-1.5 bg-white">
                        <option value="video">Video</option>
                        <option value="quiz">Quiz</option>
                        <option value="assignment">Assignment</option>
                      </select>
                      <input v-model="form.sections[si].lectures[li].title" type="text" placeholder="Lecture title" class="flex-1 text-sm bg-transparent border-none focus:outline-none" />
                      <input
                        v-if="lecture.type === 'video'"
                        v-model="form.sections[si].lectures[li].videoUrl"
                        type="url"
                        placeholder="Video URL"
                        class="flex-1 text-xs border border-gray-200 rounded-lg px-2 py-1.5"
                      />
                      <input v-model="form.sections[si].lectures[li].duration" type="text" placeholder="Duration" class="w-20 text-xs border border-gray-200 rounded-lg px-2 py-1.5" />
                      <label class="flex items-center gap-1 text-xs text-gray-500">
                        <input type="checkbox" v-model="form.sections[si].lectures[li].preview" class="rounded" />
                        Preview
                      </label>
                      <button @click="form.sections[si].lectures.splice(li, 1)" class="text-gray-400 hover:text-red-500">
                        <XMarkIcon class="w-4 h-4" />
                      </button>
                    </div>

                    <button @click="addLecture(si)" class="flex items-center gap-2 text-purple-700 text-sm font-medium hover:text-purple-800 transition-colors mt-2">
                      <PlusIcon class="w-4 h-4" /> Add Lecture
                    </button>
                  </div>
                </div>

                <button @click="addSection" v-if="form.sections.length === 0" class="w-full py-8 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center gap-2 text-gray-500 hover:border-purple-400 hover:text-purple-600 transition-colors">
                  <PlusIcon class="w-8 h-8" />
                  <span>Add your first section</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Step 4: Pricing -->
          <div v-if="currentStep === 3" class="space-y-6">
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-5">Pricing</h2>

              <!-- Free or Paid -->
              <div class="flex gap-4 mb-6">
                <label class="flex-1 cursor-pointer">
                  <input type="radio" v-model="form.isPaid" :value="false" class="sr-only" />
                  <div class="p-4 rounded-2xl border-2 transition-all text-center" :class="!form.isPaid ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-gray-300'">
                    <GiftIcon class="w-8 h-8 mx-auto mb-2" :class="!form.isPaid ? 'text-purple-700' : 'text-gray-400'" />
                    <p class="font-bold" :class="!form.isPaid ? 'text-purple-700' : 'text-gray-600'">Free</p>
                    <p class="text-xs text-gray-500">Maximum reach, no cost to students</p>
                  </div>
                </label>
                <label class="flex-1 cursor-pointer">
                  <input type="radio" v-model="form.isPaid" :value="true" class="sr-only" />
                  <div class="p-4 rounded-2xl border-2 transition-all text-center" :class="form.isPaid ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-gray-300'">
                    <CurrencyDollarIcon class="w-8 h-8 mx-auto mb-2" :class="form.isPaid ? 'text-purple-700' : 'text-gray-400'" />
                    <p class="font-bold" :class="form.isPaid ? 'text-purple-700' : 'text-gray-600'">Paid</p>
                    <p class="text-xs text-gray-500">Earn revenue from your course</p>
                  </div>
                </label>
              </div>

              <div v-if="form.isPaid" class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Course Price (USD) *</label>
                  <div class="relative">
                    <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                    <input v-model.number="form.price" type="number" min="0" step="0.01" placeholder="49.99" class="input-field pl-8" required />
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Original Price (USD)</label>
                  <div class="relative">
                    <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                    <input v-model.number="form.originalPrice" type="number" min="0" step="0.01" placeholder="99.99" class="input-field pl-8" />
                  </div>
                  <p class="text-xs text-gray-400 mt-1">Shown as crossed out original price</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar Preview -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h3 class="font-bold text-gray-900 mb-4">Course Preview</h3>
            <div class="aspect-video bg-gray-100 rounded-xl overflow-hidden mb-4">
              <img v-if="form.thumbnail" :src="form.thumbnail" class="w-full h-full object-cover" />
              <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
                <PhotoIcon class="w-10 h-10" />
              </div>
            </div>
            <h4 class="font-bold text-gray-900 text-sm mb-1 line-clamp-2">{{ form.title || 'Course Title' }}</h4>
            <p class="text-gray-500 text-xs mb-3">{{ authStore.fullName }}</p>
            <div class="flex items-center gap-2">
              <span v-if="!form.isPaid" class="text-green-600 font-bold text-lg">Free</span>
              <template v-else>
                <span class="font-bold text-gray-900 text-lg">${{ form.price || '0' }}</span>
                <span v-if="form.originalPrice" class="text-gray-400 text-sm line-through">${{ form.originalPrice }}</span>
              </template>
            </div>

            <!-- Completion Checklist -->
            <div class="mt-5 pt-5 border-t border-gray-100">
              <p class="text-xs font-semibold text-gray-700 mb-3">Completion Checklist</p>
              <ul class="space-y-2">
                <li v-for="check in completionChecklist" :key="check.label" class="flex items-center gap-2 text-xs">
                  <CheckCircleIcon class="w-4 h-4 flex-shrink-0" :class="check.done ? 'text-green-500' : 'text-gray-300'" />
                  <span :class="check.done ? 'text-gray-700' : 'text-gray-400'">{{ check.label }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="flex items-center justify-between mt-8">
        <button v-if="currentStep > 0" @click="currentStep--" class="btn-secondary px-6 py-3">
          <ChevronLeftIcon class="w-4 h-4 mr-1" /> Previous
        </button>
        <div class="ml-auto flex gap-3">
          <button @click="saveDraft" class="btn-outline px-6 py-3">Save Draft</button>
          <button
            v-if="currentStep < steps.length - 1"
            @click="currentStep++"
            class="btn-primary px-8 py-3"
          >
            Next <ChevronRightIcon class="w-4 h-4 ml-1" />
          </button>
          <button
            v-else
            @click="publishCourse"
            :disabled="lmsStore.loading"
            class="btn-gold px-8 py-3"
          >
            <span v-if="lmsStore.loading">Publishing...</span>
            <span v-else class="flex items-center gap-2">
              <RocketLaunchIcon class="w-5 h-5" /> Publish Course
            </span>
          </button>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { useLMSStore } from '@/stores/lms'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'vue3-toastify'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import {
  ArrowLeftIcon, ChevronRightIcon, ChevronLeftIcon, CheckIcon, PlusIcon,
  XMarkIcon, TrashIcon, PhotoIcon, GiftIcon, CurrencyDollarIcon,
  CheckCircleIcon, RocketLaunchIcon
} from '@heroicons/vue/24/outline'

const lmsStore = useLMSStore()
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const isEditing = computed(() => !!route.params.id)
const currentStep = ref(0)

const steps = ['Basic Info', 'Media', 'Curriculum', 'Pricing']
const categories = ['Web Development', 'Data Science', 'Marketing', 'Business', 'Design', 'Finance', 'Leadership']
const demoVideo = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
const demoThumbs = [
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80',
  'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80',
]

const form = ref({
  title: '', subtitle: '', description: '',
  category: '', level: '', language: 'English',
  thumbnail: '', previewVideo: '',
  objectives: ['', ''],
  requirements: [''],
  sections: [],
  isPaid: false,
  price: 0,
  originalPrice: 0,
  certificate: true,
})
const tagsInput = ref('')

const completionChecklist = computed(() => [
  { label: 'Course title', done: !!form.value.title },
  { label: 'Description', done: !!form.value.description },
  { label: 'Category', done: !!form.value.category },
  { label: 'Thumbnail', done: !!form.value.thumbnail },
  { label: 'Course content', done: form.value.sections.length > 0 },
  { label: 'Pricing set', done: !form.value.isPaid || form.value.price > 0 },
])

function addSection() {
  form.value.sections.push({ id: `s${Date.now()}`, title: '', duration: '', lectures: [] })
}

function addLecture(si) {
  form.value.sections[si].lectures.push({
    id: `l${Date.now()}`, title: '', type: 'video', duration: '', preview: false, videoUrl: ''
  })
}

function handleThumbnail(e) {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (ev) => { form.value.thumbnail = ev.target.result }
    reader.readAsDataURL(file)
  }
}

function saveDraft() {
  toast.success('Draft saved successfully!')
}

async function publishCourse() {
  if (!form.value.title || !form.value.description || !form.value.category) {
    toast.error('Please fill in all required fields')
    currentStep.value = 0
    return
  }
  const tags = tagsInput.value.split(',').map(t => t.trim()).filter(Boolean)
  await lmsStore.addCourse({ ...form.value, tags }, authStore.user.id)
  router.push('/lms/instructor')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    <div class="pt-24 pb-16">
      <div class="container-custom max-w-3xl">
        <!-- Header -->
        <div class="mb-8">
          <RouterLink :to="{ name: 'job-detail', params: { id: route.params.id } }" class="flex items-center gap-2 text-purple-700 font-medium text-sm mb-4 hover:gap-3 transition-all">
            <ArrowLeftIcon class="w-4 h-4" /> Back to Job
          </RouterLink>
          <div v-if="job" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex gap-4 mb-6">
            <div class="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center font-bold text-purple-700 text-xl flex-shrink-0">
              {{ job.company[0] }}
            </div>
            <div>
              <h2 class="font-bold text-gray-900 text-lg">{{ job.title }}</h2>
              <p class="text-purple-600 font-medium">{{ job.company }}</p>
              <div class="flex gap-2 mt-1">
                <span class="text-xs text-gray-500">{{ job.location }}</span>
                <span class="text-xs text-gray-400">•</span>
                <span class="text-xs text-gray-500">{{ job.type }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Submit Your Application</h1>
          <p class="text-gray-600 mb-8">Fill out all fields carefully. Your application will be reviewed by the hiring team.</p>

          <div v-if="!submitted">
            <form @submit.prevent="submitApplication" class="space-y-6">
              <!-- Personal Info -->
              <div>
                <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span class="w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-sm font-bold flex items-center justify-center">1</span>
                  Personal Information
                </h3>
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input v-model="form.fullName" type="text" :placeholder="authStore.fullName" class="input-field" required />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input v-model="form.email" type="email" :placeholder="authStore.user?.email" class="input-field" required />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input v-model="form.phone" type="tel" placeholder="+234 800 000 0000" class="input-field" required />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Current Location</label>
                    <input v-model="form.location" type="text" placeholder="Lagos, Nigeria" class="input-field" />
                  </div>
                </div>
              </div>

              <div class="border-t border-gray-100 pt-6">
                <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span class="w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-sm font-bold flex items-center justify-center">2</span>
                  Professional Profile
                </h3>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile URL</label>
                    <input v-model="form.linkedin" type="url" placeholder="https://linkedin.com/in/yourname" class="input-field" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Portfolio / GitHub URL</label>
                    <input v-model="form.portfolio" type="url" placeholder="https://yourportfolio.com" class="input-field" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                    <select v-model="form.experience" class="input-field">
                      <option>Less than 1 year</option>
                      <option>1-2 years</option>
                      <option>3-5 years</option>
                      <option>5-10 years</option>
                      <option>10+ years</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="border-t border-gray-100 pt-6">
                <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span class="w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-sm font-bold flex items-center justify-center">3</span>
                  Cover Letter
                </h3>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Why are you the right candidate? *</label>
                  <textarea v-model="form.coverLetter" rows="6" placeholder="Tell the employer why you're the perfect fit for this role. Mention your relevant experience, skills, and what excites you about this opportunity..." class="input-field resize-none" required></textarea>
                  <p class="text-xs text-gray-400 mt-1">{{ form.coverLetter.length }} characters</p>
                </div>
              </div>

              <div class="border-t border-gray-100 pt-6">
                <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span class="w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-sm font-bold flex items-center justify-center">4</span>
                  Resume / CV
                </h3>
                <div class="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-purple-400 transition-colors cursor-pointer" @click="$refs.cvInput.click()">
                  <DocumentArrowUpIcon class="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <p class="font-medium text-gray-700 text-sm">
                    {{ form.cvName || 'Click to upload your Resume / CV' }}
                  </p>
                  <p class="text-xs text-gray-400 mt-1">PDF, DOC, DOCX up to 5MB</p>
                  <input ref="cvInput" type="file" accept=".pdf,.doc,.docx" class="hidden" @change="handleCV" />
                </div>
                <button type="button" v-if="!form.cvName" @click="form.cvName = 'Resume_' + authStore.fullName.replace(' ', '_') + '.pdf'" class="mt-2 text-xs text-purple-700 hover:underline">
                  Use profile resume (demo)
                </button>
              </div>

              <!-- Terms -->
              <div class="flex items-start gap-3">
                <input v-model="form.agree" type="checkbox" id="agree" required class="mt-1 rounded border-gray-300 text-purple-600" />
                <label for="agree" class="text-sm text-gray-600">
                  I confirm that all information provided is accurate. I understand that misrepresentation may result in disqualification.
                </label>
              </div>

              <button type="submit" :disabled="jobsStore.loading" class="btn-primary w-full py-4 text-base">
                <span v-if="jobsStore.loading" class="flex items-center gap-2">
                  <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  Submitting Application...
                </span>
                <span v-else>Submit Application</span>
              </button>
            </form>
          </div>

          <!-- Success State -->
          <div v-else class="text-center py-12">
            <div class="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon class="w-10 h-10 text-green-500" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-3">Application Submitted!</h2>
            <p class="text-gray-600 mb-2">Your application for <strong>{{ job?.title }}</strong> at <strong>{{ job?.company }}</strong> has been submitted successfully.</p>
            <p class="text-gray-500 text-sm mb-8">The hiring team will review your application and contact you within 5-7 business days.</p>
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <RouterLink to="/jobs" class="btn-primary px-8 py-3">Browse More Jobs</RouterLink>
              <RouterLink to="/lms" class="btn-outline px-8 py-3">Enhance Your Skills</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useJobsStore } from '@/stores/jobs'
import { useAuthStore } from '@/stores/auth'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { ArrowLeftIcon, DocumentArrowUpIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const router = useRouter()
const jobsStore = useJobsStore()
const authStore = useAuthStore()

const job = computed(() => jobsStore.getJobById(route.params.id))
const submitted = ref(false)

const form = ref({
  fullName: authStore.fullName,
  email: authStore.user?.email || '',
  phone: authStore.user?.phone || '',
  location: '',
  linkedin: '',
  portfolio: '',
  experience: '1-2 years',
  coverLetter: '',
  cvName: '',
  agree: false,
})

function handleCV(e) {
  const file = e.target.files[0]
  if (file) form.value.cvName = file.name
}

async function submitApplication() {
  await jobsStore.applyForJob(authStore.user.id, job.value.id, {
    fullName: form.value.fullName,
    email: form.value.email,
    phone: form.value.phone,
    coverLetter: form.value.coverLetter,
    experience: form.value.experience,
    linkedin: form.value.linkedin,
    portfolio: form.value.portfolio,
    cvName: form.value.cvName,
  })
  submitted.value = true
}
</script>

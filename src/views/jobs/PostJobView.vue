<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    <div class="pt-24 pb-16">
      <div class="container-custom max-w-3xl">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Post a Job or Internship</h1>
          <p class="text-gray-600">Reach thousands of qualified candidates from across Africa</p>
        </div>

        <div v-if="!submitted" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form @submit.prevent="handlePost" class="space-y-6">
            <!-- Job Details -->
            <div>
              <h2 class="text-xl font-bold text-gray-900 mb-5">Job Details</h2>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                  <input v-model="form.title" type="text" placeholder="e.g. Senior Frontend Developer" class="input-field" required />
                </div>
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                    <input v-model="form.company" type="text" placeholder="Your company name" class="input-field" required />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <select v-model="form.category" class="input-field" required>
                      <option value="">Select category</option>
                      <option v-for="cat in categories" :key="cat">{{ cat }}</option>
                    </select>
                  </div>
                </div>
                <div class="grid md:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Job Type *</label>
                    <select v-model="form.type" class="input-field" required>
                      <option>Full-time</option><option>Part-time</option>
                      <option>Internship</option><option>Contract</option><option>Freelance</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Work Mode *</label>
                    <select v-model="form.locationType" class="input-field" required>
                      <option>Remote</option><option>On-site</option><option>Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Level</label>
                    <select v-model="form.level" class="input-field">
                      <option>Entry</option><option>Mid-level</option><option>Senior</option><option>Manager</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                  <input v-model="form.location" type="text" placeholder="e.g. Lagos, Nigeria or Remote" class="input-field" required />
                </div>
              </div>
            </div>

            <div class="border-t border-gray-100 pt-6">
              <h2 class="text-xl font-bold text-gray-900 mb-5">Compensation</h2>
              <div class="grid md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Min Salary (₦)</label>
                  <input v-model.number="form.salary.min" type="number" placeholder="100000" class="input-field" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Max Salary (₦)</label>
                  <input v-model.number="form.salary.max" type="number" placeholder="300000" class="input-field" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Period</label>
                  <select v-model="form.salary.period" class="input-field">
                    <option>monthly</option><option>yearly</option><option>hourly</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="border-t border-gray-100 pt-6">
              <h2 class="text-xl font-bold text-gray-900 mb-5">Job Description</h2>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Overview *</label>
                  <textarea v-model="form.description" rows="5" placeholder="Describe this role..." class="input-field resize-none" required></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Responsibilities</label>
                  <div v-for="(r, i) in form.responsibilities" :key="i" class="flex gap-2 mb-2">
                    <input v-model="form.responsibilities[i]" type="text" :placeholder="`Responsibility ${i+1}`" class="input-field flex-1" />
                    <button type="button" @click="form.responsibilities.splice(i,1)" class="text-gray-400 hover:text-red-500"><XMarkIcon class="w-5 h-5" /></button>
                  </div>
                  <button type="button" @click="form.responsibilities.push('')" class="text-sm text-purple-700 font-medium flex items-center gap-1"><PlusIcon class="w-4 h-4" />Add</button>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
                  <div v-for="(r, i) in form.requirements" :key="i" class="flex gap-2 mb-2">
                    <input v-model="form.requirements[i]" type="text" :placeholder="`Requirement ${i+1}`" class="input-field flex-1" />
                    <button type="button" @click="form.requirements.splice(i,1)" class="text-gray-400 hover:text-red-500"><XMarkIcon class="w-5 h-5" /></button>
                  </div>
                  <button type="button" @click="form.requirements.push('')" class="text-sm text-purple-700 font-medium flex items-center gap-1"><PlusIcon class="w-4 h-4" />Add</button>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Skills (comma separated)</label>
                  <input v-model="skillsInput" type="text" placeholder="JavaScript, React, Node.js" class="input-field" />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Benefits</label>
                  <input v-model="benefitsInput" type="text" placeholder="Health insurance, Remote work, Bonus" class="input-field" />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Application Deadline *</label>
                  <input v-model="form.deadline" type="date" class="input-field" required />
                </div>
              </div>
            </div>

            <button type="submit" :disabled="jobsStore.loading" class="btn-primary w-full py-4 text-base">
              <span v-if="jobsStore.loading" class="flex items-center gap-2">
                <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Publishing...
              </span>
              <span v-else class="flex items-center gap-2"><RocketLaunchIcon class="w-5 h-5" /> Post Job</span>
            </button>
          </form>
        </div>

        <!-- Success -->
        <div v-else class="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div class="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon class="w-10 h-10 text-green-500" />
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-3">Job Posted Successfully!</h2>
          <p class="text-gray-600 mb-8">Your job listing is now live and visible to thousands of candidates.</p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <RouterLink to="/jobs" class="btn-primary px-8 py-3">View All Jobs</RouterLink>
            <button @click="submitted=false; resetForm()" class="btn-outline px-8 py-3">Post Another Job</button>
          </div>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useJobsStore } from '@/stores/jobs'
import { useAuthStore } from '@/stores/auth'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { XMarkIcon, PlusIcon, RocketLaunchIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'

const jobsStore = useJobsStore()
const authStore = useAuthStore()
const submitted = ref(false)
const skillsInput = ref('')
const benefitsInput = ref('')

const categories = ['Technology', 'Data Science', 'Marketing', 'Human Resources', 'Finance', 'Design', 'Business']

const form = ref({
  title: '', company: '', category: '', type: 'Full-time',
  locationType: 'On-site', level: 'Mid-level', location: '',
  description: '',
  responsibilities: [''],
  requirements: [''],
  salary: { min: 0, max: 0, currency: 'NGN', period: 'monthly' },
  experience: '2-4 years',
  deadline: '',
})

function resetForm() {
  form.value = { title: '', company: '', category: '', type: 'Full-time', locationType: 'On-site', level: 'Mid-level', location: '', description: '', responsibilities: [''], requirements: [''], salary: { min: 0, max: 0, currency: 'NGN', period: 'monthly' }, experience: '2-4 years', deadline: '' }
  skillsInput.value = ''
  benefitsInput.value = ''
}

async function handlePost() {
  const skills = skillsInput.value.split(',').map(s => s.trim()).filter(Boolean)
  const benefits = benefitsInput.value.split(',').map(b => b.trim()).filter(Boolean)
  await jobsStore.postJob({ ...form.value, skills, benefits }, authStore.user.id)
  submitted.value = true
}
</script>

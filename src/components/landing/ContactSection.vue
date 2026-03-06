<template>
  <section class="section-padding bg-white" id="contact">
    <div class="container-custom">
      <div class="grid lg:grid-cols-2 gap-16 items-start">
        <!-- Left -->
        <div>
          <span data-aos="fade-right" class="badge-purple text-sm px-4 py-2 mb-4 inline-block">Get In Touch</span>
          <h2 data-aos="fade-right" data-aos-delay="100" class="section-title mb-4">
            Let's Start Your
            <span class="gradient-text block">Success Journey</span>
          </h2>
          <p data-aos="fade-right" data-aos-delay="200" class="text-gray-600 leading-relaxed mb-10">
            Have questions? Need a customized training solution for your organization? Our team of career development experts is ready to help you achieve your goals.
          </p>

          <!-- Contact Cards -->
          <div class="space-y-4">
            <div
              v-for="(contact, i) in contactInfo"
              :key="contact.label"
              data-aos="fade-right"
              :data-aos-delay="300 + i * 100"
              class="flex items-center gap-4 p-4 rounded-2xl bg-purple-50 hover:bg-purple-100 transition-colors"
            >
              <div class="w-12 h-12 rounded-xl bg-purple-700 flex items-center justify-center flex-shrink-0">
                <component :is="contact.icon" class="w-5 h-5 text-white" />
              </div>
              <div>
                <p class="text-sm text-gray-500">{{ contact.label }}</p>
                <p class="font-semibold text-gray-900">{{ contact.value }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right - Contact Form -->
        <div data-aos="fade-left" class="bg-white rounded-3xl shadow-fe-lg border border-purple-100 p-8">
          <h3 class="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h3>

          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  v-model="form.firstName"
                  type="text"
                  placeholder="John"
                  class="input-field"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  v-model="form.lastName"
                  type="text"
                  placeholder="Doe"
                  class="input-field"
                  required
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                v-model="form.email"
                type="email"
                placeholder="john@company.com"
                class="input-field"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                v-model="form.phone"
                type="tel"
                placeholder="+234 800 000 0000"
                class="input-field"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">I'm interested in...</label>
              <select v-model="form.interest" class="input-field">
                <option value="">Select an option</option>
                <option v-for="opt in interests" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                v-model="form.message"
                rows="4"
                placeholder="Tell us about your training needs..."
                class="input-field resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              :disabled="submitting"
              class="btn-primary w-full text-base py-4"
            >
              <span v-if="submitting" class="flex items-center gap-2">
                <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Sending...
              </span>
              <span v-else class="flex items-center gap-2">
                Send Message
                <PaperAirplaneIcon class="w-5 h-5" />
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import { MapPinIcon, EnvelopeIcon, PhoneIcon, ClockIcon, PaperAirplaneIcon } from '@heroicons/vue/24/outline'

const submitting = ref(false)
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  interest: '',
  message: '',
})

const contactInfo = [
  { icon: MapPinIcon, label: 'Office Address', value: '123 Victoria Island, Lagos, Nigeria' },
  { icon: EnvelopeIcon, label: 'Email Us', value: 'info@formationexceptionelle.com' },
  { icon: PhoneIcon, label: 'Call Us', value: '+234 800 000 0000' },
  { icon: ClockIcon, label: 'Business Hours', value: 'Mon–Fri: 9AM – 6PM WAT' },
]

const interests = [
  'Online Courses',
  'Corporate Training',
  'Career Placement',
  'Instructor Partnership',
  'Job Posting',
  'Other',
]

async function handleSubmit() {
  submitting.value = true
  await new Promise(r => setTimeout(r, 1200))
  submitting.value = false
  toast.success('Message sent! We\'ll get back to you within 24 hours.')
  form.value = { firstName: '', lastName: '', email: '', phone: '', interest: '', message: '' }
}
</script>

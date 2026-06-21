<template>
  <section class="section-padding bg-purple-50" id="testimonials">
    <div class="container-custom">
      <div class="text-center mb-16" data-aos="fade-up">
        <span class="badge-purple text-sm px-4 py-2 mb-4 inline-block">Success Stories</span>
        <h2 class="section-title mb-4">
          What Our <span class="gradient-text">Students Say</span>
        </h2>
        <p class="section-subtitle">
          Real stories from real professionals whose careers were transformed by Formation Exceptionelle.
        </p>
      </div>

      <!-- Testimonials Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(testimonial, i) in testimonials"
          :key="testimonial.name"
          data-aos="fade-up"
          :data-aos-delay="i * 100"
          class="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 relative"
          :class="testimonial.featured ? 'ring-2 ring-purple-500' : ''"
        >
          <!-- Quote Icon -->
          <div class="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
            <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
            </svg>
          </div>

          <!-- Stars -->
          <div class="flex gap-0.5 mb-4">
            <StarSolidIcon v-for="s in 5" :key="s" class="w-4 h-4 text-gold-400" />
          </div>

          <p class="text-gray-700 text-sm leading-relaxed mb-6 italic">
            "{{ testimonial.text }}"
          </p>

          <!-- Author -->
          <div class="flex items-center gap-3 pt-4 border-t border-gray-100">
            <div
              class="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              :style="{ background: testimonial.gradient }"
            >
              {{ testimonial.initials }}
            </div>
            <div>
              <p class="font-bold text-gray-900 text-sm">{{ testimonial.name }}</p>
              <p class="text-purple-600 text-xs">{{ testimonial.role }}</p>
              <p class="text-gray-400 text-xs">{{ testimonial.company }}</p>
            </div>
            <div v-if="testimonial.featured" class="ml-auto badge bg-gold-100 text-gold-700 text-xs">
              Featured
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { StarIcon as StarSolidIcon } from '@heroicons/vue/24/solid'

const testimonials = [
  {
    name: 'Chioma Eze',
    initials: 'CE',
    role: 'Company Secretary',
    company: 'Sterling Holdings Plc',
    text: 'The Company Secretarial Practice programme sharpened my command of board administration and statutory compliance. Within months I was promoted to Company Secretary. The faculty are genuinely world-class.',
    gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
    featured: true,
  },
  {
    name: 'Oluwaseun Adebayo',
    initials: 'OA',
    role: 'Compliance Officer',
    company: 'Access Bank Nigeria',
    text: 'The Capital Market: Corporate Financing, Regulations & Compliance course gave me exactly the regulatory depth I needed to step up into a compliance role. Practical, current and highly relevant.',
    gradient: 'linear-gradient(135deg, #d97706, #fbbf24)',
    featured: false,
  },
  {
    name: 'Fatima Al-Hassan',
    initials: 'FA',
    role: 'Tax Manager',
    company: 'Harcourt Advisory',
    text: 'The New Tax Laws programme demystified the recent reforms completely. I now advise clients with real confidence on the strategic implications. Worth every kobo.',
    gradient: 'linear-gradient(135deg, #059669, #34d399)',
    featured: false,
  },
  {
    name: 'Emmanuel Osei',
    initials: 'EO',
    role: 'Corporate Counsel',
    company: 'Dangote Group',
    text: 'The M&A and ADR course transformed how I approach transactions and disputes. The negotiation simulations alone were worth the enrolment. Truly exceptional instruction.',
    gradient: 'linear-gradient(135deg, #dc2626, #f87171)',
    featured: false,
  },
  {
    name: 'Ngozi Iweala',
    initials: 'NI',
    role: 'Non-Executive Director',
    company: 'MTN Nigeria',
    text: 'The Strategic Leadership & Corporate Governance programme reshaped my contribution at board level — aligning strategy, ethics and stakeholder management. Genuinely high-impact.',
    gradient: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
    featured: true,
  },
  {
    name: 'Kwame Mensah',
    initials: 'KM',
    role: 'Project Finance Lead',
    company: 'Africa Energy Partners',
    text: 'The Project Structuring & Financing with ESG Integration course equipped me with advanced fiscal modelling and ESG skills for our energy deals. The case studies made complex concepts click.',
    gradient: 'linear-gradient(135deg, #8b5cf6, #c4b5fd)',
    featured: false,
  },
]
</script>

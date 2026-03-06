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
    role: 'Senior Software Engineer',
    company: 'Interswitch Group',
    text: 'Formation Exceptionelle completely transformed my career. I went from a junior developer to a senior engineer in just 18 months after completing their Web Development Bootcamp. The quality of instruction is unmatched!',
    gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
    featured: true,
  },
  {
    name: 'Oluwaseun Adebayo',
    initials: 'OA',
    role: 'Data Analyst',
    company: 'Access Bank Nigeria',
    text: 'The Data Science course gave me exactly the skills I needed to transition from finance to data analytics. The instructors are world-class and the community support is incredible.',
    gradient: 'linear-gradient(135deg, #d97706, #fbbf24)',
    featured: false,
  },
  {
    name: 'Fatima Al-Hassan',
    initials: 'FA',
    role: 'Digital Marketing Manager',
    company: 'Jumia Nigeria',
    text: 'I enrolled in the Digital Marketing Masterclass with zero experience and landed a manager role within 8 months. The curriculum is incredibly practical and up-to-date.',
    gradient: 'linear-gradient(135deg, #059669, #34d399)',
    featured: false,
  },
  {
    name: 'Emmanuel Osei',
    initials: 'EO',
    role: 'UI/UX Design Lead',
    company: 'Flutterwave',
    text: 'The UI/UX course was a game-changer. The projects I built during training directly helped me land interviews at top tech companies. Worth every naira!',
    gradient: 'linear-gradient(135deg, #dc2626, #f87171)',
    featured: false,
  },
  {
    name: 'Ngozi Iweala',
    initials: 'NI',
    role: 'Product Manager',
    company: 'MTN Nigeria',
    text: 'From an unemployed graduate to a Product Manager at MTN in just 12 months. Formation Exceptionelle\'s career placement support was exceptional and genuinely life-changing.',
    gradient: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
    featured: true,
  },
  {
    name: 'Kwame Mensah',
    initials: 'KM',
    role: 'Financial Analyst',
    company: 'Goldman Sachs',
    text: 'The Financial Literacy course equipped me with advanced investment analysis skills. The instructor\'s real-world examples and case studies made complex concepts easy to understand.',
    gradient: 'linear-gradient(135deg, #8b5cf6, #c4b5fd)',
    featured: false,
  },
]
</script>

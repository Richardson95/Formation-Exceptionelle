<template>
  <section class="section-padding bg-purple-50" id="testimonials">
    <div class="container-custom">
      <div class="text-center mb-16" data-aos="fade-up">
        <span class="badge-purple text-sm px-4 py-2 mb-4 inline-block">Success Stories</span>
        <h2 class="section-title mb-4">
          What Our <span class="gradient-text">Students Say</span>
        </h2>
        <p class="section-subtitle">
          Real feedback from real professionals whose careers were transformed by Formation Exceptionelle.
        </p>
      </div>

      <!-- Testimonials Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(testimonial, i) in testimonials"
          :key="i"
          data-aos="fade-up"
          :data-aos-delay="i * 100"
          class="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
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

          <p class="text-gray-700 text-sm leading-relaxed italic">
            "{{ testimonial }}"
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { StarIcon as StarSolidIcon } from '@heroicons/vue/24/solid'

// Real attendee feedback from Formation Exceptionelle webinars/trainings.
// Kept anonymous — no names, roles, companies or regions.
const testimonials = [
  'Yes oo, very insightful.',
  'Great webinar.',
  'The interview format really made it interesting and less restrictive.',
  'It was fantastic and well delivered. In fact I learned a lot, my brother. It was a master class and an eye opener for me.',
  'I enjoyed the lesson.',
  'More like a chat amongst friends.',
  "Dear Ayo, I really enjoyed you and Dare's training on contracts. As someone who has been drafting contracts for years, it was good to learn a few new things. Congratulations on a successful training exercise.",
]
</script>

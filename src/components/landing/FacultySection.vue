<template>
  <section class="section-padding bg-white" id="faculty">
    <div class="container-custom">
      <div class="text-center mb-16" data-aos="fade-up">
        <span class="badge-gold text-sm px-4 py-2 mb-4 inline-block">World-Class Experts</span>
        <h2 class="section-title mb-4">
          Meet Our <span class="gradient-text">Distinguished Faculty</span>
        </h2>
        <p class="section-subtitle">
          Learn from industry veterans, academic scholars, and thought leaders who are shaping the future of their fields.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(faculty, i) in facultyMembers"
          :key="faculty.name"
          data-aos="fade-up"
          :data-aos-delay="i * 100"
          class="card card-hover text-center group"
        >
          <!-- Avatar -->
          <div class="relative">
            <div class="w-full h-52 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center relative overflow-hidden">
              <div
                class="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-fe"
                :style="{ background: faculty.gradient }"
              >
                {{ faculty.initials }}
              </div>
              <!-- Social overlay -->
              <div class="absolute inset-0 bg-purple-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                <a v-for="s in faculty.socials" :key="s" href="#" class="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                  <GlobeAltIcon class="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
          </div>

          <div class="p-5">
            <div class="badge-purple text-xs mb-3">{{ faculty.specialty }}</div>
            <h3 class="font-bold text-gray-900 text-lg group-hover:text-purple-700 transition-colors">{{ faculty.name }}</h3>
            <p class="text-purple-600 text-sm font-medium mb-2">{{ faculty.title }}</p>
            <p class="text-gray-500 text-xs leading-relaxed mb-4">{{ faculty.bio }}</p>

            <!-- Stats -->
            <div class="flex justify-around pt-4 border-t border-gray-100">
              <div class="text-center">
                <div class="text-lg font-bold text-purple-700">{{ faculty.courses }}</div>
                <div class="text-xs text-gray-500">Courses</div>
              </div>
              <div class="text-center">
                <div class="text-lg font-bold text-purple-700">{{ faculty.students }}</div>
                <div class="text-xs text-gray-500">Students</div>
              </div>
              <div class="text-center">
                <div class="text-lg font-bold text-gold-500">{{ faculty.rating }}</div>
                <div class="text-xs text-gray-500">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Join as Instructor CTA -->
      <div data-aos="fade-up" class="mt-16 bg-gradient-to-r from-purple-900 to-purple-700 rounded-3xl p-10 text-center relative overflow-hidden">
        <div class="absolute inset-0 opacity-10" style="background: url('data:image/svg+xml,...') center/cover"></div>
        <h3 class="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">
          Are You an Industry Expert?
        </h3>
        <p class="text-purple-200 max-w-xl mx-auto mb-8 relative z-10">
          Join our faculty of world-class instructors and share your expertise with thousands of eager learners across Africa and the world.
        </p>
        <RouterLink to="/become-instructor" class="btn-gold text-base px-8 py-4 relative z-10">
          Apply to Teach
          <ArrowRightIcon class="w-5 h-5 ml-2" />
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { GlobeAltIcon, ArrowRightIcon } from '@heroicons/vue/24/outline'

const facultyMembers = [
  {
    name: 'Dr. Angela Okonkwo',
    initials: 'AO',
    title: 'Head of Technology',
    specialty: 'Web Development',
    bio: 'PhD in Computer Science from MIT. 15+ years building enterprise software. Former Tech Lead at Google.',
    courses: 12,
    students: '45K',
    rating: '4.9',
    gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
    socials: ['linkedin', 'twitter'],
  },
  {
    name: 'Prof. James Adeyemi',
    initials: 'JA',
    title: 'Business Strategy Director',
    specialty: 'Leadership & Business',
    bio: 'Harvard MBA. Former McKinsey partner. Expert in organizational transformation and corporate strategy.',
    courses: 8,
    students: '32K',
    rating: '4.8',
    gradient: 'linear-gradient(135deg, #d97706, #fbbf24)',
    socials: ['linkedin'],
  },
  {
    name: 'Dr. Amara Nwosu',
    initials: 'AN',
    title: 'Data Science Lead',
    specialty: 'Data & AI',
    bio: 'Data Scientist with 10+ years in ML/AI. Published researcher and former Senior Scientist at Microsoft.',
    courses: 6,
    students: '28K',
    rating: '4.9',
    gradient: 'linear-gradient(135deg, #059669, #34d399)',
    socials: ['linkedin', 'twitter'],
  },
  {
    name: 'Sarah Mensah',
    initials: 'SM',
    title: 'Digital Marketing Expert',
    specialty: 'Marketing & Growth',
    bio: 'Growth hacker with campaigns reaching 100M+ people. Former Head of Marketing at a Fortune 500 company.',
    courses: 5,
    students: '22K',
    rating: '4.7',
    gradient: 'linear-gradient(135deg, #dc2626, #f87171)',
    socials: ['linkedin', 'instagram'],
  },
]
</script>

<template>
  <section class="section-padding bg-white" id="services">
    <div class="container-custom">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left -->
        <div>
          <span data-aos="fade-right" class="badge-purple text-sm px-4 py-2 mb-4 inline-block">Our Services</span>
          <h2 data-aos="fade-right" data-aos-delay="100" class="section-title mb-6">
            Comprehensive Training
            <span class="gradient-text block">Solutions for All</span>
          </h2>
          <p data-aos="fade-right" data-aos-delay="200" class="text-gray-600 leading-relaxed mb-8">
            Formation Exceptionelle offers a full suite of professional development services designed to elevate individuals and organizations to the pinnacle of their industries.
          </p>

          <!-- Services List -->
          <div class="space-y-4">
            <div
              v-for="(service, i) in services"
              :key="service.title"
              data-aos="fade-right"
              :data-aos-delay="300 + i * 100"
              class="flex items-start gap-4 p-4 rounded-2xl hover:bg-purple-50 transition-colors cursor-pointer group"
            >
              <div class="w-12 h-12 rounded-xl bg-purple-100 group-hover:bg-purple-600 flex items-center justify-center flex-shrink-0 transition-colors">
                <component :is="service.icon" class="w-6 h-6 text-purple-700 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h4 class="font-bold text-gray-900 mb-1 group-hover:text-purple-700 transition-colors">{{ service.title }}</h4>
                <p class="text-gray-600 text-sm leading-relaxed">{{ service.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right - Stats Cards -->
        <div data-aos="fade-left" class="grid grid-cols-2 gap-4">
          <div
            v-for="(stat, i) in statsCards"
            :key="stat.label"
            data-aos="zoom-in"
            :data-aos-delay="i * 100"
            class="stat-card"
            :class="i % 2 !== 0 ? 'mt-6' : ''"
          >
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              :style="{ background: stat.bg }"
            >
              <component :is="stat.icon" class="w-6 h-6" :style="{ color: stat.color }" />
            </div>
            <div class="text-3xl font-bold mb-1" :style="{ color: stat.color }">{{ stat.value }}</div>
            <div class="text-gray-600 text-sm font-medium">{{ stat.label }}</div>
            <div class="text-gray-400 text-xs mt-1">{{ stat.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  AcademicCapIcon,
  BriefcaseIcon,
  ChartBarIcon,
  UserGroupIcon,
  GlobeAltIcon,
  TrophyIcon,
  StarIcon,
  ClockIcon,
} from '@heroicons/vue/24/outline'

const services = [
  {
    icon: AcademicCapIcon,
    title: 'Professional Certification Programs',
    description: 'Industry-recognized certifications across corporate law, finance, governance, taxation and dispute resolution.',
  },
  {
    icon: UserGroupIcon,
    title: 'Corporate & In-House Training',
    description: 'Customized programmes designed for boards, legal teams and organisations to upskill their workforce.',
  },
  {
    icon: BriefcaseIcon,
    title: 'Executive Mentorship & Advisory',
    description: 'Dedicated advisers and industry mentors to support your professional growth and leadership journey.',
  },
  {
    icon: GlobeAltIcon,
    title: 'International Partnership Programs',
    description: 'Collaborations with global institutions for internationally recognized professional qualifications.',
  },
]

const statsCards = [
  {
    icon: UserGroupIcon,
    value: '15,000+',
    label: 'Professionals Trained',
    desc: 'Across 15 countries',
    bg: '#ede9fe',
    color: '#7c3aed',
  },
  {
    icon: TrophyIcon,
    value: '98%',
    label: 'Satisfaction Rate',
    desc: 'Based on feedback',
    bg: '#fef3c7',
    color: '#d97706',
  },
  {
    icon: AcademicCapIcon,
    value: '60+',
    label: 'Expert Programs',
    desc: 'Updated regularly',
    bg: '#d1fae5',
    color: '#059669',
  },
  {
    icon: ChartBarIcon,
    value: '98%',
    label: 'Satisfaction Rate',
    desc: 'Based on feedback',
    bg: '#fee2e2',
    color: '#dc2626',
  },
]
</script>

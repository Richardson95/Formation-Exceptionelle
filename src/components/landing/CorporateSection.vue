<template>
  <section class="section-padding bg-gray-50" id="about">
    <div class="container-custom">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <!-- Left Visual -->
        <div data-aos="fade-right" class="relative">
          <div class="bg-gradient-fe rounded-3xl p-8 text-white relative overflow-hidden">
            <div class="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-20 translate-x-20"></div>
            <div class="absolute bottom-0 left-0 w-32 h-32 bg-gold-400/10 rounded-full translate-y-16 -translate-x-16"></div>

            <div class="relative z-10">
              <div class="w-16 h-16 rounded-2xl bg-gold-500/20 flex items-center justify-center mb-6">
                <BuildingOfficeIcon class="w-8 h-8 text-gold-400" />
              </div>
              <h3 class="text-2xl font-bold mb-4">About Formation Exceptionelle</h3>
              <p class="text-purple-200 leading-relaxed mb-6">
                Founded with a mission to democratize access to world-class career development, Formation Exceptionelle has been empowering professionals across Africa and beyond since 2015.
              </p>

              <div class="grid grid-cols-2 gap-4">
                <div v-for="item in highlights" :key="item.label" class="bg-white/10 rounded-xl p-4">
                  <div class="text-2xl font-bold text-gold-400">{{ item.value }}</div>
                  <div class="text-purple-200 text-sm">{{ item.label }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Floating card -->
          <div class="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-fe-lg max-w-xs hidden md:block">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <CheckBadgeIcon class="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p class="font-bold text-gray-900 text-sm">ISO Certified</p>
                <p class="text-gray-500 text-xs">International Quality Standard</p>
              </div>
            </div>
            <div class="flex gap-1">
              <div v-for="i in 5" :key="i" class="flex-1 h-1.5 rounded-full bg-green-400"></div>
            </div>
          </div>
        </div>

        <!-- Right Content -->
        <div>
          <span data-aos="fade-left" class="badge-gold text-sm px-4 py-2 mb-4 inline-block">Our Profile</span>
          <h2 data-aos="fade-left" data-aos-delay="100" class="section-title mb-6">
            <span class="gradient-text">Your Partner</span> In Career Development
          </h2>
          <p data-aos="fade-left" data-aos-delay="200" class="text-gray-600 leading-relaxed mb-8">
            Formation Exceptionelle is Africa's leading career development and professional training institution. We bridge the gap between talent and opportunity through innovative learning solutions, industry partnerships, and personalized mentorship.
          </p>

          <div class="space-y-4">
            <div
              v-for="(value, i) in coreValues"
              :key="value.title"
              data-aos="fade-left"
              :data-aos-delay="300 + i * 100"
              class="flex items-start gap-4"
            >
              <div class="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                <component :is="value.icon" class="w-5 h-5 text-purple-700" />
              </div>
              <div>
                <h4 class="font-bold text-gray-900 mb-1">{{ value.title }}</h4>
                <p class="text-gray-600 text-sm">{{ value.description }}</p>
              </div>
            </div>
          </div>

          <!-- Partner logos -->
          <div data-aos="fade-left" data-aos-delay="600" class="mt-8 pt-8 border-t border-gray-200">
            <p class="text-sm text-gray-500 mb-4 font-medium">Trusted by industry leaders</p>
            <div class="flex flex-wrap gap-4 items-center">
              <div
                v-for="partner in partners"
                :key="partner"
                class="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium hover:bg-purple-100 hover:text-purple-700 transition-colors"
              >
                {{ partner }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  BuildingOfficeIcon,
  CheckBadgeIcon,
  StarIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  HeartIcon,
} from '@heroicons/vue/24/outline'

const highlights = [
  { value: '2015', label: 'Founded' },
  { value: '15+', label: 'Countries' },
  { value: '500+', label: 'Partners' },
  { value: 'Top 3', label: 'In Africa' },
]

const coreValues = [
  {
    icon: LightBulbIcon,
    title: 'Innovation-Driven Learning',
    description: 'We continuously evolve our curriculum to match industry demands and emerging technologies.',
  },
  {
    icon: StarIcon,
    title: 'Excellence in Everything',
    description: 'From course quality to student support — we maintain the highest standards in every interaction.',
  },
  {
    icon: HeartIcon,
    title: 'Student-First Philosophy',
    description: 'Every decision we make is guided by what\'s best for our learners and their career outcomes.',
  },
]

const partners = ['Google', 'Microsoft', 'Interswitch', 'MTN', 'Access Bank', 'Flutterwave', 'Andela']
</script>

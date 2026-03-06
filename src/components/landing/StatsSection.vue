<template>
  <section class="py-16 bg-gradient-fe relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <div class="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-80 h-80 bg-gold-400 rounded-full blur-3xl"></div>
    </div>

    <div class="container-custom relative z-10">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          data-aos="fade-up"
          :data-aos-delay="i * 100"
          class="text-center"
        >
          <div class="text-4xl md:text-5xl font-bold text-white mb-2">{{ stat.value }}</div>
          <div class="text-gold-300 font-semibold mb-1">{{ stat.label }}</div>
          <div class="text-purple-300 text-sm">{{ stat.sublabel }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { value: '50,000+', label: 'Professionals Trained', sublabel: 'Across 15 countries' },
  { value: '200+', label: 'Expert Courses', sublabel: 'Updated regularly' },
  { value: '95%', label: 'Employment Rate', sublabel: 'Within 6 months' },
  { value: '150+', label: 'Industry Partners', sublabel: 'And growing' },
]
</script>

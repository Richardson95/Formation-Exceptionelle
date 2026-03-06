<template>
  <div class="min-h-screen">
    <AppHeader />
    <main>
      <HeroSection />
      <StatsSection />
      <FeatureCardsSection />
      <ServicesSection />
      <FeaturedCoursesSection />
      <FacultySection />
      <CorporateSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import HeroSection from '@/components/landing/HeroSection.vue'
import StatsSection from '@/components/landing/StatsSection.vue'
import FeatureCardsSection from '@/components/landing/FeatureCardsSection.vue'
import ServicesSection from '@/components/landing/ServicesSection.vue'
import FeaturedCoursesSection from '@/components/landing/FeaturedCoursesSection.vue'
import FacultySection from '@/components/landing/FacultySection.vue'
import CorporateSection from '@/components/landing/CorporateSection.vue'
import TestimonialsSection from '@/components/landing/TestimonialsSection.vue'
import ContactSection from '@/components/landing/ContactSection.vue'
</script>

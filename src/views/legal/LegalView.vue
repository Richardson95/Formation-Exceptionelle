<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />

    <!-- Hero -->
    <div class="bg-gradient-fe pt-28 pb-14 relative overflow-hidden">
      <div class="absolute inset-0 opacity-10 pointer-events-none">
        <div class="absolute top-10 right-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
      </div>
      <div class="container-custom relative z-10">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm mb-5">
          <ShieldCheckIcon class="w-4 h-4 text-gold-400" /> Legal
        </div>
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-3">{{ doc.title }}</h1>
        <p class="text-purple-200">Last updated: {{ doc.lastUpdated }}</p>
      </div>
    </div>

    <div class="container-custom py-12">
      <div class="grid lg:grid-cols-4 gap-8">
        <!-- Table of contents -->
        <aside class="hidden lg:block lg:col-span-1">
          <div class="sticky top-24 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">On this page</p>
            <nav class="space-y-1">
              <a
                v-for="(section, i) in doc.sections"
                :key="i"
                :href="`#section-${i}`"
                class="block text-sm text-gray-600 hover:text-purple-700 py-1.5 transition-colors"
              >
                {{ i + 1 }}. {{ section.heading }}
              </a>
            </nav>
            <div class="mt-5 pt-5 border-t border-gray-100">
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Other policies</p>
              <div class="space-y-1.5">
                <RouterLink to="/terms" class="block text-sm text-gray-600 hover:text-purple-700 transition-colors">Terms of Service</RouterLink>
                <RouterLink to="/privacy" class="block text-sm text-gray-600 hover:text-purple-700 transition-colors">Privacy Policy</RouterLink>
                <RouterLink to="/cookies" class="block text-sm text-gray-600 hover:text-purple-700 transition-colors">Cookie Policy</RouterLink>
              </div>
            </div>
          </div>
        </aside>

        <!-- Content -->
        <article class="lg:col-span-3">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
            <p class="text-gray-600 leading-relaxed mb-8">{{ doc.intro }}</p>

            <section v-for="(section, i) in doc.sections" :key="i" :id="`section-${i}`" class="mb-9 scroll-mt-24">
              <h2 class="text-xl font-bold text-gray-900 mb-3">{{ i + 1 }}. {{ section.heading }}</h2>
              <div class="space-y-3">
                <template v-for="(block, bi) in section.body" :key="bi">
                  <ul v-if="Array.isArray(block)" class="list-disc pl-5 space-y-1.5 text-gray-600 leading-relaxed">
                    <li v-for="(li, lii) in block" :key="lii">{{ li }}</li>
                  </ul>
                  <p v-else class="text-gray-600 leading-relaxed">{{ block }}</p>
                </template>
              </div>
            </section>

            <!-- Contact -->
            <div class="mt-10 pt-8 border-t border-gray-100">
              <h2 class="text-lg font-bold text-gray-900 mb-2">Questions?</h2>
              <p class="text-gray-600">
                If you have any questions about this {{ doc.shortName }}, contact us at
                <a href="mailto:legal@formationexceptionelle.com" class="text-purple-700 font-medium hover:underline">legal@formationexceptionelle.com</a>.
              </p>
            </div>
          </div>

          <p class="text-xs text-gray-400 mt-6 text-center">
            This document is a template provided for the Formation Exceptionelle platform and does not constitute legal advice.
          </p>
        </article>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { ShieldCheckIcon } from '@heroicons/vue/24/outline'
import { LEGAL_DOCS } from './legalContent.js'

const route = useRoute()
const docKey = computed(() => route.meta.doc || 'terms')
const doc = computed(() => LEGAL_DOCS[docKey.value])
</script>

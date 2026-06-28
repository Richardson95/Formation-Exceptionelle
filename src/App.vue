<template>
  <div id="fe-app" class="min-h-screen bg-white">
    <RouterView />
    <WhatsAppButton />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import WhatsAppButton from '@/components/ai/WhatsAppButton.vue'
</script>

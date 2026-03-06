<template>
  <div id="fe-app" class="min-h-screen bg-white">
    <RouterView />
    <AIAssistant />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import AIAssistant from '@/components/ai/AIAssistant.vue'
</script>

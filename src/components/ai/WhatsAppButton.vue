<template>
  <a
    :href="whatsappUrl"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with us on WhatsApp"
    class="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] shadow-fe-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-[#1ebe5d]"
  >
    <!-- WhatsApp glyph -->
    <svg viewBox="0 0 32 32" class="w-7 h-7 text-white" fill="currentColor" aria-hidden="true">
      <path d="M16.003 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.257.59 4.46 1.713 6.403L3.2 28.8l6.57-1.72a12.74 12.74 0 0 0 6.23 1.587h.005c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.332-6.635-3.75-9.052A12.71 12.71 0 0 0 16.003 3.2zm0 23.04h-.004a10.6 10.6 0 0 1-5.4-1.48l-.387-.23-4.01 1.05 1.07-3.91-.252-.4a10.59 10.59 0 0 1-1.62-5.65c0-5.86 4.77-10.63 10.63-10.63 2.84 0 5.51 1.107 7.52 3.117a10.56 10.56 0 0 1 3.11 7.52c0 5.86-4.77 10.62-10.63 10.62zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.107-.5-.16-.71.16-.21.32-.82 1.04-1 1.253-.184.213-.37.24-.69.08-.32-.16-1.35-.498-2.57-1.587-.95-.847-1.59-1.893-1.78-2.213-.184-.32-.02-.493.14-.653.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.71-1.713-.973-2.347-.257-.616-.517-.533-.71-.543l-.604-.01c-.21 0-.553.08-.843.4-.29.32-1.107 1.08-1.107 2.633s1.133 3.053 1.29 3.267c.16.213 2.23 3.4 5.4 4.767.755.326 1.344.52 1.803.667.757.24 1.447.207 1.993.126.608-.09 1.89-.773 2.157-1.52.266-.747.266-1.387.186-1.52-.077-.133-.29-.213-.61-.373z"/>
    </svg>
  </a>
</template>

<script setup>
import { computed } from 'vue'

// Formation Exceptionelle WhatsApp line (09074830518 in international format)
const phone = '2349074830518'
const message = 'Hi Formation Exceptionelle! I have a question about your programmes.'

const whatsappUrl = computed(
  () => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
)
</script>

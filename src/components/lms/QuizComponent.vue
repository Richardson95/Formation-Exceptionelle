<template>
  <div class="w-full max-w-xl mx-auto p-8 text-white">
    <div v-if="!submitted">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-bold">Quiz: {{ quiz.title }}</h3>
        <span class="badge bg-white/20 text-white text-sm">{{ currentQ + 1 }}/{{ questions.length }}</span>
      </div>

      <!-- Progress -->
      <div class="w-full h-1.5 bg-white/20 rounded-full mb-8">
        <div class="h-full bg-gold-400 rounded-full transition-all" :style="{ width: ((currentQ + 1) / questions.length * 100) + '%' }"></div>
      </div>

      <div class="bg-white/10 rounded-2xl p-6 mb-6">
        <p class="text-lg font-medium mb-6">{{ questions[currentQ].question }}</p>
        <div class="space-y-3">
          <button
            v-for="(opt, i) in questions[currentQ].options"
            :key="i"
            @click="selectAnswer(i)"
            class="w-full text-left px-4 py-3 rounded-xl border-2 transition-all text-sm"
            :class="selectedAnswer === i
              ? 'border-gold-400 bg-gold-400/20 text-gold-300'
              : 'border-white/20 hover:border-white/40 bg-white/5'"
          >
            <span class="inline-flex w-6 h-6 rounded-full border border-current items-center justify-center text-xs mr-3 flex-shrink-0">
              {{ String.fromCharCode(65 + i) }}
            </span>
            {{ opt }}
          </button>
        </div>
      </div>

      <div class="flex justify-between">
        <button v-if="currentQ > 0" @click="currentQ--; selectedAnswer = null" class="btn-white text-sm px-5 py-2.5">Previous</button>
        <button
          v-if="currentQ < questions.length - 1"
          @click="nextQ"
          :disabled="selectedAnswer === null"
          class="btn-gold text-sm px-5 py-2.5 ml-auto disabled:opacity-50"
        >Next</button>
        <button v-else @click="submitQuiz" :disabled="selectedAnswer === null" class="btn-gold text-sm px-5 py-2.5 ml-auto disabled:opacity-50">
          Submit Quiz
        </button>
      </div>
    </div>

    <!-- Results -->
    <div v-else class="text-center">
      <div class="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" :class="score >= 70 ? 'bg-green-500/30' : 'bg-red-500/30'">
        <component :is="score >= 70 ? CheckCircleIcon : XCircleIcon" class="w-10 h-10" :class="score >= 70 ? 'text-green-400' : 'text-red-400'" />
      </div>
      <h3 class="text-2xl font-bold mb-2">{{ score >= 70 ? 'Excellent!' : 'Keep Practicing!' }}</h3>
      <p class="text-white/70 mb-2">You scored</p>
      <div class="text-5xl font-bold text-gold-400 mb-6">{{ score }}%</div>
      <p class="text-white/70 text-sm mb-8">{{ score >= 70 ? 'You passed! Great work.' : 'You need 70% to pass. Try again!' }}</p>
      <div class="flex gap-3 justify-center">
        <button @click="retake" class="btn-white text-sm">Retake Quiz</button>
        <button v-if="score >= 70" @click="$emit('complete')" class="btn-gold text-sm">Continue</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline'

const props = defineProps({ quiz: Object, courseId: String })
const emit = defineEmits(['complete'])

const questions = [
  {
    question: 'What does HTML stand for?',
    options: ['HyperText Markup Language', 'High Technology Modern Language', 'HyperText Modern Links', 'Home Tool Markup Language'],
    correct: 0
  },
  {
    question: 'Which CSS property is used to change text color?',
    options: ['font-color', 'text-color', 'color', 'background-color'],
    correct: 2
  },
  {
    question: 'Which JavaScript method adds an element to the end of an array?',
    options: ['append()', 'push()', 'add()', 'insert()'],
    correct: 1
  },
]

const currentQ = ref(0)
const selectedAnswer = ref(null)
const answers = ref([])
const submitted = ref(false)

const score = computed(() => {
  const correct = answers.value.filter((a, i) => a === questions[i].correct).length
  return Math.round((correct / questions.length) * 100)
})

function selectAnswer(i) { selectedAnswer.value = i }

function nextQ() {
  answers.value[currentQ.value] = selectedAnswer.value
  currentQ.value++
  selectedAnswer.value = null
}

function submitQuiz() {
  answers.value[currentQ.value] = selectedAnswer.value
  submitted.value = true
}

function retake() {
  currentQ.value = 0
  selectedAnswer.value = null
  answers.value = []
  submitted.value = false
}
</script>

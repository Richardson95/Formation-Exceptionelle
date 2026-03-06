<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    <div class="container-custom pt-28 pb-16">
      <h1 class="text-3xl font-bold text-gray-900 mb-10">Checkout</h1>

      <div v-if="!orderComplete" class="grid lg:grid-cols-3 gap-8">
        <!-- Payment Form -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Billing -->
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 class="text-xl font-bold text-gray-900 mb-5">Billing Information</h2>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input v-model="billing.firstName" type="text" class="input-field" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input v-model="billing.lastName" type="text" class="input-field" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input v-model="billing.email" type="email" class="input-field" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <select v-model="billing.country" class="input-field">
                  <option>Nigeria</option><option>Ghana</option><option>Kenya</option>
                  <option>South Africa</option><option>United States</option><option>United Kingdom</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Payment Method -->
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 class="text-xl font-bold text-gray-900 mb-5">Payment Method</h2>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              <button
                v-for="method in paymentMethods"
                :key="method.id"
                @click="selectedMethod = method.id"
                class="flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all"
                :class="selectedMethod === method.id ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-gray-300'"
              >
                <component :is="method.icon" class="w-6 h-6" :class="selectedMethod === method.id ? 'text-purple-700' : 'text-gray-500'" />
                <span class="text-xs font-medium" :class="selectedMethod === method.id ? 'text-purple-700' : 'text-gray-600'">{{ method.label }}</span>
              </button>
            </div>

            <!-- Card Details -->
            <div v-if="selectedMethod === 'card'" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                <div class="relative">
                  <CreditCardIcon class="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input v-model="card.number" type="text" placeholder="1234 5678 9012 3456" class="input-field pl-11" maxlength="19" @input="formatCard" />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                  <input v-model="card.expiry" type="text" placeholder="MM/YY" class="input-field" maxlength="5" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                  <input v-model="card.cvv" type="text" placeholder="123" class="input-field" maxlength="4" />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                <input v-model="card.name" type="text" :placeholder="authStore.fullName" class="input-field" />
              </div>
            </div>

            <!-- PayPal / Bank Transfer -->
            <div v-else-if="selectedMethod === 'paypal'" class="p-4 bg-blue-50 rounded-xl text-center">
              <p class="text-blue-700 text-sm">You'll be redirected to PayPal to complete your payment.</p>
            </div>
            <div v-else-if="selectedMethod === 'bank'" class="space-y-3">
              <div class="p-4 bg-gray-50 rounded-xl text-sm">
                <p class="font-semibold mb-2">Bank Transfer Details:</p>
                <p>Bank: First Bank Nigeria</p>
                <p>Account: 0123456789</p>
                <p>Account Name: Formation Exceptionelle Ltd</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 class="text-xl font-bold text-gray-900 mb-5">Order Summary</h2>
            <div class="space-y-3 mb-5">
              <div v-for="item in cartStore.items" :key="item.id" class="flex gap-3">
                <img :src="item.thumbnail" class="w-12 h-10 rounded-lg object-cover flex-shrink-0" />
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-medium text-gray-900 line-clamp-2">{{ item.title }}</p>
                  <p class="text-xs text-gray-500">{{ item.instructor }}</p>
                </div>
                <span class="text-sm font-bold text-gray-900 flex-shrink-0">${{ item.price }}</span>
              </div>
            </div>
            <div class="border-t border-gray-100 pt-4 space-y-2 mb-5">
              <div class="flex justify-between text-sm"><span class="text-gray-600">Subtotal</span><span>${{ cartStore.subtotal.toFixed(2) }}</span></div>
              <div class="flex justify-between text-sm"><span class="text-gray-600">Savings</span><span class="text-green-600">-${{ cartStore.savings.toFixed(2) }}</span></div>
              <div class="flex justify-between font-bold text-lg pt-1"><span>Total</span><span class="text-purple-700">${{ cartStore.total.toFixed(2) }}</span></div>
            </div>

            <button
              @click="processPayment"
              :disabled="processing"
              class="btn-primary w-full py-4 text-base"
            >
              <span v-if="processing" class="flex items-center gap-2">
                <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                Processing...
              </span>
              <span v-else class="flex items-center gap-2">
                <LockClosedIcon class="w-4 h-4" />
                Complete Purchase
              </span>
            </button>
            <p class="text-center text-xs text-gray-400 mt-3">
              <ShieldCheckIcon class="w-3.5 h-3.5 inline mr-1" />
              256-bit SSL encryption · 30-day money back guarantee
            </p>
          </div>
        </div>
      </div>

      <!-- Success State -->
      <div v-else class="text-center py-20 max-w-lg mx-auto">
        <div class="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircleIcon class="w-12 h-12 text-green-500" />
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-3">Payment Successful!</h2>
        <p class="text-gray-600 mb-2">You're now enrolled in all your courses.</p>
        <p class="text-gray-500 text-sm mb-8">A confirmation email has been sent to <strong>{{ authStore.user?.email }}</strong></p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <RouterLink to="/lms/my-learning" class="btn-primary px-8 py-4 text-base">Start Learning</RouterLink>
          <RouterLink to="/lms" class="btn-outline px-8 py-4">Browse More Courses</RouterLink>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { useLMSStore } from '@/stores/lms'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { CreditCardIcon, LockClosedIcon, ShieldCheckIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'
import { toast } from 'vue3-toastify'

const cartStore = useCartStore()
const authStore = useAuthStore()
const lmsStore = useLMSStore()
const router = useRouter()

const billing = ref({ firstName: authStore.user?.firstName, lastName: authStore.user?.lastName, email: authStore.user?.email, country: 'Nigeria' })
const card = ref({ number: '', expiry: '', cvv: '', name: authStore.fullName })
const selectedMethod = ref('card')
const processing = ref(false)
const orderComplete = ref(false)

const paymentMethods = [
  { id: 'card', label: 'Credit/Debit Card', icon: CreditCardIcon },
  { id: 'paypal', label: 'PayPal', icon: ShieldCheckIcon },
  { id: 'bank', label: 'Bank Transfer', icon: LockClosedIcon },
]

function formatCard() {
  card.value.number = card.value.number.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim()
}

async function processPayment() {
  processing.value = true
  await new Promise(r => setTimeout(r, 2000))

  // Enroll in all cart courses
  for (const item of cartStore.items) {
    await lmsStore.enrollCourse(authStore.user.id, item.id)
  }

  cartStore.clearCart()
  processing.value = false
  orderComplete.value = true
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    <div class="container-custom pt-28 pb-16">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
      <p class="text-gray-600 mb-10">{{ cartStore.itemCount }} course{{ cartStore.itemCount !== 1 ? 's' : '' }} in cart</p>

      <div v-if="cartStore.itemCount > 0" class="grid lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          <div
            v-for="item in cartStore.items"
            :key="item.id"
            class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex gap-4"
          >
            <img :src="item.thumbnail" class="w-28 h-20 object-cover rounded-xl flex-shrink-0" />
            <div class="flex-1 min-w-0">
              <h3 class="font-bold text-gray-900 text-sm mb-1 line-clamp-2">{{ item.title }}</h3>
              <p class="text-gray-500 text-xs mb-2">{{ item.instructor }}</p>
              <div class="flex gap-0.5 mb-2">
                <StarSolid v-for="i in 5" :key="i" class="w-3 h-3" :class="i <= Math.round(item.rating) ? 'text-gold-400' : 'text-gray-200'" />
                <span class="text-xs text-gray-500 ml-1">{{ item.rating }}</span>
              </div>
              <div class="flex flex-wrap gap-2 text-xs text-gray-400">
                <span>{{ item.duration }}</span>
              </div>
            </div>
            <div class="flex flex-col items-end justify-between flex-shrink-0">
              <div class="text-right">
                <div class="font-bold text-gray-900">${{ item.price }}</div>
                <div class="text-xs text-gray-400 line-through">${{ item.originalPrice }}</div>
              </div>
              <button
                @click="cartStore.removeFromCart(item.id)"
                class="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
              >Remove</button>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 class="text-xl font-bold text-gray-900 mb-5">Order Summary</h2>

            <div class="space-y-3 mb-5">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Original Price</span>
                <span class="text-gray-900">${{ (cartStore.subtotal + cartStore.savings).toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Discount</span>
                <span class="text-green-600">-${{ cartStore.savings.toFixed(2) }}</span>
              </div>
              <div class="border-t border-gray-100 pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span class="text-purple-700">${{ cartStore.total.toFixed(2) }}</span>
              </div>
            </div>

            <!-- Coupon -->
            <div class="flex gap-2 mb-5">
              <input v-model="coupon" type="text" placeholder="Coupon code" class="flex-1 input-field text-sm py-2.5" />
              <button class="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium transition-colors">Apply</button>
            </div>

            <RouterLink to="/lms/checkout" class="btn-primary w-full py-4 text-base text-center block">
              Checkout
            </RouterLink>

            <p class="text-center text-xs text-gray-400 mt-3">30-Day Money-Back Guarantee</p>

            <!-- Security badges -->
            <div class="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-gray-100">
              <div class="flex items-center gap-1 text-xs text-gray-400">
                <ShieldCheckIcon class="w-4 h-4" />Secure Payment
              </div>
              <div class="flex items-center gap-1 text-xs text-gray-400">
                <LockClosedIcon class="w-4 h-4" />SSL Encrypted
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty Cart -->
      <div v-else class="text-center py-20">
        <div class="w-24 h-24 rounded-3xl bg-purple-100 flex items-center justify-center mx-auto mb-5">
          <ShoppingCartIcon class="w-12 h-12 text-purple-400" />
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
        <p class="text-gray-600 mb-8">Discover our amazing courses and start learning today!</p>
        <RouterLink to="/lms" class="btn-primary text-base px-8 py-4">Browse Courses</RouterLink>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { StarIcon as StarSolid } from '@heroicons/vue/24/solid'
import { ShoppingCartIcon, ShieldCheckIcon, LockClosedIcon } from '@heroicons/vue/24/outline'

const cartStore = useCartStore()
const coupon = ref('')
</script>

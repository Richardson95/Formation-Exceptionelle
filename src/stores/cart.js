import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { toast } from 'vue3-toastify'

export const useCartStore = defineStore('cart', () => {
  const items = ref(JSON.parse(localStorage.getItem('fe_cart') || '[]'))
  const wishlist = ref(JSON.parse(localStorage.getItem('fe_wishlist') || '[]'))

  const itemCount = computed(() => items.value.length)
  const subtotal = computed(() => items.value.reduce((sum, item) => sum + item.price, 0))
  const savings = computed(() => items.value.reduce((sum, item) => sum + (item.originalPrice - item.price), 0))
  const total = computed(() => subtotal.value)

  function addToCart(course) {
    if (items.value.find(i => i.id === course.id)) {
      toast.info('This course is already in your cart')
      return
    }
    items.value.push({
      id: course.id,
      title: course.title,
      instructor: course.instructor.name,
      price: course.price,
      originalPrice: course.originalPrice,
      thumbnail: course.thumbnail,
      rating: course.rating,
      duration: course.duration,
    })
    save()
    toast.success('Course added to cart!')
  }

  function removeFromCart(courseId) {
    items.value = items.value.filter(i => i.id !== courseId)
    save()
    toast.info('Course removed from cart')
  }

  function clearCart() {
    items.value = []
    save()
  }

  function isInCart(courseId) {
    return items.value.some(i => i.id === courseId)
  }

  function toggleWishlist(course) {
    const idx = wishlist.value.findIndex(i => i.id === course.id)
    if (idx !== -1) {
      wishlist.value.splice(idx, 1)
      saveWishlist()
      toast.info('Removed from wishlist')
    } else {
      wishlist.value.push({
        id: course.id,
        title: course.title,
        instructor: course.instructor.name,
        price: course.price,
        originalPrice: course.originalPrice,
        thumbnail: course.thumbnail,
        rating: course.rating,
      })
      saveWishlist()
      toast.success('Added to wishlist!')
    }
  }

  function isInWishlist(courseId) {
    return wishlist.value.some(i => i.id === courseId)
  }

  function save() {
    localStorage.setItem('fe_cart', JSON.stringify(items.value))
  }

  function saveWishlist() {
    localStorage.setItem('fe_wishlist', JSON.stringify(wishlist.value))
  }

  return {
    items, wishlist, itemCount, subtotal, savings, total,
    addToCart, removeFromCart, clearCart, isInCart,
    toggleWishlist, isInWishlist
  }
})

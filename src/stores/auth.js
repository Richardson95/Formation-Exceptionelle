
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { toast } from 'vue3-toastify'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('fe_user') || 'null'))
  const token = ref(localStorage.getItem('fe_token') || null)
  const loading = ref(false)

  // Computed
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isInstructor = computed(() => user.value?.role === 'instructor' || user.value?.role === 'admin')
  const isParticipant = computed(() => user.value?.role === 'participant')
  const fullName = computed(() => user.value ? `${user.value.firstName} ${user.value.lastName}` : '')
  const initials = computed(() => {
    if (!user.value) return ''
    return `${user.value.firstName?.[0] || ''}${user.value.lastName?.[0] || ''}`.toUpperCase()
  })

  // Simulate API calls with localStorage persistence
  const mockUsers = ref(JSON.parse(localStorage.getItem('fe_users') || '[]'))

  // Seed admin user if not exists
  if (!mockUsers.value.find(u => u.email === 'admin@formationexceptionelle.com')) {
    mockUsers.value.push({
      id: 'admin-001',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@formationexceptionelle.com',
      password: 'Admin@2024!',
      role: 'admin',
      avatar: null,
      createdAt: new Date().toISOString(),
      bio: 'Platform Administrator',
      enrolledCourses: [],
      completedCourses: [],
    })
    localStorage.setItem('fe_users', JSON.stringify(mockUsers.value))
  }

  async function login(email, password) {
    loading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 800)) // Simulate API delay
      const foundUser = mockUsers.value.find(u => u.email === email && u.password === password)
      if (!foundUser) throw new Error('Invalid email or password')

      const { password: _, ...safeUser } = foundUser
      user.value = safeUser
      token.value = `fe-token-${foundUser.id}-${Date.now()}`

      localStorage.setItem('fe_user', JSON.stringify(safeUser))
      localStorage.setItem('fe_token', token.value)

      toast.success(`Welcome back, ${safeUser.firstName}!`)
      return safeUser
    } catch (err) {
      toast.error(err.message)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function register(data) {
    loading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 900))

      if (mockUsers.value.find(u => u.email === data.email)) {
        throw new Error('An account with this email already exists')
      }

      const newUser = {
        id: `user-${Date.now()}`,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        role: data.role || 'participant',
        avatar: null,
        createdAt: new Date().toISOString(),
        bio: '',
        enrolledCourses: [],
        completedCourses: [],
        profession: data.profession || '',
        phone: data.phone || '',
      }

      mockUsers.value.push(newUser)
      localStorage.setItem('fe_users', JSON.stringify(mockUsers.value))

      const { password: _, ...safeUser } = newUser
      user.value = safeUser
      token.value = `fe-token-${newUser.id}-${Date.now()}`

      localStorage.setItem('fe_user', JSON.stringify(safeUser))
      localStorage.setItem('fe_token', token.value)

      toast.success(`Welcome to Formation Exceptionelle, ${safeUser.firstName}!`)
      return safeUser
    } catch (err) {
      toast.error(err.message)
      throw err
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('fe_user')
    localStorage.removeItem('fe_token')
    toast.info('You have been signed out')
  }

  async function updateProfile(data) {
    loading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 600))
      const updated = { ...user.value, ...data }
      user.value = updated
      localStorage.setItem('fe_user', JSON.stringify(updated))

      // Update in mock users
      const idx = mockUsers.value.findIndex(u => u.id === updated.id)
      if (idx !== -1) {
        mockUsers.value[idx] = { ...mockUsers.value[idx], ...data }
        localStorage.setItem('fe_users', JSON.stringify(mockUsers.value))
      }

      toast.success('Profile updated successfully')
      return updated
    } catch (err) {
      toast.error('Failed to update profile')
      throw err
    } finally {
      loading.value = false
    }
  }

  async function becomeInstructor(applicationData) {
    loading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const updated = { ...user.value, role: 'instructor', instructorData: applicationData }
      user.value = updated
      localStorage.setItem('fe_user', JSON.stringify(updated))

      const idx = mockUsers.value.findIndex(u => u.id === updated.id)
      if (idx !== -1) {
        mockUsers.value[idx] = { ...mockUsers.value[idx], role: 'instructor', instructorData: applicationData }
        localStorage.setItem('fe_users', JSON.stringify(mockUsers.value))
      }

      toast.success('Congratulations! You are now an instructor.')
      return updated
    } catch (err) {
      toast.error('Application failed. Please try again.')
      throw err
    } finally {
      loading.value = false
    }
  }

  function getAllUsers() {
    return mockUsers.value.map(({ password: _, ...u }) => u)
  }

  return {
    user, token, loading,
    isAuthenticated, isAdmin, isInstructor, isParticipant, fullName, initials,
    login, register, logout, updateProfile, becomeInstructor, getAllUsers
  }
})

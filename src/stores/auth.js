
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { toast } from 'vue3-toastify'
import { API_ENABLED, post, get, patch, api } from '@/services/api'

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

  // Simulate API calls with localStorage persistence (no-backend mode only).
  const mockUsers = ref(API_ENABLED ? [] : JSON.parse(localStorage.getItem('fe_users') || '[]'))

  // Seed admin user if not exists. Never in API mode — real accounts live on the
  // server, and this would plant a fake one (with its password) in the browser.
  if (!API_ENABLED && !mockUsers.value.find(u => u.email === 'admin@formationexceptionelle.com')) {
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

  function persistSession(safeUser, jwt) {
    user.value = safeUser
    token.value = jwt
    localStorage.setItem('fe_user', JSON.stringify(safeUser))
    localStorage.setItem('fe_token', jwt)
  }

  async function login(email, password) {
    loading.value = true
    try {
      if (API_ENABLED) {
        const { user: safeUser, token: jwt } = await post('/auth/login', { email, password })
        persistSession(safeUser, jwt)
        toast.success(`Welcome back, ${safeUser.firstName}!`)
        return safeUser
      }

      await new Promise(resolve => setTimeout(resolve, 800)) // Simulate API delay
      const foundUser = mockUsers.value.find(u => u.email === email && u.password === password)
      if (!foundUser) throw new Error('Invalid email or password')

      const { password: _, ...safeUser } = foundUser
      persistSession(safeUser, `fe-token-${foundUser.id}-${Date.now()}`)

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
      if (API_ENABLED) {
        const { user: safeUser, token: jwt } = await post('/auth/register', {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          phone: data.phone || '',
          profession: data.profession || '',
        })
        persistSession(safeUser, jwt)
        toast.success(`Welcome to Formation Exceptionelle, ${safeUser.firstName}!`)
        return safeUser
      }

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

  // The API client clears storage when the backend rejects our token; mirror that
  // into the store so the header and route guards agree with it.
  window.addEventListener('fe:session-expired', () => {
    user.value = null
    token.value = null
  })

  // Re-sync the signed-in user from the server so role/status changes made
  // elsewhere (e.g. an admin approving an instructor application) show up.
  async function refreshUser() {
    if (!API_ENABLED || !token.value) return
    try {
      const { user: fresh } = await get('/auth/me')
      user.value = fresh
      localStorage.setItem('fe_user', JSON.stringify(fresh))
      return fresh
    } catch { /* stale/expired token handled by the request interceptor */ }
  }

  // Refresh once on load if there's an existing session.
  if (API_ENABLED && token.value) refreshUser()

  async function updateProfile(data) {
    loading.value = true
    try {
      if (API_ENABLED) {
        const { user: updated } = await patch('/auth/me', data)
        user.value = updated
        localStorage.setItem('fe_user', JSON.stringify(updated))
        toast.success('Profile updated successfully')
        return updated
      }

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

  // Submit an application to become an instructor. In API mode this creates a
  // PENDING application (with an optional resume file) that an admin reviews —
  // approval promotes the account. In mock mode we auto-promote for the demo.
  async function becomeInstructor(applicationData) {
    loading.value = true
    try {
      if (API_ENABLED) {
        const { resumeFile, ...fields } = applicationData
        const fd = new FormData()
        Object.entries(fields).forEach(([k, v]) => { if (v != null) fd.append(k, v) })
        if (resumeFile) fd.append('resume', resumeFile)
        const application = (await api.post('/instructor-applications', fd, { headers: { 'Content-Type': undefined } })).data
        toast.success('Application submitted! Our team will review it shortly.')
        return application
      }

      const { resumeFile, ...fields } = applicationData
      await new Promise(resolve => setTimeout(resolve, 1000))
      const updated = { ...user.value, role: 'instructor', instructorData: fields }
      user.value = updated
      localStorage.setItem('fe_user', JSON.stringify(updated))

      const idx = mockUsers.value.findIndex(u => u.id === updated.id)
      if (idx !== -1) {
        mockUsers.value[idx] = { ...mockUsers.value[idx], role: 'instructor', instructorData: fields }
        localStorage.setItem('fe_users', JSON.stringify(mockUsers.value))
      }

      toast.success('Congratulations! You are now an instructor.')
      return updated
    } catch (err) {
      toast.error(err.response?.data?.error?.message || err.message || 'Application failed. Please try again.')
      throw err
    } finally {
      loading.value = false
    }
  }

  function getAllUsers() {
    return mockUsers.value.map(({ password: _, ...u }) => u)
  }

  // Password reset (mock). A real backend emails a link; here we generate a
  // token, store it locally, and hand it back so the demo can show the link.
  const resetTokens = ref(JSON.parse(localStorage.getItem('fe_reset_tokens') || '{}'))

  async function forgotPassword(email) {
    loading.value = true
    try {
      if (API_ENABLED) {
        await post('/auth/forgot-password', { email })
        toast.success('If an account exists for that email, a reset link has been sent.')
        // Real backend emails the link; no token is returned to the client.
        return { token: null }
      }

      await new Promise(resolve => setTimeout(resolve, 800))
      const foundUser = mockUsers.value.find(u => u.email === email)

      // Always behave the same way regardless of whether the email exists,
      // so we don't leak which emails are registered.
      let token = null
      if (foundUser) {
        token = `reset-${foundUser.id}-${Math.random().toString(36).slice(2, 10)}`
        resetTokens.value[token] = {
          email,
          expiresAt: Date.now() + 1000 * 60 * 30, // 30 minutes
        }
        localStorage.setItem('fe_reset_tokens', JSON.stringify(resetTokens.value))
      }

      toast.success('If an account exists for that email, a reset link has been sent.')
      // token is returned only so the frontend-only demo can display the link.
      return { token }
    } catch (err) {
      toast.error('Something went wrong. Please try again.')
      throw err
    } finally {
      loading.value = false
    }
  }

  // Async so it works both against the backend and the local mock. Callers
  // should `await` it (see ResetPasswordView).
  async function verifyResetToken(token) {
    if (API_ENABLED) {
      try {
        return await get('/auth/verify-reset-token', { params: { token } })
      } catch {
        return { valid: false, reason: 'invalid' }
      }
    }
    const entry = resetTokens.value[token]
    if (!entry) return { valid: false, reason: 'invalid' }
    if (Date.now() > entry.expiresAt) return { valid: false, reason: 'expired' }
    return { valid: true, email: entry.email }
  }

  async function resetPassword(token, newPassword) {
    loading.value = true
    try {
      if (API_ENABLED) {
        await post('/auth/reset-password', { token, password: newPassword })
        toast.success('Password reset successfully. You can now sign in.')
        return true
      }

      await new Promise(resolve => setTimeout(resolve, 800))
      const check = await verifyResetToken(token)
      if (!check.valid) {
        throw new Error(check.reason === 'expired'
          ? 'This reset link has expired. Please request a new one.'
          : 'This reset link is invalid. Please request a new one.')
      }

      const idx = mockUsers.value.findIndex(u => u.email === check.email)
      if (idx === -1) throw new Error('Account not found.')

      mockUsers.value[idx] = { ...mockUsers.value[idx], password: newPassword }
      localStorage.setItem('fe_users', JSON.stringify(mockUsers.value))

      // Consume the token so it can't be reused.
      delete resetTokens.value[token]
      localStorage.setItem('fe_reset_tokens', JSON.stringify(resetTokens.value))

      toast.success('Password reset successfully. You can now sign in.')
      return true
    } catch (err) {
      toast.error(err.message)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    user, token, loading,
    isAuthenticated, isAdmin, isInstructor, isParticipant, fullName, initials,
    login, register, logout, updateProfile, becomeInstructor, getAllUsers,
    forgotPassword, verifyResetToken, resetPassword, refreshUser
  }
})

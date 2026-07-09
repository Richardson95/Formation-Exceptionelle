import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth'
import { useLMSStore } from './lms'
import { useJobsStore } from './jobs'
import { API_ENABLED, get } from '@/services/api'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const useAdminStore = defineStore('admin', () => {
  const sidebarOpen = ref(true)
  const activeSection = ref('dashboard')

  // In API mode, the dashboard figures come from the backend (server-authoritative).
  const apiStats = ref(null)
  async function fetchStats() {
    if (!API_ENABLED) return
    try {
      const [s, analytics] = await Promise.all([
        get('/admin/stats'),
        get('/admin/analytics').catch(() => ({})),
      ])
      apiStats.value = { ...s, ...analytics }
    } catch { /* leave previous */ }
  }
  if (API_ENABLED) fetchStats()

  // Fallback for mock mode (and for the moment before /admin/stats resolves).
  // Every field is counted from records the app actually holds; a metric with no
  // real source reports zero or an empty list rather than a plausible-looking
  // number. An admin must never be shown a figure that was invented.
  const localStats = computed(() => {
    const authStore = useAuthStore()
    const lmsStore = useLMSStore()
    const jobsStore = useJobsStore()

    const users = authStore.getAllUsers()
    const paidStudents = new Set(
      lmsStore.enrollments
        .filter((e) => (lmsStore.getCourseById(e.courseId)?.price || 0) > 0)
        .map((e) => e.userId)
    )

    const rated = lmsStore.courses.filter((c) => c.reviewCount > 0)
    const avgCourseRating = rated.length
      ? Math.round((rated.reduce((s, c) => s + c.rating, 0) / rated.length) * 10) / 10
      : 0

    return {
      totalUsers: users.length,
      totalInstructors: users.filter((u) => u.role === 'instructor').length,
      totalParticipants: users.filter((u) => u.role === 'participant').length,
      totalCourses: lmsStore.totalCourses,
      totalEnrollments: lmsStore.totalEnrollments,
      totalRevenue: lmsStore.totalRevenue,
      paidStudents: paidStudents.size,
      totalJobs: jobsStore.totalJobs,
      totalApplications: jobsStore.totalApplications,
      internships: jobsStore.internships.length,
      pendingCourses: lmsStore.pendingCourses.length,
      pendingJobs: jobsStore.pendingJobs.length,
      pendingApprovals: lmsStore.pendingCourses.length + jobsStore.pendingJobs.length,
      conversionRate: users.length
        ? Math.round((paidStudents.size / users.length) * 1000) / 10
        : 0,
      avgCourseRating,
      // No local order history to derive these from, so they stay empty.
      revenueByMonth: MONTHS.map((month) => ({ month, revenue: 0 })),
      enrollmentsByMonth: MONTHS.map((month) => ({ month, count: 0 })),
      topCourses: [...lmsStore.courses].sort((a, b) => b.enrolledCount - a.enrolledCount).slice(0, 5),
      recentActivity: [],
    }
  })

  const stats = computed(() => (API_ENABLED && apiStats.value ? apiStats.value : localStats.value))

  return {
    sidebarOpen, activeSection, stats, fetchStats,
  }
})

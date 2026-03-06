import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAuthStore } from './auth'
import { useLMSStore } from './lms'
import { useJobsStore } from './jobs'

export const useAdminStore = defineStore('admin', () => {
  const sidebarOpen = ref(true)
  const activeSection = ref('dashboard')

  const stats = computed(() => {
    const authStore = useAuthStore()
    const lmsStore = useLMSStore()
    const jobsStore = useJobsStore()

    const users = authStore.getAllUsers()
    const instructors = users.filter(u => u.role === 'instructor')
    const participants = users.filter(u => u.role === 'participant')
    const paidStudents = lmsStore.enrollments.filter(e => {
      const course = lmsStore.getCourseById(e.courseId)
      return course && course.price > 0
    })

    const revenueByMonth = generateMonthlyRevenue()
    const enrollmentsByMonth = generateMonthlyEnrollments()

    return {
      totalUsers: users.length,
      totalInstructors: instructors.length,
      totalParticipants: participants.length,
      totalCourses: lmsStore.totalCourses,
      totalEnrollments: lmsStore.totalEnrollments,
      totalRevenue: lmsStore.totalRevenue,
      paidStudents: paidStudents.length,
      totalJobs: jobsStore.totalJobs,
      totalApplications: jobsStore.totalApplications,
      internships: jobsStore.internships.length,
      pageViews: 48239,
      weeklyVisitors: 12847,
      conversionRate: 3.2,
      avgCourseRating: 4.7,
      revenueByMonth,
      enrollmentsByMonth,
      topCourses: lmsStore.courses
        .sort((a, b) => b.enrolledCount - a.enrolledCount)
        .slice(0, 5),
      recentActivity: generateRecentActivity(),
    }
  })

  function generateMonthlyRevenue() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return months.map((month, i) => ({
      month,
      revenue: Math.floor(Math.random() * 50000) + 20000 + (i * 3000),
    }))
  }

  function generateMonthlyEnrollments() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return months.map((month, i) => ({
      month,
      count: Math.floor(Math.random() * 500) + 200 + (i * 30),
    }))
  }

  function generateRecentActivity() {
    return [
      { id: 1, type: 'enrollment', message: 'New student enrolled in Web Development Bootcamp', time: '2 minutes ago', icon: 'book' },
      { id: 2, type: 'job', message: 'New job posted: Senior Frontend Developer at TechNova', time: '15 minutes ago', icon: 'briefcase' },
      { id: 3, type: 'application', message: 'Application received for Data Analyst Intern position', time: '32 minutes ago', icon: 'document' },
      { id: 4, type: 'payment', message: 'Payment of $89.99 received for Python course', time: '1 hour ago', icon: 'currency' },
      { id: 5, type: 'user', message: 'New instructor registered: Dr. Amara Nwosu', time: '2 hours ago', icon: 'user' },
      { id: 6, type: 'certificate', message: 'Certificate generated for Leadership Excellence course', time: '3 hours ago', icon: 'badge' },
      { id: 7, type: 'review', message: 'New 5-star review on Digital Marketing Masterclass', time: '4 hours ago', icon: 'star' },
    ]
  }

  return {
    sidebarOpen, activeSection, stats,
  }
})

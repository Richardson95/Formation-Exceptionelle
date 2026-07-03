import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      // Wait for the (possibly lazy-loaded) target page to render its section
      // before scrolling, otherwise the element isn't in the DOM yet.
      return new Promise((resolve) => {
        setTimeout(() => resolve({ el: to.hash, behavior: 'smooth' }), 300)
      })
    }
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    // Landing Page
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { title: 'Formation Exceptionelle | Your Partner In Career Development', heroHeader: true }
    },

    // Auth
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: { title: 'Sign In | Formation Exceptionelle', guest: true }
    },
    {
      path: '/auth/register',
      name: 'register',
      component: () => import('@/views/auth/RegisterView.vue'),
      meta: { title: 'Create Account | Formation Exceptionelle', guest: true }
    },
    {
      path: '/auth/forgot-password',
      name: 'forgot-password',
      component: () => import('@/views/auth/ForgotPasswordView.vue'),
      meta: { title: 'Forgot Password | Formation Exceptionelle', guest: true }
    },
    {
      path: '/auth/reset-password',
      name: 'reset-password',
      component: () => import('@/views/auth/ResetPasswordView.vue'),
      meta: { title: 'Reset Password | Formation Exceptionelle', guest: true }
    },

    // LMS
    {
      path: '/lms',
      name: 'lms',
      component: () => import('@/views/lms/LMSView.vue'),
      meta: { title: 'Courses | Formation Exceptionelle', requiresAuth: true, heroHeader: true }
    },
    {
      path: '/lms/course/:id',
      name: 'course-detail',
      component: () => import('@/views/lms/CourseDetailView.vue'),
      meta: { title: 'Course Details | Formation Exceptionelle', requiresAuth: true, heroHeader: true }
    },
    {
      path: '/lms/learn/:id',
      name: 'course-learn',
      component: () => import('@/views/lms/CourseLearnView.vue'),
      meta: { title: 'Learning | Formation Exceptionelle', requiresAuth: true }
    },
    {
      path: '/lms/cart',
      name: 'cart',
      component: () => import('@/views/lms/CartView.vue'),
      meta: { title: 'Cart | Formation Exceptionelle', requiresAuth: true }
    },
    {
      path: '/lms/checkout',
      name: 'checkout',
      component: () => import('@/views/lms/CheckoutView.vue'),
      meta: { title: 'Checkout | Formation Exceptionelle', requiresAuth: true }
    },
    {
      path: '/lms/my-learning',
      name: 'my-learning',
      component: () => import('@/views/lms/StudentDashboardView.vue'),
      meta: { title: 'My Learning | Formation Exceptionelle', requiresAuth: true }
    },
    {
      path: '/lms/instructor',
      name: 'instructor-dashboard',
      component: () => import('@/views/lms/InstructorDashboardView.vue'),
      meta: { title: 'Instructor Dashboard | Formation Exceptionelle', requiresAuth: true, requiresRole: 'instructor' }
    },
    {
      path: '/lms/instructor/create-course',
      name: 'create-course',
      component: () => import('@/views/lms/CreateCourseView.vue'),
      meta: { title: 'Create Course | Formation Exceptionelle', requiresAuth: true, requiresRole: 'instructor' }
    },
    {
      path: '/lms/instructor/edit-course/:id',
      name: 'edit-course',
      component: () => import('@/views/lms/CreateCourseView.vue'),
      meta: { title: 'Edit Course | Formation Exceptionelle', requiresAuth: true, requiresRole: 'instructor' }
    },

    // Jobs
    {
      path: '/jobs',
      name: 'jobs',
      component: () => import('@/views/jobs/JobsView.vue'),
      meta: { title: 'Jobs & Internships | Formation Exceptionelle', requiresAuth: true, heroHeader: true }
    },
    {
      path: '/jobs/:id',
      name: 'job-detail',
      component: () => import('@/views/jobs/JobDetailView.vue'),
      meta: { title: 'Job Details | Formation Exceptionelle', requiresAuth: true }
    },
    {
      path: '/jobs/apply/:id',
      name: 'apply-job',
      component: () => import('@/views/jobs/ApplyJobView.vue'),
      meta: { title: 'Apply for Job | Formation Exceptionelle', requiresAuth: true }
    },
    {
      path: '/jobs/my-applications',
      name: 'my-applications',
      component: () => import('@/views/jobs/MyApplicationsView.vue'),
      meta: { title: 'My Applications | Formation Exceptionelle', requiresAuth: true }
    },

    // Become Instructor
    {
      path: '/become-instructor',
      name: 'become-instructor',
      component: () => import('@/views/BecomeInstructorView.vue'),
      meta: { title: 'Become an Instructor | Formation Exceptionelle', requiresAuth: true, heroHeader: true }
    },

    // Admin Panel
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/AdminDashboardView.vue'),
      meta: { title: 'Admin Dashboard | Formation Exceptionelle', requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: () => import('@/views/admin/AdminUsersView.vue'),
      meta: { title: 'User Management | Admin', requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/instructor-applications',
      name: 'admin-instructor-applications',
      component: () => import('@/views/admin/AdminInstructorApplicationsView.vue'),
      meta: { title: 'Instructor Applications | Admin', requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/courses',
      name: 'admin-courses',
      component: () => import('@/views/admin/AdminCoursesView.vue'),
      meta: { title: 'Course Management | Admin', requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/jobs',
      name: 'admin-jobs',
      component: () => import('@/views/admin/AdminJobsView.vue'),
      meta: { title: 'Job Management | Admin', requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/jobs/new',
      name: 'admin-post-job',
      component: () => import('@/views/admin/AdminPostJobView.vue'),
      meta: { title: 'Post a Job | Admin', requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/jobs/edit/:id',
      name: 'admin-edit-job',
      component: () => import('@/views/admin/AdminPostJobView.vue'),
      meta: { title: 'Edit Job | Admin', requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/analytics',
      name: 'admin-analytics',
      component: () => import('@/views/admin/AdminAnalyticsView.vue'),
      meta: { title: 'Analytics | Admin', requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/payments',
      name: 'admin-payments',
      component: () => import('@/views/admin/AdminPaymentsView.vue'),
      meta: { title: 'Payments | Admin', requiresAuth: true, requiresAdmin: true }
    },

    // Legal
    {
      path: '/terms',
      name: 'terms',
      component: () => import('@/views/legal/LegalView.vue'),
      meta: { title: 'Terms of Service | Formation Exceptionelle', doc: 'terms', heroHeader: true }
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('@/views/legal/LegalView.vue'),
      meta: { title: 'Privacy Policy | Formation Exceptionelle', doc: 'privacy', heroHeader: true }
    },
    {
      path: '/cookies',
      name: 'cookies',
      component: () => import('@/views/legal/LegalView.vue'),
      meta: { title: 'Cookie Policy | Formation Exceptionelle', doc: 'cookies', heroHeader: true }
    },

    // 404
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { title: '404 | Formation Exceptionelle' }
    }
  ]
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  // Update page title
  document.title = to.meta.title || 'Formation Exceptionelle'

  const authStore = useAuthStore()

  // Routes that require auth
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({
      name: 'login',
      query: { redirect: to.fullPath, reason: to.meta.requiresRole || 'auth' }
    })
  }

  // Guest-only routes (login/register)
  if (to.meta.guest && authStore.isAuthenticated) {
    return next({ name: 'home' })
  }

  // Admin-only routes
  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    return next({ name: 'home' })
  }

  // Instructor-only routes
  if (to.meta.requiresRole === 'instructor' && !authStore.isInstructor && !authStore.isAdmin) {
    return next({ name: 'become-instructor' })
  }

  next()
})

export default router

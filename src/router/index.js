import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    // Landing Page
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { title: 'Formation Exceptionelle | Your Partner In Career Development' }
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

    // LMS
    {
      path: '/lms',
      name: 'lms',
      component: () => import('@/views/lms/LMSView.vue'),
      meta: { title: 'Courses | Formation Exceptionelle', requiresAuth: true }
    },
    {
      path: '/lms/course/:id',
      name: 'course-detail',
      component: () => import('@/views/lms/CourseDetailView.vue'),
      meta: { title: 'Course Details | Formation Exceptionelle', requiresAuth: true }
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
      meta: { title: 'Jobs & Internships | Formation Exceptionelle', requiresAuth: true }
    },
    {
      path: '/jobs/:id',
      name: 'job-detail',
      component: () => import('@/views/jobs/JobDetailView.vue'),
      meta: { title: 'Job Details | Formation Exceptionelle', requiresAuth: true }
    },
    {
      path: '/jobs/post',
      name: 'post-job',
      component: () => import('@/views/jobs/PostJobView.vue'),
      meta: { title: 'Post a Job | Formation Exceptionelle', requiresAuth: true }
    },
    {
      path: '/jobs/apply/:id',
      name: 'apply-job',
      component: () => import('@/views/jobs/ApplyJobView.vue'),
      meta: { title: 'Apply for Job | Formation Exceptionelle', requiresAuth: true }
    },

    // Become Instructor
    {
      path: '/become-instructor',
      name: 'become-instructor',
      component: () => import('@/views/BecomeInstructorView.vue'),
      meta: { title: 'Become an Instructor | Formation Exceptionelle', requiresAuth: true }
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

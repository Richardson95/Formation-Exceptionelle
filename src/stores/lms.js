import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { toast } from 'vue3-toastify'

// Mock course data
const MOCK_COURSES = [
  {
    id: 'c001',
    title: 'Complete Web Development Bootcamp 2024',
    subtitle: 'Become a Full-Stack Developer with HTML, CSS, JavaScript, Node, React, MongoDB & More!',
    description: 'Join over 500,000 students who have already enrolled in this comprehensive web development course. This course covers everything you need to become a full-stack web developer, including front-end technologies like HTML5, CSS3, and JavaScript, as well as back-end technologies like Node.js, Express.js, and MongoDB.',
    instructor: { id: 'inst-001', name: 'Dr. Angela Yu', avatar: null, rating: 4.9, students: 125000 },
    category: 'Web Development',
    subcategory: 'Full Stack',
    level: 'Beginner',
    language: 'English',
    price: 89.99,
    originalPrice: 199.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
    previewVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    rating: 4.8,
    reviewCount: 28450,
    enrolledCount: 125000,
    duration: '65 hours',
    lectureCount: 374,
    lastUpdated: '2024-01-15',
    certificate: true,
    tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
    requirements: ['No programming experience needed', 'A computer with internet access', 'No paid software required'],
    objectives: [
      'Build 16 web development projects for your portfolio',
      'Learn the latest technologies including Javascript ES6, Bootstrap 4, React, Node and more',
      'After the course you will be able to build any website you want',
      'Build fully-fledged websites and web apps for your startup or business'
    ],
    sections: [
      {
        id: 's1', title: 'Introduction to Web Development', duration: '2h 30m',
        lectures: [
          { id: 'l1', title: 'Course Introduction & How to Get the Most Out of This Course', duration: '8:32', type: 'video', preview: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
          { id: 'l2', title: 'What is HTML?', duration: '12:45', type: 'video', preview: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
          { id: 'l3', title: 'HTML Tags and Structure', duration: '18:20', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
          { id: 'l4', title: 'Introduction Quiz', duration: '10 questions', type: 'quiz', preview: false }
        ]
      },
      {
        id: 's2', title: 'CSS - Styling Your Websites', duration: '8h 15m',
        lectures: [
          { id: 'l5', title: 'Introduction to CSS', duration: '22:10', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
          { id: 'l6', title: 'CSS Selectors', duration: '35:48', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
          { id: 'l7', title: 'Flexbox Layout', duration: '42:33', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
          { id: 'l8', title: 'CSS Grid', duration: '38:22', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
          { id: 'l9', title: 'CSS Quiz', duration: '15 questions', type: 'quiz', preview: false }
        ]
      },
      {
        id: 's3', title: 'JavaScript - The Language of the Web', duration: '15h 40m',
        lectures: [
          { id: 'l10', title: 'Variables and Data Types', duration: '28:15', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4' },
          { id: 'l11', title: 'Functions and Scope', duration: '45:30', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
          { id: 'l12', title: 'Arrays and Objects', duration: '52:18', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4' },
          { id: 'l13', title: 'DOM Manipulation Assignment', duration: 'Assignment', type: 'assignment', preview: false }
        ]
      }
    ],
    isPaid: true,
    featured: true,
  },
  {
    id: 'c002',
    title: 'Python for Data Science and Machine Learning',
    subtitle: 'Use Python for Data Science and Machine Learning. NumPy, Pandas, Matplotlib, Seaborn, Scikit-Learn, TensorFlow',
    description: 'Learn how to use Python for Data Science and Machine Learning! This comprehensive course covers everything from NumPy and Pandas to advanced machine learning algorithms.',
    instructor: { id: 'inst-002', name: 'Prof. Jose Portilla', avatar: null, rating: 4.7, students: 89000 },
    category: 'Data Science',
    subcategory: 'Machine Learning',
    level: 'Intermediate',
    language: 'English',
    price: 79.99,
    originalPrice: 184.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&q=80',
    previewVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    rating: 4.7,
    reviewCount: 19820,
    enrolledCount: 89000,
    duration: '25 hours',
    lectureCount: 165,
    lastUpdated: '2024-02-10',
    certificate: true,
    tags: ['Python', 'Data Science', 'Machine Learning', 'NumPy', 'Pandas', 'TensorFlow'],
    requirements: ['Basic Python knowledge', 'High school math', 'Passion for learning'],
    objectives: [
      'Use Python for Data Science and Machine Learning',
      'Use Spark for Big Data Analysis',
      'Implement Machine Learning Algorithms',
      'Learn to use NumPy for Numerical Data'
    ],
    sections: [
      {
        id: 's1', title: 'Python Crash Course', duration: '4h 20m',
        lectures: [
          { id: 'l1', title: 'Python Basics Overview', duration: '15:20', type: 'video', preview: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
          { id: 'l2', title: 'Python Objects and Data Structures', duration: '42:15', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
        ]
      },
      {
        id: 's2', title: 'NumPy', duration: '3h 10m',
        lectures: [
          { id: 'l3', title: 'Introduction to NumPy', duration: '28:40', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
          { id: 'l4', title: 'NumPy Arrays', duration: '35:22', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
        ]
      }
    ],
    isPaid: true,
    featured: true,
  },
  {
    id: 'c003',
    title: 'Digital Marketing Masterclass',
    subtitle: 'Complete Guide to Marketing, Social Media, SEO, Email Marketing, Content Marketing & More!',
    description: 'Master Digital Marketing Strategy, Social Media Marketing, SEO, YouTube, Email, Facebook Marketing, Analytics & More!',
    instructor: { id: 'inst-003', name: 'Sarah Johnson', avatar: null, rating: 4.8, students: 67000 },
    category: 'Marketing',
    subcategory: 'Digital Marketing',
    level: 'All Levels',
    language: 'English',
    price: 0,
    originalPrice: 0,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    previewVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    rating: 4.8,
    reviewCount: 12340,
    enrolledCount: 67000,
    duration: '23.5 hours',
    lectureCount: 136,
    lastUpdated: '2024-01-28',
    certificate: true,
    tags: ['Digital Marketing', 'SEO', 'Social Media', 'Content Marketing', 'Email Marketing'],
    requirements: ['No experience needed', 'Internet access', 'Willingness to learn'],
    objectives: [
      'Develop a powerful marketing strategy',
      'Market on Facebook, YouTube, and Instagram',
      'Master SEO techniques',
      'Build email marketing campaigns'
    ],
    sections: [
      {
        id: 's1', title: 'Introduction to Digital Marketing', duration: '2h 30m',
        lectures: [
          { id: 'l1', title: 'What is Digital Marketing?', duration: '10:15', type: 'video', preview: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
        ]
      }
    ],
    isPaid: false,
    featured: false,
  },
  {
    id: 'c004',
    title: 'Leadership & Management Excellence',
    subtitle: 'Develop essential leadership skills, manage teams effectively, and drive organizational success',
    description: 'This comprehensive leadership program is designed for aspiring and current managers who want to elevate their leadership capabilities. Learn proven strategies used by top executives worldwide.',
    instructor: { id: 'inst-004', name: 'Dr. Emmanuel Okafor', avatar: null, rating: 4.9, students: 45000 },
    category: 'Business',
    subcategory: 'Leadership',
    level: 'Intermediate',
    language: 'English',
    price: 69.99,
    originalPrice: 149.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
    previewVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    rating: 4.9,
    reviewCount: 8920,
    enrolledCount: 45000,
    duration: '18 hours',
    lectureCount: 98,
    lastUpdated: '2024-02-20',
    certificate: true,
    tags: ['Leadership', 'Management', 'Team Building', 'Strategy', 'Communication'],
    requirements: ['Some work experience helpful', 'Desire to grow as a leader'],
    objectives: [
      'Master proven leadership frameworks',
      'Build high-performing teams',
      'Navigate organizational change effectively',
      'Develop emotional intelligence'
    ],
    sections: [
      {
        id: 's1', title: 'Foundations of Leadership', duration: '4h 20m',
        lectures: [
          { id: 'l1', title: 'What Makes a Great Leader?', duration: '18:30', type: 'video', preview: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
          { id: 'l2', title: 'Leadership Styles & Situational Leadership', duration: '35:45', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
        ]
      }
    ],
    isPaid: true,
    featured: true,
  },
  {
    id: 'c005',
    title: 'UI/UX Design Masterclass with Figma',
    subtitle: 'Design stunning user interfaces and experiences using Figma from beginner to advanced',
    description: 'Learn UI/UX design from scratch. This course covers user research, wireframing, prototyping, and creating stunning designs in Figma that will wow employers and clients.',
    instructor: { id: 'inst-005', name: 'Marie Dupont', avatar: null, rating: 4.8, students: 38000 },
    category: 'Design',
    subcategory: 'UI/UX',
    level: 'Beginner',
    language: 'English',
    price: 74.99,
    originalPrice: 169.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
    previewVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    rating: 4.8,
    reviewCount: 7650,
    enrolledCount: 38000,
    duration: '20 hours',
    lectureCount: 112,
    lastUpdated: '2024-01-30',
    certificate: true,
    tags: ['UI Design', 'UX Design', 'Figma', 'Prototyping', 'User Research'],
    requirements: ['No design experience needed', 'Figma (free tool)', 'Creative mindset'],
    objectives: [
      'Design professional UI/UX from scratch',
      'Master Figma design tool',
      'Create user research and personas',
      'Build impressive portfolio projects'
    ],
    sections: [
      {
        id: 's1', title: 'Getting Started with UI/UX', duration: '3h 10m',
        lectures: [
          { id: 'l1', title: 'Introduction to UI/UX Design', duration: '14:22', type: 'video', preview: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
          { id: 'l2', title: 'Setting Up Figma', duration: '22:15', type: 'video', preview: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
        ]
      }
    ],
    isPaid: true,
    featured: false,
  },
  {
    id: 'c006',
    title: 'Financial Literacy & Investment Fundamentals',
    subtitle: 'Master personal finance, investing, stock markets, and building wealth for the long term',
    description: 'Take control of your financial future. Learn everything from budgeting and saving to investing in stocks, bonds, and real estate. Build a solid financial foundation.',
    instructor: { id: 'inst-006', name: 'Prof. Adebayo Williams', avatar: null, rating: 4.7, students: 52000 },
    category: 'Finance',
    subcategory: 'Personal Finance',
    level: 'Beginner',
    language: 'English',
    price: 59.99,
    originalPrice: 129.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80',
    previewVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    rating: 4.7,
    reviewCount: 9870,
    enrolledCount: 52000,
    duration: '14 hours',
    lectureCount: 82,
    lastUpdated: '2024-02-05',
    certificate: true,
    tags: ['Finance', 'Investing', 'Stock Market', 'Personal Finance', 'Wealth Building'],
    requirements: ['No finance background needed', 'Basic math skills', 'Desire to build wealth'],
    objectives: [
      'Understand personal finance fundamentals',
      'Build an emergency fund and investment portfolio',
      'Navigate stock markets and bonds',
      'Plan for retirement effectively'
    ],
    sections: [
      {
        id: 's1', title: 'Personal Finance Basics', duration: '2h 45m',
        lectures: [
          { id: 'l1', title: 'Understanding Money and Wealth', duration: '16:42', type: 'video', preview: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
        ]
      }
    ],
    isPaid: true,
    featured: false,
  },
]

export const useLMSStore = defineStore('lms', () => {
  const courses = ref(JSON.parse(localStorage.getItem('fe_courses') || JSON.stringify(MOCK_COURSES)))
  const enrollments = ref(JSON.parse(localStorage.getItem('fe_enrollments') || '[]'))
  const progress = ref(JSON.parse(localStorage.getItem('fe_progress') || '{}'))
  const reviews = ref(JSON.parse(localStorage.getItem('fe_reviews') || '[]'))
  const loading = ref(false)
  const searchQuery = ref('')
  const selectedCategory = ref('All')
  const selectedLevel = ref('All')
  const sortBy = ref('popular')

  const categories = ['All', 'Web Development', 'Data Science', 'Marketing', 'Business', 'Design', 'Finance', 'Leadership']
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'All Levels']

  const filteredCourses = computed(() => {
    let result = [...courses.value]

    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      result = result.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.tags.some(t => t.toLowerCase().includes(q)) ||
        c.category.toLowerCase().includes(q)
      )
    }

    if (selectedCategory.value !== 'All') {
      result = result.filter(c => c.category === selectedCategory.value)
    }

    if (selectedLevel.value !== 'All') {
      result = result.filter(c => c.level === selectedLevel.value)
    }

    switch (sortBy.value) {
      case 'popular': result.sort((a, b) => b.enrolledCount - a.enrolledCount); break
      case 'rating': result.sort((a, b) => b.rating - a.rating); break
      case 'newest': result.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)); break
      case 'price-low': result.sort((a, b) => a.price - b.price); break
      case 'price-high': result.sort((a, b) => b.price - a.price); break
    }

    return result
  })

  const featuredCourses = computed(() => courses.value.filter(c => c.featured))

  function getCourseById(id) {
    return courses.value.find(c => c.id === id)
  }

  function isEnrolled(userId, courseId) {
    return enrollments.value.some(e => e.userId === userId && e.courseId === courseId)
  }

  function getEnrolledCourses(userId) {
    const userEnrollments = enrollments.value.filter(e => e.userId === userId)
    return userEnrollments.map(e => ({
      ...getCourseById(e.courseId),
      progress: getProgress(userId, e.courseId),
      enrolledAt: e.enrolledAt,
    })).filter(Boolean)
  }

  function getProgress(userId, courseId) {
    const key = `${userId}-${courseId}`
    return progress.value[key] || { completedLectures: [], percentage: 0 }
  }

  async function enrollCourse(userId, courseId) {
    loading.value = true
    try {
      await new Promise(r => setTimeout(r, 600))
      if (!isEnrolled(userId, courseId)) {
        enrollments.value.push({ userId, courseId, enrolledAt: new Date().toISOString() })
        localStorage.setItem('fe_enrollments', JSON.stringify(enrollments.value))
        toast.success('Successfully enrolled in course!')
      }
    } catch (err) {
      toast.error('Enrollment failed')
    } finally {
      loading.value = false
    }
  }

  function markLectureComplete(userId, courseId, lectureId) {
    const key = `${userId}-${courseId}`
    if (!progress.value[key]) progress.value[key] = { completedLectures: [], percentage: 0 }

    const course = getCourseById(courseId)
    if (!course) return

    const allLectures = course.sections.flatMap(s => s.lectures)
    const prog = progress.value[key]

    if (!prog.completedLectures.includes(lectureId)) {
      prog.completedLectures.push(lectureId)
    }

    prog.percentage = Math.round((prog.completedLectures.length / allLectures.length) * 100)

    // Check if course completed
    if (prog.percentage === 100 && !prog.completedAt) {
      prog.completedAt = new Date().toISOString()
      toast.success('Congratulations! You completed this course!')
    }

    progress.value = { ...progress.value, [key]: prog }
    localStorage.setItem('fe_progress', JSON.stringify(progress.value))
  }

  async function addCourse(courseData, instructorId) {
    loading.value = true
    try {
      await new Promise(r => setTimeout(r, 800))
      const newCourse = {
        id: `c${Date.now()}`,
        ...courseData,
        instructorId,
        enrolledCount: 0,
        rating: 0,
        reviewCount: 0,
        lastUpdated: new Date().toISOString().split('T')[0],
        featured: false,
        sections: courseData.sections || [],
      }
      courses.value.push(newCourse)
      localStorage.setItem('fe_courses', JSON.stringify(courses.value))
      toast.success('Course published successfully!')
      return newCourse
    } catch (err) {
      toast.error('Failed to publish course')
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateCourse(courseId, data) {
    loading.value = true
    try {
      await new Promise(r => setTimeout(r, 600))
      const idx = courses.value.findIndex(c => c.id === courseId)
      if (idx !== -1) {
        courses.value[idx] = { ...courses.value[idx], ...data, lastUpdated: new Date().toISOString().split('T')[0] }
        localStorage.setItem('fe_courses', JSON.stringify(courses.value))
        toast.success('Course updated successfully!')
      }
    } catch (err) {
      toast.error('Failed to update course')
    } finally {
      loading.value = false
    }
  }

  function addReview(userId, courseId, rating, comment, userName) {
    const review = {
      id: `r${Date.now()}`,
      userId, courseId, rating, comment, userName,
      createdAt: new Date().toISOString()
    }
    reviews.value.push(review)
    localStorage.setItem('fe_reviews', JSON.stringify(reviews.value))

    // Update course rating
    const courseReviews = reviews.value.filter(r => r.courseId === courseId)
    const avgRating = courseReviews.reduce((sum, r) => sum + r.rating, 0) / courseReviews.length
    const idx = courses.value.findIndex(c => c.id === courseId)
    if (idx !== -1) {
      courses.value[idx].rating = Math.round(avgRating * 10) / 10
      courses.value[idx].reviewCount = courseReviews.length
      localStorage.setItem('fe_courses', JSON.stringify(courses.value))
    }

    toast.success('Review submitted!')
  }

  function getCourseReviews(courseId) {
    return reviews.value.filter(r => r.courseId === courseId)
  }

  function getInstructorCourses(instructorId) {
    return courses.value.filter(c => c.instructor?.id === instructorId || c.instructorId === instructorId)
  }

  // Stats
  const totalCourses = computed(() => courses.value.length)
  const totalEnrollments = computed(() => enrollments.value.length)
  const totalRevenue = computed(() => {
    return enrollments.value.reduce((sum, e) => {
      const course = getCourseById(e.courseId)
      return sum + (course?.price || 0)
    }, 0)
  })

  return {
    courses, enrollments, progress, reviews, loading,
    searchQuery, selectedCategory, selectedLevel, sortBy,
    categories, levels,
    filteredCourses, featuredCourses, totalCourses, totalEnrollments, totalRevenue,
    getCourseById, isEnrolled, getEnrolledCourses, getProgress,
    enrollCourse, markLectureComplete, addCourse, updateCourse, addReview,
    getCourseReviews, getInstructorCourses
  }
})

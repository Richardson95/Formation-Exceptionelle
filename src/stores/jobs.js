import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { toast } from 'vue3-toastify'

const MOCK_JOBS = [
  {
    id: 'j001',
    title: 'Senior Frontend Developer',
    company: 'TechNova Solutions',
    companyLogo: null,
    location: 'Lagos, Nigeria',
    locationType: 'Remote',
    type: 'Full-time',
    category: 'Technology',
    salary: { min: 250000, max: 450000, currency: 'NGN', period: 'monthly' },
    experience: '3-5 years',
    level: 'Senior',
    description: 'We are looking for a talented Senior Frontend Developer to join our growing team at TechNova Solutions. You will be responsible for building and maintaining high-quality web applications using modern technologies.',
    responsibilities: [
      'Develop and maintain scalable frontend applications using Vue.js/React',
      'Collaborate with UI/UX designers to implement pixel-perfect designs',
      'Optimize applications for maximum speed and scalability',
      'Mentor junior developers and conduct code reviews',
      'Participate in architectural decisions'
    ],
    requirements: [
      '3+ years of experience with Vue.js or React',
      'Strong understanding of HTML5, CSS3, and JavaScript ES6+',
      'Experience with REST APIs and GraphQL',
      'Proficiency with Git version control',
      'Excellent problem-solving skills'
    ],
    benefits: ['Health insurance', 'Remote work', '13th month salary', 'Professional development budget', 'Stock options'],
    skills: ['Vue.js', 'React', 'TypeScript', 'CSS', 'REST APIs'],
    deadline: '2024-03-31',
    postedAt: '2024-02-20',
    postedBy: 'user-hr-001',
    applications: 47,
    views: 892,
    isActive: true,
    isFeatured: true,
  },
  {
    id: 'j002',
    title: 'Data Analyst Intern',
    company: 'AfriData Analytics',
    companyLogo: null,
    location: 'Abuja, Nigeria',
    locationType: 'Hybrid',
    type: 'Internship',
    category: 'Data Science',
    salary: { min: 80000, max: 120000, currency: 'NGN', period: 'monthly' },
    experience: '0-1 year',
    level: 'Entry',
    description: 'Join AfriData Analytics as a Data Analyst Intern and gain hands-on experience working with real-world data. Perfect for recent graduates or students looking to start their data career.',
    responsibilities: [
      'Assist in collecting and cleaning datasets',
      'Create visualizations and reports using Power BI/Tableau',
      'Support senior analysts in data modeling',
      'Document findings and prepare presentations'
    ],
    requirements: [
      'Currently pursuing or recently completed degree in Statistics, Mathematics, CS or related field',
      'Basic knowledge of Python or R',
      'Familiarity with Excel/Google Sheets',
      'Analytical mindset'
    ],
    benefits: ['Mentorship program', 'Certificate of completion', 'Opportunity for full-time employment', 'Flexible hours'],
    skills: ['Python', 'Excel', 'Power BI', 'SQL', 'Statistics'],
    deadline: '2024-03-15',
    postedAt: '2024-02-18',
    postedBy: 'user-hr-002',
    applications: 128,
    views: 1456,
    isActive: true,
    isFeatured: true,
  },
  {
    id: 'j003',
    title: 'Digital Marketing Manager',
    company: 'GrowthHive Africa',
    companyLogo: null,
    location: 'Remote',
    locationType: 'Remote',
    type: 'Full-time',
    category: 'Marketing',
    salary: { min: 180000, max: 300000, currency: 'NGN', period: 'monthly' },
    experience: '2-4 years',
    level: 'Mid-level',
    description: 'Lead our digital marketing efforts and drive growth across all digital channels. You will be responsible for developing and executing comprehensive digital marketing strategies.',
    responsibilities: [
      'Develop and implement digital marketing strategies',
      'Manage social media accounts and campaigns',
      'Oversee SEO/SEM campaigns',
      'Analyze campaign performance and optimize ROI',
      'Manage marketing budget'
    ],
    requirements: [
      '2+ years in digital marketing',
      'Experience with Google Ads and Meta Ads',
      'Strong analytical skills',
      'SEO/SEM expertise',
      'Excellent communication skills'
    ],
    benefits: ['Performance bonuses', 'Remote work flexibility', 'Health insurance', 'Annual retreat'],
    skills: ['SEO', 'Google Ads', 'Social Media', 'Content Marketing', 'Analytics'],
    deadline: '2024-03-20',
    postedAt: '2024-02-15',
    postedBy: 'user-hr-003',
    applications: 83,
    views: 1120,
    isActive: true,
    isFeatured: false,
  },
  {
    id: 'j004',
    title: 'Human Resources Business Partner',
    company: 'Pinnacle Corp Nigeria',
    companyLogo: null,
    location: 'Lagos, Nigeria',
    locationType: 'On-site',
    type: 'Full-time',
    category: 'Human Resources',
    salary: { min: 200000, max: 380000, currency: 'NGN', period: 'monthly' },
    experience: '4-6 years',
    level: 'Senior',
    description: 'Partner with business leaders to develop and implement HR strategies that support organizational objectives. Drive talent management, employee engagement, and cultural initiatives.',
    responsibilities: [
      'Partner with leadership on HR strategy',
      'Lead talent acquisition and retention programs',
      'Manage employee relations and conflict resolution',
      'Develop learning and development programs',
      'Drive performance management processes'
    ],
    requirements: [
      '4+ years HR experience',
      'CIPM, SHRM or equivalent certification preferred',
      'Strong knowledge of Nigerian labor law',
      'Experience with HRIS systems',
      'Excellent interpersonal skills'
    ],
    benefits: ['Competitive salary', 'Health & dental insurance', 'Pension', 'Professional development', 'Company car'],
    skills: ['HR Strategy', 'Talent Management', 'Employee Relations', 'Performance Management', 'Labor Law'],
    deadline: '2024-03-25',
    postedAt: '2024-02-22',
    postedBy: 'user-hr-004',
    applications: 35,
    views: 678,
    isActive: true,
    isFeatured: false,
  },
  {
    id: 'j005',
    title: 'Software Engineering Intern',
    company: 'StartupHub Technologies',
    companyLogo: null,
    location: 'Port Harcourt, Nigeria',
    locationType: 'Hybrid',
    type: 'Internship',
    category: 'Technology',
    salary: { min: 60000, max: 100000, currency: 'NGN', period: 'monthly' },
    experience: '0 years',
    level: 'Entry',
    description: 'Exciting opportunity for passionate software engineering students and fresh graduates to work on real products in a startup environment.',
    responsibilities: [
      'Develop features for our web and mobile applications',
      'Write clean, maintainable code',
      'Participate in daily standups and sprint reviews',
      'Learn from senior engineers'
    ],
    requirements: [
      'Currently studying or recently graduated in Computer Science or related field',
      'Basic knowledge of any programming language',
      'Enthusiasm for learning',
      'Team player'
    ],
    benefits: ['Mentorship', 'Flexible hours', 'Modern equipment', 'Potential full-time offer', 'Equity options'],
    skills: ['JavaScript', 'Python', 'Git', 'Problem Solving'],
    deadline: '2024-03-10',
    postedAt: '2024-02-10',
    postedBy: 'user-hr-005',
    applications: 215,
    views: 2340,
    isActive: true,
    isFeatured: true,
  },
]

export const useJobsStore = defineStore('jobs', () => {
  const jobs = ref(JSON.parse(localStorage.getItem('fe_jobs') || JSON.stringify(MOCK_JOBS)))
  const applications = ref(JSON.parse(localStorage.getItem('fe_applications') || '[]'))
  const loading = ref(false)
  const searchQuery = ref('')
  const selectedType = ref('All')
  const selectedCategory = ref('All')
  const selectedLocation = ref('All')
  const sortBy = ref('newest')

  const types = ['All', 'Full-time', 'Part-time', 'Internship', 'Contract', 'Freelance']
  const categories = ['All', 'Technology', 'Data Science', 'Marketing', 'Human Resources', 'Finance', 'Design', 'Business']
  const locationTypes = ['All', 'Remote', 'On-site', 'Hybrid']

  const filteredJobs = computed(() => {
    let result = jobs.value.filter(j => j.isActive)

    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      result = result.filter(j =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.skills.some(s => s.toLowerCase().includes(q)) ||
        j.category.toLowerCase().includes(q)
      )
    }

    if (selectedType.value !== 'All') result = result.filter(j => j.type === selectedType.value)
    if (selectedCategory.value !== 'All') result = result.filter(j => j.category === selectedCategory.value)
    if (selectedLocation.value !== 'All') result = result.filter(j => j.locationType === selectedLocation.value)

    switch (sortBy.value) {
      case 'newest': result.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt)); break
      case 'popular': result.sort((a, b) => b.applications - a.applications); break
      case 'salary-high': result.sort((a, b) => b.salary.max - a.salary.max); break
    }

    return result
  })

  const featuredJobs = computed(() => jobs.value.filter(j => j.isFeatured && j.isActive).slice(0, 6))

  function getJobById(id) {
    return jobs.value.find(j => j.id === id)
  }

  function hasApplied(userId, jobId) {
    return applications.value.some(a => a.userId === userId && a.jobId === jobId)
  }

  function getUserApplications(userId) {
    return applications.value
      .filter(a => a.userId === userId)
      .map(a => ({ ...a, job: getJobById(a.jobId) }))
      .filter(a => a.job)
  }

  async function applyForJob(userId, jobId, applicationData) {
    loading.value = true
    try {
      await new Promise(r => setTimeout(r, 900))

      if (hasApplied(userId, jobId)) {
        toast.info('You have already applied for this job')
        return
      }

      const application = {
        id: `app-${Date.now()}`,
        userId, jobId,
        ...applicationData,
        status: 'pending',
        appliedAt: new Date().toISOString(),
      }

      applications.value.push(application)
      localStorage.setItem('fe_applications', JSON.stringify(applications.value))

      // Update application count
      const idx = jobs.value.findIndex(j => j.id === jobId)
      if (idx !== -1) {
        jobs.value[idx].applications++
        localStorage.setItem('fe_jobs', JSON.stringify(jobs.value))
      }

      toast.success('Application submitted successfully!')
      return application
    } catch (err) {
      toast.error('Failed to submit application')
      throw err
    } finally {
      loading.value = false
    }
  }

  async function postJob(data, userId) {
    loading.value = true
    try {
      await new Promise(r => setTimeout(r, 700))

      const job = {
        id: `j${Date.now()}`,
        ...data,
        postedBy: userId,
        applications: 0,
        views: 0,
        isActive: true,
        isFeatured: false,
        postedAt: new Date().toISOString().split('T')[0],
      }

      jobs.value.push(job)
      localStorage.setItem('fe_jobs', JSON.stringify(jobs.value))
      toast.success('Job posted successfully!')
      return job
    } catch (err) {
      toast.error('Failed to post job')
      throw err
    } finally {
      loading.value = false
    }
  }

  const totalJobs = computed(() => jobs.value.filter(j => j.isActive).length)
  const totalApplications = computed(() => applications.value.length)
  const internships = computed(() => jobs.value.filter(j => j.type === 'Internship' && j.isActive))

  return {
    jobs, applications, loading,
    searchQuery, selectedType, selectedCategory, selectedLocation, sortBy,
    types, categories, locationTypes,
    filteredJobs, featuredJobs, totalJobs, totalApplications, internships,
    getJobById, hasApplied, getUserApplications, applyForJob, postJob
  }
})

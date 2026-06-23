import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { toast } from 'vue3-toastify'

const MOCK_JOBS = [
  {
    id: 'j001',
    title: 'Corporate / Commercial Lawyer',
    company: 'Adebayo & Okonkwo LP',
    companyLogo: null,
    location: 'Lagos, Nigeria',
    locationType: 'On-site',
    type: 'Full-time',
    category: 'Legal',
    salary: { min: 450000, max: 750000, currency: 'NGN', period: 'monthly' },
    experience: '3-5 years',
    level: 'Senior',
    description: 'A leading commercial law firm seeks an experienced Corporate/Commercial Lawyer to advise clients on transactions, financing, mergers and acquisitions, and regulatory compliance.',
    responsibilities: [
      'Advise clients on corporate and commercial transactions',
      'Draft, review and negotiate agreements',
      'Support M&A and financing deals end-to-end',
      'Conduct legal due diligence',
      'Ensure regulatory and statutory compliance'
    ],
    requirements: [
      'Called to the Nigerian Bar with 3+ years post-call experience',
      'Strong background in corporate/commercial law',
      'Experience with transactions and due diligence',
      'Excellent drafting and negotiation skills',
      'Sound knowledge of company and securities law'
    ],
    benefits: ['Health insurance', '13th month salary', 'Professional development budget', 'Performance bonus', 'Pension'],
    skills: ['Corporate Law', 'Contract Drafting', 'Due Diligence', 'M&A', 'Negotiation'],
    deadline: '2026-07-31',
    postedAt: '2026-06-12',
    postedBy: 'user-hr-001',
    applications: 47,
    views: 892,
    isActive: true,
    isFeatured: true,
  },
  {
    id: 'j002',
    title: 'Legal & Compliance Intern',
    company: 'Meridian Capital Partners',
    companyLogo: null,
    location: 'Abuja, Nigeria',
    locationType: 'Hybrid',
    type: 'Internship',
    category: 'Compliance & Risk',
    salary: { min: 120000, max: 180000, currency: 'NGN', period: 'monthly' },
    experience: '0-1 year',
    level: 'Entry',
    description: 'Join Meridian Capital Partners as a Legal & Compliance Intern and gain hands-on experience in regulatory compliance, governance and risk within a fast-paced financial services firm.',
    responsibilities: [
      'Assist with compliance monitoring and reporting',
      'Support the review of policies and procedures',
      'Help maintain statutory and regulatory records',
      'Prepare research memos and presentations'
    ],
    requirements: [
      'Recent law, finance or related graduate',
      'Interest in compliance, governance and risk',
      'Strong research and writing skills',
      'Attention to detail'
    ],
    benefits: ['Mentorship program', 'Certificate of completion', 'Opportunity for full-time employment', 'Flexible hours'],
    skills: ['Compliance', 'Legal Research', 'Risk', 'Governance', 'Reporting'],
    deadline: '2026-07-15',
    postedAt: '2026-06-10',
    postedBy: 'user-hr-002',
    applications: 128,
    views: 1456,
    isActive: true,
    isFeatured: true,
  },
  {
    id: 'j003',
    title: 'Company Secretary / Governance Officer',
    company: 'Sterling Holdings Plc',
    companyLogo: null,
    location: 'Lagos, Nigeria',
    locationType: 'On-site',
    type: 'Full-time',
    category: 'Corporate Governance',
    salary: { min: 400000, max: 650000, currency: 'NGN', period: 'monthly' },
    experience: '4-6 years',
    level: 'Senior',
    description: 'Sterling Holdings Plc seeks a Company Secretary/Governance Officer to administer the board, ensure statutory compliance and advise on corporate governance best practice.',
    responsibilities: [
      'Administer board and committee meetings and minutes',
      'Maintain statutory registers and manage filings',
      'Advise the board on governance and compliance',
      'Coordinate annual general meetings',
      'Monitor changes in relevant regulation'
    ],
    requirements: [
      'ICSAN / chartered secretary qualification (or working towards)',
      '4+ years in company secretarial or governance roles',
      'Strong knowledge of company law and governance codes',
      'Excellent organisation and communication skills'
    ],
    benefits: ['Performance bonus', 'Health insurance', 'Pension', 'Annual retreat'],
    skills: ['Company Secretarial', 'Corporate Governance', 'Compliance', 'Board Administration', 'Company Law'],
    deadline: '2026-07-20',
    postedAt: '2026-06-08',
    postedBy: 'user-hr-003',
    applications: 83,
    views: 1120,
    isActive: true,
    isFeatured: false,
  },
  {
    id: 'j004',
    title: 'Tax Manager',
    company: 'Harcourt Advisory',
    companyLogo: null,
    location: 'Lagos, Nigeria',
    locationType: 'Hybrid',
    type: 'Full-time',
    category: 'Tax',
    salary: { min: 500000, max: 850000, currency: 'NGN', period: 'monthly' },
    experience: '5-8 years',
    level: 'Manager',
    description: 'Harcourt Advisory is hiring a Tax Manager to lead tax advisory and compliance engagements, advise clients on the new tax laws and develop tax-efficient strategies.',
    responsibilities: [
      'Lead tax compliance and advisory engagements',
      'Advise clients on the implications of new tax laws',
      'Develop tax-efficient structures and strategies',
      'Manage relationships with tax authorities',
      'Review filings and supervise junior associates'
    ],
    requirements: [
      'ACA/ACCA/CITN qualification',
      '5+ years in tax advisory or compliance',
      'Strong knowledge of current tax legislation',
      'Excellent analytical and client-management skills'
    ],
    benefits: ['Competitive salary', 'Health & dental insurance', 'Pension', 'Professional development', 'Performance bonus'],
    skills: ['Taxation', 'Tax Planning', 'Compliance', 'Advisory', 'Tax Law'],
    deadline: '2026-07-25',
    postedAt: '2026-06-14',
    postedBy: 'user-hr-004',
    applications: 35,
    views: 678,
    isActive: true,
    isFeatured: false,
  },
  {
    id: 'j005',
    title: 'Investment / Capital Markets Analyst Intern',
    company: 'Apex Securities Limited',
    companyLogo: null,
    location: 'Port Harcourt, Nigeria',
    locationType: 'Hybrid',
    type: 'Internship',
    category: 'Finance',
    salary: { min: 100000, max: 160000, currency: 'NGN', period: 'monthly' },
    experience: '0 years',
    level: 'Entry',
    description: 'An exciting opportunity for finance graduates to gain hands-on experience in capital markets, investment analysis and corporate financing at a leading securities firm.',
    responsibilities: [
      'Support investment research and financial analysis',
      'Assist with capital raising and transaction documentation',
      'Build and maintain financial models',
      'Prepare investment presentations and reports'
    ],
    requirements: [
      'Recent finance, economics or accounting graduate',
      'Strong quantitative and Excel skills',
      'Interest in capital markets and investments',
      'Eagerness to learn'
    ],
    benefits: ['Mentorship', 'Flexible hours', 'Professional development', 'Potential full-time offer'],
    skills: ['Financial Modelling', 'Capital Markets', 'Investment Analysis', 'Excel', 'Valuation'],
    deadline: '2026-07-10',
    postedAt: '2026-06-05',
    postedBy: 'user-hr-005',
    applications: 215,
    views: 2340,
    isActive: true,
    isFeatured: true,
  },
]

// Re-seed cached jobs when the listings change (bump this on content updates).
// Seeded jobs are 'approved' & active; employer-posted jobs start 'pending' and
// must be approved by an admin before they appear publicly.
const JOBS_SEED_VERSION = '2026-06-professional-jobs-v2'
if (localStorage.getItem('fe_jobs_version') !== JOBS_SEED_VERSION) {
  localStorage.setItem('fe_jobs', JSON.stringify(MOCK_JOBS.map(j => ({ ...j, status: 'approved' }))))
  localStorage.setItem('fe_jobs_version', JOBS_SEED_VERSION)
}

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
  const categories = ['All', 'Legal', 'Finance', 'Compliance & Risk', 'Corporate Governance', 'Tax', 'Energy & Resources', 'Consulting']
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

  // Applicants for a single job (employer/admin review).
  function getJobApplications(jobId) {
    return applications.value
      .filter(a => a.jobId === jobId)
      .sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))
  }

  // Jobs posted by a given user (their own listings).
  function getPostedJobs(userId) {
    return jobs.value.filter(j => j.postedBy === userId)
  }

  // All applications across the jobs a user has posted (employer dashboard).
  function getPosterApplications(userId) {
    const myJobIds = new Set(jobs.value.filter(j => j.postedBy === userId).map(j => j.id))
    return applications.value
      .filter(a => myJobIds.has(a.jobId))
      .map(a => ({ ...a, job: getJobById(a.jobId) }))
      .sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))
  }

  // Employer/admin moves a candidate through the selection pipeline.
  // status: 'pending' | 'reviewed' | 'shortlisted' | 'accepted' | 'rejected'
  async function updateApplicationStatus(applicationId, status) {
    loading.value = true
    try {
      await new Promise(r => setTimeout(r, 300))
      const idx = applications.value.findIndex(a => a.id === applicationId)
      if (idx !== -1) {
        applications.value[idx] = { ...applications.value[idx], status, reviewedAt: new Date().toISOString() }
        localStorage.setItem('fe_applications', JSON.stringify(applications.value))
        const labels = { reviewed: 'marked as reviewed', shortlisted: 'shortlisted', accepted: 'accepted', rejected: 'rejected', pending: 'reset to pending' }
        toast.success(`Candidate ${labels[status] || ('set to ' + status)}`)
      }
    } catch (err) {
      toast.error('Failed to update application')
    } finally {
      loading.value = false
    }
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
        isActive: false,            // hidden until an admin approves it
        isFeatured: false,
        status: 'pending',          // awaits admin approval
        submittedAt: new Date().toISOString(),
        rejectionReason: '',
        postedAt: new Date().toISOString().split('T')[0],
      }

      jobs.value.push(job)
      localStorage.setItem('fe_jobs', JSON.stringify(jobs.value))
      toast.success('Job submitted for review! An admin will approve it shortly.')
      return job
    } catch (err) {
      toast.error('Failed to post job')
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateJob(jobId, data) {
    loading.value = true
    try {
      await new Promise(r => setTimeout(r, 400))
      const idx = jobs.value.findIndex(j => j.id === jobId)
      if (idx !== -1) {
        jobs.value[idx] = { ...jobs.value[idx], ...data }
        localStorage.setItem('fe_jobs', JSON.stringify(jobs.value))
        toast.success('Job updated successfully!')
      }
    } catch (err) {
      toast.error('Failed to update job')
    } finally {
      loading.value = false
    }
  }

  async function deleteJob(jobId) {
    loading.value = true
    try {
      await new Promise(r => setTimeout(r, 400))
      jobs.value = jobs.value.filter(j => j.id !== jobId)
      localStorage.setItem('fe_jobs', JSON.stringify(jobs.value))
      toast.success('Job removed successfully')
    } catch (err) {
      toast.error('Failed to remove job')
    } finally {
      loading.value = false
    }
  }

  // Admin moderation: approve a pending job (makes it live & active).
  async function approveJob(jobId) {
    loading.value = true
    try {
      await new Promise(r => setTimeout(r, 400))
      const idx = jobs.value.findIndex(j => j.id === jobId)
      if (idx !== -1) {
        jobs.value[idx] = { ...jobs.value[idx], status: 'approved', isActive: true, rejectionReason: '' }
        localStorage.setItem('fe_jobs', JSON.stringify(jobs.value))
        toast.success('Job approved and published!')
      }
    } catch (err) {
      toast.error('Failed to approve job')
    } finally {
      loading.value = false
    }
  }

  // Admin moderation: reject a pending job with an optional reason.
  async function rejectJob(jobId, reason = '') {
    loading.value = true
    try {
      await new Promise(r => setTimeout(r, 400))
      const idx = jobs.value.findIndex(j => j.id === jobId)
      if (idx !== -1) {
        jobs.value[idx] = { ...jobs.value[idx], status: 'rejected', isActive: false, rejectionReason: reason }
        localStorage.setItem('fe_jobs', JSON.stringify(jobs.value))
        toast.info('Job rejected. The employer has been notified.')
      }
    } catch (err) {
      toast.error('Failed to reject job')
    } finally {
      loading.value = false
    }
  }

  const totalJobs = computed(() => jobs.value.filter(j => j.isActive).length)
  const totalApplications = computed(() => applications.value.length)
  const internships = computed(() => jobs.value.filter(j => j.type === 'Internship' && j.isActive))
  const pendingJobs = computed(() => jobs.value.filter(j => j.status === 'pending'))

  return {
    jobs, applications, loading,
    searchQuery, selectedType, selectedCategory, selectedLocation, sortBy,
    types, categories, locationTypes,
    filteredJobs, featuredJobs, totalJobs, totalApplications, internships, pendingJobs,
    getJobById, hasApplied, getUserApplications, applyForJob, postJob, updateJob, deleteJob,
    approveJob, rejectJob,
    getJobApplications, getPostedJobs, getPosterApplications, updateApplicationStatus
  }
})

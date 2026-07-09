import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { toast } from 'vue3-toastify'
import { API_ENABLED, api, get, post, patch, del } from '@/services/api'
import { useAuthStore } from '@/stores/auth'

const MOCK_JOBS = [
  {
    id: 'j001',
    title: 'Corporate / Commercial Lawyer',
    company: 'Formation Exceptionelle',
    companyLogo: null,
    location: 'Lagos, Nigeria',
    locationType: 'On-site',
    type: 'Full-time',
    category: 'Legal',
    salary: { min: 450000, max: 750000, currency: 'NGN', period: 'monthly' },
    experience: '3-5 years',
    level: 'Senior',
    description: 'Formation Exceptionelle seeks an experienced Corporate/Commercial Lawyer to advise on transactions, financing, mergers and acquisitions, and regulatory compliance.',
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
    company: 'Formation Exceptionelle',
    companyLogo: null,
    location: 'Abuja, Nigeria',
    locationType: 'Hybrid',
    type: 'Internship',
    category: 'Compliance & Risk',
    salary: { min: 120000, max: 180000, currency: 'NGN', period: 'monthly' },
    experience: '0-1 year',
    level: 'Entry',
    description: 'Join Formation Exceptionelle as a Legal & Compliance Intern and gain hands-on experience in regulatory compliance, governance and risk within a fast-paced professional environment.',
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
    company: 'Formation Exceptionelle',
    companyLogo: null,
    location: 'Lagos, Nigeria',
    locationType: 'On-site',
    type: 'Full-time',
    category: 'Corporate Governance',
    salary: { min: 400000, max: 650000, currency: 'NGN', period: 'monthly' },
    experience: '4-6 years',
    level: 'Senior',
    description: 'Formation Exceptionelle seeks a Company Secretary/Governance Officer to administer the board, ensure statutory compliance and advise on corporate governance best practice.',
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
    company: 'Formation Exceptionelle',
    companyLogo: null,
    location: 'Lagos, Nigeria',
    locationType: 'Hybrid',
    type: 'Full-time',
    category: 'Tax',
    salary: { min: 500000, max: 850000, currency: 'NGN', period: 'monthly' },
    experience: '5-8 years',
    level: 'Manager',
    description: 'Formation Exceptionelle is hiring a Tax Manager to lead tax advisory and compliance engagements, advise clients on the new tax laws and develop tax-efficient strategies.',
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
    company: 'Formation Exceptionelle',
    companyLogo: null,
    location: 'Port Harcourt, Nigeria',
    locationType: 'Hybrid',
    type: 'Internship',
    category: 'Finance',
    salary: { min: 100000, max: 160000, currency: 'NGN', period: 'monthly' },
    experience: '0 years',
    level: 'Entry',
    description: 'An exciting opportunity for finance graduates to gain hands-on experience in capital markets, investment analysis and corporate financing at Formation Exceptionelle.',
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
const JOBS_SEED_VERSION = '2026-06-fe-first-party-jobs-v3'
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

  // ── Backend sync (active only when VITE_API_BASE_URL is set) ───────────────
  function mergeJobs(incoming) {
    const byId = new Map(jobs.value.map((j) => [j.id, j]))
    incoming.forEach((j) => byId.set(j.id, j))
    jobs.value = [...byId.values()]
  }
  function mergeApplications(incoming) {
    const byId = new Map(applications.value.map((a) => [a.id, a]))
    incoming.forEach((a) => byId.set(a.id, a))
    applications.value = [...byId.values()]
  }

  async function fetchJobs() {
    if (!API_ENABLED) return
    try {
      const data = await get('/jobs')
      jobs.value = Array.isArray(data) ? data : (data.data || [])
    } catch { /* keep cached */ }
  }

  // `/jobs` only returns approved + active listings, so a closed or rejected job
  // would vanish from the admin table. `/admin/jobs` returns every job, and is
  // the only list that carries `applicantCount`.
  async function fetchAdminJobs() {
    if (!API_ENABLED) return
    try {
      mergeJobs(await get('/admin/jobs'))
    } catch { /* keep cached */ }
  }

  async function fetchMine() {
    if (!API_ENABLED || !useAuthStore().user?.id) return
    try {
      const [mineJobs, myApps, postedApps] = await Promise.all([
        get('/jobs/mine').catch(() => []),
        get('/applications/me').catch(() => []),
        get('/applications/posted-by-me').catch(() => []),
      ])
      if (mineJobs.length) mergeJobs(mineJobs)
      mergeApplications([...myApps, ...postedApps])
    } catch { /* ignore */ }
  }

  if (API_ENABLED) {
    fetchJobs()
    const authStore = useAuthStore()
    watch(
      () => authStore.user?.id,
      (id) => { if (id) fetchMine(); else applications.value = [] },
      { immediate: true }
    )
  }

  // Mirrors the backend's public filter. The store now also holds closed/rejected
  // jobs for the admin table, so public getters must gate on both flags.
  const isLive = (j) => j.isActive && (j.status || 'approved') === 'approved'

  const filteredJobs = computed(() => {
    let result = jobs.value.filter(isLive)

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

  const featuredJobs = computed(() => jobs.value.filter(j => j.isFeatured && isLive(j)).slice(0, 6))

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
      if (API_ENABLED) {
        const updated = await patch(`/applications/${applicationId}/status`, { status })
        const i = applications.value.findIndex(a => a.id === applicationId)
        if (i !== -1) applications.value[i] = { ...applications.value[i], ...updated }
        const labels = { reviewed: 'marked as reviewed', shortlisted: 'shortlisted', accepted: 'accepted', rejected: 'rejected', pending: 'reset to pending' }
        toast.success(`Candidate ${labels[status] || ('set to ' + status)}`)
        return
      }
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
      if (hasApplied(userId, jobId)) {
        toast.info('You have already applied for this job')
        return
      }

      if (API_ENABLED) {
        const { cvFile, ...fields } = applicationData
        const fd = new FormData()
        fd.append('jobId', jobId)
        Object.entries(fields).forEach(([k, v]) => {
          if (v !== undefined && v !== null) fd.append(k, v)
        })
        if (cvFile) fd.append('cv', cvFile)
        // Let the browser set the multipart boundary.
        const created = (await api.post('/applications', fd, { headers: { 'Content-Type': undefined } })).data
        applications.value.push(created)
        const j = jobs.value.findIndex(x => x.id === jobId)
        if (j !== -1) jobs.value[j] = { ...jobs.value[j], applications: (jobs.value[j].applications || 0) + 1 }
        toast.success('Application submitted successfully!')
        return created
      }

      await new Promise(r => setTimeout(r, 900))

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

  // Jobs are posted by an admin from the admin panel, so they go live immediately.
  async function postJob(data, userId) {
    loading.value = true
    try {
      if (API_ENABLED) {
        const created = await post('/jobs', data)
        jobs.value.push(created)
        toast.success(created.isActive ? 'Job published successfully!' : 'Job submitted for review!')
        return created
      }
      await new Promise(r => setTimeout(r, 700))

      const job = {
        id: `j${Date.now()}`,
        ...data,
        postedBy: userId,
        applications: 0,
        views: 0,
        isActive: true,             // published immediately (admin-posted)
        isFeatured: false,
        status: 'approved',
        submittedAt: new Date().toISOString(),
        rejectionReason: '',
        postedAt: new Date().toISOString().split('T')[0],
      }

      jobs.value.push(job)
      localStorage.setItem('fe_jobs', JSON.stringify(jobs.value))
      toast.success('Job published successfully!')
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
      if (API_ENABLED) {
        const updated = await patch(`/jobs/${jobId}`, data)
        const i = jobs.value.findIndex(j => j.id === jobId)
        if (i !== -1) jobs.value[i] = updated
        toast.success('Job updated successfully!')
        return
      }
      await new Promise(r => setTimeout(r, 400))
      const idx = jobs.value.findIndex(j => j.id === jobId)
      if (idx !== -1) {
        jobs.value[idx] = { ...jobs.value[idx], ...data }
        localStorage.setItem('fe_jobs', JSON.stringify(jobs.value))
        toast.success('Job updated successfully!')
      }
    } catch (err) {
      toast.error(err.message || 'Failed to update job')
    } finally {
      loading.value = false
    }
  }

  async function deleteJob(jobId) {
    loading.value = true
    try {
      if (API_ENABLED) {
        await del(`/jobs/${jobId}`)
        jobs.value = jobs.value.filter(j => j.id !== jobId)
        toast.success('Job removed successfully')
        return
      }
      await new Promise(r => setTimeout(r, 400))
      jobs.value = jobs.value.filter(j => j.id !== jobId)
      localStorage.setItem('fe_jobs', JSON.stringify(jobs.value))
      toast.success('Job removed successfully')
    } catch (err) {
      toast.error(err.message || 'Failed to remove job')
    } finally {
      loading.value = false
    }
  }

  // Admin moderation: approve a pending job (makes it live & active).
  async function approveJob(jobId) {
    loading.value = true
    try {
      if (API_ENABLED) {
        const updated = await post(`/admin/jobs/${jobId}/approve`)
        const i = jobs.value.findIndex(j => j.id === jobId)
        if (i !== -1) jobs.value[i] = updated
        toast.success('Job approved and published!')
        return
      }
      await new Promise(r => setTimeout(r, 400))
      const idx = jobs.value.findIndex(j => j.id === jobId)
      if (idx !== -1) {
        jobs.value[idx] = { ...jobs.value[idx], status: 'approved', isActive: true, rejectionReason: '' }
        localStorage.setItem('fe_jobs', JSON.stringify(jobs.value))
        toast.success('Job approved and published!')
      }
    } catch (err) {
      toast.error(err.message || 'Failed to approve job')
    } finally {
      loading.value = false
    }
  }

  // Admin moderation: reject a pending job with an optional reason.
  async function rejectJob(jobId, reason = '') {
    loading.value = true
    try {
      if (API_ENABLED) {
        const updated = await post(`/admin/jobs/${jobId}/reject`, { reason })
        const i = jobs.value.findIndex(j => j.id === jobId)
        if (i !== -1) jobs.value[i] = updated
        toast.info('Job rejected.')
        return
      }
      await new Promise(r => setTimeout(r, 400))
      const idx = jobs.value.findIndex(j => j.id === jobId)
      if (idx !== -1) {
        jobs.value[idx] = { ...jobs.value[idx], status: 'rejected', isActive: false, rejectionReason: reason }
        localStorage.setItem('fe_jobs', JSON.stringify(jobs.value))
        toast.info('Job rejected. The employer has been notified.')
      }
    } catch (err) {
      toast.error(err.message || 'Failed to reject job')
    } finally {
      loading.value = false
    }
  }

  const totalJobs = computed(() => jobs.value.filter(isLive).length)
  const totalApplications = computed(() => applications.value.length)
  const internships = computed(() => jobs.value.filter(j => j.type === 'Internship' && isLive(j)))
  const pendingJobs = computed(() => jobs.value.filter(j => j.status === 'pending'))

  return {
    jobs, applications, loading,
    searchQuery, selectedType, selectedCategory, selectedLocation, sortBy,
    types, categories, locationTypes,
    filteredJobs, featuredJobs, totalJobs, totalApplications, internships, pendingJobs,
    getJobById, hasApplied, getUserApplications, applyForJob, postJob, updateJob, deleteJob,
    approveJob, rejectJob,
    getJobApplications, getPostedJobs, getPosterApplications, updateApplicationStatus,
    fetchJobs, fetchAdminJobs, fetchMine
  }
})

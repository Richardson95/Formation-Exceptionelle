import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { toast } from 'vue3-toastify'

// Mock course data — professional corporate, legal & finance training programs
const MOCK_COURSES = [
  {
    id: 'c001',
    title: 'Financing, Mergers & Acquisitions and Alternative Dispute Resolution (ADR): Advanced Practice, Procedure & Negotiation',
    subtitle: 'Master deal financing, M&A execution and ADR strategy with advanced procedure and negotiation techniques',
    description: 'A flagship advanced programme for legal practitioners, in-house counsel, deal advisers and executives. It covers the full lifecycle of corporate transactions — from structuring and financing through to mergers, acquisitions and the resolution of disputes via arbitration, mediation and negotiation. Participants gain practical, procedure-driven insight into closing complex deals and managing conflict commercially.',
    instructor: { id: 'inst-001', name: 'Barr. (Mrs.) Adaeze Okafor, SAN', avatar: null, rating: 4.9, students: 4200 },
    category: 'Dispute Resolution',
    subcategory: 'M&A, Financing & ADR',
    level: 'Advanced',
    language: 'English',
    price: 320,
    originalPrice: 480,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80',
    previewVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    rating: 4.9,
    reviewCount: 612,
    enrolledCount: 4200,
    duration: '24 hours',
    lectureCount: 48,
    lastUpdated: '2026-05-12',
    certificate: true,
    tags: ['Mergers & Acquisitions', 'Financing', 'ADR', 'Arbitration', 'Negotiation'],
    requirements: ['Background in law, finance or corporate practice', 'Familiarity with basic contract principles'],
    objectives: [
      'Structure and finance complex corporate transactions',
      'Lead M&A processes from due diligence to completion',
      'Apply arbitration, mediation and negotiation frameworks to resolve disputes',
      'Draft and negotiate transaction and settlement agreements with confidence'
    ],
    sections: [
      {
        id: 's1', title: 'Deal Financing & Transaction Structuring', duration: '8h 00m',
        lectures: [
          { id: 'l1', title: 'Course Orientation & The Modern Transaction Lifecycle', duration: '12:30', type: 'video', preview: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
          { id: 'l2', title: 'Sources of Corporate Financing & Capital Structure', duration: '24:45', type: 'video', preview: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
          { id: 'l3', title: 'Security, Covenants & Risk Allocation', duration: '28:20', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
          { id: 'l4', title: 'Module Assessment', duration: '10 questions', type: 'quiz', preview: false }
        ]
      },
      {
        id: 's2', title: 'M&A Execution & ADR Strategy', duration: '9h 30m',
        lectures: [
          { id: 'l5', title: 'Mergers & Acquisitions: Process and Documentation', duration: '32:10', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
          { id: 'l6', title: 'Arbitration & Mediation in Commercial Disputes', duration: '29:48', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
          { id: 'l7', title: 'Advanced Negotiation Techniques', duration: '34:33', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
          { id: 'l8', title: 'Negotiation Simulation Assignment', duration: 'Assignment', type: 'assignment', preview: false }
        ]
      }
    ],
    isPaid: true,
    featured: true,
  },
  {
    id: 'c002',
    title: 'Company Secretarial Practice',
    subtitle: 'Build mastery of board administration, statutory compliance and corporate record-keeping',
    description: 'A practical programme for company secretaries, governance officers and administrators. It covers statutory duties, board and committee administration, filings and returns, meeting procedure and the company secretary’s evolving role as a governance professional and trusted adviser to the board.',
    instructor: { id: 'inst-002', name: 'Mr. Tunde Bakare, FCIS', avatar: null, rating: 4.8, students: 2860 },
    category: 'Corporate Governance',
    subcategory: 'Company Secretarial',
    level: 'Intermediate',
    language: 'English',
    price: 180,
    originalPrice: 300,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80',
    previewVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    rating: 4.8,
    reviewCount: 418,
    enrolledCount: 2860,
    duration: '16 hours',
    lectureCount: 34,
    lastUpdated: '2026-04-22',
    certificate: true,
    tags: ['Company Secretarial', 'Board Administration', 'Compliance', 'Statutory Filings'],
    requirements: ['Interest in corporate administration or governance', 'No prior qualification required'],
    objectives: [
      'Discharge the statutory duties of a company secretary',
      'Administer board and committee meetings and minutes',
      'Manage statutory registers, filings and annual returns',
      'Advise the board on governance and compliance matters'
    ],
    sections: [
      {
        id: 's1', title: 'The Role & Statutory Duties', duration: '5h 20m',
        lectures: [
          { id: 'l1', title: 'The Company Secretary as Governance Professional', duration: '15:20', type: 'video', preview: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
          { id: 'l2', title: 'Statutory Registers, Filings & Returns', duration: '26:15', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
        ]
      },
      {
        id: 's2', title: 'Board & Meeting Administration', duration: '4h 40m',
        lectures: [
          { id: 'l3', title: 'Convening Meetings, Notices & Quorum', duration: '22:40', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
          { id: 'l4', title: 'Minute-Taking & Resolutions', duration: '24:22', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
        ]
      }
    ],
    isPaid: true,
    featured: true,
  },
  {
    id: 'c003',
    title: 'Strategic Leadership & Corporate Governance: Aligning Strategy, Ethics, Performance & Stakeholder Management for High-Impact',
    subtitle: 'Lead at board level by aligning strategy, ethics, performance and stakeholder interests',
    description: 'Designed for directors, senior executives and aspiring board members, this programme connects strategic leadership with sound corporate governance. It explores board effectiveness, ethical decision-making, performance oversight, risk and stakeholder management — equipping leaders to drive high-impact, accountable organisations.',
    instructor: { id: 'inst-003', name: 'Dr. Ngozi Eze', avatar: null, rating: 4.9, students: 3540 },
    category: 'Corporate Governance',
    subcategory: 'Leadership & Strategy',
    level: 'Advanced',
    language: 'English',
    price: 260,
    originalPrice: 420,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80',
    previewVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    rating: 4.9,
    reviewCount: 503,
    enrolledCount: 3540,
    duration: '20 hours',
    lectureCount: 40,
    lastUpdated: '2026-05-30',
    certificate: true,
    tags: ['Corporate Governance', 'Leadership', 'Ethics', 'Strategy', 'Stakeholder Management'],
    requirements: ['Management or board-level experience helpful', 'Interest in governance and strategy'],
    objectives: [
      'Align corporate strategy with governance and ethics',
      'Strengthen board effectiveness and accountability',
      'Oversee performance, risk and internal controls',
      'Manage stakeholders for sustainable, high-impact outcomes'
    ],
    sections: [
      {
        id: 's1', title: 'Foundations of Strategic Governance', duration: '6h 10m',
        lectures: [
          { id: 'l1', title: 'What Makes a High-Impact Board?', duration: '18:30', type: 'video', preview: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' },
          { id: 'l2', title: 'Strategy, Ethics & Corporate Purpose', duration: '30:45', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
        ]
      },
      {
        id: 's2', title: 'Performance & Stakeholder Management', duration: '5h 30m',
        lectures: [
          { id: 'l3', title: 'Performance Oversight & Risk Governance', duration: '27:10', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
          { id: 'l4', title: 'Stakeholder Engagement Case Study', duration: 'Assignment', type: 'assignment', preview: false },
        ]
      }
    ],
    isPaid: true,
    featured: true,
  },
  {
    id: 'c004',
    title: 'Navigating Law & Digital Innovation: AI, Fintech & Data Protection',
    subtitle: 'Understand the legal and regulatory landscape of AI, fintech and data privacy',
    description: 'A forward-looking programme on the intersection of law and technology. It examines the regulation of artificial intelligence, the fintech ecosystem, payments and digital assets, and the data protection obligations organisations must meet. Ideal for lawyers, compliance officers and innovators operating in a fast-changing digital economy.',
    instructor: { id: 'inst-004', name: 'Prof. Emeka Obi', avatar: null, rating: 4.7, students: 2480 },
    category: 'Corporate Law',
    subcategory: 'Technology & Data Law',
    level: 'Intermediate',
    language: 'English',
    price: 240,
    originalPrice: 390,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    previewVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    rating: 4.7,
    reviewCount: 357,
    enrolledCount: 2480,
    duration: '18 hours',
    lectureCount: 36,
    lastUpdated: '2026-06-02',
    certificate: true,
    tags: ['Technology Law', 'Artificial Intelligence', 'Fintech', 'Data Protection', 'Regulation'],
    requirements: ['Basic legal or compliance knowledge helpful', 'Interest in technology and regulation'],
    objectives: [
      'Navigate the emerging regulation of AI',
      'Advise on fintech, payments and digital asset compliance',
      'Apply data protection and privacy principles in practice',
      'Manage legal risk in digital innovation projects'
    ],
    sections: [
      {
        id: 's1', title: 'Law Meets Technology', duration: '5h 00m',
        lectures: [
          { id: 'l1', title: 'The Digital Innovation Landscape & Regulation', duration: '16:22', type: 'video', preview: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
          { id: 'l2', title: 'Regulating Artificial Intelligence', duration: '28:15', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
        ]
      },
      {
        id: 's2', title: 'Fintech & Data Protection', duration: '4h 45m',
        lectures: [
          { id: 'l3', title: 'Fintech, Payments & Digital Assets', duration: '25:40', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
          { id: 'l4', title: 'Data Protection & Privacy Compliance', duration: '30:22', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
        ]
      }
    ],
    isPaid: true,
    featured: false,
  },
  {
    id: 'c005',
    title: 'Capital Market: Corporate Financing, Regulations & Compliance',
    subtitle: 'Raise capital through the markets while meeting regulatory and compliance obligations',
    description: 'A comprehensive programme on capital market operations for finance professionals, legal advisers and compliance officers. It covers equity and debt issuance, listing requirements, market regulation, disclosure obligations and the compliance frameworks that govern corporate financing through the capital markets.',
    instructor: { id: 'inst-005', name: 'Mr. Chukwuma Nwankwo, FCA', avatar: null, rating: 4.8, students: 3120 },
    category: 'Finance & Capital Markets',
    subcategory: 'Capital Markets',
    level: 'Intermediate',
    language: 'English',
    price: 280,
    originalPrice: 450,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&q=80',
    previewVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    rating: 4.8,
    reviewCount: 446,
    enrolledCount: 3120,
    duration: '19 hours',
    lectureCount: 38,
    lastUpdated: '2026-05-18',
    certificate: true,
    tags: ['Capital Markets', 'Corporate Financing', 'Regulation', 'Compliance', 'Securities'],
    requirements: ['Basic understanding of finance', 'Interest in capital markets'],
    objectives: [
      'Raise corporate finance via equity and debt issuance',
      'Meet listing, disclosure and reporting requirements',
      'Apply capital market regulation in practice',
      'Build and run effective compliance frameworks'
    ],
    sections: [
      {
        id: 's1', title: 'Capital Market Fundamentals', duration: '5h 30m',
        lectures: [
          { id: 'l1', title: 'Structure of the Capital Market', duration: '17:15', type: 'video', preview: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' },
          { id: 'l2', title: 'Equity & Debt Issuance', duration: '29:22', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
        ]
      },
      {
        id: 's2', title: 'Regulation & Compliance', duration: '4h 50m',
        lectures: [
          { id: 'l3', title: 'Market Regulation & Disclosure Obligations', duration: '26:48', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
          { id: 'l4', title: 'Compliance Frameworks Quiz', duration: '12 questions', type: 'quiz', preview: false },
        ]
      }
    ],
    isPaid: true,
    featured: true,
  },
  {
    id: 'c006',
    title: 'Project Structuring & Financing, Advanced Fiscal Modelling & Negotiation and ESG Integration in Renewables, Oil, Gas & Power',
    subtitle: 'Structure, finance and negotiate energy projects with advanced fiscal modelling and ESG integration',
    description: 'An advanced programme for energy, infrastructure and project finance professionals. It covers project structuring and financing, advanced fiscal and financial modelling, contract negotiation, and the integration of Environmental, Social and Governance (ESG) considerations across renewables, oil, gas and power projects.',
    instructor: { id: 'inst-006', name: 'Engr. Yusuf Bello', avatar: null, rating: 4.8, students: 1980 },
    category: 'Energy & ESG',
    subcategory: 'Energy & Project Finance',
    level: 'Advanced',
    language: 'English',
    price: 360,
    originalPrice: 520,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80',
    previewVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    rating: 4.8,
    reviewCount: 288,
    enrolledCount: 1980,
    duration: '22 hours',
    lectureCount: 44,
    lastUpdated: '2026-06-08',
    certificate: true,
    tags: ['Project Finance', 'Fiscal Modelling', 'ESG', 'Energy', 'Oil & Gas', 'Renewables'],
    requirements: ['Experience in energy, finance or infrastructure', 'Comfort with spreadsheets and financial concepts'],
    objectives: [
      'Structure and finance large-scale energy projects',
      'Build advanced fiscal and financial models',
      'Negotiate project and offtake agreements',
      'Integrate ESG principles across renewables, oil, gas and power'
    ],
    sections: [
      {
        id: 's1', title: 'Project Structuring & Financing', duration: '7h 20m',
        lectures: [
          { id: 'l1', title: 'Project Finance Fundamentals', duration: '19:30', type: 'video', preview: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4' },
          { id: 'l2', title: 'Risk Allocation & Financing Structures', duration: '33:45', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
        ]
      },
      {
        id: 's2', title: 'Fiscal Modelling & ESG Integration', duration: '6h 40m',
        lectures: [
          { id: 'l3', title: 'Advanced Fiscal & Financial Modelling', duration: '31:10', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4' },
          { id: 'l4', title: 'ESG in Renewables, Oil, Gas & Power', duration: '28:18', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
          { id: 'l5', title: 'Project Modelling Assignment', duration: 'Assignment', type: 'assignment', preview: false },
        ]
      }
    ],
    isPaid: true,
    featured: false,
  },
  {
    id: 'c007',
    title: 'Mergers and Acquisitions: Regulations, Risks Management & Practical Insights',
    subtitle: 'Execute M&A transactions with command of regulation, risk management and real-world practice',
    description: 'A practice-focused programme on mergers and acquisitions covering the regulatory approval process, transaction risk identification and mitigation, valuation, integration and lessons from real deals. Suited to legal advisers, finance professionals, regulators and corporate executives involved in transactions.',
    instructor: { id: 'inst-007', name: 'Mrs. Fatima Abdullahi', avatar: null, rating: 4.7, students: 2240 },
    category: 'Mergers & Acquisitions',
    subcategory: 'M&A Practice',
    level: 'Advanced',
    language: 'English',
    price: 300,
    originalPrice: 470,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
    previewVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    rating: 4.7,
    reviewCount: 321,
    enrolledCount: 2240,
    duration: '21 hours',
    lectureCount: 42,
    lastUpdated: '2026-05-25',
    certificate: true,
    tags: ['Mergers & Acquisitions', 'Regulation', 'Risk Management', 'Valuation', 'Integration'],
    requirements: ['Corporate, legal or finance background', 'Interest in transactions'],
    objectives: [
      'Navigate M&A regulatory approval processes',
      'Identify, assess and mitigate transaction risks',
      'Apply valuation and deal-structuring techniques',
      'Plan and execute post-merger integration'
    ],
    sections: [
      {
        id: 's1', title: 'M&A Regulation & Process', duration: '6h 30m',
        lectures: [
          { id: 'l1', title: 'The M&A Landscape & Regulatory Framework', duration: '18:15', type: 'video', preview: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4' },
          { id: 'l2', title: 'Approvals, Antitrust & Competition Review', duration: '27:22', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4' },
        ]
      },
      {
        id: 's2', title: 'Risk Management & Practical Insights', duration: '5h 45m',
        lectures: [
          { id: 'l3', title: 'Transaction Risk Identification & Mitigation', duration: '29:40', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
          { id: 'l4', title: 'Lessons from Real Deals', duration: '24:33', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4' },
        ]
      }
    ],
    isPaid: true,
    featured: false,
  },
  {
    id: 'c008',
    title: 'Due Diligence and Contractual Risk Management in Agreements and Cross-Border Transactions, Agreements & Investments',
    subtitle: 'Conduct robust due diligence and manage contractual risk in domestic and cross-border deals',
    description: 'This programme equips legal, compliance and investment professionals with the skills to run thorough due diligence and manage contractual risk. It covers legal, financial and regulatory due diligence, drafting and reviewing agreements, and the additional complexities of cross-border transactions and investments.',
    instructor: { id: 'inst-008', name: 'Barr. Kelechi Anyim', avatar: null, rating: 4.7, students: 1760 },
    category: 'Corporate Law',
    subcategory: 'Commercial Transactions',
    level: 'Intermediate',
    language: 'English',
    price: 220,
    originalPrice: 360,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80',
    previewVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    rating: 4.7,
    reviewCount: 264,
    enrolledCount: 1760,
    duration: '17 hours',
    lectureCount: 34,
    lastUpdated: '2026-04-30',
    certificate: true,
    tags: ['Due Diligence', 'Contract Management', 'Risk', 'Cross-Border', 'Investments'],
    requirements: ['Legal or commercial background helpful', 'Interest in transactions and contracts'],
    objectives: [
      'Plan and execute legal, financial and regulatory due diligence',
      'Identify and allocate contractual risk',
      'Draft and review robust commercial agreements',
      'Manage the complexities of cross-border transactions'
    ],
    sections: [
      {
        id: 's1', title: 'Due Diligence Fundamentals', duration: '5h 00m',
        lectures: [
          { id: 'l1', title: 'Scoping & Planning Due Diligence', duration: '16:20', type: 'video', preview: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4' },
          { id: 'l2', title: 'Legal, Financial & Regulatory Review', duration: '25:15', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
        ]
      },
      {
        id: 's2', title: 'Contractual Risk & Cross-Border Deals', duration: '4h 30m',
        lectures: [
          { id: 'l3', title: 'Contractual Risk Allocation & Drafting', duration: '23:40', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4' },
          { id: 'l4', title: 'Cross-Border Transactions & Investments', duration: '27:22', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
        ]
      }
    ],
    isPaid: true,
    featured: false,
  },
  {
    id: 'c009',
    title: 'The New Tax Laws: Hindsight, Foresight & Strategic Implications',
    subtitle: 'Understand recent tax reforms and their strategic implications for businesses and advisers',
    description: 'A timely programme analysing recent tax law reforms — their background, current application and future direction. It helps tax professionals, accountants, lawyers and business leaders understand the changes, remain compliant and develop tax-efficient strategies aligned with the new legal framework.',
    instructor: { id: 'inst-009', name: 'Mr. Gbenga Adeyinka, FCTI', avatar: null, rating: 4.8, students: 2980 },
    category: 'Taxation',
    subcategory: 'Tax Law & Policy',
    level: 'All Levels',
    language: 'English',
    price: 200,
    originalPrice: 340,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
    previewVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    rating: 4.8,
    reviewCount: 401,
    enrolledCount: 2980,
    duration: '15 hours',
    lectureCount: 30,
    lastUpdated: '2026-06-10',
    certificate: true,
    tags: ['Taxation', 'Tax Reform', 'Compliance', 'Tax Planning', 'Policy'],
    requirements: ['No prior tax qualification required', 'Interest in tax and business strategy'],
    objectives: [
      'Understand the background and rationale of recent tax reforms',
      'Apply the new tax laws correctly and remain compliant',
      'Anticipate the future direction of tax policy',
      'Develop tax-efficient strategies within the new framework'
    ],
    sections: [
      {
        id: 's1', title: 'Hindsight: Understanding the Reforms', duration: '4h 30m',
        lectures: [
          { id: 'l1', title: 'Overview of the New Tax Laws', duration: '15:42', type: 'video', preview: true, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
          { id: 'l2', title: 'What Changed and Why', duration: '24:10', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4' },
        ]
      },
      {
        id: 's2', title: 'Foresight & Strategic Implications', duration: '4h 15m',
        lectures: [
          { id: 'l3', title: 'Compliance Under the New Framework', duration: '22:30', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
          { id: 'l4', title: 'Strategic Tax Planning', duration: '26:18', type: 'video', preview: false, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
          { id: 'l5', title: 'New Tax Laws Assessment', duration: '15 questions', type: 'quiz', preview: false },
        ]
      }
    ],
    isPaid: true,
    featured: true,
  },
]

// Re-seed cached courses when the catalog changes (bump this on content updates).
// Seeded courses are 'published' (approved & live); instructor-created courses
// start as 'pending' and must be approved by an admin before going public.
const SEED_VERSION = '2026-06-professional-catalog-v2'
if (localStorage.getItem('fe_courses_version') !== SEED_VERSION) {
  localStorage.setItem('fe_courses', JSON.stringify(MOCK_COURSES.map(c => ({ ...c, status: 'published' }))))
  localStorage.setItem('fe_courses_version', SEED_VERSION)
}

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

  const categories = ['All', 'Corporate Law', 'Finance & Capital Markets', 'Mergers & Acquisitions', 'Corporate Governance', 'Taxation', 'Energy & ESG', 'Dispute Resolution']
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'All Levels']

  // A course is publicly visible only once an admin has approved it (status
  // 'published'). Courses created before this field existed are treated as published.
  const isPublic = (c) => (c.status || 'published') === 'published'

  const filteredCourses = computed(() => {
    let result = courses.value.filter(isPublic)

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

  const featuredCourses = computed(() => courses.value.filter(c => c.featured && isPublic(c)))

  // Courses awaiting admin approval (instructor submissions).
  const pendingCourses = computed(() => courses.value.filter(c => c.status === 'pending'))

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
        status: 'pending',        // awaits admin approval before going live
        submittedAt: new Date().toISOString(),
        rejectionReason: '',
        sections: courseData.sections || [],
      }
      courses.value.push(newCourse)
      localStorage.setItem('fe_courses', JSON.stringify(courses.value))
      toast.success('Course submitted for review! An admin will approve it shortly.')
      return newCourse
    } catch (err) {
      toast.error('Failed to submit course')
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

  async function deleteCourse(courseId) {
    loading.value = true
    try {
      await new Promise(r => setTimeout(r, 400))
      courses.value = courses.value.filter(c => c.id !== courseId)
      localStorage.setItem('fe_courses', JSON.stringify(courses.value))
      toast.success('Course removed successfully')
    } catch (err) {
      toast.error('Failed to remove course')
    } finally {
      loading.value = false
    }
  }

  // Admin moderation: approve a pending course (makes it publicly visible).
  async function approveCourse(courseId) {
    loading.value = true
    try {
      await new Promise(r => setTimeout(r, 400))
      const idx = courses.value.findIndex(c => c.id === courseId)
      if (idx !== -1) {
        courses.value[idx] = { ...courses.value[idx], status: 'published', rejectionReason: '' }
        localStorage.setItem('fe_courses', JSON.stringify(courses.value))
        toast.success('Course approved and published!')
      }
    } catch (err) {
      toast.error('Failed to approve course')
    } finally {
      loading.value = false
    }
  }

  // Admin moderation: reject a pending course with an optional reason.
  async function rejectCourse(courseId, reason = '') {
    loading.value = true
    try {
      await new Promise(r => setTimeout(r, 400))
      const idx = courses.value.findIndex(c => c.id === courseId)
      if (idx !== -1) {
        courses.value[idx] = { ...courses.value[idx], status: 'rejected', rejectionReason: reason }
        localStorage.setItem('fe_courses', JSON.stringify(courses.value))
        toast.info('Course rejected. The instructor has been notified.')
      }
    } catch (err) {
      toast.error('Failed to reject course')
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
    filteredCourses, featuredCourses, pendingCourses, totalCourses, totalEnrollments, totalRevenue,
    getCourseById, isEnrolled, getEnrolledCourses, getProgress,
    enrollCourse, markLectureComplete, addCourse, updateCourse, deleteCourse,
    approveCourse, rejectCourse, addReview,
    getCourseReviews, getInstructorCourses
  }
})

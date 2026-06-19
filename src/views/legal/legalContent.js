// Static legal copy for Formation Exceptionelle.
// Each section's `body` is an array of either strings (paragraphs) or string[] (bullet lists).
// NOTE: This is placeholder/template copy — have it reviewed by legal counsel before launch.

const LAST_UPDATED = 'June 19, 2026'

export const LEGAL_DOCS = {
  terms: {
    title: 'Terms of Service',
    shortName: 'Terms of Service',
    lastUpdated: LAST_UPDATED,
    intro:
      'Welcome to Formation Exceptionelle. These Terms of Service ("Terms") govern your access to and use of the Formation Exceptionelle website, learning platform, job board, and related services (collectively, the "Platform"). By creating an account or using the Platform, you agree to be bound by these Terms.',
    sections: [
      {
        heading: 'Acceptance of Terms',
        body: [
          'By accessing or using the Platform, you confirm that you are at least 16 years old and capable of entering into a binding agreement. If you are using the Platform on behalf of an organization, you represent that you have authority to bind that organization to these Terms.',
          'If you do not agree with any part of these Terms, you must not use the Platform.',
        ],
      },
      {
        heading: 'Accounts and Registration',
        body: [
          'To access most features you must create an account. You agree to:',
          [
            'Provide accurate, current, and complete information during registration.',
            'Keep your password confidential and not share your account with others.',
            'Be responsible for all activity that occurs under your account.',
            'Notify us immediately of any unauthorized use of your account.',
          ],
          'We may suspend or terminate accounts that violate these Terms or that we reasonably believe are being used fraudulently.',
        ],
      },
      {
        heading: 'Courses and Learning Content',
        body: [
          'When you enroll in a course, you receive a limited, non-exclusive, non-transferable license to access the course content for your personal, non-commercial learning.',
          'You may not download (except where explicitly permitted), copy, redistribute, resell, or publicly display course content. Certificates of completion are issued for personal achievement and may not be falsified or misrepresented.',
        ],
      },
      {
        heading: 'Instructors and User Content',
        body: [
          'Instructors are responsible for the content they publish and warrant that they have the rights to all material they upload. By submitting content, you grant Formation Exceptionelle a worldwide license to host, display, and distribute that content on the Platform.',
          'You retain ownership of your content. We may remove content that violates these Terms, infringes intellectual property, or is otherwise objectionable.',
        ],
      },
      {
        heading: 'Payments, Refunds, and Pricing',
        body: [
          'Paid courses are billed in US Dollars (USD) unless otherwise stated. Job-related compensation figures are displayed for informational purposes only.',
          'Where applicable, we offer a 30-day refund window on eligible paid courses, subject to our refund policy. Promotional prices are time-limited and may change without notice.',
          'You authorize us and our payment processors to charge your selected payment method for any purchases you make.',
        ],
      },
      {
        heading: 'Jobs and Applications',
        body: [
          'The job board is provided as a convenience to connect candidates and employers. Formation Exceptionelle does not guarantee employment, the accuracy of any listing, or the conduct of any employer or applicant.',
          'Employers posting roles are responsible for the legality and accuracy of their listings. Applicants are responsible for the accuracy of the information they submit.',
        ],
      },
      {
        heading: 'Acceptable Use',
        body: [
          'You agree not to:',
          [
            'Use the Platform for any unlawful purpose or in violation of any applicable law.',
            'Upload malicious code, attempt to gain unauthorized access, or disrupt the Platform.',
            'Harass, abuse, or harm other users, instructors, or staff.',
            'Scrape, data-mine, or reverse-engineer the Platform without permission.',
          ],
        ],
      },
      {
        heading: 'Intellectual Property',
        body: [
          'The Platform, including its branding, design, and software, is owned by Formation Exceptionelle and protected by intellectual property laws. Except for content you own, nothing in these Terms grants you any right to our intellectual property.',
        ],
      },
      {
        heading: 'Disclaimers and Limitation of Liability',
        body: [
          'The Platform is provided "as is" without warranties of any kind. To the maximum extent permitted by law, Formation Exceptionelle is not liable for any indirect, incidental, or consequential damages arising from your use of the Platform.',
        ],
      },
      {
        heading: 'Changes to These Terms',
        body: [
          'We may update these Terms from time to time. Material changes will be communicated through the Platform or by email. Continued use after changes take effect constitutes acceptance of the revised Terms.',
        ],
      },
    ],
  },

  privacy: {
    title: 'Privacy Policy',
    shortName: 'Privacy Policy',
    lastUpdated: LAST_UPDATED,
    intro:
      'This Privacy Policy explains how Formation Exceptionelle collects, uses, and protects your personal information when you use our Platform. We are committed to safeguarding your privacy and handling your data responsibly.',
    sections: [
      {
        heading: 'Information We Collect',
        body: [
          'We collect information you provide and information generated through your use of the Platform, including:',
          [
            'Account information: name, email, phone number, profession, and password.',
            'Profile and instructor data: bio, expertise, and application details.',
            'Learning activity: enrollments, course progress, quiz results, and certificates.',
            'Job activity: applications, cover letters, CVs, and job postings.',
            'Payment information: billing details processed securely by our payment partners.',
            'Technical data: IP address, device, browser, and usage analytics.',
          ],
        ],
      },
      {
        heading: 'How We Use Your Information',
        body: [
          'We use your information to:',
          [
            'Provide, operate, and improve the Platform and its features.',
            'Process enrollments, payments, certificates, and job applications.',
            'Personalize your learning and job recommendations.',
            'Communicate with you about your account, purchases, and updates.',
            'Maintain security and prevent fraud and abuse.',
          ],
        ],
      },
      {
        heading: 'How We Share Information',
        body: [
          'We do not sell your personal information. We share data only as needed:',
          [
            'With employers when you apply to their job listings.',
            'With instructors for courses you enroll in (limited progress data).',
            'With service providers (payment, hosting, email, video, analytics).',
            'When required by law or to protect the rights and safety of others.',
          ],
        ],
      },
      {
        heading: 'Data Retention',
        body: [
          'We retain your personal information for as long as your account is active or as needed to provide services, comply with legal obligations, resolve disputes, and enforce our agreements.',
        ],
      },
      {
        heading: 'Your Rights and Choices',
        body: [
          'Depending on your location, you may have the right to access, correct, export, or delete your personal information, and to object to or restrict certain processing.',
          'You can update most information from your account settings or contact us to exercise your rights.',
        ],
      },
      {
        heading: 'Data Security',
        body: [
          'We use industry-standard safeguards, including encryption in transit and hashed passwords, to protect your data. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.',
        ],
      },
      {
        heading: 'Children’s Privacy',
        body: [
          'The Platform is not intended for children under 16. We do not knowingly collect personal information from children. If you believe a child has provided us data, please contact us so we can remove it.',
        ],
      },
      {
        heading: 'International Data Transfers',
        body: [
          'Your information may be processed in countries other than your own. Where required, we put appropriate safeguards in place for such transfers.',
        ],
      },
      {
        heading: 'Changes to This Policy',
        body: [
          'We may update this Privacy Policy periodically. We will notify you of material changes through the Platform or by email.',
        ],
      },
    ],
  },

  cookies: {
    title: 'Cookie Policy',
    shortName: 'Cookie Policy',
    lastUpdated: LAST_UPDATED,
    intro:
      'This Cookie Policy explains how Formation Exceptionelle uses cookies and similar technologies to recognize you when you visit our Platform, and your choices regarding their use.',
    sections: [
      {
        heading: 'What Are Cookies',
        body: [
          'Cookies are small data files stored on your device when you visit a website. They help the site remember your actions and preferences over time. We also use similar technologies such as local storage and pixels.',
        ],
      },
      {
        heading: 'Types of Cookies We Use',
        body: [
          [
            'Essential cookies: required for core functionality such as authentication and keeping you signed in.',
            'Preference cookies: remember your settings, such as language and display options.',
            'Analytics cookies: help us understand how the Platform is used so we can improve it.',
            'Marketing cookies: used to deliver relevant content and measure campaign performance.',
          ],
        ],
      },
      {
        heading: 'How We Use Cookies',
        body: [
          'We use cookies to keep you logged in, remember your cart and preferences, secure your session, analyze traffic, and improve your overall experience on the Platform.',
        ],
      },
      {
        heading: 'Managing Cookies',
        body: [
          'Most browsers let you control cookies through their settings, including blocking or deleting them. Note that disabling essential cookies may affect the functionality of the Platform, including the ability to sign in.',
        ],
      },
      {
        heading: 'Third-Party Cookies',
        body: [
          'Some cookies may be set by third-party services we use, such as analytics, video hosting, and payment providers. These third parties have their own privacy and cookie policies.',
        ],
      },
      {
        heading: 'Changes to This Policy',
        body: [
          'We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.',
        ],
      },
    ],
  },
}

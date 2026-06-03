export interface Project {
  slug: string
  title: string
  company: string
  year: string
  description: string
  images: string[]
}

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'

export const projects: Project[] = [
  {
    slug: 'access-rights',
    title: 'Access Rights',
    company: 'Sweep',
    year: '2025',
    description: LOREM,
    images: [
      '/images/access-rights-1.jpg',
      '/images/access-rights-2.jpg',
      '/images/access-rights-3.jpg',
    ],
  },
  {
    slug: 'dashboards-organisation',
    title: 'Dashboards organisation',
    company: 'Sweep',
    year: '2026',
    description: LOREM,
    images: [
      '/images/dashboards-organisation-1.jpg',
      '/images/dashboards-organisation-2.jpg',
      '/images/dashboards-organisation-3.jpg',
    ],
  },
  {
    slug: 'actions-library',
    title: 'Actions library',
    company: 'Sweep',
    year: '2025',
    description: LOREM,
    images: [
      '/images/actions-library-1.jpg',
      '/images/actions-library-2.jpg',
      '/images/actions-library-3.jpg',
    ],
  },
  {
    slug: 'act-vision-2',
    title: 'Act vision 2.0',
    company: 'Sweep',
    year: '2024',
    description: LOREM,
    images: [
      '/images/act-vision-1.jpg',
      '/images/act-vision-2.jpg',
      '/images/act-vision-3.jpg',
    ],
  },
  {
    slug: 'dashboards-exploration',
    title: 'Dashboards exploration',
    company: 'Sweep',
    year: '2024',
    description: LOREM,
    images: [
      '/images/dashboards-exploration-1.jpg',
      '/images/dashboards-exploration-2.jpg',
      '/images/dashboards-exploration-3.jpg',
    ],
  },
  {
    slug: 'sepa-instant-out',
    title: 'SEPA Instant Out',
    company: 'Qonto',
    year: '2022',
    description: LOREM,
    images: ['/images/dashboard.jpg', '/images/dashboard.jpg', '/images/dashboard.jpg'],
  },
  {
    slug: 'transfers-redesign',
    title: 'Transfers redesign',
    company: 'Qonto',
    year: '2022',
    description: LOREM,
    images: ['/images/dashboard.jpg', '/images/dashboard.jpg', '/images/dashboard.jpg'],
  },
]

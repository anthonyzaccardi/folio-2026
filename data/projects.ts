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

const IMAGES = ['/images/dashboard.jpg', '/images/dashboard.jpg', '/images/dashboard.jpg']

export const projects: Project[] = [
  {
    slug: 'access-rights',
    title: 'Access Rights',
    company: 'Sweep',
    year: '2025',
    description: LOREM,
    images: IMAGES,
  },
  {
    slug: 'dashboards-organisation',
    title: 'Dashboards organisation',
    company: 'Sweep',
    year: '2026',
    description: LOREM,
    images: IMAGES,
  },
  {
    slug: 'actions-library',
    title: 'Actions library',
    company: 'Sweep',
    year: '2025',
    description: LOREM,
    images: IMAGES,
  },
  {
    slug: 'act-vision-2',
    title: 'Act vision 2.0',
    company: 'Sweep',
    year: '2024',
    description: LOREM,
    images: IMAGES,
  },
  {
    slug: 'dashboards-exploration',
    title: 'Dashboards exploration',
    company: 'Sweep',
    year: '2024',
    description: LOREM,
    images: IMAGES,
  },
  {
    slug: 'framework',
    title: 'Framework',
    company: 'Pennylane',
    year: '2023',
    description: LOREM,
    images: IMAGES,
  },
  {
    slug: 'sepa-instant-out',
    title: 'SEPA Instant Out',
    company: 'Qonto',
    year: '2022',
    description: LOREM,
    images: IMAGES,
  },
  {
    slug: 'transfers-redesign',
    title: 'Transfers redesign',
    company: 'Qonto',
    year: '2022',
    description: LOREM,
    images: IMAGES,
  },
]

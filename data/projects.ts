export interface Project {
  slug: string
  title: string
  company: string
  year: string
  description: string
  images: string[] // paths in /public/images/
}

export const projects: Project[] = [
  {
    slug: 'dashboards-organisation',
    title: 'Dashboards organisation',
    company: 'Sweep',
    year: '2026',
    description:
      'Cupidatat qui ut nisi quis aliquip laboris officia ullamco id deserunt nostrud ad magna reprehenderit in. Ipsum sint consectetur tempor occaecat in. Eiusmod qui ut incididunt veniam culpa elit. Sit cupidatat irure dolore.',
    images: [
      '/images/dashboards-sweep-1.png',
      '/images/dashboards-sweep-2.png',
    ],
  },
  {
    slug: 'access-rights',
    title: 'Access Rights',
    company: 'Sweep',
    year: '2025',
    description: '',
    images: [],
  },
  {
    slug: 'actions-library',
    title: 'Actions library',
    company: 'Sweep',
    year: '2025',
    description: '',
    images: [],
  },
  {
    slug: 'act-vision-2',
    title: 'Act vision 2.0',
    company: 'Sweep',
    year: '2024',
    description: '',
    images: [],
  },
  {
    slug: 'dashboards-exploration',
    title: 'Dashboards exploration',
    company: 'Sweep',
    year: '2024',
    description: '',
    images: [],
  },
  {
    slug: 'framework',
    title: 'Framework',
    company: 'Pennylane',
    year: '2023',
    description: '',
    images: [],
  },
  {
    slug: 'sepa-instant-out',
    title: 'SEPA Instant Out',
    company: 'Qonto',
    year: '2022',
    description: '',
    images: [],
  },
  {
    slug: 'transfers-redesign',
    title: 'Transfers redesign',
    company: 'Qonto',
    year: '2022',
    description: '',
    images: [],
  },
]

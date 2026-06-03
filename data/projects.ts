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
    description:
      'Transition planning involves multiple stakeholders with varying levels of ownership and visibility. This project defines a permission model for the Act module, ensuring the right people have the right access, without compromising collaboration or data integrity.',
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
    description:
      'As the number of dashboards grows, users struggle to find, organize, and manage their content efficiently. This project tackles the information architecture of the dashboard layer, giving users meaningful ways to structure, navigate, and prioritize their views at scale.',
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
    description:
      'Recurring actions shouldn\'t be rebuilt from scratch every time. This project explores a centralized library of reusable actions, helping teams standardize their processes, reduce manual effort, and maintain consistency across transition plans.',
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
    description:
      'The Act module needed a north star. This project reframes the long-term product direction for transition planning, aligning business goals, user needs, and technical constraints into a coherent vision that guides prioritization and future design decisions.',
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
    description:
      'Before defining what dashboards should become, we needed to understand how users actually interact with data today. This exploratory project surfaces key insights around usage patterns, mental models, and unmet needs, laying the foundation for a more intentional dashboard experience.',
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

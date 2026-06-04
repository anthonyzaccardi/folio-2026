export interface Project {
  slug: string
  title: string
  company: string
  year: string
  description: string
  images: (string | [string, string])[]
}

export const projects: Project[] = [
  {
    slug: 'access-rights',
    title: 'Access Rights',
    company: 'Sweep',
    year: '2026',
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
    year: '2026',
    description:
      "Recurring actions shouldn't be rebuilt from scratch every time. This project explores a centralized library of reusable actions, helping teams standardize their processes, reduce manual effort, and maintain consistency across transition plans.",
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
    year: '2025',
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
    year: '2025',
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
    description:
      'Instant transfers were one of the most requested features at Qonto, yet making them the default experience raised real product questions: who gets it, when, at what cost, and in what context. This project tackled both the strategic and UX challenges of rolling out instant SEPA transfers as the new norm, free and activated by default for all users, while preserving the classic transfer option and carefully measuring adoption to drive value for users and reduce customer support load.',
    images: [
      '/images/sepa-out-1.png',
      ['/images/sepa-out-2.png', '/images/sepa-out-3.png'],
    ],
  },

  {
    slug: 'gbr-germany',
    title: 'GBR Germany',
    company: 'Qonto',
    year: '2022',
    description:
      'Qonto was expanding into Germany with support for GbR businesses — a legal partnership entity with unique KYB requirements and a tight 3–4 week development window. This project delivered a dedicated onboarding flow for GbR accounts, adapted from existing flows to meet German regulatory constraints and drive early KYB validation at scale.',
    images: [
      '/images/gbr-germany-1.png',
      ['/images/gbr-germany-2.png', '/images/gbr-germany-3.png'],
    ],
  },

  {
    slug: 'design-planning',
    title: 'Design Planning',
    company: 'Personal',
    year: '2026',
    description:
      'A Gantt timeline tool built for design teams, with no third-party software required. Full timeline with Day / Week / Month views, drag-and-drop phases and milestones, workload dashboard, OOO management, activity log, and real-time collaborative editing — all hosted on GitHub Pages.',
    images: [
      '/images/designers-sweep-1.png',
      '/images/designers-sweep-2.png',
    ],
  },

  {
    slug: 'post-generator',
    title: 'Post Generator',
    company: 'Personal',
    year: '2025',
    description:
      'A web app that takes any blog article — pasted text or a URL — and turns it into social media posts in different tones: punchy, educational, storytelling. Includes a full dashboard with analytics, copy tracking, generation history, and a Raycast extension for native access at zero cost.',
    images: [
      '/images/tweet-generator-1.png',
      ['/images/tweet-generator-2.png', '/images/tweet-generator-3.png'],
    ],
  },

]

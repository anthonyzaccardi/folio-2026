'use client'

import AboutSection from './AboutSection'
import AllProjects from './AllProjects'
import type { Project } from '@/data/projects'

interface Props {
  projects: Project[]
}

export default function PortfolioLayout({ projects }: Props) {
  return (
    <main
      style={{
        maxWidth: 1920,
        margin: '0 auto',
        padding: '64px 64px 120px',
      }}
    >
      <AboutSection />
      <div style={{ height: 64 }} />
      <AllProjects projects={projects} />
    </main>
  )
}

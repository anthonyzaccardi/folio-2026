'use client'

import ImageCarousel from './ImageCarousel'
import type { Project } from '@/data/projects'

interface Props {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          <div
            style={{
              background: 'var(--c-text-1)',
              color: 'var(--c-bg)',
              fontSize: 11,
              fontWeight: 700,
              lineHeight: '18px',
              minWidth: 20,
              height: 18,
              padding: '0 4px',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'background 0.2s ease, color 0.2s ease',
            }}
          >
            {index + 1}
          </div>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              lineHeight: '18px',
              color: 'var(--c-text-1)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {project.title}
          </span>
        </div>
        <span
          style={{
            fontSize: 12,
            lineHeight: '18px',
            color: 'var(--c-text-3)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          [{project.company} {project.year}]
        </span>
      </div>

      {/* Carousel */}
      <ImageCarousel
        images={project.images}
        alt={project.title}
        projectInfo={{
          title: project.title,
          company: project.company,
          year: project.year,
          description: project.description,
        }}
      />
    </div>
  )
}

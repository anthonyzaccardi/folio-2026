'use client'

import { motion } from 'framer-motion'
import type { Project } from '@/data/projects'

interface Props {
  project: Project
  index: number
}

function ImageFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ width: '100%', background: '#F6F6F6', borderRadius: 2, overflow: 'hidden' }}>
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </div>
  )
}

export default function ProjectSection({ project, index }: Props) {
  return (
    <motion.div
      id={project.slug}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <div
            style={{
              background: '#000', color: '#fff', fontSize: 12, fontWeight: 700,
              lineHeight: '18px', minWidth: 20, padding: '1px 4px', borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}
          >
            {index + 1}
          </div>
          <div style={{ flexShrink: 0 }}>
            <p style={{ fontSize: 12, fontWeight: 700, lineHeight: '18px', color: '#000', margin: 0, whiteSpace: 'nowrap' }}>
              {project.title}
            </p>
            <p style={{ fontSize: 12, fontWeight: 700, lineHeight: '18px', color: '#BDBDBD', margin: 0, whiteSpace: 'nowrap' }}>
              {project.company} / {project.year}
            </p>
          </div>
        </div>
        {project.description && (
          <p style={{ fontSize: 14, lineHeight: '20px', color: '#BDBDBD', flex: 1, maxWidth: 624 }}>
            {project.description}
          </p>
        )}
      </div>
      {project.images.map((src, i) => (
        <ImageFrame key={i} src={src} alt={`${project.title} — ${i + 1}`} />
      ))}
    </motion.div>
  )
}

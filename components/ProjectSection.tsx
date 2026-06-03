'use client'

import { motion } from 'framer-motion'
import type { Project } from '@/data/projects'

interface Props {
  project: Project
  index: number
}

function ImageFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      style={{
        background: '#F6F6F6',
        height: 602,
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        flexShrink: 0,
        borderRadius: 2,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '86%',
          maxWidth: 791,
          height: '82%',
          maxHeight: 494,
          borderRadius: 4,
          border: '1px solid #E0E0E0',
          boxShadow: '0px 1px 3px -1px rgba(0,0,0,0.12), 0px 0px 30px -5px rgba(0,0,0,0.10)',
          overflow: 'hidden',
          background: '#fff',
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
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
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24 }}>
        {/* Counter + title — nowrap so long titles stay on one line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <div
            style={{
              background: '#000',
              color: '#fff',
              fontSize: 12,
              fontWeight: 700,
              lineHeight: '18px',
              minWidth: 20,
              padding: '1px 4px',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontVariantNumeric: 'tabular-nums',
              flexShrink: 0,
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

        {/* Description */}
        {project.description && (
          <p style={{ fontSize: 14, lineHeight: '20px', color: '#BDBDBD', flex: 1, maxWidth: 624 }}>
            {project.description}
          </p>
        )}
      </div>

      {/* Images */}
      {project.images.map((src, i) => (
        <ImageFrame key={i} src={src} alt={`${project.title} — ${i + 1}`} />
      ))}
    </motion.div>
  )
}

'use client'

import { motion } from 'framer-motion'
import type { Project } from '@/data/projects'

interface Props {
  project: Project
  index: number
}

function ImageFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ background: 'var(--c-surface)', borderRadius: 2, overflow: 'hidden', width: '100%', transition: 'background 0.2s ease' }}>
      <img src={src} alt={alt} style={{ width: '100%', height: 'auto', display: 'block' }} />
    </div>
  )
}

function ImagePair({ srcs, alts }: { srcs: [string, string]; alts: [string, string] }) {
  return (
    <div style={{ display: 'flex', gap: 12, width: '100%' }}>
      <div style={{ flex: 1, background: 'var(--c-surface)', borderRadius: 2, overflow: 'hidden', transition: 'background 0.2s ease' }}>
        <img src={srcs[0]} alt={alts[0]} style={{ width: '100%', height: 'auto', display: 'block' }} />
      </div>
      <div style={{ flex: 1, background: 'var(--c-surface)', borderRadius: 2, overflow: 'hidden', transition: 'background 0.2s ease' }}>
        <img src={srcs[1]} alt={alts[1]} style={{ width: '100%', height: 'auto', display: 'block' }} />
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
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      {/* Counter + title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          background: 'var(--c-text-1)', color: 'var(--c-bg)',
          fontSize: 12, fontWeight: 700, lineHeight: '18px',
          minWidth: 20, padding: '1px 4px', borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          transition: 'background 0.2s ease, color 0.2s ease',
        }}>
          {index + 1}
        </div>
        <div style={{ flexShrink: 0 }}>
          <p style={{ fontSize: 12, fontWeight: 700, lineHeight: '18px', color: 'var(--c-text-1)', margin: 0, whiteSpace: 'nowrap' }}>
            {project.title}
          </p>
          <p style={{ fontSize: 12, fontWeight: 700, lineHeight: '18px', color: 'var(--c-text-3)', margin: 0, whiteSpace: 'nowrap' }}>
            {project.company} / {project.year}
          </p>
        </div>
      </div>

      {/* Description — below title, 16px margins */}
      {project.description && (
        <p style={{ fontSize: 14, lineHeight: '20px', color: 'var(--c-text-2)', marginTop: 16, marginBottom: 16 }}>
          {project.description}
        </p>
      )}

      {/* Images */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {project.images.map((row, i) =>
          Array.isArray(row) ? (
            <ImagePair key={i} srcs={row as [string, string]} alts={[`${project.title} — ${i + 1}a`, `${project.title} — ${i + 1}b`]} />
          ) : (
            <ImageFrame key={i} src={row} alt={`${project.title} — ${i + 1}`} />
          )
        )}
      </div>
    </motion.div>
  )
}

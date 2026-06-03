'use client'

import { AnimatePresence, motion } from 'framer-motion'
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
      }}
    >
      {/* Centered screenshot with shadow */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 791,
          height: 494,
          borderRadius: 4,
          border: '1px solid #E0E0E0',
          boxShadow:
            '0px 1px 3px -1px rgba(0,0,0,0.12), 0px 0px 30px -5px rgba(0,0,0,0.10)',
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

function PlaceholderFrame() {
  return (
    <div
      style={{
        background: '#F6F6F6',
        height: 602,
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p style={{ fontSize: 12, color: '#BDBDBD' }}>Image coming soon</p>
    </div>
  )
}

export default function ProjectView({ project, index }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project.slug}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          {/* Counter + title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            {/* Counter badge */}
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
              }}
            >
              {index + 1}
            </div>
            {/* Title + company/year */}
            <div style={{ width: 136 }}>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  lineHeight: '18px',
                  color: '#000',
                  margin: 0,
                }}
              >
                {project.title}
              </p>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  lineHeight: '18px',
                  color: '#BDBDBD',
                  margin: 0,
                }}
              >
                {project.company} / {project.year}
              </p>
            </div>
          </div>

          {/* Description */}
          {project.description && (
            <p
              style={{
                fontSize: 14,
                lineHeight: '20px',
                color: '#BDBDBD',
                width: 624,
                flexShrink: 0,
              }}
            >
              {project.description}
            </p>
          )}
        </div>

        {/* Images */}
        {project.images.length > 0 ? (
          project.images.map((src, i) => (
            <ImageFrame key={i} src={src} alt={`${project.title} screenshot ${i + 1}`} />
          ))
        ) : (
          <PlaceholderFrame />
        )}
      </motion.div>
    </AnimatePresence>
  )
}

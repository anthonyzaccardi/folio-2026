'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Sidebar from './Sidebar'
import AllProjects from './AllProjects'
import type { Project } from '@/data/projects'
import type { ContributionDay } from '@/types/github'

interface Props {
  projects: Project[]
  contributions: ContributionDay[] | null
}

export default function PortfolioLayout({ projects, contributions }: Props) {
  const [activeSlug, setActiveSlug] = useState(projects[0].slug)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Scroll right panel to the project section
  const scrollTo = useCallback((slug: string) => {
    const el = document.getElementById(slug)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  // IntersectionObserver: track which section is in the top half of the scroll panel
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSlug(entry.target.id)
        })
      },
      {
        root: container,
        threshold: 0,
        rootMargin: '0px 0px -65% 0px',
      }
    )

    projects.forEach((p) => {
      const el = document.getElementById(p.slug)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [projects])

  return (
    <>
      {/* Fixed left sidebar */}
      <div
        style={{
          position: 'fixed',
          left: 64,
          top: 64,
          width: 329,
          maxHeight: 'calc(100vh - 128px)',
          overflowY: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        <Sidebar
          projects={projects}
          activeSlug={activeSlug}
          onSelect={scrollTo}
          contributions={contributions}
        />
      </div>

      {/* Scrollable right panel */}
      <div
        ref={scrollRef}
        className="scroll-panel"
        style={{
          position: 'fixed',
          left: 64 + 329 + 64, // 457px
          right: 64,
          top: 0,
          bottom: 0,
          overflowY: 'scroll',
          paddingTop: 64,
          paddingBottom: 120,
        }}
      >
        <AllProjects projects={projects} />
      </div>
    </>
  )
}

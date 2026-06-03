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

  const scrollTo = useCallback((slug: string) => {
    const el = document.getElementById(slug)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSlug(entry.target.id)
        })
      },
      { root: container, threshold: 0, rootMargin: '0px 0px -65% 0px' }
    )

    projects.forEach((p) => {
      const el = document.getElementById(p.slug)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [projects])

  return (
    <>
      {/* Fixed left panel — full height, 80px padding bottom for graph */}
      <div
        style={{
          position: 'fixed',
          left: 64,
          top: 0,
          bottom: 0,
          width: 329,
          paddingTop: 64,
          paddingBottom: 80,
        }}
      >
        <Sidebar
          projects={projects}
          activeSlug={activeSlug}
          onSelect={scrollTo}
          contributions={contributions}
        />
      </div>

      {/* Scrollable right panel — hidden scrollbar */}
      <div
        ref={scrollRef}
        className="scroll-panel"
        style={{
          position: 'fixed',
          left: 457, // 64 + 329 + 64
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

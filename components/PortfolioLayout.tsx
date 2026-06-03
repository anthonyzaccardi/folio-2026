'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Sidebar from './Sidebar'
import AllProjects from './AllProjects'
import type { Project } from '@/data/projects'
import type { ContributionDay } from '@/types/github'

const ANCHOR_OFFSET = 40

interface Props {
  projects: Project[]
  contributions: ContributionDay[] | null
}

export default function PortfolioLayout({ projects, contributions }: Props) {
  const [activeSlug, setActiveSlug] = useState(projects[0].slug)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollTo = useCallback((slug: string) => {
    const el = document.getElementById(slug)
    const container = scrollRef.current
    if (!el || !container) return
    const containerRect = container.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    const target = elRect.top - containerRect.top + container.scrollTop - ANCHOR_OFFSET
    container.scrollTo({ top: target, behavior: 'smooth' })
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
      {/* Left panel — fixed on desktop, static on mobile via CSS */}
      <div
        className="panel-left"
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

      {/* Right panel — fixed scroll on desktop, static on mobile via CSS */}
      <div
        ref={scrollRef}
        className="panel-right scroll-panel"
        style={{
          position: 'fixed',
          left: 457,
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

'use client'

import { useState } from 'react'
import GitHubGraph from './GitHubGraph'
import type { Project } from '@/data/projects'
import type { ContributionDay } from '@/types/github'

// On hover, only t,o,n,y,Z,c,c stay black → hidden "tonyz.cc" easter egg
function AnimatedName() {
  const [hov, setHov] = useState(false)
  // Indices in "Anthony Zaccardi" that stay BLACK
  // A(0) n(1) t(2) h(3) o(4) n(5) y(6)   Z(8) a(9) c(10) c(11) a(12) r(13) d(14) i(15)
  const BLACK_IDX = new Set([2, 4, 5, 6, 8, 10, 11])

  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ cursor: 'default' }}
    >
      {'Anthony Zaccardi'.split('').map((char, i) => (
        <span
          key={i}
          style={{
            color: !hov || char === ' ' ? '#000' : BLACK_IDX.has(i) ? '#000' : '#BDBDBD',
            transition: 'color 0.15s ease',
          }}
        >
          {char}
        </span>
      ))}
    </span>
  )
}

// Link that goes gray on hover
function NavLink({
  href,
  children,
  mail = false,
}: {
  href: string
  children: React.ReactNode
  mail?: boolean
}) {
  const [hov, setHov] = useState(false)
  return (
    <a
      href={href}
      {...(!mail ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        color: hov ? '#BDBDBD' : '#000',
        transition: 'color 0.15s ease',
        textDecoration: 'none',
      }}
    >
      {children}
    </a>
  )
}

interface Props {
  projects: Project[]
  activeSlug: string
  onSelect: (slug: string) => void
  contributions: ContributionDay[] | null
}

export default function Sidebar({ projects, activeSlug, onSelect, contributions }: Props) {
  return (
    <aside style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Scrollable content */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
        }}
      >
        {/* Name + title */}
        <div style={{ height: 42 }}>
          <p style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: '#000' }}>
            <AnimatedName />
          </p>
          <p style={{ fontSize: 14, lineHeight: '20px', color: '#6E6E6E' }}>Product Designer</p>
        </div>

        {/* Bio */}
        <div style={{ fontSize: 14, lineHeight: '20px', color: '#6E6E6E' }}>
          <p style={{ fontSize: 12, lineHeight: '18px', color: '#BDBDBD', marginBottom: 4 }}>
            /. me, myself &amp; I
          </p>
          <p>
            {'Currently Product Design Manager at '}
            <NavLink href="https://sweep.net/">Sweep</NavLink>
            {'. Previously '}
            <NavLink href="https://www.pennylane.com/fr">Pennylane</NavLink>
            {' & '}
            <NavLink href="https://qonto.com/fr">Qonto</NavLink>
            .
          </p>
          <br />
          <p>
            I design products that make complex things feel simple. My work sits at the intersection
            of product strategy, systems thinking and interaction design.
          </p>
          <br />
          <p>
            Lately, I&apos;ve been obsessed with AI-powered workflows, rapid prototyping and finding
            better ways to make decisions.
            <br />
            Occasionally, I build things that probably shouldn&apos;t exist just to see what
            happens.
          </p>
          <br />
          <p>
            {'Reach me by '}
            <NavLink href="mailto:zaccardi.anthony@gmail.com" mail>
              mail
            </NavLink>
            {' or dm on '}
            <NavLink href="https://x.com/anthonyzaccardi">x.com</NavLink>
            <span style={{ color: '#6E6E6E' }}> / </span>
            <NavLink href="https://www.linkedin.com/in/anthony-zaccardi/">LinkedIn</NavLink>
          </p>
        </div>

        {/* Project list */}
        <div style={{ fontSize: 14 }}>
          <p style={{ fontSize: 12, lineHeight: '18px', color: '#BDBDBD', marginBottom: 4 }}>
            //. projects
          </p>
          {projects.map((p) => (
            <button
              key={p.slug}
              onClick={() => onSelect(p.slug)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                lineHeight: '24px',
                fontSize: 14,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              {p.slug === activeSlug ? (
                <>
                  <span style={{ fontWeight: 500, color: '#000' }}>→ {p.title}</span>
                  <span style={{ color: '#BDBDBD' }}> [{p.company}]</span>
                </>
              ) : (
                <>
                  <span style={{ color: '#6E6E6E' }}>{p.title}</span>
                  <span style={{ color: '#BDBDBD' }}> [{p.company}]</span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* GitHub graph — pinned to bottom */}
      <div style={{ flexShrink: 0, paddingTop: 24 }}>
        <GitHubGraph contributions={contributions} />
      </div>
    </aside>
  )
}

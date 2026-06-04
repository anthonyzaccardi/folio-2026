'use client'

import { useState } from 'react'
import GitHubGraph from './GitHubGraph'
import ThemeToggle from './ThemeToggle'
import type { Project } from '@/data/projects'
import type { ContributionDay } from '@/types/github'

function AnimatedName() {
  const [hov, setHov] = useState(false)
  const BLACK_IDX = new Set([2, 4, 5, 6, 8, 10, 11])
  return (
    <span onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ cursor: 'pointer' }}>
      {'Anthony Zaccardi'.split('').map((char, i) => (
        <span key={i} style={{
          color: !hov || char === ' '
            ? 'var(--c-text-1)'
            : BLACK_IDX.has(i) ? 'var(--c-text-1)' : 'var(--c-text-3)',
          transition: 'color 0.15s ease',
        }}>
          {char}
        </span>
      ))}
    </span>
  )
}

function NavLink({ href, children, mail = false }: { href: string; children: React.ReactNode; mail?: boolean }) {
  const [hov, setHov] = useState(false)
  return (
    <a href={href} {...(!mail ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ color: hov ? 'var(--c-text-3)' : 'var(--c-text-1)', transition: 'color 0.15s ease', textDecoration: 'none' }}>
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
      <div className="sidebar-inner" style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', display: 'flex', flexDirection: 'column', gap: 32 }}>

        {/* Name + title + theme toggle */}
        <div style={{ height: 42 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button onClick={() => onSelect(projects[0].slug)}
              style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: 'var(--c-text-1)', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}>
              <AnimatedName />
            </button>
            <ThemeToggle />
          </div>
          <p style={{ fontSize: 14, lineHeight: '20px', color: 'var(--c-text-2)' }}>Product Designer</p>
        </div>

        {/* Bio */}
        <div style={{ fontSize: 14, lineHeight: '20px', color: 'var(--c-text-2)' }}>
          <p style={{ fontSize: 12, lineHeight: '18px', color: 'var(--c-text-3)', marginBottom: 4 }}>/. me, myself &amp; I</p>
          <p>
            {'Currently Product Design Manager at '}
            <NavLink href="https://sweep.net/">Sweep</NavLink>
            {'. Previously '}
            <NavLink href="https://www.pennylane.com/fr">Pennylane</NavLink>
            {' & '}
            <NavLink href="https://qonto.com/fr">Qonto</NavLink>.
          </p>
          <br />
          <p>I design products that make complex things feel simple. My work sits at the intersection of product strategy, systems thinking and interaction design.</p>
          <br />
          <p>Lately, I&apos;ve been obsessed with AI-powered workflows, rapid prototyping and finding better ways to make decisions.<br />Occasionally, I build things that probably shouldn&apos;t exist just to see what happens.</p>
          <br />
          <p>
            {'Reach me by '}
            <NavLink href="mailto:zaccardi.anthony@gmail.com" mail>mail</NavLink>
            {' or dm on '}
            <NavLink href="https://x.com/anthonyzaccardi">x.com</NavLink>
            <span style={{ color: 'var(--c-text-2)' }}> / </span>
            <NavLink href="https://www.linkedin.com/in/anthony-zaccardi/">LinkedIn</NavLink>
          </p>
        </div>

        {/* Project list — hidden on mobile */}
        <div className="hide-mobile" style={{ fontSize: 14 }}>
          <p style={{ fontSize: 12, lineHeight: '18px', color: 'var(--c-text-3)', marginBottom: 4 }}>{'//. projects'}</p>
          {projects.map((p) => (
            <button key={p.slug} onClick={() => onSelect(p.slug)}
              style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: 0, cursor: 'pointer', lineHeight: '24px', fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden' }}>
              {p.slug === activeSlug ? (
                <><span style={{ fontWeight: 500, color: 'var(--c-text-1)' }}>→ {p.title}</span><span style={{ color: 'var(--c-text-3)' }}> [{p.company}]</span></>
              ) : (
                <><span style={{ color: 'var(--c-text-2)' }}>{p.title}</span><span style={{ color: 'var(--c-text-3)' }}> [{p.company}]</span></>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* GitHub graph — hidden on mobile */}
      <div className="hide-mobile" style={{ flexShrink: 0, paddingTop: 24 }}>
        <GitHubGraph contributions={contributions} />
      </div>
    </aside>
  )
}

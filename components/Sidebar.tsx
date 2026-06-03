'use client'

import GitHubGraph from './GitHubGraph'
import type { Project } from '@/data/projects'
import type { ContributionDay } from '@/types/github'

interface Props {
  projects: Project[]
  activeSlug: string
  onSelect: (slug: string) => void
  contributions: ContributionDay[] | null
}

export default function Sidebar({ projects, activeSlug, onSelect, contributions }: Props) {
  return (
    <aside
      style={{
        width: 329,
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
      }}
    >
      {/* Name + title */}
      <div style={{ height: 42 }}>
        <p style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: '#000' }}>
          Anthony Zaccardi
        </p>
        <p style={{ fontSize: 14, fontWeight: 400, lineHeight: '20px', color: '#6E6E6E' }}>
          Product Designer
        </p>
      </div>

      {/* Bio */}
      <div style={{ fontSize: 14, lineHeight: '20px', color: '#6E6E6E' }}>
        <p style={{ fontSize: 12, lineHeight: '18px', color: '#BDBDBD', marginBottom: 4 }}>
          /. me, myself &amp; I
        </p>
        <p>
          Currently Product Design Manager at{' '}
          <span style={{ color: '#000' }}>Sweep</span>
          {'. Previously '}
          <span style={{ color: '#000' }}>Pennylane</span>
          {' & '}
          <span style={{ color: '#000' }}>Qonto</span>
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
          Occasionally, I build things that probably shouldn&apos;t exist just to see what happens.
        </p>
        <br />
        <p>
          {'Reach me by '}
          <a href="mailto:azaccardi@sweep.net" style={{ color: '#000' }}>
            mail
          </a>
          {' or dm on '}
          <a href="https://x.com/anthonyzaccardi" target="_blank" rel="noopener noreferrer" style={{ color: '#000' }}>
            x.com
          </a>
          <span style={{ color: '#6E6E6E' }}> / </span>
          <a
            href="https://linkedin.com/in/anthonyzaccardi"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#000' }}
          >
            LinkedIn
          </a>
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

      {/* GitHub graph */}
      <GitHubGraph contributions={contributions} />
    </aside>
  )
}

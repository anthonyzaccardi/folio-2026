'use client'

import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

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
        color: hov ? 'var(--c-text-3)' : 'var(--c-text-1)',
        transition: 'color 0.15s ease',
        textDecoration: 'none',
        fontWeight: 500,
      }}
    >
      {children}
    </a>
  )
}

const LABEL: React.CSSProperties = {
  fontSize: 12,
  lineHeight: '18px',
  color: 'var(--c-text-3)',
  marginBottom: 8,
}

const BODY: React.CSSProperties = {
  fontSize: 13,
  lineHeight: '20px',
  color: 'var(--c-text-2)',
}

export default function AboutSection() {
  return (
    <div>
      {/* Name + role + theme toggle */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: 64,
        }}
      >
        <div>
          <p style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: 'var(--c-text-1)' }}>
            Anthony Zaccardi
          </p>
          <p style={{ fontSize: 14, lineHeight: '20px', color: 'var(--c-text-2)' }}>
            Product Designer
          </p>
        </div>
        <ThemeToggle />
      </div>

      {/* Desktop: bio (span 2) | companies | reach out — 4 cols */}
      {/* Mobile: all stack via CSS media query */}
      <div className="about-grid">
        {/* Bio */}
        <div style={{ gridColumn: 'span 2' }}>
          <p style={LABEL}>/. me, myself &amp; I</p>
          <p style={BODY}>
            {'Currently Product Design Manager at '}
            <NavLink href="https://sweep.net/">Sweep</NavLink>
            {'. Previously '}
            <NavLink href="https://www.pennylane.com/fr">Pennylane</NavLink>
            {' & '}
            <NavLink href="https://qonto.com/fr">Qonto</NavLink>
            .
          </p>
          <br />
          <p style={BODY}>
            I design products that make complex things feel simple — at the intersection of strategy,
            systems thinking, and interaction design. I build fast, think in systems, and occasionally
            make things that probably shouldn&apos;t exist.
          </p>
        </div>

        {/* Companies */}
        <div>
          <p style={LABEL}>//. companies</p>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
              <p style={{ ...BODY, fontWeight: 500, color: 'var(--c-text-1)' }}>Product Designer roles</p>
              <p style={{ fontSize: 12, lineHeight: '20px', color: 'var(--c-text-3)', whiteSpace: 'nowrap' }}>
                [2019 → 2026]
              </p>
            </div>
            <p style={BODY}>Sweep, Pennylane, Qonto, Proprioo</p>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
              <p style={{ ...BODY, fontWeight: 500, color: 'var(--c-text-1)' }}>Art director roles</p>
              <p style={{ fontSize: 12, lineHeight: '20px', color: 'var(--c-text-3)', whiteSpace: 'nowrap' }}>
                [2015 → 2019]
              </p>
            </div>
            <p style={BODY}>Colorz, Source paris</p>
          </div>
        </div>

        {/* Reach out — mobile: stacks below companies via grid-template-columns: 1fr */}
        <div>
          <p style={LABEL}>///. reach out</p>
          <div style={{ display: 'grid', gridTemplateColumns: '16px 1fr', columnGap: 8, rowGap: 4, alignItems: 'center' }}>
            <span style={{ ...BODY, textAlign: 'center' }}>💌</span>
            <span style={BODY}>reach me by <NavLink href="mailto:zaccardi.anthony@gmail.com" mail>mail</NavLink></span>
            <span style={{ ...BODY, textAlign: 'center' }}>𝕏</span>
            <span style={BODY}>dm on <NavLink href="https://x.com/anthonyzaccardi">x.com</NavLink></span>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#0A66C2' }}>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </span>
            <span style={BODY}>dm on <NavLink href="https://www.linkedin.com/in/anthony-zaccardi/">Linkedin</NavLink></span>
          </div>
        </div>
      </div>
    </div>
  )
}

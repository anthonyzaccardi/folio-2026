'use client'

import { useState } from 'react'
import type { ContributionDay } from '@/types/github'

const FALLBACK_COUNTS = [
  2,0,3,1,5,2,0,4,3,6,1,2,5,3,0,4,7,2,1,3,
  5,0,2,6,4,1,3,7,2,4,3,2,5,3,7,4,2,6,8,5,
  3,1,4,7,5,3,2,8,6,4,3,5,7,3,2,4,6,1,3,5,
]

const BAR_W = 4
const BAR_GAP = 2
const H = 24
const LEVEL_OPACITY = [0.06, 0.25, 0.45, 0.65, 1]

function formatDate(d: string) {
  if (!d) return ''
  return new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

interface Props { contributions: ContributionDay[] | null }

export default function GitHubGraph({ contributions }: Props) {
  const [hovered, setHovered] = useState<number | null>(null)

  const days: ContributionDay[] = contributions && contributions.length > 0
    ? contributions
    : FALLBACK_COUNTS.map((count) => ({ date: '', count, level: Math.min(4, Math.round(count / 2)) as ContributionDay['level'] }))

  const maxCount = Math.max(...days.map((d) => d.count), 1)
  const total = days.reduce((s, d) => s + d.count, 0)
  const svgWidth = days.length * (BAR_W + BAR_GAP) - BAR_GAP
  const hoveredDay = hovered !== null ? days[hovered] : null
  const tooltipX = hovered !== null
    ? Math.max(0, Math.min(svgWidth - 88, hovered * (BAR_W + BAR_GAP) + BAR_W / 2 - 44))
    : 0

  return (
    <div style={{ width: svgWidth, position: 'relative' }}>
      {hoveredDay && (
        <div style={{
          position: 'absolute', bottom: H + 10, left: tooltipX,
          background: 'var(--c-tooltip-bg)', color: 'var(--c-tooltip-text)',
          fontSize: 11, lineHeight: '15px', padding: '5px 8px', borderRadius: 5,
          whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 10,
          transition: 'background 0.2s ease, color 0.2s ease',
        }}>
          {hoveredDay.date && <p style={{ color: 'var(--c-text-3)', marginBottom: 1 }}>{formatDate(hoveredDay.date)}</p>}
          <p style={{ fontWeight: 600 }}>
            {hoveredDay.count === 0 ? 'No commits' : `${hoveredDay.count} commit${hoveredDay.count > 1 ? 's' : ''}`}
          </p>
        </div>
      )}
      <svg width={svgWidth} height={H}>
        {days.map((day, i) => {
          const isHov = hovered === i
          const naturalH = day.count === 0 ? 4 : Math.max(4, (day.count / maxCount) * H)
          const barH = isHov ? naturalH * 0.82 : naturalH
          const fill = day.count === 0 ? 'var(--c-border)' : '#22c55e'
          const opacity = day.count === 0 ? 1 : LEVEL_OPACITY[day.level] ?? 0.5
          return (
            <rect key={i} x={i * (BAR_W + BAR_GAP)} y={H - barH} width={BAR_W} height={barH}
              fill={fill} opacity={opacity} rx={1}
              style={{ cursor: 'default' }}
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} />
          )
        })}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <span style={{ fontSize: 11, color: 'var(--c-text-3)', lineHeight: '16px' }}>Last 60 days</span>
        <span style={{ fontSize: 11, color: 'var(--c-text-3)', lineHeight: '16px' }}>{total} commits</span>
      </div>
    </div>
  )
}

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
const LEVEL_OPACITY = [1, 0.25, 0.45, 0.65, 1] // index 0 = gray (see fill below)

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

interface Props {
  contributions: ContributionDay[] | null
}

export default function GitHubGraph({ contributions }: Props) {
  const [hovered, setHovered] = useState<number | null>(null)

  const days: ContributionDay[] =
    contributions && contributions.length > 0
      ? contributions
      : FALLBACK_COUNTS.map((count) => ({
          date: '',
          count,
          level: (Math.min(4, Math.round(count / 2))) as ContributionDay['level'],
        }))

  const maxCount = Math.max(...days.map((d) => d.count), 1)
  const total = days.reduce((sum, d) => sum + d.count, 0)
  const svgWidth = days.length * (BAR_W + BAR_GAP) - BAR_GAP

  const hoveredDay = hovered !== null ? days[hovered] : null
  const tooltipX = hovered !== null
    ? Math.max(0, Math.min(svgWidth - 88, hovered * (BAR_W + BAR_GAP) + BAR_W / 2 - 44))
    : 0

  return (
    <div style={{ width: svgWidth, position: 'relative' }}>
      {/* Tooltip */}
      {hoveredDay && (
        <div
          style={{
            position: 'absolute',
            bottom: H + 10,
            left: tooltipX,
            background: '#111',
            color: '#fff',
            fontSize: 11,
            lineHeight: '15px',
            padding: '5px 8px',
            borderRadius: 5,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          {hoveredDay.date && (
            <p style={{ color: '#BDBDBD', marginBottom: 1 }}>{formatDate(hoveredDay.date)}</p>
          )}
          <p style={{ fontWeight: 600 }}>
            {hoveredDay.count === 0
              ? 'No commits'
              : `${hoveredDay.count} commit${hoveredDay.count > 1 ? 's' : ''}`}
          </p>
        </div>
      )}

      <svg width={svgWidth} height={H}>
        {days.map((day, i) => {
          const isHov = hovered === i
          const naturalH = day.count === 0 ? 4 : Math.max(4, (day.count / maxCount) * H)
          const barH = isHov ? naturalH * 0.82 : naturalH
          const barY = H - barH
          const fill = day.count === 0 ? '#E0E0E0' : '#22c55e'
          const opacity = day.count === 0 ? 1 : LEVEL_OPACITY[day.level] ?? 0.5

          return (
            <rect
              key={i}
              x={i * (BAR_W + BAR_GAP)}
              y={barY}
              width={BAR_W}
              height={barH}
              fill={fill}
              opacity={opacity}
              rx={1}
              style={{ cursor: 'default', transition: 'height 0.1s ease, y 0.1s ease' }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />
          )
        })}
      </svg>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <span style={{ fontSize: 11, color: '#BDBDBD', lineHeight: '16px' }}>Last 60 days</span>
        <span style={{ fontSize: 11, color: '#BDBDBD', lineHeight: '16px' }}>{total} commits</span>
      </div>
    </div>
  )
}

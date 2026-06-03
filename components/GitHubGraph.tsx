'use client'

import type { ContributionDay } from '@/types/github'

// Fallback static data that visually matches the design
const FALLBACK = [3, 2, 5, 3, 7, 4, 2, 6, 8, 5, 3, 1, 4, 7, 5, 3, 2, 8, 6, 4, 3, 5, 7, 3, 2, 4, 6, 1, 3, 5]

const BAR_W = 6
const BAR_GAP = 2
const H = 24

// Map GitHub level (0-4) to green opacity
const LEVEL_OPACITY = [0, 0.25, 0.45, 0.65, 1]

interface Props {
  contributions: ContributionDay[] | null
}

export default function GitHubGraph({ contributions }: Props) {
  const days = contributions ?? FALLBACK.map((count, i) => ({
    date: '',
    count,
    level: Math.min(4, Math.round(count / 2)) as 0 | 1 | 2 | 3 | 4,
  }))

  const maxCount = Math.max(...days.map((d) => ('count' in d ? d.count : d as unknown as number)), 1)
  const total = days.reduce((sum, d) => sum + ('count' in d ? d.count : 0), 0)
  const svgWidth = days.length * (BAR_W + BAR_GAP) - BAR_GAP

  return (
    <div style={{ width: 260 }}>
      <svg width={svgWidth} height={H} aria-label={`${total} commits in last 30 days`}>
        {days.map((day, i) => {
          const count = 'count' in day ? day.count : (day as unknown as number)
          const level = 'level' in day ? day.level : Math.min(4, Math.round(count / 2))
          const barH = count === 0 ? 2 : Math.max(3, (count / maxCount) * H)
          const opacity = count === 0 ? 0.08 : LEVEL_OPACITY[level] ?? 0.5
          return (
            <rect
              key={i}
              x={i * (BAR_W + BAR_GAP)}
              y={H - barH}
              width={BAR_W}
              height={barH}
              fill="#22c55e"
              opacity={opacity}
              rx={1}
            />
          )
        })}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <span style={{ fontSize: 11, color: '#BDBDBD', lineHeight: '16px' }}>Last 30 days</span>
        <span style={{ fontSize: 11, color: '#BDBDBD', lineHeight: '16px' }}>{total} commits</span>
      </div>
    </div>
  )
}

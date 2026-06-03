'use client'

import type { ContributionDay } from '@/types/github'

const FALLBACK_COUNTS = [3, 2, 5, 3, 7, 4, 2, 6, 8, 5, 3, 1, 4, 7, 5, 3, 2, 8, 6, 4, 3, 5, 7, 3, 2, 4, 6, 1, 3, 5]
const BAR_W = 6
const BAR_GAP = 2
const H = 24
const LEVEL_OPACITY = [0.06, 0.25, 0.45, 0.65, 1]

interface Props {
  contributions: ContributionDay[] | null
}

export default function GitHubGraph({ contributions }: Props) {
  // Fix: empty array [] is truthy — fallback if null OR empty
  const days: ContributionDay[] =
    contributions && contributions.length > 0
      ? contributions
      : FALLBACK_COUNTS.map((count) => ({
          date: '',
          count,
          level: Math.min(4, Math.round(count / 2)) as ContributionDay['level'],
        }))

  const maxCount = Math.max(...days.map((d) => d.count), 1)
  const total = days.reduce((sum, d) => sum + d.count, 0)
  const svgWidth = days.length * (BAR_W + BAR_GAP) - BAR_GAP

  return (
    <div style={{ width: 260 }}>
      <svg width={svgWidth} height={H} aria-label={`${total} commits in last 30 days`}>
        {days.map((day, i) => {
          const barH = day.count === 0 ? 2 : Math.max(3, (day.count / maxCount) * H)
          const opacity = LEVEL_OPACITY[day.level] ?? 0.5
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

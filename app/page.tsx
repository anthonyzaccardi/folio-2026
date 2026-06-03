import { projects } from '@/data/projects'
import PortfolioLayout from '@/components/PortfolioLayout'
import type { ContributionDay } from '@/types/github'

const USERNAME = 'anthonyzaccardi'

async function getContributions(): Promise<ContributionDay[] | null> {
  const token = process.env.GITHUB_TOKEN

  // 1. GraphQL API — most reliable, includes private contributions (requires GITHUB_TOKEN)
  if (token) {
    try {
      const now = new Date()
      const from = new Date(now)
      from.setDate(from.getDate() - 60)

      const query = `{
        user(login: "${USERNAME}") {
          contributionsCollection(from: "${from.toISOString()}" to: "${now.toISOString()}") {
            contributionCalendar {
              weeks {
                contributionDays {
                  date
                  contributionCount
                  contributionLevel
                }
              }
            }
          }
        }
      }`

      const res = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(8000),
      })

      if (res.ok) {
        const json = await res.json()
        const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks as Array<{
          contributionDays: Array<{ date: string; contributionCount: number; contributionLevel: string }>
        }>
        if (weeks?.length) {
          const LEVEL: Record<string, ContributionDay['level']> = {
            NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4,
          }
          const days: ContributionDay[] = weeks.flatMap((w) =>
            w.contributionDays.map((d) => ({
              date: d.date,
              count: d.contributionCount,
              level: LEVEL[d.contributionLevel] ?? 0,
            }))
          )
          return days.slice(-60)
        }
      }
    } catch {}
  }

  // 2. Public events fallback (public repos only)
  try {
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/events/public?per_page=100`,
      {
        headers: token ? { Authorization: `bearer ${token}` } : {},
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(5000),
      }
    )
    if (res.ok) {
      const events = (await res.json()) as Array<{
        type: string; created_at: string; payload?: { commits?: unknown[] }
      }>
      const counts: Record<string, number> = {}
      for (const ev of events) {
        if (ev.type === 'PushEvent') {
          const date = ev.created_at.slice(0, 10)
          counts[date] = (counts[date] || 0) + (ev.payload?.commits?.length ?? 1)
        }
      }
      const days: ContributionDay[] = []
      for (let i = 59; i >= 0; i--) {
        const d = new Date()
        d.setDate(d.getDate() - i)
        const date = d.toISOString().slice(0, 10)
        const count = counts[date] ?? 0
        const level = (count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 10 ? 3 : 4) as ContributionDay['level']
        days.push({ date, count, level })
      }
      // Return only if there's actual data
      if (days.some((d) => d.count > 0)) return days
    }
  } catch {}

  return null
}

export default async function Home() {
  const contributions = await getContributions()
  return <PortfolioLayout projects={projects} contributions={contributions} />
}

import { projects } from '@/data/projects'
import PortfolioLayout from '@/components/PortfolioLayout'
import type { ContributionDay } from '@/types/github'

async function getContributions(): Promise<ContributionDay[] | null> {
  const year = new Date().getFullYear()

  // 1st try: jogruber contributions API
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/anthonyzaccardi?y=${year}`,
      { next: { revalidate: 3600 }, signal: AbortSignal.timeout(5000) }
    )
    if (res.ok) {
      const data = await res.json()
      const all = data.contributions as ContributionDay[]
      if (all?.length > 0) return all.slice(-60)
    }
  } catch {}

  // 2nd try: GitHub REST public events (no auth, 60req/hr)
  try {
    const res = await fetch(
      'https://api.github.com/users/anthonyzaccardi/events/public?per_page=100',
      { next: { revalidate: 3600 }, signal: AbortSignal.timeout(5000) }
    )
    if (res.ok) {
      const events = (await res.json()) as Array<{
        type: string
        created_at: string
        payload?: { commits?: unknown[] }
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
      return days
    }
  } catch {}

  return null
}

export default async function Home() {
  const contributions = await getContributions()
  return <PortfolioLayout projects={projects} contributions={contributions} />
}

import { projects } from '@/data/projects'
import PortfolioLayout from '@/components/PortfolioLayout'
import type { ContributionDay } from '@/types/github'

const USERNAME = 'anthonyzaccardi'

async function getContributions(): Promise<ContributionDay[] | null> {
  // 1. Scrape GitHub contribution HTML — server-side, no CORS, includes private
  try {
    const res = await fetch(
      `https://github.com/users/${USERNAME}/contributions`,
      {
        headers: {
          Accept: 'text/html',
          'User-Agent': 'Mozilla/5.0',
          'X-Requested-With': 'XMLHttpRequest',
        },
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(8000),
      }
    )
    if (res.ok) {
      const html = await res.text()
      const days: ContributionDay[] = []

      // Try pattern with data-count + data-level
      const re1 = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-count="(\d+)"[^>]*data-level="(\d)"/g
      let m: RegExpExecArray | null
      while ((m = re1.exec(html)) !== null) {
        days.push({
          date: m[1],
          count: parseInt(m[2]),
          level: parseInt(m[3]) as ContributionDay['level'],
        })
      }

      // Fallback: data-level only → approximate count
      if (days.length === 0) {
        const re2 = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"/g
        while ((m = re2.exec(html)) !== null) {
          const level = parseInt(m[2]) as ContributionDay['level']
          days.push({ date: m[1], count: level > 0 ? level * 2 : 0, level })
        }
      }

      if (days.length > 0) return days.slice(-60)
    }
  } catch {}

  // 2. jogruber API fallback
  try {
    const year = new Date().getFullYear()
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=${year}`,
      { next: { revalidate: 3600 }, signal: AbortSignal.timeout(5000) }
    )
    if (res.ok) {
      const data = await res.json()
      const all = data.contributions as ContributionDay[]
      if (all?.length > 0) return all.slice(-60)
    }
  } catch {}

  // 3. GitHub public events fallback (public repos only)
  try {
    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/events/public?per_page=100`,
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

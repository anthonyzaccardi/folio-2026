import { projects } from '@/data/projects'
import PortfolioLayout from '@/components/PortfolioLayout'
import type { ContributionDay } from '@/types/github'

async function getContributions(): Promise<ContributionDay[] | null> {
  try {
    const res = await fetch(
      'https://github-contributions-api.jogruber.de/v4/anthonyzaccardi?y=last',
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return null
    const data = await res.json()
    const all = data.contributions as ContributionDay[]
    return all.slice(-30)
  } catch {
    return null
  }
}

export default async function Home() {
  const contributions = await getContributions()
  return <PortfolioLayout projects={projects} contributions={contributions} />
}

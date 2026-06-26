import { projects } from '@/data/projects'
import PortfolioLayout from '@/components/PortfolioLayout'

export default function Home() {
  return <PortfolioLayout projects={projects} />
}

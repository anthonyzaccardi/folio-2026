import ProjectSection from './ProjectSection'
import type { Project } from '@/data/projects'

export default function AllProjects({ projects }: { projects: Project[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 96 }}>
      {projects.map((p, i) => (
        <ProjectSection key={p.slug} project={p} index={i} />
      ))}
    </div>
  )
}

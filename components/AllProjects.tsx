import ProjectCard from './ProjectCard'
import type { Project } from '@/data/projects'

export default function AllProjects({ projects }: { projects: Project[] }) {
  return (
    <div className="project-grid">
      {projects.map((p, i) => (
        <ProjectCard key={p.slug} project={p} index={i} />
      ))}
    </div>
  )
}

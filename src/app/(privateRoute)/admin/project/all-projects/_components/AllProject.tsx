import { TProject } from '@/types';
import ProjectCard from './ProjectCard';

const AllProjects = ({ projects }: { projects: TProject[] }) => {
  return (
    <div className="flex flex-col gap-3 my-10">
      <div className="mx-4 lg:mx-10">
        {projects?.length === 0 ? (
          <h3 className="text-xl font-bold text-center">No project found</h3>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5 lg:gap-7 mx-auto">
            {projects.map((project: TProject, idx: number) => (
              <ProjectCard key={idx} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProjects;

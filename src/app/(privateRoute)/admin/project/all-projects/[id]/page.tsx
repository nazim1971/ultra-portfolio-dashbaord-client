import { getSingleProjectDetails } from "../_actions";
import ProjectDetail from "./_components/ProjectDetails";

const ProjectDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data: project } = await getSingleProjectDetails(id);

  return (
    <div>
      <ProjectDetail project={project} />
    </div>
  );
};

export default ProjectDetailsPage;

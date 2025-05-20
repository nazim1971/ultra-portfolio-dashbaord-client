import { getAllProjects } from '../../all-projects/_actions';
import { DataTable } from './DataTable';



const AllProjectModule = async () => {
  const { data: projects } = await getAllProjects();

  return (
    <div>
      <DataTable projects={projects} />
    </div>
  );
};

export default AllProjectModule;
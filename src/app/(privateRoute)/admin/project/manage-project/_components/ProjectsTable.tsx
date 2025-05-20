
import {  TProject } from '@/types';
import { DataTable } from './DataTable';

const ProjectTable = ({ projects = [] }: { projects: TProject[] }) => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">All Ideas</h1>
      <div className="overflow-x-auto">
        <DataTable projects={projects} />
      </div>
    </div>
  );
};

export default ProjectTable;
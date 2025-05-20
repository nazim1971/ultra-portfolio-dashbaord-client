
import {   TSkill } from '@/types';
import { DataTable } from './DataTable';

const SkillTable = ({ skill = [] }: { skill: TSkill[] }) => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">All Ideas</h1>
      <div className="overflow-x-auto">
        <DataTable skills={skill} />
      </div>
    </div>
  );
};

export default SkillTable;
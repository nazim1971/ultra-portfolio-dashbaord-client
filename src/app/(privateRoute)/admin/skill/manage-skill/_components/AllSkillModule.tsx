

import { getAllSkills } from '../_actions';
import { DataTable } from './DataTable';



const AllSkillModule = async () => {
  const { data: skill } = await getAllSkills();

  return (
    <div>
      <DataTable skills={skill.data} />
    </div>
  );
};

export default AllSkillModule;


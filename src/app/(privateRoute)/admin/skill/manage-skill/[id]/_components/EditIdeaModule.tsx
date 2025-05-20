import { TSkill } from "@/types";
import EditSkillForm from "./EditSkillForm";

const EditSkillModule = async ({ skill }: { skill: TSkill }) => {
  return (
    <div>
      <EditSkillForm skill={skill} />
    </div>
  );
};

export default EditSkillModule;

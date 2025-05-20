import { TSkill } from "@/types";
import { getSingleSkillDetails } from "../../manage-skill/_actions";
import EditSkillModule from "./_components/EditIdeaModule";

const EditSkillPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data: skill }: { data: TSkill } = await getSingleSkillDetails(id);

  return (
    <div>
      <EditSkillModule skill={skill} />
    </div>
  );
};

export default EditSkillPage;

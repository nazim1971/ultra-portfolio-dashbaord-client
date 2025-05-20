
import { TProject } from "@/types";

import { getSingleProjectDetails } from "../../all-projects/_actions";
import EditProjectModule from "./_component/EditProjectModule";

const EditProjectPage = async ({
  params,
}: {
   params: Promise<{ id: string }>;
}) => {
  const { id } =await params;
  const { data: project }: { data: TProject } = await getSingleProjectDetails(id);

  return (
    <div>
      <EditProjectModule project={project} />
    </div>
  );
};

export default EditProjectPage;

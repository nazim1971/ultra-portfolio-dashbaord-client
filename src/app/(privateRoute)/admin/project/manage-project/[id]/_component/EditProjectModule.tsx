import { TProject } from "@/types";
import EditProjectForm from "./EditProjectForm";




const EditProjectModule = async ({ project }: { project: TProject }) => {

  return (
    <div >
      <EditProjectForm projectId={project._id} initialData={project}/>
    </div>
  );
};

export default EditProjectModule;
import { TBlog } from "@/types";
import EditBlogForm from "./EditBlogForm";




const EditBlogModule = async ({ blog }: { blog: TBlog }) => {

  return (
    <div >
      <EditBlogForm  blog={blog}/>
    </div>
  );
};

export default EditBlogModule;
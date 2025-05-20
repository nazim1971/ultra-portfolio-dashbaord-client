import { TBlog } from "@/types";
import { getSingleBlogDetails } from "../../all-blogs/_actions";
import EditBlogModule from "./_components/EditIdeaModule";

const EditBlogPage = async ({
  params,
}: {
   params: Promise<{ id: string }>;
}) => {
  const { id } =await params;
  const { data: blog }: { data: TBlog } = await getSingleBlogDetails(id);

  return (
    <div>
      <EditBlogModule blog={blog} />
    </div>
  );
};

export default EditBlogPage;

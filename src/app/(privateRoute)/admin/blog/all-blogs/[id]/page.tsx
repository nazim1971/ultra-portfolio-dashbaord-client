import { getSingleBlogDetails } from "../_actions";
import BlogDetail from "./_components/BlogDetails";



const BlogDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data: blog } = await getSingleBlogDetails(id);
  return (
    <div>
      <BlogDetail Blog={blog} />
    </div>
  );
};

export default BlogDetailsPage;

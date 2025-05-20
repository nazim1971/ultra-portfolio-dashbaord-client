
import { TBlog } from '@/types';
import BlogCard from './BlogCard';


const AllBlogs = ({ blogs }: { blogs: TBlog[] }) => {
  return (
    <div className="flex flex-col gap-3 my-10">
      <div className="mx-4 lg:mx-10">
        {blogs?.length === 0 ? (
          <h3 className="text-xl font-bold text-center">No blog found</h3>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5 lg:gap-7 mx-auto">
            {blogs?.map((blog: TBlog, idx: number) => (
              <BlogCard key={idx} Blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
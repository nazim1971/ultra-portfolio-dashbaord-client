
import { TBlog } from '@/types';
import { DataTable } from './DataTable';

const BlogTable = ({ blogs = [] }: { blogs: TBlog[] }) => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">All Ideas</h1>
      <div className="overflow-x-auto">
        <DataTable blogs={blogs} />
      </div>
    </div>
  );
};

export default BlogTable;
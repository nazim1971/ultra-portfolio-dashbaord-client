
import { getAllBlogs } from '../../all-blogs/_actions';
import { DataTable } from './DataTable';



const AllBlogsModule = async () => {
  const { data: blogs } = await getAllBlogs();

  return (
    <div>
      <DataTable blogs={blogs} />
    </div>
  );
};

export default AllBlogsModule;
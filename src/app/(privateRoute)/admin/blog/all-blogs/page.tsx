

import Pagination from '@/components/Pagination';
import { getAllBlogs } from './_actions';
import AllBlogs from './_components/AllBlogs';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const AllIdeasPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const query = await searchParams;
 
  const { data: blogs, meta } = await getAllBlogs(
    query.page as string,
    '12',
    query
  );

  return (
    <div>
      <AllBlogs blogs={blogs} />
      <Pagination page={Number(query.page)} totalPage={meta?.totalPage} />
    </div>
  );
};

export default AllIdeasPage;
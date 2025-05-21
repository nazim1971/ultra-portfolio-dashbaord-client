import Pagination from '@/components/Pagination';
import { getAllProjects } from './_actions';
import AllProjects from './_components/AllProject';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const AllProjectsPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const query = await searchParams;

  const { data: projects, meta } = await getAllProjects(
    query.page as string,
    '12',
    query
  );

  console.log(projects);

  return (
    <div>
      <AllProjects projects={projects?.data || []} />
      <Pagination page={Number(query.page) || 1} totalPage={meta?.totalPage} />
    </div>
  );
};

export default AllProjectsPage;

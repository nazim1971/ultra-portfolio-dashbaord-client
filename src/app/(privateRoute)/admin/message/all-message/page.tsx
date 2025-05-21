import Pagination from '@/components/Pagination';
import AllMessages from './_components/AllMessage';
import { getAllMessage } from './_actions';

type SearchParams = { [key: string]: string | string[] | undefined };

const AllMessagesPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { page = '1', ...query } = searchParams;
 
  const { data: messages, meta } = await getAllMessage(
    page as string,
    '12',
    query
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Messages</h1>
        <p className="text-muted-foreground">
          View and manage all incoming messages
        </p>
      </div>
      
      <AllMessages messages={messages?.data} />
      
      {meta?.totalPage > 1 && (
        <div className="mt-8">
          <Pagination 
            page={Number(page)} 
            totalPage={meta?.totalPage} 
          />
        </div>
      )}
    </div>
  );
};

export default AllMessagesPage;
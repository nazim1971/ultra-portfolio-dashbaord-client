import Pagination from '@/components/Pagination';
import AllMessages from './_components/AllMessage';
import { getAllMessage } from './_actions';



const AllMessagesPage = async()=> {

 
  const { data: messages, meta } = await getAllMessage();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Messages</h1>
        <p className="text-muted-foreground">
          View and manage all incoming messages
        </p>
      </div>
      
      <AllMessages messages={messages?.data || []} />
      
      {meta?.totalPage > 1 && (
        <div className="mt-8">
          <Pagination 
            page={Number(meta?.data?.page)} 
            totalPage={meta?.totalPage} 
          />
        </div>
      )}
    </div>
  );
};

export default AllMessagesPage;
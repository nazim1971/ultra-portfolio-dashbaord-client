import { TMessage } from '@/types'; // Assuming you have a TMessage type
import MessageCard from './MessageCard';

const AllMessages = ({ messages }: { messages: TMessage[] }) => {
  return (
    <div className="flex flex-col gap-6 my-8">
      <div className="mx-4 lg:mx-10">
        {messages?.length === 0 ? (
          <div className="text-center py-10">
            <h3 className="text-xl font-bold">No messages found</h3>
            <p className="text-muted-foreground mt-2">Your inbox is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 md:gap-6">
            {messages?.map((message: TMessage) => (
              <MessageCard key={message._id} message={message} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllMessages;
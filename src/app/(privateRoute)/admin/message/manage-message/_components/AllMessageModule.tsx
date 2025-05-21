
import { getAllMessage } from '../../all-message/_actions';
import { DataTable } from './DataTable';



const AllMessageModule = async () => {
  const { data: message } = await getAllMessage();

  return (
    <div>
      <DataTable messages={message?.data} />
    </div>
  );
};

export default AllMessageModule;


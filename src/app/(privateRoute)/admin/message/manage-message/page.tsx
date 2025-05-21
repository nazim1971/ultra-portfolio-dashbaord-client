import { LoaderCircle } from 'lucide-react';
import React, { Suspense } from 'react';
import AllMessageModule from './_components/AllMessageModule';

const ManageMessagePage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex size-full min-h-dvh items-center justify-center">
          <LoaderCircle className="animate-spin transition-all duration-300 ease-in-out" />
        </div>
      }
    >
      <AllMessageModule />
    </Suspense>
  );
};

export default ManageMessagePage;
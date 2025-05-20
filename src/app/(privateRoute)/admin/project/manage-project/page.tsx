import { LoaderCircle } from 'lucide-react';
import React, { Suspense } from 'react';
import AllProjectModule from './_components/AllProjectModul';

const ManageProjectPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex size-full min-h-dvh items-center justify-center">
          <LoaderCircle className="animate-spin transition-all duration-300 ease-in-out" />
        </div>
      }
    >
      <AllProjectModule />
    </Suspense>
  );
};

export default ManageProjectPage;
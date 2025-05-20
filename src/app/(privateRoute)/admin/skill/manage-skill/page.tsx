import { LoaderCircle } from 'lucide-react';
import React, { Suspense } from 'react';
import AllSkillModule from './_components/AllSkillModule';

const ManageSkillPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex size-full min-h-dvh items-center justify-center">
          <LoaderCircle className="animate-spin transition-all duration-300 ease-in-out" />
        </div>
      }
    >
      <AllSkillModule />
    </Suspense>
  );
};

export default ManageSkillPage;
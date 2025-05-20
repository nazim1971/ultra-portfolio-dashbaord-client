import { LoaderCircle } from 'lucide-react';
import React, { Suspense } from 'react';
import CreateSkillModule from './_components/CreateSkillModule';

const CreateProject = () => {
  return (
    <Suspense
      fallback={
        <div className="flex size-full min-h-dvh items-center justify-center">
          <LoaderCircle className="animate-spin transition-all duration-300 ease-in-out" />
        </div>
      }
    >
      <CreateSkillModule />
    </Suspense>
  );
};

export default CreateProject;

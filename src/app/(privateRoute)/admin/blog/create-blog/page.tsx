import { LoaderCircle } from 'lucide-react';
import React, { Suspense } from 'react';
import CreateBlogModule from './_components/CreateIdeaModule';

const CreateBlog = () => {
   return (
    <Suspense
          fallback={
            <div className="flex size-full min-h-dvh items-center justify-center ">
              <LoaderCircle className="animate-spin transition-all duration-300 ease-in-out" />
            </div>
          }
        >
          <CreateBlogModule />
        </Suspense>
  )
};

export default CreateBlog;
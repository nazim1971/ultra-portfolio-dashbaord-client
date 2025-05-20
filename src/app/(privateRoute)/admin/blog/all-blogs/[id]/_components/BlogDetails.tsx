/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from 'next/image';
import { User, CalendarDays } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { TBlog } from '@/types';

const BlogDetail = ({ Blog }: { Blog: TBlog }) => {
  const { user } = useUser();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-[#111] rounded-2xl shadow-md">
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
        <span className="flex items-center gap-1 text-[#14B8A6]">
          <User className="w-4 h-4" />
          {user?.name}
        </span>
        <span className="flex items-center gap-1 text-[#14B8A6]">
          <CalendarDays className="w-4 h-4" />
          {new Date(Blog.createdAt).toLocaleDateString()}
        </span>
      </div>

      {Blog.image && (
        <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
          <Image
            src={Blog.image}
            alt={Blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <h1 className="text-3xl font-semibold text-[#14B8A6] mb-4">{Blog.title}</h1>

      <p className="text-gray-700 dark:text-gray-300 mb-4">{Blog.description}</p>

      <div className="prose dark:prose-invert max-w-none mb-4">
        {/* Assuming Blog.content is HTML or markdown converted */}
        {Blog.content}
      </div>
    </div>
  );
};

export default BlogDetail;

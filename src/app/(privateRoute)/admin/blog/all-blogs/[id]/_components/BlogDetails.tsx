/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from 'next/image';
import { User, CalendarDays, Clock} from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { TBlog } from '@/types';
import { format } from 'date-fns';

const BlogDetail = ({ Blog }: { Blog: TBlog }) => {
  const { user } = useUser();

  // Format tags - handles both string and array formats
  const formatTags = (tags: any) => {
    if (!tags) return [];
    if (Array.isArray(tags)) return tags;
    if (typeof tags === 'string') {
      if (tags.includes(',')) return tags.split(',').map(t => t.trim());
      if (tags.includes(' ')) return tags.split(' ').map(t => t.trim());
      return [tags];
    }
    return [];
  };

  const formattedTags = formatTags(Blog.tags);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <article className="bg-white dark:bg-[#111] rounded-xl shadow-lg overflow-hidden">
        {/* Cover Image */}
        {Blog.image && (
          <div className="relative w-full aspect-[16/9]">
            <Image
              src={Blog.image}
              alt={Blog.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            />
          </div>
        )}

        <div className="p-6 sm:p-8">
          {/* Metadata */}
          <div className="flex flex-col flex-wrap sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>{user?.name || 'Admin'}</span>
              </div>
              
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <CalendarDays className="w-4 h-4" />
                <span>
                  {format(new Date(Blog.createdAt), 'MMMM dd, yyyy')}
                </span>
              </div>

              {Blog.readingTime && (
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{Blog.readingTime}</span>
                </div>
              )}
            </div>

            {formattedTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formattedTags.map((tag, index) => (
                  <span 
                    key={index}
                    className="text-xs px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-100 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {Blog.title}
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            {Blog.description}
          </p>

          {/* Content - rendered from Tiptap HTML */}
          <div 
            className="prose dark:prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: Blog.content }}
          />
        </div>

        <div className="px-6 py-4 sm:px-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Last updated: {format(new Date(Blog.updatedAt), 'MMMM dd, yyyy')}
            </span>
            <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-100 rounded-full text-sm">
              {'Published'}
            </span>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { User, CalendarDays } from "lucide-react";
import { TBlog } from "@/types";

const BlogCard = ({ Blog }: { Blog: TBlog }) => {
  const { user } = useUser();

  return (
    <Link href={`/admin/blog/all-blogs/${Blog._id}`} className="block hover:shadow-lg transition">
      <Card className="rounded-2xl overflow-hidden border shadow-md dark:bg-[#111]">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="flex items-center gap-1 text-[#14B8A6]">
              <User className="w-4 h-4" />
              {user?.name}
            </span>
            <span className="flex items-center gap-1 text-[#14B8A6]">
              <CalendarDays className="w-4 h-4" />
              {new Date(Blog.createdAt).toLocaleDateString()}
            </span>
          </div>

          <h2 className="text-xl font-semibold text-[#14B8A6]">{Blog.title}</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
            {Blog.description}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
            {Blog.content}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
            {Blog.readingTime}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
            {Blog.slug}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
            {Blog.tags}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
            {new Date(Blog.updatedAt).toLocaleDateString()}
          </p>
        </CardContent>

        <CardFooter className="p-5 flex flex-col gap-3 border-t">
          <div className="flex items-center gap-3 justify-between text-sm">
            <span className="bg-[#14B8A6]/10 text-[#14B8A6] px-3 py-1 rounded-full"></span>
            <span className="text-lg font-bold text-[#14B8A6]"></span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BlogCard;

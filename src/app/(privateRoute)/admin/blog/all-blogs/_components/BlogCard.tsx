/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Clock } from "lucide-react";
import { TBlog } from "@/types";
import Image from "next/image";
import { generateTextFromHTML } from "../_utils/generateHtml";

const BlogCard = ({ Blog }: { Blog: TBlog }) => {
  const contentPreview = generateTextFromHTML(Blog.content)
    .split(/\s+/)
    .slice(0, 20)
    .join(" ") + "...";

  return (
    <Link href={`/admin/blog/all-blogs/${Blog._id}`} className="group">
      <Card className="relative h-[450px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
        {/* Image Container */}
        <div className="relative h-[300px] lg:h-[220px] w-full overflow-hidden">
          <Image
            src={Blog?.image || "/default-blog.jpg"}
            alt={Blog.title}
            fill
            priority={false}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL="/placeholder-image.jpg"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
        </div>

        {/* Content */}
        <CardContent className="p-6 flex flex-col h-[260px]">
          {/* Date and Time */}
          <div className="mb-4 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              {new Date(Blog.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {Blog.readingTime || "5 min read"}
            </span>
          </div>

          {/* Title */}
          <h2 className="mb-3 text-sm font-bold tracking-tight text-gray-900 line-clamp-2 dark:text-white">
            {Blog.title}
          </h2>

          {/* Preview Text */}
          <p className="mb-4 text-gray-600 text-sm line-clamp-3 flex-grow dark:text-gray-300">
            {contentPreview.split(" ").slice(0,5).join(" ")}...
          </p>

          {/* Read More */}
          <div className="flex items-center mt-auto">
            <span className="text-sm font-semibold text-primary-600 transition-all duration-300 group-hover:underline dark:text-primary-400">
              Read more
            </span>
            <svg
              className="ml-2 h-4 w-4 text-primary-600 transition-transform duration-300 group-hover:translate-x-1 dark:text-primary-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { TBlog } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import TGImageUploader from "@/components/ui/ImageUploader";
import ImagePreviewer from "@/components/ui/ImageUploader/ImagePreviewer";
import { EditBlogValidation } from "./EditBlogValidation";
import { editBlog } from "../../_actions";

interface EditBlogFormProps {
  blog: TBlog;
}

const EditBlogForm = ({ blog }: EditBlogFormProps) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>(
    blog?.image ? [blog.image] : []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(EditBlogValidation),
    defaultValues: {
      title: blog.title || "",
      description: blog.description || "",
      content: blog.content || "",
      readingTime: blog.readingTime || "",
      tags: blog.tags || [],
      slug: blog.slug || "",
    },
  });

  const handleSubmit: SubmitHandler<any> = async (data) => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    for (const file of imageFiles) {
      formData.append("image", file);
    }

    try {
      const res = await editBlog(blog._id, formData);
       console.log("Response from editBlog:", res); // ✅ Correct usage

      if (res?.success) {
        toast.success(res?.message || "Blog updated successfully!");
        router.push(`/admin/blog/all-blogs/${res?.data?._id}`);
      } else {
        toast.error(res?.message || "Failed to update blog.");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("An error occurred while updating the blog.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 md:p-0">
      <h1 className="text-3xl text-center mb-6">Edit Blog</h1>
      <div className="flex justify-center min-h-screen mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 w-full md:w-2/3 text-center"
          >
            {/* Form Fields (same as before) */}
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Blog title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Short description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea rows={8} placeholder="Full blog content" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Reading Time */}
            <FormField
              control={form.control}
              name="readingTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Reading Time</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 5 mins" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tags */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., JavaScript, TypeScript, WebDev"
                      value={(field.value || []).join(", ")}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value
                            .split(",")
                            .map((tag) => tag.trim())
                            .filter((tag) => tag)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Slug */}
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="custom-url-slug" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload */}
            <div>
              <p className="text-primary font-bold text-xl text-center border-t border-b py-3 my-5">
                Cover Image
              </p>
              <div className="flex gap-4">
                <TGImageUploader
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                  label="Upload New Cover Image"
                  className="w-fit mt-0"
                />
                <ImagePreviewer
                  className="flex flex-wrap gap-4"
                  setImageFiles={setImageFiles}
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-center gap-4 mt-4 mb-20">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating Blog..." : "Update Blog"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditBlogForm;

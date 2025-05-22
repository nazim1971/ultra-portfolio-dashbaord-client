/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import TGImageUploader from "@/components/ui/ImageUploader";
import ImagePreviewer from "@/components/ui/ImageUploader/ImagePreviewer";
import { createBlog } from "../_actions";
import { CreateBlogValidation } from "./BlogValidation";
import { TiptapEditor } from "@/components/TextEditor/TextEditor";

const CreateBlogForm = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(CreateBlogValidation),
    defaultValues: {
      title: "",
      description: "",
      content: "<p>Start writing your blog content here...</p>", // Default rich text content
      readingTime: "",
      tags: [],
      slug: "",
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
      const res = await createBlog(formData);
      if (res?.success) {
        toast.success(res?.message || "Blog created successfully!");
        router.push(`/admin/blog/${res?.data?._id}`);
      } else {
        toast.error(res?.message || "Failed to create blog.");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("An error occurred while creating the blog.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 md:p-0">
      <h1 className="text-3xl text-center mb-6">Create Blog</h1>
      <div className="flex justify-center min-h-screen mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 w-full md:w-2/3 text-center"
          >
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

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Short description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <TiptapEditor
                      content={field.value}
                      onChange={field.onChange}
                      placeholder="Write your blog content here..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Rest of your form fields... */}
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
                  label="Upload Cover Image"
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
              <Button
                type="submit"
                disabled={isSubmitting || imageFiles.length < 1}
              >
                {isSubmitting ? "Creating Blog..." : "Create Blog"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateBlogForm;
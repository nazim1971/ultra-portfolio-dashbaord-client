'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

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

// Import or define your zod validation schema for project creation
import { createProject } from "../_actions"; // replace with your actual API/action
import { ProjectValidation } from "./ProjectValidation";



const CreateProjectForm = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(ProjectValidation),
    defaultValues: {
      title: "",
      description: "",
      liveSiteLink: "",
      clientCodeLink: "",
      serverCodeLink: "",
    },
  });

  const handleSubmit: SubmitHandler<any> = async (data) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));

      for (const file of imageFiles) {
        formData.append("images", file); // plural 'images' since it's an array
      }

      const res = await createProject(formData);

      if (res?.success) {
        toast.success(res?.message || "Project created successfully!");
        router.push(`/admin/project/all-projects/${res?.data?._id || res?.data?.id}`);
      } else {
        toast.error(res?.message || "Failed to create project.");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("An error occurred while creating the project.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 md:p-0">
      <h1 className="text-3xl text-center mb-6">Create Project</h1>
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
                    <Input placeholder="Project title" {...field} />
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
                    <Textarea placeholder="Short description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="liveSiteLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Live Site Link</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clientCodeLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client Code Link</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/client-repo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="serverCodeLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Server Code Link</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/server-repo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Images Upload */}
            <div>
              <p className="text-primary font-bold text-xl text-center border-t border-b py-3 my-5">
                Project Images
              </p>

              <div className="flex gap-4">
                <TGImageUploader
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                  label="Upload Project Images"
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
              <Button type="submit" disabled={isSubmitting || imageFiles.length < 1}>
                {isSubmitting ? "Creating Project..." : "Create Project"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateProjectForm;

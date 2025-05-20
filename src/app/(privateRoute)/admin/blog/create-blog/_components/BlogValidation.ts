import { z } from "zod";

export const CreateBlogValidation = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  content: z.string().min(20, "Content must be at least 50 characters"),
  tags: z.array(z.string()).optional(),
  readingTime: z.string().min(2, "Reading time is required"),
  slug: z.string().min(3, "Slug must be at least 3 characters").optional(),
  image: z.string().optional(),
});

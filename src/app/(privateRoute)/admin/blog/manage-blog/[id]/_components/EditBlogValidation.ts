import { z } from "zod";

export const EditBlogValidation = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").optional(),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .optional(),
  content: z
    .string()
    .min(20, "Content must be at least 50 characters")
    .optional(),
  tags: z.array(z.string()).optional(),
  readingTime: z
    .string()
    .min(2, "Reading time is required")
    .optional(),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .optional()
});

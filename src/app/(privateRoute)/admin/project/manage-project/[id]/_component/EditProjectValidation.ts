import { z } from "zod";

export const UpdateProjectValidation = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long").optional(),
  description: z.string().min(10, "Description must be at least 10 characters long").optional(),
  liveSiteLink: z.string().url("Must be a valid URL for Live Site").optional(),
  clientCodeLink: z.string().url("Must be a valid URL for Client Code").optional(),
  serverCodeLink: z.string().url("Must be a valid URL for Server Code").optional(),
});

import { z } from "zod";

export const ProjectValidation = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  liveSiteLink: z.string().url("Must be a valid URL for Live Site"),
  clientCodeLink: z.string().url("Must be a valid URL for Client Code"),
  serverCodeLink: z.string().url("Must be a valid URL for Server Code")
});

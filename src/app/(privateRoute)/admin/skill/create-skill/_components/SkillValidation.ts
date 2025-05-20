import { z } from 'zod';

export const skillValidationSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  image: z
    .string()
    .url("Image must be a valid URL")
    .min(1, "Image URL is required"),
});
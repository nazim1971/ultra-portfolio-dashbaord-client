/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/getValidToken";

// createAnIdea
export const createBlog = async (formData: FormData): Promise<any> => {
  const token = await getValidToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: formData,
  });

  const data = await res.json();
  return data;
};

// {
//   "title": "Why TypeScript Matters",
//   "description": "TypeScript extends JavaScript by adding static types, helping developers catch errors early and improve code quality.",
//   "content": "By using TypeScript, you can avoid many common JavaScript pitfalls. It enhances IDE support, improves readability, and supports better tooling. TypeScript is especially valuable in large-scale applications where maintainability is crucial.",
//   "tags": ["TypeScript", "JavaScript", "Development"],
//   "readingTime": "3 min",
//   "slug": "why-typescript-matters"
// }

export type TBlog = {
  _id: string;
  title: string;
  description: string;
  content: string;
  tags: string[];          // Assuming array of strings for tags
  readingTime: string;
  slug: string;
  image: string | null;    // Image can be null or string URL
  createdAt: string;       // ISO date string
  updatedAt: string;       // ISO date string
};

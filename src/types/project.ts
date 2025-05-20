export type TProject = {
  _id: string;
  title: string;
  description: string;
  liveSiteLink: string;
  clientCodeLink: string;
  serverCodeLink: string;
  images: string[]; // assuming these are URLs or image paths
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  __v?: number; 
};

// pages/api/upload.ts
export const config = {
  api: {
    bodyParser: false, // Required for multer
    sizeLimit: '5mb',  // Increase this limit as needed
  },
};

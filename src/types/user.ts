export type TUser = {
  _id: string;
  email: string;
  password: string;
  role: 'USER' | 'ADMIN'; // Add other roles if necessary
  status: 'ACTIVE' | 'INACTIVE'; // Adjust according to your app logic
  name: string;
  createdAt: string; // or Date if you parse it
  updatedAt: string; // or Date
  image: string | null;
  contactNumber: string | null;
};

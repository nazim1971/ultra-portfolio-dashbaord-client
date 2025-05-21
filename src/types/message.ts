export type TMessage = {
  _id?: string;           // Optional when creating
  name: string;
  email: string;
  subject: string;
  message: string;
  viewed?: boolean;       // Optional when creating, defaults to false
  createdAt?: Date;       // Automatically set by Mongoose
  updatedAt?: Date;       // Automatically set by Mongoose
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { getValidToken } from "@/lib/getValidToken";

export const deleteBlog = async (id: string) => {
  try {
    const token = await getValidToken();

    if (!token)
      return { success: false, message: 'Authentication token not found' };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${id}`, {
      method: 'DELETE',
      headers: { Authorization: token },
    });

    const data = await res.json();
    return data.data;
  } catch (error: any) {
    return Error(error);
  }
};

export const editBlog = async (id: string, formData: FormData) => {
  try {
    const token = await getValidToken();

    if (!token)
      return { success: false, message: 'Authentication token not found' };

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${id}`, {
      method: 'PATCH',
      headers: {
        Authorization: token,
      },
      body: formData,
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};
